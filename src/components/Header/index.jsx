import { useState } from 'react';
import { useFilter } from '../../context/FilterContext';
import { useNavigate } from 'react-router-dom';
import { getSlugFromCategory } from '../../utils/slugify';
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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const slug = getSlugFromCategory(category);
    navigate(`/categoria/${slug}`);
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

      <header className="sticky top-0 z-50 w-full bg-black border-b border-gray-800">
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
                onConditionsClick={() => setShowConditionsModal(true)}
              />
            </div>
            
            {/* Search Input - Mobile */}
            {showMobileSearch && !hideSearchOnMobile && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                <SearchBar isMobile />
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
