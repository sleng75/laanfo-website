/**
 * LAANFO C&M - Module Navigation
 *
 * Gère le header et le menu mobile :
 * - Header qui change de style au scroll
 * - Header qui se cache/montre selon la direction du scroll
 * - Menu hamburger pour mobile
 */

import gsap from 'gsap';
import { stopScroll, startScroll } from './smoothScroll.js';

// Variables d'état
let isMenuOpen = false;
let lastScrollY = 0;
let header = null;

/**
 * Initialise la navigation
 */
export function initNavigation() {
  header = document.querySelector('.header');
  const menuToggle = document.querySelector('.header__menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (!header) {
    console.warn('Header non trouvé');
    return;
  }

  // Initialiser le comportement du header au scroll
  initHeaderScroll();

  // Initialiser le menu mobile si présent
  if (menuToggle && mobileMenu) {
    initMobileMenu(menuToggle, mobileMenu);
  }

  // Mettre en évidence le lien actif
  highlightActiveLink();

  // Initialiser le bouton retour en haut
  initBackToTop();

  console.log('✓ Navigation initialisée');
}

/**
 * Gère le comportement du header au scroll
 *
 * Trois comportements :
 * 1. Ajoute une classe quand on scroll (pour le style "scrolled")
 * 2. Cache le header quand on scroll vers le bas, montre quand on remonte
 * 3. Met à jour l'indicateur de progression de lecture
 */
function initHeaderScroll() {
  const SCROLL_THRESHOLD = 50;  // Seuil pour activer le style "scrolled"
  const scrollIndicator = document.querySelector('.header__scroll-indicator');

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // 1. Style "scrolled" (fond, ombre, etc.)
    if (currentScrollY > SCROLL_THRESHOLD) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }

    // 2. Cacher/montrer selon la direction
    if (currentScrollY > lastScrollY && currentScrollY > 300) {
      // Scroll vers le bas → cacher
      header.classList.add('is-hidden');
    } else {
      // Scroll vers le haut → montrer
      header.classList.remove('is-hidden');
    }

    // 3. Mise à jour de l'indicateur de progression
    if (scrollIndicator) {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (currentScrollY / documentHeight) * 100;
      scrollIndicator.style.width = `${Math.min(scrollProgress, 100)}%`;
    }

    lastScrollY = currentScrollY;
  }, { passive: true });  // passive: true améliore les performances
}

/**
 * Initialise le menu mobile
 */
function initMobileMenu(toggle, menu) {
  // Clic sur le bouton hamburger
  toggle.addEventListener('click', () => {
    if (isMenuOpen) {
      closeMenu(toggle, menu);
    } else {
      openMenu(toggle, menu);
    }
  });

  // Fermer avec la touche Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMenu(toggle, menu);
    }
  });

  // Fermer quand on clique sur un lien
  const links = menu.querySelectorAll('.mobile-menu__link');
  links.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu(toggle, menu);
    });
  });
}

/**
 * Ouvre le menu mobile avec animation
 */
function openMenu(toggle, menu) {
  isMenuOpen = true;
  toggle.classList.add('is-active');
  menu.classList.add('is-open');
  document.body.classList.add('menu-open');

  // Bloquer le scroll de la page
  stopScroll();

  // Animation d'ouverture
  gsap.fromTo(
    menu,
    { xPercent: 100 },
    {
      xPercent: 0,
      duration: 0.5,
      ease: 'power3.out',
    }
  );

  // Animation des liens (apparition en cascade)
  const links = menu.querySelectorAll('.mobile-menu__link');
  gsap.fromTo(
    links,
    { x: 50, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.05,
      delay: 0.2,
      ease: 'power2.out',
    }
  );

  // Accessibilité
  toggle.setAttribute('aria-expanded', 'true');
  menu.setAttribute('aria-hidden', 'false');
}

/**
 * Ferme le menu mobile avec animation
 */
function closeMenu(toggle, menu) {
  isMenuOpen = false;
  toggle.classList.remove('is-active');
  document.body.classList.remove('menu-open');

  // Réactiver le scroll
  startScroll();

  // Animation de fermeture
  gsap.to(menu, {
    xPercent: 100,
    duration: 0.4,
    ease: 'power3.in',
    onComplete: () => {
      menu.classList.remove('is-open');
    },
  });

  // Accessibilité
  toggle.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');
}

/**
 * Met en évidence le lien correspondant à la page actuelle
 */
function highlightActiveLink() {
  const currentPath = window.location.pathname;
  const links = document.querySelectorAll('.nav__link, .mobile-menu__link');

  links.forEach((link) => {
    const href = link.getAttribute('href');

    // Vérifier si c'est la page actuelle
    const isActive =
      href === currentPath ||
      (currentPath === '/' && href === '/index.html') ||
      (currentPath.endsWith('/') && href === currentPath + 'index.html') ||
      currentPath.endsWith(href);

    if (isActive) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/**
 * Force la fermeture du menu (utile pour les transitions de page)
 */
export function forceCloseMenu() {
  const toggle = document.querySelector('.header__menu-toggle');
  const menu = document.querySelector('.mobile-menu');

  if (toggle && menu && isMenuOpen) {
    closeMenu(toggle, menu);
  }
}

/**
 * Initialise le bouton retour en haut de page
 */
function initBackToTop() {
  // Support du nouveau bouton flottant et de l'ancien dans le footer
  const backToTopBtn = document.querySelector('[data-back-to-top], .footer__back-to-top');

  if (!backToTopBtn) return;

  // Afficher/masquer le bouton selon le scroll
  const SHOW_THRESHOLD = 500;

  window.addEventListener('scroll', () => {
    if (window.scrollY > SHOW_THRESHOLD) {
      backToTopBtn.classList.add('is-visible');
    } else {
      backToTopBtn.classList.remove('is-visible');
    }
  }, { passive: true });

  // Scroll vers le haut au clic
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

export { isMenuOpen };
