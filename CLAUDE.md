# LAANFO C&M - Contexte Claude Code

## À propos du projet

**Site web vitrine premium** pour LAANFO C&M, cabinet de conseil spécialisé en :
- **QSE** : Qualité, Sécurité, Environnement
- **RSE** : Responsabilité Sociétale des Entreprises

### Informations client
- **Entreprise** : LAANFO Conseil & Management
- **Fondateur** : Abdoul Karim ZERBO
- **Localisation** : Paris, France
- **Site actuel** : https://www.laanfo-cm.com/ (WordPress - à remplacer)

---

## Stack technique

| Catégorie | Technologies |
|-----------|--------------|
| **Structure** | HTML5 sémantique |
| **Styles** | CSS3 (Variables, Grid, Flexbox) |
| **Scripts** | JavaScript ES6+ (Vanilla) |
| **Build** | Vite 6.x |
| **Animations** | GSAP 3.x, ScrollTrigger |
| **Scroll** | Lenis |
| **Texte** | SplitType |
| **Carrousels** | Swiper |

---

## Charte graphique

### Couleurs principales
```css
--color-primary: #d7bfa4;      /* Beige/Or du logo */
--color-secondary: #8C6849;    /* Bronze */
```

### Couleurs QSE/RSE
```css
--color-quality: #D4AF37;      /* Or - Qualité */
--color-safety: #3B82F6;       /* Bleu - Sécurité */
--color-environment: #10B981;  /* Vert - Environnement */
--color-rse: #059669;          /* Vert profond - RSE */
```

### Typographies (Google Fonts)
- **Playfair Display** : Titres hero (display)
- **Cormorant Garamond** : Sous-titres (heading)
- **Inter** : Texte courant (body)
- **Montserrat** : Boutons, labels (accent)

---

## Structure du projet

```
laanfo-website/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   ├── fonts/
│   │   └── logo/
│   ├── styles/
│   │   ├── base/          # Variables, reset, typography
│   │   ├── components/    # Buttons, cards, forms...
│   │   ├── layouts/       # Header, footer, navigation
│   │   └── pages/         # Styles spécifiques par page
│   ├── scripts/
│   │   ├── modules/       # Modules JS séparés
│   │   └── main.js        # Point d'entrée
│   └── *.html             # Pages HTML
├── public/                # Fichiers statiques (favicon, robots.txt)
├── dist/                  # Build de production (généré)
├── CLAUDE.md             # Ce fichier
├── PLAN_DEVELOPPEMENT.md  # Plan détaillé
├── package.json
└── vite.config.js
```

---

## Pages à développer

1. **Accueil** (`index.html`) - Hero, valeurs, services preview, CTA
2. **À Propos** (`a-propos.html`) - Fondateur, histoire, mission/vision
3. **Services** (`services.html`) - 7 services détaillés, processus
4. **Actualités** (`actualites.html`) - Blog, filtres, pagination
5. **Contact** (`contact.html`) - Formulaire, coordonnées

---

## Conventions de code

### CSS
- Variables CSS dans `_variables.css`
- Nommage BEM (Block__Element--Modifier)
- Mobile-first

### JavaScript
- Modules ES6 (import/export)
- Commentaires pour les fonctions complexes

### HTML
- Sémantique (header, main, section, article, footer)
- Attributs ARIA pour l'accessibilité

---

## Commandes

```bash
npm run dev      # Serveur de développement (port 3000)
npm run build    # Build de production
npm run preview  # Prévisualiser le build
```

---

## Ressources

- **Cahier des charges** : `../CAHIER_DES_CHARGES_LAANFO_CM.md`
- **Logos** : `src/assets/logo/`
- **Plan de développement** : `PLAN_DEVELOPPEMENT.md`
