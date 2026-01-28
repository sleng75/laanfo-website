import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Base URL pour GitHub Pages (défini via variable d'environnement)
  base: process.env.BASE_URL || '/',

  // Le dossier racine contenant le code source
  root: 'src',

  // Dossier des fichiers statiques (favicon, robots.txt, sitemap.xml)
  publicDir: '../public',

  // Configuration du build de production
  build: {
    // Dossier de sortie pour les fichiers compilés
    outDir: '../dist',
    emptyOutDir: true,

    // Minification avancée avec terser pour JavaScript
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,      // Supprime console.log en production
        drop_debugger: true,     // Supprime debugger
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
      mangle: {
        safari10: true,          // Compatibilité Safari 10
      },
      format: {
        comments: false,         // Supprime les commentaires
      },
    },

    // Optimisation CSS
    cssMinify: true,
    cssCodeSplit: true,          // Sépare le CSS par page

    // Taille limite avant avertissement (en kB)
    chunkSizeWarningLimit: 500,

    // Options Rollup avancées
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        'a-propos': resolve(__dirname, 'src/a-propos.html'),
        'services': resolve(__dirname, 'src/services.html'),
        'contact': resolve(__dirname, 'src/contact.html'),
        'actualites': resolve(__dirname, 'src/actualites.html'),
        'mentions-legales': resolve(__dirname, 'src/mentions-legales.html'),
        'politique-confidentialite': resolve(__dirname, 'src/politique-confidentialite.html'),
      },
      output: {
        // Nommage des fichiers avec hash pour cache-busting
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Organisation des assets par type
          const extType = assetInfo.name.split('.').pop();
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/woff2?|eot|ttf|otf/i.test(extType)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          if (/css/i.test(extType)) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        // Code splitting pour GSAP et autres librairies
        manualChunks: {
          'gsap': ['gsap'],
          'vendor': ['lenis'],
        },
      },
    },

    // Source maps uniquement en développement
    sourcemap: false,

    // Optimisation des assets
    assetsInlineLimit: 4096,     // Inline les fichiers < 4kb en base64
  },

  // Optimisation des dépendances
  optimizeDeps: {
    include: ['gsap', 'lenis'],  // Pré-bundle ces dépendances
  },

  // Serveur de développement
  server: {
    port: 3000,
    open: true,
    // Compression gzip en dev
    middlewareMode: false,
  },

  // Prévisualisation du build
  preview: {
    port: 4173,
  },

  // Raccourcis pour les imports
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@scripts': resolve(__dirname, 'src/scripts'),
      '@assets': resolve(__dirname, 'src/assets'),
    },
  },

  // Configuration esbuild pour une minification rapide du CSS
  esbuild: {
    legalComments: 'none',       // Supprime les commentaires légaux
  },
});
