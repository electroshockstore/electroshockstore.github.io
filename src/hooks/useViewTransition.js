import { useCallback } from 'react';
import { canUseViewTransition } from '../utils/viewTransition';

/**
 * Hook para usar View Transitions API con fallback
 * Proporciona transiciones suaves entre estados con mejor rendimiento
 * (desactivado en perf-low / prefers-reduced-motion)
 */
export const useViewTransition = () => {
  const startTransition = useCallback((callback, options = {}) => {
    const { scrollToTop = false, skipTransition = false } = options;

    // Si se solicita saltar la transición, el navegador no la soporta
    // o el dispositivo/motion lo desaconseja → ejecutar callback directamente
    if (skipTransition || !canUseViewTransition()) {
      const result = callback();
      if (scrollToTop) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
      return result;
    }

    // Usar View Transitions API (soporta callback async: se espera la promesa
    // antes de capturar el estado "nuevo")
    const transition = document.startViewTransition(() => callback());

    // Si se requiere scroll al top, hacerlo después de que el DOM se actualice
    if (scrollToTop) {
      transition.updateCallbackDone.then(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
    }

    return transition;
  }, []);

  return { startTransition };
};

/**
 * Hook para transiciones de navegación con React Router
 */
export const useNavigateWithTransition = () => {
  const { startTransition } = useViewTransition();

  const navigateWithTransition = useCallback((navigateFunction) => {
    startTransition(() => {
      navigateFunction();
    }, { scrollToTop: true });
  }, [startTransition]);

  return navigateWithTransition;
};
