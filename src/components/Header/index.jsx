import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useScrollEffect } from '../../hooks/useScrollEffect';
import ConditionsModal from './ConditionsModal';

import MobileHeaderWrapper from './MobileHeader/MobileHeaderWrapper';
import DesktopHeader from './DesktopHeader';

const Header = ({ onGoHome, className = '' }) => {
  const [showConditionsModal, setShowConditionsModal] = useState(false);
  const location = useLocation();
  const isScrolled = useScrollEffect(20);

  // Detectar si estamos en página de catálogo o PC Builder
  const isCatalogPage = location.pathname.includes('/catalogo') ||
                        location.pathname.includes('/categoria') ||
                        location.pathname.includes('/buscar') ||
                        location.pathname.includes('/producto') ||
                        location.pathname.includes('/puntos-de-retiro');
  const isPCBuilderPage = location.pathname.includes('/armatupc') ||
                          location.pathname.includes('/pc-builder');

  // En desktop el catálogo usa el shell claro del landing (CatalogNav
  // pinta su propio fondo): el header no impone fondo oscuro en sm+.
  // En mobile se conserva el comportamiento oscuro actual.
  const useLandingShell = isCatalogPage || isPCBuilderPage;
  
  // Forzar estado oscuro en catálogo y PC Builder, o usar scroll en otras páginas
  const shouldBeScrolled = isCatalogPage || isPCBuilderPage || isScrolled;
  
  // En PC Builder el header es fijo (no sticky)
  const headerPosition = isPCBuilderPage ? 'relative' : 'sticky';

  return (
    <>
      <ConditionsModal 
        isOpen={showConditionsModal}
        onClose={() => setShowConditionsModal(false)}
      />

      <header 
        className={`
          ${headerPosition} top-0 z-50 w-full
          transition-all duration-300 ease-in-out
          ${shouldBeScrolled
            ? useLandingShell
              ? 'bg-cyber-bg border-b border-cyber-line sm:bg-transparent sm:border-transparent'
              : 'bg-cyber-bg border-b border-cyber-line'
            : 'bg-transparent border-b border-transparent'
          }
          ${className}
        `}
      >
     
        
        <div className={useLandingShell ? 'w-full px-4 py-3 sm:px-0 sm:py-0' : 'w-full px-4 sm:px-6 py-3 sm:py-4'}>
          {/* Mobile Header */}
          <MobileHeaderWrapper 
            onGoHome={onGoHome}
            onConditionsClick={() => setShowConditionsModal(true)}
          />

          {/* Desktop Header */}
          <DesktopHeader 
            onGoHome={onGoHome}
            onConditionsClick={() => setShowConditionsModal(true)}
          />
        </div>
      </header>
    </>
  );
};

export default Header;
