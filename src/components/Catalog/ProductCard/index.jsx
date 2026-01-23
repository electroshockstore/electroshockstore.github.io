import { memo, useCallback } from 'react';
import { trackSelectItem } from '../../../utils/analytics';
import StockBadge from './StockBadge';
import StockStatus from './StockStatus';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import PriceDisplay from './PriceDisplay';

// Constante estática - Se crea UNA SOLA VEZ
const STOCK_STATUS = Object.freeze({ 
  text: 'Disponible', 
  color: 'from-emerald-400 to-emerald-600',
  textColor: 'text-emerald-700',
  badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200'
});

const ProductCard = memo(({ product, viewMode, onClick, index = 0, listName = 'Product List' }) => {
  // Destructuring directo - más rápido que acceder a product.x cada vez
  const { images, isUsed = false, ddrType, certType, name, brand, price, stock } = product;
  const productImage = images[0]; // Todos los productos tienen imágenes
  const isDDR5 = ddrType === 'DDR5';
  const isDDR4 = ddrType === 'DDR4';
  
  const handleClick = useCallback(() => {
    trackSelectItem(product, index, listName);
    onClick(product);
  }, [onClick, product, index, listName]);

  // Determinar si debe cargar eager (primeros 8 productos)
  const imageLoading = index < 8 ? "eager" : "lazy";
  const imageFetchPriority = index < 8 ? "high" : "low";

  if (viewMode === 'list') {
    return (
      <div 
        onClick={handleClick}
        className="group relative bg-white rounded-xl border border-gray-100 p-3 sm:p-4
                   hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 
                   shadow-lg shadow-gray-200/50
                   transition-all duration-300 cursor-pointer flex gap-3 sm:gap-4 items-center"
      >
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 flex-shrink-0 bg-gray-50 rounded-lg p-2 relative overflow-hidden">
          <img 
            src={productImage} 
            alt={name} 
            className="w-full h-full object-contain mix-blend-multiply" 
            loading={imageLoading}
            fetchpriority={imageFetchPriority}
            decoding="async"
          />
        </div>
        
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <p className="text-xs font-semibold text-blue-600 tracking-wide uppercase truncate">
            {brand}
          </p>
          
          <h3 className="font-bold text-sm sm:text-base md:text-lg text-gray-900 line-clamp-2 leading-tight">
            {isUsed ? `${name} - USADA` : name}
          </h3>
          
          <div className="flex items-baseline gap-1">
            <span className="text-sm text-gray-400 font-medium">$</span>
            <span className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900">
              {price.toLocaleString('es-AR')}
            </span>
          </div>
          
          <span className={`hidden sm:inline-flex w-fit px-2.5 py-0.5 rounded-full text-xs font-medium border ${STOCK_STATUS.badgeColor}`}>
            {STOCK_STATUS.text}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleClick}
      className="group relative bg-white rounded-xl sm:rounded-2xl border border-gray-100 
                 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10
                 shadow-lg shadow-gray-200/50
                 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
    >
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <ProductImage src={productImage} alt={name} loading={imageLoading} fetchpriority={imageFetchPriority} />
        <StockStatus stockStatus={STOCK_STATUS} />
        <StockBadge stock={stock} stockStatus={STOCK_STATUS} isUsed={isUsed} />
      </div>

      <div className="p-2 sm:p-5 flex flex-col flex-1 justify-between gap-2 sm:gap-4">
        <div>
           <ProductInfo 
             name={name} 
             brand={brand} 
             model={product.model} 
             isUsed={isUsed}
             isDDR5={isDDR5}
             isDDR4={isDDR4}
             certType={certType}
           />
        </div>
        
        <div className="space-y-2 sm:space-y-3 pt-2 border-t border-gray-50">
           <PriceDisplay price={price} category={product.category} />
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison para evitar re-renders innecesarios
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.product.price === nextProps.product.price &&
    prevProps.product.stock === nextProps.product.stock &&
    prevProps.viewMode === nextProps.viewMode &&
    prevProps.index === nextProps.index
  );
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;
