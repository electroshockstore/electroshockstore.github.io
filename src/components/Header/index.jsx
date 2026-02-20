import { useState } from 'react';
import { useFilter } from '../../context/FilterContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { getSlugFromCategory } from '../../utils/slugify';
import { useScrollEffect } from '../../hooks/useScrollEffect';
import CategoryFilter from '../Catalog/CategoryFilter';
import ConditionsModal from './ConditionsModal';
import PromoCarousel from './PromoCarousel';
import SearchBar from './SearchBar';
import Logo from './Logo';
import HeaderActions from './HeaderActions';

const Header = ({ searchQuery = '', onSearchChange, onGoHome, hideSearchOnMobile = false }) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showConditionsModal, setShowConditionsModal] = useState(false);
  const { selectedCategory, setSelectedCategory } = useFilter();
  const navigate = useNavigate();
  const location = useLocation();
  const isScrolled = useScrollEffect(20);

  // Detectar si estamos en página de catálogo
  const isCatalogPage = location.pathname.includes('/catalogo') || 
                        location.pathname.includes('/categoria');
  
  // Forzar estado oscuro en catálogo, o usar scroll en otras páginas
  const shouldBeScrolled = isCatalogPage || isScrolled;

  const handleCategoryClick = (category) => {
    const targetPath = `/categoria/${getSlugFromCategory(category)}`;
    
    // No navegar si ya estás en la ruta
    if (location.pathname === targetPath) {
      return;
    }
    
    setSelectedCategory(category);
    navigate(targetPath);
  };

  const handleSearchToggle = () => {
    setShowMobileSearch(true);
  };

  const handleSearchClose = () => {
    setShowMobileSearch(false);
  };

  return (
    <>
      <ConditionsModal 
        isOpen={showConditionsModal}
        onClose={() => setShowConditionsModal(false)}
      />

      <header 
        className={`
          block w-full z-50
          transition-all duration-500 ease-out
          ${shouldBeScrolled 
            ? 'bg-black/95 border-b border-gray-800 shadow-lg shadow-black/20' 
            : 'bg-transparent border-b border-transparent'
          }
        `}
        style={{
          position: 'relative',
          willChange: 'background-color, border-color'
        }}
      >
        {/* PromoCarousel arriba de todo */}
        <PromoCarousel />
        
        <div className="w-full px-4 sm:px-6 py-3 sm:py-4">
          {/* Layout mobile */}
          <div className="flex flex-col gap-3 sm:hidden">
            <div className="flex items-center justify-between gap-2">
              <Logo onGoHome={onGoHome} isMobile />
              <HeaderActions 
                isMobile
                showMobileSearch={showMobileSearch}
                onSearchToggle={handleSearchToggle}
                onSearchClose={handleSearchClose}
                onConditionsClick={() => setShowConditionsModal(true)}
              />
            </div>
            
            {/* Search Input - Mobile */}
            {showMobileSearch && !hideSearchOnMobile && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                <SearchBar isMobile onClose={handleSearchClose} />
              </div>
            )}
            
            {/* CategoryFilter - Mobile */}
            {!showMobileSearch && !hideSearchOnMobile && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                <CategoryFilter 
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryClick}
                />
              </div>
            )}
          </div>

          {/* Layout desktop */}
          <div className="hidden sm:flex items-center justify-between gap-6">
            <Logo onGoHome={onGoHome} />
            <SearchBar />
            <HeaderActions 
              onConditionsClick={() => setShowConditionsModal(true)}
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
