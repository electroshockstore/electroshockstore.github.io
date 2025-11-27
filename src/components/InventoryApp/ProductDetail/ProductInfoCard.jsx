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
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 shadow-2xl h-full flex flex-col overflow-hidden group hover:shadow-3xl transition-all duration-500">
      {/* Header con gradiente sutil */}
      <div className="h-2 bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-500 group-hover:h-3 transition-all duration-300" />
      
      {/* Sección superior: Info del producto */}
      <div className="p-8 flex-1">
        <div className="space-y-6">
          {/* Badges flotantes */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-5 py-2.5 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-300 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-default">
              {brand}
            </div>
            <div className="px-5 py-2.5 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl text-sm font-bold shadow-lg shadow-gray-300 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-default">
              {model}
            </div>
          </div>

          {/* Título principal */}
          <div>
            <h1 className="text-4xl font-black text-gray-900 leading-tight tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
              {name}
            </h1>
          </div>

          {/* Descripción con mejor espaciado */}
          <div className="pt-4">
            <p className="text-gray-600 text-lg leading-relaxed font-light">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Sección de precio mejorada */}
      <div className="p-8 pt-0">
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-2xl p-8 shadow-2xl shadow-emerald-300 group/price hover:shadow-emerald-400 transition-all duration-500">
          {/* Patrón de fondo animado */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover/price:translate-x-full transition-transform duration-1000" />
          </div>
          
          {/* Círculos decorativos */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-white/25 rounded-xl backdrop-blur-sm">
                <DollarSign className="h-6 w-6 text-white" strokeWidth={3} />
              </div>
              <span className="text-base font-bold text-white/90 uppercase tracking-wider">
                Precio
              </span>
            </div>
            <div className="text-6xl font-black text-white tracking-tight drop-shadow-lg">
              {formatPrice(price)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductInfoCard;
