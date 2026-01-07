import { useState, useEffect } from 'react';
import SidebarFilters from './SidebarFilters';
import CatalogToolbar from './CatalogToolbar';
import ProductGrid from './ProductGrid';
import EmptyState from './EmptyState';

const CatalogContent = ({
  selectedCategory,
  filters,
  onFilterChange,
  onClearFilters,
  sortOrder,
  onSortChange,
  viewMode,
  onViewModeToggle,
  products,
  onProductClick,
  onReset
}) => {
  const showSidebar = selectedCategory && selectedCategory !== 'Todos';
  const hasProducts = products.length > 0;
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Detectar cuando los productos se cargan por primera vez
  useEffect(() => {
    if (hasProducts && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [hasProducts, isInitialLoad]);

  // Reset loading state cuando cambia la categoría
  useEffect(() => {
    setIsInitialLoad(true);
    // Dar tiempo para que se actualicen los productos
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-[60vh] px-4 sm:px-6 pb-8 pt-4 sm:pt-6">
      {/* Sidebar Desktop */}
      {showSidebar && (
        <aside className="hidden lg:block lg:flex-shrink-0 lg:pt-20">
          <SidebarFilters
            selectedCategory={selectedCategory}
            filters={filters}
            onFilterChange={onFilterChange}
            onClearFilters={onClearFilters}
          />
        </aside>
      )}
      
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <CatalogToolbar
          showFilters={showSidebar}
          selectedCategory={selectedCategory}
          filters={filters}
          onFilterChange={onFilterChange}
          onClearFilters={onClearFilters}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
          viewMode={viewMode}
          onViewModeToggle={onViewModeToggle}
          hasProducts={hasProducts}
        />

        {/* Mostrar loading skeleton durante carga inicial */}
        {isInitialLoad && !hasProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-800/50 rounded-2xl h-80 border border-gray-700/30" />
            ))}
          </div>
        ) : hasProducts ? (
          <ProductGrid 
            products={products}
            viewMode={viewMode}
            openModal={onProductClick}
          />
        ) : (
          <EmptyState onReset={onReset} />
        )}
      </div>
    </div>
  );
};

export default CatalogContent;
