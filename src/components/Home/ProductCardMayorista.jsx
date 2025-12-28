import { memo, useMemo } from 'react';
import { Package, TrendingDown } from 'lucide-react';

const ProductCardMayorista = memo(({ product, onClick, index = 0 }) => {
  // Calcular ahorro
  const savings = useMemo(() => {
    const totalRegular = product.unitPrice * product.quantity;
    const discount = totalRegular - product.price;
    const discountPercentage = ((discount / totalRegular) * 100).toFixed(0);
    return {
      amount: discount,
      percentage: discountPercentage,
      pricePerUnit: Math.round(product.price / product.quantity)
    };
  }, [product]);

  // Efecto de profundidad: card central más grande y adelante
  const depthStyles = index === 1 
    ? 'scale-105 z-20 shadow-2xl shadow-amber-500/30' 
    : 'scale-100 z-10 shadow-xl shadow-black/50';

  return (
    <div 
      onClick={() => onClick(product)}
      className={`group relative bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f1419] rounded-xl sm:rounded-3xl border border-gray-700/30
                 hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-500/40
                 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col
                 ${depthStyles} hover:scale-105 sm:hover:scale-110 hover:z-30`}
    >
      {/* Glow effect de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Badges superiores */}
      <div className="relative z-10 flex items-start justify-between p-2 sm:p-4">
        {/* Badge de Pack */}
        <div className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg sm:rounded-xl shadow-lg">
          <Package className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={2.5} />
          <span className="text-[10px] sm:text-sm font-black text-white uppercase tracking-wider">
            x{product.quantity}
          </span>
        </div>

        {/* Badge de Ahorro */}
        <div className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg sm:rounded-xl shadow-lg">
          <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={2.5} />
          <span className="text-[10px] sm:text-sm font-black text-white">
            -{savings.percentage}%
          </span>
        </div>
      </div>

      {/* Imagen del producto - Más compacta */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-800/50">
        {/* Glow circular detrás de la imagen */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2/3 h-2/3 bg-gradient-to-br from-amber-500/15 via-orange-500/15 to-transparent rounded-full blur-3xl" />
        </div>
        
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="relative z-10 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          loading="lazy"
          style={{
            filter: 'brightness(1.2) contrast(1.1) saturate(1.1)'
          }}
        />
      </div>

      {/* Información del producto - Simplificada para Home */}
      <div className="relative z-10 p-2 sm:p-4 flex flex-col gap-1.5 sm:gap-2 bg-gradient-to-b from-transparent to-black/40">
        {/* Header */}
        <div>
          {/* Marca */}
          <p className="text-[9px] sm:text-xs font-black text-amber-400 tracking-widest uppercase mb-0.5 sm:mb-1">
            {product.brand}
          </p>
          
          {/* Nombre */}
          <h3 className="font-black text-[11px] sm:text-sm text-white line-clamp-2 leading-tight mb-1 sm:mb-2">
            {product.name}
          </h3>

          {/* Pack info */}
          <div className="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2 sm:py-1 bg-white/5 border border-white/10 rounded-md backdrop-blur-sm">
            <Package className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400" />
            <span className="text-[8px] sm:text-[10px] font-semibold text-gray-300">
              Pack x{product.quantity}
            </span>
          </div>
        </div>
        
        {/* Solo mostrar el ahorro total - Teaser */}
        <div className="pt-1.5 sm:pt-2 border-t border-gray-700/50">
          {/* Ahorro destacado - ÚNICO ELEMENTO */}
          <div className="relative overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/40 p-2 sm:p-3">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 animate-pulse" />
            <div className="relative text-center">
              <div className="text-[9px] sm:text-xs text-green-300 font-semibold mb-0.5 sm:mb-1">🎉 Ahorrás</div>
              <div className="text-xl sm:text-3xl font-black text-green-400">
                ${savings.amount.toLocaleString()}
              </div>
              <div className="text-[8px] sm:text-[10px] text-green-300/80 font-medium mt-0.5 sm:mt-1">
                en este pack
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Borde brillante en hover */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-amber-400/50 transition-all duration-500 pointer-events-none" />
      
      {/* Shine effect en hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </div>
    </div>
  );
});

ProductCardMayorista.displayName = 'ProductCardMayorista';
export default ProductCardMayorista;
