# Meery Cake V8 Premium — livraison du 13 novembre 2026

**Site démo :** https://meery-cake.onrender.com  
**Branche déployée :** `main`  
**Sauvegarde exacte avant modifications :** `sauvegarde-meery-avant-v8-premium-2026-11-13`  
**Statut :** démonstration indépendante, non officielle et volontairement non indexée.

## Objectif

Une refonte plus chaleureuse, éditoriale et crédible de la V6. L'identité reste **rose poudré, crème et bordeaux**, sans la 3D retirée à la demande de l'utilisateur. Les cinq onglets principaux et le menu compact sont conservés.

## Livré

- **Accueil** : mise en page plus raffinée, grandes photographies d'archives déjà présentes dans le projet, encart illustré, composition de trois images et textes éditoriaux. Chaque photo d'archive est présentée honnêtement, sans la faire passer pour une photographie vérifiée du local actuel.
- **Carte** : 51 références conservées, cartes visuelles d'ambiance non contractuelles et bouton **« Découvrir ce produit »** qui ouvre un panneau avec catégorie, descriptif, prix si disponible, lien de renseignements et favoris. L'ajout aux favoris utilise le système local existant ; aucun achat n'est envoyé.
- **Galerie** : composition asymétrique et adaptative inspirée des magazines, filtres conservés, photo agrandie avec précédent/suivant, navigation clavier gauche/droite et glissement horizontal sur écran tactile.
- **Configurateur 2D** : huit couleurs suggérées, choix de décoration (fleurs, fruits rouges ou perles sucrées) avec visualisations SVG différentes, barre des étapes et progression. Sur smartphone, la prévisualisation se place **avant le formulaire**, et sur ordinateur dans la colonne latérale. Brouillon local et partage de la demande conservés.
- **Animations** : petites apparitions progressives dans la composition éditoriale, cartes plus fluides, transitions entre pages existantes, aucune nouvelle 3D ou bibliothèque d'effets.
- **Ergonomie mobile** : grille de produits sur une colonne sur petit écran, galerie adaptative, panneaux accessibles, navigation clavier, boutons accessibles et gestion du mouvement réduit.
- **Huit langues** : traductions supplémentaires des nouveaux boutons et textes éditoriaux importants (français, anglais, espagnol, allemand, italien, portugais, néerlandais, polonais). **La traduction de toutes les longues descriptions et pages légales n'est pas terminée** : conserver la distinction entre traduction fonctionnelle des commandes et traduction éditoriale exhaustive.

## Fichiers

- `v8-premium.css` : identité visuelle, galerie magazine, fiches produits, composants de gâteau et breakpoints smartphone.
- `v8-premium.js` : fenêtres de fiches produits, navigation galerie, choix interactifs 2D, entrée douce du contenu.
- `index.html` : nouvelle section éditoriale et composition photographique.
- `v3.js` : boutons de détail du catalogue.
- `v6.js` : SVG amélioré et prévisualisation du gâteau déplacée en tête sur smartphone.
- `i18n-meery.js` : traductions supplémentaires.
- Tous les fichiers HTML chargent les nouvelles ressources V8 avec un identifiant de version anti-cache.

## Points bloquants pour un vrai site commercial

- **Photos** : les images utilisées proviennent de galeries publiques et de sources déjà présentes dans la maquette. Les droits, dates et autorisations doivent être confirmés avant publication commerciale. Les photos d'ambiance des fiches ne sont **pas** des photos certifiées de chaque produit.
- **Carte** : descriptions, prix, ingrédients, disponibilités et allergènes doivent être vérifiés par l'établissement.
- **Réservations** : aucune réservation n'est confirmée automatiquement ; le site prépare une demande à transmettre.
- **Click & Collect** : pas de commande payée, réservée ou enregistrée dans un backend.
- **Administration** : l'éditeur reste une maquette locale, non authentifiée et sans données partagées.
- **Avis Google** : connexion authentifiée du compte Google Business Profile du propriétaire requise.
- **Textes et langues** : les traductions juridiques et certaines longues descriptions nécessitent relecture humaine.

## Vérifications

- Les 15 pages HTML chargent les nouvelles ressources avec version V8.
- Les fichiers JavaScript peuvent être analysés sans erreur de syntaxe, et les 51 produits restent présents.
- Les huit langues du dictionnaire possèdent des correspondances valides pour les clés renseignées ; cela ne signifie pas une couverture intégrale des pages.
- Les six services nécessitant un backend sont toujours indiqués comme non connectés.
- La branche V6 de sauvegarde permet le retour arrière.

**Limite de test :** tests de structure et de syntaxe effectués ; la validation visuelle complète sur un véritable Safari iPhone reste à effectuer. Ne pas annoncer de réservation, achat ou accès administration « opérationnels » avant le raccordement sécurisé et l'accord des propriétaires.
