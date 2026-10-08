import { useState, useMemo, useCallback, useEffect } from 'react';

export const useCatalogState = (filteredProducts) => {
  // Recuperar viewMode de localStorage o usar 'grid' por defecto
  const [viewMode, setViewMode] = useState(() => {
    try {
      return localStorage.getItem('catalogViewMode') || 'grid';
    } catch {
      return 'grid';
    }
  });
  const [sortOrder, setSortOrder] = useState(null);

  // Guardar viewMode en localStorage cuando cambie
  useEffect(() => {
    try {
      localStorage.setItem('catalogViewMode', viewMode);
    } catch {
      // modo privado / storage lleno: no bloquea el catálogo
    }
  }, [viewMode]);

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
