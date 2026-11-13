
(function(){
"use strict";
var ROOT="https://video.blender.org";
function mp4(id){return ROOT+"/static/webseed/"+id+"-720.mp4";}
function commons(file,width){return "https://commons.wikimedia.org/wiki/Special:FilePath/"+encodeURIComponent(file).replace(/%2F/g,"/")+"?width="+(width||750);}
var films=[{
 id:"film-selection",title:"Le film sélectionné",year:"",duration:"",genre:"Film",
 tags:["Film"],age:"",description:"Découvre la nouvelle vidéo choisie pour VANTA.",
 posterUrl:"https://i.ytimg.com/vi/aIVKaiaHkpk/hqdefault.jpg",
 backdropUrl:"https://i.ytimg.com/vi/aIVKaiaHkpk/hqdefault.jpg",
 youtubeId:"aIVKaiaHkpk",official:"https://www.youtube.com/watch?v=aIVKaiaHkpk",
 credit:"Vidéo diffusée par son auteur sur YouTube",license:"Lecture via le lecteur intégré YouTube",
 featured:true,kind:"long"
}];
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
var f=films[0];
return '<section class="hero" id="hero"><div class="hero-bg" style="background-image:url(&quot;'+art(f,true)+'&quot;)"></div><div class="hero-tint"></div><div class="hero-noise"></div>'+
'<div class="hero-inner hero-content-anim"><div class="hero-eyebrow">La sélection VANTA</div><div class="hero-overline"><span></span> À la une <span></span> NOUVELLE SÉLECTION</div>'+
'<h1 class="hero-title '+(f.title.length>12?"smaller":"")+'">'+text(f.title)+'</h1>'+
'<div class="hero-meta"><span>'+f.year+'</span><span class="dot"></span><span>'+f.duration+' min</span><span class="dot"></span><span>'+text(f.genre)+'</span><span class="dot"></span><span class="rating-pill">'+text(f.age)+'</span></div>'+
'<p class="hero-desc">'+text(f.description)+'</p><div class="hero-actions"><button class="btn-primary" data-watch="'+f.id+'">'+icon("play")+' Regarder le film</button><button class="btn-soft" data-info="'+f.id+'">'+icon("info")+' En savoir plus</button></div></div>'+
'<div class="hero-bottom"><span class="hero-selection">DES HISTOIRES QUI MÉRITENT LE GRAND ÉCRAN</span><div class="hero-controls"><button class="hero-arrow prev" data-slide="-1" aria-label="Film précédent">'+icon("arrow")+'</button><div class="slide-number">0'+(slide+1)+' <span>/ 03</span></div><div class="hero-progress"><span style="transform:translateX('+(slide*100)+'%)"></span></div><button class="hero-arrow" data-slide="1" aria-label="Film suivant">'+icon("arrow")+'</button></div></div></section>';
}
function card(f){
var percent=progress[f.id]&&progress[f.id].duration?Math.min(100,Math.round(progress[f.id].time/progress[f.id].duration*100)):0,hasFav=favs.indexOf(f.id)!==-1;
return '<article class="card reveal" tabindex="0" role="button" aria-label="Détails de '+text(f.title)+'" data-info="'+f.id+'"><div class="card-art"><div class="card-skeleton">V.</div><img src="'+art(f,false)+'" loading="lazy" alt="Affiche de '+text(f.title)+'" onerror="this.style.opacity=0"><div class="card-gradient"></div>'+
(f.kind==="long"?'<span class="card-label">FILM COMPLET</span>':(f.featured?'<span class="card-label">SÉLECTION</span>':''))+
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
'<div class="filters">'+["Tous","Longs métrages","Courts métrages","Classique","Animation","Fantastique","Science-fiction","Drame","Comédie","Action"].map(function(t){return '<button class="filter '+(filter===t?"active":"")+'" data-filter="'+text(t)+'">'+text(t)+"</button>";}).join("")+'</div></div>';}
function filtered(){return films.filter(function(f){return filter==="Tous"||(filter==="Longs métrages"&&f.kind==="long")||(filter==="Courts métrages"&&f.kind!=="long")||f.tags.indexOf(filter)!==-1;});}
function catalogueGrid(items){return '<div class="catalogue-grid">'+items.map(card).join("")+'</div>';}
function empty(title,desc,button){return '<div class="empty-container"><div class="empty-state">'+icon("info")+'<h3>'+title+'</h3><p>'+desc+'</p><button class="btn-primary" data-nav="movies">'+icon("arrow")+' '+(button||"Explorer les films")+'</button></div></div>';}
function render(){
var f=films[0],out='';
if(view==="home"){
out=hero()+'<div class="kicker-strip"><span>VANTA <strong> / PREMIER FILM</strong></span><span class="kicker-right">LECTURE INTÉGRÉE AU SITE</span></div>'+
rail("Notre sélection","01 / LE CATALOGUE",films,false);
}else if(view==="movies"||view==="discover"){
out='<div style="padding-top:90px"></div>'+catalogueBanner("Tous les films","La nouvelle sélection VANTA, à regarder avec le lecteur intégré.")+catalogueGrid(filtered());
}else if(view==="list"){
var l=films.filter(function(f){return favs.indexOf(f.id)!==-1;});
out='<div style="padding-top:90px"></div><div class="catalogue-top"><p class="eyebrow">VANTA / FAVORIS</p><h1 class="catalogue-title">Ma liste.</h1></div>'+(l.length?catalogueGrid(l):empty("Aucun favori","Ajoute des films à ta liste."));
}else{
out='<div style="padding-top:90px"></div>'+catalogueGrid(films);
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
'<div class="modal-credit">Œuvre : '+text(f.credit)+' · Licence '+text(f.license)+'. Diffusion depuis une source externe. <a href="'+f.official+'" target="_blank" rel="noopener noreferrer">Source officielle '+icon("external")+'</a>. VANTA est indépendant des institutions qui conservent ces films.</div></div>');
}
function closeDetail(){document.getElementById("detail-root").innerHTML="";if(!document.getElementById("player-root").innerHTML&&!searchOpened)document.body.style.overflow="";}
function openCredits(){
modal('<button class="modal-close" data-close="detail" aria-label="Fermer">'+icon("close")+'</button><div class="modal-body" style="margin-top:0;padding-top:50px"><p class="eyebrow">VANTA / TRANSPARENCE</p><h2 style="font-size:50px">Crédits & licences</h2><div class="credits-panel"><p>VANTA présente une sélection de films historiques et de créations indépendantes hébergées par Internet Archive ou Blender Studio. La situation juridique peut dépendre des versions, restaurations et bandes-son.</p><ul>'+
films.map(function(f){return '<li><strong>'+text(f.title)+'</strong> — '+text(f.credit)+' — '+text(f.license)+'</li>';}).join("")+
'</ul><p>Les affiches et miniatures proviennent de ressources Wikimedia Commons, Internet Archive et de galeries officielles. Les droits sur les éditions restaurées peuvent être distincts de ceux des films originaux. <a href="https://studio.blender.org/films/" target="_blank" rel="noopener">Découvrez les films chez Blender Studio</a>.</p><p>VANTA n’héberge pas les fichiers vidéo et n’est affilié ni à Internet Archive ni à Blender Studio. La disponibilité des lecteurs dépend des hébergeurs.</p></div></div>');
}
function archiveVideoCandidates(f){
/* Stream smaller, iPhone-compatible MP4 files directly; avoid choosing unplayable HEVC/4K encodes. */
var known={
sita:["https://archive.org/download/Sita_Sings_the_Blues/Sita_Sings_the_Blues_medium.mp4"],
sintel:["https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"],
tears:["https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"],
bunny:["https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"]
};
var fixed=known[f.id]||[];
if(!f.archiveId)return Promise.resolve(fixed.length?fixed:[f.video]);
return fetch("https://archive.org/metadata/"+encodeURIComponent(f.archiveId),{mode:"cors"}).then(function(response){
if(!response.ok)throw Error("Metadata unavailable");
return response.json();
}).then(function(data){
var files=(data.files||[]).filter(function(file){
var name=String(file.name||"");
return /\.mp4$/i.test(name)&& !/sample|trailer|preview|x265|hevc|4k|10bit|av1/i.test(name)&& file.private!==true&&file.private!=="true";
});
files.sort(function(a,b){
function rank(file){
var n=String(file.name||"").toLowerCase(),format=String(file.format||"").toLowerCase(),size=Number(file.size||0),score=0;
if(/medium|480p|512kb|h\.?264|mpeg4/.test(n+" "+format))score+=35;
if(/320p|360p|720p/.test(n))score+=8;
if(/1080p|2160p|bluray|remux/.test(n))score-=35;
if(/h\.?264|mpeg4/.test(format))score+=15;
if(/xvid|divx|mpeg2/.test(format+" "+n))score-=45;
if(size>0 && size<1200000000)score+=10;
if(size>1600000000)score-=25;
return score;
}
return rank(b)-rank(a);
});
var urls=files.slice(0,4).map(function(file){
return "https://archive.org/download/"+encodeURIComponent(f.archiveId)+"/"+file.name.split("/").map(encodeURIComponent).join("/");
});
return fixed.concat(urls.filter(function(url){return fixed.indexOf(url)<0;}));
}).catch(function(){return fixed;});
}
function openPlayer(id){
var f=getFilm(id);if(!f)return;
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
if(el.closest("[data-random]")){if(films.length)openPlayer(films[Math.floor(Math.random()*films.length)].id);return;}
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
