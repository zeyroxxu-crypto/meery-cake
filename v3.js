/* Meery Cake V3 — public demo, no live bookings/orders/payments */
'use strict';
const MC={
data:null,
storeKey:'meerycake-v3-favorites',langKey:'meerycake-v3-lang',
translations:{
fr:{home:'Accueil',menu:'La carte',explore:'Découvrir',reviews:'Avis clients',contact:'Contact',cakes:'Gâteaux sur mesure',gallery:'Galerie',workshops:'Ateliers',brunch:'Réserver un brunch',gifts:'Cadeaux',about:'Notre salon',search:'Rechercher un produit...',confirm:'À confirmer',favorites:'Mes favoris',call:'Appeler',open:'En savoir plus',noresults:'Aucun résultat trouvé.',note:'Les informations détaillées sur la carte sont actuellement en français.'},
en:{home:'Home',menu:'Menu',explore:'Explore',reviews:'Reviews',contact:'Contact',cakes:'Custom cakes',gallery:'Gallery',workshops:'Workshops',brunch:'Brunch enquiry',gifts:'Gifts',about:'Our tearoom',search:'Search the menu...',confirm:'Please enquire',favorites:'My favourites',call:'Call',open:'Learn more',noresults:'No results found.',note:'Detailed menu descriptions are currently in French.'},
es:{home:'Inicio',menu:'Carta',explore:'Descubrir',reviews:'Opiniones',contact:'Contacto',cakes:'Tartas a medida',gallery:'Galería',workshops:'Talleres',brunch:'Consultar brunch',gifts:'Regalos',about:'Nuestro salón',search:'Buscar producto...',confirm:'A confirmar',favorites:'Mis favoritos',call:'Llamar',open:'Saber más',noresults:'Sin resultados.',note:'Los detalles de la carta están actualmente en francés.'},
de:{home:'Startseite',menu:'Speisekarte',explore:'Entdecken',reviews:'Bewertungen',contact:'Kontakt',cakes:'Individuelle Torten',gallery:'Galerie',workshops:'Workshops',brunch:'Brunch anfragen',gifts:'Geschenke',about:'Unser Teesalon',search:'Produkt suchen...',confirm:'Auf Anfrage',favorites:'Meine Favoriten',call:'Anrufen',open:'Mehr erfahren',noresults:'Keine Ergebnisse.',note:'Detaillierte Speisekartentexte derzeit auf Französisch.'},
it:{home:'Home',menu:'Menù',explore:'Scopri',reviews:'Recensioni',contact:'Contatto',cakes:'Torte personalizzate',gallery:'Galleria',workshops:'Laboratori',brunch:'Richiedi brunch',gifts:'Regali',about:'Il nostro salone',search:'Cerca un prodotto...',confirm:'Da confermare',favorites:'I miei preferiti',call:'Chiama',open:'Scopri di più',noresults:'Nessun risultato.',note:'Le descrizioni dettagliate del menù sono per ora in francese.'},
pt:{home:'Início',menu:'Menu',explore:'Descobrir',reviews:'Avaliações',contact:'Contacto',cakes:'Bolos personalizados',gallery:'Galeria',workshops:'Workshops',brunch:'Pedir brunch',gifts:'Presentes',about:'O nosso salão',search:'Procurar produto...',confirm:'A confirmar',favorites:'Favoritos',call:'Ligar',open:'Saber mais',noresults:'Sem resultados.',note:'As descrições detalhadas do menu permanecem em francês.'},
nl:{home:'Home',menu:'Menukaart',explore:'Ontdekken',reviews:'Beoordelingen',contact:'Contact',cakes:'Taarten op maat',gallery:'Galerij',workshops:'Workshops',brunch:'Brunch aanvragen',gifts:'Cadeaus',about:'Onze tearoom',search:'Product zoeken...',confirm:'Op aanvraag',favorites:'Mijn favorieten',call:'Bellen',open:'Meer weten',noresults:'Geen resultaten.',note:'Gedetailleerde menuteksten zijn momenteel in het Frans.'},
pl:{home:'Strona główna',menu:'Menu',explore:'Odkryj',reviews:'Opinie',contact:'Kontakt',cakes:'Torty na zamówienie',gallery:'Galeria',workshops:'Warsztaty',brunch:'Zapytaj o brunch',gifts:'Prezenty',about:'Nasz salon',search:'Szukaj produktu...',confirm:'Do potwierdzenia',favorites:'Ulubione',call:'Zadzwoń',open:'Więcej',noresults:'Brak wyników.',note:'Szczegółowe opisy menu są obecnie po francusku.'}
},
get lang(){try{return localStorage.getItem(this.langKey)||'fr'}catch{return 'fr'}},
set lang(v){try{localStorage.setItem(this.langKey,v)}catch{}},
get favorites(){try{const a=JSON.parse(localStorage.getItem(this.storeKey)||'[]');return Array.isArray(a)?a.filter(v=>typeof v==='string').slice(0,300):[]}catch{return []}},
saveFavorites(a){try{localStorage.setItem(this.storeKey,JSON.stringify(a))}catch{}},
t(k){return (this.translations[this.lang]||this.translations.fr)[k]||k},
toast(m){const t=document.getElementById('toast');if(!t)return;t.textContent=m;t.hidden=false;clearTimeout(this.toastTimeout);this.toastTimeout=setTimeout(()=>{t.hidden=true},3200)},
el(tag,opts={}){const e=document.createElement(tag);if(opts.cls)e.className=opts.cls;if(opts.text!==undefined)e.textContent=opts.text;if(opts.href)e.href=opts.href;if(opts.type)e.type=opts.type;if(opts.title)e.title=opts.title;return e},
productById(id){for(const g of this.data?.menu||[]){const p=g.items.find(x=>x.id===id);if(p)return p}return null},
async copy(s){try{await navigator.clipboard.writeText(s);this.toast('Message copié !');return true}catch{this.toast('Copie indisponible : sélectionnez le texte.');return false}},
today(){const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,10)},
byId(id){return document.getElementById(id)},
markLinks(){const path=location.pathname.split('/').pop()||'index.html',hash=location.hash;document.querySelectorAll('.nav-list>a').forEach(a=>{const href=a.getAttribute('href')||'',parts=href.split('#'),p=parts[0],h=parts[1]?'#'+parts[1]:'';if(p===path&&(!h||h===hash||(path==='index.html'&&!hash&&h==='#accueil')))a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')})},
initNav(){
 const toggle=this.byId('navToggle'),nav=this.byId('mainNav');
 if(toggle&&nav){
 toggle.addEventListener('click',()=>{const opened=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(opened));toggle.textContent=opened?'×':'☰'});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.textContent='☰';toggle.setAttribute('aria-expanded','false');nav.querySelectorAll('details').forEach(d=>d.open=false)}));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰';nav.querySelectorAll('details').forEach(d=>d.open=false)}})
 }
 const select=this.byId('langSelect');
 if(select){select.value=this.lang;select.addEventListener('change',()=>{this.lang=select.value;this.translate();this.renderMenu?.();this.renderCatalog?.();this.renderFavorites?.()})}
 this.translate();this.markLinks();
 const top=this.byId('backTop');if(top){top.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));const update=()=>{top.hidden=window.scrollY<560};update();addEventListener('scroll',update,{passive:true})}
},
translate(){
 document.documentElement.lang=this.lang;
 document.querySelectorAll('[data-t]').forEach(e=>{const str=this.t(e.dataset.t);if(str)e.textContent=str});
 document.querySelectorAll('[data-t-placeholder]').forEach(e=>{e.placeholder=this.t(e.dataset.tPlaceholder)});
},
async loadData(){
 try{const resp=await fetch('v3-data.json',{cache:'no-store'});if(!resp.ok)throw Error('data unavailable');this.data=await resp.json()}
 catch(e){this.toast('La carte est momentanément indisponible.');this.data={menu:[],photos:[],contact:{},config:{}};}
},
toggleFavorite(id){
 let a=this.favorites;const exists=a.includes(id);a=exists?a.filter(x=>x!==id):[...a,id];this.saveFavorites(a);
 this.toast(exists?'Retiré des favoris':'Ajouté aux favoris ♡');
 this.renderMenu?.();this.renderCatalog?.();this.renderFavorites?.();
},
makeMenuLine(item){
 const div=this.el('div',{cls:'menu-line'}),title=this.el('strong',{text:item.name}),price=this.el('span',{cls:'price'+(item.price?'':' missing'),text:item.price||this.t('confirm')});
 div.append(title,price);
 if(item.description)div.append(this.el('p',{text:item.description}));
 const actions=this.el('div',{cls:'menu-line-actions'}),fav=this.el('button',{cls:'tiny-action'+(this.favorites.includes(item.id)?' is-fav':''),type:'button',text:this.favorites.includes(item.id)?'♥ Dans mes favoris':'♡ Ajouter aux favoris'});
 fav.setAttribute('aria-pressed',String(this.favorites.includes(item.id)));fav.addEventListener('click',()=>this.toggleFavorite(item.id));actions.append(fav);div.append(actions);return div
},
initHome(){
 if(!this.byId('menuCats'))return;
 this.categoryIndex=0;this.renderMenu=()=>{
 const cats=this.byId('menuCats'),items=this.byId('menuItems'),title=this.byId('menuHeading'),search=this.byId('menuSearch'),count=this.byId('favCount');if(!cats||!items)return;
 if(count)count.textContent=this.favorites.length+' favoris';
 cats.replaceChildren();
 for(const [i,g] of (this.data.menu||[]).entries()){
 const b=this.el('button',{cls:'menu-cat'+(i===this.categoryIndex?' active':''),type:'button',text:g.name});
 const n=this.el('span',{text:String(g.items.length)});b.append(n);b.setAttribute('aria-pressed',String(i===this.categoryIndex));
 b.addEventListener('click',()=>{this.categoryIndex=i;search.value='';this.renderMenu()});cats.append(b)
 }
 const cat=this.data.menu[this.categoryIndex];if(!cat){items.textContent='Carte à confirmer';return}
 title.textContent=cat.name;items.replaceChildren();
 const query=search.value.toLocaleLowerCase('fr').trim();
 const filtered=cat.items.filter(p=>(p.name+' '+p.description).toLocaleLowerCase('fr').includes(query));
 if(!filtered.length)items.append(this.el('p',{text:this.t('noresults')}));
 for(const p of filtered)items.append(this.makeMenuLine(p));
 };
 const search=this.byId('menuSearch');search?.addEventListener('input',()=>this.renderMenu());
 this.renderMenu();
 this.showGoogleRating?.();
},
async showGoogleRating(){
 const status=this.byId('homeReviewStatus'),rating=this.byId('homeRating');
 if(!status||!rating)return;
 try{const r=await fetch('google-avis.json',{cache:'no-store'}),j=await r.json();
 if(j.connected===true&&j.source==='google_business_profile'&&Number.isFinite(j.averageRating)&&Number.isInteger(j.totalReviewCount)){
 rating.textContent=j.averageRating.toLocaleString('fr-FR',{maximumFractionDigits:1,minimumFractionDigits:1})+'/5';
 status.textContent=j.totalReviewCount+' avis Google authentiques · synchronisation '+(j.updatedAt?new Date(j.updatedAt).toLocaleDateString('fr-FR'):'récente');
 }else{rating.textContent='—';status.textContent='La connexion Google Business Profile est en attente.'}
 }catch{rating.textContent='—';status.textContent='La note Google n’est pas disponible actuellement.'}
},
initCatalog(){
 if(!this.byId('catalogItems'))return;
 const params=new URLSearchParams(window.location.search);
 const queryFromLink=(params.get('q')||'').slice(0,90);
 let cat='all',favoritesOnly=false;
 if(queryFromLink)this.byId('catalogSearch').value=queryFromLink;
 const categoryFromLink=(params.get('category')||'').slice(0,35);
 if((this.data.menu||[]).some(g=>g.id===categoryFromLink))cat=categoryFromLink;
 this.renderCatalog=()=>{
 const result=this.byId('catalogItems'),q=this.byId('catalogSearch')?.value.toLocaleLowerCase('fr').trim()||'';result.replaceChildren();
 const matches=(this.data.menu||[]).flatMap(g=>g.items.map(p=>({...p,category:g.name,groupId:g.id}))).filter(p=>(cat==='all'||p.groupId===cat)&&(!favoritesOnly||this.favorites.includes(p.id))&&(p.name+' '+p.description).toLocaleLowerCase('fr').includes(q));
 this.byId('catalogCount').textContent=matches.length+' produits';
 if(!matches.length)result.append(this.el('p',{text:this.t('noresults')}));
 for(const p of matches){
 const card=this.el('article',{cls:'catalog-card'}),title=this.el('h3',{cls:'name',text:p.name}),label=this.el('span',{cls:'tag',text:p.category}),desc=this.el('p',{text:p.description||'Description à confirmer auprès du salon.'}),price=this.el('span',{cls:'price',text:p.price||this.t('confirm')});
 const actions=this.el('div',{cls:'catalog-actions'}),fav=this.el('button',{text:this.favorites.includes(p.id)?'♥ Favori':'♡ Favori',type:'button',cls:this.favorites.includes(p.id)?'active':''}),ask=this.el('a',{text:'Se renseigner →',href:'tel:+33983605602'});
 ask.className='inline-link';fav.addEventListener('click',()=>this.toggleFavorite(p.id));actions.append(fav,ask);card.append(label,title,desc,price,actions);result.append(card)
 }
 };
 const filters=this.byId('catalogFilters');
 const all=[{id:'all',name:'Tout'},...(this.data.menu||[])];
 for(const g of all){const b=this.el('button',{cls:'filter'+(g.id===cat?' active':''),text:g.name,type:'button'});b.setAttribute('aria-pressed',String(g.id===cat));b.addEventListener('click',()=>{cat=g.id;filters.querySelectorAll('button').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});this.renderCatalog()});filters.append(b)}
 this.byId('catalogSearch')?.addEventListener('input',()=>this.renderCatalog());
 this.byId('onlyFavs')?.addEventListener('change',e=>{favoritesOnly=e.target.checked;this.renderCatalog()});
 this.byId('copyFavorites')?.addEventListener('click',()=>{
 const names=this.favorites.map(id=>this.productById(id)).filter(Boolean).map(p=>'- '+p.name+(p.price?' ('+p.price+')':' (prix à confirmer)'));
 if(!names.length){this.toast('Ajoutez d’abord des produits aux favoris.');return}
 this.copy(['Ma sélection Meery Cake :',...names,'','Liste personnelle : ceci n’est pas une commande. Disponibilité et tarifs à confirmer auprès du salon.'].join('\n'))
 });
 this.renderCatalog()
},
initGallery(){
 const grid=this.byId('galleryGrid');if(!grid)return;let filter='all';
 const render=()=>{grid.replaceChildren();const ps=(this.data.photos||[]).filter(p=>p.displayInGallery!==false&&(filter==='all'||p.category===filter));
 for(const p of ps){const b=this.el('button',{cls:'gallery-tile',type:'button'}),img=this.el('img');img.src=p.src;img.alt=p.title+' (photo d’archive / source publique)';img.loading='lazy';img.decoding='async';const caption=this.el('span',{text:p.title});b.append(img,caption);b.addEventListener('click',()=>open(p));grid.append(b)}
 };
 const dialog=this.byId('lightbox'),image=this.byId('lightboxImage'),caption=this.byId('lightboxCaption');
 const open=p=>{image.src=p.src;image.alt=p.title;caption.textContent=p.title+' · '+p.source+' · droits de publication à confirmer';dialog.classList.add('open');this.byId('lightboxClose').focus()};
 const close=()=>{dialog.classList.remove('open');image.removeAttribute('src')};
 this.byId('lightboxClose').addEventListener('click',close);dialog.addEventListener('click',e=>{if(e.target===dialog)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&dialog.classList.contains('open'))close()});
 this.byId('galleryFilters').querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;this.byId('galleryFilters').querySelectorAll('button').forEach(x=>{const active=x===b;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active))});render()}));render()
},
initCakeDesigner(){
 const form=this.byId('cakeForm');if(!form)return;
 const steps=[...form.querySelectorAll('.step')],bars=[...form.querySelectorAll('.step-progress button')];let step=0;
 const prev=this.byId('cakePrev'),next=this.byId('cakeNext'),finish=this.byId('cakeFinish'),result=this.byId('cakeResult'),file=this.byId('cakePhoto');
 let photoBlob=null;
 const show=()=>{steps.forEach((s,i)=>s.classList.toggle('active',i===step));bars.forEach((b,i)=>{b.classList.toggle('active',i===step);b.classList.toggle('done',i<step);b.setAttribute('aria-current',i===step?'step':'false')});prev.hidden=step===0;next.hidden=step===steps.length-1;finish.hidden=step!==steps.length-1;result.hidden=true};
 const validate=()=>{for(const control of steps[step].querySelectorAll('input,select,textarea'))if(!control.checkValidity()){control.reportValidity();return false}return true};
 next.addEventListener('click',()=>{if(validate()&&step<steps.length-1){step++;show()}});
 prev.addEventListener('click',()=>{if(step>0){step--;show()}});
 bars.forEach((b,i)=>b.addEventListener('click',()=>{if(i<=step){step=i;show()}}));
 for(const sel of form.querySelectorAll('[data-choice]')){
 const group=sel.dataset.choice;sel.addEventListener('click',()=>{form.querySelectorAll('[data-choice="'+group+'"]').forEach(b=>b.setAttribute('aria-pressed',String(b===sel)));this.byId(group).value=sel.dataset.value;this.byId(group).dispatchEvent(new Event('change'))})
 }
 this.byId('cakeDate').min=this.today();
 file?.addEventListener('change',()=>{photoBlob=null;const f=file.files?.[0],preview=this.byId('cakePhotoPreview');preview.hidden=true;
 if(!f)return;if(!f.type.startsWith('image/')||f.size>5*1024*1024){this.toast('Choisissez une image de moins de 5 Mo.');file.value='';return}
 photoBlob=URL.createObjectURL(f);preview.src=photoBlob;preview.hidden=false;
 });
 const makeText=()=>{
 const v=id=>this.byId(id)?.value?.trim()||'À discuter';
 return ['Bonjour Meery Cake, je souhaite demander un devis pour un gâteau personnalisé.','','Prénom : '+v('cakeName'),'Téléphone ou e-mail : '+v('cakeContact'),'Date souhaitée : '+v('cakeDate'),'Nombre de parts : '+v('cakeParts'),'Occasion : '+v('cakeOccasion'),'Forme : '+v('cakeShape'),'Parfum : '+v('cakeFlavor'),'Couleurs / style : '+v('cakeColors'),'Décoration / allergies : '+v('cakeNotes'),'Image d’inspiration : '+(file?.files?.[0]?.name||'Aucune')+' (à joindre manuellement au message)','', 'Pouvez-vous me confirmer les possibilités, la disponibilité et le tarif ? Merci !'].join('\n');
 };
 form.addEventListener('submit',e=>{e.preventDefault();if(!validate())return;const out=makeText();this.byId('cakeSummary').textContent=out;result.hidden=false;result.scrollIntoView({block:'nearest',behavior:'smooth'});this.byId('cakeSendNotice').textContent='Demande préparée uniquement sur votre appareil. Aucun devis n’est envoyé automatiquement. Contactez le salon pour transmettre le message.'});
 this.byId('copyCake')?.addEventListener('click',()=>this.copy(this.byId('cakeSummary').textContent));
 this.byId('shareCake')?.addEventListener('click',async()=>{if(!navigator.share){this.toast('Utilisez le bouton Copier pour transmettre votre demande.');return}try{await navigator.share({title:'Demande gâteau Meery Cake',text:this.byId('cakeSummary').textContent})}catch{}});
 show()
},
initBrunch(){
 const form=this.byId('brunchForm');if(!form)return;
 this.byId('brunchDate').min=this.today();
 form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;
 const v=id=>this.byId(id).value.trim();
 const text=['Bonjour Meery Cake, je souhaite me renseigner sur une réservation de brunch.','','Nom : '+v('brunchName'),'Contact : '+v('brunchContact'),'Date souhaitée : '+v('brunchDate'),'Créneau préféré : '+v('brunchTime'),'Nombre de personnes : '+v('brunchPeople'),'Informations : '+(v('brunchNotes')||'Aucune'),'', 'Pourriez-vous me confirmer si ce créneau est proposé et disponible ? Merci.'].join('\n');
 this.byId('brunchSummary').textContent=text;this.byId('brunchResult').hidden=false;this.byId('brunchResult').scrollIntoView({block:'nearest',behavior:'smooth'});
 });
 this.byId('copyBrunch')?.addEventListener('click',()=>this.copy(this.byId('brunchSummary').textContent))
},
initWorkshops(){
 const form=this.byId('workshopForm');if(!form)return;
 form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;
 const v=id=>this.byId(id).value.trim();
 const text=['Bonjour Meery Cake, je souhaite avoir des informations sur un atelier.','','Nom : '+v('workshopName'),'Contact : '+v('workshopContact'),'Atelier : '+v('workshopType'),'Participants : '+v('workshopPeople'),'Disponibilité / demande : '+(v('workshopNotes')||'À définir'),'', 'Quels sont les prochaines dates, tarifs et modalités ? Merci !'].join('\n');
 this.byId('workshopSummary').textContent=text;this.byId('workshopResult').hidden=false;this.byId('workshopResult').scrollIntoView({block:'nearest',behavior:'smooth'});
 });
 this.byId('copyWorkshop')?.addEventListener('click',()=>this.copy(this.byId('workshopSummary').textContent))
},
initGifts(){
 if(!this.byId('giftGrid'))return;
 const gifts=[
 {title:'Carte cadeau',text:'Offrir une expérience gourmande. Montants, conditions et disponibilité à confirmer directement auprès du salon.',tag:'Sur demande'},
 {title:'Coffret de douceurs',text:'Composer un assortiment de pâtisseries selon les créations disponibles, sans prix ni stock garanti.',tag:'À confirmer'},
 {title:'Gâteau pour événement',text:'Une création pour un anniversaire, une fête ou un événement professionnel.',tag:'Personnalisé'},
 {title:'Brunch à partager',text:'Se renseigner auprès du salon sur les prochaines possibilités de brunch.',tag:'Information'},
 {title:'Atelier cupcakes',text:'Demander le programme et les prochaines dates pour offrir une expérience créative.',tag:'Selon calendrier'},
 {title:'Commande à emporter',text:'Préparer une liste de favoris avant de contacter le salon. Pas de commande ou paiement en ligne.',tag:'Projet'}
 ];
 const grid=this.byId('giftGrid');for(const g of gifts){const card=this.el('article',{cls:'event-card'});card.append(this.el('span',{cls:'tag gold',text:g.tag}),this.el('h3',{text:g.title}),this.el('p',{text:g.text}));const button=this.el('button',{cls:'button secondary small',type:'button',text:'Préparer une demande'});button.addEventListener('click',()=>{this.byId('giftChoice').value=g.title;this.byId('giftForm').scrollIntoView({behavior:'smooth'})});card.append(button);grid.append(card)}
 const form=this.byId('giftForm');form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;
 const v=id=>this.byId(id).value.trim();
 const text=['Bonjour Meery Cake, je souhaite me renseigner sur : '+v('giftChoice'),'Nom : '+v('giftName'),'Coordonnées : '+v('giftContact'),'Précisions : '+(v('giftNotes')||'À définir'),'', 'Pouvez-vous me confirmer les possibilités et tarifs ? Merci !'].join('\n');
 this.byId('giftSummary').textContent=text;this.byId('giftResult').hidden=false;
 });this.byId('copyGift')?.addEventListener('click',()=>this.copy(this.byId('giftSummary').textContent))
},
initAdminDemo(){
 const form=this.byId('adminForm');if(!form)return;
 const key='meerycake-v3-editor-preview';
 let settings={hours:'Horaires à confirmer directement auprès du salon',headline:'Une pause délicieusement gourmande.',workshops:'Dates et places des ateliers à confirmer'};
 try{const stored=JSON.parse(localStorage.getItem(key)||'null');if(stored&&typeof stored==='object')settings={...settings,...stored}}catch{}
 const inputs={hours:this.byId('adminHours'),headline:this.byId('adminHeadline'),workshops:this.byId('adminWorkshops')};
 for(const [k,el] of Object.entries(inputs))el.value=settings[k]||'';
 const render=()=>{this.byId('adminPreviewHeadline').textContent=settings.headline;this.byId('adminPreviewHours').textContent=settings.hours;this.byId('adminPreviewWorkshops').textContent=settings.workshops};
 render();
 form.addEventListener('submit',e=>{e.preventDefault();for(const [k,el] of Object.entries(inputs))settings[k]=el.value.trim().slice(0,500);try{localStorage.setItem(key,JSON.stringify(settings))}catch{};render();this.toast('Aperçu local enregistré sur cet appareil.')});
 this.byId('adminExport').addEventListener('click',()=>{const blob=new Blob([JSON.stringify({demoOnly:true,settings,generated:new Date().toISOString()},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob),a=this.el('a',{href:url});a.download='meerycake-contenu-propose.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000)});
 this.byId('adminReset').addEventListener('click',()=>{try{localStorage.removeItem(key)}catch{};location.reload()});
},
initScroll(){
 // Reveal effects are optional: never hide content unless IntersectionObserver
 // is supported AND the visitor has enabled the on-site motion control.
 if(!('IntersectionObserver' in window)||!document.documentElement.classList.contains('mc-motion-enabled'))return;
 if(document.documentElement.classList.contains('mc-motion-ready'))return;
 const targets=document.querySelectorAll('.section-head,.editorial-card,.featured-gallery a,.feature-copy,.promo-box,.contact-card,.review-summary,.review-status,.contact-map,.gallery-tile,.event-card,.catalog-card,.panel,.award-copy,.admin-stat,.menu-panel,.page-layout>aside,.faq details,.review-panel,.review-side-card,.google-panel,.gallery-photo');
 if(!targets.length)return;
 const observer=new IntersectionObserver(entries=>{
   for(const entry of entries){
     if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target)}
   }
 },{threshold:0.04,rootMargin:'0px 0px -24px 0px'});
 targets.forEach((el,i)=>{
   el.classList.add('reveal');
   el.style.setProperty('--reveal-delay',((i%3)*65)+'ms');
   const bounds=el.getBoundingClientRect();
   if(bounds.bottom<window.innerHeight*.95&&bounds.top>=0)el.classList.add('revealed');
   else observer.observe(el);
 });
 document.documentElement.classList.add('mc-motion-ready');
},
initMediaFallback(){document.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.classList.add('image-failed');img.alt=img.alt+' (image indisponible)';img.style.background='#f1dfdf'}))},
};
document.addEventListener('DOMContentLoaded',async()=>{
 MC.initNav();MC.initMediaFallback();await MC.loadData();
 MC.initHome();MC.initCatalog();MC.initGallery();MC.initCakeDesigner();MC.initBrunch();MC.initWorkshops();MC.initGifts();MC.initAdminDemo();MC.initScroll();
 window.addEventListener('mc:motion-preference-change',()=>{if(!document.documentElement.classList.contains('mc-motion-enabled')){document.documentElement.classList.remove('mc-motion-ready');document.querySelectorAll('.reveal').forEach(el=>el.classList.add('revealed'))}else{MC.initScroll()}});
});
