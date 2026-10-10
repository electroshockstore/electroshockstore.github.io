import { Grid3x3, ChevronDown } from 'lucide-react';

/**
 * Botón héroe de categorías. En modo `compact` (header colapsado) se afina
 * para ocupar menos alto sin perder presencia.
 */
const CategoryButton = ({ onClick, compact = false }) => {
  return (
    <div className="relative group z-20 w-full">
      {/* RGB FLOWING BORDER - toque insignia, no quitar */}
      <div className="relative rounded-[3rem] overflow-hidden p-[3px] animate-border-rotate">
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-[calc(3rem-3px)] z-10">
          <button
            onClick={onClick}
            aria-label="Explorar todas las categorías"
            className={`relative w-full flex items-center justify-between transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group ${
              compact ? 'px-4 py-2.5' : 'px-5 py-4'
            }`}
          >
            <div className={`flex items-center transition-all duration-300 motion-reduce:transition-none ${compact ? 'gap-2.5' : 'gap-3.5'}`}>
              {/* Icono de Grid sólido */}
              <div className="relative">
                <div className={`relative bg-cyber-cyan rounded-xl transition-all duration-300 motion-reduce:transition-none ${compact ? 'p-2' : 'p-2.5'}`}>
                  <Grid3x3 className={`text-cyber-bg transition-all duration-300 motion-reduce:transition-none ${compact ? 'h-5 w-5' : 'h-6 w-6'}`} strokeWidth={2.5} />
                </div>
              </div>

              {/* Texto */}
              <div className="flex flex-col items-start">
                <span className={`text-gray-400 font-semibold transition-all duration-300 motion-reduce:transition-none ${compact ? 'text-[11px]' : 'text-xs'}`}>
                  Explorar
                </span>
                <span className={`font-black text-white tracking-tight transition-all duration-300 motion-reduce:transition-none ${compact ? 'text-sm' : 'text-lg'}`}>
                  Todas las categorías
                </span>
              </div>
            </div>

            {/* Chevron */}
            <ChevronDown className={`text-white/80 group-hover:text-white transition-all duration-300 motion-reduce:transition-none ${compact ? 'h-5 w-5' : 'h-6 w-6'}`} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryButton;
