import { memo, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        <svg 
          className="w-16 h-16 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
          />
        </svg>
      </div>
      <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
        <svg 
          className="w-6 h-6 text-blue-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
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
            {/* Border Beam solo para el producto destacado */}
            {isFeatured && (
              <div className="border-beam-wrapper">
                <div className="border-beam" aria-hidden="true" />
              </div>
            )}
            
            {/* Badge "Más Vendido" solo para el producto destacado */}
            {isFeatured && (
              <div className="featured-badge">
                <svg className="featured-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>Más Vendido</span>
              </div>
            )}
            
            <ProductCardWrapper
              product={product}
              viewMode={viewMode}
              onClick={openModal}
              index={index}
              isFeatured={isFeatured}
            />
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
