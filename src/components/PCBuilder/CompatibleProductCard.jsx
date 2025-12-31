import { usePCBuilder } from '../../context/PCBuilderContext';

const CompatibleProductCard = ({ product, compatibilityResult, onClick, isSelected }) => {
  const { status, reasons } = compatibilityResult;
  
  const statusConfig = {
    green: {
      border: 'border-green-400',
      bg: 'bg-gradient-to-br from-green-50 to-emerald-50',
      badge: 'from-green-500 to-emerald-600',
      shadow: 'shadow-green-200',
      icon: '✓',
      text: 'Compatible'
    },
    yellow: {
      border: 'border-yellow-400',
      bg: 'bg-gradient-to-br from-yellow-50 to-amber-50',
      badge: 'from-yellow-500 to-orange-500',
      shadow: 'shadow-yellow-200',
      icon: '⚠',
      text: 'Advertencia'
    },
    red: {
      border: 'border-red-400',
      bg: 'bg-gradient-to-br from-red-50 to-rose-50',
      badge: 'from-red-500 to-rose-600',
      shadow: 'shadow-red-200',
      icon: '✕',
      text: 'Incompatible'
    }
  };
  
  const config = statusConfig[status];
  const isDisabled = status === 'red';
  
  return (
    <div
      onClick={() => !isDisabled && onClick(product)}
      className={`
        relative bg-white rounded-2xl border-3 p-5 transition-all duration-300 overflow-hidden group
        ${isSelected 
          ? 'border-blue-500 shadow-2xl shadow-blue-500/40 ring-4 ring-blue-200 scale-105' 
          : config.border
        }
        ${isDisabled 
          ? 'opacity-60 cursor-not-allowed grayscale' 
          : 'cursor-pointer hover:shadow-2xl hover:scale-105 shadow-lg ' + config.shadow
        }
      `}
    >
      {/* Animated background glow */}
      {!isDisabled && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      
      {/* Badge */}
      <div className="absolute top-3 right-3 z-10">
        {isSelected ? (
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black px-3 py-2 rounded-full flex items-center gap-2 shadow-xl shadow-blue-500/50 animate-pulse">
            <span className="text-base">✓</span>
            <span className="uppercase tracking-wider">Seleccionado</span>
          </div>
        ) : (
          <div className={`bg-gradient-to-r ${config.badge} text-white text-xs font-black px-3 py-2 rounded-full flex items-center gap-2 shadow-lg`}>
            <span className="text-sm">{config.icon}</span>
            <span className="uppercase tracking-wide">{config.text}</span>
          </div>
        )}
      </div>
      
      {/* Product Image */}
      {product.images && product.images[0] && (
        <div className="mb-4 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-40 object-contain transform group-hover:scale-110 transition-transform duration-500 filter drop-shadow-xl"
            loading="lazy"
          />
        </div>
      )}
      
      {/* Product Info */}
      <div className="space-y-3 relative z-10">
        <h3 className="font-black text-gray-900 text-base leading-tight line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ${product.price.toLocaleString('es-AR')}
          </span>
          
          {product.stock === 0 && (
            <span className="text-xs font-black text-red-600 bg-gradient-to-r from-red-100 to-rose-100 px-3 py-1.5 rounded-full border-2 border-red-300">
              Sin stock
            </span>
          )}
          {product.stock > 0 && product.stock <= 3 && (
            <span className="text-xs font-black text-orange-600 bg-gradient-to-r from-orange-100 to-amber-100 px-3 py-1.5 rounded-full border-2 border-orange-300 animate-pulse">
              {product.stock} unidades
            </span>
          )}
        </div>
        
        {/* Compatibility Reasons */}
        {reasons.length > 0 && (
          <div className={`${config.bg} rounded-xl p-3 space-y-2 border-2 ${config.border}`}>
            {reasons.map((reason, idx) => (
              <div key={idx} className="text-xs font-bold text-gray-800 flex items-start gap-2">
                <span className="text-base">{config.icon}</span>
                <span className="flex-1">{reason}</span>
              </div>
            ))}
          </div>
        )}
        
        {/* Key Specs */}
        {product.compatibility && (
          <div className="text-xs font-bold text-gray-600 space-y-2 pt-3 border-t-2 border-gray-100">
            {product.compatibility.socket && (
              <div className="flex justify-between">
                <span>Socket:</span>
                <span className="text-gray-900">{product.compatibility.socket}</span>
              </div>
            )}
            {product.compatibility.tipo && (
              <div className="flex justify-between">
                <span>Tipo:</span>
                <span className="text-gray-900">{product.compatibility.tipo}</span>
              </div>
            )}
            {product.compatibility.capacidad_watts && (
              <div className="flex justify-between">
                <span>Potencia:</span>
                <span className="text-gray-900">{product.compatibility.capacidad_watts}W</span>
              </div>
            )}
            {product.compatibility.consumo_watts && (
              <div className="flex justify-between">
                <span>Consumo:</span>
                <span className="text-gray-900">{product.compatibility.consumo_watts}W</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompatibleProductCard;