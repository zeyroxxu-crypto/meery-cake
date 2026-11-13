/* Meery Cake improvements — progressive enhancements; no network orders or invented availability */
(function(){
'use strict';
const DATA_PATH='v3-data.json';
const STORAGE_CAKE_DRAFT='meerycake-cake-idea-v1';
const STORAGE_READABLE='meerycake-readable-v1';
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('fr').trim();
const $=id=>document.getElementById(id);
const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n};
function getItem(key){try{return localStorage.getItem(key)}catch{return null}}
function saveItem(key,val){try{localStorage.setItem(key,val);return true}catch{return false}}
function removeItem(key){try{localStorage.removeItem(key)}catch{}}
function toast(message){if(typeof MC!=='undefined'&&MC.toast)MC.toast(message)}
async function copyText(text){
 try{await navigator.clipboard.writeText(text);toast('Copié dans le presse-papiers ♡');return true}
 catch{toast('Copie impossible : sélectionnez le texte manuellement.');return false}
}
async function shareText(title,text){
 if(navigator.share){
  try{await navigator.share({title,text});return}
  catch(e){if(e?.name==='AbortError')return}
 }
 await copyText(text);
}
function readJSON(key,fallBack){
 try{const value=JSON.parse(getItem(key)||'null');return value??fallBack}catch{return fallBack}
}
let cachedData=null;
async function fetchMenu(){
 if(typeof MC!=='undefined'&&MC.data?.menu?.length){cachedData=MC.data;return MC.data}
 if(cachedData)return cachedData;
 const r=await fetch(DATA_PATH,{cache:'force-cache'});
 if(!r.ok)throw Error('La carte est indisponible.');
 const data=await r.json();
 if(!Array.isArray(data.menu))throw Error('La carte est indisponible.');
 cachedData=data;return data;
}
function links(){
 return [
  {title:'Accueil',desc:'Découvrir Meery Cake et son univers',url:'index.html#accueil',keywords:'salon de thé accueil'},
  {title:'La carte',desc:'Produits, boissons, pâtisseries et brunch',url:'carte.html',keywords:'menu boissons prix catalogue'},
  {title:'Créer un gâteau',desc:'Configurateur et demande sur mesure',url:'gateaux.html',keywords:'cake design anniversaire mariage personnalisé'},
  {title:'Demander un brunch',desc:'Préparer une demande de table',url:'brunch.html',keywords:'réservation table date personnes'},
  {title:'Ateliers',desc:'Cupcakes, cake design et renseignements',url:'ateliers.html',keywords:'atelier cours événements'},
  {title:'Galerie',desc:'Photos du salon et des créations',url:'galerie.html',keywords:'photos images intérieur'},
  {title:'Cadeaux & gourmandises',desc:'Idées de coffrets et cartes-cadeaux',url:'boutique.html',keywords:'cadeau coffret offrir'},
  {title:'Avis clients',desc:'Espace consacré aux avis Google',url:'avis.html#avis-google',keywords:'google avis étoiles note'},
  {title:'Contact & itinéraire',desc:'Téléphone et adresse à Carcassonne',url:'index.html#contact',keywords:'contact adresse horaires itinéraire'},
  {title:'Questions fréquentes',desc:'Informations utiles avant de venir',url:'informations.html',keywords:'faq allergies informations'},
 ];
}
function createSearch(){
 const nav=document.querySelector('.nav-actions');
 if(!nav||$('mcSearchButton'))return;
 const icon='<svg aria-hidden="true" viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-4-4"></path></svg>';
 const btn=el('button','mc-search-trigger');btn.innerHTML=icon;btn.id='mcSearchButton';btn.type='button';
 btn.title='Rechercher une page ou un produit (Ctrl/⌘ + K)';
 btn.setAttribute('aria-label','Rechercher sur Meery Cake');
 const contrast=$('mcMotionToggle'),lang=$('langSelect');
 if(contrast)nav.insertBefore(btn,contrast);else if(lang)nav.insertBefore(btn,lang);else nav.append(btn);
 const backdrop=el('div','mc-search-backdrop');backdrop.id='mcSearchBackdrop';backdrop.setAttribute('aria-hidden','true');
 const dialog=el('section','mc-search-dialog');dialog.setAttribute('role','dialog');dialog.setAttribute('aria-modal','true');dialog.setAttribute('aria-label','Recherche rapide');
 const header=el('div','mc-search-dialog-top'),glass=el('span','glass'),input=el('input','mc-search-input');glass.innerHTML=icon;
 input.type='search';input.id='mcSearchInput';input.placeholder='Rechercher un dessert, une page…';input.autocomplete='off';input.maxLength=90;
 const close=el('button','mc-search-close','Esc ×');close.type='button';close.setAttribute('aria-label','Fermer la recherche');
 const results=el('div','mc-search-results');results.id='mcSearchResults';results.setAttribute('aria-live','polite');
 const footer=el('div','mc-search-footer');
 footer.append(el('span','','↑ ↓ ou Tab pour parcourir · Entrée pour ouvrir'),el('span','','51 produits · Accès rapide aux pages'));
 header.append(glass,input,close);dialog.append(header,results,footer);backdrop.append(dialog);document.body.append(backdrop);
 let priorFocus=null,items=[],activeIndex=-1;
 function open(){
  priorFocus=document.activeElement;
  backdrop.classList.add('open');
  backdrop.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  input.value='';render('');
  requestAnimationFrame(()=>input.focus());
  fetchMenu().then(()=>{if(backdrop.classList.contains('open'))render(input.value)}).catch(()=>{});
 }
 function shut(){
  backdrop.classList.remove('open');
  backdrop.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
  priorFocus?.focus?.();
 }
 function resultLink({title,desc,url,kind}){
  const a=el('a','mc-search-entry');a.href=url;a.dataset.kind=kind;
  const texts=el('div');texts.append(el('strong','',title),el('small','',desc));
  a.append(texts,el('span','arrow','↗'));return a;
 }
 function render(raw){
  const q=norm(raw),filteredPages=links().filter(p=>!q||norm(p.title+' '+p.desc+' '+p.keywords).includes(q)).slice(0,q?7:8);
  const products=(cachedData?.menu||[]).flatMap(group=>group.items.map(p=>({...p,group:group.name})))
   .filter(p=>q&&norm(p.name+' '+p.description+' '+p.group).includes(q)).slice(0,9);
  results.replaceChildren();
  if(filteredPages.length){
   results.append(el('div','mc-search-label','Pages'));
   for(const p of filteredPages)results.append(resultLink({...p,kind:'page'}));
  }
  if(products.length){
   results.append(el('div','mc-search-label','Produits de la carte'));
   for(const p of products){
    const url='carte.html?q='+encodeURIComponent(p.name)+'#catalogue';
    results.append(resultLink({title:p.name,desc:p.group+' · '+(p.price||'Prix à confirmer'),url,kind:'product'}));
   }
  }
  if(!filteredPages.length&&!products.length)results.append(el('p','mc-search-empty','Aucun résultat trouvé. Essayez « gâteau », « brunch », « thé » ou « contact ».'));
  if(!q)results.append(el('p','mc-search-note','Astuce : choisissez une page ou saisissez le nom d’un produit. La recherche reste locale au navigateur.'));
  items=[...results.querySelectorAll('a.mc-search-entry')];activeIndex=-1;
 }
 function selectedNext(direction){
  if(!items.length)return;
  activeIndex=(activeIndex+direction+items.length)%items.length;
  items[activeIndex].focus();
  items[activeIndex].scrollIntoView({block:'nearest'});
 }
 btn.addEventListener('click',open);close.addEventListener('click',shut);
 backdrop.addEventListener('click',e=>{if(e.target===backdrop)shut()});
 input.addEventListener('input',()=>render(input.value));
 results.addEventListener('click',e=>{if(e.target.closest('a[href]'))shut()});
 input.addEventListener('keydown',e=>{
  if(e.key==='ArrowDown'){e.preventDefault();selectedNext(1)}
  if(e.key==='ArrowUp'){e.preventDefault();selectedNext(-1)}
  if(e.key==='Enter'&&items.length){e.preventDefault();items[0].click()}
 });
 results.addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();selectedNext(1)}if(e.key==='ArrowUp'){e.preventDefault();selectedNext(-1)}});
 dialog.addEventListener('keydown',e=>{
  if(e.key==='Tab'){
   const focusables=[...dialog.querySelectorAll('input,button,a[href]')];
   const first=focusables[0],last=focusables.at(-1);
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
   else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
  }
 });
 document.addEventListener('keydown',e=>{
  const typing=/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName||'')||document.activeElement?.isContentEditable;
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(backdrop.classList.contains('open'))shut();else open()}
  else if(!typing&&e.key==='/'&&!e.ctrlKey&&!e.metaKey&&!backdrop.classList.contains('open')){e.preventDefault();open()}
  else if(e.key==='Escape'&&backdrop.classList.contains('open')){e.preventDefault();shut()}
 });
}
function extendNavigation(){
 const meta=document.querySelector('.footer-meta');
 if(meta&&!meta.querySelector('#mcReadableButton')){
  const toggle=el('button','mc-contrast-trigger','Confort de lecture +');toggle.id='mcReadableButton';toggle.type='button';
  toggle.setAttribute('aria-pressed','false');
  meta.append(el('span','',' · '),toggle);
  const apply=()=>{
   const on=getItem(STORAGE_READABLE)==='yes';
   document.documentElement.classList.toggle('mc-readable',on);
   toggle.setAttribute('aria-pressed',String(on));
   toggle.textContent=on?'Confort de lecture activé ✓':'Confort de lecture +';
  };
  toggle.addEventListener('click',()=>{saveItem(STORAGE_READABLE,getItem(STORAGE_READABLE)==='yes'?'no':'yes');apply()});apply();
  const share=el('button','mc-site-share','↗ Partager cette page');share.type='button';
  share.addEventListener('click',()=>shareText(document.title,document.title+'\n'+location.href));
  meta.append(el('span','',' '),share);
 }
}
function installImageFallback(){
 const svg='<svg xmlns="http://www.w3.org/2000/svg" width="720" height="460" viewBox="0 0 720 460"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#f7e8e5"/><stop offset="1" stop-color="#e8cdd4"/></linearGradient></defs><rect width="720" height="460" fill="url(#g)"/><circle cx="365" cy="188" r="83" fill="#ffffff55"/><path d="M317 218q49-102 99 0M345 195h42" fill="none" stroke="#9a6c7f" stroke-width="10" stroke-linecap="round"/><text x="360" y="331" text-anchor="middle" font-family="Georgia" font-size="31" fill="#783f55">Meery Cake</text><text x="360" y="364" text-anchor="middle" font-family="Arial" font-size="17" fill="#986d7e">Photographie indisponible</text></svg>';
 const fallback='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
 const attach=(img)=>{
  if(img.dataset.mcFallback==='bound')return;
  img.dataset.mcFallback='bound';
  const useFallback=()=>{
   if(img.src.startsWith('data:image/svg+xml'))return;
   img.src=fallback;
   img.loading='lazy';
   img.classList.add('mc-error-image');
  };
  img.addEventListener('error',useFallback);
  if(img.complete&&img.naturalWidth===0&&img.getAttribute('src'))useFallback();
 };
 document.querySelectorAll('img').forEach(attach);
 const mo=new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes){if(n.nodeType!==1)continue;if(n.matches?.('img'))attach(n);n.querySelectorAll?.('img').forEach(attach)}});
 mo.observe(document.body,{childList:true,subtree:true});
}
function cakePreview(){
 const form=$('cakeForm');if(!form)return;
 const stepControls=form.querySelector('.form-buttons');
 if(!stepControls)return;
 const pane=el('section','mc-live-preview');pane.setAttribute('aria-label','Résumé vivant de votre gâteau');
 pane.innerHTML='<span class="eyebrow">Aperçu de votre projet</span><h3>Votre gâteau, en direct ♡</h3><div id="mcCakeLive" class="mc-preview-grid" aria-live="polite"></div>';
 const bar=el('div','mc-draft-controls');
 const save=el('button','','Enregistrer mon idée');save.type='button';
 const restore=el('button','','Reprendre mon idée');restore.type='button';
 const clear=el('button','','Supprimer la sauvegarde');clear.type='button';
 const status=el('span','mc-draft-status','Vos coordonnées ne sont jamais enregistrées.');
 bar.append(save,restore,clear,status);pane.append(bar);
 form.insertBefore(pane,stepControls);
 const ids=['cakeOccasion','cakeParts','cakeDate','cakeShape','cakeFlavor','cakeColors','cakeNotes'];
 function val(id){return $(id)?.value?.trim()||'À préciser'}
 function redraw(){
  const live=$('mcCakeLive');live.replaceChildren();
  const pairs=[
   ['Occasion',val('cakeOccasion')],['Parts',val('cakeParts')],['Date souhaitée',val('cakeDate')],
   ['Forme',val('cakeShape')],['Parfum',val('cakeFlavor')],['Couleurs',val('cakeColors')],['Décoration',val('cakeNotes')],
  ];
  for(const [label,value] of pairs){
   const block=el('div','mc-preview-item');block.append(el('span','',label),el('strong','',value.slice(0,130)));live.append(block);
  }
 }
 const toJSON=()=>Object.fromEntries(ids.map(id=>[id,val(id)==='À préciser'?'':$(id)?.value||'']));
 save.addEventListener('click',()=>{
  const content=JSON.stringify({v:1,created:new Date().toISOString(),fields:toJSON()});
  if(saveItem(STORAGE_CAKE_DRAFT,content)){status.textContent='Idée enregistrée dans ce navigateur ✓';toast('Ton idée de gâteau est sauvegardée ♡')}
  else status.textContent='Impossible de sauvegarder sur cet appareil.';
 });
 restore.addEventListener('click',()=>{
  const data=readJSON(STORAGE_CAKE_DRAFT,null);
  if(!data?.fields){status.textContent='Aucune idée sauvegardée.';return}
  for(const id of ids){
   const field=$(id);if(!field)continue;
   const v=data.fields[id];if(typeof v==='string')field.value=v.slice(0,2000);
   field.dispatchEvent(new Event('change',{bubbles:true}));
  }
  for(const b of form.querySelectorAll('[data-choice="cakeShape"]'))b.setAttribute('aria-pressed',String(b.dataset.value===val('cakeShape')));
  redraw();status.textContent='Idée retrouvée ✓ Les coordonnées restent à saisir.';
 });
 clear.addEventListener('click',()=>{removeItem(STORAGE_CAKE_DRAFT);status.textContent='Sauvegarde supprimée sur cet appareil.';toast('Sauvegarde locale effacée.')});
 form.addEventListener('input',redraw);form.addEventListener('change',redraw);redraw();
 if(getItem(STORAGE_CAKE_DRAFT)){status.textContent='Une idée sauvegardée est disponible · Reprendre mon idée'}
}
function enhanceFormShares(){
 for(const {result,preview,label} of [
  {result:'brunchResult',preview:'brunchSummary',label:'Partager ma demande de brunch'},
  {result:'workshopResult',preview:'workshopSummary',label:'Partager ma demande d’atelier'},
  {result:'giftResult',preview:'giftSummary',label:'Partager ma demande de cadeau'},
 ]){
  const container=$(result),text=$(preview);if(!container||!text)continue;
  const actions=container.querySelector('.form-buttons');if(!actions)continue;
  const share=el('button','button secondary',label);share.type='button';
  share.addEventListener('click',()=>shareText('Meery Cake — demande à confirmer',text.textContent));
  actions.append(share);
 }
}
function additions(){
 extendNavigation();createSearch();installImageFallback();cakePreview();enhanceFormShares();
}
document.addEventListener('DOMContentLoaded',additions);
})();
