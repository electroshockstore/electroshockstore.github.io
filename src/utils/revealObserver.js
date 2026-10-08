/**
 * Reveal on scroll — UN solo IntersectionObserver para TODAS las cards.
 * Antes cada card creaba su propio observer (100+ observers) y usaba clases
 * CSS con transition; acá el observer es compartido y el reveal se hace con
 * la Web Animations API (transform/opacity → compositado en GPU).
 *
 * Mantiene la microinteracción de entrada (fade + slide + scale con rebote)
 * sin costo de re-render ni de observers por card.
 */

const REVEAL_EASING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
const REVEAL_DURATION = 560;

const canAnimate =
  typeof Element !== 'undefined' && typeof Element.prototype.animate === 'function';

const prefersReducedMotion = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const reveal = (element) => {
  // Habilita estado final + hover CSS (la clase gatea los efectos de hover)
  element.classList.add('scroll-revealed');

  if (!canAnimate || prefersReducedMotion()) return;

  const delay = Number(element.dataset.revealDelay) || 0;

  element.animate(
    [
      { opacity: 0, transform: 'translateY(28px) scale(0.96)' },
      { opacity: 1, transform: 'translateY(0) scale(1)' }
    ],
    {
      duration: REVEAL_DURATION,
      easing: REVEAL_EASING,
      delay,
      fill: 'backwards'
    }
  );
};

let observer = null;

// Callbacks pendientes por elemento (se invocan al revelarse)
const revealCallbacks = new Map();

if (typeof IntersectionObserver !== 'undefined') {
  observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target);
        const cb = revealCallbacks.get(entry.target);
        revealCallbacks.delete(entry.target);
        try {
          cb?.();
        } catch {
          // ignorar errores de callbacks
        }
        obs.unobserve(entry.target);
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
}

export const observeReveal = (element, onReveal) => {
  if (!element) return;

  // Ya revelado (p.ej. re-orden por re-render): notificar sin re-animar
  if (element.classList.contains('scroll-revealed')) {
    try {
      onReveal?.();
    } catch {
      // ignorar
    }
    return;
  }

  // Sin observer o con reduced-motion: mostrar inmediatamente (sin animación)
  if (!observer || prefersReducedMotion()) {
    element.classList.add('scroll-revealed');
    try {
      onReveal?.();
    } catch {
      // ignorar
    }
    return;
  }

  if (onReveal) revealCallbacks.set(element, onReveal);
  observer.observe(element);
};

export const unobserveReveal = (element) => {
  if (!element) return;
  revealCallbacks.delete(element);
  if (observer) observer.unobserve(element);
};
