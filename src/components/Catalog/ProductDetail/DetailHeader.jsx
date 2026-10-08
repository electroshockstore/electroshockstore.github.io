// Header del modal de detalle
import { ArrowLeft, X } from 'lucide-react';
import Breadcrumb from './Breadcrumb';

const DetailHeader = ({ onClose, isPage = false, product }) => {
  return (
    <div className={`${isPage ? '' : 'sticky top-0 z-50'} bg-white sm:backdrop-blur-xl sm:bg-white/95 border-b border-gray-200 shadow-lg rounded-t-2xl sm:rounded-t-3xl`}>
      <div className="px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onClose}
            aria-label="Volver atrás"
            title="Volver atrás"
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-white shadow-[0_12px_26px_-10px_rgba(79,70,229,0.8),inset_0_1px_0_rgba(255,255,255,0.4)] ring-1 ring-white/40 transition-all duration-200 hover:brightness-110 active:scale-90"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={2.5} />
          </button>

          {/* Breadcrumb en el centro */}
          {product && (
            <div className="flex-1 min-w-0">
              <Breadcrumb category={product.category} productName={product.name} />
            </div>
          )}

          {/* Cerrar: solo en modal (en página, Volver ya hace esto) */}
          {!isPage && (
            <button
              onClick={onClose}
              className="flex min-h-[44px] min-w-[44px] flex-shrink-0 items-center justify-center rounded-full bg-gray-900/[0.05] text-gray-500 ring-1 ring-black/[0.05] transition-all duration-200 hover:bg-gray-900/10 hover:text-gray-800 active:scale-90"
              aria-label="Cerrar"
              title="Cerrar"
            >
              <X className="h-5 w-5" strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;
