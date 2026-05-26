import { useState } from 'react';
import { useFilter } from '../../../context/FilterContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { getSlugFromCategory } from '../../../utils/slugify';
import { categories } from '../../../data';
import CategoryModal from '../../Catalog/CategoryFilter/CategoryModal';
import SearchBar from '../SearchBar';
import MobileHeader from './index';

const MobileHeaderWrapper = ({ onGoHome, onConditionsClick }) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const { selectedCategory, setSelectedCategory } = useFilter();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCategoryClick = (category) => {
    const targetPath = `/categoria/${getSlugFromCategory(category)}`;
    
    if (location.pathname === targetPath) {
      return;
    }
    
    setSelectedCategory(category);
    navigate(targetPath);
    setShowCategoryModal(false);
  };

  const handleGoHome = () => {
    if (location.pathname === '/') {
      return;
    }
    navigate('/');
    onGoHome?.();
  };

  const handleSearchToggle = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  const handleCategoryModalToggle = () => {
    setShowCategoryModal(!showCategoryModal);
  };

  return (
    <>
      {/* Modal de categorías - Directo sin CategoryFilter */}
      <CategoryModal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategoryClick}
      />

      {/* Header Mobile */}
      <div className="sm:hidden">
        {!showMobileSearch ? (
          <MobileHeader 
            onGoHome={handleGoHome}
            onConditionsClick={onConditionsClick}
            onCategoryClick={handleCategoryModalToggle}
            onSearchClick={handleSearchToggle}
          />
        ) : (
          <div className="animate-in fade-in slide-in-from-top-2 duration-200">
            <SearchBar isMobile onClose={handleSearchToggle} />
          </div>
        )}
      </div>
    </>
  );
};

export default MobileHeaderWrapper;
