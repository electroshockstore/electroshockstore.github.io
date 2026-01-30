import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop - Componente que hace scroll al inicio en cada cambio de ruta
 * Usa 'instant' para evitar animaciones que puedan causar problemas en mobile
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll instantáneo al inicio en cada cambio de ruta
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
