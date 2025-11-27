// Card unificada de información del producto - Diseño moderno
import { DollarSign } from 'lucide-react';

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0
  }).format(price);
};


const ProductInfoCard = ({ 
  name, 
  brand, 
  model, 
  description, 
  price
}) => {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg h-full flex flex-col">
      {/* Sección superior: Info del producto */}
      <div className="p-4 sm:p-6 lg:p-8 flex-1">
        <div className="space-y-4 sm:space-y-5 lg:space-y-6">
          {/* Título y badges */}
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-xl sm:text-2xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight">
              {name}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <div className="px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full text-xs sm:text-sm lg:text-base font-bold shadow-lg shadow-blue-200">
                {brand}
              </div>
              <div className="px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm lg:text-base font-semibold border border-gray-200">
                {model}
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="pt-2 sm:pt-3 lg:pt-4 border-t border-gray-100">
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Sección inferior: Precio */}
      <div className="p-4 sm:p-6 lg:p-8 pt-0">
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg p-4 sm:p-6 lg:p-8 shadow-xl shadow-emerald-200 border-2 border-emerald-400 group">
          {/* Efecto de brillo */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          <div className="relative flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 lg:p-3 bg-white/20 rounded-lg">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xs sm:text-sm lg:text-base font-bold text-emerald-50 uppercase tracking-wide">
                Precio
              </span>
            </div>
            <div className="text-2xl sm:text-4xl lg:text-6xl font-black text-white tracking-tight">
              {formatPrice(price)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductInfoCard;
