/**
 * LAANFO C&M - Module Smooth Scroll
 *
 * Utilise la bibliothèque Lenis pour un défilement fluide
 * et premium sur la page.
 *
 * Lenis remplace le scroll natif du navigateur par un
 * scroll plus doux et contrôlable, similaire aux sites
 * haut de gamme.
 */

import Lenis from 'lenis';

// Variable pour stocker l'instance Lenis
let lenis = null;

/**
 * Initialise le smooth scroll
 * @returns {Lenis} L'instance Lenis créée
 */
export function initSmoothScroll() {
  // Créer l'instance Lenis avec nos options
  lenis = new Lenis({
    // Durée de l'animation (en secondes)
    duration: 1.2,

    // Fonction d'accélération (easing)
    // Cette formule crée un effet "ease-out" fluide
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

    // Direction du scroll
    orientation: 'vertical',

    // Active le smooth scroll sur la molette
    smoothWheel: true,

    // Multiplicateur de vitesse pour le tactile
    touchMultiplier: 2,
  });

  // Boucle d'animation - Lenis doit être mis à jour à chaque frame
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Gestion des liens d'ancrage (ex: href="#section")
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');

      // Ignorer si c'est juste "#"
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        // Scroll vers la cible avec un offset pour le header
        lenis.scrollTo(target, {
          offset: -100,
          duration: 1.5,
        });
      }
    });
  });

  // Rendre Lenis accessible globalement (pour GSAP ScrollTrigger)
  window.lenis = lenis;

  console.log('✓ Smooth scroll initialisé');

  return lenis;
}

/**
 * Stoppe le scroll (utile pour les modales)
 */
export function stopScroll() {
  if (lenis) lenis.stop();
}

/**
 * Reprend le scroll
 */
export function startScroll() {
  if (lenis) lenis.start();
}

/**
 * Scroll vers un élément ou une position
 * @param {string|HTMLElement|number} target - Cible du scroll
 * @param {Object} options - Options de scroll
 */
export function scrollTo(target, options = {}) {
  if (lenis) {
    lenis.scrollTo(target, {
      offset: -100,
      duration: 1.5,
      ...options,
    });
  }
}

// Exporter l'instance pour usage externe
export { lenis };
