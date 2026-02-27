import { Grid3X3, X } from 'lucide-react';

const CategoryModalHeader = ({ onClose, categoriesCount }) => {
  return (
    <div 
      className="flex-shrink-0 px-4 py-4 flex items-center justify-between border-b relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom right, rgb(17, 24, 39), rgb(31, 41, 55), rgb(17, 24, 39))',
        borderColor: 'rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Glow decorativo */}
      <div 
        className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full pointer-events-none"
        style={{ filter: 'blur(48px)' }}
      />
      <div 
        className="absolute top-0 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full pointer-events-none"
        style={{ filter: 'blur(48px)' }}
      />
      
      <div className="flex items-center gap-4 relative z-10">
        <div 
          className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 shadow-xl"
          style={{ filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))' }}
        >
          <Grid3X3 className="h-7 w-7 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h2 
            className="text-2xl font-black text-white tracking-tight"
            style={{ filter: 'drop-shadow(0 2px 8px rgba(59, 130, 246, 0.6))' }}
          >
            Categorías
          </h2>
          <p className="text-sm text-gray-400 font-semibold mt-0.5">
            {categoriesCount} opciones disponibles
          </p>
        </div>
      </div>
      
      <button
        onClick={onClose}
        className="p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200 active:scale-90 border border-white/10 relative z-10"
        style={{ backdropFilter: 'blur(4px)' }}
      >
        <X className="h-6 w-6 text-gray-300 hover:text-white transition-colors" strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default CategoryModalHeader;
