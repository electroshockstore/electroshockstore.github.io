import { memo, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Variantes de animación optimizadas para productos
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // 50ms entre cada producto
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

// Componente para grupo de productos con animación suave y Bento layout
const ProductGroup = memo(({ products, viewMode, openModal, gridClasses }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={gridClasses}
      style={{ willChange: 'opacity' }}
    >
      {products.map((product, index) => {
        const isFeatured = index === 0 && viewMode === 'grid'; // Solo el primero en vista grid
        
        return (
          <motion.div
            key={`${product.id}-${product.category}`}
            variants={itemVariants}
            className={isFeatured ? 'bento-item-featured' : ''}
            style={{ willChange: 'opacity, transform', position: 'relative' }}
          >
            {/* Badge "Más Vendido" - Posicionado absolutamente FUERA del wrapper con border */}
            {isFeatured && (
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-[200] inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-xl sm:rounded-2xl shadow-lg shadow-red-500/40 border border-red-400/30 pointer-events-none">
                <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white drop-shadow-md" fill="currentColor" strokeWidth={2} />
                <span className="text-[10px] sm:text-xs font-black text-white uppercase tracking-wide drop-shadow-md">
                  Más Vendido
                </span>
              </div>
            )}

            {/* Wrapper para aplicar el border shine - Este es el > div que CSS selecciona */}
            <div className={isFeatured ? 'featured-card-wrapper' : ''}>
              <ProductCardWrapper
                product={product}
                viewMode={viewMode}
                onClick={openModal}
                index={index}
                isFeatured={isFeatured}
              />
            </div>
          </motion.div>
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
      <AnimatePresence mode="wait">
        <ProductGroup
          key={products.map(p => p.id).join('-')}
          products={products}
          viewMode={viewMode}
          openModal={handleOpenModal}
          gridClasses={gridClasses}
        />
      </AnimatePresence>
    </div>
  );
});

ProductGrid.displayName = 'ProductGrid';

export default ProductGrid;
