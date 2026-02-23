import { useEffect, useRef, useState } from 'react';

/**
 * Hook para detectar cuando un elemento entra en el viewport
 * @param {Object} options - Opciones del IntersectionObserver
 * @returns {[React.Ref, boolean]} - [ref para el elemento, isInView]
 */
const useInViewport = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Solo activar una vez cuando entra
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.1, // Activar cuando 10% es visible
        rootMargin: '0px 0px -50px 0px', // Activar un poco antes
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [isInView, options]);

  return [ref, isInView];
};

export default useInViewport;
