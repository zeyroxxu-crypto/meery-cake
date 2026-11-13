/* Meery Cake V6 — progressive enhancement, no pretending live orders, payments or bookings */
(function(){
'use strict';
const $=id=>document.getElementById(id);
const node=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e};
const escapeXml=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const safeText=(id,fallback)=>($(id)?.value||'').trim()||fallback;
const flagPath='v6-integrations.json';
let config=null;
async function loadConfig(){try{const r=await fetch(flagPath,{cache:'no-store'});if(r.ok){const p=await r.json();if(p?.demo===true)return p}}catch{}return null}
function enhanceHome(){
 const hero=document.querySelector('.hero');if(!hero)return;
 const label=hero.querySelector('.hero-content>.eyebrow');if(label)label.classList.add('v6-hero-kicker');
 const info=hero.querySelector('.hero-content');
 if(info&&!info.querySelector('.v6-hero-stats')){
 const stats=node('div','v6-hero-stats');
 [['✦','Une adresse gourmande à Carcassonne'],['♡','Créations sur mesure à demander'],['★','Distinction CCI Aude 2025']].forEach(([symbol,text])=>{
  const span=node('span');span.append(node('strong','',symbol+' '+text));stats.append(span)
 });
 info.append(stats);
 }
 const before=hero.nextElementSibling;
 if(before&&!document.querySelector('.v6-ribbon')){
 const band=node('div','v6-ribbon'),wrap=node('div','container');
 ['Pâtisseries & douceurs','✦','Brunch sur demande','✦','Gâteaux sur mesure','✦','Salon de thé à Carcassonne'].forEach((text,i)=>wrap.append(node(i%2?'i':'span','',text)));
 band.append(wrap);hero.after(band);
 }
 document.querySelectorAll('.section.tint,.section.white').forEach(e=>e.classList.add('v6-ambient-section'));
}
function makeCakeSvg(){
 const NS='http://www.w3.org/2000/svg';
 const svg=document.createElementNS(NS,'svg');svg.setAttribute('viewBox','0 0 520 340');
 svg.setAttribute('role','img');svg.setAttribute('aria-label','Aperçu artistique du gâteau, non contractuel');
 const defs=document.createElementNS(NS,'defs');
 defs.innerHTML='<linearGradient id="v6-glaze" x1="0" x2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".62"/><stop offset=".55" stop-color="#ffffff" stop-opacity=".12"/><stop offset="1" stop-color="#704257" stop-opacity=".12"/></linearGradient><filter id="v6-shadow" x="-30%" y="-30%" width="160%" height="200%"><feGaussianBlur stdDeviation="8"/></filter>';
 svg.append(defs);
 const stage=document.createElementNS(NS,'g');stage.innerHTML='<ellipse cx="260" cy="296" rx="170" ry="22" fill="#785064" opacity=".13" filter="url(#v6-shadow)"/><ellipse cx="260" cy="300" rx="156" ry="17" fill="#bd95a4"/><ellipse cx="260" cy="295" rx="153" ry="15" fill="#f4e8e8"/><ellipse cx="260" cy="289" rx="148" ry="10" fill="#fff9f4"/>';
 svg.append(stage);
 const parts=document.createElementNS(NS,'g');parts.id='v6CakeLayers';svg.append(parts);
 const flowers=document.createElementNS(NS,'g');flowers.id='v6CakeDecoration';svg.append(flowers);
 const signature=document.createElementNS(NS,'text');signature.setAttribute('x','260');signature.setAttribute('y','330');signature.setAttribute('text-anchor','middle');signature.setAttribute('font-size','10');signature.setAttribute('fill','#9e7c8a');signature.setAttribute('font-family','Arial');signature.textContent='APERÇU ILLUSTRATIF · MEERY CAKE';svg.append(signature);
 return svg;
}
function cakeVisual(){
 const form=$('cakeForm');if(!form||$('v6CakeStudio'))return;
 const layout=form.closest('.page-layout');if(layout)layout.classList.add('v6-cake-layout');
 const panel=form.closest('.panel');if(!panel)return;
 const studio=node('section','v6-cake-studio');studio.id='v6CakeStudio';studio.setAttribute('aria-label','Aperçu visuel interactif du gâteau');
 const head=node('div','v6-cake-studio-header'),left=node('div');
 left.append(node('span','eyebrow','Cake design studio'),node('strong','','Votre création en direct'));
 head.append(left,node('span','v6-preview-tag','Aperçu indicatif'));
 const stage=node('div','v6-cake-stage');
 const svg=makeCakeSvg();stage.append(svg);
 const chips=node('div','v6-preview-details');chips.id='v6CakeChips';
 const actions=node('div','v6-preview-actions'),note=node('p','','Visualisation artistique uniquement : forme, décor et résultat final devront être confirmés par Meery Cake.');
 const dl=node('button','','Enregistrer l’aperçu ↧');dl.type='button';dl.id='v6CakeDownload';actions.append(note,dl);
 const caption=node('p','v6-cake-caption','La simulation ne constitue pas un devis ni une photographie d’un gâteau réalisable.');
 studio.append(head,stage,chips,actions,caption);
 const aside=layout?.querySelector(':scope > aside');
 const smallScreen=window.matchMedia?.('(max-width: 879px)');
 const placeStudio=()=>{
  if(smallScreen?.matches||!aside)form.before(studio);
  else aside.prepend(studio);
 };
 placeStudio();
 if(smallScreen?.addEventListener)smallScreen.addEventListener('change',placeStudio);
 else smallScreen?.addListener?.(placeStudio);
 const namespace='http://www.w3.org/2000/svg';
 function shape(tag,attrs,parent){const e=document.createElementNS(namespace,tag);for(const [k,v] of Object.entries(attrs))e.setAttribute(k,String(v));parent.append(e);return e}
 function palette(){
  const val=safeText('cakeColors','rose poudré').toLowerCase();
  const pairs=[
   [/rouge|red|rojo|rosso|vermelho|rood|czerw/i,['#c75c70','#a7485d']],
   [/bleu|blue|azul|blu|blauw|niebies/i,['#96b8d0','#7299b9']],
   [/vert|green|verde|groen|zielon/i,['#b4d5ad','#81aa83']],
   [/violet|purple|mauve|lila|fiolet/i,['#baacd7','#9284b7']],
   [/jaune|yellow|amarillo|giallo|amarelo|geel|żółt/i,['#f0d995','#cfad64']],
   [/blanc|white|blanco|bianco|branco|wit|biał/i,['#f7e9df','#d4c4bd']],
   [/noir|black|negro|nero|preto|zwart|czarn/i,['#77717b','#534755']],
   [/chocolat|brown|marron|braun|marrone|castanho|bruin|brąz/i,['#b58a76','#936655']]
  ];
  for(const [re,c] of pairs)if(re.test(val))return c;
  return ['#efc2d2','#cb91ab'];
 }
 function draw(){
  const colors=palette(),square=/carr|square|quadr|vierkant|kwadrat/i.test(safeText('cakeShape',''));
  const stacked=/étages|tier|piani|andares|lagen|piętr/i.test(safeText('cakeShape',''));
  const count=Number(safeText('cakeParts','8'))||8;
  const layers=svg.querySelector('#v6CakeLayers'),decors=svg.querySelector('#v6CakeDecoration');
  layers.replaceChildren();decors.replaceChildren();
  function tier(x,y,width,height,color,shade){
   shape('rect',{x,y,width,height,rx:square?7:width*.17,fill:color,stroke:shade,'stroke-width':2},layers);
   shape('rect',{x:x+4,y:y+4,width:width-8,height:height*.58,rx:square?4:width*.16,fill:'url(#v6-glaze)'},layers);
   shape('path',{d:'M'+(x+16)+' '+(y+height*.8)+' Q'+(x+width/2)+' '+(y+height*.75)+' '+(x+width-16)+' '+(y+height*.8),stroke:shade,'stroke-width':5,'stroke-linecap':'round',fill:'none',opacity:.55},layers);
   for(let i=1;i<7;i++){const px=x+i*width/7;shape('circle',{cx:px,cy:y+height-11,r:4,fill:'#fff9f5',opacity:.96},layers)}
  }
  tier(130,190,260,100,colors[0],colors[1]);
  if(stacked)tier(170,110,180,85,colors[0],colors[1]);
  else tier(148,161,224,55,colors[0],colors[1]);
  const top=stacked?105:157,occasion=safeText('cakeOccasion','').toLowerCase(),notes=safeText('cakeNotes','').toLowerCase();
  const isPearls=/perles sucrées|sugar pearls|perlas|zuckerperlen|perline|pérolas|suikerparels|perełki/i.test(notes);
  const isBerries=/fruits rouges|berries|frutos rojos|rote früchte|frutti rossi|frutos vermelhos|rood fruit|owoce leśne/i.test(notes);
  const isFlowers=!isPearls&&!isBerries&&(/fleur|flor|flower|blumen|bloem|kwiat/i.test(notes)||/mariage|wedding|bod|hochzeit|matrimonio|casamento|ślub/i.test(occasion));
  if(isFlowers){
    [[222,top+4],[260,top-3],[297,top+5],[346,225],[172,230]].forEach(([cx,cy],i)=>{
      for(let petal=0;petal<5;petal++){const theta=petal*Math.PI*2/5;shape('ellipse',{cx:cx+Math.cos(theta)*9,cy:cy+Math.sin(theta)*9,rx:7,ry:9,fill:i%2?'#fbf4dd':'#fff8f3',transform:'rotate('+(petal*72)+' '+(cx+Math.cos(theta)*9)+' '+(cy+Math.sin(theta)*9)+')'},decors)}
      shape('circle',{cx,cy,r:5,fill:'#d4a36f'},decors);
    });
  }else if(isPearls){
    for(let j=0;j<24;j++){
      const angle=j*Math.PI*2/24, cx=260+Math.cos(angle)*Math.min(83,84),cy=top+10+Math.sin(angle)*13;
      shape('circle',{cx:cx.toFixed(2),cy:cy.toFixed(2),r:j%3===0?5:3.6,fill:j%3===0?'#f5cf9c':'#fffcf5',stroke:'#d9bdbf','stroke-width':.5},decors);
    }
  }else if(isBerries){
    [[204,top+7],[226,top+2],[260,top-3],[292,top+4],[316,top+9]].forEach(([cx,cy],i)=>{
      shape('ellipse',{cx,cy,rx:9,ry:8,fill:i%2?'#c44966':'#ab3750'},decors);
      shape('circle',{cx:cx-2,cy:cy-3,r:2,fill:'#fff9ec',opacity:.65},decors);
      shape('path',{d:'M'+cx+' '+(cy-6)+' q3 -8 8 -6',stroke:'#7b9d72','stroke-width':3,fill:'none'},decors);
    });
  }else{
    [[202,top+7],[228,top-4],[259,top-1],[290,top+4],[319,top+9]].forEach(([cx,cy],i)=>{
      shape('circle',{cx,cy,r:i%2?5:7,fill:i%2?'#f8f1d9':'#fffcf7'},decors);
      shape('circle',{cx:cx+2,cy:cy-1,r:2,fill:'#d8a86d'},decors);
    });
  }
  if(count>=20){shape('path',{d:'M235 '+(top-15)+' Q260 '+(top-47)+' 285 '+(top-15),stroke:'#bb997f','stroke-width':3,fill:'none'},decors)}
  chips.replaceChildren();
  [[safeText('cakeShape','Forme à discuter')],[safeText('cakeOccasion','Occasion à définir')],[count+' parts envisagées'],[safeText('cakeFlavor','Parfum à confirmer')]].forEach(([value])=>chips.append(node('span','tag',value.slice(0,55))));
 }
 form.addEventListener('input',draw);
 form.addEventListener('change',draw);
 form.addEventListener('click',e=>{if(e.target.closest('[data-choice]'))requestAnimationFrame(draw)});
 draw();
 dl.addEventListener('click',()=>{
  try{
   const copy=svg.cloneNode(true);
   copy.setAttribute('xmlns','http://www.w3.org/2000/svg');
   const xml=new XMLSerializer().serializeToString(copy);
   const blob=new Blob([xml],{type:'image/svg+xml;charset=utf-8'});
   const url=URL.createObjectURL(blob);
   const a=document.createElement('a');a.href=url;a.download='meery-cake-apercu-gateau.svg';document.body.append(a);a.click();a.remove();
   setTimeout(()=>URL.revokeObjectURL(url),1500);
  }catch(e){if(window.MC?.toast)MC.toast('Export indisponible sur cet appareil.')}
 });
}
function bookingStatus(){
 const form=$('brunchForm');if(!form)return;
 if($('v6BookingStatus'))return;
 const box=node('div','v6-booking-status');box.id='v6BookingStatus';
 const icon=node('span','v6-status-icon','⏱'),content=node('div');
 content.append(node('strong','','Créneaux à confirmer par le salon'),node('p','','La plateforme ne reçoit pas les disponibilités réelles et ne peut pas confirmer une réservation. Remplissez la demande, puis contactez directement Meery Cake pour recevoir sa confirmation.'));
 box.append(icon,content);
 form.prepend(box);
}
function adminStatus(){
 const form=$('adminForm');if(!form||$('v6AdminStatus'))return;
 const box=node('div','v6-booking-status');box.id='v6AdminStatus';
 const icon=node('span','v6-status-icon','🔒'),content=node('div');
 content.append(node('strong','','Administration de démonstration — aucun accès propriétaire connecté'),node('p','','Les changements restent dans ce navigateur. Le véritable tableau de bord nécessitera une connexion sécurisée, des rôles, une base de données et l’autorisation du responsable de Meery Cake.'));
 box.append(icon,content);
 form.before(box);
}
function renderConnectionStatus(){
 const target=$('v6ConnectionGrid');if(!target)return;
 const configs=[
  {id:'reservationsConnected',title:'Réservations confirmées',body:'Calendrier, capacités et confirmation par le salon.',requires:'Disponibilités officielles, outil de réservation et notification sécurisée'},
  {id:'preordersConnected',title:'Click & Collect',body:'Validation des commandes et créneaux de retrait.',requires:'Prix et produits validés, stock, CGV, réception privée des commandes'},
  {id:'paymentsConnected',title:'Paiement sécurisé',body:'Paiements gérés par un prestataire agréé.',requires:'Compte commerçant, contrat du prestataire et conditions de vente'},
  {id:'adminBackendConnected',title:'Administration sécurisée',body:'Accès propriétaire avec comptes et droits.',requires:'Identité des administrateurs, base de données et authentification'},
  {id:'googleReviewsConnected',title:'Avis Google authentiques',body:'Synchronisation des avis après autorisation.',requires:'Accès OAuth Google Business Profile de la fiche vérifiée'},
  {id:'realTimeInventoryConnected',title:'Produits disponibles',body:'Stock et disponibilité mis à jour par le salon.',requires:'Gestion de stock fiable et produits vérifiés'}
 ];
 for(const item of configs){
  const ok=config?.features?.[item.id]?.connected===true;
  const card=node('article','v6-connection'),tag=node('span','tag '+(ok?'gold':'muted'),ok?'Connecté':'En attente de connexion');
  const heading=node('strong','',item.title),desc=node('p','',item.body),detail=node('p','','Pour activer : '+item.requires+'.');
  card.append(tag,heading,desc,detail);target.append(card)
 }
}
async function clickCollect(){
 const form=$('v6PickupForm');if(!form)return;
 const list=$('v6PickupItems'),out=$('v6PickupResult'),text=$('v6PickupSummary'),date=$('v6PickupDate');
 const data=await fetch('v3-data.json',{cache:'no-store'}).then(x=>x.json()).catch(()=>({menu:[]}));
 const inventory=new Map((data.menu||[]).flatMap(g=>g.items.map(p=>[p.id,p])));
 let selected=[];
 try{selected=JSON.parse(localStorage.getItem('meerycake-v3-favorites')||'[]')}catch{}
 if(!Array.isArray(selected))selected=[];
 selected=selected.filter(id=>inventory.has(id)).slice(0,60);
 list.replaceChildren();
 if(!selected.length){list.append(node('p','','Aucun favori sélectionné. Ajoutez des pâtisseries depuis la carte ou le carnet gourmand.'));form.querySelector('button[type="submit"]').disabled=true}
 else for(const id of selected){const p=inventory.get(id),row=node('label','field full'),checkbox=document.createElement('input');checkbox.type='checkbox';checkbox.value=id;checkbox.checked=true;checkbox.style.width='19px';checkbox.style.minHeight='19px';row.style.flexDirection='row';row.style.alignItems='center';row.append(checkbox,node('span','',p.name+' · '+(p.price||'prix à confirmer')));list.append(row)}
 if(date){const now=new Date();now.setMinutes(now.getMinutes()-now.getTimezoneOffset());date.min=now.toISOString().slice(0,10)}
 form.addEventListener('submit',e=>{
  e.preventDefault();if(!form.reportValidity())return;
  const chosen=[...list.querySelectorAll('input:checked')].map(i=>inventory.get(i.value)).filter(Boolean);
  if(!chosen.length){out.hidden=false;text.textContent='Sélectionnez au moins un produit.';return}
  const v=id=>$(id)?.value.trim()||'Non renseigné';
  const msg=['Bonjour Meery Cake, je souhaite demander si une commande à récupérer sur place serait possible.','','Produits souhaités :',...chosen.map(p=>'• '+p.name+' — '+(p.price||'prix à confirmer')),'','Date de retrait souhaitée : '+v('v6PickupDate'),'Moment préféré : '+v('v6PickupTime'),'Nom : '+v('v6PickupName'),'Contact : '+v('v6PickupContact'),'Précisions : '+(v('v6PickupNotes')||'Aucune'),'', 'Pouvez-vous confirmer les produits disponibles, le tarif, les conditions de retrait et la faisabilité ?','Ceci est seulement une demande préparée, sans commande ni paiement.'].join('\n');
  text.textContent=msg;out.hidden=false;out.scrollIntoView({behavior:'smooth',block:'nearest'})
 });
 $('v6PickupCopy')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(text.textContent);window.MC?.toast?.('Demande copiée ♡')}catch{window.MC?.toast?.('Copie indisponible.')}});
 $('v6PickupShare')?.addEventListener('click',async()=>{if(navigator.share)try{await navigator.share({title:'Demande de retrait Meery Cake',text:text.textContent})}catch{}});
}
async function boot(){
 enhanceHome();cakeVisual();bookingStatus();adminStatus();
 config=await loadConfig();renderConnectionStatus();await clickCollect();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
