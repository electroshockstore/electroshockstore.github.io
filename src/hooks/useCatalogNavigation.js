import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSlugFromCategory, generateSKU } from '../utils/slugify';
import { useViewTransition } from './useViewTransition';

export const useCatalogNavigation = (setSelectedCategory, setSearchQuery, clearSubFilters) => {
  const navigate = useNavigate();
  const { startTransition } = useViewTransition();

  const handleCategoryChange = useCallback((category) => {
    startTransition(() => {
      setSelectedCategory(category);
      if (category && category !== 'Todos') {
        const slug = getSlugFromCategory(category);
        navigate(`/categoria/${slug}`);
      } else {
        navigate('/');
      }
    });
  }, [setSelectedCategory, navigate, startTransition]);

  const handleProductClick = useCallback((product) => {
    startTransition(() => {
      const categorySlug = getSlugFromCategory(product.category);
      const productSku = generateSKU(product.name, product.brand);
      navigate(`/categoria/${categorySlug}/${productSku}`, { 
        state: { productId: product.id } 
      });
    });
  }, [navigate, startTransition]);

  const handleGoHome = useCallback(() => {
    startTransition(() => {
      setSelectedCategory(null);
      setSearchQuery('');
      clearSubFilters();
      navigate('/');
    });
  }, [setSelectedCategory, setSearchQuery, clearSubFilters, navigate, startTransition]);

  const handleReset = useCallback(() => {
    startTransition(() => {
      clearSubFilters();
      navigate('/');
    });
  }, [clearSubFilters, navigate, startTransition]);

  return {
    handleCategoryChange,
    handleProductClick,
    handleGoHome,
    handleReset
  };
};
