import { useState, useMemo } from 'react';

export const useCatalogState = (filteredProducts) => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortOrder, setSortOrder] = useState(null);

  const sortedProducts = useMemo(() => {
    if (!sortOrder) return filteredProducts;
    
    return [...filteredProducts].sort((a, b) => {
      const priceA = a.price || 0;
      const priceB = b.price || 0;
      return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });
  }, [filteredProducts, sortOrder]);

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  };

  return {
    viewMode,
    sortOrder,
    sortedProducts,
    setSortOrder,
    toggleViewMode
  };
};
