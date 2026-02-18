import { useState, useEffect } from 'react';

/**
 * Hook para detectar el scroll y aplicar efectos visuales
 * @param {number} threshold - Píxeles de scroll antes de activar el efecto (default: 20)
 * @returns {boolean} - true si el scroll supera el threshold
 */
export const useScrollEffect = (threshold = 20) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Verificar posición inicial
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return isScrolled;
};
