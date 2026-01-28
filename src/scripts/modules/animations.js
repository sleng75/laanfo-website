/**
 * LAANFO C&M - Module Animations Premium
 *
 * Animations sophistiquées avec GSAP + SplitType.
 *
 * Animations disponibles :
 *
 * BASIQUES:
 * - data-animate="fade-up|fade-down|fade-left|fade-right|fade-in|scale-in|rotate-in|blur-in"
 *
 * STAGGER (cascade):
 * - data-animate="stagger|stagger-left|stagger-scale|stagger-rotate|stagger-blur"
 *
 * TEXTE AVANCÉ (avec SplitType):
 * - data-animate="split-lines" (révélation ligne par ligne)
 * - data-animate="split-words" (révélation mot par mot)
 * - data-animate="split-chars" (révélation caractère par caractère)
 * - data-animate="split-chars-rotate" (caractères avec rotation)
 * - data-animate="split-chars-scale" (caractères avec scale)
 * - data-animate="text-reveal" (révélation avec masque)
 * - data-animate="text-glitch" (effet glitch)
 * - data-animate="text-scramble" (effet scramble)
 *
 * IMAGES:
 * - data-animate="image-reveal" (révélation avec masque)
 * - data-animate="image-zoom" (zoom parallax)
 * - data-animate="image-clip" (clip-path animé)
 *
 * FORMES:
 * - data-animate="draw-svg" (dessine les SVG)
 * - data-animate="morph" (morphing de formes)
 *
 * SCROLL AVANCÉ:
 * - data-parallax (parallax standard)
 * - data-parallax-rotate (rotation au scroll)
 * - data-parallax-scale (scale au scroll)
 * - data-scrub (animation liée au scroll)
 * - data-pin (élément épinglé pendant le scroll)
 *
 * HOVER:
 * - data-lift (élévation)
 * - data-magnetic (effet magnétique)
 * - data-tilt (rotation 3D)
 * - data-glow (effet de lueur)
 * - data-ripple (effet ripple au clic)
 *
 * SPÉCIAUX:
 * - data-counter (compteur animé)
 * - data-typewriter (effet machine à écrire)
 * - data-marquee (défilement infini)
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

// Enregistrer les plugins
gsap.registerPlugin(ScrollTrigger);

// Configuration globale
const CONFIG = {
  ease: {
    smooth: 'power3.out',
    bounce: 'back.out(1.7)',
    elastic: 'elastic.out(1, 0.3)',
    premium: 'expo.out',
    snappy: 'power4.out',
  },
  duration: {
    fast: 0.4,
    normal: 0.8,
    slow: 1.2,
    verySlow: 1.8,
  },
};

/**
 * Initialise toutes les animations
 */
export function initAnimations() {
  // Synchroniser ScrollTrigger avec Lenis
  if (window.lenis) {
    window.lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      window.lenis?.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  // Vérifier prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    gsap.set('[data-animate]', { opacity: 1, y: 0, x: 0, scale: 1, filter: 'none' });
    console.log('✓ Animations désactivées (prefers-reduced-motion)');
    return;
  }

  // Initialiser toutes les animations
  initFadeAnimations();
  initStaggerAnimations();
  initSplitTextAnimations();
  initTextEffects();
  initImageAnimations();
  initParallaxAnimations();
  initScrollAnimations();
  initHoverEffects();
  initCounterAnimations();
  initMarqueeAnimations();
  initScrollProgressBar();
  initCustomCursor();

  console.log('✓ Animations premium initialisées');
}

/**
 * Animations de fade enrichies
 */
function initFadeAnimations() {
  const animations = {
    'fade-up': { y: 80, x: 0, rotation: 0, scale: 1, filter: 'blur(0px)' },
    'fade-down': { y: -80, x: 0, rotation: 0, scale: 1, filter: 'blur(0px)' },
    'fade-left': { y: 0, x: 100, rotation: 0, scale: 1, filter: 'blur(0px)' },
    'fade-right': { y: 0, x: -100, rotation: 0, scale: 1, filter: 'blur(0px)' },
    'fade-in': { y: 0, x: 0, rotation: 0, scale: 1, filter: 'blur(0px)' },
    'scale-in': { y: 30, x: 0, rotation: 0, scale: 0.85, filter: 'blur(0px)' },
    'rotate-in': { y: 40, x: 0, rotation: 15, scale: 0.95, filter: 'blur(0px)' },
    'blur-in': { y: 30, x: 0, rotation: 0, scale: 0.98, filter: 'blur(10px)' },
    'flip-up': { y: 60, x: 0, rotationX: -90, scale: 1, filter: 'blur(0px)' },
    'zoom-out': { y: 0, x: 0, rotation: 0, scale: 1.3, filter: 'blur(5px)' },
  };

  Object.keys(animations).forEach((type) => {
    const config = animations[type];

    gsap.utils.toArray(`[data-animate="${type}"]`).forEach((element) => {
      const delay = parseFloat(element.dataset.delay) || 0;
      const duration = parseFloat(element.dataset.duration) || CONFIG.duration.normal;
      const ease = element.dataset.ease || CONFIG.ease.premium;

      // Ajouter perspective pour les rotations 3D
      if (type === 'flip-up') {
        element.style.perspective = '1000px';
        element.style.transformStyle = 'preserve-3d';
      }

      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        ...config,
        opacity: 0,
        duration,
        delay,
        ease,
        clearProps: 'filter',
      });
    });
  });
}

/**
 * Animations stagger enrichies
 */
function initStaggerAnimations() {
  const staggerTypes = {
    'stagger': { y: 60, x: 0, scale: 1, rotation: 0, filter: 'blur(0px)' },
    'stagger-left': { y: 0, x: 80, scale: 1, rotation: 0, filter: 'blur(0px)' },
    'stagger-right': { y: 0, x: -80, scale: 1, rotation: 0, filter: 'blur(0px)' },
    'stagger-scale': { y: 40, x: 0, scale: 0.8, rotation: 0, filter: 'blur(0px)' },
    'stagger-rotate': { y: 50, x: 0, scale: 0.9, rotation: 10, filter: 'blur(0px)' },
    'stagger-blur': { y: 40, x: 0, scale: 0.95, rotation: 0, filter: 'blur(15px)' },
    'stagger-flip': { y: 30, x: 0, scale: 0.9, rotationY: 45, filter: 'blur(5px)' },
  };

  Object.keys(staggerTypes).forEach((type) => {
    const config = staggerTypes[type];

    gsap.utils.toArray(`[data-animate="${type}"]`).forEach((container) => {
      const children = gsap.utils.toArray(container.children);
      if (children.length === 0) return;

      const staggerDelay = parseFloat(container.dataset.stagger) || 0.12;
      const delay = parseFloat(container.dataset.delay) || 0;
      const duration = parseFloat(container.dataset.duration) || 0.7;
      const ease = type.includes('scale') ? CONFIG.ease.bounce : CONFIG.ease.premium;

      // Ajouter perspective pour les rotations 3D
      if (type === 'stagger-flip') {
        container.style.perspective = '1000px';
        children.forEach(child => {
          child.style.transformStyle = 'preserve-3d';
        });
      }

      gsap.from(children, {
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        ...config,
        opacity: 0,
        duration,
        delay,
        stagger: {
          amount: staggerDelay * children.length,
          from: container.dataset.staggerFrom || 'start',
        },
        ease,
        clearProps: type === 'stagger-flip' ? 'all' : 'filter',
      });
    });
  });
}

/**
 * Animations de texte avec SplitType
 */
function initSplitTextAnimations() {
  // Split Lines - Révélation ligne par ligne
  gsap.utils.toArray('[data-animate="split-lines"]').forEach((element) => {
    const split = new SplitType(element, { types: 'lines' });
    const delay = parseFloat(element.dataset.delay) || 0;

    // Wrapper pour le masque
    split.lines.forEach(line => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = 'hidden';
      wrapper.style.display = 'block';
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    gsap.from(split.lines, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: '110%',
      rotation: 3,
      opacity: 0,
      duration: CONFIG.duration.slow,
      delay,
      stagger: 0.1,
      ease: CONFIG.ease.premium,
    });
  });

  // Split Words - Révélation mot par mot
  gsap.utils.toArray('[data-animate="split-words"]').forEach((element) => {
    const split = new SplitType(element, { types: 'words' });
    const delay = parseFloat(element.dataset.delay) || 0;

    gsap.from(split.words, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 40,
      opacity: 0,
      rotationX: -40,
      duration: 0.8,
      delay,
      stagger: 0.04,
      ease: CONFIG.ease.premium,
    });
  });

  // Split Chars - Révélation caractère par caractère
  gsap.utils.toArray('[data-animate="split-chars"]').forEach((element) => {
    const split = new SplitType(element, { types: 'chars' });
    const delay = parseFloat(element.dataset.delay) || 0;

    gsap.from(split.chars, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 30,
      opacity: 0,
      duration: 0.5,
      delay,
      stagger: 0.02,
      ease: CONFIG.ease.smooth,
    });
  });

  // Split Chars avec rotation
  gsap.utils.toArray('[data-animate="split-chars-rotate"]').forEach((element) => {
    const split = new SplitType(element, { types: 'chars' });
    const delay = parseFloat(element.dataset.delay) || 0;

    gsap.from(split.chars, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 50,
      rotation: gsap.utils.wrap([-20, 20]),
      opacity: 0,
      scale: 0.5,
      duration: 0.6,
      delay,
      stagger: {
        amount: 0.8,
        from: 'random',
      },
      ease: CONFIG.ease.bounce,
    });
  });

  // Split Chars avec scale
  gsap.utils.toArray('[data-animate="split-chars-scale"]').forEach((element) => {
    const split = new SplitType(element, { types: 'chars' });
    const delay = parseFloat(element.dataset.delay) || 0;

    split.chars.forEach(char => {
      char.style.display = 'inline-block';
    });

    gsap.from(split.chars, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      scale: 0,
      opacity: 0,
      duration: 0.4,
      delay,
      stagger: {
        amount: 0.6,
        from: 'center',
      },
      ease: CONFIG.ease.elastic,
    });
  });

  // Split avec wave (ondulation)
  gsap.utils.toArray('[data-animate="split-wave"]').forEach((element) => {
    const split = new SplitType(element, { types: 'chars' });
    const delay = parseFloat(element.dataset.delay) || 0;

    split.chars.forEach(char => {
      char.style.display = 'inline-block';
    });

    gsap.from(split.chars, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: (i) => Math.sin(i * 0.5) * 30,
      opacity: 0,
      duration: 0.6,
      delay,
      stagger: 0.03,
      ease: CONFIG.ease.premium,
    });
  });
}

/**
 * Effets de texte spéciaux
 */
function initTextEffects() {
  // Text Reveal avec masque
  gsap.utils.toArray('[data-animate="text-reveal"]').forEach((element) => {
    const delay = parseFloat(element.dataset.delay) || 0;
    const text = element.innerHTML;

    element.innerHTML = `<span class="text-reveal-inner" style="display:block">${text}</span>`;
    element.style.overflow = 'hidden';
    element.style.display = 'block';

    gsap.from(element.querySelector('.text-reveal-inner'), {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: '110%',
      skewY: 7,
      opacity: 0,
      duration: CONFIG.duration.slow,
      delay,
      ease: CONFIG.ease.premium,
    });
  });

  // Text Glitch effect
  gsap.utils.toArray('[data-animate="text-glitch"]').forEach((element) => {
    const text = element.textContent;
    const delay = parseFloat(element.dataset.delay) || 0;

    ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
        let iteration = 0;
        const originalText = text;

        setTimeout(() => {
          const interval = setInterval(() => {
            element.textContent = originalText
              .split('')
              .map((char, index) => {
                if (index < iteration) return originalText[index];
                if (char === ' ') return ' ';
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join('');

            if (iteration >= originalText.length) {
              clearInterval(interval);
              element.textContent = originalText;
            }
            iteration += 1 / 3;
          }, 30);
        }, delay * 1000);
      },
    });
  });

  // Typewriter effect
  gsap.utils.toArray('[data-animate="typewriter"]').forEach((element) => {
    const text = element.textContent;
    const delay = parseFloat(element.dataset.delay) || 0;
    const speed = parseFloat(element.dataset.speed) || 50;

    element.textContent = '';
    element.style.borderRight = '2px solid var(--color-gold-400)';

    ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        let i = 0;
        setTimeout(() => {
          const typeInterval = setInterval(() => {
            if (i < text.length) {
              element.textContent += text.charAt(i);
              i++;
            } else {
              clearInterval(typeInterval);
              // Blinking cursor
              gsap.to(element, {
                borderRightColor: 'transparent',
                duration: 0.5,
                repeat: -1,
                yoyo: true,
                ease: 'steps(1)',
              });
            }
          }, speed);
        }, delay * 1000);
      },
    });
  });
}

/**
 * Animations d'images avancées
 */
function initImageAnimations() {
  // Image Reveal avec masque
  gsap.utils.toArray('[data-animate="image-reveal"]').forEach((container) => {
    const img = container.querySelector('img');
    if (!img) return;

    const direction = container.dataset.direction || 'left';
    const delay = parseFloat(container.dataset.delay) || 0;

    container.style.overflow = 'hidden';
    container.style.position = 'relative';

    // Créer le masque
    const mask = document.createElement('div');
    mask.className = 'image-reveal-mask';

    const origins = {
      left: 'right center',
      right: 'left center',
      top: 'center bottom',
      bottom: 'center top',
    };

    mask.style.cssText = `
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, var(--color-gold-600) 0%, var(--color-gold-400) 100%);
      z-index: 2;
      transform-origin: ${origins[direction]};
    `;
    container.appendChild(mask);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Animation du masque
    tl.to(mask, {
      scaleX: direction === 'left' || direction === 'right' ? 0 : 1,
      scaleY: direction === 'top' || direction === 'bottom' ? 0 : 1,
      duration: 1,
      delay,
      ease: CONFIG.ease.snappy,
      onComplete: () => mask.remove(),
    });

    // Animation de l'image
    tl.from(img, {
      scale: 1.3,
      filter: 'blur(10px)',
      duration: 1.4,
      ease: CONFIG.ease.premium,
      clearProps: 'filter',
    }, delay);
  });

  // Image Zoom Parallax
  gsap.utils.toArray('[data-animate="image-zoom"]').forEach((container) => {
    const img = container.querySelector('img');
    if (!img) return;

    container.style.overflow = 'hidden';

    gsap.fromTo(img, {
      scale: 1.2,
    }, {
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      scale: 1,
      ease: 'none',
    });
  });

  // Image Clip Path
  gsap.utils.toArray('[data-animate="image-clip"]').forEach((container) => {
    const img = container.querySelector('img');
    if (!img) return;

    const clipType = container.dataset.clipType || 'circle';
    const delay = parseFloat(container.dataset.delay) || 0;

    const clips = {
      circle: {
        from: 'circle(0% at 50% 50%)',
        to: 'circle(100% at 50% 50%)',
      },
      diamond: {
        from: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
        to: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
      },
      square: {
        from: 'inset(50% 50% 50% 50%)',
        to: 'inset(0% 0% 0% 0%)',
      },
      diagonal: {
        from: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
        to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      },
    };

    const clip = clips[clipType] || clips.circle;

    gsap.fromTo(container, {
      clipPath: clip.from,
    }, {
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      clipPath: clip.to,
      duration: CONFIG.duration.slow,
      delay,
      ease: CONFIG.ease.premium,
    });
  });
}

/**
 * Animations Parallax avancées
 */
function initParallaxAnimations() {
  // Parallax standard
  gsap.utils.toArray('[data-parallax]').forEach((element) => {
    const speed = parseFloat(element.dataset.parallaxSpeed) || 0.3;
    const direction = element.dataset.parallaxDirection || 'up';
    const multiplier = direction === 'down' ? 1 : -1;

    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
      y: () => element.offsetHeight * speed * multiplier,
      ease: 'none',
    });
  });

  // Parallax avec rotation
  gsap.utils.toArray('[data-parallax-rotate]').forEach((element) => {
    const speed = parseFloat(element.dataset.parallaxSpeed) || 0.1;
    const maxRotation = parseFloat(element.dataset.maxRotation) || 15;

    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      rotation: maxRotation * speed,
      ease: 'none',
    });
  });

  // Parallax avec scale
  gsap.utils.toArray('[data-parallax-scale]').forEach((element) => {
    const scaleFrom = parseFloat(element.dataset.scaleFrom) || 0.8;
    const scaleTo = parseFloat(element.dataset.scaleTo) || 1;

    gsap.fromTo(element, {
      scale: scaleFrom,
    }, {
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'center center',
        scrub: 1,
      },
      scale: scaleTo,
      ease: 'none',
    });
  });

  // Parallax background
  gsap.utils.toArray('[data-parallax-bg]').forEach((element) => {
    const speed = parseFloat(element.dataset.parallaxSpeed) || 0.3;

    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      backgroundPositionY: `${speed * 100}%`,
      ease: 'none',
    });
  });
}

/**
 * Animations au scroll avancées
 */
function initScrollAnimations() {
  // Scrub animation (liée au scroll)
  gsap.utils.toArray('[data-scrub]').forEach((element) => {
    const scrubType = element.dataset.scrub || 'fade';
    const scrubIntensity = parseFloat(element.dataset.scrubIntensity) || 1;

    const animations = {
      fade: { opacity: 0, y: 50 * scrubIntensity },
      scale: { scale: 0.8, opacity: 0 },
      rotate: { rotation: 20 * scrubIntensity, opacity: 0 },
      blur: { filter: 'blur(20px)', opacity: 0 },
    };

    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'top center',
        scrub: 1,
      },
      ...animations[scrubType],
      ease: 'none',
    });
  });

  // Pin element
  gsap.utils.toArray('[data-pin]').forEach((element) => {
    const pinDuration = parseFloat(element.dataset.pinDuration) || 1;

    ScrollTrigger.create({
      trigger: element,
      start: 'top top',
      end: `+=${window.innerHeight * pinDuration}`,
      pin: true,
      pinSpacing: true,
    });
  });

  // Horizontal scroll
  gsap.utils.toArray('[data-horizontal-scroll]').forEach((container) => {
    const wrapper = container.querySelector('[data-horizontal-wrapper]');
    if (!wrapper) return;

    const items = gsap.utils.toArray(wrapper.children);
    const totalWidth = items.reduce((acc, item) => acc + item.offsetWidth, 0);

    gsap.to(wrapper, {
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
      },
      x: () => -(totalWidth - window.innerWidth),
      ease: 'none',
    });
  });
}

/**
 * Effets au survol enrichis
 */
function initHoverEffects() {
  // Effet Lift avec glow
  document.querySelectorAll('[data-lift]').forEach((element) => {
    const intensity = parseFloat(element.dataset.liftIntensity) || 1;

    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        y: -12 * intensity,
        scale: 1.02,
        boxShadow: `0 ${25 * intensity}px ${50 * intensity}px -15px rgba(0,0,0,0.2)`,
        duration: 0.4,
        ease: CONFIG.ease.smooth,
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        y: 0,
        scale: 1,
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        duration: 0.4,
        ease: CONFIG.ease.smooth,
      });
    });
  });

  // Effet Magnetic amélioré
  document.querySelectorAll('[data-magnetic]').forEach((element) => {
    const strength = parseFloat(element.dataset.magneticStrength) || 0.3;
    const innerElement = element.querySelector('[data-magnetic-inner]') || element;

    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: CONFIG.ease.smooth,
      });

      if (innerElement !== element) {
        gsap.to(innerElement, {
          x: x * strength * 0.5,
          y: y * strength * 0.5,
          duration: 0.4,
          ease: CONFIG.ease.smooth,
        });
      }
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: CONFIG.ease.elastic,
      });

      if (innerElement !== element) {
        gsap.to(innerElement, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: CONFIG.ease.elastic,
        });
      }
    });
  });

  // Effet Tilt 3D amélioré
  document.querySelectorAll('[data-tilt]').forEach((element) => {
    const maxRotation = parseFloat(element.dataset.tiltMax) || 15;
    const perspective = parseFloat(element.dataset.tiltPerspective) || 1000;
    const scale = parseFloat(element.dataset.tiltScale) || 1.05;

    element.style.transformStyle = 'preserve-3d';
    element.style.perspective = `${perspective}px`;

    // Créer un effet de profondeur pour les enfants
    const children = element.querySelectorAll('[data-tilt-child]');
    children.forEach(child => {
      child.style.transform = 'translateZ(30px)';
    });

    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateX = (mouseY / (rect.height / 2)) * -maxRotation;
      const rotateY = (mouseX / (rect.width / 2)) * maxRotation;

      gsap.to(element, {
        rotateX,
        rotateY,
        scale,
        duration: 0.4,
        ease: CONFIG.ease.smooth,
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6,
        ease: CONFIG.ease.smooth,
      });
    });
  });

  // Effet Glow
  document.querySelectorAll('[data-glow]').forEach((element) => {
    const glowColor = element.dataset.glowColor || 'rgba(196, 168, 98, 0.4)';
    const glowSize = parseFloat(element.dataset.glowSize) || 20;

    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        boxShadow: `0 0 ${glowSize}px ${glowSize / 2}px ${glowColor}`,
        duration: 0.3,
        ease: CONFIG.ease.smooth,
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        boxShadow: 'none',
        duration: 0.3,
        ease: CONFIG.ease.smooth,
      });
    });
  });

  // Effet Ripple au clic
  document.querySelectorAll('[data-ripple]').forEach((element) => {
    element.style.position = 'relative';
    element.style.overflow = 'hidden';

    element.addEventListener('click', (e) => {
      const rect = element.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: var(--color-gold-400);
        opacity: 0.3;
        transform: scale(0);
        pointer-events: none;
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
      `;

      element.appendChild(ripple);

      gsap.to(ripple, {
        scale: 2,
        opacity: 0,
        duration: 0.6,
        ease: CONFIG.ease.smooth,
        onComplete: () => ripple.remove(),
      });
    });
  });
}

/**
 * Animations de compteur enrichies
 */
function initCounterAnimations() {
  document.querySelectorAll('[data-counter]').forEach((counter) => {
    const target = parseInt(counter.dataset.counter, 10);
    const suffix = counter.dataset.counterSuffix || '';
    const prefix = counter.dataset.counterPrefix || '';
    const duration = parseFloat(counter.dataset.counterDuration) || 2.5;
    const decimals = parseInt(counter.dataset.counterDecimals, 10) || 0;

    if (isNaN(target)) return;

    counter.textContent = `${prefix}0${suffix}`;

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const obj = { value: 0 };

        gsap.to(obj, {
          value: target,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            const value = decimals > 0
              ? obj.value.toFixed(decimals)
              : Math.round(obj.value);
            counter.textContent = `${prefix}${value}${suffix}`;
          },
        });
      },
    });
  });
}

/**
 * Animation Marquee (défilement infini)
 */
function initMarqueeAnimations() {
  document.querySelectorAll('[data-marquee]').forEach((container) => {
    const wrapper = container.querySelector('[data-marquee-inner]');
    if (!wrapper) return;

    const speed = parseFloat(container.dataset.marqueeSpeed) || 50;
    const direction = container.dataset.marqueeDirection || 'left';

    // Dupliquer le contenu pour un scroll infini
    const content = wrapper.innerHTML;
    wrapper.innerHTML = content + content;

    const totalWidth = wrapper.scrollWidth / 2;
    const xFrom = direction === 'left' ? 0 : -totalWidth;
    const xTo = direction === 'left' ? -totalWidth : 0;

    gsap.fromTo(wrapper, {
      x: xFrom,
    }, {
      x: xTo,
      duration: totalWidth / speed,
      ease: 'none',
      repeat: -1,
    });

    // Pause au hover
    container.addEventListener('mouseenter', () => {
      gsap.to(wrapper, { timeScale: 0, duration: 0.3 });
    });

    container.addEventListener('mouseleave', () => {
      gsap.to(wrapper, { timeScale: 1, duration: 0.3 });
    });
  });
}

/**
 * Barre de progression de scroll
 */
function initScrollProgressBar() {
  const progressBar = document.querySelector('[data-scroll-progress]');
  if (!progressBar) return;

  gsap.to(progressBar, {
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
    },
    scaleX: 1,
    transformOrigin: 'left center',
    ease: 'none',
  });

  progressBar.style.transform = 'scaleX(0)';
}

/**
 * Curseur personnalisé
 * Activé uniquement si data-custom-cursor est présent sur le HTML
 * et si l'appareil supporte le hover (pas mobile/tactile)
 */
function initCustomCursor() {
  // Vérifier si le curseur custom est demandé
  const enableCursor = document.documentElement.hasAttribute('data-custom-cursor');
  if (!enableCursor) return;

  // Ne pas activer sur mobile/tactile
  if ('ontouchstart' in window || window.matchMedia('(hover: none)').matches) {
    document.documentElement.removeAttribute('data-custom-cursor');
    return;
  }

  // Créer les éléments du curseur
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.innerHTML = `
    <div class="custom-cursor__dot"></div>
    <div class="custom-cursor__circle"></div>
  `;
  document.body.appendChild(cursor);

  const cursorDot = cursor.querySelector('.custom-cursor__dot');
  const cursorCircle = cursor.querySelector('.custom-cursor__circle');

  let mouseX = 0;
  let mouseY = 0;
  let isVisible = false;

  // Suivre la souris
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      gsap.to(cursor, { opacity: 1, duration: 0.3 });
    }
  });

  // Cacher quand la souris sort de la fenêtre
  document.addEventListener('mouseleave', () => {
    isVisible = false;
    gsap.to(cursor, { opacity: 0, duration: 0.3 });
  });

  // Animation du curseur
  gsap.ticker.add(() => {
    gsap.set(cursorDot, { x: mouseX, y: mouseY });
    gsap.to(cursorCircle, {
      x: mouseX,
      y: mouseY,
      duration: 0.15,
      ease: 'power2.out',
    });
  });

  // Effet sur les éléments interactifs
  const setupInteractiveElements = () => {
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [data-cursor-hover]');

    interactiveElements.forEach((el) => {
      if (el.dataset.cursorSetup) return;
      el.dataset.cursorSetup = 'true';

      el.addEventListener('mouseenter', () => {
        cursor.classList.add('is-hovering');
      });

      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('is-hovering');
      });
    });
  };

  // Setup initial et observer pour les nouveaux éléments
  setupInteractiveElements();

  // Observer pour les éléments ajoutés dynamiquement
  const observer = new MutationObserver(() => {
    setupInteractiveElements();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Effet au clic
  document.addEventListener('mousedown', () => {
    cursor.classList.add('is-clicking');
  });

  document.addEventListener('mouseup', () => {
    cursor.classList.remove('is-clicking');
  });

  // Initial opacity
  cursor.style.opacity = '0';
}

/**
 * Rafraîchit ScrollTrigger
 */
export function refreshScrollTrigger() {
  ScrollTrigger.refresh();
}

/**
 * Anime un élément manuellement
 */
export function animateElement(element, options = {}) {
  return gsap.to(element, {
    duration: CONFIG.duration.normal,
    ease: CONFIG.ease.premium,
    ...options,
  });
}

/**
 * Crée une timeline d'animation
 */
export function createTimeline(options = {}) {
  return gsap.timeline(options);
}

// Exporter GSAP et ScrollTrigger
export { gsap, ScrollTrigger };
