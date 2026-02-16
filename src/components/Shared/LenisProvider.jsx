import { useEffect } from 'react';

/**
 * SmoothScrollProvider - Scroll suave nativo optimizado para ecommerce
 * 
 * Ventajas sobre Lenis:
 * - 0 overhead de JavaScript
 * - 0 RAF loops
 * - Performance nativa del navegador
 * - Compatible con todos los navegadores modernos
 * 
 * Configuración CSS optimizada para ecommerce:
 * - scroll-behavior: smooth (transiciones suaves)
 * - scroll-padding-top: para headers sticky
 * - Optimizaciones de scrollbar
 */
export const SmoothScrollProvider = ({ children }) => {
  useEffect(() => {
    console.log('[SmoothScroll] Scroll nativo optimizado activado');
    
    // Configurar scroll suave en el root
    const root = document.documentElement;
    root.style.scrollBehavior = 'smooth';
    
    // Optimizaciones adicionales para mejor UX
    root.style.scrollPaddingTop = '80px'; // Espacio para header sticky
    
    // Cleanup
    return () => {
      root.style.scrollBehavior = '';
      root.style.scrollPaddingTop = '';
    };
  }, []);

  return children;
};

export default SmoothScrollProvider;
