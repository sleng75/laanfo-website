/**
 * LAANFO C&M - Module Page Transitions Premium
 *
 * Transitions de page élégantes et sophistiquées avec :
 * - Animation multi-layers avec effet de vague
 * - Logo animé au centre avec effets de particules
 * - Texte de progression
 * - Effets de blur et scale
 * - Support des couleurs du thème
 *
 * Fonctionnement :
 * 1. Au clic sur un lien interne, l'animation de sortie se déclenche
 * 2. Une fois l'animation terminée, la navigation s'effectue
 * 3. Sur la nouvelle page, l'animation d'entrée se déclenche
 */

import gsap from 'gsap';

// Configuration
const CONFIG = {
  // Durée des animations (en secondes)
  duration: {
    exit: 0.8,
    enter: 0.8,
    stagger: 0.1,
    logo: 0.6,
    text: 0.4,
    particles: 1.2,
  },
  // Easing des animations
  ease: {
    exit: 'power4.inOut',
    enter: 'power4.inOut',
    logo: 'elastic.out(1, 0.5)',
    bounce: 'back.out(1.7)',
    smooth: 'expo.out',
  },
  // Sélecteurs
  selectors: {
    overlay: '.page-transition',
    layers: '.page-transition__layer',
    logo: '.page-transition__logo',
    text: '.page-transition__text',
    particles: '.page-transition__particle',
    progress: '.page-transition__progress',
  },
  // Liens à exclure des transitions
  excludePatterns: [
    /^#/,
    /^mailto:/,
    /^tel:/,
    /^javascript:/,
    /\.(pdf|zip|doc|docx|xlsx|pptx)$/,
  ],
  // Nombre de particules
  particleCount: 12,
};

// État global
let isTransitioning = false;

/**
 * Initialise les transitions de page
 */
export function initPageTransitions() {
  createTransitionOverlay();
  attachLinkListeners();
  playEnterAnimation();
  console.log('✓ Page transitions premium initialisées');
}

/**
 * Crée l'overlay de transition premium dans le DOM
 */
function createTransitionOverlay() {
  if (document.querySelector(CONFIG.selectors.overlay)) {
    return;
  }

  const overlay = document.createElement('div');
  overlay.className = 'page-transition';
  overlay.setAttribute('aria-hidden', 'true');

  // Générer les particules
  let particlesHTML = '';
  for (let i = 0; i < CONFIG.particleCount; i++) {
    const size = 4 + Math.random() * 8;
    const delay = Math.random() * 0.5;
    particlesHTML += `<div class="page-transition__particle" data-delay="${delay}" style="width:${size}px;height:${size}px;"></div>`;
  }

  // Structure enrichie
  overlay.innerHTML = `
    <div class="page-transition__bg"></div>
    <div class="page-transition__layer page-transition__layer--1"></div>
    <div class="page-transition__layer page-transition__layer--2"></div>
    <div class="page-transition__layer page-transition__layer--3"></div>
    <div class="page-transition__glow"></div>
    <div class="page-transition__content">
      <div class="page-transition__logo-wrapper">
        <div class="page-transition__logo-ring page-transition__logo-ring--outer"></div>
        <div class="page-transition__logo-ring page-transition__logo-ring--inner"></div>
        <div class="page-transition__logo">
          <svg viewBox="0 0 177.28 144.85" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g fill="currentColor">
              <path d="M104.16,0c0,.54.02,1.07.02,1.61,0,47.03,0,94.06,0,141.09,0,2.37.28,2.12-2.07,2.14-1.17,0-2.34.01-3.51,0-1.18-.02-1.18-.03-1.21-1.26,0-.24,0-.49,0-.73,0-47.08,0-94.16,0-141.24,0-.54.03-1.07.04-1.61C99.68,0,101.92,0,104.16,0Z"/>
              <path d="M92.17,0c-.01.63-.03,1.27-.03,1.9,0,33.87,0,67.73,0,101.6,0,2.01.2,2.08-2.1,2.05-1.22-.01-2.44.02-3.65,0-1.09-.02-1.17-.12-1.22-1.17-.02-.39,0-.78,0-1.17,0-33.77,0-67.54,0-101.31,0-.63-.01-1.27-.02-1.9,2.34,0,4.68,0,7.02,0Z"/>
              <path d="M116.45,0c0,17.24,0,34.48-.01,51.73,0,2.35.27,2.08-2.11,2.1-1.31,0-2.63-.02-3.94,0-.68.01-.99-.25-.94-.94.03-.39,0-.78,0-1.17,0-17.24,0-34.48-.01-51.73h7.02Z"/>
              <path d="M72.87,69.81c0-11.16,0-22.33,0-33.49,0-1.87-.12-1.77,1.72-1.77,1.46,0,2.92.02,4.39,0,.69-.01.99.28.93.96-.02.29,0,.58,0,.88,0,22.37,0,44.75,0,67.12,0,1.94.16,1.84-1.8,1.84-1.41,0-2.83-.03-4.24,0-.77.02-1.06-.29-1.01-1.04.03-.34,0-.68,0-1.02,0-11.16,0-22.33,0-33.49Z"/>
              <path d="M31.3,114.68c0,9.41,0,18.81,0,28.22,0,.39-.01.78,0,1.17.01.56-.27.78-.81.77-1.8,0-3.61-.01-5.41,0-.56,0-.79-.27-.78-.81,0-.34,0-.68,0-1.02,0-18.86,0-37.72,0-56.58,0-2.05-.19-1.86,1.91-1.86,1.36,0,2.73.03,4.09-.01.77-.02,1.06.29,1,1.03-.03.34,0,.68,0,1.02,0,9.36,0,18.71,0,28.07Z"/>
              <path d="M43.31,114.66c0,9.4,0,18.8,0,28.21,0,.34-.02.68,0,1.02.05.68-.24.97-.93.96-1.66-.03-3.31-.02-4.97,0-.62,0-.89-.26-.87-.87.02-.34,0-.68,0-1.02,0-18.85,0-37.71,0-56.56,0-1.94-.15-1.82,1.81-1.82,1.36,0,2.73.02,4.09,0,.63,0,.89.26.86.87-.02.39,0,.78,0,1.17,0,9.35,0,18.71,0,28.06Z"/>
              <path d="M60.85,56.78c0-6.78,0-13.55,0-20.33,0-.39,0-.78,0-1.17,0-.48.23-.72.71-.72,1.85,0,3.7,0,5.56,0,.47,0,.74.19.73.69,0,.34,0,.68,0,1.02,0,13.7,0,27.39,0,41.09,0,.29-.01.59,0,.88.03.68-.31.98-.97.98-1.75,0-3.51,0-5.26,0-.55,0-.8-.26-.78-.81.01-.34,0-.68,0-1.02,0-6.87,0-13.75,0-20.62Z"/>
              <path d="M128.69,79.87c0,6.39,0,12.77,0,19.16,0,.34-.01.68,0,1.02.02.59-.19.91-.84.91-1.85-.02-3.71-.02-5.56,0-.64,0-.87-.3-.84-.9.01-.29,0-.58,0-.88,0-12.87,0-25.74,0-38.62,0-1.89-.11-1.78,1.71-1.78,1.41,0,2.83,0,4.24,0,1.26.01,1.28.02,1.28,1.33,0,5.12,0,10.24,0,15.36,0,1.46,0,2.93,0,4.39Z"/>
              <path d="M116.44,80.01c0,6.34,0,12.68,0,19.01,0,.34-.02.68,0,1.02.06.72-.32.92-.97.91-1.71-.02-3.41-.03-5.12,0-.72.01-.96-.32-.91-.98.02-.24,0-.49,0-.73,0-12.92,0-25.84,0-38.76,0-.24.02-.49,0-.73-.08-.79.33-1,1.05-.99,1.56.03,3.12,0,4.68.01,1.25.01,1.27.02,1.27,1.33,0,5.61,0,11.21,0,16.82,0,1.02,0,2.05,0,3.07Z"/>
              <path d="M128.69,125.38c0,5.85,0,11.69,0,17.54,0,.34-.02.68,0,1.02.03.6-.22.9-.85.89-1.85-.02-3.7-.02-5.55,0-.65,0-.86-.32-.83-.91.01-.29,0-.58,0-.88,0-11.79,0-23.58,0-35.38,0-1.88-.12-1.76,1.73-1.76,1.32,0,2.63,0,3.95,0,1.56,0,1.56,0,1.56,1.63,0,5.94,0,11.89,0,17.83Z"/>
              <path d="M116.44,125.51c0,5.8,0,11.59,0,17.39,0,.39-.01.78,0,1.17.01.56-.28.77-.81.77-1.8,0-3.6,0-5.41,0-.56,0-.79-.27-.77-.81,0-.29,0-.58,0-.88,0-11.84,0-23.68,0-35.52,0-.24.02-.49,0-.73-.08-.78.31-1.01,1.04-.99,1.56.03,3.12,0,4.68.01,1.26,0,1.28.02,1.28,1.32,0,5.65,0,11.3,0,16.95,0,.44,0,.88,0,1.32Z"/>
              <path d="M140.75,125.36c0,5.85,0,11.7,0,17.54,0,.39,0,.78,0,1.17,0,.45-.16.76-.67.76-1.9,0-3.8,0-5.7,0-.41,0-.61-.24-.63-.64,0-.29-.01-.58-.01-.88,0-11.94,0-23.88,0-35.82,0-.29,0-.58,0-.88,0-.5.27-.69.74-.69,1.85,0,3.7,0,5.55,0,.49,0,.71.24.71.72,0,.39,0,.78,0,1.17,0,5.85,0,11.7,0,17.54Z"/>
              <path d="M153.01,125.36c0,5.85,0,11.7,0,17.54,0,.39,0,.78,0,1.17,0,.45-.16.76-.67.76-1.9,0-3.8,0-5.7,0-.41,0-.62-.23-.63-.64,0-.34-.01-.68-.01-1.02,0-11.84,0-23.68,0-35.53,0-.24.02-.49,0-.73-.08-.78.32-1.01,1.04-.99,1.66.03,3.31.04,4.97,0,.76-.02,1.04.28,1.01,1.03-.04,1.07,0,2.14,0,3.22,0,5.07,0,10.14,0,15.2Z"/>
              <path d="M67.87,103.12c0,5.85,0,11.7,0,17.54,0,.39,0,.78,0,1.17,0,.49-.26.7-.73.7-1.85,0-3.7,0-5.56,0-.48,0-.72-.23-.72-.71,0-.34,0-.68,0-1.02,0-11.7,0-23.39,0-35.09,0-.29.02-.59,0-.88-.04-.64.28-.85.89-.85,1.75.02,3.51.02,5.26,0,.62,0,.88.24.87.87-.02,1.17,0,2.34,0,3.51,0,4.92,0,9.84,0,14.77Z"/>
              <path d="M48.57,103.45c0-5.7,0-11.4,0-17.09,0-.39,0-.78.02-1.17.01-.42.25-.61.65-.61,1.9,0,3.8,0,5.7,0,.5,0,.68.29.68.74,0,.34,0,.68,0,1.02,0,11.49,0,22.99,0,34.48,0,.15,0,.29,0,.44-.02,1.26-.02,1.27-1.32,1.28-1.46.01-2.92.01-4.38,0-1.33-.01-1.34-.02-1.34-1.41,0-3.9,0-7.79,0-11.69,0-2,0-3.99,0-5.99Z"/>
              <path d="M7.02,132.57c0,3.65,0,7.3,0,10.95,0,1.29-.02,1.31-1.28,1.32-1.56.01-3.11.02-4.67,0-1.02-.02-1.03-.04-1.07-1.09,0-.19,0-.39,0-.58,0-7.1,0-14.2,0-21.31,0-.34,0-.68.02-1.02.02-.33.19-.56.54-.57,1.95-.01,3.89-.01,5.84,0,.41,0,.61.24.62.64,0,.34.01.68.01,1.02,0,3.55,0,7.1,0,10.65Z"/>
              <path d="M12.04,132.52c0-3.65,0-7.31,0-10.96,0-1.29.02-1.31,1.29-1.31,1.61-.01,3.22,0,4.82,0,.6,0,.93.2.89.84-.02.29,0,.58,0,.88,0,7.07,0,14.13,0,21.2,0,.34,0,.68-.01,1.02,0,.4-.2.64-.62.65-1.9,0-3.8,0-5.7,0-.41,0-.64-.2-.65-.61-.01-.34-.02-.68-.02-1.02,0-3.56,0-7.11,0-10.67Z"/>
              <path d="M67.87,136.17c0,2.53.01,5.06,0,7.59,0,1.02-.05,1.05-1.09,1.07-1.56.02-3.11.02-4.67,0-1.23-.01-1.24-.03-1.25-1.35,0-3.21,0-6.42,0-9.64,0-1.85.01-3.7,0-5.55,0-.63.14-1.02.88-1.01,1.75.03,3.5.03,5.26,0,.74-.01.89.37.89,1-.02,2.63,0,5.26,0,7.88Z"/>
              <path d="M48.57,136.08c0-2.53-.01-5.07,0-7.6,0-1.14.03-1.17,1.13-1.18,1.56-.02,3.12-.02,4.68,0,1.21.01,1.23.03,1.23,1.22.01,3.95,0,7.89,0,11.84,0,1.12.02,2.24,0,3.36-.02,1.06-.04,1.09-1.05,1.1-1.61.02-3.22.02-4.82,0-1.13-.01-1.15-.03-1.16-1.15-.02-2.53,0-5.07,0-7.6Z"/>
              <path d="M92.14,136.03c0,2.49,0,4.97,0,7.46,0,1.32-.02,1.33-1.27,1.34-1.51.01-3.02.02-4.53,0-1.13-.01-1.15-.03-1.17-1.14-.02-1.46,0-2.92,0-4.39,0-3.56,0-7.11,0-10.67,0-1.31.02-1.33,1.26-1.34,1.46-.01,2.92-.01,4.39,0,1.3,0,1.31.02,1.32,1.28.01,2.49,0,4.97,0,7.46Z"/>
              <path d="M72.87,136.03c0-2.48,0-4.97,0-7.45,0-1.26.02-1.28,1.32-1.28,1.56-.01,3.12.02,4.68-.01.72-.01,1.06.21,1.05.99-.02,5.21-.02,10.42,0,15.64,0,.7-.3.93-.97.93-1.7-.02-3.41-.03-5.11,0-.8.02-.98-.36-.98-1.07.02-2.58,0-5.16,0-7.75Z"/>
              <path d="M177.28,138.52c0,1.75-.02,3.5,0,5.25,0,.7-.16,1.09-.97,1.07-1.7-.04-3.4-.03-5.1,0-.68.01-.96-.24-.95-.93.02-3.6.02-7.2,0-10.79,0-.64.29-.85.89-.85,1.75.02,3.5.02,5.25,0,.74-.01.88.38.88,1.01-.02,1.75,0,3.5,0,5.25Z"/>
              <path d="M92.14,116.43c0,1.66.02,3.31,0,4.97-.02.95-.15,1.09-1.12,1.11-1.56.03-3.12.03-4.68,0-.99-.02-1.15-.15-1.16-1.07-.02-3.41,0-6.82-.01-10.24,0-.59.19-.9.84-.9,1.75.02,3.51.03,5.26,0,.76-.01.88.39.88,1.01-.02,1.71,0,3.41,0,5.12Z"/>
              <path d="M165.03,138.59c0,1.75-.02,3.5.01,5.25.02.76-.29,1.03-1.03,1.01-1.6-.03-3.21-.03-4.81,0-.67.01-.96-.23-.96-.93.02-3.59.01-7.19,0-10.78,0-.62.27-.87.88-.86,1.65.02,3.3.03,4.95,0,.81-.02.97.39.96,1.08-.03,1.75,0,3.5,0,5.25Z"/>
              <path d="M79.91,116.28c0,1.7-.02,3.4,0,5.1,0,.69-.27.95-.95.94-1.75-.02-3.5-.02-5.25,0-.63,0-.86-.28-.85-.88.01-3.4.02-6.8,0-10.2,0-.69.27-.95.95-.93,1.75.03,3.5.02,5.25,0,.63,0,.86.27.86.88-.02,1.7,0,3.4,0,5.1Z"/>
            </g>
          </svg>
        </div>
      </div>
      <div class="page-transition__text">
        <span class="page-transition__text-line">LAANFO</span>
        <span class="page-transition__text-sub">Conseil & Management</span>
      </div>
      <div class="page-transition__progress">
        <div class="page-transition__progress-bar"></div>
        <div class="page-transition__progress-dot"></div>
      </div>
    </div>
    <div class="page-transition__particles">${particlesHTML}</div>
  `;

  document.body.appendChild(overlay);
}

/**
 * Attache les écouteurs d'événements aux liens internes
 */
function attachLinkListeners() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    if (!isValidTransitionLink(link)) return;
    e.preventDefault();
    navigateWithTransition(link.href);
  });
}

/**
 * Vérifie si un lien est valide pour une transition
 */
function isValidTransitionLink(link) {
  const href = link.getAttribute('href');
  if (!href) return false;
  if (link.hostname !== window.location.hostname) return false;
  if (link.target === '_blank') return false;
  for (const pattern of CONFIG.excludePatterns) {
    if (pattern.test(href)) return false;
  }
  if (link.pathname === window.location.pathname && href.includes('#')) {
    return false;
  }
  return true;
}

/**
 * Navigue vers une URL avec animation de transition premium
 */
function navigateWithTransition(url) {
  if (isTransitioning) return;
  isTransitioning = true;

  const overlay = document.querySelector(CONFIG.selectors.overlay);
  const layers = overlay.querySelectorAll(CONFIG.selectors.layers);
  const logo = overlay.querySelector('.page-transition__logo');
  const logoWrapper = overlay.querySelector('.page-transition__logo-wrapper');
  const rings = overlay.querySelectorAll('.page-transition__logo-ring');
  const textLines = overlay.querySelectorAll('.page-transition__text span');
  const particles = overlay.querySelectorAll(CONFIG.selectors.particles);
  const progressBar = overlay.querySelector('.page-transition__progress-bar');
  const progressDot = overlay.querySelector('.page-transition__progress-dot');
  const glow = overlay.querySelector('.page-transition__glow');
  const bg = overlay.querySelector('.page-transition__bg');

  // Marquer la transition
  setTransitionFlag();

  // Timeline pour l'animation de sortie
  const tl = gsap.timeline({
    onComplete: () => {
      window.location.href = url;
    },
  });

  // Activer l'overlay
  overlay.classList.add('is-active');

  // 1. Fond avec blur
  tl.fromTo(
    bg,
    { opacity: 0, backdropFilter: 'blur(0px)' },
    { opacity: 1, backdropFilter: 'blur(10px)', duration: 0.3, ease: 'power2.out' }
  );

  // 2. Animation des layers avec effet de vague
  tl.fromTo(
    layers,
    {
      scaleY: 0,
      transformOrigin: 'bottom center',
    },
    {
      scaleY: 1,
      duration: CONFIG.duration.exit,
      stagger: {
        each: CONFIG.duration.stagger,
        from: 'start',
      },
      ease: CONFIG.ease.exit,
    },
    0.1
  );

  // 3. Glow effect
  tl.fromTo(
    glow,
    { opacity: 0, scale: 0.5 },
    { opacity: 1, scale: 1.5, duration: 0.8, ease: 'power2.out' },
    0.4
  );

  // 4. Logo rings rotation
  tl.fromTo(
    rings[0],
    { rotation: 0, scale: 0, opacity: 0 },
    { rotation: 180, scale: 1, opacity: 1, duration: 0.8, ease: CONFIG.ease.bounce },
    0.5
  );
  tl.fromTo(
    rings[1],
    { rotation: 0, scale: 0, opacity: 0 },
    { rotation: -90, scale: 1, opacity: 1, duration: 0.6, ease: CONFIG.ease.bounce },
    0.6
  );

  // 5. Logo apparition
  tl.fromTo(
    logo,
    { scale: 0, opacity: 0, rotation: -45 },
    { scale: 1, opacity: 1, rotation: 0, duration: CONFIG.duration.logo, ease: CONFIG.ease.logo },
    0.5
  );

  // 6. Texte
  tl.fromTo(
    textLines,
    { y: 30, opacity: 0, filter: 'blur(10px)' },
    {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: CONFIG.duration.text,
      stagger: 0.1,
      ease: CONFIG.ease.smooth,
    },
    0.7
  );

  // 7. Barre de progression
  tl.fromTo(
    progressBar,
    { scaleX: 0 },
    { scaleX: 1, duration: 0.8, ease: 'power1.inOut' },
    0.9
  );
  tl.fromTo(
    progressDot,
    { left: '0%', opacity: 0 },
    { left: '100%', opacity: 1, duration: 0.8, ease: 'power1.inOut' },
    0.9
  );

  // 8. Particules
  particles.forEach((particle, i) => {
    const angle = (i / CONFIG.particleCount) * Math.PI * 2;
    const radius = 100 + Math.random() * 100;
    const delay = parseFloat(particle.dataset.delay) || 0;

    tl.fromTo(
      particle,
      {
        x: 0,
        y: 0,
        scale: 0,
        opacity: 0,
      },
      {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        scale: 1,
        opacity: 0.8,
        duration: CONFIG.duration.particles,
        ease: 'power2.out',
      },
      0.6 + delay
    );
  });
}

/**
 * Joue l'animation d'entrée (au chargement de la page)
 */
function playEnterAnimation() {
  const overlay = document.querySelector(CONFIG.selectors.overlay);
  if (!overlay) return;

  const layers = overlay.querySelectorAll(CONFIG.selectors.layers);
  const logo = overlay.querySelector('.page-transition__logo');
  const rings = overlay.querySelectorAll('.page-transition__logo-ring');
  const textLines = overlay.querySelectorAll('.page-transition__text span');
  const particles = overlay.querySelectorAll(CONFIG.selectors.particles);
  const progressBar = overlay.querySelector('.page-transition__progress-bar');
  const progressDot = overlay.querySelector('.page-transition__progress-dot');
  const glow = overlay.querySelector('.page-transition__glow');
  const bg = overlay.querySelector('.page-transition__bg');

  const isFromTransition = sessionStorage.getItem('pageTransitionActive');

  if (!isFromTransition) {
    overlay.classList.remove('is-active');
    return;
  }

  sessionStorage.removeItem('pageTransitionActive');
  overlay.classList.add('is-active');

  // Positionner les éléments comme s'ils étaient visibles
  gsap.set(layers, { scaleY: 1 });
  gsap.set([logo, rings, textLines], { opacity: 1, scale: 1 });
  gsap.set(progressBar, { scaleX: 1 });
  gsap.set(progressDot, { left: '100%', opacity: 1 });
  gsap.set(glow, { opacity: 1, scale: 1.5 });
  gsap.set(bg, { opacity: 1 });

  // Timeline pour l'animation d'entrée
  const tl = gsap.timeline({
    delay: 0.2,
    onComplete: () => {
      overlay.classList.remove('is-active');
      isTransitioning = false;
      // Reset tous les éléments
      gsap.set([layers, logo, rings, textLines, particles, progressBar, progressDot, glow, bg], { clearProps: 'all' });
    },
  });

  // 1. Cacher les particules
  tl.to(
    particles,
    {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    },
    0
  );

  // 2. Cacher le texte et la progress bar
  tl.to(
    textLines,
    {
      y: -20,
      opacity: 0,
      filter: 'blur(5px)',
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.in',
    },
    0
  );
  tl.to(
    [progressBar, progressDot],
    { opacity: 0, duration: 0.2, ease: 'power2.in' },
    0
  );

  // 3. Cacher le logo et les anneaux
  tl.to(
    logo,
    {
      scale: 0.5,
      opacity: 0,
      rotation: 45,
      duration: 0.4,
      ease: 'power3.in',
    },
    0.2
  );
  tl.to(
    rings,
    {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.in',
    },
    0.2
  );

  // 4. Cacher le glow
  tl.to(
    glow,
    { opacity: 0, scale: 0.5, duration: 0.4, ease: 'power2.in' },
    0.3
  );

  // 5. Animation des layers (de haut en bas)
  tl.to(
    [...layers].reverse(),
    {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: CONFIG.duration.enter,
      stagger: CONFIG.duration.stagger,
      ease: CONFIG.ease.enter,
    },
    0.4
  );

  // 6. Fond blur out
  tl.to(
    bg,
    { opacity: 0, backdropFilter: 'blur(0px)', duration: 0.3, ease: 'power2.in' },
    0.8
  );
}

/**
 * Marque qu'une transition est en cours
 */
function setTransitionFlag() {
  sessionStorage.setItem('pageTransitionActive', 'true');
}

/**
 * Force une transition vers une URL
 */
export function transitionTo(url) {
  navigateWithTransition(url);
}
