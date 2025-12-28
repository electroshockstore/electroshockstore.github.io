// ViewDetailsButton.jsx
import { Eye, ShoppingCart } from 'lucide-react'; // Sugiero agregar carrito si aplica

const ViewDetailsButton = ({ onClick }) => {
  return (
    <button 
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="w-full group/btn relative flex items-center justify-center gap-1.5 sm:gap-2 
                 bg-gray-900 hover:bg-blue-600 text-white 
                 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm
                 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-blue-500/20"
    >
      <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover/btn:scale-110" />
      <span className="hidden sm:inline">Ver Detalles</span>
      <span className="sm:hidden">Ver</span>
      
      {/* Flecha animada - solo en desktop */}
      <svg 
        className="hidden sm:block w-4 h-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300 absolute right-4" 
        fill="none" viewBox="0 0 24 24" stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </button>
  );
};

export default ViewDetailsButton;