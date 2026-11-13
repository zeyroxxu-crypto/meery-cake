# Meery Cake — V9 Collections & Expérience

**Date :** 13 novembre 2026  
**Site de démonstration :** https://meery-cake.onrender.com/  
**Sauvegarde de V8 :** `sauvegarde-meery-avant-v9-mega-2026-11-13`  
**Branche :** `main`

## Objectif

Faire une grande mise à niveau qualitative du site sans ajouter artificiellement « un million » de fonctions incompatibles. Conserver la palette crème / rose / bordeaux et le menu compact. **Ne pas rétablir la 3D, le carnet gourmand, Click & Collect ni les panneaux de connexion retirés.**

## Nouveautés V9 réalisées

1. **Accueil collection** : trois univers visuels, liens directs vers la catégorie pâtisserie, le brunch et le configurateur, composition photo éditoriale mobile-first.
2. **Une ligne de chiffres** : 51 références du catalogue de démonstration, huit langues offertes, création sur mesure comme parcours.
3. **Vraies catégories cliquables** : accès direct à `carte.html?category=desserts#catalogue`, respectant le filtre existant.
4. **Nouveau tri du catalogue** : ordre initial, alphabétique croissant et décroissant, prix croissant ou décroissant.
5. **Prix non renseignés** : laissés en fin de liste lors du tri par prix. Les prix de la maquette ne sont pas des devis vérifiés.
6. **Réinitialisation des filtres** : remet la recherche, les catégories et l'affichage des favoris à leur état initial.
7. **Meilleur état sans résultats** : explication et action de retour à la carte complète.
8. **Nombre de produits affichés** : compteur qui se met à jour après filtrage et tri.
9. **Compteur de photos** : galerie indiquant le nombre de photographies présentées dans la sélection.
10. **Aide au configurateur** : tutoriel, puces de progression et accès plus lisible.
11. **Date de gâteau** : interdit de sélectionner une date passée dans le formulaire.
12. **Pied de page enrichi** : accès direct au contact du salon.
13. **Progression de lecture** : fine barre de défilement discrète sur l'ensemble du site.
14. **Apparitions progressives** : animations légères sur les nouvelles collections, évitées quand l'utilisateur demande moins de mouvement.
15. **Photos et performance** : chargement différé des images secondaires et décodage asynchrone.
16. **Mobilité** : compositions, grilles et composants adaptés aux petits écrans.
17. **Navigation accessible** : focus visible, boutons utilisables au clavier, gestion du mouvement réduit.
18. **Langues** : ajout d'une trentaine de nouvelles expressions avec leurs traductions en FR, EN, ES, DE, IT, PT, NL, PL ; total actuel de 389 entrées.
19. **Données existantes conservées** : 51 références de menu, 14 photos d'archives référencées, favoris simples, galerie, formulaire de gâteau et autres pages.
20. **Code léger** : aucune bibliothèque 3D, aucune création de compte, pas d'API de paiement, et aucun service commercial non autorisé simulé.

## Limites honnêtes

- Les nouveaux visuels utilisent des **photographies d'archives déjà référencées** sur le site. Certaines peuvent montrer un ancien local et les droits de publication commerciale doivent être confirmés auprès des titulaires.
- Les photos de catégories ne sont **pas des photographies vérifiées de chaque produit**.
- Le nombre de 389 traductions correspond à des entrées du dictionnaire, **pas à 389 phrases différentes exhaustivement traduites sur toutes les pages**. Des textes longs restent en français et requièrent relecture.
- Le système de commande en ligne, le paiement et les réservations automatiques ne sont pas activés.
- Le site est une maquette indépendante non officielle avec `noindex,nofollow`.
- Cette livraison a été vérifiée par contrôle de structure, liens, références CSS/JS et syntaxe JavaScript. Les animations et formulaires demandent encore un contrôle visuel humain dans Safari sur iPhone.

## Fichiers livrés

- `v9-mega.css` : présentation, composants responsive, microanimations.
- `v9-mega.js` : collections, tri, état vide, remise à zéro, compteur photo, guide gâteau, barre de progression.
- `i18n-meery.js` : ajout de libellés traduits.
- 12 pages HTML : nouvelle version des fichiers `?v=9-mega-20261113`.

## Retour arrière

Le snapshot complet avant V9 est disponible sur la branche `sauvegarde-meery-avant-v9-mega-2026-11-13`. Le site principal reste déployé depuis `main`.
