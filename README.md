# Skycast — Frontend météo

Frontend statique en HTML + Tailwind CSS, avec une mise en page responsive Desktop/Mobile.

## Lancer le projet
1. Ouvre `index.html` dans ton navigateur, ou utilise l'extension Live Server de VS Code.
2. Une connexion Internet est nécessaire pour charger Tailwind Browser et la police Google Fonts.

## Ce qui est déjà fait
- Maquette responsive (desktop, tablette et mobile)
- Barre de recherche avec `id="search-form"` et `id="city-input"`
- Zone météo actuelle et identifiants pour les données
- Détails météo, prévisions horaires et prévisions sur 7 jours
- Zones `#loading-message` et `#error-message` prêtes pour JavaScript
- Aucun appel API et aucune logique JavaScript métier inclus

## Repères pour ton JavaScript
Quelques sélecteurs déjà préparés :
- `#search-form`, `#city-input`, `#search-button`
- `#city-name`, `#current-temperature`, `#weather-description`
- `#temperature-max`, `#temperature-min`, `#feels-like`
- `#humidity`, `#wind-speed`, `#uv-index`, `#visibility`
- `#hourly-list`, `#daily-list`
- `#loading-message`, `#error-message`

Les températures et villes visibles sont des exemples statiques : remplace-les avec les données de l'API dans ton JavaScript.

## Tailwind
Le projet utilise le build navigateur de Tailwind CSS v4 pour pouvoir commencer sans configuration npm.
Pour un déploiement en production, il est préférable d'installer Tailwind avec Vite et son plugin officiel.
