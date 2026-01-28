/**
 * LAANFO C&M - Module Theme (Light/Dark Mode)
 *
 * Gère le basculement entre les thèmes clair et sombre :
 * - Détecte la préférence système (prefers-color-scheme)
 * - Sauvegarde le choix de l'utilisateur dans localStorage
 * - Applique une transition fluide lors du changement
 * - Synchronise l'état du bouton toggle
 */

// Clé de stockage dans localStorage
const THEME_STORAGE_KEY = 'laanfo-theme';

// Thèmes disponibles
const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system', // Suit la préférence système
};

// Variable pour stocker le thème actuel
let currentTheme = THEMES.SYSTEM;

/**
 * Initialise le système de thème
 * @param {boolean} setupToggle - Si true, initialise aussi les boutons toggle (à appeler après DOMContentLoaded)
 */
export function initTheme(setupToggle = false) {
  // Récupérer le thème sauvegardé ou utiliser le système
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
    currentTheme = savedTheme;
  } else {
    currentTheme = THEMES.SYSTEM;
  }

  // Appliquer le thème initial (sans transition)
  applyTheme(currentTheme, false);

  // Écouter les changements de préférence système
  watchSystemPreference();

  // Initialiser les boutons toggle seulement si le DOM est prêt
  if (setupToggle) {
    initThemeToggle();
  }

  console.log('✓ Thème initialisé:', getEffectiveTheme());
}

/**
 * Initialise les boutons toggle de thème (à appeler après DOMContentLoaded)
 */
export function setupThemeToggleButtons() {
  initThemeToggle();
}

/**
 * Applique un thème
 * @param {string} theme - 'light', 'dark', ou 'system'
 * @param {boolean} animate - Activer la transition animée
 */
function applyTheme(theme, animate = true) {
  const root = document.documentElement;
  const effectiveTheme = theme === THEMES.SYSTEM ? getSystemTheme() : theme;

  // Ajouter la classe de transition si animation demandée
  if (animate) {
    root.classList.add('theme-transition');

    // Retirer la classe après la transition
    setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 400); // Correspond à --duration-theme
  }

  // Appliquer le thème
  if (theme === THEMES.SYSTEM) {
    // Mode système : retirer l'attribut pour laisser CSS gérer
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', effectiveTheme);
  }

  // Mettre à jour l'icône du toggle
  updateToggleIcon(effectiveTheme);

  // Mettre à jour la meta theme-color pour les navigateurs mobiles
  updateMetaThemeColor(effectiveTheme);
}

/**
 * Détecte la préférence système
 * @returns {string} 'light' ou 'dark'
 */
function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEMES.DARK
    : THEMES.LIGHT;
}

/**
 * Retourne le thème effectivement appliqué
 * @returns {string} 'light' ou 'dark'
 */
function getEffectiveTheme() {
  if (currentTheme === THEMES.SYSTEM) {
    return getSystemTheme();
  }
  return currentTheme;
}

/**
 * Bascule entre les thèmes
 */
export function toggleTheme() {
  const effectiveTheme = getEffectiveTheme();

  // Basculer vers l'opposé
  const newTheme = effectiveTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;

  currentTheme = newTheme;
  localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  applyTheme(newTheme, true);

  console.log('Thème changé:', newTheme);
}

/**
 * Définit un thème spécifique
 * @param {string} theme - 'light', 'dark', ou 'system'
 */
export function setTheme(theme) {
  if (!Object.values(THEMES).includes(theme)) {
    console.warn('Thème invalide:', theme);
    return;
  }

  currentTheme = theme;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  applyTheme(theme, true);
}

/**
 * Initialise le bouton toggle de thème
 */
function initThemeToggle() {
  const toggleButtons = document.querySelectorAll('[data-theme-toggle]');

  toggleButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      toggleTheme();
    });

    // Accessibilité
    button.setAttribute('role', 'button');
    button.setAttribute('aria-label', 'Changer de thème');
  });

  // Mettre à jour l'icône initiale
  updateToggleIcon(getEffectiveTheme());
}

/**
 * Met à jour l'icône du bouton toggle
 * @param {string} theme - Le thème actuel ('light' ou 'dark')
 */
function updateToggleIcon(theme) {
  const toggleButtons = document.querySelectorAll('[data-theme-toggle]');

  toggleButtons.forEach((button) => {
    // Support des deux classes (ancien .theme-toggle__* et nouveau .floating-btn__*)
    const sunIcon = button.querySelector('.theme-toggle__sun, .floating-btn__sun');
    const moonIcon = button.querySelector('.theme-toggle__moon, .floating-btn__moon');

    if (sunIcon && moonIcon) {
      if (theme === THEMES.DARK) {
        // En mode sombre, montrer le soleil (pour passer en clair)
        sunIcon.style.opacity = '1';
        sunIcon.style.transform = 'rotate(0deg) scale(1)';
        moonIcon.style.opacity = '0';
        moonIcon.style.transform = 'rotate(-90deg) scale(0.5)';
      } else {
        // En mode clair, montrer la lune (pour passer en sombre)
        sunIcon.style.opacity = '0';
        sunIcon.style.transform = 'rotate(90deg) scale(0.5)';
        moonIcon.style.opacity = '1';
        moonIcon.style.transform = 'rotate(0deg) scale(1)';
      }
    }

    // Mettre à jour aria-label
    button.setAttribute(
      'aria-label',
      theme === THEMES.DARK ? 'Passer en mode clair' : 'Passer en mode sombre'
    );
  });
}

/**
 * Met à jour la couleur de la barre de navigation mobile
 * @param {string} theme - Le thème actuel
 */
function updateMetaThemeColor(theme) {
  let metaThemeColor = document.querySelector('meta[name="theme-color"]');

  if (!metaThemeColor) {
    metaThemeColor = document.createElement('meta');
    metaThemeColor.name = 'theme-color';
    document.head.appendChild(metaThemeColor);
  }

  metaThemeColor.content = theme === THEMES.DARK ? '#0a0a0a' : '#ffffff';
}

/**
 * Surveille les changements de préférence système
 */
function watchSystemPreference() {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  mediaQuery.addEventListener('change', (e) => {
    // Ne réagir que si le thème est en mode "system"
    if (currentTheme === THEMES.SYSTEM) {
      applyTheme(THEMES.SYSTEM, true);
      console.log('Préférence système changée:', e.matches ? 'dark' : 'light');
    }
  });
}

/**
 * Retourne le thème actuel
 * @returns {string} Le thème actuel
 */
export function getCurrentTheme() {
  return currentTheme;
}

/**
 * Vérifie si le mode sombre est actif
 * @returns {boolean}
 */
export function isDarkMode() {
  return getEffectiveTheme() === THEMES.DARK;
}

// Exporter les constantes
export { THEMES };
