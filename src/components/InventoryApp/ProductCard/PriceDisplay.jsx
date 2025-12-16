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
    <div className="flex flex-col gap-1">
      {/* Contenedor principal con fondo sutil y borde */}
      <div className="relative flex items-center justify-between px-4 py-3 
                      bg-gray-50 rounded-xl border border-gray-100 
                      hover:border-blue-200 transition-colors duration-300">
        
        {/* Sección Izquierda: Etiqueta */}
        <div className="flex flex-col items-start gap-0.5">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
            Precio Final
          </span>
          {/* Badge "Contado" opcional para dar contexto */}
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-bold">
            CONTADO
          </span>
        </div>

        {/* Sección Derecha: El Precio con Jerarquía Tipográfica */}
        <div className="flex items-baseline gap-1">
          <span className="text-lg text-gray-400 font-medium select-none">$</span>
          <span className="text-5xl font-black text-gray-900 tracking-tighter leading-none">
            {formatPrice(price)}
          </span>
        </div>
      </div>
      
      {/* Categoría (fuera del bloque de precio para no ensuciar) */}
      {category && (
        <div className="flex justify-end px-1">
           <span className="text-[10px] text-gray-400 font-medium">
             en {category}
           </span>
        </div>
      )}
    </div>
  );
};

export default PriceDisplay;