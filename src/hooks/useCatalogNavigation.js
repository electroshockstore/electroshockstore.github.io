import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSlugFromCategory, generateSKU } from '../utils/slugify';

export const useCatalogNavigation = (setSelectedCategory, setSearchQuery, clearSubFilters) => {
  const navigate = useNavigate();

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    if (category && category !== 'Todos') {
      const slug = getSlugFromCategory(category);
      navigate(`/categoria/${slug}`);
    } else {
      navigate('/');
    }
  }, [setSelectedCategory, navigate]);

  const handleProductClick = useCallback((product) => {
    const categorySlug = getSlugFromCategory(product.category);
    const productSku = generateSKU(product.name, product.brand);
    navigate(`/categoria/${categorySlug}/${productSku}`, { 
      state: { productId: product.id } 
    });
  }, [navigate]);

  const handleGoHome = useCallback(() => {
    setSelectedCategory(null);
    setSearchQuery('');
    clearSubFilters();
    navigate('/');
  }, [setSelectedCategory, setSearchQuery, clearSubFilters, navigate]);

  const handleReset = useCallback(() => {
    clearSubFilters();
    navigate('/');
  }, [clearSubFilters, navigate]);

  return {
    handleCategoryChange,
    handleProductClick,
    handleGoHome,
    handleReset
  };
};
