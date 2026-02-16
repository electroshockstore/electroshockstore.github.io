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
        className="group relative bg-white rounded-lg border border-gray-200 p-3 sm:p-4
                   hover:border-blue-400 hover:shadow-lg
                   transition-all duration-200 cursor-pointer flex gap-3 sm:gap-4 items-center"
      >
        {/* Imagen - Tamaño medio */}
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
        
        {/* Info del producto - Layout horizontal */}
        <div className="flex-1 min-w-0 flex items-center justify-between gap-3 sm:gap-6">
          {/* Info: Marca + Nombre */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-xs sm:text-sm font-bold text-blue-600 uppercase flex-shrink-0">
                {brand}
              </p>
              {isDDR5 && (
                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[9px] sm:text-[10px] font-bold rounded">
                  DDR5
                </span>
              )}
              {isDDR4 && (
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[9px] sm:text-[10px] font-bold rounded">
                  DDR4
                </span>
              )}
              {certType && (
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[9px] sm:text-[10px] font-bold rounded">
                  {certType}
                </span>
              )}
            </div>
            <h3 className="font-semibold text-sm sm:text-base text-gray-700 line-clamp-1">
              {name}
            </h3>
          </div>
          
          {/* Stock badge */}
          <span className={`hidden sm:inline-flex px-2.5 py-1 rounded-full text-[10px] font-medium ${STOCK_STATUS.badgeColor} flex-shrink-0`}>
            ✓ Disponible
          </span>
          
          {/* Precio */}
          <div className="flex-shrink-0 text-right">
            <div className="flex items-baseline justify-end gap-0.5">
              <span className="text-xs sm:text-sm text-gray-400 font-medium">$</span>
              <span className="text-xl sm:text-2xl font-black text-gray-900">
                {price.toLocaleString('es-AR')}
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Contado</p>
          </div>
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
                 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full
                 active:scale-[0.98] sm:active:scale-100"
    >
      {/* ⚠️ BLUR EFFECTS ELIMINADOS - Causaban lag brutal en Catalog (150 blur × 60fps) */}

      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {/* ⚠️ Glow ELIMINADO - Blur recalculado 60 veces/segundo con Lenis */}
        
        <ProductImage src={productImage} alt={name} loading={imageLoading} fetchpriority={imageFetchPriority} />
        <StockStatus stockStatus={STOCK_STATUS} />
        <StockBadge stock={stock} stockStatus={STOCK_STATUS} isUsed={isUsed} />
      </div>

      <div className="relative p-2 sm:p-5 flex flex-col flex-1 justify-between gap-2 sm:gap-4">
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
