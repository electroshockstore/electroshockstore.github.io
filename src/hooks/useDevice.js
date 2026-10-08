import { useState } from 'react';

/**
 * Hook simplificado solo para iOS
 * Único export vivo (verificado: CategoryFilter, CategoryModalGrid,
 * PlatformModal y useLightbox solo usan useIsIOS).
 * La detección genérica vive en utils/deviceDetection.js.
 */
export const useIsIOS = () => {
  const [isIOS] = useState(() => {
    if (typeof window === 'undefined') return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  });
  return isIOS;
};
