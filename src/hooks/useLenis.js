import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Hook personalizado para Lenis Smooth Scroll
 * Implementación optimizada con mejores prácticas
 * 
 * Features:
 * - Solo activo en desktop (>768px) para mejor performance móvil
 * - Integración con RAF para animaciones fluidas
 * - Cleanup automático
 * - Configuración optimizada para React
 * 
 * @param {Object} options - Configuración de Lenis
 * @returns {Object} - Instancia de Lenis y métodos útiles
 */
export const useLenis = (options = {}) => {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    // Solo activar en desktop para mantener scroll nativo en móvil
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;

    // Configuración optimizada de Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false, // Desactivado en touch para mejor UX
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
      ...options
    });

    lenisRef.current = lenis;

    // Integración con requestAnimationFrame
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
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, [options]);

  return {
    lenis: lenisRef.current,
    scrollTo: (target, options) => lenisRef.current?.scrollTo(target, options),
    start: () => lenisRef.current?.start(),
    stop: () => lenisRef.current?.stop()
  };
};

export default useLenis;
