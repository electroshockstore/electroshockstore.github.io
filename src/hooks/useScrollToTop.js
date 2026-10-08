import { useEffect } from 'react';
import { getAppScroller } from '../context/ScrollContext';

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

    const el = getAppScroller();
    if (el) {
      if (behavior === 'instant' || behavior === 'auto') {
        el.scrollTop = 0;
      } else {
        el.scrollTo({ top: 0, behavior });
      }
      return;
    }

    if (behavior === 'instant' || behavior === 'auto') {
      // 'instant' explícito: ignora el `scroll-behavior: smooth` global del html
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else {
      window.scrollTo({ top: 0, behavior });
    }
  }, dependency !== null ? [dependency] : []); // eslint-disable-line react-hooks/exhaustive-deps
};
