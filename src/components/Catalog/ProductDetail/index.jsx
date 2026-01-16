import { memo, useMemo } from 'react';
import { CheckCircle2 } from 'lucide-react';
import DetailHeader from './DetailHeader';
import ProductImageSection from './ProductImageSection';
import SpecsSection from './SpecsSection';
import ProductInfoCard from './ProductInfoCard';
import MetodosDePago from './MetodosDePago';
import PuntosRetiroSection from './PuntosRetiroSection';
import { PriceChart } from '../../PriceChart';

const ProductDetail = memo(({ product, onClose, isPage = false }) => {
  const stockStatus = useMemo(() => {
    if (!product) return null;
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

  const productImages = useMemo(() => {
    if (!product) return [];
    if (product.images && product.images.length > 0) {
      return product.images;
    }
    return [];
  }, [product]);

  if (!product || !stockStatus) return null;

  // Renderizado como página completa
  if (isPage) {
    return (
      <div className="w-full max-w-7xl mx-auto px-0 sm:px-4">
        <div className="bg-gray-50 rounded-none sm:rounded-xl lg:rounded-3xl shadow-lg border-0 sm:border border-gray-200">
          <DetailHeader onClose={onClose} isPage={true} product={product} />
          <div className="px-3 sm:px-4 lg:px-8 py-3 sm:py-6 pb-6 sm:pb-8 space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
              <div className="lg:col-span-5">
                <ProductImageSection images={productImages} name={product.name} stock={product.stock} stockStatus={stockStatus} />
              </div>
              <div className="lg:col-span-7">
                <ProductInfoCard 
                  name={product.name}
                  brand={product.brand}
                  model={product.model}
                  description={product.description}
                  price={product.price}
                  product={product}
                />
              </div>
            </div>
            <PriceChart productId={product.id} />
            <SpecsSection specifications={product.specifications} />
            <div className="space-y-4 sm:space-y-6">
              <MetodosDePago />
              <PuntosRetiroSection />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Renderizado como modal (solo para casos legacy si existen)
  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm" onClick={onClose}></div>
      <div className="fixed inset-0 z-[101] overflow-y-auto flex items-start justify-center py-8">
        <div className="w-full max-w-7xl">
          <div className="bg-gray-50 rounded-3xl shadow-2xl">
            <DetailHeader onClose={onClose} product={product} />
            <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pb-6 sm:pb-8 space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
                <div className="lg:col-span-5">
                  <ProductImageSection images={productImages} name={product.name} stock={product.stock} stockStatus={stockStatus} />
                </div>
                <div className="lg:col-span-7">
                  <ProductInfoCard 
                    name={product.name}
                    brand={product.brand}
                    model={product.model}
                    description={product.description}
                    price={product.price}
                    product={product}
                  />
                </div>
              </div>
              <PriceChart productId={product.id} />
              <SpecsSection specifications={product.specifications} />
              <div className="space-y-4 sm:space-y-6">
                <MetodosDePago />
                <PuntosRetiroSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

ProductDetail.displayName = 'ProductDetail';

export default ProductDetail;
