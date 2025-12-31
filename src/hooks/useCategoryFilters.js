import { useMemo } from 'react';
import { normalizeFilterValue } from '../utils/filterNormalizers';
import { getAllowedFilters, getFilterKey, FILTER_KEY_ALIASES } from '../utils/filterConfig';
import { getSorterForFilter } from '../utils/filterSorters';

/**
 * Hook personalizado para generar filtros dinámicos por categoría
 * SOLID: Single Responsibility - Solo se encarga de generar filtros
 */
export const useCategoryFilters = (selectedCategory, products) => {
  return useMemo(() => {
    if (selectedCategory === 'Todos') return {};

    const categoryProducts = products.filter(p => p.category === selectedCategory);
    const dynamicFilters = {};
    const allowedFilters = getAllowedFilters(selectedCategory);

    categoryProducts.forEach(product => {
      if (!product.specifications) return;

      Object.entries(product.specifications).forEach(([key, value]) => {
        // Resolver alias a clave principal
        const filterKey = getFilterKey(key);
        
        // Solo incluir filtros permitidos para esta categoría
        if (!allowedFilters.includes(filterKey)) return;
        
        if (!dynamicFilters[filterKey]) {
          dynamicFilters[filterKey] = new Set();
        }
        
        if (value) {
          const normalized = normalizeFilterValue(filterKey, value);
          if (normalized) {
            dynamicFilters[filterKey].add(normalized);
          }
        }
      });
    });

    // Convertir Sets a Arrays con ordenamiento personalizado
    const result = {};
    Object.entries(dynamicFilters).forEach(([key, valueSet]) => {
      if (valueSet.size > 0) {
        const sorter = getSorterForFilter(key);
        result[key] = Array.from(valueSet).sort(sorter);
      }
    });

    return result;
  }, [selectedCategory, products]);
};
