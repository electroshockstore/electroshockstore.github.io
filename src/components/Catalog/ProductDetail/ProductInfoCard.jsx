// Card unificada de información del producto - Diseño moderno
import { DollarSign, ExternalLink } from 'lucide-react';
import WhatsAppButton from '../../Shared/WhatsAppButton';
import ShareButton from '../../Shared/ShareButton';
import { formatPriceNumber } from '../../../utils/priceFormatter';

const ProductInfoCard = ({ 
  name, 
  brand, 
  model, 
  description, 
  price,
  product
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
              {product.manufacturerUrl && (
                <a
                  href={product.manufacturerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full text-xs sm:text-sm lg:text-base font-bold shadow-lg shadow-emerald-200 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 flex items-center gap-1.5 group"
                >
                  <span>Web Fabricante</span>
                  <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
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

      {/* Sección inferior: Botones de contacto + Precio */}
      <div className="p-4 sm:p-6 lg:p-8 pt-0 space-y-4">
        {/* Botones de contacto */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ShareButton productName={name} product={product} className="relative overflow-hidden group" />
          <WhatsAppButton productName={name} product={product} className="relative overflow-hidden group" />
        </div>
        
        {/* Precio - Icono azul + número sin símbolo $ */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg p-4 sm:p-6 lg:p-8 shadow-md border-2 border-blue-200 group">
          <div className="relative flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 lg:p-3 bg-blue-600/20 rounded-lg">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-600" strokeWidth={2.5} />
              </div>
            </div>
            <div className="text-2xl sm:text-4xl lg:text-7xl font-black text-gray-800 tracking-tight">
              {formatPriceNumber(price)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductInfoCard;
