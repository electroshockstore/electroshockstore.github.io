import { useEffect } from 'react';
import { useLenisContext } from '../components/Shared/LenisProvider';

/**
 * Hook para scroll programático con Lenis
 * Wrapper conveniente para scrollTo con opciones predefinidas
 * 
 * @example
 * const { scrollTo, scrollToTop } = useLenisScroll();
 * scrollTo('#section', { offset: -100 });
 * scrollToTop();
 */
export const useLenisScroll = () => {
  const lenis = useLenisContext();

  const scrollTo = (target, options = {}) => {
    if (!lenis) {
      // Fallback a scroll nativo si Lenis no está disponible
      const element = typeof target === 'string' 
        ? document.querySelector(target) 
        : target;
      
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start',
          ...options 
        });
      } else if (typeof target === 'number') {
        window.scrollTo({ 
          top: target, 
          behavior: 'smooth' 
        });
      }
      return;
    }

    lenis.scrollTo(target, {
      offset: 0,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      ...options
    });
  };

  const scrollToTop = (options = {}) => {
    scrollTo(0, options);
  };

  const scrollToElement = (element, options = {}) => {
    scrollTo(element, options);
  };

  return {
    lenis,
    scrollTo,
    scrollToTop,
    scrollToElement,
    start: () => lenis?.start(),
    stop: () => lenis?.stop()
  };
};

/**
 * Hook para escuchar eventos de scroll de Lenis
 * @param {Function} callback - Función a ejecutar en cada scroll
 * @param {Array} deps - Dependencias del efecto
 */
export const useLenisScrollListener = (callback, deps = []) => {
  const lenis = useLenisContext();

  useEffect(() => {
    if (!lenis || !callback) return;

    lenis.on('scroll', callback);

    return () => {
      lenis.off('scroll', callback);
    };
  }, [lenis, callback, ...deps]);
};

export default useLenisScroll;
