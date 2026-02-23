import { Grid3X3, ChevronDown } from 'lucide-react';
import { getCategoryImage } from '../../../constants/categoryConfig';

const MobileDropdown = ({ isOpen, selectedCategory, onClick, dropdownRef }) => {
  return (
    <div 
      className={`sm:hidden relative z-20 ${isOpen ? 'dropdown-open' : ''}`} 
      ref={dropdownRef}
    >
      <button
        onClick={onClick}
        className="relative w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-white to-gray-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-gray-100"
      >
        <div className="flex items-center gap-3">
          {selectedCategory ? (
            <>
              {/* Mini preview de la imagen de categoría */}
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md ring-2 ring-white">
                <img
                  src={getCategoryImage(selectedCategory)}
                  alt={selectedCategory}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-500 font-medium">Categoría</span>
                <span className="font-bold text-gray-900 text-sm leading-tight">{selectedCategory}</span>
              </div>
            </>
          ) : (
            <>
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-md">
                <Grid3X3 className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-500 font-medium">Explorar</span>
                <span className="font-bold text-gray-800 text-sm leading-tight">Todas las categorías</span>
              </div>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-medium hidden xs:block">Ver más</span>
          <ChevronDown
            className="dropdown-icon h-5 w-5 text-gray-400 transition-transform duration-300"
            strokeWidth={2.5}
          />
        </div>
      </button>
    </div>
  );
};

export default MobileDropdown;
