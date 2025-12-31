import { useEffect, useState } from 'react';
import { getCategoryFromSlug } from '../utils/slugify';

export const useCatalogSync = (categorySlug, selectedCategory, setSelectedCategory, clearSubFilters) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (categorySlug) {
      const category = getCategoryFromSlug(categorySlug);
      if (category && category !== selectedCategory) {
        setIsTransitioning(true);
        // Limpiar filtros y cambiar categoría de forma síncrona
        clearSubFilters();
        setSelectedCategory(category);
        // Pequeño delay para asegurar que el estado se actualice
        setTimeout(() => setIsTransitioning(false), 50);
      }
    }
  }, [categorySlug, selectedCategory, setSelectedCategory, clearSubFilters]);

  return isTransitioning;
};
