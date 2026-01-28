# LAANFO C&M - Plan de Développement

## Vue d'ensemble

| Élément | Détail |
|---------|--------|
| **Projet** | Site web vitrine premium LAANFO C&M |
| **Client** | LAANFO Conseil & Management |
| **Stack** | HTML5, CSS3, JavaScript ES6+, Vite |
| **Hébergement** | VPS Hostinger |

---

## Phase 1 : Foundation & Design System

### 1.1 Structure de base ✅ COMPLÉTÉ
- [x] Configuration Vite avec multi-page
- [x] Installation dépendances (GSAP, Lenis, SplitType, Swiper)
- [x] Structure de dossiers
- [x] Variables CSS (couleurs, typographie, espacements)
- [x] Reset CSS et styles de base
- [x] Typographie (Google Fonts)
- [x] Modules JavaScript de base
- [x] Test du build

### 1.2 Composants UI de base ✅ COMPLÉTÉ
- [x] **Buttons** (`_buttons.css`)
  - btn--primary, btn--secondary, btn--outline, btn--ghost
  - Tailles: sm, md, lg
  - États: hover, focus, active, disabled
  - Animation ripple

- [x] **Cards** (`_cards.css`)
  - Card standard avec lift hover
  - Service card avec icône et numéro
  - Value card avec gradient (QSE: quality, safety, environment)
  - Article card
  - Testimonial card

- [x] **Forms** (`_forms.css`)
  - Input avec label flottant
  - Textarea
  - Select custom
  - Checkbox/Radio
  - États de validation

- [x] **Navigation** (`_navigation.css`)
  - Header sticky avec backdrop blur
  - Menu hamburger animé
  - Menu mobile plein écran enrichi (contact, réseaux sociaux, CTA)
  - Underline animé avec dégradé sur liens
  - Indicateur de lien actif (point pulsant)
  - Sous-menu dropdown avec descriptions et icônes
  - Support mega-menu pour Services
  - Indicateur de progression de lecture (scroll indicator)
  - Numérotation des liens mobile

- [x] **Preloader** (`_preloader.css`)
  - Animation du logo SVG avec apparition progressive
  - Cercles lumineux pulsants autour du logo
  - Effet de lueur dorée en arrière-plan
  - Particules décoratives animées
  - Titre et sous-titre animés lettre par lettre
  - Barre de progression avec point lumineux
  - Compteur de pourcentage animé (JavaScript)
  - Texte "Chargement" avec animation de lettres
  - Points de chargement animés
  - Transition de sortie en cascade

- [x] **Footer** (`_footer.css`)
  - Layout en 4 colonnes responsive
  - Logo et description avec certifications
  - Colonnes navigation et services
  - Colonne contact avec icônes
  - Réseaux sociaux avec hover animé
  - Barre de copyright avec liens légaux
  - Bouton retour en haut animé (JavaScript)
  - Effet de lueur décoratif
  - Support Light/Dark mode (variante --light)

### 1.3 Système Light/Dark Mode ✅ COMPLÉTÉ
- [x] **Variables restructurées** (`_variables.css`)
  - Tokens primitifs (couleurs fixes: gold, neutral, qse)
  - Tokens sémantiques (s'adaptent au thème)
  - Définition du mode Light (défaut)
  - Définition du mode Dark
  - Support `prefers-color-scheme` automatique
  - Aliases de compatibilité

- [x] **Module JavaScript** (`theme.js`)
  - `initTheme()` - Initialisation au chargement
  - `toggleTheme()` - Basculer light/dark
  - `setTheme(theme)` - Définir un thème spécifique
  - Persistance localStorage
  - Détection préférence système
  - Mise à jour meta theme-color

- [x] **Composant Toggle** (`_theme-toggle.css`)
  - Bouton avec icônes soleil/lune
  - Animation de transition
  - Variantes: standard, compact, fixe
  - Intégration header

- [x] **Composants mis à jour pour le thème**
  - `_buttons.css` → Tokens sémantiques
  - `_cards.css` → Tokens sémantiques
  - `_forms.css` → Tokens sémantiques + SVG dark mode
  - `_navigation.css` → Tokens sémantiques + intégration toggle
  - `_preloader.css` → Variante adaptive disponible

- [x] **Utilitaires CSS** (`main.css`)
  - Classes bg-primary, bg-secondary, bg-tertiary
  - Classes text-primary, text-secondary, text-accent
  - Classe de transition de thème

---

## Phase 2 : Pages Principales ✅ COMPLÉTÉ

### 2.1 Page Accueil (`index.html`) ✅ COMPLÉTÉ
- [x] Hero Section (titre animé, CTA, scroll indicator)
- [x] Section Valeurs (3 cards: Proximité, Excellence, Passion)
- [x] Section Services Preview (3 services principaux)
- [x] Section Vision (citation parallax)
- [x] Section CTA (composant réutilisable)

### 2.2 Page À Propos (`a-propos.html`) ✅ COMPLÉTÉ
- [x] Hero About (page-header component)
- [x] Section Fondateur (photo, bio, citation)
- [x] Section Mission & Vision
- [x] Section Valeurs détaillées
- [x] Section Timeline/Parcours

### 2.3 Page Services (`services.html`) ✅ COMPLÉTÉ
- [x] Hero Services (page-header component)
- [x] Liste des services (cards avec icônes)
- [x] Section Process (étapes de collaboration)
- [x] Section CTA

### 2.4 Page Actualités (`actualites.html`) ✅ COMPLÉTÉ
- [x] Hero Actualités (page-header component)
- [x] Article à la une (featured)
- [x] Filtres par catégorie
- [x] Grille d'articles (6 articles)
- [x] Pagination
- [x] Section Newsletter
- [x] Section Catégories

### 2.5 Page Contact (`contact.html`) ✅ COMPLÉTÉ
- [x] Hero Contact (page-header component)
- [x] Formulaire complet avec validation
- [x] Formulaire multi-étapes
- [x] Informations de contact
- [x] Section FAQ (accordéon)
- [x] Section Témoignages
- [x] Section Avantages

---

## Phase 3 : Animations & Interactions ✅ COMPLÉTÉ

### 3.1 Animations Globales ✅ COMPLÉTÉ
- [x] Preloader avec animation logo SVG
- [x] **Page transitions premium** (`pageTransitions.js` + `_page-transition.css`)
  - Overlay multi-layers avec effet de vague
  - Logo avec anneaux rotatifs animés
  - Texte de marque avec blur-in
  - Particules décoratives explosives
  - Barre de progression avec dot lumineux
  - Effet de glow radial
  - Support Light/Dark mode
- [x] Scroll progress indicator (barre dorée)

### 3.2 Animations au Scroll ✅ COMPLÉTÉ (Premium)
- [x] **Fade animations**
  - fade-up, fade-down, fade-left, fade-right, fade-in
  - scale-in, rotate-in, blur-in, flip-up, zoom-out
- [x] **Stagger animations**
  - stagger, stagger-left, stagger-right
  - stagger-scale, stagger-rotate, stagger-blur, stagger-flip
- [x] **Split text avec SplitType**
  - split-lines, split-words, split-chars
  - split-chars-rotate, split-chars-scale, split-wave
- [x] **Text effects**
  - text-reveal, text-glitch, typewriter
- [x] **Image animations**
  - image-reveal (enhanced), image-zoom
  - image-clip (circle, diamond, square, diagonal)
- [x] **Parallax animations**
  - data-parallax, data-parallax-bg
  - parallax-rotate, parallax-scale
- [x] **Scroll-linked animations**
  - data-scrub (animations liées au scroll)
  - data-pin (éléments épinglés)
  - data-horizontal-scroll
- [x] Compteurs animés (`data-counter` avec suffix support)

### 3.3 Micro-interactions ✅ COMPLÉTÉ (Premium)
- [x] **Boutons magnétiques** (`data-magnetic`)
  - Support strength personnalisable
  - Animation élastique
- [x] **Cards lift effet** (`data-lift`)
  - Intensités: low, medium, high
  - Shadow dynamique
- [x] **Effet tilt 3D** (`data-tilt`)
  - Perspective personnalisable
  - Scale on hover
  - Animation des enfants
- [x] **Effet glow** (`data-glow`)
  - Lueur dorée au hover
- [x] **Effet ripple** (`data-ripple`)
  - Onde au clic style Material
- [x] **Cursor custom** (`_cursor.css`)
  - Dot + cercle avec mix-blend-mode
  - États: hovering, clicking, text, media, disabled
  - Labels dynamiques
  - Support des rings animés
  - Effet de traînée optionnel
  - Désactivé sur mobile/tactile
- [x] **Marquee** (`data-marquee`)
  - Défilement continu horizontal
- [x] Links underline animé (CSS)

---

## Phase 4 : Responsive & Accessibilité ✅ COMPLÉTÉ

### 4.1 Breakpoints ✅
- Mobile: 320px - 639px
- Tablet: 640px - 1023px
- Desktop: 1024px+
- Extra Large: 1280px+

### 4.2 Tests Responsive ✅ COMPLÉTÉ
- [x] Mobile 320px - 480px
- [x] Tablet portrait 768px
- [x] Tablet landscape 1024px
- [x] Desktop 1280px+
- [x] Typographie fluide avec clamp()

### 4.3 Accessibilité (WCAG 2.1 AA) ✅ COMPLÉTÉ
- [x] **Navigation au clavier** (`_accessibility.css`)
  - Skip links sur toutes les pages
  - Focus-within pour dropdowns
  - Navigation tactile optimisée (44px min)
- [x] **Focus visible**
  - Outline 2px solid doré
  - Box-shadow pour meilleure visibilité
  - Styles spécifiques par type d'élément
- [x] **Attributs ARIA**
  - role="banner/main/contentinfo" sur composants
  - aria-label et aria-labelledby sur sections
  - aria-hidden sur éléments décoratifs
  - aria-pressed sur filtres interactifs
  - aria-modal sur menu mobile
- [x] **Contraste couleurs** (~17:1 ratio)
- [x] **prefers-reduced-motion**
  - Désactivation animations GSAP
  - Scroll behavior auto
  - Transitions de focus conservées
- [x] **prefers-contrast: more**
- [x] **Print styles**

---

## Phase 5 : Optimisation & SEO ✅ COMPLÉTÉ

### 5.1 Performance ✅ COMPLÉTÉ (Core Web Vitals 2026)
- [x] Lazy loading images (loading="lazy")
- [x] Hero image en eager loading avec fetchpriority="high"
- [x] **Vite config optimisée**
  - Terser minification (drop console/debugger)
  - CSS code splitting
  - Cache-busting avec hash
  - Organisation assets par type
  - Code splitting (GSAP, Lenis séparés)
- [x] **Configuration serveur**
  - `.htaccess` Apache (gzip, cache 1 an, sécurité headers)
  - `_headers` Netlify/Vercel (cache immutable)
  - `_redirects` Netlify
- [x] **Preconnect & Preload** (LCP optimization)
  - Preconnect fonts.googleapis.com
  - Preload main.css et logo
  - DNS prefetch analytics

### 5.2 SEO ✅ COMPLÉTÉ (Normes 2026)
- [x] **Meta tags avancés** (toutes les pages)
  - title + meta name="title" (double référencement)
  - description optimisée (150-160 caractères, CTA inclus)
  - robots avec max-image-preview:large, max-snippet:-1
  - googlebot et bingbot spécifiques
  - canonical URL + hreflang
  - theme-color adaptatif (dark/light)
  - Geo tags (geo.region, geo.position, ICBM)
- [x] **PWA Meta tags**
  - mobile-web-app-capable
  - apple-mobile-web-app-capable/status-bar-style/title
  - application-name
  - format-detection telephone
- [x] **Open Graph enrichi** (toutes les pages)
  - og:image:secure_url, og:image:type, og:image:alt
  - og:see_also pour réseaux sociaux
- [x] **Twitter Cards enrichi** (toutes les pages)
  - twitter:site et twitter:creator
  - twitter:image:alt
- [x] **Schema.org JSON-LD complet** (SEO 2026)
  - **WebSite** avec SearchAction (Sitelinks Searchbox)
  - **Organization** enrichi (@id, logo ImageObject, geo, credentials, numberOfEmployees)
  - **ProfessionalService** avec openingHours, aggregateRating, reviews
  - **WebPage** avec Speakable (Voice Search / AI)
  - **BreadcrumbList** sur toutes les pages
  - **FAQPage** sur page d'accueil
  - **AboutPage**, **ContactPage**, **Blog**, **CollectionPage** (pages spécifiques)
- [x] **Sitemap.xml enrichi** (public/)
  - Namespace image:image avec title et caption
  - hreflang pour chaque URL
  - x-default pour langue par défaut
- [x] **Robots.txt optimisé** (public/)
  - Crawl-delay par bot
  - Blocage bots scraping (Ahrefs, Semrush, MJ12)
- [x] **PWA Support**
  - manifest.json complet (icons, shortcuts, screenshots)
  - browserconfig.xml pour Windows/Edge

---

## Phase 6 : Déploiement VPS Hostinger

### 6.1 Configuration serveur
```
OS: Ubuntu 22.04 LTS
Web Server: Nginx
SSL: Let's Encrypt
```

### 6.2 Configuration Nginx
```nginx
server {
    listen 443 ssl http2;
    server_name laanfo-cm.com www.laanfo-cm.com;

    root /var/www/laanfo-cm.com/dist;
    index index.html;

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    # Cache static
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ $uri.html =404;
    }
}
```

### 6.3 Déploiement
```bash
# Sur le VPS
cd /var/www/laanfo-cm.com
git pull origin master
npm ci
npm run build
sudo systemctl reload nginx
```

---

## Commandes utiles

```bash
# Développement
npm run dev

# Build production
npm run build

# Preview build
npm run preview
```

---

## Ressources

- **Cahier des charges** : `../CAHIER_DES_CHARGES_LAANFO_CM.md`
- **Contexte Claude Code** : `CLAUDE.md`
- **Logos** : `src/assets/logo/`
