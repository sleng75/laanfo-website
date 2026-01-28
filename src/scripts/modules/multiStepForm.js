/**
 * LAANFO C&M - Module Multi-Step Form
 *
 * Gère les formulaires multi-étapes :
 * - Navigation entre les étapes
 * - Validation par étape
 * - Indicateur de progression
 * - Animation des transitions
 */

import gsap from 'gsap';

/**
 * Initialise tous les formulaires multi-étapes
 */
export function initMultiStepForms() {
  const forms = document.querySelectorAll('[data-multi-step]');

  forms.forEach((form) => {
    new MultiStepForm(form);
  });

  if (forms.length > 0) {
    console.log('✓ Formulaires multi-étapes initialisés');
  }
}

/**
 * Classe MultiStepForm
 * Gère un formulaire multi-étapes individuel
 */
class MultiStepForm {
  constructor(form) {
    this.form = form;
    this.steps = form.querySelectorAll('.form-step');
    this.progressSteps = form.closest('.contact-form-card')?.querySelectorAll('.form-progress__step') || [];
    this.progressLines = form.closest('.contact-form-card')?.querySelectorAll('.form-progress__line') || [];
    this.currentStep = 1;
    this.totalSteps = this.steps.length;

    this.init();
  }

  init() {
    // Boutons de navigation
    this.form.querySelectorAll('[data-next-step]').forEach((btn) => {
      btn.addEventListener('click', () => this.nextStep());
    });

    this.form.querySelectorAll('[data-prev-step]').forEach((btn) => {
      btn.addEventListener('click', () => this.prevStep());
    });

    // Bouton reset
    this.form.querySelectorAll('[data-reset-form]').forEach((btn) => {
      btn.addEventListener('click', () => this.resetForm());
    });

    // Gestion de la soumission
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Labels flottants pour ce formulaire
    this.initFloatingLabels();

    // État initial
    this.updateProgressIndicator();
  }

  /**
   * Passe à l'étape suivante
   */
  nextStep() {
    // Valider l'étape actuelle
    if (!this.validateCurrentStep()) {
      this.shakeCurrentStep();
      return;
    }

    if (this.currentStep < this.totalSteps) {
      this.goToStep(this.currentStep + 1);
    }
  }

  /**
   * Retourne à l'étape précédente
   */
  prevStep() {
    if (this.currentStep > 1) {
      this.goToStep(this.currentStep - 1);
    }
  }

  /**
   * Va à une étape spécifique
   */
  goToStep(stepNumber) {
    // Masquer l'étape actuelle
    const currentStepEl = this.form.querySelector(`.form-step[data-step="${this.currentStep}"]`);
    const nextStepEl = this.form.querySelector(`.form-step[data-step="${stepNumber}"]`);

    if (!currentStepEl || !nextStepEl) return;

    // Animation de sortie
    gsap.to(currentStepEl, {
      opacity: 0,
      x: stepNumber > this.currentStep ? -20 : 20,
      duration: 0.2,
      onComplete: () => {
        currentStepEl.classList.remove('is-active');

        // Animation d'entrée
        nextStepEl.classList.add('is-active');
        gsap.fromTo(
          nextStepEl,
          { opacity: 0, x: stepNumber > this.currentStep ? 20 : -20 },
          { opacity: 1, x: 0, duration: 0.3 }
        );

        // Focus sur le premier input de la nouvelle étape
        const firstInput = nextStepEl.querySelector('input, textarea, select');
        if (firstInput) {
          setTimeout(() => firstInput.focus(), 100);
        }
      },
    });

    this.currentStep = stepNumber;
    this.updateProgressIndicator();
  }

  /**
   * Met à jour l'indicateur de progression
   */
  updateProgressIndicator() {
    this.progressSteps.forEach((step, index) => {
      const stepNumber = index + 1;

      step.classList.remove('is-active', 'is-completed');

      if (stepNumber < this.currentStep) {
        step.classList.add('is-completed');
      } else if (stepNumber === this.currentStep) {
        step.classList.add('is-active');
      }
    });

    // Lignes de progression
    this.progressLines.forEach((line, index) => {
      const stepNumber = index + 1;
      if (stepNumber < this.currentStep) {
        line.style.backgroundColor = 'var(--color-success)';
      } else {
        line.style.backgroundColor = 'var(--border-primary)';
      }
    });
  }

  /**
   * Valide l'étape actuelle
   */
  validateCurrentStep() {
    const currentStepEl = this.form.querySelector(`.form-step[data-step="${this.currentStep}"]`);
    if (!currentStepEl) return true;

    const inputs = currentStepEl.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    // Pour l'étape 2 (radio buttons), vérifier qu'un est sélectionné
    if (this.currentStep === 2) {
      const radioGroup = currentStepEl.querySelector('.form-radio-group');
      if (radioGroup) {
        const checkedRadio = radioGroup.querySelector('input[type="radio"]:checked');
        if (!checkedRadio) {
          isValid = false;
          const errorEl = currentStepEl.querySelector('.form-error');
          if (errorEl) {
            errorEl.textContent = 'Veuillez sélectionner une option';
            gsap.fromTo(errorEl, { opacity: 0 }, { opacity: 1, duration: 0.3 });
          }
        }
      }
    }

    return isValid;
  }

  /**
   * Valide un champ individuel
   */
  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    const wrapper = field.closest('.form-group');
    const errorElement = wrapper?.querySelector('.form-error');

    let isValid = true;
    let errorMessage = '';

    // Réinitialiser
    field.classList.remove('is-invalid', 'is-valid');

    // Champ requis
    if (required && !value) {
      isValid = false;
      errorMessage = 'Ce champ est requis';
    }

    // Format email
    if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Veuillez entrer une adresse email valide';
      }
    }

    // Format téléphone
    if (type === 'tel' && value) {
      const phoneRegex = /^[\d\s+()-]{10,}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = 'Veuillez entrer un numéro valide';
      }
    }

    // Checkbox requis
    if (type === 'checkbox' && required && !field.checked) {
      isValid = false;
      errorMessage = 'Vous devez accepter pour continuer';
    }

    // Appliquer le résultat
    if (!isValid) {
      field.classList.add('is-invalid');
      if (errorElement) {
        errorElement.textContent = errorMessage;
        gsap.fromTo(errorElement, { opacity: 0, y: -5 }, { opacity: 1, y: 0, duration: 0.3 });
      }
    } else if (value || (type === 'checkbox' && field.checked)) {
      field.classList.add('is-valid');
      if (errorElement) {
        errorElement.textContent = '';
      }
    }

    return isValid;
  }

  /**
   * Animation de secousse
   */
  shakeCurrentStep() {
    const currentStepEl = this.form.querySelector(`.form-step[data-step="${this.currentStep}"]`);
    if (currentStepEl) {
      gsap.to(currentStepEl, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.4,
        ease: 'power2.inOut',
      });
    }
  }

  /**
   * Gère la soumission du formulaire
   */
  async handleSubmit(e) {
    e.preventDefault();

    // Valider la dernière étape
    if (!this.validateCurrentStep()) {
      this.shakeCurrentStep();
      return;
    }

    const submitBtn = this.form.querySelector('[type="submit"]');

    try {
      // État de chargement
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('is-loading');
      }

      // Collecter les données
      const formData = new FormData(this.form);
      const data = Object.fromEntries(formData.entries());

      // Anti-spam honeypot
      if (data._gotcha) {
        console.warn('Spam detected');
        return;
      }

      // Simuler un envoi (à remplacer par l'appel API réel)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Données du formulaire:', data);

      // Succès
      this.showSuccess();

    } catch (error) {
      console.error('Erreur de soumission:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('is-loading');
      }
    }
  }

  /**
   * Affiche le message de succès
   */
  showSuccess() {
    // Masquer toutes les étapes
    this.steps.forEach((step) => {
      step.classList.remove('is-active');
      step.style.display = 'none';
    });

    // Masquer l'indicateur de progression
    const progressEl = this.form.closest('.contact-form-card')?.querySelector('.form-progress');
    if (progressEl) {
      gsap.to(progressEl, { opacity: 0, height: 0, duration: 0.3 });
    }

    // Afficher le message de succès
    const successEl = this.form.querySelector('.form-success');
    if (successEl) {
      successEl.hidden = false;
      gsap.fromTo(
        successEl,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    }
  }

  /**
   * Réinitialise le formulaire
   */
  resetForm() {
    // Reset le formulaire HTML
    this.form.reset();

    // Masquer le succès
    const successEl = this.form.querySelector('.form-success');
    if (successEl) {
      successEl.hidden = true;
    }

    // Réafficher les étapes
    this.steps.forEach((step, index) => {
      step.style.display = '';
      step.classList.toggle('is-active', index === 0);
    });

    // Réafficher l'indicateur de progression
    const progressEl = this.form.closest('.contact-form-card')?.querySelector('.form-progress');
    if (progressEl) {
      gsap.to(progressEl, { opacity: 1, height: 'auto', duration: 0.3 });
    }

    // Reset l'état
    this.currentStep = 1;
    this.updateProgressIndicator();

    // Reset les classes de validation
    this.form.querySelectorAll('.is-valid, .is-invalid').forEach((el) => {
      el.classList.remove('is-valid', 'is-invalid');
    });

    // Reset les labels flottants
    this.form.querySelectorAll('.form-group').forEach((group) => {
      group.classList.remove('has-value', 'is-focused');
    });
  }

  /**
   * Initialise les labels flottants
   */
  initFloatingLabels() {
    const floatingGroups = this.form.querySelectorAll('.form-group--floating');

    floatingGroups.forEach((group) => {
      const input = group.querySelector('input, textarea');
      if (!input) return;

      // État initial
      if (input.value) {
        group.classList.add('has-value');
      }

      // Au focus
      input.addEventListener('focus', () => {
        group.classList.add('is-focused');
      });

      // Au blur
      input.addEventListener('blur', () => {
        group.classList.remove('is-focused');
        group.classList.toggle('has-value', !!input.value);

        // Valider si le champ est requis
        if (input.hasAttribute('required')) {
          this.validateField(input);
        }
      });

      // À la saisie
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          this.validateField(input);
        }
      });
    });
  }
}

export default MultiStepForm;
