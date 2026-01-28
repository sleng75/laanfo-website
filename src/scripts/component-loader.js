/**
 * Component Loader
 * Charge les composants HTML réutilisables (header, footer, mobile-menu, floating-buttons)
 * et gère l'état actif de la navigation
 *
 * Utilise les imports Vite ?raw pour charger les composants HTML comme des chaînes
 */

// Import des composants HTML comme chaînes brutes (Vite)
import headerHtml from '../components/header.html?raw';
import mobileMenuHtml from '../components/mobile-menu.html?raw';
import footerHtml from '../components/footer.html?raw';
import floatingButtonsHtml from '../components/floating-buttons.html?raw';
import ctaSectionHtml from '../components/cta-section.html?raw';
import pageHeaderHtml from '../components/page-header.html?raw';
import preloaderHtml from '../components/preloader.html?raw';

class ComponentLoader {
  constructor() {
    // Mapping des composants avec leur HTML pré-chargé
    this.components = [
      { name: 'header', selector: '[data-component="header"]', html: headerHtml },
      { name: 'mobile-menu', selector: '[data-component="mobile-menu"]', html: mobileMenuHtml },
      { name: 'footer', selector: '[data-component="footer"]', html: footerHtml },
      { name: 'floating-buttons', selector: '[data-component="floating-buttons"]', html: floatingButtonsHtml },
      { name: 'cta-section', selector: '[data-component="cta-section"]', html: ctaSectionHtml },
      { name: 'page-header', selector: '[data-component="page-header"]', html: pageHeaderHtml },
      { name: 'preloader', selector: '[data-component="preloader"]', html: preloaderHtml }
    ];
    this.currentPage = this.getCurrentPage();
  }

  /**
   * Détermine la page courante basée sur l'URL
   */
  getCurrentPage() {
    const path = window.location.pathname;

    if (path === '/' || path === '/index.html' || path.endsWith('/index.html')) {
      return 'accueil';
    }
    if (path.includes('a-propos')) {
      return 'a-propos';
    }
    if (path.includes('services')) {
      return 'services';
    }
    if (path.includes('actualites')) {
      return 'actualites';
    }
    if (path.includes('contact')) {
      return 'contact';
    }

    return null;
  }

  /**
   * Injecte un composant dans le DOM
   */
  injectComponent(component) {
    const placeholders = document.querySelectorAll(component.selector);
    if (!placeholders.length) return false;

    placeholders.forEach(placeholder => {
      const html = component.html;
      if (!html) return;

      // Créer un élément temporaire pour parser le HTML
      const template = document.createElement('template');
      template.innerHTML = html.trim();
      const content = template.content.firstElementChild;

      // Copier les attributs du placeholder (comme les classes additionnelles)
      const placeholderClasses = placeholder.dataset.classes;
      if (placeholderClasses) {
        content.classList.add(...placeholderClasses.split(' '));
      }

      // Personnaliser le contenu avec les data-attributes du placeholder
      this.customizeContent(content, placeholder);

      // Remplacer le placeholder par le contenu
      placeholder.replaceWith(content);
    });

    return true;
  }

  /**
   * Personnalise le contenu d'un composant avec les data-attributes
   */
  customizeContent(content, placeholder) {
    // Page Header : personnalisation du label, titre, description
    if (placeholder.dataset.label) {
      const labelEl = content.querySelector('[data-page-label]');
      if (labelEl) labelEl.textContent = placeholder.dataset.label;
    }
    if (placeholder.dataset.title) {
      const titleEl = content.querySelector('[data-page-title]');
      if (titleEl) titleEl.textContent = placeholder.dataset.title;
    }
    if (placeholder.dataset.description) {
      const descEl = content.querySelector('[data-page-description]');
      if (descEl) descEl.textContent = placeholder.dataset.description;
    }

    // CTA Section : personnalisation optionnelle
    if (placeholder.dataset.ctaTitle) {
      const titleEl = content.querySelector('.cta-box__title');
      if (titleEl) titleEl.textContent = placeholder.dataset.ctaTitle;
    }
    if (placeholder.dataset.ctaText) {
      const textEl = content.querySelector('.cta-box__text');
      if (textEl) textEl.textContent = placeholder.dataset.ctaText;
    }
  }

  /**
   * Met à jour l'état actif de la navigation
   */
  updateActiveNavigation() {
    if (!this.currentPage) return;

    // Navigation desktop
    document.querySelectorAll('.nav__link[data-nav]').forEach(link => {
      const navId = link.dataset.nav;
      if (navId === this.currentPage) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('is-active');
        link.removeAttribute('aria-current');
      }
    });

    // Navigation mobile
    document.querySelectorAll('.mobile-menu__link[data-nav]').forEach(link => {
      const navId = link.dataset.nav;
      if (navId === this.currentPage) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });
  }

  /**
   * Applique le mode transparent au header si nécessaire
   */
  applyHeaderMode() {
    const header = document.querySelector('.header');
    if (!header) return;

    // Vérifier si la page a un hero (page d'accueil)
    const hasHero = document.querySelector('.hero') !== null;

    if (hasHero) {
      header.classList.add('header--transparent');
    }
  }

  /**
   * Initialise tous les composants
   */
  init() {
    // Injecter tous les composants
    this.components.forEach(component => {
      this.injectComponent(component);
    });

    // Mettre à jour la navigation active
    this.updateActiveNavigation();

    // Appliquer le mode header
    this.applyHeaderMode();

    // Dispatcher un événement pour signaler que les composants sont chargés
    document.dispatchEvent(new CustomEvent('componentsLoaded'));

    return true;
  }
}

// Exporter pour utilisation
export default ComponentLoader;
