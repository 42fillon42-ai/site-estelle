# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projet

Site vitrine statique (one-page) du cabinet de psychologie d'Estelle Vasquez Girodet à Saint-Étienne.

- **Production** : https://estellevasquezgirodetpsy.netlify.app/
- **Repo GitHub** : https://github.com/42fillon42-ai/site-estelle
- **Hébergement** : Netlify (déploiement continu depuis GitHub)

## Stack

HTML/CSS/JS vanilla — aucune dépendance, aucun build, aucun gestionnaire de paquets.

- `index.html` — page unique avec ancres (`#accueil`, `#apropos`, `#services`, `#deroulement`, `#contact`)
- `style.css` — styles globaux, responsive géré en CSS pur
- `script.js` — menu burger mobile + handler `onsubmit` du formulaire de contact
- `logo.jpg` — logo du cabinet
- `robots.txt` + `sitemap.xml` — pour le SEO
- Icônes : SVG inline dans `index.html` (line-art, palette teal/olive)
- Carte : iframe OpenStreetMap (pas Google Maps — l'embed Google sans clé est souvent bloqué)

## Développement & déploiement

Aucune commande de build/test/lint. Pour prévisualiser : ouvrir `index.html` dans un navigateur ou `python3 -m http.server`.

**Workflow de déploiement** :
```
modifications locales → git add → git commit → git push origin main
                                                       ↓
                                       Netlify redéploie automatiquement (~1 min)
```

L'authentification GitHub est stockée dans le trousseau macOS (osxkeychain), via un Personal Access Token. Plus besoin de saisir de credentials.

## Points d'attention

- Le formulaire de contact (`handleSubmit` dans `script.js`) **n'envoie rien** — il affiche uniquement un message de confirmation côté client. Toute évolution vers un envoi réel nécessite un backend ou un service tiers (Netlify Forms, Formspree…).
- Les coordonnées (téléphone, email, adresse, tarifs, certifications) sont **en dur** dans `index.html` — toute modification métier passe par ce fichier.
- Le JSON-LD `MedicalBusiness` dans `<head>` doit rester **synchronisé** avec ces coordonnées (adresse, géoloc 45.4397/4.3872, horaires, services, téléphone, email) — sinon Google verra des incohérences.
- Les balises Open Graph et Twitter Card pointent sur `logo.jpg` comme image de partage. Pour un meilleur rendu social, prévoir à terme une image 1200×630 dédiée.
- Le site est enregistré sur Google Search Console (balise de vérification dans `<head>`) avec l'email `42fillon42@gmail.com`.
