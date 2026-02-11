import { useState, useEffect } from 'react';

/**
 * Hook para detectar dispositivos iOS (iPhone, iPad, iPod)
 * Retorna true si el dispositivo es iOS, false en caso contrario
 */
const useIOSDetection = () => {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detectar iOS usando userAgent
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(iOS);
  }, []);

  return isIOS;
};

export default useIOSDetection;
