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
        group relative bg-white rounded-xl border-2 overflow-hidden
        transition-all duration-200 flex flex-col h-full cursor-pointer
        ${isSelected 
          ? 'border-blue-600 shadow-xl ring-4 ring-blue-200 scale-[1.02]' 
          : config.border + ' shadow-md hover:shadow-xl hover:scale-[1.02]'
        }
      `}
    >
      {/* Status Badge */}
      <div className="absolute top-2 right-2 z-10">
        {isSelected ? (
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            <span>SELECCIONADO</span>
          </div>
        ) : status === 'green' ? (
          <div className={`${config.badge} text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md`}>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Compatible</span>
          </div>
        ) : status === 'red' ? (
          <div className={`${config.badge} text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md`}>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Incompatible</span>
          </div>
        ) : null}
      </div>
      
      {/* Product Image - Compacto */}
      <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 overflow-hidden">
        <img 
          src={productImage} 
          alt={product.name}
          className="max-w-full max-h-full object-contain mix-blend-multiply"
        />
      </div>
      
      {/* Product Info - Compacto */}
      <div className="p-3 flex flex-col flex-1">
        {/* Brand */}
        {product.brand && (
          <p className="text-xs font-semibold text-blue-600 mb-1 uppercase tracking-wide">
            {product.brand}
          </p>
        )}
        
        {/* Name */}
        <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 min-h-[2.5rem] leading-tight">
          {product.name}
        </h3>
        
        {/* Price and Stock */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toLocaleString()}
          </span>
          
          {product.stock === 0 && (
            <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
              Sin stock
            </span>
          )}
          {product.stock > 0 && product.stock <= 3 && (
            <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
              ¡Últimas {product.stock}!
            </span>
          )}
        </div>
        
        {/* Compatibility Reasons - Compacto */}
        {reasons.length > 0 && (
          <div className={`${config.bg} rounded-lg p-2 space-y-1 mt-auto border ${config.border}`}>
            {reasons.slice(0, 2).map((reason, idx) => (
              <div key={idx} className="text-xs text-gray-700 flex items-start gap-1">
                <span className="text-gray-400 flex-shrink-0">•</span>
                <span className="line-clamp-2 leading-tight">{reason}</span>
              </div>
            ))}
            {reasons.length > 2 && (
              <div className="text-xs text-gray-500 italic">
                +{reasons.length - 2} más...
              </div>
            )}
          </div>
        )}
        
        {/* Key Specs - Solo si no hay razones */}
        {reasons.length === 0 && product.compatibility && (
          <div className="text-xs text-gray-500 space-y-1 mt-auto pt-2 border-t border-gray-100">
            {product.compatibility.socket && (
              <div className="flex justify-between">
                <span>Socket:</span>
                <span className="font-semibold text-gray-700">{product.compatibility.socket}</span>
              </div>
            )}
            {product.compatibility.tipo && (
              <div className="flex justify-between">
                <span>Tipo:</span>
                <span className="font-semibold text-gray-700">{product.compatibility.tipo}</span>
              </div>
            )}
            {product.compatibility.capacidad_watts && (
              <div className="flex justify-between">
                <span>Potencia:</span>
                <span className="font-semibold text-gray-700">{product.compatibility.capacidad_watts}W</span>
              </div>
            )}
          </div>
        )}
        
        {/* Add to Build Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToBuild(product);
          }}
          disabled={isSelected}
          className={`
            w-full mt-3 py-2.5 px-4 rounded-lg font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2
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
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>En tu build</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
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
