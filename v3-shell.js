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

/* Progressive, same-origin page transitions across every Meery Cake V3 page.
   Never intercept downloads, external sites, modified clicks, hashes on this page,
   or native navigation when the visitor asks for reduced motion. */
(function initPageMotion(){
 const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(reduced)return;
 const curtain=document.createElement('div');
 curtain.className='meery-page-curtain';
 curtain.id='meeryPageCurtain';
 curtain.setAttribute('aria-hidden','true');
 curtain.innerHTML='<div class="meery-page-curtain-inner"><span class="meery-page-curtain-symbol">✦</span><span class="meery-page-curtain-title">Meery Cake</span><span class="meery-page-curtain-subtitle">Une douceur à découvrir</span></div><div class="meery-page-curtain-progress"></div>';
 document.body.appendChild(curtain);
 let navigating=false;
 document.addEventListener('click',function(event){
   if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||navigating)return;
   const link=event.target.closest&&event.target.closest('a[href]');
   if(!link||link.hasAttribute('download')||link.hasAttribute('data-no-transition')||link.getAttribute('target')&&link.getAttribute('target')!=='_self')return;
   if(link.closest('[contenteditable="true"]'))return;
   const raw=link.getAttribute('href');
   if(!raw||raw.startsWith('#')||raw.startsWith('javascript:'))return;
   let next;
   try{next=new URL(raw,window.location.href)}catch{return}
   const current=new URL(window.location.href);
   if(next.origin!==current.origin||!['http:','https:'].includes(next.protocol))return;
   // Render serves both "/" and "/index.html" as the same homepage.
   const pagePath=u=>u.pathname.endsWith('/')?u.pathname+'index.html':u.pathname;
   const samePage=pagePath(next)===pagePath(current)&&next.search===current.search;
   if(samePage){
     if(next.hash&&next.hash!==current.hash){
       let id;try{id=decodeURIComponent(next.hash.slice(1))}catch{id=next.hash.slice(1)}
       const section=document.getElementById(id);
       if(section){event.preventDefault();window.history.pushState(null,'',next.href);section.scrollIntoView({behavior:'smooth',block:'start'})}
     }else if(!next.hash&&next.href!==current.href){
       event.preventDefault();window.history.pushState(null,'',next.href);window.scrollTo({top:0,behavior:'smooth'});
     }
     return; /* Keep navigation inside the current document smooth and instant. */
   }
   if(!next.pathname.endsWith('.html')&&!next.pathname.endsWith('/'))return; /* Files and assets navigate normally */
   event.preventDefault();
   navigating=true;
   curtain.classList.add('is-visible');
   document.documentElement.classList.add('is-navigating');
   // Keep the effect brief. The destination loads as a normal real page, preserving browser history.
   window.setTimeout(()=>window.location.assign(next.href),410);
   // In case navigation is blocked by a browser extension, do not trap clicks forever.
   window.setTimeout(()=>{if(document.visibilityState==='visible'){curtain.classList.remove('is-visible');document.documentElement.classList.remove('is-navigating');navigating=false}},1800);
 },false);
 window.addEventListener('pageshow',()=>{curtain.classList.remove('is-visible');document.documentElement.classList.remove('is-navigating');navigating=false});
})();