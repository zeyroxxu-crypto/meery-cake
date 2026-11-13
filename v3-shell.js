/* Meery Cake V3 — accessible common shell */
(function(){
const header=document.getElementById('siteHeader');
const footer=document.getElementById('siteFooter');
if(header)header.innerHTML=`
<a class="skip" href="#main">Aller au contenu</a>
<div class="notice-top">Maquette de démonstration indépendante · Meery Cake · Données et disponibilités à confirmer</div>
<header class="site-header"><nav class="nav-wrap" aria-label="Navigation principale">
<a class="logo" href="index.html#accueil">Meery Cake<small>Salon de thé · Carcassonne</small></a>
<div class="nav-list" id="mainNav">
<a href="index.html#accueil" data-t="home">Accueil</a>
<a href="index.html#carte" data-t="menu">La carte</a>
<details class="nav-discover" id="discoverNav"><summary data-t="explore">Découvrir</summary><div class="nav-sub">
<a href="index.html#salon" data-t="about">Le salon</a>
<a href="galerie.html" data-t="gallery">Galerie</a>
<a href="gateaux.html" data-t="cakes">Gâteaux sur mesure</a>
<a href="brunch.html" data-t="brunch">Réserver un brunch</a>
<a href="ateliers.html" data-t="workshops">Ateliers</a>
<a href="boutique.html" data-t="gifts">Cadeaux & gourmandises</a>

</div></details>
<a href="avis.html" data-t="reviews">Avis clients</a>
<a href="index.html#contact" data-t="contact">Contact</a>
</div>
<div class="nav-actions"><a href="gateaux.html" class="button small header-book" data-t="cakes">Gâteaux sur mesure</a>
<select id="langSelect" aria-label="Langue du site">
<option value="fr">🇫🇷 FR</option><option value="en">🇬🇧 EN</option><option value="es">🇪🇸 ES</option><option value="de">🇩🇪 DE</option><option value="it">🇮🇹 IT</option><option value="pt">🇵🇹 PT</option><option value="nl">🇳🇱 NL</option><option value="pl">🇵🇱 PL</option>
</select>
<button id="navToggle" type="button" class="nav-toggle" aria-controls="mainNav" aria-expanded="false" aria-label="Ouvrir le menu">☰</button></div>
</nav></header>
`;
if(footer){
footer.innerHTML=`
<footer class="footer"><div class="container"><div class="footer-grid">
<div><a class="logo" href="index.html">Meery Cake<small>Salon de thé · Carcassonne</small></a><p>Une parenthèse gourmande, au cœur de Carcassonne.</p><p>Maquette indépendante non officielle : photographies, horaires, prix, prestations et modalités à valider avec les propriétaires.</p></div>
<div><strong>À découvrir</strong><a href="index.html#carte" data-t="menu">La carte</a><a href="gateaux.html" data-t="cakes">Gâteaux personnalisés</a><a href="brunch.html" data-t="brunch">Brunch</a><a href="galerie.html" data-t="gallery">Galerie</a><a href="ateliers.html" data-t="workshops">Ateliers</a><a href="boutique.html" data-t="gifts">Cadeaux</a></div>
<div><strong>Informations</strong><a href="tel:+33983605602">09 83 60 56 02</a><a href="https://www.google.com/maps/search/?api=1&amp;query=Meery%20Cake%206%20rue%20Victor%20Hugo%2011000%20Carcassonne" target="_blank" rel="noopener noreferrer">6 rue Victor Hugo, Carcassonne ↗</a><a href="avis.html" data-t="reviews">Avis Google</a><a href="https://www.instagram.com/meery_cake/" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href="https://www.facebook.com/Meery-Cake-135627053291530/" target="_blank" rel="noopener noreferrer">Facebook ↗</a><a href="informations.html">FAQ & informations</a><a href="confidentialite.html">Confidentialité</a><a href="mentions-legales.html">Mentions légales</a></div></div>
<div class="footer-meta">© <span id="currentYear"></span> Meery Cake · Démonstration indépendante · <a style="display:inline" href="gestion-demo.html">Aperçu d'administration</a> · Réservations, paiements et commandes non confirmés par cette maquette.</div>
</div></footer>
<nav class="bottom-nav" aria-label="Accès rapide sur mobile">
<a href="index.html#carte"><span>☕</span><small data-t="menu">La carte</small></a>
<a href="gateaux.html"><span>🎂</span><small data-t="cakes">Gâteaux</small></a>
<a href="avis.html"><span>★</span><small data-t="reviews">Avis</small></a>
<a href="index.html#contact"><span>📍</span><small data-t="contact">Contact</small></a></nav>
<button type="button" class="back-top" id="backTop" aria-label="Retour en haut" hidden>↑</button>
<div id="toast" class="toast" role="status" aria-live="polite" hidden></div>
`;
const year=document.getElementById('currentYear');if(year)year.textContent=new Date().getFullYear();
}
})();

/* Meery Cake — V4 Motion / tested fallback-friendly page and section choreography.
   This is shared by all pages via v3-shell.js and does NOT require a SPA. */
(function initMeeryMotion(){
 const handoffKey='meerycake-page-transition';
 // Elegant animations are a built-in part of the design. Respect OS accessibility
 // preference for reduced motion, but do not expose a manual site toggle.
 const media=window.matchMedia?.('(prefers-reduced-motion: reduce)');
 function enabled(){return !media?.matches}
 let active=enabled();
 function applyPreference(){
   active=enabled();
   document.documentElement.classList.toggle('mc-motion-enabled',active);
   document.documentElement.classList.toggle('mc-motion-disabled',!active);
   document.getElementById('mcMotionToggle')?.remove();
 }
 applyPreference();
 if(media?.addEventListener)media.addEventListener('change',()=>{
   applyPreference();
   try{window.dispatchEvent(new Event('mc:motion-preference-change'))}catch{}
 });
 const overlay=document.createElement('div');
 overlay.className='mc-v4-curtain';
 overlay.setAttribute('aria-hidden','true');
 overlay.innerHTML='<div class="mc-v4-curtain-glow"></div><div class="mc-v4-brand"><span class="mc-v4-symbol">✧</span><span class="mc-v4-name">Meery Cake</span><span class="mc-v4-sub">UN INSTANT DE DOUCEUR</span><span class="mc-v4-wait">Patientez, une douceur arrive…</span><span class="mc-v4-dots"><i></i><i></i><i></i></span></div>';
 document.body.appendChild(overlay);
 const pill=document.createElement('div');
 pill.className='mc-v4-anchor-pill';
 pill.setAttribute('aria-hidden','true');
 const pillIcon=document.createElement('span');pillIcon.className='mc-v4-pill-icon';pillIcon.textContent='✧';
 const pillText=document.createElement('span');pillText.className='mc-v4-pill-text';
 pill.append(pillIcon,pillText);
 document.body.appendChild(pill);
 let isLeaving=false,exitTimer=null,pillTimer=null;
 function clearLeave(){
   isLeaving=false;
   overlay.classList.remove('mc-v4-leave','mc-v4-arrival','mc-v4-enter');
   document.documentElement.classList.remove('mc-v4-navigating');
   if(exitTimer){clearTimeout(exitTimer);exitTimer=null}
 }
 function setHandoff(url){
   try{window.sessionStorage.setItem(handoffKey,JSON.stringify({path:url.pathname,created:Date.now()}))}catch{}
 }
 function consumeHandoff(){
   try{
     const raw=window.sessionStorage.getItem(handoffKey);
     window.sessionStorage.removeItem(handoffKey);
     if(!raw)return false;
     const j=JSON.parse(raw);
     return Date.now()-j.created<15000&&j.path===window.location.pathname;
   }catch{return false}
 }
 if(active&&consumeHandoff()){
   overlay.classList.add('mc-v4-arrival');
   document.documentElement.classList.add('mc-v4-just-arrived');
   window.setTimeout(()=>{
     overlay.classList.add('mc-v4-enter');
     window.setTimeout(()=>{
       overlay.classList.remove('mc-v4-arrival','mc-v4-enter');
       document.documentElement.classList.remove('mc-v4-just-arrived');
     },870);
   },160);
 }
 function spotlight(label,target,href){
   if(!active)return;
   pillText.textContent=(label||'Découvrir').trim().slice(0,42);
   pill.classList.remove('mc-v4-pill-visible');
   void pill.offsetWidth;
   pill.classList.add('mc-v4-pill-visible');
   if(pillTimer)clearTimeout(pillTimer);
   pillTimer=window.setTimeout(()=>pill.classList.remove('mc-v4-pill-visible'),1060);
   if(target){
     window.setTimeout(()=>{
       if(href)window.history.pushState(null,'',href);
       target.scrollIntoView({behavior:'smooth',block:'start'});
       target.classList.remove('mc-v4-section-arrived');
       void target.offsetWidth;
       target.classList.add('mc-v4-section-arrived');
       window.setTimeout(()=>target.classList.remove('mc-v4-section-arrived'),1180);
     },180);
   }else if(href){
     window.history.pushState(null,'',href);
     window.scrollTo({top:0,behavior:'smooth'});
   }
 }
 function canonicalPath(url){return url.pathname.endsWith('/')?url.pathname+'index.html':url.pathname}
 document.addEventListener('click',event=>{
   if(!active||isLeaving||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.altKey||event.shiftKey)return;
   const link=event.target.closest&&event.target.closest('a[href]');
   if(!link||link.hasAttribute('download')||link.hasAttribute('data-no-transition')||(link.target&&link.target!=='_self')||link.closest('[contenteditable="true"]'))return;
   const href=link.getAttribute('href');if(!href||href.startsWith('javascript:'))return;
   let next;try{next=new URL(href,window.location.href)}catch{return}
   const current=new URL(window.location.href);
   if(next.origin!==current.origin||!['http:','https:'].includes(next.protocol))return;
   const same=canonicalPath(next)===canonicalPath(current)&&next.search===current.search;
   if(same){
     if(next.hash){
       let id;try{id=decodeURIComponent(next.hash.slice(1))}catch{id=next.hash.slice(1)}
       const section=document.getElementById(id);
       if(section){
         event.preventDefault();
         spotlight((link.textContent||link.getAttribute('aria-label')||section.getAttribute('aria-label')||'Découvrir').trim(),section,next.href);
       }
       return;
     }
     if(next.href!==current.href){
       event.preventDefault();
       spotlight(link.textContent||'Accueil',null,next.href);
     }
     return;
   }
   if(!next.pathname.endsWith('.html')&&!next.pathname.endsWith('/'))return;
   event.preventDefault();
   isLeaving=true;
   overlay.classList.remove('mc-v4-arrival','mc-v4-enter');
   overlay.classList.add('mc-v4-leave');
   document.documentElement.classList.add('mc-v4-navigating');
   setHandoff(next);
   // A real full-screen interstitial, held briefly so users can see it on mobile.
   exitTimer=window.setTimeout(()=>window.location.assign(next.href),1250);
   window.setTimeout(()=>{
     if(document.visibilityState==='visible')clearLeave();
   },2200);
 });
 window.addEventListener('pageshow',e=>{
   if(e.persisted){
     clearLeave();
     document.documentElement.classList.add('mc-v4-back');
     window.setTimeout(()=>document.documentElement.classList.remove('mc-v4-back'),850);
   }
 });
 window.addEventListener('popstate',()=>{clearLeave();applyPreference()});
})();
