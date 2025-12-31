// PriceDisplay.jsx
import { Tag } from 'lucide-react'; // Opcional: Icono para decorar si quieres

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'decimal', // Usamos decimal para separar el símbolo nosotros mismos
    minimumFractionDigits: 0
  }).format(price);
};

const PriceDisplay = ({ price, category }) => {
  return (
    <div className="flex flex-col gap-0.5 sm:gap-1">
      {/* Contenedor principal con fondo sutil y borde */}
      <div className="relative flex items-center justify-between px-2 sm:px-4 py-1.5 sm:py-3 
                      bg-gray-50 rounded-lg sm:rounded-xl border border-gray-100 
                      hover:border-blue-200 transition-colors duration-300">
        
        {/* Sección Izquierda: Etiqueta */}
        <div className="flex flex-col items-start gap-0.5">
          <span className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
            Precio
          </span>
          {/* Badge "Contado" */}
          <span className="text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-bold">
            CONTADO
          </span>
        </div>

        {/* Sección Derecha: El Precio - Responsive */}
        <div className="flex items-baseline gap-0.5">
          <span className="text-xs sm:text-lg text-gray-400 font-medium select-none">$</span>
          <span className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter leading-none">
            {formatPrice(price)}
          </span>
        </div>
      </div>
      
      {/* Categoría - Oculta en mobile */}
      {category && (
        <div className="hidden sm:flex justify-end px-1">
           <span className="text-[10px] text-gray-400 font-medium truncate">
             en {category}
           </span>
        </div>
      )}
    </div>
  );
};

export default PriceDisplay;