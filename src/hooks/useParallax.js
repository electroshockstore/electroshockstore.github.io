import { useEffect, useRef, useState } from 'react';

/**
 * Hook para parallax sutil y performante
 * Solo usa transform (GPU-accelerated) y requestAnimationFrame
 * 
 * @param {number} speed - Velocidad del parallax (0.1 = muy sutil, 0.5 = notable)
 * @param {boolean} enabled - Si está habilitado (default: true en desktop, false en mobile)
 * @returns {object} - ref para el elemento y style inline
 */
export const useParallax = (speed = 0.2, enabled = true) => {
  const elementRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    // Deshabilitar en mobile para rendimiento
    const isMobile = window.innerWidth < 768;
    if (!enabled || isMobile) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          if (elementRef.current) {
            const rect = elementRef.current.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            const elementTop = rect.top + scrolled;
            const windowHeight = window.innerHeight;
            
            // Solo calcular parallax cuando el elemento está visible
            if (rect.top < windowHeight && rect.bottom > 0) {
              const parallaxOffset = (scrolled - elementTop) * speed;
              setOffset(parallaxOffset);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [speed, enabled]);

  return {
    ref: elementRef,
    style: {
      transform: `translateY(${offset}px)`,
      willChange: 'transform'
    }
  };
};

/**
 * Hook para fade-in al entrar al viewport (Intersection Observer)
 * Más performante que scroll listeners
 * 
 * @param {object} options - Opciones de Intersection Observer
 * @returns {object} - ref y isVisible state
 */
export const useFadeInOnScroll = (options = {}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Una vez visible, dejar de observar para rendimiento
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return {
    ref: elementRef,
    isVisible
  };
};
