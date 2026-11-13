
(function(){
"use strict";
var ROOT="https://video.blender.org";
function mp4(id){return ROOT+"/static/webseed/"+id+"-720.mp4";}
function commons(file,width){return "https://commons.wikimedia.org/wiki/Special:FilePath/"+encodeURIComponent(file).replace(/%2F/g,"/")+"?width="+(width||750);}
var films=[
{id:"sintel",title:"Sintel",year:2010,duration:15,genre:"Fantastique",tags:["Animation","Fantastique"],age:"Tout public",description:"Une jeune aventurière traverse un monde de glace et de feu pour retrouver le petit dragon qu'elle a autrefois sauvé. Une quête inoubliable sur l'amitié et le courage.",poster:"Sintel poster.jpg",backdrop:"Durian - Sintel-wallpaper-dragon.jpg",video:mp4("0eb052d0-fd51-43e6-aa33-ecdbf77a5d40"),official:"https://video.blender.org/videos/watch/0eb052d0-fd51-43e6-aa33-ecdbf77a5d40",license:"CC BY 3.0",credit:"© Blender Foundation / durian.blender.org",featured:true},
{id:"tears",title:"Tears of Steel",year:2012,duration:12,genre:"Science-fiction",tags:["Science-fiction","Action"],age:"12+",description:"Dans un Amsterdam futuriste, un groupe de scientifiques tente de réparer une erreur du passé pour offrir une dernière chance à l'humanité.",poster:"Tos-poster.png",backdrop:"Tears of Steel frame 01 2a.png",video:mp4("8533ea43-4271-4a57-9694-e9d0b35e1aa1"),official:"https://mango.blender.org/",license:"CC BY 3.0",credit:"© Blender Foundation / Project Mango",featured:true},
{id:"bunny",title:"Big Buck Bunny",year:2008,duration:10,genre:"Comédie",tags:["Animation","Comédie"],age:"Tout public",description:"Un lapin géant au grand cœur profite d'un jour paisible… jusqu'à ce que trois petits malins viennent troubler la forêt. Une aventure drôle et pleine de surprises.",poster:"Big buck bunny poster big.jpg",backdrop:"Big buck bunny poster big.jpg",video:mp4("bf1f3fb5-b119-4f9f-9930-8e20e892b898"),official:"https://peach.blender.org/",license:"CC BY 3.0",credit:"© Blender Foundation / peach.blender.org",featured:true},
{id:"spring",title:"Spring",year:2019,duration:8,genre:"Fantastique",tags:["Animation","Fantastique"],age:"Tout public",description:"Une jeune bergère et son chien croisent les esprits de la nature dans une histoire poétique où le printemps n'arrive jamais sans un peu de magie.",posterUrl:"https://i.vimeocdn.com/video/772422891-d079fb2d57a1958fc2599ec700f44fda975c1dbd921203d71d56ff0a12468474-d",backdropUrl:"https://i.vimeocdn.com/video/772422891-d079fb2d57a1958fc2599ec700f44fda975c1dbd921203d71d56ff0a12468474-d",video:mp4("3d95fb3d-c866-42c8-9db1-fe82f48ccb95"),official:"https://studio.blender.org/films/",license:"CC BY 4.0",credit:"© Blender Studio / Andy Goralczyk"},
{id:"sprite",title:"Sprite Fright",year:2021,duration:11,genre:"Comédie",tags:["Animation","Comédie"],age:"12+",description:"Une bande d'amis part camper dans une forêt peuplée de petites créatures. Leur aventure va rapidement prendre un tour imprévu.",poster:"Sprite Fright-movie poster.jpg",backdrop:"Sprite Fright-movie poster.jpg",video:"https://video.blender.org/download/videos/a69d68a5-a0e0-4a80-9d66-49f093c97aaf-720.mp4",official:"https://studio.blender.org/films/",license:"CC BY 4.0",credit:"© Blender Studio"},
{id:"agent",title:"Agent 327",year:2017,duration:4,genre:"Action",tags:["Animation","Action","Comédie"],age:"Tout public",description:"Un agent secret entre dans un salon de coiffure d'Amsterdam. Une coupe ordinaire ? Pas tout à fait. Une parodie d'espionnage pleine de détails.",posterUrl:"https://studio.blender.org/files/public/thumbnail/6f/a4/6fa4b9cc15464f0a9996408794c859ff_m.webp",video:mp4("264ff760-803e-430e-8d81-15648e904183"),official:"https://video.blender.org/videos/watch/264ff760-803e-430e-8d81-15648e904183",license:"CC BY-ND 4.0",credit:"© Blender Animation Studio / Agent 327",},
{id:"caminandes",title:"Caminandes",year:2013,duration:3,genre:"Comédie",tags:["Animation","Comédie"],age:"Tout public",description:"Un lama obstiné cherche à manger une baie dans les montagnes de Patagonie. Le problème ? La nature semble avoir d'autres projets.",poster:"Blender Foundation - Caminandes - Episode 2 - Gran Dillama - Cover thumbnail.png",video:mp4("fb70d459-48d2-4db5-adba-813c84f9200a"),official:"https://video.blender.org/",license:"CC BY 3.0",credit:"© Blender Foundation / Caminandes"},
{id:"glass",title:"Glass Half",year:2015,duration:3,genre:"Comédie",tags:["Animation","Comédie"],age:"Tout public",description:"Deux critiques d'art ne voient jamais la même chose dans une peinture. Une comédie courte et colorée sur le regard que l'on porte au monde.",poster:"Glass Half - screenshot-intro scene.png",video:mp4("64222c8a-c4c7-4b3b-9850-7fb2078edcf6"),official:"https://studio.blender.org/films/",license:"CC BY 4.0",credit:"© Blender Foundation"}
];
function getFilm(id){return films.find(function(f){return f.id===id;});}
function art(f,bg){return (bg&&f.backdropUrl)||(bg&&f.backdrop?commons(f.backdrop,1400):null)||f.posterUrl||commons(f.poster||"Sintel poster.jpg",bg?1400:700);}
function icon(name){return '<svg class="icon" aria-hidden="true"><use href="#i-'+name+'"></use></svg>';}
function text(s){return String(s||"").replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function storeRead(k,def){try{var v=JSON.parse(localStorage.getItem(k));return v&&typeof v==="object"?v:def;}catch(e){return def;}}
var favs=storeRead("vanta-favorites",[]);if(!Array.isArray(favs))favs=[];
var progress=storeRead("vanta-progress",{});
var view="home",filter="Tous",slide=0,currentPlayer=null,toastTimeout=null,searchOpened=false;
var app=document.getElementById("app");
function save(){try{localStorage.setItem("vanta-favorites",JSON.stringify(favs));localStorage.setItem("vanta-progress",JSON.stringify(progress));}catch(e){}}
function hero(){
var f=films[["sintel","tears","bunny"][slide]];
return '<section class="hero" id="hero"><div class="hero-bg" style="background-image:url(&quot;'+art(f,true)+'&quot;)"></div><div class="hero-tint"></div><div class="hero-noise"></div>'+
'<div class="hero-inner hero-content-anim"><div class="hero-eyebrow">La sélection VANTA</div><div class="hero-overline"><span></span> À la une <span></span> CINÉMA LIBRE</div>'+
'<h1 class="hero-title '+(f.title.length>12?"smaller":"")+'">'+text(f.title)+'</h1>'+
'<div class="hero-meta"><span>'+f.year+'</span><span class="dot"></span><span>'+f.duration+' min</span><span class="dot"></span><span>'+text(f.genre)+'</span><span class="dot"></span><span class="rating-pill">'+text(f.age)+'</span></div>'+
'<p class="hero-desc">'+text(f.description)+'</p><div class="hero-actions"><button class="btn-primary" data-watch="'+f.id+'">'+icon("play")+' Regarder le film</button><button class="btn-soft" data-info="'+f.id+'">'+icon("info")+' En savoir plus</button></div></div>'+
'<div class="hero-bottom"><span class="hero-selection">DES HISTOIRES QUI MÉRITENT LE GRAND ÉCRAN</span><div class="hero-controls"><button class="hero-arrow prev" data-slide="-1" aria-label="Film précédent">'+icon("arrow")+'</button><div class="slide-number">0'+(slide+1)+' <span>/ 03</span></div><div class="hero-progress"><span style="transform:translateX('+(slide*100)+'%)"></span></div><button class="hero-arrow" data-slide="1" aria-label="Film suivant">'+icon("arrow")+'</button></div></div></section>';
}
function card(f){
var percent=progress[f.id]&&progress[f.id].duration?Math.min(100,Math.round(progress[f.id].time/progress[f.id].duration*100)):0,hasFav=favs.indexOf(f.id)!==-1;
return '<article class="card reveal" tabindex="0" role="button" aria-label="Détails de '+text(f.title)+'" data-info="'+f.id+'"><div class="card-art"><div class="card-skeleton">V.</div><img src="'+art(f,false)+'" loading="lazy" alt="Affiche de '+text(f.title)+'" onerror="this.style.opacity=0"><div class="card-gradient"></div>'+
(f.featured?'<span class="card-label">SÉLECTION</span>':'')+
'<button class="card-fav '+(hasFav?"active":"")+'" data-fav="'+f.id+'" aria-label="'+(hasFav?"Retirer de":"Ajouter à")+' ma liste">'+icon("heart")+'</button>'+
'<button class="card-play" data-watch="'+f.id+'" aria-label="Regarder '+text(f.title)+'">'+icon("play")+'</button>'+
(percent?'<span class="card-progress" style="width:'+percent+'%"></span>':'')+'</div><h3 class="card-title">'+text(f.title)+'</h3>'+
'<div class="card-meta"><span>'+f.year+'</span><span class="tiny-dot"></span><span>'+f.duration+' min</span><span class="tiny-dot"></span><span>'+text(f.genre)+'</span></div></article>';
}
function rail(name,eyebrow,list,button){
return '<section class="section"><div class="section-head reveal"><div><p class="eyebrow">'+eyebrow+'</p><h2>'+name+'</h2></div>'+
(button?'<button class="text-link" data-nav="movies">Tout voir '+icon("arrow")+'</button>':'')+'</div>'+
'<div class="rail">'+list.map(card).join("")+'</div></section>';
}
function catalogueBanner(title,sub){return '<div class="catalogue-top"><p class="eyebrow">VANTA / LA CINÉMATHÈQUE</p><h1 class="catalogue-title">'+title+'</h1><p class="catalogue-intro">'+sub+'</p>'+
'<div class="filters">'+["Tous","Animation","Fantastique","Science-fiction","Comédie","Action"].map(function(t){return '<button class="filter '+(filter===t?"active":"")+'" data-filter="'+text(t)+'">'+text(t)+"</button>";}).join("")+'</div></div>';}
function filtered(){return films.filter(function(f){return filter==="Tous"||f.tags.indexOf(filter)!==-1;});}
function catalogueGrid(items){return '<div class="catalogue-grid">'+items.map(card).join("")+'</div>';}
function empty(title,desc,button){return '<div class="empty-container"><div class="empty-state">'+icon("info")+'<h3>'+title+'</h3><p>'+desc+'</p><button class="btn-primary" data-nav="movies">'+icon("arrow")+' '+(button||"Explorer les films")+'</button></div></div>';}
function render(){
var out="";
if(view==="home"){
out=hero()+'<div class="kicker-strip"><span>LE BON FILM. AU BON MOMENT. <strong>SANS ABONNEMENT.</strong></span><span class="kicker-right"><i class="status-dot"></i> LA SÉANCE COMMENCE ICI</span></div>'+
rail("À l'affiche","01 / NOTRE SÉLECTION",films.slice(0,7),true)+
rail("Des mondes à explorer","02 / FANTASTIQUE & ANIMATION",films.filter(function(f){return f.tags.indexOf("Fantastique")!==-1||f.tags.indexOf("Animation")!==-1;}),true)+
'<section class="spotlight reveal"><div class="spotlight-content"><p class="eyebrow">UNE EXPÉRIENCE À PART</p><h2>Une autre façon<br>de <em>vivre le cinéma.</em></h2><p>Des films soigneusement choisis, une interface pensée pour le plaisir des yeux. Tu choisis l’histoire. On s’occupe du reste.</p><div class="spotlight-buttons"><button class="btn-primary" data-random="1">'+icon("shuffle")+' Surprends-moi</button><button class="btn-outline" data-nav="movies">Explorer le catalogue '+icon("arrow")+'</button></div></div><div class="spotlight-card"><img src="'+art(films[4])+'" alt="Sprite Fright" loading="lazy"></div></section>'+
rail("Pour une soirée différente","03 / NOS COUPS DE CŒUR",[films[1],films[6],films[7],films[4],films[3]],true)+
'<div class="statement"><span>MOINS DE SCROLL. <strong>PLUS D’ÉMOTIONS.</strong></span><small>VANTA. MADE FOR MOVIES.</small></div>';
}else if(view==="movies"){
out='<div style="padding-top:78px"></div>'+catalogueBanner("Tous les films","Un catalogue de courts métrages et de créations originales, proposés sous licences ouvertes. Choisis un genre et lance ta séance.")+catalogueGrid(filtered());
if(!filtered().length)out+=empty("Aucun film dans ce genre","Essaie une autre catégorie.");
}else if(view==="discover"){
out='<div style="padding-top:78px"></div><div class="catalogue-top"><p class="eyebrow">VANTA / DÉCOUVERTES</p><h1 class="catalogue-title">La curiosité fait les meilleurs films.</h1><p class="catalogue-intro">Une sélection pour ceux qui veulent changer d’univers, de rythme et d’ambiance.</p><button class="btn-primary" data-random="1">'+icon("shuffle")+' Lancer un film au hasard</button></div>'+
rail("Voyage dans l'imaginaire","LA SÉLECTION FANTASTIQUE",[films[0],films[3],films[2]],false)+
rail("Court. Intense. Mémorable.","POUR UNE PAUSE CINÉMA",[films[5],films[6],films[7]],false)+
rail("À voir cette semaine","NOS INCONTOURNABLES",[films[1],films[4],films[0],films[2]],false);
}else if(view==="list"){
var list=films.filter(function(f){return favs.indexOf(f.id)!==-1;});
out='<div style="padding-top:78px"></div><div class="catalogue-top"><p class="eyebrow">VANTA / ESPACE PERSONNEL</p><h1 class="catalogue-title">Ma liste<span style="color:var(--accent)">.</span></h1><p class="catalogue-intro">Tous les films que tu as enregistrés, retrouvés ici, sur cet appareil.</p></div>'+(list.length?catalogueGrid(list):empty("Ta liste est encore vide.","Ajoute des films avec le cœur sur leur affiche. Ils apparaîtront ici.","Trouver un film"));
}else if(view==="history"){
var watched=films.filter(function(f){return progress[f.id]&&progress[f.id].time>3;}).sort(function(a,b){return (progress[b.id].updated||0)-(progress[a.id].updated||0);});
out='<div style="padding-top:78px"></div><div class="catalogue-top"><p class="eyebrow">VANTA / REPRENDRE</p><h1 class="catalogue-title">Reprendre la lecture<span style="color:var(--accent)">.</span></h1><p class="catalogue-intro">Tes dernières séances sont conservées sur cet appareil.</p></div>'+(watched.length?catalogueGrid(watched):empty("Aucune séance commencée.","Commence un film et tu le retrouveras ici."));
}
app.innerHTML=out;
document.querySelectorAll(".nav-item").forEach(function(b){b.classList.toggle("active",b.getAttribute("data-nav")===view);});
document.getElementById("mobile-nav").classList.remove("open");
reveal();
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
view=n;filter="Tous";render();window.scrollTo({top:0,behavior:"smooth"});
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
var added=favs.indexOf(id)!==-1;
modal('<div class="modal-bg" style="background-image:url(&quot;'+art(f,true)+'&quot;)"></div><button class="modal-close" data-close="detail" aria-label="Fermer">'+icon("close")+'</button>'+
'<div class="modal-body"><p class="eyebrow">VANTA / EN AVANT-PREMIÈRE</p><h2>'+text(f.title)+'</h2>'+
'<div class="modal-meta"><span>'+f.year+'</span><span>•</span><span>'+f.duration+' min</span><span>•</span><span>'+text(f.genre)+'</span><span>•</span><span>'+text(f.age)+'</span></div>'+
'<p>'+text(f.description)+'</p><div class="modal-actions"><button class="btn-primary" data-watch="'+f.id+'">'+icon("play")+' Regarder maintenant</button>'+
'<button class="btn-outline" data-fav="'+f.id+'">'+icon(added?"check":"plus")+' '+(added?"Dans ma liste":"Ajouter à ma liste")+'</button></div>'+
'<div class="modal-credit">Œuvre : '+text(f.credit)+' · Licence '+text(f.license)+'. Diffusion depuis une source externe. <a href="'+f.official+'" target="_blank" rel="noopener noreferrer">Source officielle '+icon("external")+'</a>. Ce site n’est pas affilié à Blender Studio.</div></div>');
}
function closeDetail(){document.getElementById("detail-root").innerHTML="";if(!document.getElementById("player-root").innerHTML&&!searchOpened)document.body.style.overflow="";}
function openCredits(){
modal('<button class="modal-close" data-close="detail" aria-label="Fermer">'+icon("close")+'</button><div class="modal-body" style="margin-top:0;padding-top:50px"><p class="eyebrow">VANTA / TRANSPARENCE</p><h2 style="font-size:50px">Crédits & licences</h2><div class="credits-panel"><p>VANTA présente des œuvres réalisées par Blender Foundation, Blender Institute et Blender Studio, diffusées depuis leurs serveurs publics, selon leurs licences respectives.</p><ul>'+
films.map(function(f){return '<li><strong>'+text(f.title)+'</strong> — '+text(f.credit)+' — '+text(f.license)+'</li>';}).join("")+
'</ul><p>Les affiches proviennent de ressources Wikimedia Commons et des galeries officielles (recadrage pour l’interface). Les visuels d’Agent 327 sont diffusés sous les conditions de leurs ayants droit. <a href="https://studio.blender.org/films/" target="_blank" rel="noopener">Découvrez les films chez Blender Studio</a>.</p><p>VANTA ne possède pas les œuvres et n’est ni affilié à Blender Foundation ni approuvé par elle. Les liens vidéo externes peuvent changer.</p></div></div>');
}
function openPlayer(id){
var f=getFilm(id);if(!f)return;
closeDetail();closeSearch();
var root=document.getElementById("player-root");
document.body.style.overflow="hidden";currentPlayer=id;
root.innerHTML='<div class="player-overlay" role="dialog" aria-modal="true" aria-label="Lecture de '+text(f.title)+'">'+
'<div class="player-top"><button class="player-back" data-close="player">'+icon("arrow").replace('class="icon"','class="icon" style="transform:rotate(180deg)"')+' Retour</button><div class="player-title"><span>VANTA / LECTURE</span>'+text(f.title)+'</div><button class="btn-quiet" data-close="player" aria-label="Fermer">'+icon("close")+'</button></div>'+
'<div class="player-main"><div class="player-loading" id="player-loading"><strong>VANTA<span>.</span></strong><div class="spinner"></div><p>Préparation de votre séance</p></div>'+
'<video id="film-video" controls playsinline autoplay preload="auto" poster="'+art(f,true)+'"><source src="'+f.video+'" type="video/mp4">Votre navigateur ne prend pas en charge ce lecteur.</video></div>'+
'<div class="player-footer"><span>'+text(f.credit)+' · '+text(f.license)+'</span><a href="'+f.official+'" target="_blank" rel="noopener noreferrer">Voir la source officielle '+icon("external")+'</a></div></div>';
var video=document.getElementById("film-video"),loading=document.getElementById("player-loading");
var saved=progress[id]&&progress[id].time||0;
function hideLoading(){if(loading)loading.classList.add("hidden");}
video.addEventListener("loadedmetadata",function(){
if(saved>2&&saved<video.duration-10){try{video.currentTime=saved;}catch(e){}}
setTimeout(hideLoading,400);
});
video.addEventListener("playing",hideLoading);
video.addEventListener("canplay",hideLoading);
video.addEventListener("timeupdate",function(){
if(!isFinite(video.duration)||video.duration<=0)return;
progress[id]={time:video.currentTime,duration:video.duration,updated:Date.now()};
if(Math.floor(video.currentTime)%2===0)save();
});
video.addEventListener("ended",function(){progress[id]={time:0,duration:video.duration||f.duration*60,updated:Date.now()};save();toast("Film terminé. Belle séance !");});
video.addEventListener("error",function(){
hideLoading();
var area=document.querySelector(".player-main");
if(area)area.insertAdjacentHTML("beforeend",'<div class="player-error"><h2>La vidéo ne se charge pas</h2><p>La source publique peut être momentanément indisponible.</p><a class="btn-primary" href="'+f.official+'" target="_blank" rel="noopener noreferrer">Ouvrir la source officielle '+icon("external")+'</a></div>');
});
var p=video.play();if(p&&p.catch)p.catch(function(){hideLoading();});
}
function closePlayer(){
var video=document.getElementById("film-video");if(video){video.pause();video.removeAttribute("src");video.load();}
document.getElementById("player-root").innerHTML="";currentPlayer=null;
document.body.style.overflow="";
render();
}
function openSearch(){
searchOpened=true;document.body.style.overflow="hidden";
document.getElementById("search-root").innerHTML='<div class="overlay" id="search-overlay"><div class="search-box" role="dialog" aria-label="Recherche" aria-modal="true"><div class="search-title"><span>Rechercher dans VANTA</span><button class="modal-close" style="position:static;width:30px;height:30px" data-close="search" aria-label="Fermer">'+icon("close")+'</button></div><label class="search-input-shell">'+icon("search")+'<input type="search" id="search-input" autocomplete="off" placeholder="Un film, un genre, une envie..."></label><p class="search-hint">Commence à écrire ou choisis parmi les suggestions</p><div id="search-results" class="search-results"></div></div></div>';
var field=document.getElementById("search-input");field.addEventListener("input",updateSearch);updateSearch();setTimeout(function(){field.focus();},100);
}
function updateSearch(){
var inp=document.getElementById("search-input");if(!inp)return;
var q=inp.value.trim().toLowerCase(),found=films.filter(function(f){return !q||[f.title,f.genre,f.description,f.year].join(" ").toLowerCase().includes(q);});
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
if(el.closest("[data-random]")){openPlayer(films[Math.floor(Math.random()*films.length)].id);return;}
var c=el.closest("[data-close]");if(c){var t=c.getAttribute("data-close");if(t==="player")closePlayer();else if(t==="search")closeSearch();else closeDetail();return;}
if(el.id==="search-trigger"){openSearch();return;}
if(el.id==="credits-btn"){openCredits();return;}
if(el.id==="mobile-menu"){document.getElementById("mobile-nav").classList.toggle("open");return;}
if(el.id==="profile-btn"){toast("Tes favoris et tes séances sont enregistrés sur cet appareil.");return;}
var fl=el.closest("[data-filter]");if(fl){filter=fl.getAttribute("data-filter");render();window.scrollTo({top:0,behavior:"smooth"});}
});
document.addEventListener("click",function(e){if(e.target.id==="detail-overlay")closeDetail();if(e.target.id==="search-overlay")closeSearch();});
document.addEventListener("keydown",function(e){
if(e.key==="Escape"){if(currentPlayer)closePlayer();else if(searchOpened)closeSearch();else closeDetail();document.getElementById("mobile-nav").classList.remove("open");}
if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();if(!searchOpened)openSearch();else closeSearch();}
if(e.key==="/"&&!e.target.matches("input")){e.preventDefault();if(!searchOpened)openSearch();}
if((e.key==="Enter"||e.key===" ")&&e.target.matches(".card[role=button]")){e.preventDefault();openDetail(e.target.getAttribute("data-info"));}
});
window.addEventListener("scroll",function(){document.getElementById("topbar").classList.toggle("scrolled",window.scrollY>25);},{passive:true});
setInterval(function(){if(view==="home"&&!currentPlayer&&!searchOpened&&!document.getElementById("detail-root").innerHTML){slide=(slide+1)%3;var h=document.getElementById("hero");if(h){var section=document.createElement("div");section.innerHTML=hero();h.replaceWith(section.firstElementChild);}}},8800);
render();
setTimeout(function(){document.getElementById("intro").classList.add("out");},980);
})();
