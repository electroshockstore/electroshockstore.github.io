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
      percentage: discountPercentage
    };
  }, [product]);

  // Efecto de profundidad solo en desktop
  const depthStyles = index === 1 
    ? 'sm:scale-105 sm:z-20 sm:shadow-2xl sm:shadow-amber-500/30' 
    : 'sm:scale-100 sm:z-10 sm:shadow-xl sm:shadow-black/50';

  return (
    <div 
      onClick={() => onClick(product)}
      className={`group relative bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f1419] 
                 rounded-lg sm:rounded-3xl border border-gray-700/50 sm:border-gray-700/30
                 hover:border-amber-500/60 hover:shadow-xl sm:hover:shadow-2xl hover:shadow-amber-500/20 sm:hover:shadow-amber-500/40
                 transition-all duration-300 sm:duration-500 cursor-pointer overflow-visible flex flex-col
                 ${depthStyles} hover:scale-[1.02] sm:hover:scale-110 hover:z-30`}
    >
      {/* Glow effect de fondo - Solo desktop */}
      <div className="hidden sm:block absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Badges superiores */}
      <div className="absolute -top-2 left-0 right-0 z-20 flex items-center justify-between px-1.5 sm:px-4">
        {/* Badge de Pack */}
        <div className="flex items-center gap-0.5 sm:gap-1.5 px-1.5 py-0.5 sm:px-3 sm:py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-md sm:rounded-xl shadow-md sm:shadow-lg">
          <Package className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-white" strokeWidth={2.5} />
          <span className="text-[9px] sm:text-sm font-black text-white uppercase tracking-wider">
            x{product.quantity}
          </span>
        </div>

        {/* Badge de Ahorro */}
        <div className="flex items-center gap-0.5 sm:gap-1.5 px-1.5 py-0.5 sm:px-3 sm:py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-md sm:rounded-xl shadow-md sm:shadow-lg">
          <TrendingDown className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-white" strokeWidth={2.5} />
          <span className="text-[9px] sm:text-sm font-black text-white">
            -{savings.percentage}%
          </span>
        </div>
      </div>

      {/* Contenedor con overflow hidden */}
      <div className="overflow-hidden rounded-lg sm:rounded-3xl">
        {/* Imagen del producto */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-900/30 to-gray-800/30 mt-3 sm:mt-4">
          {/* Glow circular detrás de la imagen - Solo desktop */}
          <div className="hidden sm:flex absolute inset-0 items-center justify-center">
            <div className="w-2/3 h-2/3 bg-gradient-to-br from-amber-500/15 via-orange-500/15 to-transparent rounded-full blur-3xl" />
          </div>
          
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="relative z-10 w-full h-full object-contain transition-transform duration-300 sm:duration-700 group-hover:scale-105"
            loading="lazy"
            style={{
              filter: 'brightness(1.1) contrast(1.05)'
            }}
          />
        </div>

        {/* Información del producto */}
        <div className="relative z-10 p-1.5 sm:p-6 flex flex-col gap-1 sm:gap-3 bg-gradient-to-b from-transparent to-black/40">
          {/* Header */}
          <div>
            {/* Marca */}
            <p className="text-[8px] sm:text-sm font-bold sm:font-black text-amber-400 uppercase tracking-wide sm:tracking-widest mb-0.5 sm:mb-2">
              {product.brand}
            </p>
            
            {/* Nombre */}
            <h3 className="font-bold sm:font-black text-[10px] sm:text-lg text-white line-clamp-2 leading-tight mb-1 sm:mb-3">
              {product.name}
            </h3>

            {/* Pack info */}
            <div className="inline-flex items-center gap-0.5 sm:gap-2 px-1 py-0.5 sm:px-3 sm:py-1.5 bg-white/5 border border-white/10 rounded sm:rounded-lg backdrop-blur-sm">
              <Package className="w-2 h-2 sm:w-3.5 sm:h-3.5 text-gray-400" />
              <span className="text-[7px] sm:text-xs font-semibold text-gray-300">
                Pack x{product.quantity}
              </span>
            </div>
          </div>
          
          {/* Ahorro */}
          <div className="mt-1 sm:pt-3 sm:border-t sm:border-gray-700/50">
            <div className="relative overflow-hidden rounded-md sm:rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 sm:border-2 sm:border-green-500/40 p-1.5 sm:p-3">
              {/* Animación pulse solo en desktop */}
              <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 animate-pulse" />
              <div className="relative text-center">
                <div className="text-[8px] sm:text-xs text-green-300 font-semibold mb-0.5 sm:mb-1">🎉 Ahorrás</div>
                <div className="text-base sm:text-3xl font-black text-green-400 leading-tight">
                  ${savings.amount.toLocaleString()}
                </div>
                <div className="text-[7px] sm:text-[10px] text-green-300/70 sm:text-green-300/80 font-medium mt-0.5 sm:mt-1">
                  en este pack
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Borde brillante en hover - Solo desktop */}
      <div className="hidden sm:block absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-amber-400/50 transition-all duration-500 pointer-events-none" />
      
      {/* Shine effect en hover - Solo desktop */}
      <div className="hidden sm:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </div>
    </div>
  );
});

ProductCardMayorista.displayName = 'ProductCardMayorista';
export default ProductCardMayorista;
