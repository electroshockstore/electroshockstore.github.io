import { useEffect } from 'react';

/**
 * useVisualViewport - Fix para Android Chrome URL bar bug
 * 
 * Android Chrome tiene un bug donde position: fixed con bottom: Xpx
 * se posiciona relativo al viewport incluyendo la URL bar en la carga inicial.
 * Cuando scrolleas, la barra colapsa y los elementos se reposicionan.
 * 
 * Este hook usa la Visual Viewport API para posicionar correctamente
 * los elementos fixed desde el inicio, sin esperar al primer scroll.
 * 
 * @param {React.RefObject} elementRef - Ref al elemento con position: fixed
 * @param {number} bottomOffset - Offset desde el bottom en píxeles (default: 24)
 * @param {number} elementHeight - Altura aproximada del elemento (default: 56)
 * @param {Object} options - Opciones adicionales { side: 'left' | 'right', sideOffset: 24 }
 * @param {Array} dependencies - Dependencias adicionales para re-ejecutar el efecto
 */
export function useVisualViewport(
  elementRef, 
  bottomOffset = 24, 
  elementHeight = 56, 
  options = {},
  dependencies = []
) {
  const { side = 'left', sideOffset = 24 } = options;
  
  useEffect(() => {
    // Solo aplicar en Android
    const isAndroid = /Android/i.test(navigator.userAgent);
    if (!isAndroid || !window.visualViewport) return;

    const updatePosition = () => {
      if (!elementRef.current) return;
      
      const vv = window.visualViewport;
      
      // Calcular posición desde top usando el visual viewport real
      // Esto evita el bug de la URL bar
      const topPosition = vv.offsetTop + vv.height - elementHeight - bottomOffset;
      
      // Aplicar posiciones
      elementRef.current.style.top = `${topPosition}px`;
      elementRef.current.style.bottom = 'auto';
      
      // También forzar la posición horizontal para evitar que se salga del viewport
      if (side === 'right') {
        elementRef.current.style.right = `${sideOffset}px`;
        elementRef.current.style.left = 'auto';
      } else {
        elementRef.current.style.left = `${sideOffset}px`;
        elementRef.current.style.right = 'auto';
      }
    };

    // Ejecutar inmediatamente en el montaje
    updatePosition();
    
    // Double-call con delay para Android Chrome initial render bug
    const timer = setTimeout(updatePosition, 100);

    // Actualizar cuando el viewport cambie (URL bar collapse/expand)
    window.visualViewport.addEventListener('resize', updatePosition);
    window.visualViewport.addEventListener('scroll', updatePosition);

    return () => {
      clearTimeout(timer);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updatePosition);
        window.visualViewport.removeEventListener('scroll', updatePosition);
      }
    };
  }, [elementRef, bottomOffset, elementHeight, side, sideOffset, ...dependencies]);
}
