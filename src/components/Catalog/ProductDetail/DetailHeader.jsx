// Header del modal de detalle
import { ArrowLeft, X } from 'lucide-react';
import Breadcrumb from './Breadcrumb';

const DetailHeader = ({ onClose, isPage = false, product }) => {
  return (
    <div className={`${isPage ? '' : 'sticky top-0 z-50'} backdrop-blur-xl bg-white/95 border-b border-gray-200 shadow-lg rounded-t-2xl sm:rounded-t-3xl`}>
      <div className="px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-700 hover:text-blue-600 
                     font-semibold transition-all rounded-xl hover:bg-blue-50 text-sm sm:text-base flex-shrink-0"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">Volver</span>
          </button>

          {/* Breadcrumb en el centro */}
          {product && (
            <div className="flex-1 min-w-0">
              <Breadcrumb category={product.category} productName={product.name} />
            </div>
          )}

          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 hover:bg-gray-100 rounded-xl transition-all hover:rotate-90 duration-300 flex-shrink-0"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;
