import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Portal from '../Portal';
import MainButton from './MainButton';
import ExpandedMenu from './ExpandedMenu';
import ConditionsModal from './ConditionsModal';
import FloatingParticles from './FloatingParticles';
import { useVisualViewport } from '../../../hooks/useVisualViewport';

/**
 * FloatingChatButton - Botón flotante de WhatsApp con menú expandible
 * Arquitectura modular con componentes separados
 * 
 * ANDROID CHROME FIX:
 * - Usa Visual Viewport API para posicionamiento correcto desde el inicio
 * - Evita el bug de la URL bar que causa mal posicionamiento en carga inicial
 */
const FloatingChatButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showConditionsModal, setShowConditionsModal] = useState(false);
  const [showButton, setShowButton] = useState(true); // Visible inmediatamente
  const [showHint, setShowHint] = useState(false);
  const location = useLocation();
  const containerRef = useRef(null);

  // Fix para Android Chrome URL bar bug
  useVisualViewport(containerRef, 24, 56, { side: 'left', sideOffset: 24 });

  // Ocultar en PC Builder (tiene su propio botón)
  const isPCBuilderPage = location.pathname.includes('/armatupc') || 
                          location.pathname.includes('/pc-builder');

  // Mostrar hint después de que el componente monte
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 3000);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Bloquear scroll cuando el menú está expandido
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [isExpanded]);

  // Bloquear scroll cuando modal está abierto
  useEffect(() => {
    if (showConditionsModal) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [showConditionsModal]);

  if (isPCBuilderPage) return null;

  const toggleExpanded = () => setIsExpanded(!isExpanded);
  const closeMenu = () => setIsExpanded(false);
  const openConditionsModal = () => {
    setShowConditionsModal(true);
    setIsExpanded(false);
  };
  const closeConditionsModal = () => setShowConditionsModal(false);

  return (
    <>
      {/* Modal de Condiciones */}
      <ConditionsModal 
        isOpen={showConditionsModal}
        onClose={closeConditionsModal}
      />

      <Portal>
        {/* Backdrop más oscuro cuando está expandido */}
        {isExpanded && (
          <div
            className="fixed inset-0 bg-black/85 z-[99998] animate-in fade-in duration-300"
            onClick={closeMenu}
          />
        )}

        <div ref={containerRef} className={isPCBuilderPage ? 'floating-button-fixed-right' : 'floating-button-fixed'}>
          <div style={{ position: 'relative' }}>
            {/* Menú Expandido */}
            {isExpanded && (
              <ExpandedMenu 
                onWhatsAppClick={closeMenu}
                onConditionsClick={openConditionsModal}
              />
            )}

            {/* Botón Principal */}
            <MainButton
              isExpanded={isExpanded}
              showButton={showButton}
              showHint={showHint}
              onClick={toggleExpanded}
            />

            {/* Partículas flotantes */}
            {!isExpanded && showButton && <FloatingParticles />}
          </div>
        </div>
      </Portal>
    </>
  );
};

export default FloatingChatButton;
