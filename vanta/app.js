
(function(){
"use strict";
var ROOT="https://video.blender.org";
function mp4(id){return ROOT+"/static/webseed/"+id+"-720.mp4";}
function commons(file,width){return "https://commons.wikimedia.org/wiki/Special:FilePath/"+encodeURIComponent(file).replace(/%2F/g,"/")+"?width="+(width||750);}
var films=[{
id:"film-selection",title:"Salem",year:"",duration:"",genre:"À regarder",tags:["À regarder"],age:"",
description:"La vidéo que tu as choisie pour VANTA, dans le lecteur YouTube intégré.",
posterUrl:"https://i.ytimg.com/vi/aIVKaiaHkpk/hqdefault.jpg",
backdropUrl:"https://i.ytimg.com/vi/aIVKaiaHkpk/hqdefault.jpg",
youtubeId:"aIVKaiaHkpk",official:"https://www.youtube.com/watch?v=aIVKaiaHkpk",
credit:"Vidéo YouTube intégrée",license:"Lecture YouTube",featured:true,kind:"long",available:true
},{
id:"starwreck",title:"Star Wreck: In the Pirkinning",year:2005,duration:103,genre:"Science-fiction",tags:["Science-fiction","Comédie"],kind:"long",
description:"Une parodie spatiale finlandaise en long métrage. Disponible gratuitement sous licence Creative Commons.",
archiveId:"StarWreckInThePirkining",official:"https://archive.org/details/StarWreckInThePirkining",
posterUrl:"https://archive.org/services/img/StarWreckInThePirkining",available:true,
credit:"Energia Productions",license:"Creative Commons BY-NC-ND"
},{
id:"sita",title:"Sita Sings the Blues",year:2008,duration:82,genre:"Animation",tags:["Animation","Comédie"],kind:"long",
description:"Un film d’animation musical réalisé par Nina Paley et mis librement à disposition par sa créatrice.",
archiveId:"Sita_Sings_the_Blues",official:"https://www.sitasingstheblues.com/watch.html",
posterUrl:"https://archive.org/services/img/Sita_Sings_the_Blues",available:true,
credit:"Nina Paley",license:"Mise à disposition libre par sa réalisatrice"
}].concat(window.VANTA_CATALOGUE||[]);
function getFilm(id){return films.find(function(f){return f.id===id;});}
function art(f,bg){return (bg&&f.backdropUrl)||f.posterUrl||"";}
function loadPosters(){
var images=[].slice.call(document.querySelectorAll("img[data-movie]"));
function load(img){
var title=img.getAttribute("data-movie"),year=img.getAttribute("data-year");
var key="vanta-poster-"+title+"-"+year;
var cached="";try{cached=localStorage.getItem(key)||"";}catch(e){}
if(cached){img.src=cached;img.onload=function(){img.style.opacity="1";};return;}
var url="https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&generator=search&gsrsearch="+encodeURIComponent(title+" "+year+" film")+"&gsrlimit=1&prop=pageimages&piprop=thumbnail&pithumbsize=500";
fetch(url).then(function(r){return r.json();}).then(function(d){
var pages=d.query&&d.query.pages||{},p=Object.keys(pages).map(function(k){return pages[k];})[0];
if(p&&p.thumbnail&&p.thumbnail.source){img.onload=function(){img.style.opacity="1";};img.src=p.thumbnail.source;try{localStorage.setItem(key,p.thumbnail.source);}catch(e){}}
}).catch(function(){});
}
if("IntersectionObserver" in window){
var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){obs.unobserve(e.target);load(e.target);}});},{rootMargin:"250px"});
images.forEach(function(img){obs.observe(img);});
}else{images.slice(0,20).forEach(load);}
}
function icon(name){return '<svg class="icon" aria-hidden="true"><use href="#i-'+name+'"></use></svg>';}
function text(s){return String(s||"").replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function storeRead(k,def){try{var v=JSON.parse(localStorage.getItem(k));return v&&typeof v==="object"?v:def;}catch(e){return def;}}
var favs=storeRead("vanta-favorites",[]);if(!Array.isArray(favs))favs=[];
var progress=storeRead("vanta-progress",{});
var view="home",filter="Disponibles",slide=0,currentPlayer=null,toastTimeout=null,searchOpened=false;
var app=document.getElementById("app");
function save(){try{localStorage.setItem("vanta-favorites",JSON.stringify(favs));localStorage.setItem("vanta-progress",JSON.stringify(progress));}catch(e){}}
function hero(){
return '<section class="hero" id="hero"><div class="hero-bg vanta-hero-abstract"></div><div class="hero-tint"></div>'+
'<div class="hero-inner hero-content-anim"><div class="hero-eyebrow">VANTA / LE CINÉMA À EXPLORER</div>'+
'<div class="hero-overline">130 LONGS MÉTRAGES · 9 CATÉGORIES</div>'+
'<h1 class="hero-title smaller">LE GRAND CINÉMA.</h1>'+
'<div class="hero-meta"><span>130 FILMS</span><span class="dot"></span><span>2 HEURES ET PLUS</span></div>'+
'<p class="hero-desc">Horreur, comédie, action, science-fiction, fantastique et plus encore. Explore les films sortis au cinéma, retrouve tes favoris et découvre où les regarder légalement.</p>'+
'<div class="hero-actions"><button class="btn-primary" data-nav="movies">'+icon("arrow")+' Explorer les films</button>'+
'<button class="btn-soft" data-watch="film-selection">'+icon("play")+' Regarder Salem</button></div></div>'+
'<div class="hero-bottom"><span class="hero-selection">LE CINÉMA PAR GENRE</span><span class="vanta-hero-count">130 FILMS / 09 CATÉGORIES</span></div></section>';
}
function card(f){
var watch=!!(f.youtubeId||f.archiveId),hasFav=favs.indexOf(f.id)!==-1;
var label=watch?"VIDÉO DISPONIBLE":"FICHE DU FILM";
var cover=f.posterUrl?'<img src="'+text(f.posterUrl)+'" loading="lazy" alt="" onerror="this.style.opacity=0">':'<img class="vanta-poster-img" data-movie="'+text(f.title)+'" data-year="'+text(f.year)+'" loading="lazy" alt="" style="opacity:0">';
return '<article class="card reveal vanta-movie-card" tabindex="0" role="button" data-info="'+f.id+'" aria-label="Fiche de '+text(f.title)+'">'+
'<div class="card-art vanta-film-art genre-'+f.genre.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z]/g,"")+'">'+
'<div class="vanta-poster-fallback"><span>'+text(f.genre)+'</span><strong>'+text(f.title)+'</strong><small>'+text(f.year||"VANTA")+'</small></div>'+
cover+'<div class="card-gradient"></div><span class="card-label '+(watch?"vanta-watch-label":"vanta-discovery-label")+'">'+label+'</span>'+
'<button class="card-fav '+(hasFav?"active":"")+'" data-fav="'+f.id+'" aria-label="'+(hasFav?"Retirer de":"Ajouter à")+' ma liste">'+icon("heart")+'</button>'+
'<button class="card-play" data-info="'+f.id+'" aria-label="Détails de '+text(f.title)+'">'+icon("info")+'</button></div>'+
'<h3 class="card-title">'+text(f.title)+'</h3><div class="card-meta"><span>'+text(f.year||"Vidéo")+'</span><span class="tiny-dot"></span><span>'+(f.duration?f.duration+" min":"À regarder")+'</span><span class="tiny-dot"></span><span>'+text(f.genre)+'</span></div></article>';
}
function rail(name,eyebrow,list,button){
return '<section class="section"><div class="section-head reveal"><div><p class="eyebrow">'+eyebrow+'</p><h2>'+name+'</h2></div>'+
(button?'<button class="text-link" data-nav="movies">Tout voir '+icon("arrow")+'</button>':'')+'</div>'+
'<div class="rail">'+list.map(card).join("")+'</div></section>';
}
function catalogueBanner(title,sub){
return '<div class="catalogue-top"><p class="eyebrow">VANTA / 130 FILMS DE CINÉMA</p><h1 class="catalogue-title">'+title+'</h1><p class="catalogue-intro">'+sub+'</p>'+
'<div class="filters">'+["Disponibles","Tous","Horreur","Comédie","Action","Science-fiction","Fantastique","Animation","Aventure","Thriller","Drame"].map(function(t){
return '<button class="filter '+(filter===t?"active":"")+'" data-filter="'+text(t)+'">'+text(t)+'</button>';
}).join("")+'</div><p class="vanta-film-total">'+filtered().length+' titre(s) dans cette sélection</p></div>';
}
function filtered(){return films.filter(function(f){return filter==="Tous"||(filter==="Disponibles"&&f.available)||f.genre===filter;});}
function catalogueGrid(items){return '<div class="catalogue-grid">'+items.map(card).join("")+'</div>';}
function empty(title,desc,button){return '<div class="empty-container"><div class="empty-state">'+icon("info")+'<h3>'+title+'</h3><p>'+desc+'</p><button class="btn-primary" data-nav="movies">'+icon("arrow")+' '+(button||"Explorer les films")+'</button></div></div>';}
function render(){
var out="";
if(view==="home"){
out=hero()+'<div class="kicker-strip"><span>VANTA <strong> / 130 FILMS, 9 GENRES</strong></span><span class="kicker-right">CATALOGUE DE DÉCOUVERTE</span></div>'+
rail("À regarder sur VANTA","01 / FILMS EN LECTURE",films.filter(function(f){return f.available;}),true)+
rail("Horreur","02 / FRISSONS",films.filter(function(f){return f.genre==="Horreur";}).slice(0,10),true)+
rail("Comédie","03 / HUMOUR",films.filter(function(f){return f.genre==="Comédie";}),true)+
rail("Action","04 / ADRÉNALINE",films.filter(function(f){return f.genre==="Action";}).slice(0,10),true)+
rail("Science-fiction","05 / VERS LE FUTUR",films.filter(function(f){return f.genre==="Science-fiction";}).slice(0,10),true)+
rail("Fantastique","06 / MONDES MAGIQUES",films.filter(function(f){return f.genre==="Fantastique";}).slice(0,10),true)+
rail("Animation","07 / ANIMATION",films.filter(function(f){return f.genre==="Animation";}),true)+
rail("Aventure","08 / ÉVASION",films.filter(function(f){return f.genre==="Aventure";}).slice(0,10),true)+
rail("Thriller","09 / SUSPENSE",films.filter(function(f){return f.genre==="Thriller";}).slice(0,10),true)+
rail("Drame","10 / GRANDES HISTOIRES",films.filter(function(f){return f.genre==="Drame";}).slice(0,10),true);
}else if(view==="movies"||view==="discover"){
out='<div style="padding-top:90px"></div>'+catalogueBanner("Tous les films","130 films de 2 heures ou plus à découvrir. Le filtre « Disponibles » montre uniquement les vidéos que tu peux lancer dans VANTA. Pour les autres, consulte leur fiche.")+catalogueGrid(filtered());
}else if(view==="list"){
var items=films.filter(function(f){return favs.indexOf(f.id)!==-1;});
out='<div style="padding-top:90px"></div><div class="catalogue-top"><p class="eyebrow">VANTA / FAVORIS</p><h1 class="catalogue-title">Ma liste.</h1></div>'+(items.length?catalogueGrid(items):empty("Aucun favori","Ajoute les films qui te plaisent."));
}else{out='<div style="padding-top:90px"></div>'+catalogueGrid(films);}
app.innerHTML=out;
document.querySelectorAll(".nav-item").forEach(function(b){b.classList.toggle("active",b.getAttribute("data-nav")===view);});
document.getElementById("mobile-nav").classList.remove("open");
reveal();loadPosters();
}
var observer;
function reveal(){
if(observer)observer.disconnect();
var targets=[].slice.call(document.querySelectorAll(".reveal"));
if(!("IntersectionObserver" in window)){targets.forEach(function(n){n.classList.add("shown");});return;}
observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add("shown");observer.unobserve(entry.target);}});},{threshold:.07,rootMargin:"0px 0px -20px 0px"});
targets.forEach(function(n,i){n.style.transitionDelay=(i%6)*55+"ms";observer.observe(n);});
}
function go(n){
view=n;filter="Disponibles";render();window.scrollTo({top:0,behavior:"smooth"});
}
function toast(msg){
var root=document.getElementById("toast-root");root.innerHTML='<div class="toast">'+text(msg)+'</div>';clearTimeout(toastTimeout);toastTimeout=setTimeout(function(){root.innerHTML="";},2500);
}
function toggleFav(id){
var index=favs.indexOf(id);
if(index<0){favs.push(id);toast("Ajouté à ta liste");}else{favs.splice(index,1);toast("Retiré de ta liste");}
save();render();if(document.querySelector(".modal"))openDetail(id);
}
function modal(markup){
document.body.style.overflow="hidden";
document.getElementById("detail-root").innerHTML='<div class="overlay" id="detail-overlay"><div class="modal" role="dialog" aria-modal="true">'+markup+'</div></div>';
}
function openDetail(id){
var f=getFilm(id);if(!f)return;
var added=favs.indexOf(id)!==-1,watch=!!(f.youtubeId||f.archiveId);
var where="https://www.justwatch.com/fr/recherche?q="+encodeURIComponent(f.title);
var action=watch?'<button class="btn-primary" data-watch="'+f.id+'">'+icon("play")+' Regarder dans VANTA</button>':
'<a class="btn-primary" href="'+where+'" target="_blank" rel="noopener noreferrer">'+icon("external")+' Où regarder légalement</a>';
modal('<div class="modal-bg" style="'+(f.posterUrl?'background-image:url(&quot;'+text(f.posterUrl)+'&quot;)':'background-image:linear-gradient(120deg,#222,#070707)')+'"></div>'+
'<button class="modal-close" data-close="detail" aria-label="Fermer">'+icon("close")+'</button>'+
'<div class="modal-body"><p class="eyebrow">VANTA / '+(watch?"VIDÉO INTÉGRÉE":"FICHE CINÉMA")+'</p><h2>'+text(f.title)+'</h2>'+
'<div class="modal-meta"><span>'+text(f.year||"Vidéo")+'</span><span>•</span><span>'+(f.duration?f.duration+" min":"Durée non précisée")+'</span><span>•</span><span>'+text(f.genre)+'</span></div>'+
'<p>'+text(f.description||"Un film à découvrir.")+'</p><div class="modal-actions">'+action+
'<button class="btn-outline" data-fav="'+f.id+'">'+icon(added?"check":"plus")+' '+(added?"Dans ma liste":"Ajouter à ma liste")+'</button></div>'+
'<div class="modal-credit">'+(watch?"Lecture depuis YouTube, sous réserve que la vidéo autorise l'intégration.":"Fiche de découverte uniquement : ce film n'est pas hébergé ni diffusé en entier sur VANTA. Les offres et prix peuvent varier. Aucun accès gratuit n'est garanti.")+'</div></div>');
}
function closeDetail(){document.getElementById("detail-root").innerHTML="";if(!document.getElementById("player-root").innerHTML&&!searchOpened)document.body.style.overflow="";}
function openCredits(){
modal('<button class="modal-close" data-close="detail" aria-label="Fermer">'+icon("close")+'</button>'+
'<div class="modal-body"><p class="eyebrow">VANTA / TRANSPARENCE</p><h2>Films & droits</h2>'+
'<p>VANTA répertorie 130 vrais longs métrages de deux heures ou plus. Cette sélection est un catalogue de découverte, pas une bibliothèque de 130 films gratuits en streaming.</p>'+
'<p>Les fiches « Où regarder » ouvrent une recherche de services légaux. Les films accessibles dans VANTA sont Salem (via YouTube), Star Wreck et Sita Sings the Blues (via Internet Archive) ; la lecture dépend de la disponibilité des hébergeurs.</p></div>');
}
function openPlayer(id){
var f=getFilm(id);if(!f)return;
if(!f.youtubeId&&!f.archiveId){openDetail(id);return;}
closeDetail();closeSearch();
document.body.style.overflow="hidden";currentPlayer=id;
var embeds={sintel:"0eb052d0-fd51-43e6-aa33-ecdbf77a5d40",tears:"8533ea43-4271-4a57-9694-e9d0b35e1aa1",bunny:"bf1f3fb5-b119-4f9f-9930-8e20e892b898",spring:"3d95fb3d-c866-42c8-9db1-fe82f48ccb95",sprite:"a69d68a5-a0e0-4a80-9d66-49f093c97aaf",agent:"264ff760-803e-430e-8d81-15648e904183",caminandes:"fb70d459-48d2-4db5-adba-813c84f9200a",glass:"64222c8a-c4c7-4b3b-9850-7fb2078edcf6"};
var filmUrl=f.youtubeId?"https://www.youtube-nocookie.com/embed/"+encodeURIComponent(f.youtubeId)+"?playsinline=1&rel=0":f.archiveId?"https://archive.org/embed/"+encodeURIComponent(f.archiveId):"https://video.blender.org/videos/embed/"+embeds[id];
document.getElementById("player-root").innerHTML='<div class="player-overlay vanta-cinema-player" id="vanta-cinema-player" role="dialog" aria-modal="true" aria-label="Lecture de '+text(f.title)+'">'+
'<div class="cinema-toolbar"><button class="cinema-back" data-close="player" aria-label="Quitter le film">'+icon("arrow").replace('class="icon"','class="icon" style="transform:rotate(180deg)"')+'</button><strong class="cinema-film-title">'+text(f.title)+'</strong><div class="cinema-toolbar-actions"><button class="cinema-fullscreen-btn" id="cinema-fullscreen-btn" data-cinema-fullscreen="1" aria-label="Passer en plein écran"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H3v5M16 3h5v5M3 16v5h5m13-5v5h-5"/></svg><span>Plein écran</span></button><button class="cinema-close" data-close="player" aria-label="Fermer">'+icon("close")+'</button></div></div>'+
'<div class="cinema-video-zone"><div class="cinema-iframe-wrap" id="cinema-iframe-wrap"><iframe id="film-iframe" title="Film '+text(f.title)+'" src="'+filmUrl+'" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen webkitallowfullscreen loading="eager"></iframe></div></div>'+
'<button class="cinema-exit-fullscreen" data-cinema-fullscreen="1" aria-label="Quitter le plein écran">'+icon("close")+'</button></div>';
}
function toggleCinemaFullscreen(){
var p=document.getElementById("vanta-cinema-player");
var wrap=document.getElementById("cinema-iframe-wrap");
if(!p||!wrap)return;
var exiting=p.classList.contains("cinema-is-fullscreen")||document.fullscreenElement===wrap;
if(exiting){
p.classList.remove("cinema-is-fullscreen");
if(document.fullscreenElement&&document.exitFullscreen){var exit=document.exitFullscreen();if(exit&&exit.catch)exit.catch(function(){});}
}else{
/* Request genuine fullscreen where supported. Safari embedded browsers may reject it. */
if(wrap.requestFullscreen){
try{
var request=wrap.requestFullscreen();
if(request&&request.then){
request.then(function(){p.classList.add("cinema-native-fullscreen");}).catch(function(){p.classList.add("cinema-is-fullscreen");});
}else{p.classList.add("cinema-is-fullscreen");}
}catch(e){p.classList.add("cinema-is-fullscreen");}
}else{p.classList.add("cinema-is-fullscreen");}
}
var btn=document.getElementById("cinema-fullscreen-btn");
if(btn)btn.setAttribute("aria-label",exiting?"Passer en plein écran":"Quitter le plein écran");
}
document.addEventListener("fullscreenchange",function(){
var p=document.getElementById("vanta-cinema-player");
if(p&&!document.fullscreenElement){p.classList.remove("cinema-native-fullscreen","cinema-is-fullscreen");}
});
function closePlayer(){
if(document.fullscreenElement&&document.exitFullscreen){var ex=document.exitFullscreen();if(ex&&ex.catch)ex.catch(function(){});}
document.getElementById("player-root").innerHTML="";
currentPlayer=null;document.body.style.overflow="";render();
}
function openSearch(){
searchOpened=true;document.body.style.overflow="hidden";
document.getElementById("search-root").innerHTML='<div class="overlay" id="search-overlay"><div class="search-box" role="dialog" aria-label="Recherche" aria-modal="true"><div class="search-title"><span>Rechercher dans VANTA</span><button class="modal-close" style="position:static;width:30px;height:30px" data-close="search" aria-label="Fermer">'+icon("close")+'</button></div><label class="search-input-shell">'+icon("search")+'<input type="search" id="search-input" autocomplete="off" placeholder="Un film, un genre, une envie..."></label><p class="search-hint">Commence à écrire ou choisis parmi les suggestions</p><div id="search-results" class="search-results"></div></div></div>';
var field=document.getElementById("search-input");field.addEventListener("input",updateSearch);updateSearch();setTimeout(function(){field.focus();},100);
}
function updateSearch(){
var inp=document.getElementById("search-input");if(!inp)return;
var q=inp.value.trim().toLowerCase(),found=films.filter(function(f){return !q||[f.title,f.genre,f.description,f.year].join(" ").toLowerCase().includes(q);}).slice(0,30);
var target=document.getElementById("search-results");
target.innerHTML=found.length?found.map(function(f){return '<button class="search-result" data-info="'+f.id+'"><img src="'+art(f)+'" alt=""><span><strong>'+text(f.title)+'</strong><small>'+f.year+' · '+f.duration+' min · '+text(f.genre)+'</small></span>'+icon("arrow")+'</button>';}).join(""):'<div style="padding:25px;color:#9aa0ad;text-align:center">Aucun résultat. Essaie un autre titre.</div>';
}
function closeSearch(){searchOpened=false;document.getElementById("search-root").innerHTML="";if(!currentPlayer&&!document.getElementById("detail-root").innerHTML)document.body.style.overflow="";}
document.addEventListener("click",function(e){
var el=e.target.closest("button,a,[data-info]");if(!el)return;
var nav=el.closest("[data-nav]");if(nav){e.preventDefault();go(nav.getAttribute("data-nav"));return;}
var sd=el.closest("[data-slide]");if(sd){slide=(slide+3+Number(sd.getAttribute("data-slide")))%3;render();return;}
var f=el.closest("[data-fav]");if(f){e.stopPropagation();toggleFav(f.getAttribute("data-fav"));return;}
var w=el.closest("[data-watch]");if(w){e.stopPropagation();openPlayer(w.getAttribute("data-watch"));return;}
var d=el.closest("[data-info]");if(d){e.stopPropagation();if(searchOpened)closeSearch();openDetail(d.getAttribute("data-info"));return;}
if(el.closest("[data-random]")){if(films.length)openDetail(films[Math.floor(Math.random()*films.length)].id);return;}
var c=el.closest("[data-close]");if(c){var t=c.getAttribute("data-close");if(t==="player")closePlayer();else if(t==="search")closeSearch();else closeDetail();return;}
if(el.id==="search-trigger"){openSearch();return;}
var fs=el.closest("[data-cinema-fullscreen]");if(fs){toggleCinemaFullscreen();return;}

if(el.id==="credits-btn"){openCredits();return;}
if(el.id==="mobile-menu"){document.getElementById("mobile-nav").classList.toggle("open");return;}
if(el.id==="profile-btn"){toast("Tes favoris et tes séances sont enregistrés sur cet appareil.");return;}
var fl=el.closest("[data-filter]");if(fl){filter=fl.getAttribute("data-filter");render();window.scrollTo({top:0,behavior:"smooth"});}
});

document.addEventListener("click",function(e){if(e.target.id==="detail-overlay")closeDetail();if(e.target.id==="search-overlay")closeSearch();});
document.addEventListener("keydown",function(e){
if(e.key==="Escape"){var cp=document.getElementById("vanta-cinema-player");if(cp&&cp.classList.contains("cinema-is-fullscreen"))toggleCinemaFullscreen();else if(currentPlayer)closePlayer();else if(searchOpened)closeSearch();else closeDetail();document.getElementById("mobile-nav").classList.remove("open");}
if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();if(!searchOpened)openSearch();else closeSearch();}
if(e.key==="/"&&!e.target.matches("input")){e.preventDefault();if(!searchOpened)openSearch();}
if((e.key==="Enter"||e.key===" ")&&e.target.matches(".card[role=button]")){e.preventDefault();openDetail(e.target.getAttribute("data-info"));}
});
window.addEventListener("scroll",function(){document.getElementById("topbar").classList.toggle("scrolled",window.scrollY>25);},{passive:true});
setInterval(function(){if(view==="home"&&!currentPlayer&&!searchOpened&&!document.getElementById("detail-root").innerHTML){slide=(slide+1)%3;var h=document.getElementById("hero");if(h){var section=document.createElement("div");section.innerHTML=hero();h.replaceWith(section.firstElementChild);}}},8800);
render();

})();
