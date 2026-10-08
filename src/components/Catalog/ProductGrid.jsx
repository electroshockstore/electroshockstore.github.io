import { memo, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Package, Search, Flame } from 'lucide-react';
import ProductCardWrapper from './ProductCardWrapper';


const EmptyState = memo(() => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center justify-center py-16 sm:py-24"
  >
    <div className="relative mb-8">
      <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
        <Package className="w-16 h-16 text-gray-400" strokeWidth={1.5} />
      </div>
      <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
        <Search className="w-6 h-6 text-blue-600" strokeWidth={2} />
      </div>
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-3">
      No encontramos productos
    </h3>
    <p className="text-base text-gray-500 text-center max-w-md mb-6">
      Intenta ajustar los filtros o usar otros términos de búsqueda para encontrar lo que buscas
    </p>
    <div className="flex flex-wrap gap-2 justify-center">
      <div className="px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-600 border border-gray-200">
        💡 Tip: Busca por marca o modelo
      </div>
    </div>
  </motion.div>
));

EmptyState.displayName = 'EmptyState';

// Fade suave del bloque de grilla (una sola animación del contenedor).
// La entrada por card la hace cada ProductCard con la Web Animations API
// (observer compartido), evitando doble animación de opacidad por nodo.
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
  }
};

// Componente para grupo de productos con animación suave y Bento layout
// Sin AnimatePresence mode="wait": evita remount total y re-animación en cada filtro
const ProductGroup = memo(({ products, viewMode, openModal, gridClasses }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={gridClasses}
    >
      {products.map((product, index) => {
        const isFeatured = index === 0 && viewMode === 'grid'; // Solo el primero en vista grid

        return (
          <div
            key={`${product.id}-${product.category}`}
            className={`h-full ${isFeatured ? 'bento-item-featured' : ''}`}
          >
            {/* Badge "Más Vendido" - Responsive */}
            {isFeatured && (
              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-[200] inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2.5 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg shadow-red-500/40 border border-red-400/30 pointer-events-none">
                <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white drop-shadow-md" fill="currentColor" strokeWidth={2} />
                <span className="text-[9px] sm:text-[10px] md:text-xs font-black text-white uppercase tracking-tight sm:tracking-wide drop-shadow-md">
                  Más Vendido
                </span>
              </div>
            )}

            {/* Wrapper para aplicar el border shine - Este es el > div que CSS selecciona */}
            <div className={`h-full ${isFeatured ? 'featured-card-wrapper' : ''}`}>
              <ProductCardWrapper
                product={product}
                viewMode={viewMode}
                onClick={openModal}
                index={index}
                isFeatured={isFeatured}
              />
            </div>
          </div>
        );
      })}
    </motion.div>
  );
});

ProductGroup.displayName = 'ProductGroup';

const ProductGrid = memo(({ products, viewMode, openModal }) => {
  const handleOpenModal = useCallback((product) => {
    openModal(product);
  }, [openModal]);

  const gridClasses = useMemo(() => {
    return viewMode === 'grid' 
      ? 'grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-4'
      : 'space-y-2.5 sm:space-y-3';
  }, [viewMode]);

  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="p-0 sm:p-4 md:p-6" data-catalog-results>
      <ProductGroup
        products={products}
        viewMode={viewMode}
        openModal={handleOpenModal}
        gridClasses={gridClasses}
      />
    </div>
  );
});

ProductGrid.displayName = 'ProductGrid';

export default ProductGrid;
