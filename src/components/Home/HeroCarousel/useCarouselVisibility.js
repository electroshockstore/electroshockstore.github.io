import { useState, useEffect } from 'react';

export const useCarouselVisibility = (carouselRef) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!carouselRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    observer.observe(carouselRef.current);

    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, [carouselRef]);

  return isVisible;
};
