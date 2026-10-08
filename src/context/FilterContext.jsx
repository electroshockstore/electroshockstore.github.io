import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

import { products as allProducts } from '../data';
import { normalizeFilterValue } from '../utils/filterNormalizers';
import { getSpecValue } from '../utils/filterConfig';
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

  // Productos filtrados
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Búsqueda (debounced)
    const q = debouncedSearchQuery.trim().toLowerCase();
    if (q) {

      filtered = filtered.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.model?.toLowerCase().includes(q) ||
          p.sku?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      );
    } else {
      // Categoría
      if (selectedCategory) {
        filtered = filtered.filter(
          (p) => p.category === selectedCategory
        );
      }

      // Subfiltros
      const activeFilters = Object.entries(subFilters).filter(
        ([, values]) => values?.length > 0
      );

      if (activeFilters.length > 0) {
        filtered = filtered.filter((product) => {
          if (!product.specifications) {
            return false;
          }

          return activeFilters.every(
            ([filterType, selectedValues]) => {
              const specValue = getSpecValue(
                product.specifications,
                filterType
              );

              if (!specValue) {
                return false;
              }

              const normalizedProductValue =
                normalizeFilterValue(
                  filterType,
                  specValue
                );

              if (
                !normalizedProductValue ||
                normalizedProductValue === '' ||
                normalizedProductValue === 'null'
              ) {
                return false;
              }

              return selectedValues.some((selectedValue) => {
                const normalizedSelected =
                  normalizeFilterValue(
                    filterType,
                    selectedValue
                  );

                if (
                  !normalizedSelected ||
                  normalizedSelected === '' ||
                  normalizedSelected === 'null'
                ) {
                  return false;
                }

                return (
                  normalizedProductValue
                    .toString()
                    .toLowerCase()
                    .trim() ===
                  normalizedSelected
                    .toString()
                    .toLowerCase()
                    .trim()
                );
              });
            }
          );
        });
      }
    }

    return filtered;
  }, [debouncedSearchQuery, selectedCategory, subFilters]);

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