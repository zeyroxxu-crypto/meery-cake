# AUDE TP — Refonte V2 (démo)
 
**Lien de démonstration** : https://aude-tp-demo.onrender.com  
**Branche du projet** : `aude-tp-demo` du dépôt `zeyroxxu-crypto/meery-cake`.  
**Sauvegarde avant la V2** : branche `sauvegarde-aude-tp-noir-jaune-v1-2026-11-12`.

## Ce qui est opérationnel

- Page d'accueil responsive noir profond et jaune foncé.
- Six pages métier distinctes : voirie, terrassement, canalisations, VRD, hydraulique, génie civil.
- Galerie à filtres et images agrandissables ; **photos de chantier illustratives**, non présentées comme photographies des travaux de l'entreprise.
- Fiches de références publiques sourcées et filtres par catégorie (page Réalisations).
- Présentation de l'entreprise : fondation en 1999, Bram (11150), 20–49 salariés selon données 2024.
- Formulaire de devis client avec nom, mail, téléphone facultatif, commune, projet, échéance, plans/photos à joindre manuellement, validation explicite : ouverture d'un **e-mail prérempli** dans la messagerie du client. Aucun stockage sur la démo.
- Page de candidature spontanée ; aucune offre active inventée. L'e-mail se prépare dans l'application du candidat.
- Boutons d'appel, itinéraire et demande de devis en version mobile.
- Pages légales et confidentialité en statut de maquette.
- Métadonnées SEO adaptées par page + JSON-LD `GeneralContractor` sur l'accueil.

## À finaliser avec Aude TP pour la mise en ligne officielle

1. **Photographies** : obtenir les clichés originaux (avant/après, équipes, chantiers, matériels) et l'accord de publication des personnes/photographes si nécessaire.
2. **Vérification des projets** : confirmer les formulations, les dates, le statut, les maîtres d'ouvrage et les détails avec la direction.
3. **Devis en envoi direct** : définir le prestataire de formulaire/l'hébergement applicatif et le consentement des données ; le mode mailto actuellement publié fonctionne sans serveur mais ne transmet rien automatiquement.
4. **Recrutement** : valider l'adresse de candidature et les offres réellement ouvertes.
5. **Identité graphique** : valider logo officiel, palette noir `#141414`, jaune foncé `#C69618`.
6. **Légal / RGPD** : vérifier le responsable de publication, responsable de traitement, durées de conservation, politique de confidentialité, et informations de l'hébergeur.
7. **Nom de domaine** : réserver/configurer le domaine officiel par les propriétaires et déployer avec HTTPS.
8. **Référencement Google** : la démo contient `noindex,nofollow` et `robots.txt` bloque l'indexation. Enlever ces restrictions **uniquement au lancement du site officiel** ; actualiser les URLs canoniques, sitemap et fiche Google Business Profile.

## Sources principales

- Annuaire des entreprises (SIREN 424637247) : https://annuaire-entreprises.data.gouv.fr/entreprise/424637247
- Mairie de Bram, coordonnées : https://www.villedebram.fr/economie-locale/commerces-entreprises-services/
- Pappers : https://www.pappers.fr/entreprise/aude-tp-424637247
- Chantier Bram 2026 : https://www.ladepeche.fr/2026/09/15/cette-rue-des-fleurs-a-bram-va-se-parer-dun-nouveau-reseau-dassainissement-de-grands-travaux-qui-vont-perturber-la-circulation-pendant-quatre-mois-13552623.php
- Villeneuve-la-Comptal 2026 : https://www.ladepeche.fr/2026/04/19/eau-et-dassainissement-un-important-chantier-en-cours-13333305.php
- Caux-et-Sauzens 2025 : https://www.macellum.fr/marche/d89b08a665c6279a10cd5afff1912e15874f8acd-marche-subsequent-n-68-commune-caux-sauzens-rue-foyer-renouvellement-reseau-collecte-eaux-usees-d-adduction-en-eau-potable-3eme-tranche-relatif-l-ac-n-22105

## Technique

Site statique HTML/CSS/JS sans dépendances build. `style-v2.css` sert aux pages secondaires ; `index.html` inclut son style principal en ligne. Render publie automatiquement les commits de `aude-tp-demo` depuis la racine du dépôt.
