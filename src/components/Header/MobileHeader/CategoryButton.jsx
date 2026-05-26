import { Grid3x3, ChevronDown } from 'lucide-react';

const CategoryButton = ({ onClick }) => {
  return (
    <div className="relative group z-20 w-full">
      {/* RGB FLOWING BORDER - Copiado del CategoryFilter viejo */}
      <div className="relative rounded-[3rem] overflow-hidden p-[3px] animate-border-rotate">
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-[calc(3rem-3px)] z-10">
          <button
            onClick={onClick}
            className="relative w-full flex items-center justify-between px-5 py-4 group"
          >
            <div className="flex items-center gap-3.5">
              {/* Icono de Grid con gradiente morado */}
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500 rounded-xl blur-sm opacity-30" />
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryButton;
