/* Meery Cake V8 — premium progressive experience (no backend, no invented sales).
   Accessible product quick-view, gallery navigation, 2D cake controls, subtle reveals.
   No external JS dependency, cookies, accounts or new media hosts. */
(function(){
'use strict';
const $=id=>document.getElementById(id);
const el=(tag,cls,content)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(content!==undefined)x.textContent=content;return x};
const motion=()=>{try{const p=localStorage.getItem('meerycake-motion-preference');return p==='on'||(p!=='off'&&!matchMedia('(prefers-reduced-motion: reduce)').matches)}catch{return !matchMedia('(prefers-reduced-motion: reduce)').matches}};
function galleryEditor(){
 const grid=$('galleryGrid'),lightbox=$('lightbox');
 if(!grid||!lightbox||$('v8LightboxControls'))return;
 const prev=el('button','','‹'),next=el('button','','›'),counter=el('span','','1 / 1'),controls=el('div','v8-lightbox-controls');
 prev.type=next.type='button';prev.setAttribute('aria-label','Photo précédente');next.setAttribute('aria-label','Photo suivante');
 controls.id='v8LightboxControls';controls.append(prev,counter,next);lightbox.append(controls);
 let active=0,originalFocus=null;
 const tiles=()=>[...grid.querySelectorAll('.gallery-tile')];
 function display(index){
  const ts=tiles();if(!ts.length)return;
  active=(index+ts.length)%ts.length;
  const img=ts[active].querySelector('img');
  const title=ts[active].querySelector('span')?.textContent||'Meery Cake';
  if(img){
   $('lightboxImage').src=img.src;
   $('lightboxImage').alt=img.alt;
   $('lightboxCaption').textContent=title+' · Photographie d’archive · Droits et actualité à confirmer';
  }
  counter.textContent=(active+1)+' / '+ts.length;
 }
 const shift=direction=>display(active+direction);
 grid.addEventListener('click',e=>{
  const tile=e.target.closest('.gallery-tile');if(!tile)return;
  originalFocus=tile;
  const idx=tiles().indexOf(tile);if(idx>=0){active=idx;counter.textContent=(idx+1)+' / '+tiles().length}
 },true);
 prev.addEventListener('click',e=>{e.stopPropagation();shift(-1)});
 next.addEventListener('click',e=>{e.stopPropagation();shift(1)});
 let pointerStart=null;
 const image=$('lightboxImage');
 image?.addEventListener('pointerdown',e=>{pointerStart={x:e.clientX,y:e.clientY}});
 image?.addEventListener('pointerup',e=>{
  if(!pointerStart)return;
  const x=e.clientX-pointerStart.x,y=e.clientY-pointerStart.y;
  if(Math.abs(x)>55&&Math.abs(x)>Math.abs(y))shift(x<0?1:-1);
  pointerStart=null
 });
 document.addEventListener('keydown',e=>{
  if(!lightbox.classList.contains('open'))return;
  if(e.key==='ArrowLeft'){e.preventDefault();shift(-1)}
  else if(e.key==='ArrowRight'){e.preventDefault();shift(1)}
  else if(e.key==='Escape'){setTimeout(()=>originalFocus?.focus?.(),0)}
 });
 $('lightboxClose')?.addEventListener('click',()=>setTimeout(()=>originalFocus?.focus?.(),0));
 lightbox.addEventListener('click',e=>{if(e.target===lightbox)setTimeout(()=>originalFocus?.focus?.(),0)});
}
function quickView(){
 const items=$('catalogItems');if(!items)return;
 const dialog=el('dialog','v8-product-dialog');dialog.id='v8ProductDialog';dialog.setAttribute('aria-label','Détails du produit');
 const close=el('button','v8-dialog-close','×');close.type='button';close.setAttribute('aria-label','Fermer les détails');
 const layout=el('div','v8-dialog-grid'),imageArea=el('div','v8-dialog-photo'),picture=el('img'),photoNote=el('div','v8-dialog-photo-note','Photo d’ambiance · Ne représente pas nécessairement ce produit');
 imageArea.append(picture,photoNote);
 const info=el('div','v8-dialog-info'),category=el('span','eyebrow'),title=el('h2',''),description=el('p',''),price=el('strong',''),notice=el('p','v8-dialog-note','Produits, composition, prix et allergènes à vérifier avec Meery Cake. Cette fiche est informative, pas une commande.');
 const actions=el('div','v8-dialog-actions'),fav=el('button','button secondary','♡ Ajouter aux favoris'),contact=el('a','button','Se renseigner ↗'),copy=el('button','button secondary','Partager la fiche');
 fav.type=copy.type='button';contact.href='tel:+33983605602';
 actions.append(fav,contact,copy);info.append(category,title,description,price,notice,actions);
 layout.append(imageArea,info);dialog.append(close,layout);document.body.append(dialog);
 let activeId=null,lastTrigger=null;
 const findProduct=id=>{
  for(const g of (window.MC?.data?.menu||[])){const p=g.items.find(x=>x.id===id);if(p)return {...p,category:g.name,groupId:g.id}}
  return null
 };
 const refreshFav=()=>{
  if(!activeId)return;
  const yes=window.MC?.favorites?.includes(activeId);
  fav.textContent=yes?'♥ Retirer des favoris':'♡ Ajouter aux favoris';
  fav.setAttribute('aria-pressed',String(!!yes))
 };
 const closeModal=()=>{
  if(typeof dialog.close==='function'&&dialog.open)dialog.close();
  else dialog.removeAttribute('open');
 };
 items.addEventListener('click',e=>{
  const btn=e.target.closest('.v8-product-details');
  if(!btn)return;
  const id=btn.getAttribute('data-product-id'),p=findProduct(id);
  if(!p)return;
  activeId=id;lastTrigger=btn;
  category.textContent=p.category;title.textContent=p.name;
  description.textContent=p.description||'Description détaillée à confirmer directement auprès du salon.';
  price.textContent=p.price?'Prix indiqué dans la maquette : '+p.price:'Prix à confirmer auprès du salon';
  const card=btn.closest('.catalog-card');
  const pic=card?.querySelector('.v6-product-photo img');
  if(pic){picture.src=pic.src;picture.alt='Photographie d’ambiance de Meery Cake, pas nécessairement du produit '+p.name}
  else {picture.removeAttribute('src');picture.alt='Photographie indisponible'}
  refreshFav();
  if(typeof dialog.showModal==='function')dialog.showModal();else dialog.setAttribute('open','');
  close.focus();
 });
 close.addEventListener('click',closeModal);
 dialog.addEventListener('click',e=>{if(e.target===dialog)closeModal()});
 dialog.addEventListener('close',()=>{lastTrigger?.focus?.();activeId=null});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&dialog.open&&typeof dialog.close!=='function'){closeModal();lastTrigger?.focus?.()}});
 fav.addEventListener('click',()=>{
  if(!activeId)return;
  window.MC?.toggleFavorite?.(activeId);
  refreshFav();
 });
 copy.addEventListener('click',async()=>{
  if(!activeId)return;
  const url=new URL('carte.html',location.href);url.searchParams.set('q',title.textContent);url.hash='catalogue';
  const text=title.textContent+' · Meery Cake\n'+url.href+'\nInformations, prix et disponibilités à confirmer auprès du salon.';
  if(navigator.share){try{await navigator.share({title:'Meery Cake · '+title.textContent,text,url:url.href});return}catch(e){if(e?.name==='AbortError')return}}
  try{await navigator.clipboard.writeText(text);window.MC?.toast?.('Lien de la fiche copié ♡')}
  catch{window.MC?.toast?.('Partage indisponible sur cet appareil.')}
 });
}
function cakeCustomizer(){
 const form=$('cakeForm'),field=$('cakeColors'),notes=$('cakeNotes');
 if(!form||!field||!notes||$('v8CakeSwatches'))return;
 const parent=field.closest('.field');if(!parent)return;
 const label=el('span','v8-cake-swatch-label','Choisissez une couleur');
 const bar=el('div','v8-cake-swatches');bar.id='v8CakeSwatches';bar.setAttribute('role','group');bar.setAttribute('aria-label','Couleurs suggérées');
 const options=[
  ['Rose poudré','#e9b8c7'],['Blanc','#f9eee6'],['Lilas','#c4b3d9'],['Bleu pastel','#9ec5d6'],['Vert sauge','#a8c9ad'],['Chocolat','#ad8070'],['Jaune doré','#ead092'],['Rouge','#bf647c']
 ];
 const buttons=[];
 const setPressed=()=>{
  const v=field.value.toLowerCase();
  buttons.forEach(b=>b.setAttribute('aria-pressed',String(v.trim()===b.dataset.color.toLowerCase())))
 };
 for(const [name,color] of options){
  const b=el('button','v8-cake-swatch');b.type='button';b.style.setProperty('--swatch',color);b.title=name;
  b.dataset.color=name;b.setAttribute('aria-label',name);b.setAttribute('aria-pressed','false');
  b.addEventListener('click',()=>{field.value=name;field.dispatchEvent(new Event('input',{bubbles:true}));setPressed()});
  buttons.push(b);bar.append(b)
 }
 parent.append(label,bar);field.addEventListener('input',setPressed);setPressed();
 const nParent=notes.closest('.field');if(!nParent)return;
 const title=el('span','v8-cake-swatch-label','Quel style de décoration ?'),themes=el('div','v8-cake-themes');
 const choices=[['Fleurs','✿'],['Fruits rouges','●'],['Perles sucrées','✧']];
 const themeButtons=[];
 const normal=v=>v.toLocaleLowerCase('fr');
 const update=()=>{
  const txt=normal(notes.value);
  for(const b of themeButtons)b.setAttribute('aria-pressed',String(txt.includes(normal(b.dataset.theme))))
 };
 for(const [name,glyph] of choices){
  const b=el('button','v8-cake-theme');
  b.type='button';b.dataset.theme=name;b.setAttribute('aria-pressed','false');
  const ic=el('span','',glyph);b.append(ic,document.createTextNode(name));
  b.addEventListener('click',()=>{
   const prefix=/^Décoration souhaitée : (?:Fleurs|Fruits rouges|Perles sucrées)\.\s*/i;
   const rest=notes.value.replace(prefix,'');
   notes.value='Décoration souhaitée : '+name+'.'+(rest?' '+rest.trim():'');
   notes.dispatchEvent(new Event('input',{bubbles:true}));update()
  });
  themeButtons.push(b);themes.append(b)
 }
 const tip=el('p','v8-cake-help','Ces styles sont des inspirations visuelles. Le salon doit confirmer le résultat possible et le devis.');
 nParent.append(title,themes,tip);notes.addEventListener('input',update);update();
 const steps=form.querySelector('.step-progress');
 if(steps){
  const progress=el('div','v8-cake-progress'),fill=el('span');progress.setAttribute('aria-hidden','true');progress.append(fill);steps.after(progress);
  const sync=()=>{
   const b=[...steps.querySelectorAll('button')];const idx=b.findIndex(x=>x.classList.contains('active'));
   fill.style.width=((Math.max(idx,0)+1)/Math.max(1,b.length)*100)+'%'
  };
  const observer=new MutationObserver(sync);
  observer.observe(steps,{subtree:true,attributes:true,attributeFilter:['class']});sync()
 }
}
function mediaReveal(){
 if(!('IntersectionObserver' in window)||!motion())return;
 const targets=document.querySelectorAll('.v8-editorial-copy,.v8-photo-composition,.v8-hero-secondary,.v8-editorial-stamp');
 const observer=new IntersectionObserver(entries=>{
  for(const entry of entries)if(entry.isIntersecting){
   entry.target.classList.add('v8-visible');observer.unobserve(entry.target)
  }
 },{threshold:.08,rootMargin:'0px 0px -30px 0px'});
 for(const target of targets){
  target.classList.add('v8-reveal');
  const box=target.getBoundingClientRect();
  if(box.top<innerHeight*.9&&box.bottom>0)target.classList.add('v8-visible');
  else observer.observe(target)
 }
 addEventListener('mc:motion-preference-change',()=>{
  if(!motion())for(const target of targets)target.classList.add('v8-visible')
 })
}
function mobilePolish(){
 document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click',()=>{
   // Native smooth scrolling remains available when motion is disabled.
   const menu=$('mainNav');if(menu?.classList.contains('open')){$('navToggle')?.click()}
  })
 });
 document.querySelectorAll('img[loading="lazy"]').forEach(img=>{img.decoding='async';if(!img.getAttribute('sizes'))img.sizes='(max-width: 600px) 100vw, 50vw'});
 // Do not fabricate business hours or order confirmations. Keep existing forms.
}
function init(){quickView();galleryEditor();cakeCustomizer();mediaReveal();mobilePolish()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();