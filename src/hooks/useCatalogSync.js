import { useEffect } from 'react';
import { getCategoryFromSlug } from '../utils/slugify';

export const useCatalogSync = (categorySlug, selectedCategory, setSelectedCategory, clearSubFilters) => {
  useEffect(() => {
    if (categorySlug) {
      const category = getCategoryFromSlug(categorySlug);
      if (category && category !== selectedCategory) {
        // Limpiar filtros y cambiar categoría de forma síncrona e inmediata
        clearSubFilters();
        setSelectedCategory(category);
      }
    }
  }, [categorySlug, selectedCategory, setSelectedCategory, clearSubFilters]);

  // Siempre retornar false - no hay transición
  return false;
};
