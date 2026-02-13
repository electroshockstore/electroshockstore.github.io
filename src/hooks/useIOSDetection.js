import { useEffect } from 'react';

/**
 * Hook para detectar iOS y agregar clase CSS al body
 * Esto permite aplicar estilos específicos para iOS Safari/Webkit
 */
const useIOSDetection = () => {
  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    if (isIOS) {
      document.body.classList.add('is-ios');
      console.log('iOS detectado, aplicando estilos específicos');
    } else {
      document.body.classList.remove('is-ios');
    }
    
    // También detectar WebKit (Safari en iOS)
    const isWebKit = 'WebkitAppearance' in document.documentElement.style;
    if (isWebKit) {
      document.body.classList.add('is-webkit');
    } else {
      document.body.classList.remove('is-webkit');
    }
    
    // Detectar si es un dispositivo táctil
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      document.body.classList.add('is-touch');
    } else {
      document.body.classList.remove('is-touch');
    }
    
    return () => {
      document.body.classList.remove('is-ios', 'is-webkit', 'is-touch');
    };
  }, []);
};

export default useIOSDetection;