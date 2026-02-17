import { memo, useEffect, useState } from 'react';
import { useIsIOS } from '../../hooks/useDevice';
import { getModalStyles, getBackdropStyles } from '../../constants/platform';
import Portal from './Portal';

/**
 * Wrapper de modal con estilos optimizados por plataforma
 * iOS FIX: Usa position absolute + top scrollY en lugar de fixed
 */
const PlatformModal = memo(({ 
  isOpen, 
  onClose, 
  children, 
  className = '',
  style = {},
  showBackdrop = true,
  backdropClassName = ''
}) => {
  const isIOS = useIsIOS();
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  // Capturar scrollY y bloquear scroll al abrir
  useEffect(() => {
    if (isOpen) {
      // Capturar posición actual
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setViewportHeight(window.innerHeight);
      
      // Bloquear scroll SIN position fixed
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'relative';
      
      return () => {
        // Restaurar scroll
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.style.position = '';
      };
    }
  }, [isOpen]);

  // Actualizar viewport height en resize
  useEffect(() => {
    if (!isOpen) return;
    
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  if (!isOpen) return null;

  const modalStyles = getModalStyles(isIOS);
  const backdropStyles = getBackdropStyles(isIOS);

  return (
    <Portal>
      {/* Backdrop */}
      {showBackdrop && (
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${backdropClassName}`}
          style={{
            ...backdropStyles,
            top: scrollY,
            left: 0,
            right: 0,
            height: viewportHeight
          }}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Modal Container - position absolute con top scrollY */}
      <div
        className={`absolute inset-0 flex items-center justify-center p-3 sm:p-4 pointer-events-none ${className}`}
        style={{ 
          ...modalStyles, 
          ...style,
          top: scrollY,
          left: 0,
          right: 0,
          height: viewportHeight
        }}
        role="dialog"
        aria-modal="true"
      >
        <div className="pointer-events-auto">
          {children}
        </div>
      </div>
    </Portal>
  );
});

PlatformModal.displayName = 'PlatformModal';

export default PlatformModal;
