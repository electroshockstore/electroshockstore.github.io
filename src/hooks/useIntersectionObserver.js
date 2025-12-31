import { useEffect, useRef, useState } from 'react';

/**
 * Hook para detectar cuando un elemento es visible en el viewport
 * Útil para lazy loading de imágenes y componentes
 */
export const useIntersectionObserver = (options = {}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);
        
        if (visible && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '50px',
        ...options
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [hasBeenVisible, options]);

  return { elementRef, isVisible, hasBeenVisible };
};

/**
 * Hook para lazy loading de imágenes
 */
export const useLazyImage = (src, placeholder = '') => {
  const { elementRef, hasBeenVisible } = useIntersectionObserver({
    threshold: 0,
    rootMargin: '200px'
  });

  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (hasBeenVisible && src) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
    }
  }, [hasBeenVisible, src]);

  return { elementRef, imageSrc, isLoaded };
};
