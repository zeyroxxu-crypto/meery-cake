/* Meery Cake i18n — hand-authored translations, no external translation API.
   Original French is stored per text/attribute to allow reversible language changes.
   Works with dynamic catalogue and gallery content through MutationObserver. */
(function(){
'use strict';
const langs=['fr','en','es','de','it','pt','nl','pl'];
const dict=new Map();
function add(fr,en,es,de,it,pt,nl,pl){dict.set(fr,[fr,en,es,de,it,pt,nl,pl])}

/* Main menu, site footer, universal forms */
add('Accueil','Home','Inicio','Startseite','Home','Início','Startpagina','Strona główna');
add('La carte','Menu','Carta','Speisekarte','Menù','Menu','Menukaart','Menu');
add('Découvrir','Explore','Descubrir','Entdecken','Scopri','Descobrir','Ontdekken','Odkryj');
add('Avis clients','Customer reviews','Opiniones','Bewertungen','Recensioni','Avaliações','Beoordelingen','Opinie klientów');
add('Contact','Contact','Contacto','Kontakt','Contatti','Contacto','Contact','Kontakt');
add('Galerie','Gallery','Galería','Galerie','Galleria','Galeria','Galerij','Galeria');
add('Le salon','The tearoom','El salón','Der Teesalon','La sala da tè','O salão de chá','De tearoom','Herbaciarnia');
add('Gâteaux sur mesure','Custom cakes','Tartas personalizadas','Individuelle Torten','Torte su misura','Bolos personalizados','Taarten op maat','Torty na zamówienie');
add('Gâteaux personnalisés','Custom cakes','Tartas personalizadas','Personalisierte Torten','Torte personalizzate','Bolos personalizados','Taarten op maat','Torty na zamówienie');
add('Ateliers','Workshops','Talleres','Workshops','Laboratori','Oficinas','Workshops','Warsztaty');
add('Cadeaux','Gifts','Regalos','Geschenke','Regali','Presentes','Cadeaus','Prezenty');
add('Brunch','Brunch','Brunch','Brunch','Brunch','Brunch','Brunch','Brunch');
add('Réserver un brunch','Brunch enquiry','Consultar brunch','Brunch anfragen','Richiedi brunch','Pedir brunch','Brunch aanvragen','Zapytaj o brunch');
add('Mon carnet gourmand','My favourites notebook','Mi lista gourmet','Mein Genussheft','Il mio taccuino goloso','Meu caderno de favoritos','Mijn favorietenlijst','Mój notatnik smakosza');
add('Questions fréquentes','Frequently asked questions','Preguntas frecuentes','Häufige Fragen','Domande frequenti','Perguntas frequentes','Veelgestelde vragen','Częste pytania');
add('Informations','Information','Información','Informationen','Informazioni','Informações','Informatie','Informacje');
add('Confidentialité','Privacy','Privacidad','Datenschutz','Privacy','Privacidade','Privacy','Prywatność');
add('Mentions légales','Legal notice','Aviso legal','Impressum','Note legali','Aviso legal','Juridische informatie','Informacje prawne');
add('Sur demande','On request','Bajo petición','Auf Anfrage','Su richiesta','Sob consulta','Op aanvraag','Na życzenie');
add('À confirmer','To be confirmed','Por confirmar','Noch zu bestätigen','Da confermare','A confirmar','Nog te bevestigen','Do potwierdzenia');
add('Facultatif','Optional','Opcional','Optional','Facoltativo','Opcional','Optioneel','Opcjonalnie');
add('Obligatoire','Required','Obligatorio','Erforderlich','Obbligatorio','Obrigatório','Verplicht','Wymagane');
add('Retour au site public','Back to website','Volver al sitio','Zurück zur Website','Torna al sito','Voltar ao site','Terug naar website','Wróć do witryny');
add('Voir la galerie','View the gallery','Ver la galería','Galerie ansehen','Vedi la galleria','Ver galeria','Bekijk de galerij','Zobacz galerię');
add('Appeler','Call','Llamar','Anrufen','Chiama','Ligar','Bellen','Zadzwoń');
add('Appeler le salon','Call the tearoom','Llamar al salón','Teesalon anrufen','Chiama il locale','Ligar para o salão','Bel de tearoom','Zadzwoń do lokalu');
add('Voir tous les produits ↗','See all products ↗','Ver todos los productos ↗','Alle Produkte ansehen ↗','Vedi tutti i prodotti ↗','Ver todos os produtos ↗','Bekijk alle producten ↗','Zobacz wszystkie produkty ↗');
add('Voir les créations','View our creations','Ver las creaciones','Kreationen ansehen','Vedi le creazioni','Ver as criações','Bekijk de creaties','Zobacz wypieki');
add('Copier le message','Copy message','Copiar mensaje','Nachricht kopieren','Copia il messaggio','Copiar mensagem','Bericht kopiëren','Kopiuj wiadomość');
add('Copier la demande','Copy enquiry','Copiar solicitud','Anfrage kopieren','Copia la richiesta','Copiar pedido','Aanvraag kopiëren','Kopiuj zapytanie');
add('Préparer ma demande','Prepare my enquiry','Preparar mi solicitud','Anfrage vorbereiten','Prepara la richiesta','Preparar pedido','Aanvraag voorbereiden','Przygotuj zapytanie');
add('Préparer ma demande de réservation','Prepare my booking enquiry','Preparar mi solicitud de reserva','Reservierungsanfrage vorbereiten','Prepara richiesta di prenotazione','Preparar pedido de reserva','Reserveringsaanvraag voorbereiden','Przygotuj zapytanie o rezerwację');
add('Votre message est prêt','Your message is ready','Tu mensaje está listo','Ihre Nachricht ist fertig','Il messaggio è pronto','A sua mensagem está pronta','Je bericht is klaar','Twoja wiadomość jest gotowa');
add('Votre demande est prête','Your enquiry is ready','Tu solicitud está lista','Ihre Anfrage ist bereit','La richiesta è pronta','O seu pedido está pronto','Je aanvraag is klaar','Zapytanie jest gotowe');
add('Informations pratiques','Practical information','Información práctica','Praktische Informationen','Informazioni pratiche','Informações úteis','Praktische informatie','Informacje praktyczne');
add('Date souhaitée','Preferred date','Fecha deseada','Wunschtermin','Data desiderata','Data pretendida','Gewenste datum','Preferowana data');
add('Nombre de personnes','Number of guests','Número de personas','Anzahl der Personen','Numero di persone','Número de pessoas','Aantal personen','Liczba osób');
add('Téléphone ou e-mail','Phone or email','Teléfono o correo','Telefon oder E-Mail','Telefono o email','Telefone ou email','Telefoon of e-mail','Telefon lub e-mail');
add('Nom ou prénom','Name','Nombre','Name','Nome','Nome','Naam','Imię lub nazwisko');
add('Votre nom','Your name','Tu nombre','Ihr Name','Il tuo nome','O seu nome','Uw naam','Twoje imię');
add('Contact','Contact','Contacto','Kontakt','Contatto','Contacto','Contact','Kontakt');
add('Précisions','Details','Detalles','Anmerkungen','Dettagli','Detalhes','Toelichting','Szczegóły');
add('Autre','Other','Otro','Andere','Altro','Outro','Anders','Inne');
add('Anniversaire','Birthday','Cumpleaños','Geburtstag','Compleanno','Aniversário','Verjaardag','Urodziny');
add('Mariage','Wedding','Boda','Hochzeit','Matrimonio','Casamento','Bruiloft','Ślub');
add('Baptême','Christening','Bautizo','Taufe','Battesimo','Batizado','Doopfeest','Chrzest');
add('Fête familiale','Family celebration','Celebración familiar','Familienfeier','Festa di famiglia','Festa de família','Familiefeest','Uroczystość rodzinna');
add('Événement professionnel','Corporate event','Evento empresarial','Firmenevent','Evento aziendale','Evento profissional','Zakelijk evenement','Wydarzenie firmowe');
add('Envoyer','Send','Enviar','Senden','Invia','Enviar','Verzenden','Wyślij');
add('Effacer','Clear','Borrar','Löschen','Cancella','Limpar','Wissen','Wyczyść');
add('Mon expérience','My experience','Mi experiencia','Meine Erfahrung','La mia esperienza','A minha experiência','Mijn ervaring','Moje wrażenia');
add('Votre expérience','Your experience','Tu experiencia','Ihr Erlebnis','La tua esperienza','A sua experiência','Uw ervaring','Twoje wrażenia');
add('Votre commentaire *','Your comment *','Tu comentario *','Ihr Kommentar *','Il tuo commento *','O seu comentário *','Uw reactie *','Twój komentarz *');
add('Votre commentaire','Your comment','Tu comentario','Ihr Kommentar','Il tuo commento','O seu comentário','Uw reactie','Twój komentarz');
add('Toutes les photos','All photos','Todas las fotos','Alle Fotos','Tutte le foto','Todas as fotos','Alle foto’s','Wszystkie zdjęcia');
add('Pâtisseries','Pastries','Pasteles','Gebäck','Pasticceria','Bolos e doces','Gebak','Ciasta');
add('Cupcakes','Cupcakes','Cupcakes','Cupcakes','Cupcake','Cupcakes','Cupcakes','Babeczki');
add('Le salon','The tearoom','El salón','Der Teesalon','Il salone','O salão','De tearoom','Herbaciarnia');
add('Une idée de gâteau ?','Have a cake idea?','¿Tienes una idea de tarta?','Eine Tortenidee?','Hai un’idea per una torta?','Uma ideia para bolo?','Een idee voor een taart?','Pomysł na tort?');
add('Informations pratiques','Practical information','Información práctica','Praktische Informationen','Informazioni pratiche','Informações úteis','Praktische informatie','Informacje praktyczne');
add('Mes favoris','My favourites','Mis favoritos','Meine Favoriten','I miei preferiti','Os meus favoritos','Mijn favorieten','Moje ulubione');
add('La carte complète','Full menu','Carta completa','Gesamte Speisekarte','Menù completo','Menu completo','Volledige menukaart','Pełne menu');
add('À déguster','To enjoy','Para disfrutar','Zum Genießen','Da gustare','Para saborear','Om van te genieten','Do spróbowania');
add('Gourmandises','Sweet treats','Dulces','Leckereien','Dolcezze','Delícias','Lekkernijen','Słodkości');
add('Les desserts','Desserts','Postres','Desserts','Dolci','Sobremesas','Desserts','Desery');
add('Ambiance','Atmosphere','Ambiente','Atmosphäre','Atmosfera','Ambiente','Sfeer','Atmosfera');
add('La carte gourmande','Our delicious menu','Nuestra carta gourmet','Unsere Genusskarte','Il nostro menù goloso','O nosso menu gourmet','Onze lekkernijenkaart','Nasze smakowite menu');
add('Gâteaux personnalisés','Custom cakes','Tartas personalizadas','Personalisierte Torten','Torte personalizzate','Bolos personalizados','Taarten op maat','Torty na zamówienie');
add('Créer mon gâteau ♡','Design my cake ♡','Crear mi tarta ♡','Meine Torte gestalten ♡','Crea la mia torta ♡','Criar o meu bolo ♡','Ontwerp mijn taart ♡','Zaprojektuj tort ♡');
add('Découvrir la carte ↗','Explore the menu ↗','Ver la carta ↗','Speisekarte entdecken ↗','Scopri il menù ↗','Explorar o menu ↗','Bekijk de kaart ↗','Odkryj menu ↗');
add('Rechercher un produit...','Search for a product...','Buscar un producto...','Produkt suchen...','Cerca un prodotto...','Pesquisar um produto...','Zoek een product...','Szukaj produktu...');
add('Rechercher dans la catégorie…','Search this category…','Buscar en la categoría…','In Kategorie suchen…','Cerca nella categoria…','Pesquisar na categoria…','Zoek in categorie…','Szukaj w kategorii…');
add('Rechercher un dessert, une page…','Search for a dessert or a page…','Buscar un postre o una página…','Dessert oder Seite suchen…','Cerca un dolce o una pagina…','Pesquisar sobremesa ou página…','Zoek dessert of pagina…','Szukaj deseru lub strony…');
add('Mon carnet gourmand','My favourites notebook','Mi lista gourmet','Mein Genussheft','Il mio taccuino goloso','Meu caderno de favoritos','Mijn favorietenlijst','Mój notatnik smakosza');

const originalText=new WeakMap(),originalAttr=new WeakMap();
const excluded=new Set(['SCRIPT','STYLE','NOSCRIPT','TEXTAREA','CODE','PRE','OPTION_GAP']);
let translating=false,scheduled=false,current='fr';
function language(){try{const l=localStorage.getItem('meerycake-v3-lang')||'fr';return langs.includes(l)?l:'fr'}catch{return 'fr'}}
function translateText(node){
 const parent=node.parentElement;
 if(!parent||excluded.has(parent.tagName)||parent.closest('[data-no-translate],[contenteditable="true"],.mc-search-input,.mc-search-results #mcSearchInput'))return;
 const text=node.nodeValue;if(!text||!text.trim())return;
 if(!originalText.has(node))originalText.set(node,text);
 const source=originalText.get(node);
 const clean=source.trim();
 const matched=dict.get(clean);
 if(!matched)return;
 const idx=langs.indexOf(current);
 const result=matched[idx]||matched[1]||clean;
 const prefix=source.match(/^\s*/)?.[0]||'',suffix=source.match(/\s*$/)?.[0]||'';
 const translated=prefix+result+suffix;
 if(node.nodeValue!==translated)node.nodeValue=translated;
}
function translateAttr(el){
 if(!el||!el.getAttribute)return;
 for(const attr of ['placeholder','title','aria-label']){
  const value=el.getAttribute(attr);if(!value)continue;
  let record=originalAttr.get(el);if(!record){record={};originalAttr.set(el,record)}
  if(!(attr in record))record[attr]=value;
  const original=record[attr],translated=dict.get(original);
  if(translated)el.setAttribute(attr,translated[langs.indexOf(current)]||translated[1]||original);
 }
}
function walk(root){
 if(!root)return;
 if(root.nodeType===3){translateText(root);return}
 if(root.nodeType!==1&&root.nodeType!==9&&root.nodeType!==11)return;
 if(root.nodeType===1){
  if(excluded.has(root.tagName)||root.closest('[data-no-translate]'))return;
  translateAttr(root);
 }
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
 let text;
 while((text=walker.nextNode()))translateText(text);
 if(root.nodeType!==1||!root.matches('[placeholder],[title],[aria-label]')){}
 if(root.querySelectorAll)for(const el of root.querySelectorAll('[placeholder],[title],[aria-label]'))translateAttr(el);
}
function run(){
 if(translating)return;translating=true;
 current=language();document.documentElement.lang=current;
 const main=document.getElementById('main');
 if(main)walk(main);
 // Translate footer and editor tools while keeping the canonical navigation
 // handled by MC's existing 8-language dictionary.
 const footer=document.getElementById('siteFooter');if(footer)walk(footer);
 const header=document.getElementById('siteHeader');if(header)walk(header);
 document.title=(dict.get(document.title)||[])[langs.indexOf(current)]||document.title;
 translating=false;
}
function queue(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;run()})}
function bind(){
 const select=document.getElementById('langSelect');
 if(select){
   select.value=language();
   select.addEventListener('change',()=>{
     try{localStorage.setItem('meerycake-v3-lang',select.value)}catch{}
     // MC also handles navigation labels and catalogue content.
     queue();
   });
 }
 run();
 const root=document.body;
 const observer=new MutationObserver(mutations=>{
   if(translating)return;
   if(!mutations.some(m=>m.type==='childList'||m.type==='characterData'))return;
   queue();
 });
 observer.observe(root,{childList:true,characterData:true,subtree:true});
 window.addEventListener('pageshow',()=>queue());
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
})();
