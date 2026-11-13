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


/* Homepage, introductions, navigation between sections */
add('La douceur a','Sweetness has','La dulzura tiene','Süße hat','La dolcezza ha','A doçura tem','Zoetigheid heeft','Słodycz ma');
add('son','its','su','ihre','il suo','o seu','haar','swój');
add('adresse.','own address.','su lugar.','eine Adresse.','indirizzo.','endereço.','een adres.','adres.');
add('Carcassonne · Un tea room à part','Carcassonne · A unique tearoom','Carcasona · Un salón de té único','Carcassonne · Ein besonderer Teesalon','Carcassonne · Una sala da tè speciale','Carcassonne · Um salão de chá especial','Carcassonne · Een bijzondere tearoom','Carcassonne · Wyjątkowa herbaciarnia');
add('Une pause gourmande au cœur de Carcassonne : cupcakes, pâtisseries, boissons et un salon de thé au charme singulier.','A sweet break in the heart of Carcassonne: cupcakes, pastries, drinks and a charming tearoom.','Una pausa dulce en el corazón de Carcasona: cupcakes, pasteles, bebidas y un salón de té encantador.','Eine süße Pause im Herzen von Carcassonne: Cupcakes, Gebäck, Getränke und ein charmanter Teesalon.','Una pausa golosa nel cuore di Carcassonne: cupcake, dolci, bevande e una sala da tè incantevole.','Uma pausa deliciosa no coração de Carcassonne: cupcakes, doces, bebidas e um salão de chá encantador.','Een zoete pauze in het hart van Carcassonne: cupcakes, gebak, drankjes en een sfeervolle tearoom.','Słodka przerwa w sercu Carcassonne: babeczki, wypieki, napoje i urocza herbaciarnia.');
add('La carte gourmande','Our tasty menu','Nuestra carta gourmet','Unsere Genusskarte','Il nostro menù goloso','O nosso menu gourmet','Onze lekkernijenkaart','Nasze smakowite menu');
add('51 produits et formules recensés','51 listed products and options','51 productos y opciones','51 Produkte und Angebote','51 prodotti e proposte','51 produtos e opções','51 producten en formules','51 produktów i zestawów');
add('Préparez votre projet en quelques étapes','Plan your creation in a few steps','Prepara tu proyecto en pocos pasos','Planen Sie Ihr Projekt in wenigen Schritten','Prepara il tuo progetto in pochi passi','Prepare o seu projeto em poucos passos','Bereid je ontwerp in enkele stappen voor','Przygotuj swój projekt w kilku krokach');
add('Les avis de nos visiteurs','Our visitors’ reviews','Opiniones de nuestros clientes','Bewertungen unserer Gäste','Recensioni dei nostri ospiti','Avaliações dos visitantes','Reviews van onze gasten','Opinie naszych gości');
add('Retours authentiques sur Google','Genuine reviews on Google','Opiniones auténticas de Google','Echte Google-Bewertungen','Recensioni autentiche su Google','Avaliações autênticas no Google','Echte Google-reviews','Autentyczne opinie w Google');
add('Un univers à déguster','A world to savour','Un mundo por saborear','Eine Welt zum Genießen','Un mondo da gustare','Um mundo a saborear','Een wereld om van te proeven','Świat do smakowania');
add('Le plaisir des','The joy of','El placer de los','Die Freude an','Il piacere dei','O prazer dos','Het plezier van','Radość z');
add('petits moments.','little moments.','pequeños momentos.','kleinen Momenten.','piccoli momenti.','pequenos momentos.','kleine momenten.','małych chwil.');
add('Que vous veniez pour une pause sucrée, un brunch ou simplement un moment au salon, il y a toujours une bonne raison de découvrir Meery Cake.','Whether you come for something sweet, brunch or a relaxing break, there is always a good reason to discover Meery Cake.','Ya sea para un dulce, un brunch o un momento de descanso, siempre hay una buena razón para descubrir Meery Cake.','Ob für etwas Süßes, zum Brunch oder für eine kleine Pause: Es gibt immer einen Grund, Meery Cake zu entdecken.','Che sia per un dolce, un brunch o una pausa, c’è sempre un buon motivo per scoprire Meery Cake.','Para um doce, um brunch ou uma pausa, há sempre um bom motivo para descobrir o Meery Cake.','Voor iets zoets, een brunch of een ontspannen pauze: er is altijd een reden om Meery Cake te ontdekken.','Na coś słodkiego, brunch czy chwilę relaksu — zawsze warto odkryć Meery Cake.');
add('Des pâtisseries à savourer','Pastries to enjoy','Pasteles para saborear','Gebäck zum Genießen','Dolci da gustare','Doces para saborear','Gebak om van te genieten','Wypieki warte spróbowania');
add('Cupcakes, créations gourmandes et douceurs selon les propositions du moment.','Cupcakes, handmade treats and sweets depending on what is available.','Cupcakes, creaciones dulces y delicias según la oferta del momento.','Cupcakes, feine Kreationen und Süßes je nach aktuellem Angebot.','Cupcake, creazioni golose e dolci secondo le disponibilità.','Cupcakes, criações doces e delícias conforme a oferta do dia.','Cupcakes, zoete creaties en lekkernijen volgens het aanbod.','Babeczki i inne słodkości zgodnie z aktualną ofertą.');
add('Explorer les douceurs ↗','Explore our treats ↗','Explorar los dulces ↗','Süßes entdecken ↗','Scopri le dolcezze ↗','Explorar os doces ↗','Ontdek de lekkernijen ↗','Odkryj słodkości ↗');
add('Un brunch à partager','A brunch to share','Un brunch para compartir','Brunch zum Teilen','Un brunch da condividere','Um brunch para partilhar','Samen brunchen','Brunch do dzielenia się');
add('Des formules recensées dans notre carte, à confirmer auprès du salon pour les jours et tarifs.','Brunch options are listed on our menu; ask the tearoom to confirm dates and prices.','Opciones de brunch en la carta; confirma los días y precios con el local.','Brunch-Angebote stehen auf der Karte; Tage und Preise bitte vor Ort bestätigen.','Proposte brunch nel menù; giorni e prezzi da confermare al locale.','Opções de brunch no menu; confirme dias e preços com o salão.','Brunchopties op de kaart; vraag naar dagen en prijzen bij de tearoom.','Propozycje brunchu w menu; dni i ceny potwierdza lokal.');
add('Demander une table ↗','Ask for a table ↗','Solicitar mesa ↗','Tisch anfragen ↗','Richiedi un tavolo ↗','Pedir uma mesa ↗','Vraag een tafel aan ↗','Zapytaj o stolik ↗');
add('Un salon plein de charme','A charming tearoom','Un salón con encanto','Ein charmanter Teesalon','Una sala da tè affascinante','Um salão cheio de encanto','Een sfeervolle tearoom','Urokliwa herbaciarnia');
add('Un univers pastel, une atmosphère chaleureuse et l\'envie de prolonger la pause.','Pastel colours, a warm atmosphere and a place to linger.','Colores pastel, un ambiente acogedor y ganas de quedarse un rato más.','Pastellfarben, warme Atmosphäre und Zeit zum Verweilen.','Colori pastello, atmosfera accogliente e voglia di fermarsi un po’.','Tons pastel, ambiente acolhedor e vontade de ficar mais um pouco.','Pasteltinten, een warme sfeer en alle tijd om te ontspannen.','Pastelowe kolory, ciepła atmosfera i chęć pozostania na dłużej.');
add("L'esprit du salon ↗","Discover our tearoom ↗","Descubre el salón ↗","Unseren Teesalon entdecken ↗","Scopri la sala ↗","Descobrir o salão ↗","Ontdek de tearoom ↗","Odkryj herbaciarnię ↗");
add("L'esprit Meery Cake","The spirit of Meery Cake","El espíritu de Meery Cake","Der Geist von Meery Cake","Lo spirito di Meery Cake","O espírito do Meery Cake","De sfeer van Meery Cake","Duch Meery Cake");
add('Une parenthèse','A little escape','Un paréntesis','Eine Auszeit','Una pausa','Uma pausa','Even ontsnappen','Mała odskocznia');
add('loin du quotidien.','from everyday life.','de la rutina.','vom Alltag.','dalla quotidianità.','do dia a dia.','aan de dagelijkse drukte.','od codzienności.');
add('Votre idée, votre gâteau','Your idea, your cake','Tu idea, tu tarta','Ihre Idee, Ihre Torte','La tua idea, la tua torta','A sua ideia, o seu bolo','Jouw idee, jouw taart','Twój pomysł, twój tort');
add('Les belles occasions','Special occasions','Las ocasiones especiales','Besondere Anlässe','Le occasioni speciali','As ocasiões especiais','Bijzondere momenten','Wyjątkowe okazje');
add('méritent','deserve','merecen','verdienen','meritano','merecem','verdienen','zasługują na');
add('du sur mesure.','something unique.','algo a medida.','etwas Individuelles.','qualcosa di unico.','algo personalizado.','maatwerk.','coś wyjątkowego.');
add('Configurer mon gâteau ♡','Design my cake ♡','Diseñar mi tarta ♡','Meine Torte gestalten ♡','Personalizza la mia torta ♡','Personalizar o meu bolo ♡','Ontwerp mijn taart ♡','Zaprojektuj mój tort ♡');
add('Un peu de douceur','A touch of sweetness','Un poco de dulzura','Ein Hauch Süße','Un po’ di dolcezza','Um toque de doçura','Een beetje zoetigheid','Odrobina słodyczy');
add('en images.','in pictures.','en imágenes.','in Bildern.','in immagini.','em imagens.','in beelden.','na zdjęciach.');
add('Explorer la galerie complète ↗','Explore the full gallery ↗','Explorar toda la galería ↗','Gesamte Galerie entdecken ↗','Esplora tutta la galleria ↗','Explorar a galeria completa ↗','Bekijk de hele galerij ↗','Odkryj całą galerię ↗');
add('Des expériences à','Experiences to','Experiencias para','Erlebnisse zum','Esperienze da','Experiências para','Ervaringen om te','Chwile, którymi warto się');
add('partager.','share.','compartir.','Teilen.','condividere.','partilhar.','delen.','dzielić.');
add('Demander un brunch ↗','Enquire about brunch ↗','Consultar brunch ↗','Brunch anfragen ↗','Richiedi brunch ↗','Pedir brunch ↗','Brunch aanvragen ↗','Zapytaj o brunch ↗');
add('Les avis comptent','Reviews matter','Las opiniones importan','Bewertungen zählen','Le recensioni contano','As avaliações importam','Reviews tellen','Opinie mają znaczenie');
add('beaucoup.','a lot.','mucho.','viel.','molto.','muito.','echt mee.','wiele.');
add('Lire et donner un avis ↗','Read and write a review ↗','Leer y dejar una opinión ↗','Bewertungen lesen und schreiben ↗','Leggi e lascia una recensione ↗','Ler e deixar avaliação ↗','Lees en schrijf een review ↗','Czytaj i dodaj opinię ↗');
add('Nous retrouver','Find us','Dónde encontrarnos','Besuchen Sie uns','Dove trovarci','Onde nos encontrar','Vind ons','Znajdź nas');
add('à Carcassonne.','in Carcassonne.','en Carcasona.','in Carcassonne.','a Carcassonne.','em Carcassonne.','in Carcassonne.','w Carcassonne.');


/* Cake, brunch, workshops, product gallery and client reviews */
add('Imaginez le gâteau','Imagine a cake','Imagina la tarta','Gestalten Sie die Torte','Immagina la torta','Imagine o bolo','Stel je de taart voor','Wyobraź sobie tort');
add('qui vous ressemble.','that feels like you.','a tu estilo.','die zu Ihnen passt.','che ti rappresenta.','que combina consigo.','die bij jou past.','w swoim stylu.');
add('Mon gâteau personnalisé','My custom cake','Mi tarta personalizada','Meine Wunschtorte','La mia torta personalizzata','O meu bolo personalizado','Mijn taart op maat','Mój tort na zamówienie');
add('Un projet unique, en 4 étapes','A unique creation in 4 steps','Una creación única en 4 pasos','Individuell in 4 Schritten','Una creazione in 4 passi','Uma criação em 4 etapas','Uniek in 4 stappen','Wyjątkowy projekt w 4 krokach');
add('01. Occasion','01. Occasion','01. Ocasión','01. Anlass','01. Occasione','01. Ocasião','01. Gelegenheid','01. Okazja');
add('02. Style','02. Style','02. Estilo','02. Stil','02. Stile','02. Estilo','02. Stijl','02. Styl');
add('03. Contact','03. Contact','03. Contacto','03. Kontakt','03. Contatto','03. Contacto','03. Contact','03. Kontakt');
add('04. Récapitulatif','04. Summary','04. Resumen','04. Übersicht','04. Riepilogo','04. Resumo','04. Overzicht','04. Podsumowanie');
add('Pour quelle occasion ?','What is the occasion?','¿Para qué ocasión?','Für welchen Anlass?','Per quale occasione?','Para que ocasião?','Voor welke gelegenheid?','Na jaką okazję?');
add('Occasion','Occasion','Ocasión','Anlass','Occasione','Ocasião','Gelegenheid','Okazja');
add('Choisir une occasion','Choose an occasion','Elige una ocasión','Anlass wählen','Scegli un’occasione','Escolha a ocasião','Kies een gelegenheid','Wybierz okazję');
add('Nombre de parts souhaité','Number of servings','Número de porciones','Anzahl der Portionen','Numero di porzioni','Número de fatias','Aantal porties','Liczba porcji');
add('Des goûts et des couleurs','Flavours and colours','Sabores y colores','Geschmack und Farben','Gusti e colori','Sabores e cores','Smaken en kleuren','Smaki i kolory');
add('Forme de gâteau','Cake shape','Forma de la tarta','Tortenform','Forma della torta','Formato do bolo','Taartvorm','Kształt tortu');
add('Rond','Round','Redonda','Rund','Rotonda','Redondo','Rond','Okrągły');
add('Carré','Square','Cuadrada','Quadratisch','Quadrata','Quadrado','Vierkant','Kwadratowy');
add('À étages','Tiered','De varios pisos','Mehrstöckig','A piani','Com andares','Met lagen','Piętrowy');
add('À discuter','To discuss','A consultar','Nach Absprache','Da concordare','A combinar','In overleg','Do uzgodnienia');
add('Parfum ou garniture','Flavour or filling','Sabor o relleno','Geschmack oder Füllung','Gusto o farcitura','Sabor ou recheio','Smaak of vulling','Smak lub nadzienie');
add('Palette de couleurs','Colour palette','Paleta de colores','Farbpalette','Palette di colori','Paleta de cores','Kleurenpalet','Paleta kolorów');
add('Thème et décorations souhaités','Theme and decorations','Tema y decoraciones','Motiv und Dekoration','Tema e decorazioni','Tema e decorações','Thema en versiering','Motyw i dekoracje');
add('Et pour vous contacter ?','How can we contact you?','¿Cómo contactarte?','Wie erreichen wir Sie?','Come contattarti?','Como podemos contactá-lo?','Hoe kunnen we je bereiken?','Jak się z tobą skontaktować?');
add('Prénom ou nom','First or last name','Nombre o apellido','Vor- oder Nachname','Nome o cognome','Nome ou apelido','Voor- of achternaam','Imię lub nazwisko');
add('Votre téléphone ou e-mail','Your phone or email','Tu teléfono o correo','Ihre Telefonnummer oder E-Mail','Il tuo telefono o email','O seu telefone ou email','Je telefoon of e-mail','Twój telefon lub e-mail');
add("Image d'inspiration (facultatif)","Inspiration image (optional)","Imagen de inspiración (opcional)","Inspirationsbild (optional)","Immagine d’ispirazione (facoltativa)","Imagem de inspiração (opcional)","Inspiratiefoto (optioneel)","Zdjęcie inspiracji (opcjonalnie)");
add('Tout est prêt pour votre demande','Your enquiry is ready','Tu solicitud está lista','Ihre Anfrage ist bereit','La richiesta è pronta','O pedido está pronto','Je aanvraag is klaar','Zapytanie jest gotowe');
add('← Précédent','← Previous','← Anterior','← Zurück','← Indietro','← Anterior','← Vorige','← Wstecz');
add('Continuer →','Continue →','Continuar →','Weiter →','Continua →','Continuar →','Verder →','Dalej →');
add('Préparer ma demande','Prepare enquiry','Preparar solicitud','Anfrage vorbereiten','Prepara richiesta','Preparar pedido','Aanvraag voorbereiden','Przygotuj zapytanie');
add('Copier la demande','Copy enquiry','Copiar solicitud','Anfrage kopieren','Copia la richiesta','Copiar pedido','Aanvraag kopiëren','Kopiuj zapytanie');
add('Partager sur mon téléphone','Share on my phone','Compartir en mi móvil','Auf dem Handy teilen','Condividi sul telefono','Partilhar no telemóvel','Delen op mijn telefoon','Udostępnij na telefonie');
add('Une création pour chaque occasion','A cake for every occasion','Una creación para cada ocasión','Eine Torte für jeden Anlass','Una torta per ogni occasione','Um bolo para cada ocasião','Een taart voor elke gelegenheid','Tort na każdą okazję');
add('Une date précise','A specific date','Una fecha concreta','Ein konkreter Termin','Una data precisa','Uma data certa','Een specifieke datum','Konkretna data');
add('Une inspiration','Some inspiration','Una inspiración','Eine Inspiration','Un’ispirazione','Uma inspiração','Inspiratie','Inspiracja');
add('Un nombre de parts','Number of portions','Número de porciones','Anzahl der Portionen','Numero di porzioni','Número de fatias','Aantal porties','Liczba porcji');
add('Avant de commencer','Before you start','Antes de empezar','Bevor Sie beginnen','Prima di iniziare','Antes de começar','Voordat je begint','Zanim zaczniesz');
add('Un brunch','A brunch','Un brunch','Ein Brunch','Un brunch','Um brunch','Een brunch','Brunch');
add('à votre rythme.','at your pace.','a tu ritmo.','in Ihrem Tempo.','con calma.','ao seu ritmo.','op jouw tempo.','w swoim tempie.');
add('Un moment à partager','A moment to share','Un momento para compartir','Ein Moment zum Teilen','Un momento da condividere','Um momento para partilhar','Een moment om te delen','Chwila do dzielenia');
add('Choisissez un créneau souhaité','Choose a preferred time','Elige la hora deseada','Wunschzeit auswählen','Scegli l’orario preferito','Escolha um horário','Kies een gewenst tijdstip','Wybierz dogodną godzinę');
add('Horaire préféré','Preferred time','Hora preferida','Wunschzeit','Orario preferito','Hora preferida','Gewenst tijdstip','Preferowana godzina');
add('Choisir une préférence','Choose a preferred time','Elige una preferencia','Wunschzeit wählen','Scegli una preferenza','Escolha uma preferência','Kies een voorkeur','Wybierz godzinę');
add('Autre horaire','Other time','Otra hora','Andere Uhrzeit','Altro orario','Outro horário','Andere tijd','Inna godzina');
add('Précisions éventuelles','Additional details','Detalles adicionales','Weitere Angaben','Ulteriori dettagli','Detalhes adicionais','Extra informatie','Dodatkowe informacje');
add('Demande de brunch','Brunch enquiry','Solicitud de brunch','Brunch-Anfrage','Richiesta brunch','Pedido de brunch','Brunchaanvraag','Zapytanie o brunch');
add('Vos questions','Your questions','Tus preguntas','Ihre Fragen','Le tue domande','As suas perguntas','Jouw vragen','Twoje pytania');
add('Avant de venir','Before visiting','Antes de venir','Vor Ihrem Besuch','Prima di venire','Antes de visitar','Voor je bezoek','Przed wizytą');
add('Apprendre & partager','Learn & share','Aprender y compartir','Lernen und teilen','Impara e condividi','Aprender e partilhar','Leren en delen','Ucz się i dziel');
add('La gourmandise,','Sweetness,','La dulzura,','Genuss,','La golosità,','A doçura,','Zoetigheid,','Słodkość,');
add('ça se crée.','made by hand.','se crea.','selbst gemacht.','si crea.','faz-se.','zelf gemaakt.','tworzy się.');
add('Des moments créatifs à imaginer','Creative moments to explore','Momentos creativos por descubrir','Kreative Momente entdecken','Momenti creativi da scoprire','Momentos criativos para descobrir','Creatieve momenten beleven','Kreatywne chwile do odkrycia');
add('Décoration de cupcakes','Cupcake decorating','Decoración de cupcakes','Cupcakes dekorieren','Decorazione cupcake','Decoração de cupcakes','Cupcakes versieren','Dekorowanie babeczek');
add('Initiation au cake design','Introduction to cake design','Iniciación al cake design','Einführung in Cake Design','Introduzione al cake design','Introdução ao cake design','Introductie cake design','Wstęp do dekoracji tortów');
add('Événement en groupe','Group event','Evento de grupo','Gruppenveranstaltung','Evento di gruppo','Evento em grupo','Groepsevenement','Wydarzenie grupowe');
add('Quel atelier vous intéresse ?','Which workshop interests you?','¿Qué taller te interesa?','Welcher Workshop interessiert Sie?','Quale laboratorio ti interessa?','Que workshop lhe interessa?','Welke workshop spreekt je aan?','Które warsztaty cię interesują?');
add('Nombre de participants','Number of participants','Número de participantes','Anzahl der Teilnehmer','Numero di partecipanti','Número de participantes','Aantal deelnemers','Liczba uczestników');
add('Disponibilités et précisions','Availability and details','Disponibilidad y detalles','Verfügbarkeit und Angaben','Disponibilità e dettagli','Disponibilidade e detalhes','Beschikbaarheid en details','Dostępność i szczegóły');
add('Préparer ma demande d’atelier','Prepare my workshop enquiry','Preparar mi solicitud de taller','Workshop-Anfrage vorbereiten','Prepara richiesta laboratorio','Preparar pedido de workshop','Workshopaanvraag voorbereiden','Przygotuj zapytanie o warsztaty');
add("Préparer ma demande d'atelier",'Prepare my workshop enquiry','Preparar mi solicitud de taller','Workshop-Anfrage vorbereiten','Prepara richiesta laboratorio','Preparar pedido de workshop','Workshopaanvraag voorbereiden','Przygotuj zapytanie o warsztaty');
add('Message prêt à transmettre','Message ready to share','Mensaje listo para enviar','Nachricht zum Teilen bereit','Messaggio pronto da condividere','Mensagem pronta a partilhar','Bericht klaar om te delen','Wiadomość gotowa do udostępnienia');
add('Choisissez une ambiance','Choose an atmosphere','Elige un ambiente','Atmosphäre auswählen','Scegli un’atmosfera','Escolha um ambiente','Kies een sfeer','Wybierz atmosferę');
add('Six idées pour faire plaisir','Six gift ideas','Seis ideas para regalar','Sechs Geschenkideen','Sei idee regalo','Seis ideias de presentes','Zes cadeau-ideeën','Sześć pomysłów na prezent');
add('Quel cadeau vous intéresse ?','Which gift interests you?','¿Qué regalo te interesa?','Welches Geschenk interessiert Sie?','Quale regalo ti interessa?','Que presente lhe interessa?','Welk cadeau vind je leuk?','Który prezent cię interesuje?');
add('Carte cadeau','Gift card','Tarjeta regalo','Geschenkkarte','Carta regalo','Cartão-presente','Cadeaubon','Karta podarunkowa');
add('Coffret de douceurs','Sweet treats box','Caja de dulces','Süßigkeitenbox','Scatola di dolci','Caixa de doces','Doos vol lekkers','Pudełko słodkości');
add('Une pause à partager','A break to share','Una pausa para compartir','Eine gemeinsame Pause','Una pausa da condividere','Uma pausa para partilhar','Een moment om te delen','Chwila do dzielenia');
add('La moyenne et tous les avis','Rating and all reviews','Nota media y opiniones','Bewertung und alle Rezensionen','Media e recensioni','Média e avaliações','Gemiddelde en reviews','Średnia i wszystkie opinie');
add('Les vrais avis Google','Real Google reviews','Opiniones reales de Google','Echte Google-Bewertungen','Vere recensioni Google','Avaliações reais do Google','Echte Google-reviews','Prawdziwe opinie Google');
add('Comment s’est passée votre visite ?','How was your visit?','¿Cómo fue tu visita?','Wie war Ihr Besuch?','Com’è andata la visita?','Como foi a sua visita?','Hoe was je bezoek?','Jak minęła wizyta?');
add("Comment s'est passée votre visite ?",'How was your visit?','¿Cómo fue tu visita?','Wie war Ihr Besuch?','Com’è andata la visita?','Como foi a sua visita?','Hoe was je bezoek?','Jak minęła wizyta?');
add('Expérience globale *','Overall experience *','Experiencia general *','Gesamterlebnis *','Esperienza complessiva *','Experiência geral *','Algemene ervaring *','Ogólne wrażenia *');
add('Pâtisseries & boissons','Pastries & drinks','Pasteles y bebidas','Gebäck & Getränke','Dolci e bevande','Doces e bebidas','Gebak en drankjes','Wypieki i napoje');
add('Accueil & service','Welcome & service','Atención y servicio','Empfang & Service','Accoglienza e servizio','Acolhimento e serviço','Ontvangst en service','Obsługa i serwis');
add('Ambiance & décoration','Atmosphere & decor','Ambiente y decoración','Atmosphäre & Dekor','Atmosfera e arredamento','Ambiente e decoração','Sfeer en inrichting','Atmosfera i wystrój');
add('Donner mon avis ★','Write a review ★','Dejar mi opinión ★','Bewertung abgeben ★','Lascia una recensione ★','Deixar avaliação ★','Schrijf een review ★','Dodaj opinię ★');
add('Préparer mon avis ★','Prepare my review ★','Preparar mi opinión ★','Bewertung vorbereiten ★','Prepara la recensione ★','Preparar avaliação ★','Review voorbereiden ★','Przygotuj opinię ★');
add('Copier mon commentaire','Copy my comment','Copiar comentario','Kommentar kopieren','Copia il commento','Copiar comentário','Kopieer mijn reactie','Kopiuj komentarz');
add('Ouvrir Google Maps ↗','Open Google Maps ↗','Abrir Google Maps ↗','Google Maps öffnen ↗','Apri Google Maps ↗','Abrir Google Maps ↗','Open Google Maps ↗','Otwórz Google Maps ↗');
add('Merci pour votre visite ♡','Thank you for visiting ♡','Gracias por tu visita ♡','Danke für Ihren Besuch ♡','Grazie per la visita ♡','Obrigado pela visita ♡','Bedankt voor je bezoek ♡','Dziękujemy za wizytę ♡');

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
