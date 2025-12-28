import { useParams } from 'react-router-dom';
import { useFilter } from '../context/FilterContext';
import { useCatalogState } from '../hooks/useCatalogState';
import { useCatalogNavigation } from '../hooks/useCatalogNavigation';
import { useCatalogSync } from '../hooks/useCatalogSync';
import { useCategorySEO } from '../hooks/useSEO';
import { useProductListView, useCategoryTracking } from '../hooks/useAnalytics';
import CatalogLayout from '../components/Catalog/CatalogLayout';
import CategoryFilter from '../components/Catalog/CategoryFilter';
import CatalogContent from '../components/Catalog/CatalogContent';

const Catalog = () => {
  const { categorySlug } = useParams();
  
  // Context
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

  // Custom Hooks
  const { viewMode, sortOrder, sortedProducts, setSortOrder, toggleViewMode } = useCatalogState(filteredProducts);
  
  const { 
    handleCategoryChange, 
    handleProductClick, 
    handleGoHome, 
    handleReset 
  } = useCatalogNavigation(setSelectedCategory, setSearchQuery, clearSubFilters);

  // Sync URL with state
  const isTransitioning = useCatalogSync(categorySlug, selectedCategory, setSelectedCategory, clearSubFilters);

  // Analytics
  const listName = selectedCategory && selectedCategory !== 'Todos' 
    ? `Category: ${selectedCategory}` 
    : 'All Products';
  useProductListView(sortedProducts, listName);
  useCategoryTracking(selectedCategory, sortedProducts.length);

  // SEO
  useCategorySEO(selectedCategory, filteredProducts.length);

  // No mostrar contenido durante la transición
  if (isTransitioning) {
    return (
      <CatalogLayout
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onGoHome={handleGoHome}
      >
        <div className="px-4 sm:px-6 py-4 sm:py-6 relative z-30">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </CatalogLayout>
    );
  }

  return (
    <CatalogLayout
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onGoHome={handleGoHome}
    >
      {/* Category Filter */}
      <div className="px-4 sm:px-6 py-4 sm:py-6 relative z-30">
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Catalog Content */}
      <CatalogContent
        selectedCategory={selectedCategory}
        filters={subFilters}
        onFilterChange={handleSubFilterChange}
        onClearFilters={clearSubFilters}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        viewMode={viewMode}
        onViewModeToggle={toggleViewMode}
        products={sortedProducts}
        onProductClick={handleProductClick}
        onReset={handleReset}
      />
    </CatalogLayout>
  );
};

export default Catalog;
