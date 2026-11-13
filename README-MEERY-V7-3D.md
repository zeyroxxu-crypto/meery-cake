# Meery Cake V7 — Expérience 3D et animation premium

**Date :** 13 novembre 2026  
**Statut :** maquette indépendante, non officielle, non indexée.  
**Site :** https://meery-cake.onrender.com  
**Sauvegarde :** branche `sauvegarde-meery-avant-3d-v7-2026-11-13`.

## Nouveau dans la V7

- **Gâteau réellement modélisé en 3D** par projection de maillages et remplissage des faces via Canvas 2D, **sans bibliothèque distante** ni photographie générée. Ce n'est pas une image fixe : l'objet comporte plusieurs volumes, les couleurs et éclairages changent sur les faces et l'on peut tourner autour.
- **Accueil interactif** `index.html#experience-3d` : vue 3D rotative, interaction par glissement, boutons Rose poudré / Chocolat / Lilas / Vanille, et choix gâteau à deux ou trois étages.
- **Studio de gâteaux** `gateaux.html` : option 3D interactive ou illustration 2D ; couleurs, forme réellement carrée ou ronde, nombre d'étages et décors floraux selon les champs du formulaire.
- **Export d'une vue 3D en PNG** depuis la toile locale. En cas de navigateur incompatible, l'aperçu 2D existant reste disponible.
- **Animations et profondeur** : cartes avec légère perspective sur les appareils disposant d'une souris, boutons magnétiques, progression de lecture, ambiance décorative et transitions interpages déjà présentes.
- **Ergonomie** : le gâteau se manipule au doigt et au clavier (flèches), rend uniquement lorsque visible, utilise environ 30 images par seconde au maximum et cesse de tourner si le mouvement est réduit ou désactivé depuis l'interface.
- **Huit langues** : des traductions ciblées pour le nouveau studio et ses commandes sont ajoutées aux traductions déjà présentes. Le reste du site n'est pas intégralement traduit ; les contenus longs demandent toujours une relecture professionnelle.
- **Aucune donnée client envoyée** : la scène 3D n'appelle aucun service distant pour le rendu. L'export PNG est local.

## Délimitations importantes

La scène représente un **modèle graphique original non contractuel**, et non une photographie ou un produit réel de Meery Cake. Aucune disponibilité, matière, taille, tarif ou faisabilité ne peut être déduite de l'aperçu.

Les services professionnels de la V6 restent **non connectés** : réservations réelles, commandes Click & Collect, paiement, espace administrateur authentifié et avis Google synchronisés. Ils réclament les informations et autorisations des propriétaires, une infrastructure sécurisée et des validations juridiques.

## Implémentation

- `v7-3d.js` — maillages 3D, perspective, éclairage, interactions tactiles et clavier, export PNG, effets de profondeur et progression.
- `v7-3d.css` — présentation 3D, responsive, réductions de mouvement et animations.
- `index.html` — nouvelle section immersive 3D.
- `gateaux.html` — 3D montée progressivement à côté du studio 2D existant.
- `i18n-meery.js` — nouvelles traductions V7.
- `v3-shell.js` — accès « Expérience 3D » dans le sous-menu « Découvrir ».
- 15 pages HTML chargent les ressources V7 avec des versions d'URL pour le cache navigateur.

## QA / mise en ligne

La syntaxe JavaScript, les liens locaux, la liste des pages, les traductions et les états de connexion doivent être contrôlés à chaque déploiement. Un test de rendu Canvas par environnement simulé a été exécuté ; il ne remplace **pas** une vérification visuelle sur un vrai Safari iPhone. La publication suit la branche GitHub `main` de Render.

**Retour arrière :** restaurer la branche sauvegardée avant la V7.
