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

        {hasProducts ? (
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
