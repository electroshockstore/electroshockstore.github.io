import { useCallback, useEffect, useRef, useState } from 'react';
import { getAppScroller } from '../../../context/ScrollContext';

/**
 * Colapsa el header mobile al scrollear hacia abajo y lo restaura al subir
 * (o al volver arriba). Solo afecta al header mobile.
 *
 * @param {number} threshold - px a partir de los cuales puede colapsar
 * @returns {boolean} collapsed
 */
export const useCollapseOnScroll = (threshold = 140) => {
  const [collapsed, setCollapsed] = useState(false);
  const lastY = useRef(0);
  const collapsedRef = useRef(false);
  const lockUntil = useRef(0);

  // Cambia el estado ignorando los eventos de scroll auto-inducidos
  // (al colapsar, el contenido se achica y el navegador recorta scrollTop,
  // lo que se leería como "subir" y re-expandiría en loop).
  const setCollapsedSafe = useCallback((value) => {
    if (collapsedRef.current === value) return;
    collapsedRef.current = value;
    lockUntil.current = performance.now() + 350;
    setCollapsed(value);
  }, []);

  useEffect(() => {
    let el = getAppScroller();
    lastY.current = el ? el.scrollTop : window.scrollY;

    let ticking = false;
    const HYST = 6;

    const update = () => {
      ticking = false;
      // Re-resolver una sola vez por si el scroller montó después que este efecto
      if (!el) {
        el = getAppScroller();
        if (el) {
          lastY.current = el.scrollTop;
          el.addEventListener('scroll', onScroll, { passive: true });
        }
      }
      const y = el ? el.scrollTop : window.scrollY;
      const prev = lastY.current;
      lastY.current = y;

      // Lockout: ignorar cambios justo después de colapsar/expandir
      if (performance.now() < lockUntil.current) return;

      if (y < threshold) {
        setCollapsedSafe(false);
      } else if (y > prev + HYST) {
        setCollapsedSafe(true); // bajando: esconder
      } else if (y < prev - HYST) {
        setCollapsedSafe(false); // subiendo: mostrar
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    if (el) el.addEventListener('scroll', onScroll, { passive: true });
    // Respaldo: window en capture también recibe los scrolls del container
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    return () => {
      if (el) el.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', onScroll, { capture: true });
    };
  }, [threshold, setCollapsedSafe]);

  return collapsed;
};

export default useCollapseOnScroll;
