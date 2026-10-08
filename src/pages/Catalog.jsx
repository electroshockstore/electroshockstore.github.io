import { useParams } from 'react-router-dom';
import { useFilter } from '../context/FilterContext';
import { useCatalogState } from '../hooks/useCatalogState';
import { useCatalogNavigation } from '../hooks/useCatalogNavigation';
import { useCatalogSync } from '../hooks/useCatalogSync';
import { useCategorySEO } from '../hooks/useSEO';
import { useProductListView, useCategoryTracking } from '../hooks/useAnalytics';
import { useScrollToTop } from '../hooks/useScrollToTop';
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

  // Scroll al inicio al montar la página
  useScrollToTop();

  // Custom Hooks
  const { viewMode, sortOrder, sortedProducts, setSortOrder, toggleViewMode } = useCatalogState(filteredProducts);
  
  const { 
    handleCategoryChange, 
    handleProductClick, 
    handleGoHome, 
    handleReset 
  } = useCatalogNavigation(setSelectedCategory, setSearchQuery, clearSubFilters);

  // Sync URL with state (sin transición)
  useCatalogSync(categorySlug, selectedCategory, setSelectedCategory, clearSubFilters);

  // Analytics
  const listName = selectedCategory && selectedCategory !== 'Todos' 
    ? `Category: ${selectedCategory}` 
    : 'All Products';
  useProductListView(sortedProducts, listName);
  useCategoryTracking(selectedCategory, sortedProducts.length);

  // SEO
  useCategorySEO(selectedCategory, filteredProducts.length);

  return (
    <CatalogLayout
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onGoHome={handleGoHome}
    >
      {/* Category Filter - Solo Desktop */}
      <div className="hidden sm:block px-4 sm:px-6 py-4 sm:py-6 relative z-30">
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Encabezado de resultados de búsqueda (/buscar) */}
      {!selectedCategory && searchQuery.trim() && (
        <div className="px-4 sm:px-6 pt-4 sm:pt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-lg sm:text-2xl font-black text-gray-900">
              Resultados para{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                “{searchQuery.trim()}”
              </span>
            </h1>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-gray-600 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 hover:text-gray-900 active:scale-95 transition-all duration-200"
            >
              Limpiar búsqueda
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {sortedProducts.length}{' '}
            {sortedProducts.length === 1 ? 'resultado' : 'resultados'}
          </p>
        </div>
      )}

      {/* Catalog Content (sin key remount: preserva scroll/DOM al cambiar vista) */}
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
