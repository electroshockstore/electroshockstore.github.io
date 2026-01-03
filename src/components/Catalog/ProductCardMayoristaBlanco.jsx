import { memo, useMemo } from 'react';
import { Package, TrendingDown } from 'lucide-react';

const ProductCardMayoristaBlanco = memo(({ product, onClick, index = 0 }) => {
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

  return (
    <div 
      onClick={() => onClick(product)}
      className="group relative bg-white rounded-xl sm:rounded-2xl border border-gray-200
                 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10
                 shadow-lg shadow-gray-200/50
                 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
    >
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

      {/* Imagen del producto */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="relative z-10 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Información del producto */}
      <div className="relative z-10 p-3 sm:p-6 flex flex-col gap-2 sm:gap-3">
        {/* Header */}
        <div>
          {/* Marca */}
          <p className="text-[10px] sm:text-sm font-black text-amber-600 tracking-widest uppercase mb-1 sm:mb-2">
            {product.brand}
          </p>
          
          {/* Nombre */}
          <h3 className="font-black text-sm sm:text-lg text-gray-900 line-clamp-2 leading-tight mb-2 sm:mb-3">
            {product.name}
          </h3>

          {/* Pack info */}
          <div className="inline-flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-100 border border-gray-200 rounded-lg">
            <Package className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-600" />
            <span className="text-[10px] sm:text-xs font-semibold text-gray-700">
              Pack de {product.quantity} unidades
            </span>
          </div>
        </div>
        
        {/* Pricing section */}
        <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-3 border-t border-gray-200">
          {/* Precio por unidad */}
          <div className="bg-gray-50 rounded-lg p-2 sm:p-3 border border-gray-200">
            <div className="text-[10px] sm:text-xs text-gray-600 font-medium mb-0.5 sm:mb-1">Precio por unidad:</div>
            <div className="text-base sm:text-2xl font-black text-gray-900">
              ${product.unitPrice.toLocaleString('es-AR')}
            </div>
          </div>

          {/* Ahorro destacado */}
          <div className="relative overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 p-2 sm:p-3">
            <div className="relative">
              <div className="text-[10px] sm:text-xs text-green-700 font-semibold mb-0.5 sm:mb-1">Llevando pack ahorrás:</div>
              <div className="text-lg sm:text-3xl font-black text-green-600">
                ${savings.amount.toLocaleString('es-AR')}
              </div>
            </div>
          </div>

          {/* Precio total del pack */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg sm:rounded-xl p-2.5 sm:p-4 border-2 border-amber-400">
            <div className="text-[10px] sm:text-xs text-amber-700 font-semibold mb-0.5 sm:mb-1">Total pack:</div>
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-xl text-amber-600 font-bold">$</span>
              <span className="text-2xl sm:text-4xl font-black text-gray-900">
                {product.price.toLocaleString('es-AR')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Borde en hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-amber-400/50 transition-all duration-300 pointer-events-none" />
    </div>
  );
});

ProductCardMayoristaBlanco.displayName = 'ProductCardMayoristaBlanco';
export default ProductCardMayoristaBlanco;
