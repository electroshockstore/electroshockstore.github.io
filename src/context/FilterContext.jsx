import { createContext, useContext, useState, useEffect, useMemo, useCallback, useTransition } from 'react';
import { products as allProducts } from '../data';
import { normalizeFilterValue } from '../utils/filterNormalizers';
import { FILTER_KEY_ALIASES } from '../utils/filterConfig';
import { getCategoryFromSlug } from '../utils/slugify';

const FilterContext = createContext();

export { FilterContext };

// Helper para obtener categoría inicial desde URL
const getInitialCategoryFromURL = () => {
  const path = window.location.pathname;
  const match = path.match(/\/categoria\/([^/]+)/);
  if (match && match[1]) {
    return getCategoryFromSlug(match[1]);
  }
  return null;
};

export function FilterProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(getInitialCategoryFromURL);
  const [subFilters, setSubFilters] = useState({});
  const [isPending, startTransition] = useTransition();

  // Limpiar subfiltros cuando cambia la categoría
  useEffect(() => {
    setSubFilters({});
  }, [selectedCategory]);

  // OPTIMIZACIÓN CRÍTICA: Memoizar productos filtrados con startTransition para iOS
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

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
            let specValue = product.specifications[filterType];
            
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
  }, [searchQuery, selectedCategory, subFilters]);

  const handleSubFilterChange = useCallback((filterType, values) => {
    startTransition(() => {
      setSubFilters(prev => ({
        ...prev,
        [filterType]: values
      }));
    });
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
    clearSubFilters,
    isPending
  }), [searchQuery, selectedCategory, subFilters, filteredProducts, handleSubFilterChange, clearFilters, clearSubFilters, isPending]);

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