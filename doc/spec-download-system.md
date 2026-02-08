# Spécification – Système de téléchargement & données (JSON-driven)

## 1. Objectif général

Mettre en place un système de téléchargement moderne, dynamique et maintenable,
inspiré de Modrinth, entièrement basé sur des fichiers JSON versionnés avec le site.

Le site est hébergé sur GitHub Pages (site statique).
Aucun backend, aucune base de données dynamique, aucun système de compte.

Toutes les données évoluent uniquement lors des mises à jour du site.

---

## 2. Principe fondamental (data-driven)

- Aucun texte, lien ou version ne doit être écrit en dur dans les pages HTML ou JavaScript
- Toutes les informations proviennent de fichiers JSON
- Les pages sont des templates qui lisent les JSON
- Modifier un JSON modifie automatiquement le site

---

## 3. Organisation des fichiers

### 3.1 Dossiers de données

/data  
├─ mods  
├─ resourcepacks  
└─ modpacks  

Chaque contenu possède un fichier JSON unique.

Exemples :
- /data/mods/emerald-armor.json
- /data/resourcepacks/stitch-pack.json
- /data/modpacks/survival-craft.json

---

## 4. Structure générale d’un fichier JSON

Chaque fichier JSON doit contenir :
- id
- type (mod / resourcepack / modpack)
- textes multilingues
- versions et fichiers téléchargeables
- statuts des versions (alpha / beta / release)
- liens externes (Modrinth / CurseForge)
- liens utilisés par les popups de téléchargement

---

## 5. Textes et traductions

Les traductions sont regroupées dans un seul fichier JSON par contenu.

Exemple :

{
  "texts": {
    "fr": {
      "title": "...",
      "shortDescription": "...",
      "description": "..."
    },
    "en": {
      "title": "...",
      "shortDescription": "...",
      "description": "..."
    }
  }
}

- La langue affichée dépend de la langue active du site
- Ajouter une langue dans le JSON suffit à la rendre disponible
- Aucun changement de code n’est nécessaire pour ajouter une langue

---

## 6. Système de versions

### 6.1 Ordre des versions

- Les versions sont listées de la plus récente à la plus ancienne
- La première version de la liste est toujours la version actuelle
- La dernière version de la liste est la plus ancienne

---

## 7. Gestion automatique des statuts (Alpha / Beta / Release)

Chaque version possède un champ "status" :
- alpha
- beta
- release

### 7.1 Détermination du statut global

Sur les pages de liste (mods, resource packs, modpacks) :

- Le statut affiché pour un contenu est déterminé automatiquement
  à partir de la version la plus récente
- Si la dernière version est :
  - release → contenu affiché comme RELEASE
  - beta → contenu affiché comme BETA
  - alpha → contenu affiché comme ALPHA

Aucun statut ne doit être défini manuellement dans les pages.

---

## 8. Affichage visuel des statuts

Chaque statut est représenté par un indicateur circulaire :

- RELEASE
  - Rond vert
  - Lettre "R"

- BETA
  - Rond orange
  - Lettre "B"

- ALPHA
  - Rond rouge
  - Lettre "A"

Ce système doit être cohérent sur :
- les pages de liste
- les pages de détail
- les popups si nécessaire

---

## 9. Bouton principal "Télécharger"

- Un seul bouton "Télécharger"
- Placé librement, sans bloc ou carte
- Positionné dans la zone supérieure droite de la page
- Présent sur toutes les pages :
  - mods
  - resource packs
  - modpacks

Le bouton n’ouvre pas l’onglet "Téléchargements".
Il ouvre un popup (modal).

---

## 10. Popups de téléchargement

### 10.1 Mods

Popup inspiré de Modrinth :

1. Sélection de la version de Minecraft
2. Sélection du loader (Fabric / Forge / NeoForge / Quilt selon disponibilité)
3. Affichage des fichiers compatibles
4. Téléchargement direct du fichier

Les liens sont lus depuis le JSON.

---

### 10.2 Resource Packs

Popup simplifié :

1. Sélection de la version de Minecraft
2. Affichage des versions disponibles
3. Téléchargement direct

Aucun loader.

---

### 10.3 Modpacks

Popup spécifique :

- Affiche la dernière version disponible
- Contient deux boutons :
  - Bouton vert : Télécharger sur Modrinth
  - Bouton orange : Télécharger sur CurseForge

Les liens proviennent du JSON.
Les liens peuvent être absents (ex : CurseForge non disponible).

---

## 11. Onglet "Téléchargements"

- L’onglet peut rester présent
- Les liens doivent être cohérents avec ceux utilisés dans les popups
- Le bouton principal de la page ouvre toujours le popup

---

## 12. Liens et évolutivité

Tous les liens doivent être stockés dans les fichiers JSON :
- fichiers de téléchargement par version
- liens Modrinth
- liens CurseForge
- liens utilisés dans les popups

Les liens sont évolutifs :
- de nouvelles versions pourront être ajoutées
- de nouveaux liens pourront être ajoutés
- le système doit les prendre en compte automatiquement sans modifier le code

---

## 13. Pages existantes mais non finalisées

Certains contenus (ex : Craft Chain Armor, Moss Armor) :
- possèdent déjà un fichier de page
- mais ne sont pas encore finalisés visuellement

Malgré cela :
- les fichiers JSON doivent être créés
- les pages doivent être entièrement alimentées par les JSON
- aucun contenu ne doit être écrit en dur

---

## 14. Contraintes techniques

- Site statique (GitHub Pages)
- JavaScript uniquement côté client
- Chargement des JSON via fetch()
- Aucun backend
- Aucune base de données dynamique

---

## 15. Objectif final

- Centraliser toutes les données dans les fichiers JSON
- Faciliter la maintenance et les mises à jour
- Obtenir une UX proche de Modrinth
- Rendre le site scalable, propre et maintenable
