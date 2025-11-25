// Componente para el botón de ver detalles
import { Eye } from 'lucide-react';

const ViewDetailsButton = ({ onClick }) => {
  return (
    <div className="pt-2">
      <button 
        onClick={onClick}
        className="w-full px-5 py-3.5 rounded-xl font-bold text-sm transition-all duration-300
                 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50
                 flex items-center gap-2 justify-center
                 hover:scale-105"
      >
        <Eye className="h-4 w-4" />
        Ver Detalles
      </button>
    </div>
  );
};

export default ViewDetailsButton;
