import { useEffect, useRef, useState } from 'react';

/**
 * Hook optimizado para Scroll Reveal - Versión sutil y profesional
 * Aplica diferentes efectos cuando el elemento entra en viewport
 * Solo desktop (≥769px) para mantener performance en mobile
 * 
 * @param {Object} options - Configuración del scroll reveal
 * @param {number} options.threshold - Porcentaje visible para activar (default: 0.1)
 * @param {string} options.rootMargin - Margen del viewport (default: '0px 0px -50px 0px')
 * @param {boolean} options.triggerOnce - Activar solo una vez (default: true)
 * @param {string} options.animation - Tipo de animación (default: 'fade-in')
 */
const useScrollReveal = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    animation = 'fade-in'
  } = options;

  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // En mobile, mostrar inmediatamente
    if (window.innerWidth < 769) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { 
    elementRef, 
    isVisible,
    className: `scroll-reveal ${isVisible ? `is-visible ${animation}` : ''}`
  };
};

export default useScrollReveal;
