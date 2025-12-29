import { memo, useMemo } from 'react';
import { ShoppingCart } from 'lucide-react';

const getProductImage = (product) => {
  if (product.images && product.images.length > 0) return product.images[0];
  if (product.image) return product.image;
  return 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400';
};

const CompactProductCard = memo(({ product, compatibilityResult, isSelected, onClick, onAddToBuild }) => {
  const productImage = useMemo(() => getProductImage(product), [product]);
  const { status, reasons } = compatibilityResult || { status: 'neutral', reasons: [] };
  
  const statusConfig = {
    neutral: {
      border: 'border-gray-200',
      badge: 'bg-gray-400',
      text: 'Sin validar',
      bg: 'bg-gray-50'
    },
    green: { 
      border: 'border-green-400', 
      badge: 'bg-gradient-to-r from-green-500 to-emerald-600', 
      text: 'Compatible',
      bg: 'bg-green-50'
    },
    red: { 
      border: 'border-red-400', 
      badge: 'bg-gradient-to-r from-red-500 to-rose-600', 
      text: 'Incompatible',
      bg: 'bg-red-50'
    }
  };
  
  const config = statusConfig[status] || statusConfig.neutral;
  
  return (
    <div
      onClick={() => onClick(product)}
      className={`
        group relative bg-white rounded-lg lg:rounded-xl border-2 overflow-hidden
        transition-all duration-200 flex flex-col h-full cursor-pointer
        ${isSelected 
          ? 'border-blue-600 shadow-xl ring-2 lg:ring-4 ring-blue-200 scale-[1.02]' 
          : config.border + ' shadow-md hover:shadow-xl hover:scale-[1.02]'
        }
      `}
    >
      {/* Status Badge - Más pequeño en mobile */}
      <div className="absolute top-1 right-1 lg:top-2 lg:right-2 z-10">
        {isSelected ? (
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[9px] lg:text-xs font-bold px-1.5 lg:px-2.5 py-0.5 lg:py-1 rounded-full flex items-center gap-0.5 lg:gap-1 shadow-lg">
            <svg className="w-2.5 h-2.5 lg:w-3 lg:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            <span className="hidden lg:inline">SELECCIONADO</span>
            <span className="lg:hidden">✓</span>
          </div>
        ) : status === 'green' ? (
          <div className={`${config.badge} text-white text-[9px] lg:text-xs font-bold px-1.5 lg:px-2.5 py-0.5 lg:py-1 rounded-full flex items-center gap-0.5 lg:gap-1 shadow-md`}>
            <svg className="w-2.5 h-2.5 lg:w-3 lg:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="hidden lg:inline">Compatible</span>
          </div>
        ) : status === 'red' ? (
          <div className={`${config.badge} text-white text-[9px] lg:text-xs font-bold px-1.5 lg:px-2.5 py-0.5 lg:py-1 rounded-full flex items-center gap-0.5 lg:gap-1 shadow-md`}>
            <svg className="w-2.5 h-2.5 lg:w-3 lg:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="hidden lg:inline">Incompatible</span>
          </div>
        ) : null}
      </div>
      
      {/* Product Image - Compacto */}
      <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-2 lg:p-4 overflow-hidden">
        <img 
          src={productImage} 
          alt={product.name}
          className="max-w-full max-h-full object-contain mix-blend-multiply"
        />
      </div>
      
      {/* Product Info - Optimizado para mobile */}
      <div className="p-2 lg:p-3 flex flex-col flex-1">
        {/* Brand - Más pequeño en mobile */}
        {product.brand && (
          <p className="text-[9px] lg:text-xs font-semibold text-blue-600 mb-1 uppercase tracking-wide truncate">
            {product.brand}
          </p>
        )}
        
        {/* Name - Siempre visible, máximo 2 líneas en mobile, 3 en desktop */}
        <h3 className="font-bold text-gray-900 text-[11px] lg:text-sm mb-1.5 lg:mb-2 line-clamp-2 lg:line-clamp-3 leading-tight">
          {product.name}
        </h3>
        
        {/* Price - Siempre visible y destacado */}
        <div className="mb-2 lg:mb-3">
          <span className="text-sm lg:text-xl font-black text-gray-900 block">
            ${product.price.toLocaleString()}
          </span>
          
          {/* Stock Badge - Compacto */}
          {product.stock === 0 && (
            <span className="inline-block mt-0.5 lg:mt-1 text-[9px] lg:text-xs font-semibold text-red-600 bg-red-50 px-1.5 lg:px-2 py-0.5 rounded">
              Sin stock
            </span>
          )}
          {product.stock > 0 && product.stock <= 3 && (
            <span className="inline-block mt-0.5 lg:mt-1 text-[9px] lg:text-xs font-semibold text-orange-600 bg-orange-50 px-1.5 lg:px-2 py-0.5 rounded">
              ¡Últimas {product.stock}!
            </span>
          )}
        </div>
        
        {/* Compatibility Reasons - Visible en mobile si es incompatible (red) */}
        {reasons.length > 0 && status === 'red' && (
          <div className={`${config.bg} rounded-lg p-1.5 lg:p-2 space-y-0.5 lg:space-y-1 mb-2 lg:mb-3 border ${config.border}`}>
            {reasons.slice(0, 1).map((reason, idx) => (
              <div key={idx} className="text-[9px] lg:text-xs text-gray-700 flex items-start gap-1">
                <span className="text-red-500 flex-shrink-0">⚠</span>
                <span className="line-clamp-2 leading-tight">{reason}</span>
              </div>
            ))}
            {reasons.length > 1 && (
              <div className="text-[8px] lg:text-xs text-gray-500 italic">
                +{reasons.length - 1} más...
              </div>
            )}
          </div>
        )}
        
        {/* Add to Build Button - Más compacto en mobile */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToBuild(product);
          }}
          disabled={isSelected}
          className={`
            w-full mt-auto py-1.5 lg:py-2.5 px-2 lg:px-4 rounded-lg font-bold text-[10px] lg:text-sm transition-all duration-200 flex items-center justify-center gap-1 lg:gap-2
            ${isSelected
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : status === 'red'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-md hover:shadow-lg'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg'
            }
          `}
        >
          {isSelected ? (
            <>
              <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="hidden lg:inline">En tu build</span>
              <span className="lg:hidden">Agregado</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-3 h-3 lg:w-4 lg:h-4" />
              <span>Agregar</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
});

CompactProductCard.displayName = 'CompactProductCard';
export default CompactProductCard;
