# Meery Cake V3 — Dossier de livraison

## Version publiée

- Site : https://meery-cake.onrender.com
- GitHub : zeyroxxu-crypto/meery-cake, branche main
- Sauvegarde V2 : https://github.com/zeyroxxu-crypto/meery-cake/tree/sauvegarde-meery-avant-v3-premium-2026-11-12
- Statut : **maquette indépendante non officielle**, pages marquées `noindex,nofollow`.

## Améliorations réellement développées

- Nouveau thème premium crème / rose poudré / bordeaux, grand accueil immersif, mise en page asymétrique, boutons et animations légères compatibles accessibilité.
- Menu compact à cinq destinations ; sous-menu Découvrir ; navigation mobile fixe et retour en haut.
- 51 références de carte (5 catégories) préservées dans `v3-data.json`, recherche par nom/description, affichage des prix fournis et mention « à confirmer » pour les tarifs manquants.
- Catalogue dédié avec recherche, filtres, favoris persistés localement et copie de la sélection (aucun panier ni stock garanti).
- Galerie filtrable avec agrandissement. 14 photos archivées, les photos de galerie potentiellement filigranées sont masquées ; crédits et droits à confirmer.
- Configurateur de gâteaux en quatre étapes : occasion, parts, date, forme, parfums, couleurs, décorations, photo d’inspiration locale, résumé et partage/copie. Aucun envoi ni confirmation automatique.
- Demande de brunch : date, horaire préféré, personnes, contact et copie de demande ; aucun créneau considéré disponible ni réservé.
- Ateliers : idées de formats, demandes d’information et avertissement sur l’absence de calendrier confirmé.
- Cadeaux et gourmandises : idées de coffrets, cartes cadeaux, ateliers, précommandes et formulaire de demande. Aucun paiement ni vente active.
- Avis Google : page dédiée, carte intégrée, formulaire d’avis à préparer et structure de synchronisation des vrais avis via Google Business Profile (connecteur OAuth en attente d’autorisation). Pas de faux avis.
- SEO préparatoire : balises spécifiques, données structurées LocalBusiness sans fausse note, métadonnées sociales, titres hiérarchisés ; la démo reste non indexée.
- FAQ, mentions légales provisoires, confidentialité ; couleurs, images et interactions adaptées aux téléphones.
- Interface d’administration de **démonstration locale uniquement** : édition du titre, des horaires et de l’information atelier avec aperçu/export JSON. Aucun accès ou backend d’administration partagé.
- Storytelling vérifié : déménagement en septembre 2024 et 1er Prix « Qualité / expérience clients » CCI Aude en 2025, avec liens vers les sources officielles.
- Sécurité de démonstration : pas de collecteur de données personnelles côté serveur, contrôle HTML des formulaires, pas de paiement, secrets Google non exposés.

## Les 100 idées : livrées, prototypées ou conditionnées

Les 100 propositions précédentes ne correspondent **pas** à 100 services fonctionnels en production. Les visuels, la navigation, le catalogue, les favoris, les demandes préparatoires, la galerie, la FAQ et plusieurs éléments de SEO/accessibilité sont livrés. La structure de certaines intégrations est prête mais elles restent désactivées.

### À connecter avec les propriétaires avant le lancement commercial

1. **Photos officielles et droits** : nouvelles photos des locaux actuels, équipe et réalisations ; droits des auteurs/personnes à confirmer. Certains clichés existants montrent l'ancien local.
2. **Carte à jour** : produits vendus aujourd’hui, prix, allergènes fiables, régimes alimentaires, disponibilité et produits saisonniers ; sans ces données, pas de filtres d’allergènes ni de stock.
3. **Coordonnées validées** : e-mail professionnel de réception des demandes, horaires et jours de brunch, programme des ateliers, capacité et conditions de réservation.
4. **Devis/commandes** : une solution serveur privée, protections anti-spam, consentement et un tableau de traitement des demandes. Les formulaires V3 ne font que préparer les messages à copier/partager et appeler le salon.
5. **Réservations confirmées** : calendrier géré par l’entreprise, capacités et règles de modification/annulation, notification en temps réel et stockage privé.
6. **Paiements et ventes** : catalogue validé, prestataire de paiement sécurisé, CGV, remboursement, facturation, gestion des stocks, cartes cadeaux et fidélité.
7. **Google Business Profile** : autorisation OAuth du propriétaire et secrets GitHub pour la synchronisation. Voir `GOOGLE-AVIS-SETUP.md`. Les nouveaux avis Google doivent être publiés par leurs auteurs dans Google Maps.
8. **Administration sécurisée** : authentification, rôles, base de données, historique de changements et publication. `gestion-demo.html` est volontairement une démo non sécurisée et non partagée.
9. **Traductions complètes** : les huit langues sont actives pour la navigation ; les descriptions détaillées de la carte et plusieurs textes éditoriaux restent en français.
10. **Marketing & conformité** : validation des offres, avis autorisés, mesure d’audience et consentement si suivi, mentions légales définitives, conformité RGPD, domaine officiel et SEO indexable après accord.

## Pages

| Page | Rôle |
| --- | --- |
| `index.html` | Accueil, offre, menu, galerie, histoire, distinction CCI, avis et contact |
| `carte.html` | Catalogue, recherche, catégories, favoris |
| `gateaux.html` | Configurateur personnalisé en 4 étapes |
| `brunch.html` | Préparation d’une demande de réservation |
| `ateliers.html` | Informations et demande d’atelier |
| `galerie.html` | Galerie filtrable de photographies authentiques/archives |
| `boutique.html` | Idées de cadeaux, demandes de précommande, sans paiement |
| `avis.html` | Préparation d’avis et connexion Google Business Profile en attente |
| `informations.html` | Questions fréquentes |
| `gestion-demo.html` | Aperçu d’édition local non sécurisé, export JSON |
| `confidentialite.html` | Informations sur le traitement local et tiers |
| `mentions-legales.html` | Mentions provisoires |

## Sources authentifiées

- Déménagement en 2024 : https://www.ladepeche.fr/2024/09/14/le-salon-de-the-meery-cake-demenage-dans-la-rue-victor-hugo-et-sagrandit-12196688.php
- Distinction CCI 2025, catégorie expérience clients : https://www.aude.cci.fr/sites/g/files/mwbcuj1771/files/2025-03/2025-03-06-dossier%20de%20presse-Trophe%CC%81es-Commerce.pdf
- Office de tourisme : https://www.tourisme-carcassonne.fr/restaurant/meery-cake/
- Mairie de Carcassonne : https://www.carcassonne.org/node/24293

## Notes techniques

`v3.css` = design commun, `v3-shell.js` = entête et pied de page, `v3.js` = interactions et fonctionnement local, `v3-data.json` = données du catalogue et photos, `google-avis.json` = flux Google en attente. Le déploiement Render suit automatiquement la branche main et publie les fichiers statiques à la racine du dépôt.
