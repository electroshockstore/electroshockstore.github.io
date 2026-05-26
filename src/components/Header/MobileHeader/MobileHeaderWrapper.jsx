import { useState } from 'react';
import { useFilter } from '../../../context/FilterContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { getSlugFromCategory } from '../../../utils/slugify';
import CategoryFilter from '../../Catalog/CategoryFilter';
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
      {/* Modal de categorías */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-[100] sm:hidden">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setShowCategoryModal(false)}
          />
          
          <div className="absolute inset-x-0 top-0 max-h-[80vh] overflow-y-auto bg-gradient-to-b from-gray-900 via-gray-900 to-black rounded-b-3xl shadow-2xl animate-in slide-in-from-top duration-300 border-b-2 border-purple-500/30">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black text-white">Todas las categorías</h3>
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="p-2 bg-gray-800/80 hover:bg-gray-700/80 rounded-xl transition-all"
                >
                  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <CategoryFilter 
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryClick}
              />
            </div>
          </div>
        </div>
      )}

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
