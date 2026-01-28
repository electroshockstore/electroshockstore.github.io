import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import Header from '../components/Shared/Header';
import ProductDetail from '../components/Catalog/ProductDetail/index';
import Footer from '../components/Shared/Footer';
import ScrollButton from '../components/Shared/ScrollButton';
import CategoryFilter from '../components/Catalog/CategoryFilter';
import { useFilter } from '../context/FilterContext';
import { generateSKU, getSlugFromCategory } from '../utils/slugify';
import { useProductSEO } from '../hooks/useSEO';
import { useProductView } from '../hooks/useAnalytics';

const ProductDetailPage = () => {
  const { id, productSku, categorySlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { getProductById, products } = useProducts();
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useFilter();
  
  // Buscar producto por ID (ruta legacy) o por SKU
  let product;
  if (id) {
    product = getProductById(parseInt(id));
  } else if (productSku) {
    // Buscar por SKU o usar productId del state
    const productId = location.state?.productId;
    if (productId) {
      product = getProductById(productId);
    } else {
      // Buscar producto que coincida con el SKU
      product = products.find(p => {
        const sku = generateSKU(p.name, p.brand);
        return sku === productSku;
      });
    }
  }

  // SEO dinámico para el producto
  useProductSEO(product);
  
  // Analytics: Track product view
  useProductView(product);

  // Sincronizar categoría con el producto actual
  useEffect(() => {
    if (product && product.category !== selectedCategory) {
      setSelectedCategory(product.category);
    }
  }, [product, selectedCategory, setSelectedCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category) {
      const slug = getSlugFromCategory(category);
      navigate(`/categoria/${slug}`);
    } else {
      navigate('/');
    }
  };

  const handleClose = () => {
    if (categorySlug) {
      navigate(`/categoria/${categorySlug}`);
    } else {
      navigate('/');
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen w-full flex flex-col">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Producto no encontrado</h2>
            <button
              onClick={handleClose}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
            >
              Volver al catálogo
            </button>
          </div>
        </div>
        <Footer />
        <ScrollButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="flex-1 w-full px-0 sm:px-6 py-4 sm:py-8">
        {/* CategoryFilter - Solo Desktop */}
        <div className="hidden sm:block mb-4 sm:mb-6 px-4 sm:px-0">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <ProductDetail product={product} onClose={handleClose} isPage={true} />
      </main>
      <Footer />
      <ScrollButton />
    </div>
  );
};

export default ProductDetailPage;
