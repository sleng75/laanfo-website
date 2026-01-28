/**
 * LAANFO C&M - Module FAQ Accordion
 *
 * Gère les sections FAQ avec accordéon :
 * - Ouverture/fermeture des items
 * - Animation fluide
 * - Accessibilité (ARIA)
 * - Mode exclusif (un seul item ouvert à la fois)
 */

import gsap from 'gsap';

/**
 * Initialise tous les accordéons FAQ
 */
export function initFaqAccordion() {
  const faqGrids = document.querySelectorAll('.faq-grid');

  faqGrids.forEach((grid) => {
    new FaqAccordion(grid);
  });

  if (faqGrids.length > 0) {
    console.log('✓ Accordéons FAQ initialisés');
  }
}

/**
 * Classe FaqAccordion
 * Gère un groupe d'accordéon FAQ
 */
class FaqAccordion {
  constructor(container, options = {}) {
    this.container = container;
    this.items = container.querySelectorAll('.faq-item');
    this.exclusiveMode = options.exclusiveMode !== false; // true par défaut

    this.init();
  }

  init() {
    this.items.forEach((item) => {
      const question = item.querySelector('.faq-item__question');
      const answer = item.querySelector('.faq-item__answer');

      if (!question || !answer) return;

      // Initialiser l'état ARIA
      const isOpen = item.classList.contains('is-open');
      question.setAttribute('aria-expanded', isOpen.toString());

      // Générer un ID unique pour l'answer si nécessaire
      if (!answer.id) {
        answer.id = `faq-answer-${Math.random().toString(36).substr(2, 9)}`;
      }
      question.setAttribute('aria-controls', answer.id);

      // Événement clic
      question.addEventListener('click', () => this.toggleItem(item));

      // Support clavier
      question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleItem(item);
        }
      });
    });
  }

  /**
   * Bascule l'état d'un item
   */
  toggleItem(item) {
    const isOpen = item.classList.contains('is-open');

    if (isOpen) {
      this.closeItem(item);
    } else {
      // Fermer les autres en mode exclusif
      if (this.exclusiveMode) {
        this.items.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains('is-open')) {
            this.closeItem(otherItem);
          }
        });
      }
      this.openItem(item);
    }
  }

  /**
   * Ouvre un item
   */
  openItem(item) {
    const question = item.querySelector('.faq-item__question');
    const answer = item.querySelector('.faq-item__answer');
    const content = answer.querySelector('.faq-item__answer-content');

    item.classList.add('is-open');
    question.setAttribute('aria-expanded', 'true');

    // Animation d'ouverture
    gsap.fromTo(
      content,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
  }

  /**
   * Ferme un item
   */
  closeItem(item) {
    const question = item.querySelector('.faq-item__question');
    const content = item.querySelector('.faq-item__answer-content');

    // Animation de fermeture
    gsap.to(content, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        item.classList.remove('is-open');
        question.setAttribute('aria-expanded', 'false');
      },
    });
  }

  /**
   * Ouvre tous les items
   */
  openAll() {
    this.items.forEach((item) => this.openItem(item));
  }

  /**
   * Ferme tous les items
   */
  closeAll() {
    this.items.forEach((item) => {
      if (item.classList.contains('is-open')) {
        this.closeItem(item);
      }
    });
  }
}

export default FaqAccordion;
