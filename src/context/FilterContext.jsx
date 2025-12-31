import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useStock } from './StockContext';
import { normalizeFilterValue } from '../utils/filterNormalizers';
import { getFilterKey, FILTER_KEY_ALIASES } from '../utils/filterConfig';

const FilterContext = createContext();

export { FilterContext };

export function FilterProvider({ children }) {
  const stockContext = useStock();
  const { products } = stockContext || { products: [] }; // Fallback seguro
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subFilters, setSubFilters] = useState({});

  // Limpiar subfiltros cuando cambia la categoría
  useEffect(() => {
    setSubFilters({});
  }, [selectedCategory]);

  // OPTIMIZACIÓN CRÍTICA: Memoizar productos filtrados
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    let filtered = products;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name?.toLowerCase().includes(query) ||
        p.brand?.toLowerCase().includes(query) ||
        p.model?.toLowerCase().includes(query) ||
        p.sku?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query)
      );
    } else {
      if (selectedCategory) {
        filtered = filtered.filter(p => p.category === selectedCategory);
      }

      const activeFilters = Object.entries(subFilters).filter(([, values]) => values?.length > 0);
      
      if (activeFilters.length > 0) {
        filtered = filtered.filter(product => {
          if (!product.specifications) return false;
          
          return activeFilters.every(([filterType, selectedValues]) => {
            // Buscar el valor en el producto usando la clave exacta primero
            let specValue = product.specifications[filterType];
            
            // Si no se encuentra con la clave exacta, buscar en aliases
            if (!specValue) {
              const possibleKeys = Object.entries(FILTER_KEY_ALIASES)
                .filter(([, target]) => target === filterType)
                .map(([key]) => key);
              
              possibleKeys.push(filterType);
              
              for (const key of possibleKeys) {
                if (product.specifications[key]) {
                  specValue = product.specifications[key];
                  break;
                }
              }
            }
            
            if (!specValue) return false;
            
            const normalizedProductValue = normalizeFilterValue(filterType, specValue);
            
            return selectedValues.some(selectedValue => 
              normalizedProductValue.toString().toLowerCase() === selectedValue.toLowerCase()
            );
          });
        });
      }
    }

    return filtered;
  }, [products, searchQuery, selectedCategory, subFilters]);

  const handleSubFilterChange = useCallback((filterType, values) => {
    setSubFilters(prev => ({
      ...prev,
      [filterType]: values
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSubFilters({});
  }, []);

  const clearSubFilters = useCallback(() => {
    setSubFilters({});
  }, []);

  const value = useMemo(() => ({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    subFilters,
    handleSubFilterChange,
    filteredProducts,
    clearFilters,
    clearSubFilters
  }), [searchQuery, selectedCategory, subFilters, filteredProducts, handleSubFilterChange, clearFilters, clearSubFilters]);

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}

// OPTIMIZACIÓN: Selectores específicos para evitar re-renders innecesarios
export function useFilteredProducts() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilteredProducts must be used within a FilterProvider');
  }
  return context.filteredProducts;
}

export function useSearchQuery() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useSearchQuery must be used within a FilterProvider');
  }
  return [context.searchQuery, context.setSearchQuery];
}

export function useSelectedCategory() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useSelectedCategory must be used within a FilterProvider');
  }
  return [context.selectedCategory, context.setSelectedCategory];
}