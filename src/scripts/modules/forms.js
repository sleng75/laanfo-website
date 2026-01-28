/**
 * LAANFO C&M - Module Forms
 *
 * Gère les formulaires du site :
 * - Validation en temps réel
 * - Labels flottants (floating labels)
 * - Feedback visuel (succès/erreur)
 * - Soumission avec animation
 */

import gsap from 'gsap';

/**
 * Initialise la gestion des formulaires
 */
export function initForms() {
  // Trouver tous les formulaires avec l'attribut data-form
  const forms = document.querySelectorAll('[data-form]');

  forms.forEach((form) => {
    initFormValidation(form);
  });

  // Initialiser les labels flottants
  initFloatingLabels();

  console.log('✓ Formulaires initialisés');
}

/**
 * Initialise la validation d'un formulaire
 */
function initFormValidation(form) {
  const inputs = form.querySelectorAll('input, textarea, select');

  // Validation en temps réel sur chaque champ
  inputs.forEach((input) => {
    // Valider quand on quitte le champ (blur)
    input.addEventListener('blur', () => validateField(input));

    // Re-valider quand on tape (si déjà invalide)
    input.addEventListener('input', () => {
      if (input.classList.contains('is-invalid')) {
        validateField(input);
      }
    });
  });

  // Validation à la soumission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Valider tous les champs
    let isFormValid = true;
    inputs.forEach((input) => {
      if (!validateField(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      // Animation de secousse si invalide
      shakeElement(form);
      return;
    }

    // Soumettre le formulaire
    await submitForm(form);
  });
}

/**
 * Valide un champ individuel
 * @param {HTMLElement} field - Le champ à valider
 * @returns {boolean} - true si valide, false sinon
 */
function validateField(field) {
  const value = field.value.trim();
  const type = field.type;
  const required = field.hasAttribute('required');
  const wrapper = field.closest('.form-group');
  const errorElement = wrapper?.querySelector('.form-error');

  let isValid = true;
  let errorMessage = '';

  // Réinitialiser les classes
  field.classList.remove('is-invalid', 'is-valid');

  // Vérification : champ requis
  if (required && !value) {
    isValid = false;
    errorMessage = 'Ce champ est requis';
  }

  // Vérification : format email
  if (type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'Veuillez entrer une adresse email valide';
    }
  }

  // Vérification : format téléphone
  if (type === 'tel' && value) {
    const phoneRegex = /^[\d\s+()-]{10,}$/;
    if (!phoneRegex.test(value)) {
      isValid = false;
      errorMessage = 'Veuillez entrer un numéro valide';
    }
  }

  // Vérification : longueur minimale
  const minLength = field.getAttribute('minlength');
  if (minLength && value && value.length < parseInt(minLength)) {
    isValid = false;
    errorMessage = `Minimum ${minLength} caractères requis`;
  }

  // Appliquer le résultat
  if (!isValid) {
    field.classList.add('is-invalid');
    if (errorElement) {
      errorElement.textContent = errorMessage;
      gsap.fromTo(
        errorElement,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3 }
      );
    }
  } else if (value) {
    field.classList.add('is-valid');
    if (errorElement) {
      errorElement.textContent = '';
    }
  }

  return isValid;
}

/**
 * Soumet le formulaire
 */
async function submitForm(form) {
  const submitBtn = form.querySelector('[type="submit"]');
  const originalText = submitBtn?.textContent;

  try {
    // État de chargement
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner"></span> Envoi...';
    }

    // Collecter les données
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Simuler un délai (à remplacer par l'appel API réel)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // TODO: Appel API réel
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });

    console.log('Données du formulaire:', data);

    // Succès
    showSuccessMessage(form);
    form.reset();

    // Réinitialiser les labels flottants
    form.querySelectorAll('.form-group').forEach((group) => {
      group.classList.remove('has-value', 'is-focused');
    });

  } catch (error) {
    console.error('Erreur de soumission:', error);
    showErrorMessage(form, 'Une erreur est survenue. Veuillez réessayer.');
  } finally {
    // Restaurer le bouton
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }
}

/**
 * Initialise les labels flottants
 *
 * Un label flottant est un label qui :
 * - Est positionné comme placeholder quand le champ est vide
 * - "Flotte" vers le haut quand le champ a du contenu ou le focus
 */
function initFloatingLabels() {
  const floatingGroups = document.querySelectorAll('.form-group--floating');

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

    // Au blur (quand on quitte)
    input.addEventListener('blur', () => {
      group.classList.remove('is-focused');
      if (input.value) {
        group.classList.add('has-value');
      } else {
        group.classList.remove('has-value');
      }
    });
  });
}

/**
 * Animation de secousse pour indiquer une erreur
 */
function shakeElement(element) {
  gsap.to(element, {
    x: [-10, 10, -10, 10, 0],
    duration: 0.4,
    ease: 'power2.inOut',
  });
}

/**
 * Affiche un message de succès
 */
function showSuccessMessage(form) {
  const successEl = form.querySelector('.form-success');
  if (successEl) {
    successEl.classList.add('is-visible');
    gsap.fromTo(
      successEl,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

    // Masquer après 5 secondes
    setTimeout(() => {
      gsap.to(successEl, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => successEl.classList.remove('is-visible'),
      });
    }, 5000);
  }
}

/**
 * Affiche un message d'erreur
 */
function showErrorMessage(form, message) {
  const errorEl = form.querySelector('.form-error-global');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('is-visible');
    gsap.fromTo(
      errorEl,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.3 }
    );

    setTimeout(() => {
      gsap.to(errorEl, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => errorEl.classList.remove('is-visible'),
      });
    }, 5000);
  }
}

export { validateField };
