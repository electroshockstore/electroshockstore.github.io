/**
 * Utilidades para View Transitions API.
 * Centraliza el feature-detect y el gating por accesibilidad/rendimiento.
 */

export const supportsViewTransition = () =>
  typeof document !== 'undefined' &&
  typeof document.startViewTransition === 'function';

export const shouldSkipViewTransition = () => {
  if (typeof window === 'undefined') return true;

  const reduceMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const html = document.documentElement;
  const perfLow =
    html.classList.contains('perf-low') || html.classList.contains('is-low-end');

  return reduceMotion || perfLow;
};

export const canUseViewTransition = () =>
  supportsViewTransition() && !shouldSkipViewTransition();

/**
 * Nombre de view-transition para la imagen de un producto.
 */
export const productImageTransitionName = (id) => `product-image-${id}`;

/**
 * Coordinación "detalle montado": permite que la View Transition espere a que
 * la página de detalle (lazy) exista en el DOM antes de capturar el snapshot
 * "nuevo". Determinista, sin depender de rAF (que se throttlea en background).
 */
let resolveDetailMount = null;

export const awaitDetailMount = (timeoutMs = 700) => {
  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolveDetailMount = null;
      resolve();
    };
    resolveDetailMount = finish;
    // Seguridad: nunca colgar la transición
    setTimeout(finish, timeoutMs);
  });
};

export const notifyDetailMounted = () => {
  resolveDetailMount?.();
};
