import { useCallback, useRef } from 'react';

export const useSwipeGesture = (onSwipeLeft, onSwipeRight) => {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        onSwipeLeft();
      } else {
        onSwipeRight();
      }
    }
  }, [onSwipeLeft, onSwipeRight]);

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};
