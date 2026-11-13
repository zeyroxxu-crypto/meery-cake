# Meery Cake V6 — Livraison et configuration

**Date : 13 novembre 2026** · **Statut : maquette indépendante non officielle, non indexée**.

Site déployé : https://meery-cake.onrender.com
Branche active : `main`.
Sauvegarde avant la V6 : `sauvegarde-meery-avant-v6-2026-11-13`.

## Réellement implémenté

1. **Accueil premium** : typographie plus grande, détails éditoriaux, bandeau de prestations, mise en page et animation respectant le réglage de mouvement du navigateur.
2. **Configurateur avec visualisation** (`gateaux.html`) : aperçu vectoriel SVG réactif aux couleurs, forme ronde/carrée, à l'option étagée, au thème floral et au nombre de parts ; export SVG local. L'illustration ne garantit aucune faisabilité, composition ou prix réel.
3. **Carte en photos d'ambiance** (`carte.html`) : les 51 références ont des cartes visuelles reprenant les archives de Meery Cake regroupées par catégorie. Elles portent la mention obligatoire **« Photo d'ambiance · non contractuelle »** : aucune photo n'est présentée faussement comme étant exactement le produit nommé. Une carte avec 51 photos individuelles authentifiées demande des fichiers et droits confirmés par l'entreprise.
4. **Mobile & animations** : CSS responsive sur tous les parcours, continuité des anciennes transitions, réduction de mouvements compatible, versionnage de ressources pour éviter les anciens fichiers iPhone en cache.
5. **Traductions** : huit langues conservées (FR, EN, ES, DE, IT, PT, NL, PL). Le dictionnaire couvre 314 expressions et libellés contrôlés, dont les principales commandes V6. **Ce n'est pas encore une traduction intégrale** des longues descriptions, FAQ, mentions légales et certains textes dynamiques. Les textes professionnels doivent être traduits et relus avant de revendiquer huit traductions complètes.
6. **Brunch** (`brunch.html`) : alerte claire sur les disponibilités non connectées ; le formulaire prépare un message uniquement.
7. **Click & Collect** (`click-collect.html`) : constitution d'une demande de retrait à partir des favoris locaux, sélection des produits et date préférée, partage/copie du récapitulatif. Aucun paiement, aucune commande passée et aucun stock réservé.
8. **Administration** (`gestion-demo.html`) : avertissement explicite que l'éditeur est un aperçu local, non sécurisé et non relié au site public ; aucune authentification fictive.
9. **Connexions professionnelles** (`integrations.html`) : affichage de six états non connectés, provenant du fichier public `v6-integrations.json`. Ce fichier ne constitue **ni un serveur ni une mesure de sécurité**.

## Services professionnels à développer avant activation

- **Réservations réelles** : le propriétaire doit désigner un système de disponibilités fiable, heures, capacités, règles de réservation, contacts et annulation. Une requête doit être vérifiée côté serveur, avec confirmation réelle.
- **Click & Collect réel** : catalogue et prix à jour, stocks, produits disponibles, conditions de vente, gestion des commandes et processus de confirmation sécurisé côté serveur.
- **Paiement** : prestataire agréé et compte commerçant du propriétaire, redirections ou éléments de paiement du prestataire ; aucun numéro de carte bancaire ne doit transiter dans le site statique.
- **Administration sécurisée** : serveur ou service hébergé, authentification renforcée, autorisations de rôles, base de données, journal de modifications, stockage d'images privé, sauvegardes et politique RGPD. Un fichier JSON public et du JavaScript client ne protègent pas des données privées.
- **Google Business Profile** : accès autorisé par le gestionnaire de la fiche vérifiée, secrets dans la configuration serveur ou GitHub Actions et non dans le code public.

## Avant lancement officiel

Confirmer photos et droits, présence des produits, prix, allergènes, horaires, données légales, politique de confidentialité, vente et réception des demandes. Remplacer les photos d'ambiance par des photos de chaque produit avec leur consentement. Traduire et relire toutes les pages. Faire valider le site par le salon. Ensuite seulement retirer `noindex,nofollow`.

## Tests effectués

- 15 pages HTML présentes, chacune charge les fichiers CSS/JS versionnés V6.
- `v3.js`, `v3-shell.js`, `v4-enhancements.js`, `v6.js`, `i18n-meery.js` : analyse de syntaxe JavaScript valide.
- `v3-data.json`, `v6-integrations.json` : JSON analysable, 51 références conservées, six intégrations signalées déconnectées.
- Render : statut de déploiement confirmé `live`.
- Le site n'a **pas** été testé visuellement dans un vrai Safari iOS lors de cette livraison : un contrôle sur iPhone avec les propriétaires reste nécessaire.

## Fichiers livrés

- `v6.css` : direction artistique et composants responsive
- `v6.js` : studio SVG, accueil enrichi, statuts, préparation de retrait
- `v6-integrations.json` : indicateurs honnêtes de non-connexion
- `click-collect.html` : formulaire de demande sans commande réelle
- `integrations.html` : tableau informatif de connexion
- `i18n-meery.js` : 314 traductions ciblées pour huit langues
- `v3.js` : cartes photographiques de catégorie honnêtement étiquetées

## Important

Un nouveau domaine commercial, des réservations confirmées, un paiement ou une administration sécurisée ne peuvent pas être annoncés comme actifs en l'absence de serveur, d'accord et de comptes professionnels de l'entreprise.
