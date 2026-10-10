import { useParams } from 'react-router-dom';
import { useFilter } from '../context/FilterContext';
import { useCatalogState } from '../hooks/useCatalogState';
import { useCatalogNavigation } from '../hooks/useCatalogNavigation';
import { useCatalogSync } from '../hooks/useCatalogSync';
import { useCategorySEO } from '../hooks/useSEO';
import { useProductListView, useCategoryTracking } from '../hooks/useAnalytics';
import { useScrollToTop } from '../hooks/useScrollToTop';
import CatalogLayout from '../components/Catalog/CatalogLayout';
import SectionTitle from '../components/Shared/SectionTitle';
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

  // SEO (/buscar no se indexa: resultados efímeros)
  useCategorySEO(selectedCategory, filteredProducts.length, {
    robots: categorySlug ? undefined : 'noindex, follow',
  });

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

      {/* Encabezado firma: categoría o resultados de búsqueda (/buscar) */}
      {(selectedCategory || searchQuery.trim()) && (
        <div className="px-4 sm:px-6 pt-4 sm:pt-6">
          {selectedCategory ? (
            <SectionTitle
              as="h1"
              tone="dark"
              eyebrow={`Catálogo · ${sortedProducts.length} ${
                sortedProducts.length === 1 ? 'producto' : 'productos'
              }`}
              titleTop={selectedCategory.toUpperCase()}
              titleAccent={`${sortedProducts.length} ${
                sortedProducts.length === 1 ? 'PRODUCTO' : 'PRODUCTOS'
              }`}
            />
          ) : (
            <SectionTitle
              as="h1"
              tone="dark"
              eyebrow={`Búsqueda · ${sortedProducts.length} ${
                sortedProducts.length === 1 ? 'resultado' : 'resultados'
              }`}
              titleTop="Resultados"
              titleAccent={`“${searchQuery.trim()}”`}
              action={
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 active:scale-95 sm:text-sm"
                >
                  Limpiar búsqueda
                </button>
              }
            />
          )}
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
