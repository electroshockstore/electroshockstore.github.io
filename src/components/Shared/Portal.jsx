import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Portal Component - Renderiza children en #portal-root (hermano de #root)
 * Esto evita problemas de stacking context en iOS Safari/Webkit
 * 
 * Uso:
 * <Portal>
 *   <div>Contenido del modal</div>
 * </Portal>
 */
const Portal = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const portalRoot = document.getElementById('portal-root');
  if (!portalRoot) {
    console.error('portal-root no encontrado en el DOM');
    return null;
  }

  return createPortal(children, portalRoot);
};

export default Portal;
