import { useState, useMemo, useCallback } from 'react';

export const useCatalogState = (filteredProducts) => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortOrder, setSortOrder] = useState(null);

  const sortedProducts = useMemo(() => {
    if (!sortOrder || filteredProducts.length === 0) return filteredProducts;
    
    // Sort in-place es más rápido, pero necesitamos copia para no mutar
    const sorted = filteredProducts.slice();
    
    if (sortOrder === 'asc') {
      sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else {
      sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    
    return sorted;
  }, [filteredProducts, sortOrder]);

  const toggleViewMode = useCallback(() => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  }, []);

  return {
    viewMode,
    sortOrder,
    sortedProducts,
    setSortOrder,
    toggleViewMode
  };
};
