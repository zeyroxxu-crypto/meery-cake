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


/* Menu categories and frequently seen products */
add('Petit-déjeuner & brunch','Breakfast & brunch','Desayuno y brunch','Frühstück & Brunch','Colazione e brunch','Pequeno-almoço e brunch','Ontbijt en brunch','Śniadanie i brunch');
add('Boissons chaudes','Hot drinks','Bebidas calientes','Heißgetränke','Bevande calde','Bebidas quentes','Warme dranken','Gorące napoje');
add('Boissons fraîches','Cold drinks','Bebidas frías','Kalte Getränke','Bevande fresche','Bebidas frescas','Koude dranken','Zimne napoje');
add('Carte salée','Savoury dishes','Platos salados','Herzhafte Speisen','Piatti salati','Pratos salgados','Hartige gerechten','Dania wytrawne');
add('Pâtisseries & desserts','Pastries & desserts','Pasteles y postres','Gebäck & Desserts','Dolci e dessert','Bolos e sobremesas','Gebak en desserts','Ciasta i desery');
add("Formule P'tit Déj",'Breakfast set','Menú desayuno','Frühstücksangebot','Menù colazione','Menu pequeno-almoço','Ontbijtmenu','Zestaw śniadaniowy');
add('Brunch du dimanche','Sunday brunch','Brunch de domingo','Sonntagsbrunch','Brunch domenicale','Brunch de domingo','Zondagsbrunch','Niedzielny brunch');
add('Brunch gourmand','Gourmet brunch','Brunch gourmet','Genießerbrunch','Brunch goloso','Brunch gourmet','Luxe brunch','Brunch dla smakoszy');
add('Le Classique Anglais','The English classic','El clásico inglés','Der englische Klassiker','Il classico inglese','O clássico inglês','De Engelse klassieker','Angielski klasyk');
add('Menu enfant',"Children's menu",'Menú infantil','Kindermenü','Menù bambini','Menu infantil','Kindermenu','Menu dla dzieci');
add('Expresso','Espresso','Espresso','Espresso','Espresso','Expresso','Espresso','Espresso');
add('Double expresso','Double espresso','Espresso doble','Doppelter Espresso','Espresso doppio','Expresso duplo','Dubbele espresso','Podwójne espresso');
add('Chocolat chaud','Hot chocolate','Chocolate caliente','Heiße Schokolade','Cioccolata calda','Chocolate quente','Warme chocolademelk','Gorąca czekolada');
add('Chocolat viennois','Viennese hot chocolate','Chocolate vienés','Wiener Schokolade','Cioccolata viennese','Chocolate vienense','Weense chocolademelk','Czekolada po wiedeńsku');
add('Chocolat chaud caramel','Caramel hot chocolate','Chocolate caliente con caramelo','Heiße Karamellschokolade','Cioccolata calda al caramello','Chocolate quente com caramelo','Warme karamelchocolade','Gorąca czekolada karmelowa');
add('Chocolat chaud Nutella','Nutella hot chocolate','Chocolate caliente con Nutella','Heiße Nutella-Schokolade','Cioccolata calda alla Nutella','Chocolate quente com Nutella','Warme Nutella-chocolade','Gorąca czekolada z Nutellą');
add('Chocolat chaud tiramisu','Tiramisu hot chocolate','Chocolate caliente tiramisú','Heiße Tiramisu-Schokolade','Cioccolata calda al tiramisù','Chocolate quente tiramisu','Warme tiramisu-chocolade','Gorąca czekolada tiramisu');
add('Thé','Tea','Té','Tee','Tè','Chá','Thee','Herbata');
add('Café crème','Coffee with cream','Café con leche','Milchkaffee','Caffè crema','Café com leite','Koffie verkeerd','Kawa z mlekiem');
add("Jus d'orange pressé",'Fresh orange juice','Zumo de naranja natural','Frisch gepresster Orangensaft','Spremuta d’arancia','Sumo de laranja natural','Vers sinaasappelsap','Świeżo wyciskany sok pomarańczowy');
add('Jus de pamplemousse pressé','Fresh grapefruit juice','Zumo de pomelo natural','Frisch gepresster Grapefruitsaft','Spremuta di pompelmo','Sumo de toranja natural','Vers grapefruitsap','Świeży sok grejpfrutowy');
add('Citronnade maison','Homemade lemonade','Limonada casera','Hausgemachte Limonade','Limonata fatta in casa','Limonada caseira','Huisgemaakte limonade','Domowa lemoniada');
add('Jus de pomme ou ananas','Apple or pineapple juice','Zumo de manzana o piña','Apfel- oder Ananassaft','Succo di mela o ananas','Sumo de maçã ou ananás','Appel- of ananassap','Sok jabłkowy lub ananasowy');
add('Thé glacé maison','Homemade iced tea','Té helado casero','Hausgemachter Eistee','Tè freddo fatto in casa','Chá gelado caseiro','Huisgemaakte ijsthee','Domowa mrożona herbata');
add('Tartine de campagne','Country toast','Tostada rústica','Landbrot-Toast','Toast rustico','Tosta rústica','Boerentoast','Tost wiejski');
add('Croque-monsieur de campagne','Rustic croque-monsieur','Croque-monsieur rústico','Rustikaler Croque Monsieur','Croque monsieur rustico','Croque-monsieur rústico','Rustieke croque monsieur','Wiejski croque monsieur');
add("Tartines d'été",'Summer toasts','Tostadas de verano','Sommerliche Brote','Toast estivi','Tostas de verão','Zomerse toasts','Letnie grzanki');
add('Avocado toast saumon ou féta','Avocado toast with salmon or feta','Tostada de aguacate con salmón o feta','Avocadotoast mit Lachs oder Feta','Toast avocado con salmone o feta','Tosta de abacate com salmão ou feta','Avocadotoast met zalm of feta','Tost z awokado i łososiem lub fetą');
add('Salade de chèvre chaud au miel','Warm goat cheese salad with honey','Ensalada de queso de cabra con miel','Warmer Ziegenkäsesalat mit Honig','Insalata di caprino caldo al miele','Salada de queijo de cabra com mel','Salade met warme geitenkaas en honing','Sałatka z ciepłym kozim serem i miodem');
add('Salade tomates, mozzarella burrata et pesto','Tomato, burrata and pesto salad','Ensalada de tomate, burrata y pesto','Tomaten-Burrata-Salat mit Pesto','Insalata pomodoro, burrata e pesto','Salada de tomate, burrata e pesto','Tomaten-burratasalade met pesto','Sałatka z pomidorami, burratą i pesto');
add('Suggestion du jour','Today’s special','Sugerencia del día','Tagesempfehlung','Suggerimento del giorno','Sugestão do dia','Dagspecial','Danie dnia');
add('Quiche du jour','Quiche of the day','Quiche del día','Quiche des Tages','Quiche del giorno','Quiche do dia','Quiche van de dag','Quiche dnia');
add('Tartine du jour','Toast of the day','Tostada del día','Brot des Tages','Toast del giorno','Tosta do dia','Toast van de dag','Tost dnia');
add('Tartines variées','Assorted toasts','Tostadas variadas','Verschiedene Toasts','Toast assortiti','Tostas variadas','Diverse toasts','Różne grzanki');
add('Banoffee pie','Banoffee pie','Tarta banoffee','Banoffee-Pie','Banoffee pie','Tarte banoffee','Banoffee pie','Ciasto banoffee');
add('Tarte canadienne','Canadian tart','Tarta canadiense','Kanadischer Kuchen','Crostata canadese','Tarte canadiana','Canadese taart','Tarta kanadyjska');
add('Cupcake praliné','Praline cupcake','Cupcake de praliné','Praliné-Cupcake','Cupcake al praliné','Cupcake de praliné','Praliné-cupcake','Babeczka pralinowa');
add('Pancakes moelleux','Fluffy pancakes','Tortitas esponjosas','Fluffige Pancakes','Pancake soffici','Panquecas fofas','Luchtige pancakes','Puszyste placuszki');
add('Mini-pâtisseries maison','Homemade mini pastries','Mini pasteles caseros','Hausgemachtes Kleingebäck','Mini dolci fatti in casa','Mini doces caseiros','Huisgemaakte mini-gebakjes','Domowe mini wypieki');
add('Mini-viennoiseries','Mini breakfast pastries','Mini bollería','Mini-Plundergebäck','Mini brioche','Mini pastelaria','Mini viennoiserie','Mini wypieki śniadaniowe');


/* Essential customer guidance — never misrepresent unconfirmed bookings or payment */
add('Anniversaire, fête ou événement spécial : choisissez vos envies étape par étape. Le salon établira ensuite un tarif et confirmera la faisabilité et la disponibilité. La démonstration ne transmet aucune commande automatiquement.','Birthday, celebration or special occasion: describe your wishes step by step. The tearoom will then confirm feasibility, availability and price. This demo does not send orders automatically.','Cumpleaños, fiesta u ocasión especial: elige tus preferencias paso a paso. El salón confirmará después el precio y la disponibilidad. Esta demo no envía pedidos automáticamente.','Geburtstag, Feier oder besonderer Anlass: Stellen Sie Ihre Wünsche Schritt für Schritt zusammen. Der Teesalon bestätigt anschließend Preis und Verfügbarkeit. Diese Demo sendet keine Bestellungen automatisch.','Compleanno, festa o occasione speciale: scegli i dettagli passo dopo passo. Il locale confermerà fattibilità, disponibilità e prezzo. La demo non invia ordini automaticamente.','Aniversário, festa ou ocasião especial: escolha os detalhes passo a passo. O salão confirmará disponibilidade e preço. Esta demonstração não envia pedidos automaticamente.','Verjaardag, feest of bijzondere gelegenheid: kies stap voor stap je wensen. De tearoom bevestigt daarna prijs en beschikbaarheid. Deze demo verstuurt geen bestellingen automatisch.','Urodziny, święto lub wyjątkowa okazja: określ życzenia krok po kroku. Lokal potwierdzi cenę i dostępność. Demo nie wysyła zamówień automatycznie.');
add("Votre demande est préparée localement. Le fichier d'inspiration, s'il y en a un, devra être joint manuellement au message envoyé au salon.",'Your enquiry is prepared on this device. Any inspiration image must be attached manually when contacting the tearoom.','La solicitud se prepara en este dispositivo. Si tienes una imagen de inspiración, deberás adjuntarla manualmente al mensaje.','Ihre Anfrage wird lokal vorbereitet. Ein Inspirationsbild muss bei der Kontaktaufnahme selbst angehängt werden.','La richiesta viene preparata sul dispositivo. L’immagine di ispirazione va allegata manualmente al messaggio.','O pedido é preparado no dispositivo. Qualquer imagem de inspiração deve ser anexada manualmente.','Je aanvraag wordt lokaal voorbereid. Voeg een eventuele inspiratiefoto zelf aan je bericht toe.','Zapytanie powstaje na urządzeniu. Zdjęcie inspiracji trzeba dołączyć samodzielnie do wiadomości.');
add("La date choisie n'est pas une disponibilité confirmée.",'Your chosen date is not a confirmed availability.','La fecha elegida no indica disponibilidad confirmada.','Der Wunschtermin ist keine bestätigte Verfügbarkeit.','La data scelta non è una disponibilità confermata.','A data escolhida não é uma disponibilidade confirmada.','De gekozen datum is geen bevestigde beschikbaarheid.','Wybrana data nie oznacza potwierdzonej dostępności.');
add("Aucun paiement, aucune commande et aucune disponibilité ne sont validés automatiquement. Le prix reste à établir par Meery Cake.",'No payment, order or availability is confirmed automatically. Meery Cake will provide the price.','No se confirma automáticamente ningún pago, pedido ni disponibilidad. Meery Cake debe establecer el precio.','Zahlung, Bestellung und Verfügbarkeit werden nicht automatisch bestätigt. Den Preis legt Meery Cake fest.','Nessun pagamento, ordine o disponibilità è confermato automaticamente. Il prezzo sarà definito da Meery Cake.','Nenhum pagamento, encomenda ou disponibilidade é confirmado automaticamente. O preço será indicado pelo Meery Cake.','Betaling, bestelling en beschikbaarheid worden niet automatisch bevestigd. Meery Cake bepaalt de prijs.','Płatność, zamówienie ani dostępność nie są potwierdzane automatycznie. Cenę ustali Meery Cake.');
add('Envie de partager une pause gourmande chez Meery Cake ? Préparez une demande avec la date et l\'heure souhaitées. Les jours de brunch, horaires, tarifs et places restent à confirmer auprès du salon.','Fancy a delicious break at Meery Cake? Prepare an enquiry with your preferred date and time. Brunch days, prices and available tables must be confirmed by the tearoom.','¿Te apetece disfrutar de un brunch en Meery Cake? Prepara una solicitud con fecha y hora preferidas. Días, precios y mesas deben confirmarse con el local.','Lust auf eine genussvolle Pause bei Meery Cake? Geben Sie Ihren Wunschtermin an. Brunch-Tage, Preise und freie Plätze bestätigt der Teesalon.','Vuoi una pausa golosa da Meery Cake? Prepara una richiesta con data e ora desiderate. Giorni, prezzi e tavoli sono da confermare al locale.','Apetece-lhe uma pausa no Meery Cake? Prepare um pedido com data e hora preferidas. Dias de brunch, preços e mesas devem ser confirmados pelo salão.','Zin in een brunch bij Meery Cake? Maak een aanvraag met gewenste datum en tijd. Brunchdagen, prijzen en tafels moeten nog bevestigd worden.','Masz ochotę na brunch w Meery Cake? Przygotuj zapytanie z wybraną datą i godziną. Dni, ceny i stoliki musi potwierdzić lokal.');
add("Ce formulaire n'est pas un système de réservation en temps réel et n'envoie aucun message automatiquement. Une réponse du salon est indispensable pour confirmer.",'This is not a live booking system and no message is sent automatically. A reply from the tearoom is required to confirm your booking.','Este formulario no reserva en tiempo real ni envía mensajes automáticamente. La reserva debe confirmarla el local.','Dies ist kein Echtzeit-Buchungssystem; Nachrichten werden nicht automatisch gesendet. Eine Bestätigung durch den Teesalon ist erforderlich.','Questo modulo non prenota in tempo reale e non invia messaggi automaticamente. Serve la conferma del locale.','Este formulário não faz reservas em tempo real nem envia mensagens automaticamente. É necessária a confirmação do salão.','Dit formulier reserveert niet live en verstuurt niets automatisch. De tearoom moet je aanvraag bevestigen.','Formularz nie rezerwuje miejsc na żywo ani nie wysyła automatycznie wiadomości. Konieczne jest potwierdzenie przez lokal.');
add("Les brunchs ne sont pas garantis tous les jours. Aucun acompte n'est demandé ici et aucune réservation n'est confirmée.",'Brunch may not be offered every day. No deposit is requested and no reservation is confirmed here.','El brunch puede no estar disponible todos los días. No se solicita anticipo ni se confirma ninguna reserva.','Brunch wird möglicherweise nicht täglich angeboten. Hier wird keine Anzahlung verlangt und keine Reservierung bestätigt.','Il brunch potrebbe non essere disponibile ogni giorno. Non si richiede un acconto e nessuna prenotazione è confermata.','O brunch pode não estar disponível todos os dias. Não é pedido sinal nem confirmada qualquer reserva.','Brunch is mogelijk niet elke dag beschikbaar. Je betaalt hier niets aan en reserveert nog niet.','Brunch może nie być dostępny codziennie. Nie pobieramy zaliczki ani nie potwierdzamy rezerwacji.');
add('Boissons chaudes, brunch, salé et pâtisseries : explorez les 51 références réunies dans la maquette. Les produits, prix, compositions et allergènes doivent être revérifiés auprès du salon.','Hot drinks, brunch, savoury dishes and pastries: explore 51 menu items in this demo. Products, prices, ingredients and allergens must be confirmed by the tearoom.','Bebidas calientes, brunch, platos salados y pasteles: descubre 51 artículos. Productos, precios, ingredientes y alérgenos deben confirmarse con el local.','Heißgetränke, Brunch, Herzhaftes und Gebäck: Entdecken Sie 51 Produkte. Preise, Zutaten und Allergene müssen im Teesalon bestätigt werden.','Bevande calde, brunch, salati e dolci: scopri 51 prodotti. Prezzi, ingredienti e allergeni devono essere confermati dal locale.','Bebidas quentes, brunch, salgados e doces: conheça 51 opções. Produtos, preços, ingredientes e alergénios devem ser confirmados pelo salão.','Warme dranken, brunch, hartige gerechten en gebak: ontdek 51 items. Producten, prijzen, ingrediënten en allergenen moeten bevestigd worden.','Napoje gorące, brunch, dania wytrawne i wypieki: poznaj 51 pozycji. Produkty, ceny, składniki i alergeny należy potwierdzić w lokalu.');
add("Recherchez un produit par nom ou ingrédient, et enregistrez des favoris dans ce navigateur. Cette sélection ne constitue pas une commande.",'Search by product name or ingredient and save favourites in this browser. Your selection is not an order.','Busca productos por nombre o ingrediente y guarda favoritos en este navegador. La selección no es un pedido.','Suchen Sie nach Produkt oder Zutat und speichern Sie Favoriten im Browser. Die Auswahl ist keine Bestellung.','Cerca per nome o ingrediente e salva i preferiti nel browser. La selezione non è un ordine.','Pesquise por nome ou ingrediente e guarde favoritos no navegador. A seleção não é uma encomenda.','Zoek op product of ingrediënt en bewaar favorieten in je browser. Dit is geen bestelling.','Szukaj po nazwie lub składniku i zapisuj ulubione produkty w przeglądarce. Lista nie jest zamówieniem.');
add("Les favoris restent sur votre appareil. Utilisez-les comme aide-mémoire avant de passer au salon : pas de panier payé ni de disponibilité garantie.",'Favourites stay on your device. Use them as a reminder before visiting: no payment or stock availability is guaranteed.','Los favoritos se guardan en tu dispositivo. Úsalos como recordatorio: no se paga ni se garantiza disponibilidad.','Favoriten bleiben auf Ihrem Gerät. Sie dienen als Merkliste; keine Zahlung oder Verfügbarkeit ist garantiert.','I preferiti restano sul dispositivo. Sono solo un promemoria: nessun pagamento né disponibilità garantita.','Os favoritos ficam no dispositivo. São apenas uma lista: não há pagamento nem disponibilidade garantida.','Favorieten blijven op je apparaat en vormen alleen een lijstje. Geen betaling of gegarandeerde beschikbaarheid.','Ulubione pozycje zostają na urządzeniu i służą jako lista życzeń. Nie gwarantują płatności ani dostępności.');
add('Cupcakes, cake design et ateliers à thème : découvrez les possibilités et préparez une demande d\'information. Les prochains créneaux et tarifs doivent être confirmés auprès du salon.','Cupcake decorating, cake design and themed workshops: explore the possibilities and prepare an enquiry. Upcoming dates and prices must be confirmed by the tearoom.','Cupcakes, decoración de tartas y talleres temáticos: descubre las opciones y prepara una consulta. Fechas y precios deben confirmarse con el local.','Cupcakes, Tortendekoration und Themenworkshops: Entdecken Sie die Möglichkeiten. Termine und Preise bestätigt der Teesalon.','Cupcake, cake design e laboratori a tema: scopri le possibilità. Date e prezzi devono essere confermati dal locale.','Cupcakes, decoração de bolos e workshops temáticos: conheça as opções. Datas e preços devem ser confirmados pelo salão.','Cupcakes, taartdecoratie en themaworkshops: ontdek de mogelijkheden. Data en prijzen moeten door de tearoom bevestigd worden.','Babeczki, dekorowanie tortów i warsztaty tematyczne: sprawdź możliwości. Daty i ceny musi potwierdzić lokal.');
add('Coffrets, gâteaux, ateliers : découvrez des idées de cadeaux et de précommandes à demander au salon. La maquette ne propose aucun achat, paiement ou stock en ligne.','Gift boxes, cakes and workshops: explore gift and preorder ideas to discuss with the tearoom. This demo offers no online purchases, payments or live stock.','Cajas regalo, tartas y talleres: descubre ideas para consultar al local. La demo no permite compras, pagos ni consulta de stock en línea.','Geschenkboxen, Torten und Workshops: Entdecken Sie Ideen für Anfragen. Die Demo bietet keine Käufe, Zahlungen oder Lagerbestände online.','Confezioni, torte e laboratori: scopri idee regalo da chiedere al locale. La demo non offre acquisti, pagamenti o disponibilità online.','Caixas de doces, bolos e workshops: explore ideias de presentes e pré-encomendas. A demo não permite compras nem pagamentos online.','Cadeauboxen, taarten en workshops: ontdek ideeën om aan de tearoom te vragen. Geen online aankopen, betalingen of voorraad in deze demo.','Zestawy słodkości, torty i warsztaty: odkryj pomysły prezentowe. Demo nie obsługuje zakupów, płatności ani stanów magazynowych.');
add('Sélectionnez une catégorie, puis appuyez sur une photo pour l\'agrandir.','Choose a category, then tap a photo to enlarge it.','Elige una categoría y pulsa una foto para ampliarla.','Wählen Sie eine Kategorie und tippen Sie auf ein Foto, um es zu vergrößern.','Scegli una categoria, poi tocca una foto per ingrandirla.','Escolha uma categoria e toque numa foto para ampliar.','Kies een categorie en tik op een foto om te vergroten.','Wybierz kategorię i kliknij zdjęcie, aby je powiększyć.');
add('La préparation ne publie rien : la publication finale s\'effectue sur Google Maps, avec votre compte Google.','Preparing your review does not publish it. You must submit it yourself on Google Maps using your Google account.','Preparar la opinión no la publica. Debes enviarla tú en Google Maps con tu cuenta Google.','Das Vorbereiten veröffentlicht keine Bewertung. Sie müssen sie selbst über Ihr Google-Konto auf Maps absenden.','Preparare la recensione non la pubblica. Devi inviarla tu su Google Maps con il tuo account Google.','Preparar a avaliação não a publica. Deve enviá-la no Google Maps com a sua conta Google.','Je review voorbereiden publiceert niets. Plaats je review zelf op Google Maps met je Google-account.','Przygotowanie opinii jej nie publikuje. Musisz ją samodzielnie wysłać w Google Maps ze swojego konta.');
add('Les avis et la moyenne de Google ne sont pas encore synchronisés. Le propriétaire doit autoriser l\'accès à la fiche Google Business Profile pour que les avis réels et leur moyenne s\'affichent automatiquement ici.','Google reviews and ratings are not synced yet. The owner must authorize Google Business Profile access before genuine reviews and their average can appear here.','Las opiniones y la nota de Google aún no están sincronizadas. El propietario debe autorizar el acceso al perfil de empresa para mostrarlas aquí.','Google-Bewertungen werden noch nicht synchronisiert. Der Inhaber muss den Zugriff auf Google Business Profile genehmigen.','Le recensioni Google non sono ancora sincronizzate. Il proprietario deve autorizzare l’accesso a Google Business Profile.','As avaliações Google ainda não estão sincronizadas. O proprietário deve autorizar o acesso ao Google Business Profile.','Google-reviews zijn nog niet gekoppeld. De eigenaar moet Google Business Profile-toegang goedkeuren.','Opinie Google nie są jeszcze zsynchronizowane. Właściciel musi autoryzować dostęp do Google Business Profile.');


/* Additional homepage, catalogue and wishlist navigation */
add('Une belle histoire à Carcassonne','A lovely story in Carcassonne','Una bonita historia en Carcasona','Eine schöne Geschichte in Carcassonne','Una bella storia a Carcassonne','Uma bela história em Carcassonne','Een mooi verhaal in Carcassonne','Piękna historia w Carcassonne');
add('Une nouvelle page','A new chapter','Un nuevo capítulo','Ein neues Kapitel','Un nuovo capitolo','Um novo capítulo','Een nieuw hoofdstuk','Nowy rozdział');
add('rue Victor Hugo.','on rue Victor Hugo.','en rue Victor Hugo.','in der Rue Victor Hugo.','in rue Victor Hugo.','na rue Victor Hugo.','in de rue Victor Hugo.','przy rue Victor Hugo.');
add('Un nouveau chapitre','A new chapter','Un nuevo capítulo','Ein neues Kapitel','Un nuovo capitolo','Um novo capítulo','Een nieuw hoofdstuk','Nowy rozdział');
add('Découvrir l’adresse ↗','Find our address ↗','Ver dirección ↗','Adresse entdecken ↗','Scopri l’indirizzo ↗','Descobrir a morada ↗','Bekijk het adres ↗','Sprawdź adres ↗');
add('Retrouvez toutes les catégories, les noms des produits, leur description et les prix disponibles. Ajoutez vos coups de cœur à vos favoris.','Browse the categories, products, descriptions and available prices. Save your favourites.','Explora categorías, productos, descripciones y precios disponibles. Guarda tus favoritos.','Entdecken Sie Kategorien, Produkte, Beschreibungen und verfügbare Preise. Speichern Sie Ihre Favoriten.','Esplora categorie, prodotti, descrizioni e prezzi disponibili. Salva i tuoi preferiti.','Explore categorias, produtos, descrições e preços disponíveis. Guarde os seus favoritos.','Bekijk categorieën, producten, beschrijvingen en prijzen. Bewaar je favorieten.','Przeglądaj kategorie, produkty, opisy i dostępne ceny. Zapisuj ulubione.');
add('Prix et disponibilités à confirmer. Les descriptions de produits sont en français ; les allergènes doivent être vérifiés directement auprès de l\'équipe.','Prices and availability must be confirmed. Allergen information must be checked directly with the tearoom.','Precios y disponibilidad por confirmar. Consulta directamente los alérgenos con el local.','Preise und Verfügbarkeit sind zu bestätigen. Allergene bitte direkt beim Personal erfragen.','Prezzi e disponibilità da confermare. Chiedi informazioni sugli allergeni direttamente al locale.','Preços e disponibilidade a confirmar. Consulte os alergénios diretamente com a equipa.','Prijzen en beschikbaarheid zijn onder voorbehoud. Vraag allergenen na bij de tearoom.','Ceny i dostępność wymagają potwierdzenia. O alergeny pytaj bezpośrednio w lokalu.');
add('Voir les 51 produits & mes favoris ↗','Browse all 51 products & favourites ↗','Ver los 51 productos y favoritos ↗','51 Produkte und Favoriten ansehen ↗','Vedi i 51 prodotti e i preferiti ↗','Ver 51 produtos e favoritos ↗','Bekijk alle 51 producten en favorieten ↗','Zobacz 51 produktów i ulubione ↗');
add('Un aperçu du salon et de ses créations, rassemblé à partir de photographies publiques et d\'archives.','A glimpse of the tearoom and its creations, featuring public and archive photographs.','Un vistazo al salón y sus creaciones con fotografías públicas y de archivo.','Ein Blick auf den Teesalon und seine Kreationen mit öffentlichen und Archivfotos.','Uno sguardo alla sala e alle creazioni attraverso fotografie pubbliche e d’archivio.','Um olhar sobre o salão e as criações, com fotografias públicas e de arquivo.','Een kijkje in de tearoom en bij de creaties, met openbare en archieffoto’s.','Spojrzenie na lokal i wypieki dzięki zdjęciom publicznym i archiwalnym.');
add('À vivre chez Meery Cake','Experience Meery Cake','Vive Meery Cake','Meery Cake erleben','Vivi Meery Cake','Viva o Meery Cake','Beleef Meery Cake','Doświadcz Meery Cake');
add('Brunch, ateliers de pâtisserie et idées gourmandes : renseignez-vous sur les prochaines possibilités.','Brunch, baking workshops and sweet ideas: ask about upcoming opportunities.','Brunch, talleres de repostería e ideas dulces: consulta las próximas opciones.','Brunch, Backworkshops und süße Ideen: Fragen Sie nach den nächsten Möglichkeiten.','Brunch, laboratori di pasticceria e idee golose: chiedi le prossime disponibilità.','Brunch, workshops de pastelaria e ideias doces: informe-se sobre as próximas opções.','Brunch, bakworkshops en zoete ideeën: vraag naar de volgende mogelijkheden.','Brunch, warsztaty cukiernicze i słodkie pomysły: zapytaj o terminy.');
add('Et si on prenait le temps ?','What if we took our time?','¿Y si nos tomamos nuestro tiempo?','Wie wäre es mit einer Pause?','E se ci prendessimo il tempo?','E se abrandássemos o ritmo?','Zullen we even de tijd nemen?','A może chwila wytchnienia?');
add('Créez avec gourmandise','Create something sweet','Crea algo dulce','Süßes selbst gestalten','Crea qualcosa di goloso','Crie algo doce','Maak iets lekkers','Twórz słodkości');
add('Des idées à offrir,','Ideas to give,','Ideas para regalar,','Geschenkideen,','Idee da regalare,','Ideias para oferecer,','Ideeën om te geven,','Pomysły na prezent,');
add('sans attendre une occasion.','for any occasion.','sin esperar una ocasión.','auch ohne Anlass.','senza aspettare un’occasione.','sem precisar de ocasião.','ook zomaar.','bez specjalnej okazji.');
add('Une petite attention','A thoughtful gift','Un pequeño detalle','Eine kleine Aufmerksamkeit','Un piccolo pensiero','Um pequeno gesto','Een klein gebaar','Miły upominek');
add('Demander des informations','Request information','Solicitar información','Informationen anfragen','Richiedi informazioni','Pedir informações','Vraag informatie aan','Poproś o informacje');
add('Demande d’informations','Information enquiry','Solicitud de información','Informationsanfrage','Richiesta informazioni','Pedido de informações','Informatieverzoek','Zapytanie o informacje');
add("Demande d'informations",'Information enquiry','Solicitud de información','Informationsanfrage','Richiesta informazioni','Pedido de informações','Informatieverzoek','Zapytanie o informacje');
add('Explorer les idées →','Explore ideas →','Explorar ideas →','Ideen entdecken →','Scopri le idee →','Explorar ideias →','Ontdek ideeën →','Odkryj pomysły →');
add('Une sélection personnelle','Your own selection','Una selección personal','Ihre persönliche Auswahl','Una selezione personale','Uma seleção pessoal','Jouw eigen selectie','Twój własny wybór');
add('Afficher mes favoris ♡','Show my favourites ♡','Mostrar mis favoritos ♡','Favoriten anzeigen ♡','Mostra i preferiti ♡','Mostrar favoritos ♡','Toon mijn favorieten ♡','Pokaż ulubione ♡');
add('Une envie spéciale ?','Something special in mind?','¿Buscas algo especial?','Lust auf etwas Besonderes?','Un desiderio speciale?','Um desejo especial?','Iets bijzonders in gedachten?','Masz wyjątkowe życzenie?');
add('Un gâteau pour votre occasion','A cake for your celebration','Una tarta para tu ocasión','Eine Torte für Ihren Anlass','Una torta per la tua occasione','Um bolo para a sua ocasião','Een taart voor jouw gelegenheid','Tort na twoją okazję');
add('Créer ma demande →','Prepare an enquiry →','Preparar solicitud →','Anfrage erstellen →','Prepara una richiesta →','Preparar pedido →','Stel je aanvraag op →','Przygotuj zapytanie →');
add('Copier ma liste de favoris','Copy my favourites list','Copiar lista de favoritos','Favoritenliste kopieren','Copia i preferiti','Copiar lista de favoritos','Kopieer mijn favorieten','Kopiuj ulubione');
add('Mon carnet','My notebook','Mi lista','Mein Merkzettel','Il mio taccuino','O meu caderno','Mijn notitieboek','Mój notatnik');
add('Votre liste à emporter','Your take-away list','Tu lista para llevar','Ihre Merkliste','La tua lista da portare','A sua lista para levar','Jouw lijst om mee te nemen','Twoja lista');
add('Ma sélection','My selection','Mi selección','Meine Auswahl','La mia selezione','A minha seleção','Mijn selectie','Mój wybór');
add('Vider le carnet','Clear notebook','Vaciar lista','Liste leeren','Svuota il taccuino','Limpar o caderno','Maak lijst leeg','Wyczyść listę');
add('Une petite précision ?','Any extra details?','¿Algún detalle más?','Weitere Angaben?','Qualche dettaglio?','Algum detalhe adicional?','Nog extra informatie?','Dodatkowe szczegóły?');
add('Copier la liste','Copy list','Copiar lista','Liste kopieren','Copia la lista','Copiar lista','Kopieer lijst','Kopiuj listę');
add('Partager','Share','Compartir','Teilen','Condividi','Partilhar','Delen','Udostępnij');
add('Imprimer','Print','Imprimir','Drucken','Stampa','Imprimir','Afdrukken','Drukuj');
add('Pour commencer','Get started','Para empezar','Los geht’s','Per iniziare','Para começar','Om te beginnen','Na początek');
add('Quelques idées gourmandes','A few delicious ideas','Algunas ideas deliciosas','Ein paar leckere Ideen','Qualche idea golosa','Algumas ideias deliciosas','Een paar lekkere ideeën','Kilka smakowitych pomysłów');
add('À découvrir, à partager.','Discover and share.','Descubrir y compartir.','Entdecken und teilen.','Da scoprire e condividere.','Descobrir e partilhar.','Ontdekken en delen.','Odkrywaj i dziel się.');
add('Une sélection qui vous ressemble','Your own sweet selection','Tu propia selección dulce','Ihre persönliche Genussauswahl','La tua selezione golosa','A sua seleção especial','Jouw eigen zoete selectie','Twój własny słodki wybór');
add('Un gâteau pour chaque occasion','A cake for every occasion','Una tarta para cada ocasión','Eine Torte für jeden Anlass','Una torta per ogni occasione','Um bolo para cada ocasião','Een taart voor elke gelegenheid','Tort na każdą okazję');


/* V6: verified demo notices, new cake studio, and Click & Collect interface */
add('Votre création en direct','Your creation live','Tu creación en directo','Ihre Kreation live','La tua creazione dal vivo','A sua criação em direto','Jouw creatie live','Twój projekt na żywo');
add('Aperçu indicatif','Illustrative preview','Vista previa orientativa','Unverbindliche Vorschau','Anteprima indicativa','Pré-visualização ilustrativa','Illustratief voorbeeld','Podgląd poglądowy');
add('Enregistrer l’aperçu ↧','Save preview ↧','Guardar vista previa ↧','Vorschau speichern ↧','Salva anteprima ↧','Guardar pré-visualização ↧','Voorbeeld opslaan ↧','Zapisz podgląd ↧');
add('Forme à discuter','Shape to discuss','Forma por definir','Form noch offen','Forma da definire','Forma por definir','Vorm te bespreken','Kształt do uzgodnienia');
add('Occasion à définir','Occasion to confirm','Ocasión por definir','Anlass noch offen','Occasione da definire','Ocasião por definir','Gelegenheid nog te bepalen','Okazja do ustalenia');
add('Parfum à confirmer','Flavour to confirm','Sabor por confirmar','Geschmack zu bestätigen','Gusto da confermare','Sabor a confirmar','Smaak nog te bevestigen','Smak do potwierdzenia');
add('Créneaux à confirmer par le salon','Times must be confirmed by the tearoom','Horarios pendientes de confirmar','Zeiten müssen vom Teesalon bestätigt werden','Orari da confermare dal locale','Horários a confirmar pelo salão','Tijden moeten door de tearoom worden bevestigd','Terminy musi potwierdzić lokal');
add('Administration de démonstration — aucun accès propriétaire connecté','Demo administration — no owner access connected','Administración de demostración — sin acceso del propietario','Demo-Verwaltung — kein Inhaberzugang verbunden','Amministrazione demo — nessun accesso del titolare','Administração demo — sem acesso do proprietário','Demo-beheer — geen eigenaarstoegang','Panel demo — brak dostępu właściciela');
add('Click & Collect','Click & Collect','Pedido para recoger','Abholung vor Ort','Ritiro in negozio','Recolha na loja','Afhalen','Odbiór osobisty');
add('Click & Collect (demande)','Pickup enquiry','Solicitud de recogida','Abholanfrage','Richiesta di ritiro','Pedido de recolha','Afhaalaanvraag','Zapytanie o odbiór');
add('Vos douceurs,','Your treats,','Tus dulces,','Ihre Leckereien,','Le tue dolcezze,','Os seus doces,','Jouw lekkernijen,','Twoje słodkości,');
add('à emporter.','to take away.','para llevar.','zum Mitnehmen.','da asporto.','para levar.','om mee te nemen.','na wynos.');
add('Ma demande de retrait','My pickup enquiry','Mi solicitud de recogida','Meine Abholanfrage','La mia richiesta di ritiro','O meu pedido de recolha','Mijn afhaalaanvraag','Moje zapytanie o odbiór');
add('Click & Collect non connecté','Online pickup not connected','Recogida online no conectada','Online-Abholung nicht verbunden','Ritiro online non attivo','Recolha online não ligada','Online afhalen niet aangesloten','Odbiór online niepodłączony');
add('Jour souhaité','Preferred day','Día deseado','Wunschtag','Giorno desiderato','Dia pretendido','Gewenste dag','Preferowany dzień');
add('Moment préféré','Preferred time of day','Momento preferido','Bevorzugte Tageszeit','Momento preferito','Período preferido','Gewenst dagdeel','Preferowana pora');
add('Matin','Morning','Mañana','Morgen','Mattina','Manhã','Ochtend','Rano');
add('Midi','Midday','Mediodía','Mittag','Mezzogiorno','Meio-dia','Middag','Południe');
add('Après-midi','Afternoon','Tarde','Nachmittag','Pomeriggio','Tarde','Namiddag','Popołudnie');
add('À définir avec le salon','To arrange with the tearoom','A concretar con el local','Mit dem Teesalon vereinbaren','Da concordare con il locale','A combinar com o salão','Afstemmen met de tearoom','Do ustalenia z lokalem');
add('Préparer mon message de retrait','Prepare my pickup message','Preparar mensaje de recogida','Abholnachricht vorbereiten','Prepara messaggio di ritiro','Preparar mensagem de recolha','Afhaalbericht voorbereiden','Przygotuj wiadomość o odbiorze');
add('Aucun favori sélectionné. Ajoutez des pâtisseries depuis la carte ou le carnet gourmand.','No favourites selected. Add products from the menu or your notebook.','No hay favoritos seleccionados. Añade productos desde la carta o tu lista.','Keine Favoriten ausgewählt. Fügen Sie Produkte aus der Karte oder Merkliste hinzu.','Nessun preferito selezionato. Aggiungi prodotti dal menù o dal taccuino.','Sem favoritos selecionados. Adicione produtos do menu ou da lista.','Geen favorieten geselecteerd. Voeg producten toe via de kaart of je lijst.','Nie wybrano ulubionych. Dodaj produkty z menu lub notatnika.');
add('Connexion aux services','Service connections','Conexiones de servicios','Dienstverbindungen','Connessioni dei servizi','Ligações de serviços','Dienstkoppelingen','Integracje usług');
add('Connexions professionnelles','Professional integrations','Integraciones profesionales','Professionelle Integrationen','Integrazioni professionali','Integrações profissionais','Zakelijke koppelingen','Integracje biznesowe');
add('État des services','Service status','Estado de los servicios','Dienststatus','Stato dei servizi','Estado dos serviços','Status van diensten','Status usług');
add('Ce qui reste à connecter','What still needs connecting','Lo que falta conectar','Noch zu verbindende Dienste','Servizi ancora da collegare','O que falta ligar','Nog te koppelen','Co pozostało do podłączenia');
add('En attente de connexion','Connection pending','Conexión pendiente','Verbindung ausstehend','Connessione in attesa','Ligação pendente','Koppeling in afwachting','Oczekuje na połączenie');
add('Réservations confirmées','Confirmed reservations','Reservas confirmadas','Bestätigte Reservierungen','Prenotazioni confermate','Reservas confirmadas','Bevestigde reserveringen','Potwierdzone rezerwacje');
add('Paiement sécurisé','Secure payment','Pago seguro','Sichere Zahlung','Pagamento sicuro','Pagamento seguro','Veilige betaling','Bezpieczna płatność');
add('Administration sécurisée','Secure administration','Administración segura','Sichere Verwaltung','Amministrazione sicura','Administração segura','Beveiligd beheer','Bezpieczny panel');
add('Avis Google authentiques','Authentic Google reviews','Opiniones auténticas de Google','Echte Google-Bewertungen','Recensioni Google autentiche','Avaliações Google autênticas','Echte Google-reviews','Autentyczne opinie Google');
add('Produits disponibles','Available products','Productos disponibles','Verfügbare Produkte','Prodotti disponibili','Produtos disponíveis','Beschikbare producten','Dostępne produkty');
add('Une mise en service avec le salon','Activation with the tearoom','Activación con el local','Aktivierung mit dem Teesalon','Attivazione con il locale','Ativação com o salão','Activeren met de tearoom','Uruchomienie z lokalem');


/* V7 3D showcase: hand-authored UI translations for every offered language */
add('Expérience 3D ↻','3D experience ↻','Experiencia 3D ↻','3D-Erlebnis ↻','Esperienza 3D ↻','Experiência 3D ↻','3D-ervaring ↻','Doświadczenie 3D ↻');
add('Une expérience à 360° · Meery Cake','A 360° experience · Meery Cake','Una experiencia de 360° · Meery Cake','Ein 360°-Erlebnis · Meery Cake','Un’esperienza a 360° · Meery Cake','Uma experiência a 360° · Meery Cake','Een 360°-ervaring · Meery Cake','Doświadczenie 360° · Meery Cake');
add('La pâtisserie prend','Pastry takes on','La pastelería cobra','Patisserie bekommt','La pasticceria prende','A pastelaria ganha','Patisserie krijgt','Cukiernictwo zyskuje');
add('une nouvelle dimension.','a new dimension.','una nueva dimensión.','eine neue Dimension.','una nuova dimensione.','uma nova dimensão.','een nieuwe dimensie.','nowy wymiar.');
add('Découvrez un gâteau en trois dimensions que vous pouvez faire pivoter du bout des doigts. Changez sa couleur, choisissez ses étages, puis imaginez votre propre création.','Explore a three-dimensional cake you can rotate with your fingertips. Change its colour, choose its tiers and imagine your own creation.','Descubre una tarta en 3D que puedes girar con el dedo. Cambia el color, elige los pisos e imagina tu propia creación.','Entdecken Sie eine dreidimensionale Torte, die Sie mit dem Finger drehen können. Wählen Sie Farben und Etagen.','Scopri una torta tridimensionale da ruotare con le dita. Cambia colore, scegli i piani e immagina la tua creazione.','Descubra um bolo em 3D que pode rodar com o dedo. Mude a cor, escolha os andares e imagine a sua criação.','Ontdek een 3D-taart die je met je vinger kunt draaien. Verander de kleur, kies de lagen en ontwerp je eigen taart.','Odkryj tort 3D, który możesz obracać palcem. Zmień kolor, wybierz piętra i zaprojektuj własny tort.');
add('Une véritable rotation 3D interactive','Real interactive 3D rotation','Rotación 3D interactiva real','Echte interaktive 3D-Drehung','Rotazione 3D davvero interattiva','Rotação 3D verdadeiramente interativa','Echte interactieve 3D-rotatie','Prawdziwy interaktywny obrót 3D');
add('Des coloris doux et des détails gourmands','Soft colours and delicious details','Colores suaves y detalles deliciosos','Sanfte Farben und süße Details','Colori delicati e dettagli golosi','Cores suaves e pormenores deliciosos','Zachte kleuren en heerlijke details','Delikatne kolory i słodkie detale');
add('Un configurateur pour personnaliser votre idée','A designer to customise your idea','Un configurador para personalizar tu idea','Ein Konfigurator für Ihre Idee','Un configuratore per personalizzare la tua idea','Um configurador para personalizar a sua ideia','Een configurator voor jouw idee','Konfigurator Twojego pomysłu');
add('Créer mon gâteau en 3D ↗','Design my 3D cake ↗','Crear mi tarta 3D ↗','Meine 3D-Torte gestalten ↗','Crea la mia torta 3D ↗','Criar o meu bolo 3D ↗','Ontwerp mijn 3D-taart ↗','Zaprojektuj mój tort 3D ↗');
add('Voir les photos du salon','View tearoom photos','Ver fotos del salón','Fotos des Teesalons','Guarda le foto del locale','Ver fotos do salão','Bekijk foto’s van de tearoom','Zobacz zdjęcia lokalu');
add('Meery Cake · Atelier 3D','Meery Cake · 3D studio','Meery Cake · Estudio 3D','Meery Cake · 3D-Studio','Meery Cake · Studio 3D','Meery Cake · Estúdio 3D','Meery Cake · 3D-studio','Meery Cake · Studio 3D');
add('Votre gâteau, vos envies.','Your cake, your way.','Tu tarta, a tu gusto.','Ihre Torte nach Wunsch.','La tua torta, i tuoi gusti.','O seu bolo, ao seu gosto.','Jouw taart, jouw smaak.','Twój tort, Twoje zasady.');
add('Rose poudré','Dusty pink','Rosa empolvado','Altrosa','Rosa cipria','Rosa suave','Oudroze','Pudrowy róż');
add('Chocolat','Chocolate','Chocolate','Schokolade','Cioccolato','Chocolate','Chocolade','Czekolada');
add('Lilas','Lilac','Lila','Flieder','Lilla','Lilás','Lila','Liliowy');
add('Vanille','Vanilla','Vainilla','Vanille','Vaniglia','Baunilha','Vanille','Wanilia');
add('✧ Deux étages','✧ Two tiers','✧ Dos pisos','✧ Zwei Etagen','✧ Due piani','✧ Dois andares','✧ Twee lagen','✧ Dwa piętra');
add('✓ Trois étages','✓ Three tiers','✓ Tres pisos','✓ Drei Etagen','✓ Tre piani','✓ Três andares','✓ Drie lagen','✓ Trzy piętra');
add('Glissez pour faire pivoter le gâteau','Drag to rotate the cake','Desliza para girar la tarta','Zum Drehen ziehen','Trascina per ruotare la torta','Arraste para rodar o bolo','Sleep om de taart te draaien','Przeciągnij, aby obrócić tort');
add('Relâchez pour continuer la rotation','Release to continue rotating','Suelta para seguir girando','Loslassen zum Weiterdrehen','Rilascia per continuare a ruotare','Solte para continuar a rodar','Laat los om verder te draaien','Puść, aby kontynuować obrót');
add('3D interactif','Interactive 3D','3D interactivo','Interaktives 3D','3D interattivo','3D interativo','Interactieve 3D','Interaktywne 3D');
add('Illustration 2D','2D illustration','Ilustración 2D','2D-Illustration','Illustrazione 2D','Ilustração 2D','2D-illustratie','Ilustracja 2D');
add('Simulation graphique originale. Cette création 3D ne représente pas un produit réellement disponible et ne constitue pas une promesse de réalisation.','Original 3D simulation. This model is not an actual available product and does not guarantee that it can be made.','Simulación 3D original. Este modelo no es un producto disponible ni garantiza su fabricación.','Eigene 3D-Simulation. Dieses Modell ist kein verfügbares Produkt und keine Zusage für eine Anfertigung.','Simulazione 3D originale. Il modello non è un prodotto disponibile e non ne garantisce la realizzazione.','Simulação 3D original. Este modelo não é um produto disponível nem garante a sua realização.','Originele 3D-simulatie. Dit model is geen beschikbaar product en garandeert geen uitvoering.','Oryginalna symulacja 3D. Model nie jest dostępnym produktem ani gwarancją wykonania.');

const originalText=new WeakMap(),originalAttr=new WeakMap();
const originalTitle=document.title;
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
 document.title=(dict.get(originalTitle)||[])[langs.indexOf(current)]||originalTitle;
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
