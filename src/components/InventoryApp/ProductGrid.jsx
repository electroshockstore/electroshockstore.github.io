import React, { memo, useCallback, useMemo } from 'react';
import ProductCard from './ProductCard/index';

const EmptyState = memo(() => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="text-gray-400 text-6xl mb-4">📦</div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron productos</h3>
    <p className="text-gray-500">Intenta con otros términos de búsqueda o filtros</p>
  </div>
));

EmptyState.displayName = 'EmptyState';

const ProductGrid = memo(({ products, viewMode, openModal }) => {
  // Memoizar el handler de modal
  const handleOpenModal = useCallback((product) => {
    openModal(product);
  }, [openModal]);

  // Memoizar las clases CSS del grid - Responsive mejorado
  const gridClasses = useMemo(() => {
    return viewMode === 'grid' 
      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4'
      : 'space-y-3 sm:space-y-4';
  }, [viewMode]);

  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="p-0 sm:p-4 md:p-6">
      <div className={gridClasses}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            viewMode={viewMode}
            onClick={handleOpenModal}
          />
        ))}
      </div>
    </div>
  );
});

ProductGrid.displayName = 'ProductGrid';

export default ProductGrid;