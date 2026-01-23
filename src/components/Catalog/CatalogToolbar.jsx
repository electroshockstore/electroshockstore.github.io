import { memo } from 'react';
import SortSelector from './SortSelector';
import ViewToggleButton from './ViewToggleButton';
import SidebarFilters from './SidebarFilters';

const CatalogToolbar = memo(({ 
  showFilters,
  selectedCategory,
  filters,
  onFilterChange,
  onClearFilters,
  sortOrder,
  onSortChange,
  viewMode,
  onViewModeToggle,
  hasProducts
}) => {
  if (!hasProducts) return null;

  return (
    <div className="pb-4 sm:pb-6 px-4 sm:px-0 flex justify-between lg:justify-end items-center gap-3">
      {/* Filtros Mobile */}
      {showFilters && (
        <div className="lg:hidden">
          <SidebarFilters
            selectedCategory={selectedCategory}
            filters={filters}
            onFilterChange={onFilterChange}
            onClearFilters={onClearFilters}
          />
        </div>
      )}
      
      {/* Controles de Vista */}
      <div className="flex items-center gap-2 sm:gap-3">
        <SortSelector 
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
        <ViewToggleButton 
          viewMode={viewMode}
          toggleViewMode={onViewModeToggle}
        />
      </div>
    </div>
  );
});

CatalogToolbar.displayName = 'CatalogToolbar';

export default CatalogToolbar;
