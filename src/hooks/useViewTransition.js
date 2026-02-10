import { useCallback } from 'react';

/**
 * Hook para usar View Transitions API con fallback
 * Proporciona transiciones suaves entre estados con mejor rendimiento
 */
export const useViewTransition = () => {
  const startTransition = useCallback((callback) => {
    // Verificar si el navegador soporta View Transitions API
    if (!document.startViewTransition) {
      // Fallback: ejecutar callback directamente
      callback();
      return;
    }

    // Usar View Transitions API
    document.startViewTransition(() => {
      callback();
    });
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
    });
  }, [startTransition]);

  return navigateWithTransition;
};
