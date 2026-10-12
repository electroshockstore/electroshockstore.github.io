import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

import { products as allProducts } from '../data';
import { applyProductFilters } from '../utils/productFilter';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { getCategoryFromSlug } from '../utils/slugify';

const FilterContext = createContext(null);

// Helper para obtener categoría inicial desde URL
const getInitialCategoryFromURL = () => {
  const path = window.location.pathname;
  const match = path.match(/\/categoria\/([^/]+)/);

  if (match && match[1]) {
    return getCategoryFromSlug(match[1]);
  }

  return null;
};

// Helper para aplicar View Transition si está disponible
// Respeta reduced-motion y dispositivos lentos (perf-low) para no hacer jank
const applyViewTransition = (callback) => {
  const reduceMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const perfLow =
    typeof document !== 'undefined' &&
    document.documentElement.classList.contains('perf-low');

  if (!document.startViewTransition || reduceMotion || perfLow) {
    callback();
    return;
  }

  document.startViewTransition(() => {
    callback();
  });
};

export function FilterProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(
    getInitialCategoryFromURL
  );
  const [subFilters, setSubFilters] = useState({});

  // Limpiar subfiltros cuando cambia la categoría
  useEffect(() => {
    setSubFilters({});
  }, [selectedCategory]);

  // Búsqueda inmediata (input fluido) vs filtrada con debounce (sin refiltrar por tecla)
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 250);

  // Productos filtrados (conjuntivo: query + categoría + subfiltros)
  const filteredProducts = useMemo(
    () =>
      applyProductFilters(allProducts, {
        query: debouncedSearchQuery,
        category: selectedCategory,
        subFilters,
      }),
    [debouncedSearchQuery, selectedCategory, subFilters]
  );

  const handleSubFilterChange = useCallback(
    (filterType, values) => {
      applyViewTransition(() => {
        setSubFilters((prev) => ({
          ...prev,
          [filterType]: values,
        }));
      });
    },
    []
  );

  const clearFilters = useCallback(() => {
    applyViewTransition(() => {
      setSearchQuery('');
      setSelectedCategory(null);
      setSubFilters({});
    });
  }, []);

  const clearSubFilters = useCallback(() => {
    applyViewTransition(() => {
      setSubFilters({});
    });
  }, []);

  const value = useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      subFilters,
      handleSubFilterChange,
      filteredProducts,
      clearFilters,
      clearSubFilters,
    }),
    [
      searchQuery,
      selectedCategory,
      subFilters,
      handleSubFilterChange,
      filteredProducts,
      clearFilters,
      clearSubFilters,
    ]
  );

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);

  if (context === undefined || context === null) {
    throw new Error(
      'useFilter must be used within a FilterProvider'
    );
  }

  return context;
}