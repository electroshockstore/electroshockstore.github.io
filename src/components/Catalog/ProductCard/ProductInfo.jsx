const ProductInfo = ({ name, brand, model, isUsed, isDDR5 }) => {
  const displayName = isUsed ? `${name} - USADA` : name;
  
  // Detectar si es DDR4 (cuando no es DDR5 pero es categoría RAM)
  const isDDR4 = !isDDR5 && name?.toUpperCase().includes('DDR4');
  
  return (
    <div className="space-y-1 text-left">
      {/* 1. Marca y Logo DDR (mobile) / Modelo (desktop) */}
      <div className="flex items-center justify-between mb-1 sm:mb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] sm:text-xs font-bold text-blue-600 tracking-wider uppercase truncate">
            {brand}
          </span>
        </div>
        
        {/* Mobile: Mostrar logo DDR5 o DDR4 */}
        <div className="sm:hidden">
          {isDDR5 && (
            <img 
              src="/images/ram/ddr5_logo.webp" 
              alt="DDR5" 
              className="h-5 w-auto object-contain"
              loading="lazy"
            />
          )}
          {isDDR4 && (
            <img 
              src="/images/ram/ddr4_logo.webp" 
              alt="DDR4" 
              className="h-5 w-auto object-contain"
              loading="lazy"
            />
          )}
        </div>
        
        {/* Desktop: Mostrar modelo */}
        <span className="hidden sm:inline-block text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full truncate max-w-[40%]">
          {model}
        </span>
      </div>

      {/* 2. Título - Más compacto en mobile */}
      <div>
        <h3 className="inline-block text-left px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl
                      font-black text-xs sm:text-xs text-white line-clamp-2 sm:line-clamp-3 max-w-full
                      bg-gradient-to-r from-blue-600 to-purple-600 
                      shadow-lg sm:shadow-xl border sm:border-2 border-blue-500
                      transition-all duration-300 leading-tight">
          {displayName}
        </h3>
      </div>
      
    </div>
  );
};

export default ProductInfo;