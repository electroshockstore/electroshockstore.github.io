import { useEffect, useRef, useState } from 'react';

/**
 * Hook para detectar cuando un elemento entra en el viewport
 * @param {Object} options - Opciones del IntersectionObserver
 * @returns {[React.Ref, boolean]} - [ref para el elemento, isInView]
 */
const useInViewport = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Verificar si el elemento ya está en viewport al montar
    const rect = element.getBoundingClientRect();
    const isInitiallyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isInitiallyVisible) {
      setIsInView(true);
      setHasAnimated(true);
      return; // No crear observer si ya es visible
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Solo activar una vez cuando entra
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [hasAnimated, options]);

  return [ref, isInView];
};

export default useInViewport;
