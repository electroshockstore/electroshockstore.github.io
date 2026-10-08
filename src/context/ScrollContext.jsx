import {
  createContext,
  useContext,
  useRef,
  useMemo,
  useEffect,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollContainer: el scroll de la app vive en un único contenedor
 * (`[data-app-scroll]`) en lugar del window.
 *
 * Por qué: el scroll del window queda CONGELADO durante una View Transition,
 * así que resetearlo rompe el morph. El scrollTop de un contenedor anidado
 * SÍ aplica dentro del callback, y cada navegación parte de un estado
 * controlado sin heredar el scroll de la página anterior.
 */

// Registro a nivel módulo (funciona también fuera de React)
let appScroller = null;

export const setAppScroller = (el) => {
  appScroller = el;
};

export const getAppScroller = () => {
  if (appScroller) return appScroller;
  if (typeof document !== 'undefined') {
    return document.querySelector('[data-app-scroll]');
  }
  return null;
};

export const getAppScrollTop = () => {
  const el = getAppScroller();
  if (el) return el.scrollTop;
  if (typeof window !== 'undefined') return window.scrollY;
  return 0;
};

/** Scroll instantáneo al tope (evita el smooth global del html). */
export const scrollAppToTop = () => {
  const el = getAppScroller();
  if (el) {
    el.scrollTop = 0;
    return;
  }
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }
};

// Contador de locks (varios modales pueden convivir)
let lockCount = 0;

export const lockAppScroll = () => {
  const el = getAppScroller();
  if (!el) return;
  lockCount += 1;
  el.style.overflow = 'hidden';
};

export const unlockAppScroll = () => {
  const el = getAppScroller();
  if (!el) return;
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) el.style.overflow = '';
};

const ScrollContext = createContext(null);

/**
 * Provee el scroll container. Renderiza el div scrolleable que envuelve
 * el contenido ruteado.
 */
export const ScrollProvider = ({ children }) => {
  const scrollerRef = useRef(null);

  useEffect(() => {
    setAppScroller(scrollerRef.current);
    return () => setAppScroller(null);
  }, []);

  const value = useMemo(
    () => ({
      scrollerRef,
      getScroller: getAppScroller,
      getScrollTop: getAppScrollTop,
      scrollToTop: scrollAppToTop,
    }),
    []
  );

  return (
    <ScrollContext.Provider value={value}>
      <div ref={scrollerRef} data-app-scroll className="app-scroll">
        {children}
      </div>
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);

/**
 * Hook rAF-throttled: true si el scroll del container supera el threshold.
 * Reemplazo de useScrollEffect (que leía window.scrollY).
 */
export const useAppScrolled = (threshold = 20) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = getAppScroller();
    if (!el) {
      setScrolled(typeof window !== 'undefined' && window.scrollY > threshold);
      return;
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(el.scrollTop > threshold);
        ticking = false;
      });
    };

    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
};

/**
 * Resetea el scroll del container en cada cambio de ruta.
 * (Para la navegación producto→detalle con morph, el callback de la
 * View Transition ya lo deja en 0, así que esto es no-op ahí.)
 */
export const ScrollRestoration = () => {
  const location = useLocation();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = getAppScroller();
    if (el) el.scrollTop = 0;
  }, [location.pathname]);

  return null;
};

/** Bloquea el scroll del container mientras `active` (modales, sheets, lightbox). */
export const useLockAppScroll = (active) => {
  useEffect(() => {
    if (!active) return;
    lockAppScroll();
    return () => unlockAppScroll();
  }, [active]);
};

/** Suscribe un handler al scroll del container (con cleanup). */
export const useAppScrollListener = (handler) => {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const el = getAppScroller();
    if (!el) return;
    const onScroll = (e) => handlerRef.current(e, el.scrollTop);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);
};
