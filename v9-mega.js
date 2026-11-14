/* Meery Cake V9 — polished site interactions; no 3D, checkout, notebook, or status centre.
   Lightweight vanilla JavaScript. No analytics or external dependencies. */
(function(){
'use strict';
const $=id=>document.getElementById(id);
const create=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n};
const motion=()=>true;
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
 copy.append(create('strong','','Votre demande de gâteau personnalisé'),create('p','','Indiquez vos envies dans le formulaire pour préparer une demande à transmettre au salon. Le devis et la faisabilité restent à confirmer.'));
 const checklist=create('div','mc9-cake-checklist');
 for(const x of ['✦ Forme','✦ Couleurs','✦ Décoration','✦ Demande simple'])checklist.append(create('span','',x));
 copy.append(checklist);block.append(icon,copy);form.before(block);
 const date=$('cakeDate');if(date){
  const now=new Date();const local=new Date(now.getTime()-now.getTimezoneOffset()*60000);
  date.min=local.toISOString().slice(0,10);
 }
 const color=$('cakeColors');if(color){color.setAttribute('autocomplete','off')}
}
function scrollSections(){
 // Animate on every new viewport entry, but never hide an element after its first reveal.
 const selector=[
  '.section .section-head','.section .editorial-card','.section .event-card',
  '.section .promo-box','.section .contact-card','.section .review-summary',
  '.section .review-status','.section .contact-map','.section .panel',
  '.section .gallery-tile','.section .gallery-photo','.section .catalog-card',
  '.section .review-panel','.section .faq details','.section .featured-gallery a',
  '.feature-split .feature-copy','.feature-split .feature-image',
  '.v8-editorial-copy','.v8-photo-composition','.mc9-collection-head',
  '.mc9-collection-card','.award-copy','.menu-panel','.top-strip > a',
  '.page-hero .container','.section .review-side-card','.section .google-panel',
  '.section .menu-shell','.section .promo-row'
 ].join(',');
 if(!('IntersectionObserver' in window))return;
 const seen=new WeakSet(),entered=new WeakSet(),onscreen=new WeakSet();
 const finish=new WeakMap();
 function reveal(el){
  if(!entered.has(el)){
   entered.add(el);
   el.classList.add('mc10-inview');
   const settle=()=>el.classList.add('mc10-done');
   el.addEventListener('transitionend',function ended(e){
    if(e.target!==el||e.propertyName!=='opacity')return;
    settle();el.removeEventListener('transitionend',ended);
   });
   setTimeout(settle,1250);
   return;
  }
  // Subsequent visits: gentle repeat without fading content out entirely.
  if(!el.classList.contains('mc10-done'))return;
  const old=finish.get(el);if(old)clearTimeout(old);
  el.classList.remove('mc10-replay-end');
  el.classList.add('mc10-replay-start');
  // Commit the start position before transitioning back to the normal state.
  void el.offsetHeight;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
   el.classList.remove('mc10-replay-start');
   el.classList.add('mc10-replay-end');
   finish.set(el,setTimeout(()=>el.classList.remove('mc10-replay-end'),850));
  }));
 }
 const io=new IntersectionObserver(entries=>{
  for(const entry of entries){
   const el=entry.target;
   if(entry.isIntersecting){
    if(onscreen.has(el))continue;
    onscreen.add(el);reveal(el);
   }else{
    onscreen.delete(el);
   }
  }
 },{threshold:.15,rootMargin:'0px 0px -7% 0px'});
 function collect(){
  document.querySelectorAll(selector).forEach((el,i)=>{
   if(seen.has(el))return;
   seen.add(el);
   const rect=el.getBoundingClientRect();
   el.style.setProperty('--mc10-stagger',((i%3)*85)+'ms');
   el.classList.add('mc10-enter');
   if(rect.top<innerHeight*.87||rect.bottom<=0){entered.add(el);el.classList.add('mc10-inview','mc10-done');if(rect.bottom>0&&rect.top<innerHeight)onscreen.add(el)}
   io.observe(el);
  });
 }
 collect();
 const main=$('main');
 if(main){
  let pending=false;
  new MutationObserver(()=>{
   if(pending)return;
   pending=true;
   requestAnimationFrame(()=>{pending=false;collect()});
  }).observe(main,{subtree:true,childList:true});
 }
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

function menuShowcase(){
 const hero=document.querySelector('.mc19-menu-hero');
 if(!hero)return;
 const buttons=[...hero.querySelectorAll('button[data-mc19-cat]')];
 buttons.forEach(button=>button.addEventListener('click',()=>{
  const id=button.getAttribute('data-mc19-cat');
  const findButton=()=>[...document.querySelectorAll('#catalogFilters button')].find(x=>{
    const title=x.textContent.toLocaleLowerCase('fr');
    return id==='desserts'?title.includes('pâtisserie')||title.includes('dessert'):
      id==='brunch'?title.includes('brunch'):title.includes('chaude');
  });
  const found=findButton();
  found?.click();
  buttons.forEach(b=>b.classList.toggle('mc19-category-active',b===button));
  document.getElementById('catalogue')?.scrollIntoView({behavior:'smooth',block:'start'});
 }));
 const scene=hero.querySelector('.mc19-cake-scene');
 if(scene&&matchMedia('(pointer:fine)').matches){
  let requested=false;
  scene.addEventListener('pointermove',event=>{
   if(requested)return;
   requested=true;
   requestAnimationFrame(()=>{
    requested=false;
    const rect=scene.getBoundingClientRect();
    const dx=(event.clientX-rect.left)/rect.width-.5;
    const dy=(event.clientY-rect.top)/rect.height-.5;
    scene.style.setProperty('--mc19-x',(dx*13).toFixed(2)+'px');
    scene.style.setProperty('--mc19-y',(dy*9).toFixed(2)+'px');
    scene.querySelectorAll('.mc19-cake-photo').forEach((x,i)=>x.style.translate=(dx*(i+1)*4).toFixed(1)+'px '+(dy*(i+1)*3).toFixed(1)+'px');
   });
  },{passive:true});
  scene.addEventListener('pointerleave',()=>scene.querySelectorAll('.mc19-cake-photo').forEach(x=>x.style.translate=''));
 }
}
function boutiqueDepth(){
 const root=document.querySelector('.mc27-boutique');
 if(!root)return;
 const visual=root.querySelector('.mc25-hero-visual');
 if(!visual)return;
 let pending=false;
 const draw=()=>{
  pending=false;
  const bounds=visual.getBoundingClientRect();
  if(bounds.bottom<0||bounds.top>innerHeight)return;
  const delta=Math.max(-1,Math.min(1,(innerHeight/2-(bounds.top+bounds.height/2))/innerHeight));
  visual.style.setProperty('--mc27-shift',(delta*14).toFixed(2)+'px');
 };
 const onScroll=()=>{if(pending)return;pending=true;requestAnimationFrame(draw)};
 addEventListener('scroll',onScroll,{passive:true});
 addEventListener('resize',onScroll,{passive:true});
 draw();
}
function premiumInteractions(){
 // Navigation, image loading, gallery gestures and lightweight entrance effects.
 const nav=document.querySelector('.site-header');
 const updateNav=()=>nav?.classList.toggle('mc11-nav-scrolled',window.scrollY>24);
 updateNav();addEventListener('scroll',updateNav,{passive:true});
 const current=location.pathname.split('/').pop()||'index.html';
 document.querySelectorAll('.nav-list a,.bottom-nav a').forEach(a=>{
  const href=(a.getAttribute('href')||'').split('#')[0];
  if(href&&href===current){a.classList.add('mc11-current');if(a.closest('.nav-list'))a.setAttribute('aria-current','page')}
 });
 document.querySelectorAll('img').forEach(img=>{
  if(!img.hasAttribute('decoding'))img.decoding='async';
  if(!img.hasAttribute('loading')&&!img.closest('.hero,.page-hero'))img.loading='lazy';
 });
 const lb=$('lightbox');
 if(lb){
  let startX=null;
  lb.addEventListener('touchstart',e=>{if(e.touches.length===1)startX=e.touches[0].clientX},{passive:true});
  lb.addEventListener('touchend',e=>{
   if(startX===null||!lb.classList.contains('open'))return;
   const dx=e.changedTouches[0].clientX-startX;startX=null;
   if(Math.abs(dx)<65)return;
   const buttons=lb.querySelectorAll('.v8-lightbox-controls button');
   const target=dx<0?buttons[1]:buttons[0];
   target?.click();
  },{passive:true});
 }
 const header=$('siteHeader');
 if(header&&!header.querySelector('.mc11-mobile-cta')){
  const link=create('a','mc11-mobile-cta','Demander un gâteau');
  link.href='gateaux.html';link.setAttribute('aria-label','Faire une demande de gâteau personnalisé');
  header.append(link);
 }
}

function init(){
 addCatalogueTools();galleryCount();enrichCake();siteUtilities();scrollSections();premiumInteractions();menuShowcase();boutiqueDepth()
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();