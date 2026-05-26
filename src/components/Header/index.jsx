import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useScrollEffect } from '../../hooks/useScrollEffect';
import ConditionsModal from './ConditionsModal';

import MobileHeaderWrapper from './MobileHeader/MobileHeaderWrapper';
import DesktopHeader from './DesktopHeader';

const Header = ({ onGoHome }) => {
  const [showConditionsModal, setShowConditionsModal] = useState(false);
  const location = useLocation();
  const isScrolled = useScrollEffect(20);

  // Detectar si estamos en página de catálogo o PC Builder
  const isCatalogPage = location.pathname.includes('/catalogo') || 
                        location.pathname.includes('/categoria');
  const isPCBuilderPage = location.pathname.includes('/armatupc') || 
                          location.pathname.includes('/pc-builder');
  
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
            ? 'bg-black border-b border-gray-800' 
            : 'bg-transparent border-b border-transparent'
          }
        `}
      >
    
        
        <div className="w-full px-4 sm:px-6 py-3 sm:py-4">
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
