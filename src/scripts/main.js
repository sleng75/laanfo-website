/**
 * LAANFO C&M - Point d'entrée JavaScript
 *
 * Ce fichier est le "chef d'orchestre" qui :
 * 1. Charge les composants réutilisables (header, footer, etc.)
 * 2. Attend que la page soit chargée
 * 3. Initialise tous les modules dans le bon ordre
 * 4. Gère le preloader (animation de chargement)
 * 5. Initialise le système de thème light/dark
 */

// Import des modules
import ComponentLoader from './component-loader.js';
import { initSmoothScroll } from './modules/smoothScroll.js';
import { initAnimations } from './modules/animations.js';
import { initNavigation } from './modules/navigation.js';
import { initForms } from './modules/forms.js';
import { initMultiStepForms } from './modules/multiStepForm.js';
import { initFaqAccordion } from './modules/faqAccordion.js';
import { initTheme, toggleTheme, setupThemeToggleButtons } from './modules/theme.js';
import { initPageTransitions } from './modules/pageTransitions.js';

/**
 * Application principale
 */
const App = {
  /**
   * Instance du chargeur de composants
   */
  componentLoader: new ComponentLoader(),

  /**
   * Démarre l'application
   */
  init() {
    // Initialiser le thème le plus tôt possible (avant DOMContentLoaded)
    // pour éviter le "flash" de la mauvaise couleur
    initTheme();

    // Vérifier si le DOM est prêt
    if (document.readyState === 'loading') {
      // Le DOM n'est pas encore prêt, attendre
      document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
    } else {
      // Le DOM est déjà prêt
      this.onDOMReady();
    }
  },

  /**
   * Appelé quand le DOM est prêt
   */
  onDOMReady() {
    console.log('🚀 LAANFO C&M - Initialisation...');

    // Charger les composants réutilisables (header, footer, etc.)
    this.loadComponents();

    // Initialiser les modules dans l'ordre
    this.initModules();

    // Configurer les boutons de thème
    this.setupThemeToggle();

    // Gérer le preloader
    this.handlePreloader();

    console.log('✅ LAANFO C&M - Prêt !');
  },

  /**
   * Charge les composants réutilisables
   */
  loadComponents() {
    try {
      this.componentLoader.init();
      console.log('📦 Composants chargés');
    } catch (error) {
      console.error('Erreur lors du chargement des composants:', error);
    }
  },

  /**
   * Initialise tous les modules JavaScript
   */
  initModules() {
    // 1. Smooth scroll (doit être initialisé en premier pour GSAP)
    initSmoothScroll();

    // 2. Animations GSAP et ScrollTrigger
    initAnimations();

    // 3. Navigation (header, menu mobile)
    initNavigation();

    // 4. Formulaires
    initForms();

    // 5. Formulaires multi-étapes
    initMultiStepForms();

    // 6. Accordéon FAQ
    initFaqAccordion();

    // 7. Page transitions
    initPageTransitions();
  },

  /**
   * Configure les boutons de changement de thème
   */
  setupThemeToggle() {
    // Utiliser la fonction du module theme.js qui gère tout
    setupThemeToggleButtons();
  },

  /**
   * Gère le preloader (écran de chargement)
   */
  handlePreloader() {
    const preloader = document.querySelector('.preloader');
    const percentageEl = document.querySelector('.preloader__percentage');

    if (!preloader) {
      // Pas de preloader, retirer la classe is-loading
      document.body.classList.remove('is-loading');
      return;
    }

    // Animation du pourcentage si présent
    if (percentageEl) {
      this.animatePercentage(percentageEl);
    }

    // Attendre que toutes les ressources soient chargées
    window.addEventListener('load', () => {
      // Délai minimum pour voir l'animation complète
      const minLoadTime = 2800; // Correspond à la durée des animations CSS
      const loadTime = performance.now();
      const remainingTime = Math.max(0, minLoadTime - loadTime);

      setTimeout(() => {
        // Ajouter la classe pour animer la sortie
        preloader.classList.add('is-exiting');
        preloader.classList.add('is-hidden');
        document.body.classList.remove('is-loading');

        // Supprimer le preloader du DOM après l'animation
        setTimeout(() => {
          preloader.remove();
        }, 1000);
      }, remainingTime);
    });
  },

  /**
   * Anime le compteur de pourcentage
   */
  animatePercentage(element) {
    let current = 0;
    const duration = 2500; // ms
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing cubic-bezier pour correspondre à la barre de progression
      const easedProgress = this.easeOutQuart(progress);
      current = Math.round(easedProgress * 100);

      element.textContent = `${current}%`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    // Démarrer après le délai initial de l'animation
    setTimeout(() => {
      requestAnimationFrame(animate);
    }, 1300);
  },

  /**
   * Fonction d'easing
   */
  easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
  },
};

// Démarrer l'application
App.init();

// Exporter pour usage externe si nécessaire
export default App;

// Exporter les fonctions de thème pour usage externe
export { toggleTheme };
