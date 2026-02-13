import { memo, useCallback, useMemo, useState, useEffect, useRef } from 'react';
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

// Componente para grupo de productos con animación suave
const ProductGroup = memo(({ products, viewMode, openModal, gridClasses }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={gridClasses}
      style={{ willChange: 'opacity' }}
    >
      {products.map((product, index) => (
        <motion.div
          key={`${product.id}-${product.category}`}
          variants={itemVariants}
          style={{ willChange: 'opacity, transform' }}
        >
          <ProductCardWrapper
            product={product}
            viewMode={viewMode}
            onClick={openModal}
            index={index}
          />
        </motion.div>
      ))}
    </motion.div>
  );
});

ProductGroup.displayName = 'ProductGroup';

// Detectar mobile SOLO para iOS
const isIOS = typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

const ProductGrid = memo(({ products, viewMode, openModal }) => {
  const handleOpenModal = useCallback((product) => {
    openModal(product);
  }, [openModal]);

  const gridClasses = useMemo(() => {
    return viewMode === 'grid' 
      ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1.5 sm:gap-4'
      : 'space-y-2.5 sm:space-y-3';
  }, [viewMode]);

  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="p-0 sm:p-4 md:p-6" data-catalog-results>
      <AnimatePresence mode="wait">
        <ProductGroup
          key={products.map(p => p.id).join('-')} // Key única basada en productos
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
