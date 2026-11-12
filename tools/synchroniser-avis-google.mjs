// Synchronisation officielle Google Business Profile → google-avis.json.
// Authentification OAuth2 détenue par le gestionnaire vérifié de Meery Cake.
// Ne jamais insérer les identifiants dans ce fichier ou dans le HTML public.
import {writeFile} from 'node:fs/promises';

const keys=['GBP_CLIENT_ID','GBP_CLIENT_SECRET','GBP_REFRESH_TOKEN','GBP_ACCOUNT_ID','GBP_LOCATION_ID'];
const missing=keys.filter(k=>!process.env[k]);
if(missing.length){
  console.log('Google Business Profile non connecté : synchronisation ignorée. Secrets manquants : '+missing.join(', '));
  process.exit(0);
}
const env=process.env;
const abort=ms=>AbortSignal.timeout(ms);
async function jsonFetch(url,options={},label='requête'){
  const response=await fetch(url,{...options,signal:abort(25000)});
  const text=await response.text();
  let result;try{result=JSON.parse(text)}catch{throw Error(label+' : réponse non JSON ('+response.status+')')}
  if(!response.ok){
    const reason=result?.error?.message||result?.error_description||response.statusText;
    throw Error(label+' : '+response.status+' '+reason);
  }
  return result;
}
const token=await jsonFetch('https://oauth2.googleapis.com/token',{
  method:'POST',
  headers:{'Content-Type':'application/x-www-form-urlencoded'},
  body:new URLSearchParams({
    client_id:env.GBP_CLIENT_ID,
    client_secret:env.GBP_CLIENT_SECRET,
    refresh_token:env.GBP_REFRESH_TOKEN,
    grant_type:'refresh_token'
  })
},'OAuth2 Google');
if(!token.access_token)throw Error('OAuth2 : aucun access_token reçu');
const account=env.GBP_ACCOUNT_ID.replace(/^accounts\//,'');
const location=env.GBP_LOCATION_ID.replace(/^locations\//,'');
if(!/^[\w-]+$/.test(account)||!/^[\w-]+$/.test(location))throw Error('ID compte ou établissement non valide');
const endpoint='https://mybusiness.googleapis.com/v4/accounts/'+account+'/locations/'+location+'/reviews';
let next='',all=[],total=null,average=null,pages=0;
const ratings={ONE:1,TWO:2,THREE:3,FOUR:4,FIVE:5};
do{
  const url=new URL(endpoint);url.searchParams.set('pageSize','50');url.searchParams.set('orderBy','updateTime desc');if(next)url.searchParams.set('pageToken',next);
  const result=await jsonFetch(url.toString(),{headers:{Authorization:'Bearer '+token.access_token}},'Avis Google Business Profile');
  if(total===null)total=result.totalReviewCount;
  if(average===null)average=result.averageRating;
  if(!Array.isArray(result.reviews))throw Error('Google n’a pas retourné de tableau reviews');
  for(const r of result.reviews){
    const rater=ratings[r.starRating]??Number(r.starRating);
    if(!Number.isInteger(rater)||rater<1||rater>5)continue;
    all.push({
      author:(r.reviewer?.isAnonymous?'Utilisateur Google':r.reviewer?.displayName)||'Utilisateur Google',
      authorUrl:'',
      comment:typeof r.comment==='string'?r.comment:'',
      rating:rater,
      date:r.createTime||r.updateTime||null,
      reviewId:r.reviewId||null
    });
  }
  next=result.nextPageToken||'';
  pages++;
  if(pages>500)throw Error('Trop de pages : arrêt sans écriture pour éviter des avis incomplets');
}while(next);
if(!Number.isFinite(average)||!Number.isInteger(total)||total<0)throw Error('Moyenne et nombre d’avis non valides');
// Aucun fichier ne sera remplacé si l'API échoue ou si la pagination est incomplète.
const payload={
  source:'google_business_profile',
  connected:true,
  averageRating:average,
  totalReviewCount:total,
  updatedAt:new Date().toISOString(),
  reviews:all
};
await writeFile(new URL('../google-avis.json',import.meta.url),JSON.stringify(payload,null,2)+'\n','utf8');
console.log('Synchronisation terminée : '+all.length+' avis récupérés, total Google '+total+', '+pages+' page(s).');
