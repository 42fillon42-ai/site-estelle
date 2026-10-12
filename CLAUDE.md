# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projet

Site vitrine statique (one-page) du cabinet de psychologie d'Estelle Vasquez Girodet à Saint-Étienne.

- **Production** : https://estellevasquezgirodetpsy.pages.dev/
- **Repo GitHub** : https://github.com/42fillon42-ai/site-estelle
- **Hébergement** : Cloudflare Pages, projet `estellevasquezgirodetpsy` (déploiement continu depuis GitHub, branche `main`, aucun build, racine servie telle quelle)
- **Ancien hébergement** : Netlify, conservé depuis le 12/10/2026 uniquement comme redirection 301 vers Cloudflare (`netlify.toml`)

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
                                  Cloudflare Pages redéploie automatiquement (~30 s)
```

L'authentification GitHub est stockée dans le trousseau macOS (osxkeychain), via un Personal Access Token. Plus besoin de saisir de credentials.

## Points d'attention

- Le formulaire de contact (`handleSubmit` dans `script.js`) **ne passe par aucun serveur** : il compose un lien `mailto:` vers `estellevasquez42@gmail.com` et laisse la visiteuse envoyer depuis sa propre messagerie. Choix assumé le 12/10/2026 — une demande adressée à une psychologue peut contenir des données de santé, et rien ne doit transiter par un prestataire tiers. Un bloc de repli (adresse en clair + bouton de copie) s'affiche systématiquement après le clic, parce qu'on ne peut pas savoir si la messagerie s'est réellement ouverte. **Ne pas remplacer ça par Formspree ou Web3Forms sans en reparler à Cyrille.**
- Les coordonnées (téléphone, email, adresse, tarifs, certifications) sont **en dur** dans `index.html` — toute modification métier passe par ce fichier.
- Le JSON-LD `MedicalBusiness` dans `<head>` doit rester **synchronisé** avec ces coordonnées (adresse, géoloc 45.4397/4.3872, horaires, services, téléphone, email) — sinon Google verra des incohérences.
- `netlify.toml` porte la redirection 301 de l'ancienne adresse. **Ne jamais la déplacer dans un fichier `_redirects`** : Cloudflare Pages lit ce format lui aussi, et le site se redirigerait en boucle.
- Les balises Open Graph et Twitter Card pointent sur `logo.jpg` comme image de partage. Pour un meilleur rendu social, prévoir à terme une image 1200×630 dédiée.
- Le site est enregistré sur Google Search Console (balise de vérification dans `<head>`) avec l'email `42fillon42@gmail.com`.
