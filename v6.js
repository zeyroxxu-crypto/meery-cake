/* Meery Cake V6 — progressive enhancement, no pretending live orders, payments or bookings */
(function(){
'use strict';
const $=id=>document.getElementById(id);
const node=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e};
const escapeXml=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const safeText=(id,fallback)=>($(id)?.value||'').trim()||fallback;
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
 const svg=document.createElementNS(NS,'svg');
 svg.setAttribute('viewBox','0 0 520 340');
 svg.setAttribute('role','img');
 svg.setAttribute('aria-label','Illustration en deux dimensions, vue du dessus du gâteau personnalisé');
 const background=document.createElementNS(NS,'g');
 background.innerHTML='<circle cx="260" cy="168" r="155" fill="#fffaf8" stroke="#e6cad2" stroke-width="1.8"/><circle cx="260" cy="168" r="146" fill="none" stroke="#eddce1" stroke-dasharray="3 9" stroke-width="1.5"/>';
 svg.append(background);
 const layers=document.createElementNS(NS,'g');layers.id='v6CakeLayers';svg.append(layers);
 const decorations=document.createElementNS(NS,'g');decorations.id='v6CakeDecoration';svg.append(decorations);
 const label=document.createElementNS(NS,'text');
 label.setAttribute('x','260');label.setAttribute('y','336');label.setAttribute('text-anchor','middle');
 label.setAttribute('font-family','Arial, sans-serif');label.setAttribute('font-size','9');
 label.setAttribute('letter-spacing','2');label.setAttribute('fill','#996d80');
 label.textContent='VUE DU DESSUS · ILLUSTRATION 2D';
 svg.append(label);
 return svg;
}
function cakeVisual(){
 const form=$('cakeForm');if(!form||$('v6CakeStudio'))return;
 const layout=form.closest('.page-layout');if(layout)layout.classList.add('v6-cake-layout');
 const panel=form.closest('.panel');if(!panel)return;
 const studio=node('section','v6-cake-studio');studio.id='v6CakeStudio';studio.setAttribute('aria-label','Illustration 2D du gâteau, vue du dessus');
 const head=node('div','v6-cake-studio-header'),left=node('div');
 left.append(node('span','eyebrow','Atelier de création'),node('strong','','Votre gâteau en 2D'));
 head.append(left,node('span','v6-preview-tag','Dessin 2D · vue du dessus'));
 const stage=node('div','v6-cake-stage');
 const svg=makeCakeSvg();stage.append(svg);
 const chips=node('div','v6-preview-details');chips.id='v6CakeChips';
 const actions=node('div','v6-preview-actions'),note=node('p','','Illustration 2D simplifiée : la réalisation réelle, la forme et les décorations doivent être confirmées par Meery Cake.');
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
  const cx=260,cy=168,outer=115;
  // Strictly flat, top-down graphic: no perspective, side panels, cast shadow or 3D highlights.
  if(square){
   shape('rect',{x:145,y:53,width:230,height:230,rx:12,fill:colors[0],stroke:colors[1],'stroke-width':5},layers);
   shape('rect',{x:160,y:68,width:200,height:200,rx:9,fill:'none',stroke:'#fffaf6','stroke-width':6},layers);
   if(stacked)shape('rect',{x:182,y:90,width:156,height:156,rx:8,fill:'none',stroke:colors[1],'stroke-width':6},layers);
  }else{
   shape('circle',{cx,cy,r:outer,fill:colors[0],stroke:colors[1],'stroke-width':5},layers);
   shape('circle',{cx,cy,r:99,fill:'none',stroke:'#fffaf6','stroke-width':7},layers);
   if(stacked)shape('circle',{cx,cy,r:78,fill:'none',stroke:colors[1],'stroke-width':6},layers);
  }
  const occasion=safeText('cakeOccasion','').toLowerCase(),notes=safeText('cakeNotes','').toLowerCase();
  const isPearls=/perles sucrées|sugar pearls|perlas|zuckerperlen|perline|pérolas|suikerparels|perełki/i.test(notes);
  const isBerries=/fruits rouges|berries|frutos rojos|rote früchte|frutti rossi|frutos vermelhos|rood fruit|owoce leśne/i.test(notes);
  const isFlowers=!isPearls&&!isBerries&&(/fleur|flor|flower|blumen|bloem|kwiat/i.test(notes)||/mariage|wedding|bod|hochzeit|matrimonio|casamento|ślub/i.test(occasion));
  const positions=[[217,124],[257,111],[303,131],[208,179],[259,173],[309,195],[242,220],[281,221]];
  if(isFlowers){
   for(const [x,y] of positions.slice(0,6)){
    for(let j=0;j<5;j++){
     const a=j*Math.PI*2/5;
     shape('circle',{cx:(x+Math.cos(a)*9).toFixed(2),cy:(y+Math.sin(a)*9).toFixed(2),r:8,fill:'#fff9f3',stroke:'#e3cad2','stroke-width':1},decors);
    }
    shape('circle',{cx:x,cy:y,r:5,fill:'#c99b72'},decors);
   }
  }else if(isBerries){
   for(const [x,y] of positions){
    shape('circle',{cx:x,cy:y,r:9,fill:'#b64d68'},decors);
    shape('circle',{cx:x-3,cy:y-3,r:2,fill:'#fff8f4',opacity:.75},decors);
    shape('path',{d:'M'+x+' '+(y-8)+' l6 -7',stroke:'#749b76','stroke-width':2,'stroke-linecap':'round'},decors);
   }
  }else{
   const radius=isPearls?85:79;
   for(let j=0;j<24;j++){
    const a=j*Math.PI*2/24;
    shape('circle',{cx:(cx+Math.cos(a)*radius).toFixed(2),cy:(cy+Math.sin(a)*radius).toFixed(2),r:isPearls?4.8:3.6,fill:isPearls?'#fff9f0':'#f8f3ea',stroke:isPearls?'#d4aa88':'#ddc6b3','stroke-width':1},decors);
   }
   if(!isPearls){
    shape('text',{x:cx,y:cy+7,'text-anchor':'middle','font-family':'Georgia,serif','font-size':28,'font-style':'italic',fill:'#80556c'},decors).textContent='Meery Cake';
   }
  }
  if(count>=20){
   const t=shape('text',{x:cx,y:cy+46,'text-anchor':'middle','font-size':12,'font-family':'Arial,sans-serif',fill:'#80556c'},decors);
   t.textContent=count+' parts';
  }
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
function boot(){
 enhanceHome();bookingStatus();adminStatus();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
