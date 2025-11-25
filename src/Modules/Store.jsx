import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/InventoryApp/Header';
import CategoryFilter from '../components/InventoryApp/CategoryFilter';
import ViewToggleButton from '../components/InventoryApp/ViewToggleButton';
import ProductGrid from '../components/InventoryApp/ProductGrid';
import SidebarFilters from '../components/InventoryApp/SidebarFilters';
import Footer from '../components/InventoryApp/Footer';
import { useFilter } from '../context/FilterContext';

const Store = () => {
  const navigate = useNavigate();
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    subFilters,
    handleSubFilterChange,
    filteredProducts,
    clearSubFilters
  } = useFilter();

  const [viewMode, setViewMode] = useState('grid');

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  };

  const openProductDetail = (product) => {
    navigate(`/producto/${product.id}`);
  };

  const showSidebar = selectedCategory !== 'Todos';

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <main className="flex-1 w-full px-4 sm:px-6 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex-1">
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
          <ViewToggleButton 
            viewMode={viewMode}
            toggleViewMode={toggleViewMode}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {showSidebar && (
            <aside className="lg:flex-shrink-0">
              <SidebarFilters
                selectedCategory={selectedCategory}
                filters={subFilters}
                onFilterChange={handleSubFilterChange}
                onClearFilters={clearSubFilters}
              />
            </aside>
          )}
          
          <div className="flex-1 min-w-0">
            <ProductGrid 
              products={filteredProducts}
              viewMode={viewMode}
              openModal={openProductDetail}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Store;
