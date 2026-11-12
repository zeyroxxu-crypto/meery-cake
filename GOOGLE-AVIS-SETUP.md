# Meery Cake — Avis Google intégrés

La page /avis.html affiche Google Maps intégré, un formulaire d'évaluation à cinq étoiles et un espace prévu pour afficher tous les avis de la fiche Google Business Profile lorsque la connexion autorisée est établie.

## État actuel
- Menu simplifié : Accueil, Carte, Découvrir, Avis clients, Contact.
- Carte Google Maps intégrée sur la page.
- Le formulaire prépare un avis, mais le visiteur doit publier lui-même sur Google.
- Le fichier google-avis.json indique connected=false jusqu'à la connexion officielle. Aucune note ni aucun avis inventé.
- La maquette reste non officielle et n'est pas indexée.

## Activer la synchronisation Google Business Profile
1. Le propriétaire ou gestionnaire de la fiche vérifiée Meery Cake autorise un projet Google Cloud approuvé et son client OAuth2 (scope business.manage).
2. Le propriétaire ou son technicien place les cinq secrets suivants dans GitHub, Settings > Secrets and variables > Actions (jamais dans le code ou le chat) : GBP_CLIENT_ID, GBP_CLIENT_SECRET, GBP_REFRESH_TOKEN, GBP_ACCOUNT_ID, GBP_LOCATION_ID.
3. Le workflow Google Reviews - Meery Cake synchronise les avis toutes les six heures, ou via workflow_dispatch une fois autorisé.
4. Le script tools/synchroniser-avis-google.mjs lit les pages de l'API Google Business Profile (50 avis par page), produit un fichier JSON public limité aux informations utiles et Render redéploie automatiquement.
5. Avant publication officielle, le propriétaire valide la politique de confidentialité, les attributions Google et les conditions d'utilisation de l'API.

## Limitations réelles
- Une API Google Places standard renvoie au maximum cinq avis par requête.
- La lecture de tous les avis Google Business Profile exige une fiche vérifiée et l'autorisation OAuth du gestionnaire.
- Le formulaire du site ne peut pas publier les avis des clients dans Google à leur place.
- Sans la connexion autorisée, la page affiche la carte Google mais pas une fausse moyenne ou de faux avis.

## Sources Google
https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/list
https://developers.google.com/my-business/content/review-data
https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places

## Sauvegarde
https://github.com/zeyroxxu-crypto/meery-cake/tree/sauvegarde-meery-avant-menu-avis-v2-2026-11-12
