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
import { FILTER_KEY_ALIASES } from '../utils/filterConfig';
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
const applyViewTransition = (callback) => {
  if (!document.startViewTransition) {
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

  // Productos filtrados
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Búsqueda
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      filtered = filtered.filter(
        (p) =>
          p.name?.toLowerCase().includes(query) ||
          p.brand?.toLowerCase().includes(query) ||
          p.model?.toLowerCase().includes(query) ||
          p.sku?.toLowerCase().includes(query) ||
          p.category?.toLowerCase().includes(query)
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
              let specValue =
                product.specifications[filterType];

              // Buscar aliases
              if (!specValue) {
                const aliasKeys = Object.entries(
                  FILTER_KEY_ALIASES
                )
                  .filter(([, target]) => target === filterType)
                  .map(([key]) => key);

                const targetKey =
                  FILTER_KEY_ALIASES[filterType];

                if (targetKey) {
                  aliasKeys.push(targetKey);
                }

                aliasKeys.push(filterType);

                for (const key of aliasKeys) {
                  if (product.specifications[key]) {
                    specValue = product.specifications[key];
                    break;
                  }
                }
              }

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
  }, [searchQuery, selectedCategory, subFilters]);

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

export function useFilteredProducts() {
  const context = useContext(FilterContext);

  if (context === undefined || context === null) {
    throw new Error(
      'useFilteredProducts must be used within a FilterProvider'
    );
  }

  return context.filteredProducts;
}

export function useSearchQuery() {
  const context = useContext(FilterContext);

  if (context === undefined || context === null) {
    throw new Error(
      'useSearchQuery must be used within a FilterProvider'
    );
  }

  return [context.searchQuery, context.setSearchQuery];
}

export function useSelectedCategory() {
  const context = useContext(FilterContext);

  if (context === undefined || context === null) {
    throw new Error(
      'useSelectedCategory must be used within a FilterProvider'
    );
  }

  return [
    context.selectedCategory,
    context.setSelectedCategory,
  ];
}