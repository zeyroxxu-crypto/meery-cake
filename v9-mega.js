/* Meery Cake V9 — polished site interactions; no 3D, checkout, notebook, or status centre.
   Lightweight vanilla JavaScript. No analytics or external dependencies. */
(function(){
'use strict';
const $=id=>document.getElementById(id);
const create=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n};
const motion=()=>true;
const dataFile='v3-data.json?v=v33-local-media-20261117';
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
  {href:'carte.html?category=desserts#catalogue',src:'images/vitrine-meery.webp',label:'Les douceurs',title:'Pâtisseries',desc:'Cupcakes et créations gourmandes à découvrir dans notre carte.',cta:'Découvrir la carte ↗'},
  {href:'brunch.html',src:'images/ambiance-gateau-cafe.webp',label:'À partager',title:'Brunch & moments',desc:'Préparez votre demande et vérifiez les prochaines possibilités.',cta:'En savoir plus ↗'},
  {href:'gateaux.html',src:'images/ambiance-cupcakes-rose.webp',label:'Votre création',title:'Gâteaux sur mesure',desc:'Choisissez forme, couleurs et décors dans le configurateur.',cta:'Imaginer mon gâteau ↗'}
 ];
 for(const item of entries){
  const a=create('a','mc9-collection-card');a.href=item.href;
  const image=create('img');image.src=item.src;image.loading='lazy';image.decoding='async';image.alt='Photographie d’inspiration pour l’univers gourmand, non prise chez Meery Cake';
  const label=create('span','',item.label),content=create('div');
  content.append(create('h3','',item.title),create('p','',item.desc),create('small','',item.cta));a.append(image,label,content);grid.append(a)
 }
 const caption=create('p','mc9-collection-caption','Photos d’inspiration réelles et réutilisables, sans lien avec les produits exacts de Meery Cake.');
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
 const update=()=>{const n=grid.querySelectorAll('.gallery-tile').length;count.textContent=n+' photographie'+(n>1?'s':'')+' présentée'+(n>1?'s':'')+' · photos réelles'};
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



function editorialStoriesV28(){
 const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
 const config={
  'brunch.html':{
   eyebrow:'L’ART DE PRENDRE LE TEMPS',heading:'Une pause qui se savoure.',copy:'Un cadre chaleureux et des idées gourmandes pour partager un moment. Demandez au salon les formules et les jours de brunch actuellement proposés.',
   href:'#brunchBooking',cta:'Préparer ma demande',
   images:[['images/brunch.jpg','Photographie de brunch chez Meery Cake'],['images/brunch.jpg','Photographie de pâtisseries chez Meery Cake']]
  },
  'gateaux.html':{
   eyebrow:'VOTRE CRÉATION, VOTRE HISTOIRE',heading:'Les beaux moments méritent leur douceur.',copy:'Une occasion, des couleurs, une idée : préparez les détails de votre gâteau et transmettez votre demande. La réalisation et le devis sont à confirmer.',
   href:'#designer',cta:'Créer ma demande',
   images:[['images/cupcakes.jpg','Photographie de gâteau chez Meery Cake'],['images/cupcakes.jpg','Photographie de cupcakes chez Meery Cake']]
  },
  'ateliers.html':{
   eyebrow:'DES IDÉES À CRÉER ENSEMBLE',heading:'Le plaisir de faire soi-même.',copy:'Décoration, couleurs et créativité : découvrez des idées d’ateliers et demandez au salon les prochaines possibilités. Aucun créneau n’est annoncé sans confirmation.',
   href:'#atelier-demande',cta:'Se renseigner',
   images:[['images/cupcakes.jpg','Photographie de cupcakes chez Meery Cake'],['images/cupcakes.jpg','Photographie de pâtisserie chez Meery Cake']]
  }
 };
 const x=config[path],main=$('main');if(!x||!main||main.querySelector('.mc28-story'))return;
 const hero=main.querySelector('.mc25-editorial-hero');if(!hero)return;
 const section=create('section','mc28-story');
 section.setAttribute('aria-label','Découvrir l’univers Meery Cake');
 const wrap=create('div','container mc28-story-layout'),copy=create('div','mc28-story-copy'),photos=create('div','mc28-story-photos');
 const tag=create('span','eyebrow',x.eyebrow),heading=create('h2','',x.heading),p=create('p','',x.copy),link=create('a','button secondary',x.cta+' →');
 link.href=x.href;copy.append(tag,heading,p,link);
 x.images.forEach(([src,alt],i)=>{const fig=create('figure',i?'mc28-story-photo mc28-story-photo-small':'mc28-story-photo');const img=create('img');img.src=src;img.alt=alt;img.loading='lazy';img.decoding='async';fig.append(img);photos.append(fig)});
 const note=create('small','mc28-story-credit','Photographies réelles de Meery Cake, issues de fiches publiques ; autorisation de republication à confirmer.');
 photos.append(note);wrap.append(copy,photos);section.append(wrap);
 const quick=main.querySelector('.mc28-quick-links');
 (quick||hero).after(section);
}

function practicalToolsV28(){
 const search=$('catalogSearch');
 if(search){
  const clear=create('button','mc28-clear-search','Effacer la recherche');
  clear.type='button';clear.hidden=!search.value;
  clear.addEventListener('click',()=>{
   search.value='';search.dispatchEvent(new Event('input',{bubbles:true}));
   search.focus();
  });
  search.addEventListener('input',()=>clear.hidden=!search.value);
  search.insertAdjacentElement('afterend',clear);
  document.addEventListener('keydown',e=>{
   const t=e.target;
   if(e.key!=='/'||e.ctrlKey||e.altKey||e.metaKey||t?.closest?.('input,textarea,select,[contenteditable]'))return;
   e.preventDefault();search.focus();
  });
  const hint=create('small','mc28-search-hint','Astuce : appuyez sur / pour rechercher');
  clear.insertAdjacentElement('afterend',hint);
 }
 const cakeResult=$('cakeResult'),summary=$('cakeSummary');
 if(cakeResult&&summary){
  const buttons=cakeResult.querySelector('.form-buttons');
  if(buttons){
   const print=create('button','button secondary mc28-print-summary','Imprimer mon récapitulatif');
   print.type='button';
   print.addEventListener('click',()=>{
    if(cakeResult.hidden)return;
    document.body.classList.add('mc28-print-cake');
    window.print();
    setTimeout(()=>document.body.classList.remove('mc28-print-cake'),900);
   });
   buttons.append(print);
   addEventListener('afterprint',()=>document.body.classList.remove('mc28-print-cake'));
  }
  cakeResult.setAttribute('role','status');
  cakeResult.setAttribute('aria-live','polite');
 }
 // Ensure messages are announced once generated, without making a false booking claim.
 for(const id of ['brunchResult','giftResult','workshopResult']){
  const el=$(id);if(el){el.setAttribute('role','status');el.setAttribute('aria-live','polite')}
 }
}
// V28: consistent useful interaction across all public pages.
function siteExperienceV28(){
 const main=$('main');if(!main)return;
 const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
 // Dynamic local quick-nav: only link to sections that exist on this page.
 const definitions={
  'carte.html':[['catalogue','Explorer les produits']],
  'galerie.html':[['galleryGrid','Voir les photos']],
  'gateaux.html':[['designer','Créer un gâteau']],
  'brunch.html':[['brunchBooking','Demander un brunch']],
  'ateliers.html':[['atelier-demande','Se renseigner']],
  'boutique.html':[['idees','Voir les cadeaux'],['giftForm','Préparer une demande']],
  'informations.html':[],
  'index.html':[]
 };
 const items=(definitions[path]||[]).filter(([id])=>!!$(id));
 const hero=main.querySelector('.mc25-editorial-hero,.mc19-menu-hero,.hero');
 if(hero&&items.length){
  const nav=create('nav','mc28-quick-links');nav.setAttribute('aria-label','Accès rapides dans cette page');
  const inner=create('div','container');
  for(const [id,label] of items){
   const a=create('a','mc28-quick-link',label);a.href='#'+id;inner.append(a);
  }
  nav.append(inner);hero.after(nav);
  const visible=new Map();
  const obs=typeof IntersectionObserver!=='undefined'?new IntersectionObserver(entries=>{
   for(const entry of entries)visible.set(entry.target.id,entry.isIntersecting);
   const active=items.find(([id])=>visible.get(id));
   inner.querySelectorAll('a').forEach(a=>a.classList.toggle('mc28-quick-active',!!active&&a.hash==='#'+active[0]));
  },{rootMargin:'-18% 0px -65% 0px',threshold:0}):null;
  items.forEach(([id])=>obs?.observe($(id)));
 }
 // Help visitors understand length of text fields and keep form interactions legible.
 main.querySelectorAll('textarea[maxlength]').forEach(area=>{
  if(area.closest('.mc28-counter-wrap'))return;
  const max=Number(area.maxLength);if(!max||max>5000)return;
  const counter=create('small','mc28-text-counter');
  counter.setAttribute('aria-live','off');
  const render=()=>counter.textContent=area.value.length+' / '+max+' caractères';
  area.insertAdjacentElement('afterend',counter);
  area.addEventListener('input',render,{passive:true});render();
 });
 // Respect user motion preference for decorative pointer effects.
 if(!matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches)return;
 const tiles=main.querySelectorAll('.mc27-gift-card,.mc25-photo,.mc19-cake-photo');
 tiles.forEach(tile=>{
  const onPointer=e=>{
   const rect=tile.getBoundingClientRect();
   const x=(e.clientX-rect.left)/rect.width-.5,y=(e.clientY-rect.top)/rect.height-.5;
   tile.style.setProperty('--mc28-rotate-x',(-y*4).toFixed(2)+'deg');
   tile.style.setProperty('--mc28-rotate-y',(x*4).toFixed(2)+'deg');
  };
  tile.addEventListener('pointermove',onPointer,{passive:true});
  tile.addEventListener('pointerleave',()=>{tile.style.removeProperty('--mc28-rotate-x');tile.style.removeProperty('--mc28-rotate-y')});
 });
 // Gallery images and form media use priority/fetch hints without eagerly loading all imagery.
 main.querySelectorAll('img').forEach(img=>{
  if(img.closest('.mc25-editorial-hero,.mc19-menu-hero,.hero'))return;
  if(!img.hasAttribute('loading'))img.loading='lazy';
  if(!img.hasAttribute('decoding'))img.decoding='async';
 });
}
function homeHeroSlideshowV33(){
 const viewport=document.querySelector('#accueil .mc33-slideshow');
 if(!viewport||viewport.dataset.mc55Ready)return;
 const images=[...viewport.querySelectorAll('img.mc33-slide')].slice(0,4)
  .map(el=>({src:el.getAttribute('src'),alt:el.getAttribute('alt')||'Photographie Meery Cake'}));
 if(images.length!==4)return;
 viewport.dataset.mc55Ready='true';
 viewport.classList.add('mc55-slider');
 viewport.setAttribute('aria-roledescription','carrousel');
 viewport.setAttribute('aria-label','Diaporama de quatre photographies');
 viewport.tabIndex=0;
 const DURATION=1000,INTERVAL=6000;
 // One complete photograph fills the viewport at any given instant.
 // Blending complete images (instead of joining horizontal half-images) means
 // there can never be a vertical dividing line during the transition.
 const layers=[document.createElement('img'),document.createElement('img')];
 layers.forEach((el,i)=>{
  el.className='mc55-photo';el.decoding='async';el.draggable=false;
  el.alt=i===0?images[0].alt:'';
  el.src=images[0].src;
  el.style.opacity=i===0?'1':'0';
  el.style.zIndex=String(i+1);
 });
 viewport.replaceChildren(...layers);
 images.forEach(image=>{const preload=new Image();preload.src=image.src});
 const controls=document.createElement('div');controls.className='mc35-controls';
 const prev=document.createElement('button'),next=document.createElement('button');
 prev.type=next.type='button';
 prev.textContent='‹';next.textContent='›';
 prev.setAttribute('aria-label','Photo précédente');
 next.setAttribute('aria-label','Photo suivante');
 controls.append(prev,next);
 const indicator=document.createElement('div');indicator.className='mc35-dots';
 const dots=images.map((_,i)=>{
  const button=document.createElement('button');
  button.type='button';button.setAttribute('aria-label','Afficher la photo '+(i+1));
  indicator.append(button);return button;
 });
 viewport.parentElement.append(controls,indicator);
 let active=0,foreground=0,busy=false,interval=null,drag=null;
 const sync=()=>dots.forEach((button,i)=>button.setAttribute('aria-current',String(i===active)));
 function transition(target,direction=1){
  target=(target+images.length)%images.length;
  if(busy||target===active)return;
  const visible=layers[foreground],incoming=layers[1-foreground];
  busy=true;
  incoming.src=images[target].src;
  incoming.alt=images[target].alt;
  incoming.style.opacity='0';
  incoming.style.transform='translate3d(0,0,0) scale(1.015)';
  incoming.style.zIndex='3';
  visible.style.zIndex='2';
  const offset=(direction<0?-1:1)*2.2;
  const fade=incoming.animate([
   {opacity:0,transform:'translate3d('+offset+'%,0,0) scale(1.025)'},
   {opacity:1,transform:'translate3d(0,0,0) scale(1.015)'}
  ],{duration:DURATION,easing:'ease-in-out',fill:'forwards'});
  fade.finished.then(()=>{
   incoming.style.opacity='1';incoming.style.transform='translate3d(0,0,0) scale(1.015)';
   incoming.style.zIndex='2';
   visible.style.opacity='0';visible.style.zIndex='1';
   fade.cancel();
   foreground=1-foreground;busy=false;
  }).catch(()=>{incoming.style.opacity='1';visible.style.opacity='0';foreground=1-foreground;busy=false});
  active=target;sync();
 }
 function reset(){
  clearInterval(interval);
  interval=setInterval(()=>{if(!document.hidden)transition(active+1,1)},INTERVAL);
 }
 prev.addEventListener('click',()=>{transition(active-1,-1);reset()});
 next.addEventListener('click',()=>{transition(active+1,1);reset()});
 dots.forEach((button,i)=>button.addEventListener('click',()=>{
  transition(i,i<active?-1:1);reset();
 }));
 viewport.addEventListener('keydown',e=>{
  if(e.key==='ArrowLeft'||e.key==='ArrowRight'){
   e.preventDefault();transition(active+(e.key==='ArrowLeft'?-1:1),e.key==='ArrowLeft'?-1:1);reset();
  }
 });
 viewport.addEventListener('pointerdown',e=>{
  if(e.isPrimary)drag={x:e.clientX,y:e.clientY};
 },{passive:true});
 viewport.addEventListener('pointerup',e=>{
  if(!drag)return;
  const dx=e.clientX-drag.x,dy=e.clientY-drag.y;drag=null;
  if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)){transition(active+(dx<0?1:-1),dx<0?1:-1);reset()}
 },{passive:true});
 viewport.addEventListener('pointercancel',()=>{drag=null});
 sync();reset();
 window.addEventListener('pagehide',()=>clearInterval(interval),{once:true});
}
function init(){
 renderHomeCollections();addCatalogueTools();galleryCount();enrichCake();siteUtilities();scrollSections();premiumInteractions();menuShowcase();boutiqueDepth();siteExperienceV28();editorialStoriesV28();practicalToolsV28();homeHeroSlideshowV33()
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();