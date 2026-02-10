import { useCallback } from 'react';

/**
 * Hook para usar View Transitions API con fallback
 * Proporciona transiciones suaves entre estados con mejor rendimiento
 */
export const useViewTransition = () => {
  const startTransition = useCallback((callback, options = {}) => {
    const { scrollToTop = false } = options;

    // Verificar si el navegador soporta View Transitions API
    if (!document.startViewTransition) {
      // Fallback: ejecutar callback directamente
      callback();
      if (scrollToTop) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
      return;
    }

    // Usar View Transitions API
    const transition = document.startViewTransition(() => {
      callback();
    });

    // Si se requiere scroll al top, hacerlo después de que el DOM se actualice
    if (scrollToTop) {
      transition.updateCallbackDone.then(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
    }
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
