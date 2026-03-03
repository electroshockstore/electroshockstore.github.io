import { Grid3x3, X } from 'lucide-react';

const CategoryModalHeader = ({ onClose, categoriesCount }) => {
  return (
    <div className="flex-shrink-0 relative overflow-hidden bg-black rainbow-border-bottom-only font-barlow-condensed">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <Grid3x3 className="w-full h-full text-blue-500/20" />
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-4 relative z-10">
        {/* Left: icon + title */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-500 clip-path-beveled">
            {/* Pulsing ring */}
            <div className="absolute inset-0 animate-ping opacity-30 border-2 border-blue-500 clip-path-beveled" />
            <Grid3x3 className="w-5 h-5 text-blue-500 relative z-10" strokeWidth={2} />
          </div>

          <div>
            <h2 className="text-white font-black uppercase leading-none tracking-wider text-xl">
              CATEGORÍAS
            </h2>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-transparent" />
              <span className="text-blue-400 font-bold uppercase tracking-widest text-[10px]">
                {categoriesCount} DISPONIBLES
              </span>
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="relative flex items-center justify-center w-9 h-9 transition-all duration-150 active:scale-90 bg-gray-900 border border-gray-700 clip-path-beveled-sm hover:bg-blue-500/15"
        >
          <X className="w-4 h-4 text-gray-400" strokeWidth={2.5} />
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-150 bg-blue-500/15 clip-path-beveled-sm" />
        </button>
      </div>
    </div>
  );
};

export default CategoryModalHeader;
