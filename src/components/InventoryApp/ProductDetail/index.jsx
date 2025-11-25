import { memo, useMemo } from 'react';
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import DetailHeader from './DetailHeader';
import ProductImageSection from './ProductImageSection';
import SpecificationsSection from './SpecificationsSection';
import ProductMainInfo from './ProductMainInfo';
import StockStatusCard from './StockStatusCard';
import PriceCard from './PriceCard';
import AdditionalInfo from './AdditionalInfo';
import ViewOnlyMessage from './ViewOnlyMessage';

const getCategoryImage = (category) => {
  const categoryImages = {
    'Fuentes': 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800',
    'Almacenamiento': 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800',
    'Memorias RAM': 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=800',
    'Motherboards': 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800',
    'Procesadores': 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800',
    'Refrigeración': 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800'
  };
  return categoryImages[category] || 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800';
};

const ProductDetail = memo(({ product, onClose, viewOnly = false, isPage = false }) => {
  const stockStatus = useMemo(() => {
    if (!product) return null;
    if (product.stock === 0)
      return {
        icon: XCircle,
        text: 'SIN STOCK',
        bgColor: 'bg-gradient-to-br from-red-50 to-red-100',
        badgeColor: 'bg-red-500',
        textColor: 'text-red-700',
        iconColor: 'text-red-500',
        progressColor: 'bg-red-500',
        glowColor: 'shadow-red-200',
      };
    if (product.stock <= product.minStock)
      return {
        icon: AlertCircle,
        text: 'STOCK CRÍTICO',
        bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
        badgeColor: 'bg-orange-500',
        textColor: 'text-orange-700',
        iconColor: 'text-orange-500',
        progressColor: 'bg-orange-500',
        glowColor: 'shadow-orange-200',
      };
    return {
      icon: CheckCircle2,
      text: 'DISPONIBLE',
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
      badgeColor: 'bg-green-500',
      textColor: 'text-green-700',
      iconColor: 'text-green-500',
      progressColor: 'bg-green-500',
      glowColor: 'shadow-green-200',
    };
  }, [product]);

  const productImage = useMemo(() => {
    if (!product) return '';
    return getCategoryImage(product.category);
  }, [product]);

  if (!product || !stockStatus) return null;

  if (isPage) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200">
          <DetailHeader onClose={onClose} isPage={true} />
          <div className="px-3 sm:px-6 lg:px-8 py-4 sm:py-6 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
              <div className="lg:col-span-5 space-y-4 sm:space-y-6">
                <ProductImageSection image={productImage} name={product.name} stock={product.stock} stockStatus={stockStatus} />
                <SpecificationsSection specifications={product.specifications} />
              </div>
              <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
                  <ProductMainInfo name={product.name} brand={product.brand} model={product.model} category={product.category} description={product.description} />
                  <PriceCard price={product.price} />
                </div>
                {viewOnly && <ViewOnlyMessage />}
              </div>
            </div>
          </div>
          <style jsx>{`
            @keyframes shimmer {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }
            .animate-shimmer {
              animation: shimmer 2s infinite;
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm" onClick={onClose}></div>
      <div className="fixed inset-0 z-[101] flex items-start justify-center overflow-y-auto py-4 sm:py-8">
        <div className="w-full max-w-7xl bg-gray-50 rounded-none sm:rounded-3xl shadow-2xl min-h-[calc(100vh-2rem)] sm:min-h-0">
          <DetailHeader onClose={onClose} />
          <div className="px-3 sm:px-6 lg:px-8 py-4 sm:py-6 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
              <div className="lg:col-span-5 space-y-4 sm:space-y-6">
                <ProductImageSection image={productImage} name={product.name} stock={product.stock} stockStatus={stockStatus} />
                <SpecificationsSection specifications={product.specifications} />
              </div>
              <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
                  <ProductMainInfo name={product.name} brand={product.brand} model={product.model} category={product.category} description={product.description} />
                  <StockStatusCard stock={product.stock} minStock={product.minStock} stockStatus={stockStatus} />
                  <PriceCard price={product.price} />
                  <AdditionalInfo category={product.category} />
                </div>
                {viewOnly && <ViewOnlyMessage />}
              </div>
            </div>
          </div>
          <style jsx>{`
            @keyframes shimmer {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }
            .animate-shimmer {
              animation: shimmer 2s infinite;
            }
          `}</style>
        </div>
      </div>
    </>
  );
});

ProductDetail.displayName = 'ProductDetail';

export default ProductDetail;
