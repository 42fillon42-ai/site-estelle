# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projet

Site vitrine statique (one-page) du cabinet de psychologie d'Estelle Vasquez Girodet à Saint-Étienne. Déployé sur Netlify : https://estellevasquezgirodetpsy.netlify.app/

## Stack

HTML/CSS/JS vanilla — aucune dépendance, aucun build, aucun gestionnaire de paquets. Quatre fichiers à plat :

- `index.html` — page unique avec ancres (`#accueil`, `#apropos`, `#services`, `#deroulement`, `#contact`)
- `style.css` — styles globaux (~330 lignes), responsive géré en CSS pur
- `script.js` — menu burger mobile + handler `onsubmit` du formulaire de contact
- `logo.jpg` — logo du cabinet

## Développement

Aucune commande de build/test/lint. Pour prévisualiser, ouvrir `index.html` dans un navigateur ou servir le dossier (`python3 -m http.server`).

Le déploiement se fait via Netlify (push du dossier).

## Points d'attention

- Le formulaire de contact (`handleSubmit` dans `script.js`) n'envoie rien — il affiche uniquement un message de confirmation côté client. Toute évolution vers un envoi réel nécessite un backend ou un service tiers (Netlify Forms, Formspree…).
- Les coordonnées du cabinet (téléphone, email, adresse, tarifs) sont en dur dans `index.html` — toute modification métier passe par ce fichier.
- L'iframe Google Maps pointe sur l'adresse réelle du cabinet (1 place Anatole France, 42000 Saint-Étienne).
