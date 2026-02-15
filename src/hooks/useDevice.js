import { useState, useEffect } from 'react';

/**
 * Hook centralizado para detección de dispositivo y plataforma
 * Evita duplicación de lógica de detección en múltiples componentes
 * 
 * @returns {Object} Información del dispositivo
 * @property {boolean} isIOS - Detecta iOS (iPhone, iPad, iPod)
 * @property {boolean} isAndroid - Detecta Android
 * @property {boolean} isMobile - Detecta mobile por ancho de pantalla
 * @property {boolean} isDesktop - Detecta desktop
 * @property {boolean} isTouch - Detecta capacidad táctil
 */
export const useDevice = () => {
  const [device, setDevice] = useState(() => {
    // Inicialización síncrona para evitar flash
    if (typeof window === 'undefined') {
      return {
        isIOS: false,
        isAndroid: false,
        isMobile: false,
        isDesktop: true,
        isTouch: false
      };
    }

    const ua = navigator.userAgent;
    const isMobile = window.innerWidth <= 768;
    
    return {
      isIOS: /iPad|iPhone|iPod/.test(ua) && !window.MSStream,
      isAndroid: /Android/.test(ua),
      isMobile,
      isDesktop: !isMobile,
      isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setDevice(prev => ({
        ...prev,
        isMobile,
        isDesktop: !isMobile
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return device;
};

/**
 * Hook simplificado solo para iOS
 * Útil cuando solo necesitas detectar iOS
 */
export const useIsIOS = () => {
  const [isIOS] = useState(() => {
    if (typeof window === 'undefined') return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  });
  return isIOS;
};

/**
 * Hook para detectar si es mobile
 * Incluye listener de resize
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};
