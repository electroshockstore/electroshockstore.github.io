import { useEffect } from 'react';

/**
 * Hook para hacer scroll al inicio de la página
 * @param {*} dependency - Dependencia que dispara el scroll (opcional)
 * @param {Object} options - Opciones de configuración
 * @param {string} options.behavior - 'smooth', 'instant', o 'auto' (default: 'instant')
 * @param {boolean} options.enabled - Si el scroll está habilitado (default: true)
 */
export const useScrollToTop = (dependency = null, options = {}) => {
  const { behavior = 'instant', enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;
    
    // Si hay dependencia, solo hacer scroll si tiene valor truthy
    if (dependency !== null && !dependency) return;

    if (behavior === 'instant' || behavior === 'auto') {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior });
    }
  }, dependency !== null ? [dependency] : []); // eslint-disable-line react-hooks/exhaustive-deps
};
