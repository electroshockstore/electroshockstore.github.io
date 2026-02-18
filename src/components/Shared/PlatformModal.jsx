import { memo, useEffect, useState } from 'react';
import { useIsIOS } from '../../hooks/useDevice';
import { getModalStyles, getBackdropStyles } from '../../constants/platform';
import Portal from './Portal';

/**
 * Wrapper de modal con estilos optimizados por plataforma
 * iOS FIX: Usa position absolute + scrollY solo para iOS
 * Desktop/Android: Usa position fixed (funciona perfecto)
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

  // Bloquear scroll al abrir modal
  useEffect(() => {
    if (isOpen) {
      if (isIOS) {
        // iOS: Capturar scrollY para position absolute
        const currentScrollY = window.scrollY;
        setScrollY(currentScrollY);
        setViewportHeight(window.innerHeight);
      }
      
      // Bloquear scroll para todas las plataformas
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restaurar scroll
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, isIOS]);

  // Actualizar viewport height en resize (solo iOS)
  useEffect(() => {
    if (!isOpen || !isIOS) return;
    
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, isIOS]);

  if (!isOpen) return null;

  const modalStyles = getModalStyles(isIOS);
  const backdropStyles = getBackdropStyles(isIOS);

  // Estilos condicionales por plataforma
  const backdropPositionStyles = isIOS ? {
    position: 'absolute',
    top: scrollY,
    left: 0,
    right: 0,
    height: viewportHeight
  } : {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };

  const modalPositionStyles = isIOS ? {
    position: 'absolute',
    top: scrollY,
    left: 0,
    right: 0,
    height: viewportHeight
  } : {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };

  return (
    <Portal>
      {/* Backdrop */}
      {showBackdrop && (
        <div
          className={`bg-black/60 transition-opacity duration-300 ${backdropClassName}`}
          style={{
            ...backdropStyles,
            ...backdropPositionStyles
          }}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Modal Container */}
      <div
        className={`flex items-center justify-center p-3 sm:p-4 pointer-events-none ${className}`}
        style={{ 
          ...modalStyles, 
          ...style,
          ...modalPositionStyles
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
