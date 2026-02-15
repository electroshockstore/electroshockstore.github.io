import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Provider de Lenis - Instancia GLOBAL
 * window.lenis disponible inmediatamente
 * Solo activo en desktop (>768px)
 */
export const LenisProvider = ({ children }) => {
  const rafRef = useRef(null);

  useEffect(() => {
    // Detectar móvil - CRÍTICO: debe ser null en mobile
    const isMobile = window.innerWidth <= 768 || 
                     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      console.log('[Lenis] Móvil detectado - Desactivado completamente');
      window.lenis = null;
      return;
    }

    console.log('[Lenis] Desktop detectado - Inicializando smooth scroll');

    // Crear instancia GLOBAL solo en desktop
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
    });

    // GLOBAL - Disponible inmediatamente para todos los componentes
    window.lenis = lenis;

    // RAF loop
    function raf(time) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (window.lenis) {
        window.lenis.destroy();
        window.lenis = null;
      }
    };
  }, []);

  return children;
};

export default LenisProvider;
