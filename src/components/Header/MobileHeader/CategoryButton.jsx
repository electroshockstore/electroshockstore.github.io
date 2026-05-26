import { Grid3x3, ChevronDown } from 'lucide-react';

const CategoryButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative w-full overflow-hidden rounded-[3rem] group"
    >
      {/* Glow exterior animado */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-[3rem] opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Borde RGB con gradiente */}
      <div 
        className="absolute inset-0 rounded-[3rem] p-[2px]" 
        style={{
          background: 'linear-gradient(90deg, rgb(59, 130, 246), rgb(168, 85, 247), rgb(16, 185, 129))'
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-[calc(3rem-2px)]" />
      </div>
      
      {/* Contenido del botón */}
      <div className="relative flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3.5">
          {/* Icono de Grid con gradiente morado */}
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500 rounded-xl blur-md opacity-50" />
            <div className="relative p-2.5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
              <Grid3x3 className="h-6 w-6 text-white" strokeWidth={2.5} />
            </div>
          </div>
          
          {/* Texto */}
          <div className="flex flex-col items-start">
            <span className="text-xs text-gray-400 font-semibold">Explorar</span>
            <span className="text-lg font-black text-white tracking-tight">Todas las categorías</span>
          </div>
        </div>
        
        {/* Chevron */}
        <ChevronDown className="h-6 w-6 text-white/80 group-hover:text-white transition-colors" strokeWidth={2.5} />
      </div>
    </button>
  );
};

export default CategoryButton;
