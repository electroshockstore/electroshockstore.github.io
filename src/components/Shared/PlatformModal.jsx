import { memo, useEffect } from 'react';
import { useIsIOS } from '../../hooks/useDevice';
import { getModalStyles, getBackdropStyles } from '../../constants/platform';
import Portal from './Portal';

/**
 * Wrapper de modal con estilos optimizados por plataforma
 * Abstrae la complejidad de iOS vs Android vs Desktop
 * 
 * @param {boolean} isOpen - Estado del modal
 * @param {function} onClose - Callback al cerrar
 * @param {ReactNode} children - Contenido del modal
 * @param {string} className - Clases adicionales para el contenedor
 * @param {Object} style - Estilos adicionales
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

  // Agregar/remover clase modal-open del body para iOS
  useEffect(() => {
    if (isOpen && isIOS) {
      const scrollY = window.scrollY;
      document.body.classList.add('modal-open');
      document.body.style.top = `-${scrollY}px`;
      
      return () => {
        document.body.classList.remove('modal-open');
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen, isIOS]);

  if (!isOpen) return null;

  const modalStyles = getModalStyles(isIOS);
  const backdropStyles = getBackdropStyles(isIOS);

  return (
    <Portal>
      {/* Backdrop */}
      {showBackdrop && (
        <div
          className={`fixed inset-0 bg-black/60 transition-opacity duration-300 ${backdropClassName}`}
          style={{
            ...backdropStyles,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Modal Container */}
      <div
        className={`fixed inset-0 flex items-center justify-center p-3 sm:p-4 pointer-events-none ${className}`}
        style={{ 
          ...modalStyles, 
          ...style,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
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
