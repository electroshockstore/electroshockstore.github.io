import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { detectPlatform, LENIS_CONFIG } from '../../constants/platform';

/**
 * Provider de Lenis - Instancia GLOBAL de smooth scroll
 * window.lenis disponible inmediatamente para todos los componentes
 * 
 * Configuración:
 * - Desktop (>768px): Smooth scroll activo
 * - Mobile (≤768px): Desactivado, usa scroll nativo
 * 
 * Uso en componentes:
 * - window.lenis?.stop() - Pausar scroll (modales)
 * - window.lenis?.start() - Reanudar scroll
 * - window.lenis?.scrollTo(target) - Scroll programático
 */
export const LenisProvider = ({ children }) => {
  const rafRef = useRef(null);

  useEffect(() => {
    const { isMobile } = detectPlatform();
    
    if (isMobile) {
      console.log('[Lenis] Móvil detectado - Desactivado completamente');
      window.lenis = null;
      return;
    }

    console.log('[Lenis] Desktop detectado - Inicializando smooth scroll');

    // Crear instancia GLOBAL solo en desktop
    const lenis = new Lenis(LENIS_CONFIG.DESKTOP);

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
