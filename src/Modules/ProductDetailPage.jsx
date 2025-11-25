import { useParams, useNavigate } from 'react-router-dom';
import { useStock } from '../context/StockContext';
import Header from '../components/InventoryApp/Header';
import ProductDetail from '../components/InventoryApp/ProductDetail/index';
import Footer from '../components/InventoryApp/Footer';
import { useFilter } from '../context/FilterContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useStock();
  const { searchQuery, setSearchQuery } = useFilter();
  
  const product = getProductById(parseInt(id));

  const handleClose = () => {
    navigate('/');
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
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className="flex-1 pt-4 sm:pt-6">
        <ProductDetail product={product} onClose={handleClose} viewOnly={true} isPage={true} />
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
