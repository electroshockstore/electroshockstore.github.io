import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSlugFromCategory, generateSKU } from '../utils/slugify';

export const useCatalogNavigation = (setSelectedCategory, setSearchQuery, clearSubFilters) => {
  const navigate = useNavigate();

  const handleCategoryChange = useCallback((category) => {
    // Cambio inmediato de categoría
    setSelectedCategory(category);
    
    // Navegación con replace para evitar historial pesado en iOS
    if (category && category !== 'Todos') {
      const slug = getSlugFromCategory(category);
      navigate(`/categoria/${slug}`, { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }, [setSelectedCategory, navigate]);

  const handleProductClick = useCallback((product) => {
    const categorySlug = getSlugFromCategory(product.category);
    const productSku = generateSKU(product.name, product.brand);
    
    // Navegación inmediata sin delay
    navigate(`/categoria/${categorySlug}/${productSku}`, { 
      state: { productId: product.id },
      replace: false // Mantener en historial para volver
    });
  }, [navigate]);

  const handleGoHome = useCallback(() => {
    setSelectedCategory(null);
    setSearchQuery('');
    clearSubFilters();
    navigate('/', { replace: true });
  }, [setSelectedCategory, setSearchQuery, clearSubFilters, navigate]);

  const handleReset = useCallback(() => {
    clearSubFilters();
    navigate('/', { replace: true });
  }, [clearSubFilters, navigate]);

  return {
    handleCategoryChange,
    handleProductClick,
    handleGoHome,
    handleReset
  };
};
