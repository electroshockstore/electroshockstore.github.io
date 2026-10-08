import { useState, useEffect } from 'react';
import { getAppScroller } from '../context/ScrollContext';

/**
 * Hook para detectar el scroll y aplicar efectos visuales
 * Lee el scroll del ScrollContainer de la app (con fallback a window).
 * @param {number} threshold - Píxeles de scroll antes de activar el efecto (default: 20)
 * @returns {boolean} - true si el scroll supera el threshold
 */
export const useScrollEffect = (threshold = 20) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const readScrollTop = () => {
      const el = getAppScroller();
      return el ? el.scrollTop : window.scrollY;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(readScrollTop() > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Verificar posición inicial
    handleScroll();

    const el = getAppScroller();
    if (el) {
      el.addEventListener('scroll', handleScroll, { passive: true });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      if (el) {
        el.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return isScrolled;
};
