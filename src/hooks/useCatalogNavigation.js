import { useNavigate } from 'react-router-dom';
import { getSlugFromCategory, generateSKU } from '../utils/slugify';

export const useCatalogNavigation = (setSelectedCategory, setSearchQuery, clearSubFilters) => {
  const navigate = useNavigate();

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category && category !== 'Todos') {
      const slug = getSlugFromCategory(category);
      navigate(`/categoria/${slug}`);
    } else {
      navigate('/');
    }
  };

  const handleProductClick = (product) => {
    const categorySlug = getSlugFromCategory(product.category);
    const productSku = generateSKU(product.name, product.brand);
    navigate(`/categoria/${categorySlug}/${productSku}`, { 
      state: { productId: product.id } 
    });
  };

  const handleGoHome = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    clearSubFilters();
    navigate('/');
  };

  const handleReset = () => {
    clearSubFilters();
    navigate('/');
  };

  return {
    handleCategoryChange,
    handleProductClick,
    handleGoHome,
    handleReset
  };
};
