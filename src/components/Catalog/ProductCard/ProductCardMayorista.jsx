import { memo, useCallback, useMemo } from 'react';
import { trackSelectItem } from '../../../utils/analytics';
import CardContainer from './shared/CardContainer';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import PackBadge from './badges/PackBadge';
import DiscountBadge from './badges/DiscountBadge';
import MayoristaPricing from './pricing/MayoristaPricing';

const ProductCardMayorista = memo(({ 
  product, 
  viewMode, 
  onClick, 
  index = 0, 
  listName = 'Mayorista List', 
  isFeatured = false 
}) => {
  const { images, name, brand, price, unitPrice, quantity } = product;
  const productImage = images[0];

  const savings = useMemo(() => {
    const totalRegular = unitPrice * quantity;
    const discount = totalRegular - price;
    const percentage = ((discount / totalRegular) * 100).toFixed(0);
    return { amount: discount, percentage };
  }, [unitPrice, quantity, price]);

  const handleClick = useCallback(() => {
    trackSelectItem(product, index, listName);
    onClick(product);
  }, [onClick, product, index, listName]);

  const imageLoading = index < 8 ? "eager" : "lazy";
  const imageFetchPriority = index < 8 ? "high" : "low";

  if (viewMode === 'list') {
    return (
      <div 
        onClick={handleClick}
        className="product-card-reveal group relative bg-white rounded-lg border border-gray-200 p-3 sm:p-4
                   hover:border-gray-300 hover:shadow-md
                   transition-all duration-200 cursor-pointer flex gap-3 sm:gap-4 items-center"
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-gray-50 rounded-md p-2 relative overflow-hidden">
          <img 
            src={productImage} 
            alt={name} 
            className="w-full h-full object-contain" 
            loading={imageLoading}
            fetchpriority={imageFetchPriority}
            decoding="async"
          />
        </div>
        
        <div className="flex-1 min-w-0 flex items-center justify-between gap-3 sm:gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-xs sm:text-sm font-bold text-gray-900 uppercase flex-shrink-0">
                {brand}
              </p>
              <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[9px] sm:text-[10px] font-semibold rounded">
                ×{quantity}
              </span>
            </div>
            <h3 className="font-semibold text-sm sm:text-base text-gray-700 line-clamp-1">
              {name}
            </h3>
          </div>
          
          <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full text-[10px] font-medium bg-green-50 text-green-700 flex-shrink-0">
            Ahorrás ${savings.amount.toLocaleString('es-AR')}
          </span>
          
          <div className="flex-shrink-0 text-right">
            <div className="flex items-baseline justify-end gap-0.5">
              <span className="text-xs sm:text-sm text-gray-400 font-medium">$</span>
              <span className="text-xl sm:text-2xl font-bold text-gray-900">
                {price.toLocaleString('es-AR')}
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Pack ×{quantity}</p>
          </div>
        </div>
      </div>
    );
  }

  // Vista grid - Diseño minimalista y moderno
  return (
    <CardContainer 
      onClick={handleClick} 
      index={index} 
      isFeatured={isFeatured}
      className="border border-gray-200 hover:border-gray-300 bg-white"
    >
      {/* Imagen limpia */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <ProductImage 
          src={productImage} 
          alt={name} 
          loading={imageLoading} 
          fetchpriority={imageFetchPriority} 
        />
        
        {/* Badges minimalistas */}
        <PackBadge quantity={quantity} />
        <DiscountBadge percentage={savings.percentage} />
      </div>

      {/* Info */}
      <div className="relative p-3 sm:p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <ProductInfo 
            name={name} 
            brand={brand} 
            model={product.model} 
            isUsed={false}
            isDDR5={false}
            isDDR4={false}
            certType={null}
          />
        </div>
        
        <MayoristaPricing 
          unitPrice={unitPrice}
          totalPrice={price}
          quantity={quantity}
          savings={savings}
        />
      </div>
    </CardContainer>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.product.price === nextProps.product.price &&
    prevProps.viewMode === nextProps.viewMode &&
    prevProps.index === nextProps.index &&
    prevProps.isFeatured === nextProps.isFeatured
  );
});

ProductCardMayorista.displayName = 'ProductCardMayorista';
export default ProductCardMayorista;
