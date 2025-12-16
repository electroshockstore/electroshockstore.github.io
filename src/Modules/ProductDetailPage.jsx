import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useStock } from '../context/StockContext';
import Header from '../components/InventoryApp/Header';
import ProductDetail from '../components/InventoryApp/ProductDetail/index';
import Footer from '../components/InventoryApp/Footer';
import ScrollButton from '../components/InventoryApp/ScrollButton';
import CategoryFilter from '../components/InventoryApp/CategoryFilter';
import { useFilter } from '../context/FilterContext';
import { generateSKU, getSlugFromCategory } from '../utils/slugify';
import { useProductSEO } from '../hooks/useSEO';

const ProductDetailPage = () => {
  const { id, productSku, categorySlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { getProductById, products } = useStock();
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
      <main className="flex-1 w-full px-4 sm:px-6 py-4 sm:py-8">
        <div className="mb-4 sm:mb-6">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <ProductDetail product={product} onClose={handleClose} viewOnly={true} isPage={true} />
      </main>
      <Footer />
      <ScrollButton />
    </div>
  );
};

export default ProductDetailPage;
