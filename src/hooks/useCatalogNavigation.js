import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getSlugFromCategory, generateSKU } from '../utils/slugify';
import { useViewTransition } from './useViewTransition';

export const useCatalogNavigation = (setSelectedCategory, setSearchQuery, clearSubFilters) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { startTransition } = useViewTransition();

  const handleCategoryChange = useCallback((category) => {
    const targetPath = category && category !== 'Todos' 
      ? `/categoria/${getSlugFromCategory(category)}`
      : '/';
    
    // No navegar si ya estás en la ruta
    if (location.pathname === targetPath) {
      return;
    }

    startTransition(() => {
      setSelectedCategory(category);
      navigate(targetPath);
    });
  }, [setSelectedCategory, navigate, location.pathname, startTransition]);

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
    // No navegar si ya estás en home
    if (location.pathname === '/') {
      return;
    }

    startTransition(() => {
      setSelectedCategory(null);
      setSearchQuery('');
      clearSubFilters();
      navigate('/');
    });
  }, [setSelectedCategory, setSearchQuery, clearSubFilters, navigate, location.pathname, startTransition]);

  const handleReset = useCallback(() => {
    // No navegar si ya estás en home
    if (location.pathname === '/') {
      clearSubFilters();
      return;
    }

    startTransition(() => {
      clearSubFilters();
      navigate('/');
    });
  }, [clearSubFilters, navigate, location.pathname, startTransition]);

  return {
    handleCategoryChange,
    handleProductClick,
    handleGoHome,
    handleReset
  };
};
