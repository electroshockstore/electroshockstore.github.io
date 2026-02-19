import { useEffect, useRef } from 'react';

/**
 * Hook para revelar elementos al hacer scroll (Intersection Observer)
 * Ultra-ligero y optimizado para rendimiento
 * 
 * @param {number} threshold - Porcentaje visible para activar (0-1)
 * @param {string} rootMargin - Margen adicional para activar antes
 * @param {number} delay - Delay en ms para animación escalonada
 * @returns {Object} ref - Ref para asignar al elemento
 */
const useScrollReveal = ({ threshold = 0.1, rootMargin = '50px', delay = 0 } = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Crear observer con configuración optimizada
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Aplicar delay si existe (para animación escalonada)
          setTimeout(() => {
            entry.target.classList.add('scroll-revealed');
          }, delay);
          
          // ⚡ CRÍTICO: Desconectar inmediatamente después de revelar
          // Esto libera recursos y mejora el rendimiento
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
        // Optimización: solo observar una vez
        trackVisibility: false,
      }
    );

    observer.observe(element);

    // Cleanup: desconectar si el componente se desmonta
    return () => observer.disconnect();
  }, [threshold, rootMargin, delay]);

  return ref;
};

export default useScrollReveal;
