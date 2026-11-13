/* Meery Cake V9 — polished site interactions; no 3D, checkout, notebook, or status centre.
   Lightweight vanilla JavaScript. No analytics or external dependencies. */
(function(){
'use strict';
const $=id=>document.getElementById(id);
const create=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n};
const motion=()=>{try{const pref=localStorage.getItem('meerycake-motion-preference');return pref==='on'||(pref!=='off'&&!matchMedia('(prefers-reduced-motion: reduce)').matches)}catch{return !matchMedia('(prefers-reduced-motion: reduce)').matches}};
const dataFile='v3-data.json';
function progressBar(){
 const meter=create('div','mc9-progress');meter.setAttribute('aria-hidden','true');document.body.append(meter);
 let queued=false;
 const draw=()=>{queued=false;const range=Math.max(1,document.documentElement.scrollHeight-innerHeight);meter.style.transform='scaleX('+Math.max(0,Math.min(1,scrollY/range))+')'};
 const onScroll=()=>{if(queued)return;queued=true;requestAnimationFrame(draw)};
 addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll,{passive:true});draw();
}
function footerInvite(){
 const footer=$('siteFooter');if(!footer||footer.querySelector('.mc9-footer-banner'))return;
 const bar=create('div','mc9-footer-banner'),wrap=create('div','container'),copy=create('div');
 copy.append(create('strong','','La prochaine douceur vous attend.'),create('span','','Un projet de gâteau ? Une question sur la carte ? Contactez directement le salon.'));
 const link=create('a','','Nous contacter ↗');link.href='index.html#contact';
 wrap.append(copy,link);bar.append(wrap);footer.prepend(bar);
}
function renderHomeCollections(){
 const main=$('main');if(!main||!$('accueil')||$('mc9Collections'))return;
 const anchor=$('decouvrir');
 if(!anchor)return;
 const section=create('section','mc9-home-collections');section.id='mc9Collections';
 const shell=create('div','container'),head=create('div','mc9-collection-head');
 const copy=create('div');copy.append(create('span','v8-overline','À découvrir au salon'));
 const title=create('h2');title.append('Chaque envie a ',(()=>{const em=create('em','','sa douceur.');return em})());copy.append(title);
 head.append(copy,create('p','','Parcourez les univers Meery Cake : une pause sucrée, un brunch à envisager ou votre prochain gâteau sur mesure. Les disponibilités sont à confirmer directement avec le salon.'));
 const grid=create('div','mc9-collection-grid');
 const entries=[
  {href:'carte.html?category=desserts#catalogue',src:'https://cdt11.media.tourinsoft.eu/upload/MEERY-CAKE-1.jpg',label:'Les douceurs',title:'Pâtisseries',desc:'Cupcakes et créations gourmandes à découvrir dans notre carte.',cta:'Découvrir la carte ↗'},
  {href:'brunch.html',src:'https://cdt11.media.tourinsoft.eu/upload/MEERY-CAKE-2.jpg',label:'À partager',title:'Brunch & moments',desc:'Préparez votre demande et vérifiez les prochaines possibilités.',cta:'En savoir plus ↗'},
  {href:'gateaux.html',src:'https://crtlr.media.tourinsoft.eu/upload/meery-cake-4.jpg?width=770',label:'Votre création',title:'Gâteaux sur mesure',desc:'Choisissez forme, couleurs et décors dans le configurateur.',cta:'Imaginer mon gâteau ↗'}
 ];
 for(const item of entries){
  const a=create('a','mc9-collection-card');a.href=item.href;
  const image=create('img');image.src=item.src;image.loading='lazy';image.decoding='async';image.alt='Photographie d’archive Meery Cake, ambiance non contractuelle';
  const label=create('span','',item.label),content=create('div');
  content.append(create('h3','',item.title),create('p','',item.desc),create('small','',item.cta));a.append(image,label,content);grid.append(a)
 }
 const caption=create('p','mc9-collection-caption','Photographies d’archives : certaines peuvent dater d’un ancien local. Leur droit d’utilisation et leur actualité sont à confirmer avant une publication commerciale.');
 shell.append(head,grid,caption);section.append(shell);
 anchor.before(section);
 const stats=create('div','mc9-stats-strip');
 [['51','Références dans la maquette'],['8','Langues proposées'],['♡','Gâteaux personnalisés']].forEach(([number,label])=>{const item=create('div');item.append(create('strong','',number),create('span','',label));stats.append(item)});
 section.after(stats);
}
function addCatalogueTools(){
 const section=$('catalogue'),items=$('catalogItems'),toolbar=document.querySelector('.catalog-toolbar');
 if(!section||!items||!toolbar||$('mc9Sort'))return;
 const controls=create('div','mc9-shop-tools'),left=create('div'),right=create('div');
 const label=create('label','','Trier par :');label.htmlFor='mc9Sort';
 const select=create('select');select.id='mc9Sort';select.setAttribute('aria-label','Trier les pâtisseries');
 [['original','Ordre de la carte'],['name','Nom A → Z'],['name-desc','Nom Z → A'],['price-asc','Prix croissant*'],['price-desc','Prix décroissant*']].forEach(([value,txt])=>{const o=create('option','',txt);o.value=value;select.append(o)});
 const clear=create('button','mc9-quiet-button','Réinitialiser les filtres');clear.id='mc9Reset';clear.type='button';
 const total=create('span','mc9-meta');total.id='mc9Total';
 left.append(label,select);right.append(total,clear);controls.append(left,right);
 const filters=$('catalogFilters');if(filters)filters.after(controls);else toolbar.after(controls);
 const empty=create('div','mc9-catalog-empty');empty.id='mc9Empty';empty.hidden=true;
 empty.append(create('strong','','Aucun produit trouvé'),create('p','','Essayez une autre recherche ou affichez toutes les catégories.'));
 const emptyReset=create('button','mc9-quiet-button','Voir tous les produits');emptyReset.type='button';
 empty.append(emptyReset);items.after(empty);
 const allItems=()=>[...items.querySelectorAll('.catalog-card')];
 let updating=false;
 const count=()=>{
  const x=allItems();total.textContent=x.length+' produit'+(x.length>1?'s':'')+' affiché'+(x.length>1?'s':'');
  empty.hidden=x.length!==0;
  for(const message of items.querySelectorAll(':scope > p'))message.hidden=x.length===0;
 };
 const priceOf=card=>{
  const text=card.querySelector('.price')?.textContent||'';
  const match=text.replace(/\s/g,'').replace(',','.').match(/(\d+(?:\.\d+)?)/);
  return match?Number(match[1]):null;
 };
 const sort=()=>{
  if(updating)return;updating=true;
  const direction=select.value,cards=allItems();
  if(direction==='original'){
   const catalog=typeof MC!=='undefined'&&MC.data?.menu?MC.data.menu:[];
   const positions=new Map(catalog.flatMap(g=>g.items).map((p,i)=>[p.id,i]));
   cards.sort((a,b)=>(positions.get(a.dataset.productId)??9999)-(positions.get(b.dataset.productId)??9999));
  }else{
   cards.sort((a,b)=>{
    const nameA=a.querySelector('h3')?.textContent||'',nameB=b.querySelector('h3')?.textContent||'';
    if(direction==='name')return nameA.localeCompare(nameB,'fr',{sensitivity:'base'});
    if(direction==='name-desc')return nameB.localeCompare(nameA,'fr',{sensitivity:'base'});
    const pA=priceOf(a),pB=priceOf(b);
    if(pA===null)return pB===null?0:1;if(pB===null)return -1;
    return direction==='price-desc'?pB-pA:pA-pB;
   });
  }
  if(cards.length&&cards.some((card,index)=>items.children[index]!==card))items.append(...cards);
  count();updating=false;
 };
 const observer=new MutationObserver(()=>{if(updating)return;requestAnimationFrame(sort)});
 observer.observe(items,{childList:true});
 select.addEventListener('change',sort);
 const reset=()=>{
  select.value='original';
  const search=$('catalogSearch');if(search){search.value='';search.dispatchEvent(new Event('input',{bubbles:true}))}
  const favs=$('onlyFavs');if(favs?.checked){favs.checked=false;favs.dispatchEvent(new Event('change',{bubbles:true}))}
  const first=$('catalogFilters')?.querySelector('button');if(first&&!first.classList.contains('active'))first.click();
  sort();
 };
 clear.addEventListener('click',reset);emptyReset.addEventListener('click',reset);
 const footnote=create('div','mc9-minor-alert','* Tri indicatif : les prix et compositions sont ceux de la maquette et doivent être confirmés auprès du salon. Les produits sans prix sont affichés à la fin.');
 controls.after(footnote);
 count();
}
function galleryCount(){
 const grid=$('galleryGrid'),filters=$('galleryFilters');if(!grid||!filters||$('mc9GalleryCount'))return;
 const count=create('div','mc9-gallery-counter','');count.id='mc9GalleryCount';grid.before(count);
 const update=()=>{const n=grid.querySelectorAll('.gallery-tile').length;count.textContent=n+' photographie'+(n>1?'s':'')+' présentée'+(n>1?'s':'')+' · archives et sources publiques'};
 const observer=new MutationObserver(update);observer.observe(grid,{childList:true});
 filters.addEventListener('click',()=>requestAnimationFrame(update));update();
}
function enrichCake(){
 const form=$('cakeForm');if(!form||$('mc9CakeIntro'))return;
 const parent=form.parentElement,block=create('div','mc9-cake-intro');block.id='mc9CakeIntro';
 const icon=create('span','mc9-cake-intro-icon','✿'),copy=create('div');
 copy.append(create('strong','','Imaginez votre gâteau en quelques étapes'),create('p','','Personnalisez votre idée, découvrez l’aperçu illustré et préparez un message. Le salon confirmera le devis et la faisabilité.'));
 const checklist=create('div','mc9-cake-checklist');
 for(const x of ['✦ Forme','✦ Couleurs','✦ Décoration','✦ Aperçu 2D'])checklist.append(create('span','',x));
 copy.append(checklist);block.append(icon,copy);form.before(block);
 const date=$('cakeDate');if(date){
  const now=new Date();const local=new Date(now.getTime()-now.getTimezoneOffset()*60000);
  date.min=local.toISOString().slice(0,10);
 }
 const color=$('cakeColors');if(color){color.setAttribute('autocomplete','off')}
}
function scrollSections(){
 const targets=document.querySelectorAll('.mc9-collection-head,.mc9-collection-card,.v8-editorial-copy,.v8-photo-composition');
 if(!('IntersectionObserver'in window)||!motion())return;
 const io=new IntersectionObserver(entries=>{
  for(const e of entries){if(e.isIntersecting){e.target.classList.add('mc9-revealed');io.unobserve(e.target)}}
 },{threshold:.1,rootMargin:'0px 0px -20px 0px'});
 targets.forEach(x=>{
  const r=x.getBoundingClientRect();
  x.classList.add('mc9-reveal');
  if(r.top<innerHeight*.92)x.classList.add('mc9-revealed');else io.observe(x)
 });
 window.addEventListener('mc:motion-preference-change',()=>{if(!motion())targets.forEach(x=>x.classList.add('mc9-revealed'))})
}
function siteUtilities(){
 const addMissingAlt=document.querySelectorAll('img:not([alt])');addMissingAlt.forEach(img=>img.alt='Photographie d’ambiance Meery Cake');
 const large=document.querySelectorAll('.hero-visual img,.v8-photo-composition img');large.forEach(img=>{img.decoding='async'});
 const footer=$('siteFooter');if(footer)footerInvite();
 progressBar();
 const reminder=create('div','mc9-floating-scroll'),label=create('span','','Meery Cake');reminder.append(label);document.body.append(reminder);
 let busy=false;const update=()=>{busy=false;reminder.classList.toggle('mc9-visible',scrollY>900)};
 addEventListener('scroll',()=>{if(!busy){busy=true;requestAnimationFrame(update)}},{passive:true});update();
}
function init(){
 renderHomeCollections();addCatalogueTools();galleryCount();enrichCake();siteUtilities();scrollSections()
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();