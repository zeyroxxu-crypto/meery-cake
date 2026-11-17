
/* Meery Cake V59 — accessible, conservative enhancement layer. */
(function(){
"use strict";
const $=id=>document.getElementById(id);
function elt(tag,cls,txt){
 const n=document.createElement(tag);
 if(cls)n.className=cls;
 if(txt!==undefined)n.textContent=txt;
 return n;
}
function addMenu(){
 const catalog=$('catalogue'),grid=$('catalogItems');
 if(!catalog||!grid||$('mc59MenuImages'))return;
 const intro=catalog.querySelector('.section-head');
 if(intro){
  const bar=elt('div','mc59-photo-bar');
  bar.id='mc59MenuImages';
  const pics=[
   ['images/patisseries.jpg','Pâtisseries photographiées chez Meery Cake'],
   ['images/cupcakes.jpg','Cupcakes photographiés chez Meery Cake'],
   ['images/brunch.jpg','Brunch photographié chez Meery Cake']
  ];
  for(const [src,alt] of pics){
   const f=elt('figure'),im=elt('img'),cap=elt('figcaption','',alt.replace(' photographiées chez Meery Cake','').replace(' photographié chez Meery Cake',''));
   im.src=src;im.alt=alt;im.loading='lazy';im.decoding='async';
   f.append(im,cap);bar.append(f);
  }
  const notice=elt('p','mc59-product-photo-note','Photos authentiques d’archives du salon, non associées à un produit précis. Prix et disponibilité à confirmer.');
  intro.after(bar,notice);
 }
 const enrich=()=>{
  for(const card of grid.querySelectorAll('.catalog-card')){
   if(card.querySelector('.mc59-catalog-meta'))continue;
   const meta=elt('div','mc59-catalog-meta');
   meta.append(elt('span','','Sélection indicative'));
   const a=elt('span','mc59-unknown','Allergènes à vérifier auprès du salon');
   meta.append(a);
   const price=card.querySelector('.price')?.textContent||'';
   if(!/\d/.test(price))meta.append(elt('span','mc59-unknown','Tarif à confirmer'));
   card.querySelector('.v6-product-content')?.append(meta);
  }
 };
 const obs=new MutationObserver(()=>enrich());
 obs.observe(grid,{childList:true});
 enrich();
}
function addCakePreview(){
 const form=$('cakeForm'),result=$('cakeResult');if(!form||!result||$('mc59CakePreview'))return;
 const box=elt('aside','mc59-cake-preview');box.id='mc59CakePreview';
 box.setAttribute('aria-label','Aperçu indicatif de votre gâteau');
 const heading=elt('strong','','Votre aperçu visuel');box.append(heading);
 const layout=elt('div','mc59-preview-layout');
 const scene=elt('div','mc59-cake-art');
 const plate=elt('div','mc59-cake-plate');
 const body=elt('div','mc59-cake-body');body.dataset.shape='Rond';
 body.append(elt('div','mc59-cake-top'));
 scene.append(plate,body);
 const info=elt('div','mc59-preview-details');
 const title=elt('div','mc59-cake-label','Une création à imaginer');
 const shape=elt('p','','Forme : à discuter');
 const flavor=elt('p','','Parfum : à discuter');
 const parts=elt('p','','Parts : à préciser');
 const note=elt('small','','Aperçu illustratif uniquement : il ne représente pas un modèle réellement proposé et n’est pas un devis.');
 info.append(title,shape,flavor,parts,note);
 layout.append(scene,info);box.append(layout);
 form.before(box);
 const colors=[['rose','#dba8b5'],['blanc','#f0ded8'],['doré','#d6b477'],['or','#d6b477'],['chocolat','#8a584e'],['vert','#a7bd9c'],['bleu','#adc9d5'],['violet','#b6a4c7'],['rouge','#c77d83'],['jaune','#ead18c']];
 const update=()=>{
  const v=id=>($(id)?.value||'').trim();
  const s=v('cakeShape'),f=v('cakeFlavor'),n=v('cakeParts'),o=v('cakeOccasion'),color=v('cakeColors').toLowerCase();
  const find=colors.find(pair=>color.includes(pair[0]));
  body.style.setProperty('--mc59-icing',find?.[1]||'#dba8b5');
  body.dataset.shape=s||'Rond';
  title.textContent=o||'Une création à imaginer';
  shape.textContent='Forme : '+(s||'À discuter');
  flavor.textContent='Parfum : '+(f||'À discuter');
  parts.textContent='Parts : '+(n||'À préciser');
 };
 form.addEventListener('input',update);
 form.addEventListener('change',update);
 form.addEventListener('click',e=>{if(e.target.closest('[data-choice]'))queueMicrotask(update)});
 update();
}
function galleryImprovement(){
 const grid=$('galleryGrid'),filter=$('galleryFilters'),light=$('lightbox');
 if(!grid||!filter||!light||$('mc59GalleryHelp'))return;
 const help=elt('p','mc59-gallery-help','Photos authentiques de Meery Cake. Choisissez une catégorie, puis cliquez sur une image pour l’agrandir. La sélection ne contient aucune image touristique sans rapport avec le salon.');
 help.id='mc59GalleryHelp';filter.after(help);
 const counter=elt('span','','');
 help.append(document.createTextNode(' '),counter);
 const update=()=>{const n=grid.querySelectorAll('.gallery-tile').length;counter.textContent='('+n+' photo'+(n>1?'s':'')+' affichée'+(n>1?'s':'')+')'};
 const ob=new MutationObserver(update);ob.observe(grid,{childList:true});update();
 const btn=()=>[...grid.querySelectorAll('.gallery-tile')];
 light.addEventListener('keydown',e=>{
  if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft')return;
  if(!light.classList.contains('open'))return;
  const pics=btn();if(!pics.length)return;
  const currentSrc=$('lightboxImage')?.getAttribute('src')||'';
  let idx=pics.findIndex(p=>p.querySelector('img')?.getAttribute('src')===currentSrc);
  idx=(idx+(e.key==='ArrowRight'?1:-1)+pics.length)%pics.length;
  pics[idx].click();e.preventDefault();
 });
 light.setAttribute('tabindex','-1');
 light.addEventListener('click',e=>{if(e.target===light)$('lightboxClose')?.click()});
}
function practical(){
 const el=document.querySelector('.faq'),contact=document.querySelector('.contact-card');
 if(!el||!contact||$('mc59Practical'))return;
 const box=elt('div','mc59-practical');box.id='mc59Practical';
 const cards=[
  ['Appeler Meery Cake','tel:+33983605602','Demander les horaires, disponibilités et tarifs'],
  ['Voir l’itinéraire','https://www.google.com/maps/search/?api=1&query=Meery+Cake+6+rue+Victor+Hugo+Carcassonne','6 rue Victor Hugo, Carcassonne'],
  ['Préparer un gâteau','gateaux.html','Formulaire et aperçu du projet, sans commande automatique']
 ];
 for(const [title,url,desc] of cards){
  const a=elt('a');a.href=url;if(url.startsWith('https:')){a.target='_blank';a.rel='noopener noreferrer'}
  a.append(elt('strong','',title),elt('span','',desc));box.append(a);
 }
 el.before(box);
}
function globalFixes(){
 document.querySelectorAll('img').forEach(img=>{
  img.decoding='async';
  if(img.closest('#accueil .mc33-slideshow')||img.hasAttribute('fetchpriority'))return;
  if(!img.hasAttribute('loading'))img.loading='lazy';
 });
 const table=document.querySelector('#catalogItems');
 if(table){table.setAttribute('aria-live','polite');table.setAttribute('aria-relevant','additions removals');}
 const search=$('catalogSearch');if(search)search.setAttribute('autocomplete','off');
}
function init(){addMenu();addCakePreview();galleryImprovement();practical();globalFixes();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
