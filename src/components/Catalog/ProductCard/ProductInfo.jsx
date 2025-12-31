const ProductInfo = ({ name, brand, model, isUsed }) => {
  const displayName = isUsed ? `${name} - USADA` : name;
  
  return (
    <div className="space-y-1 text-left">
      {/* 1. Marca y Modelo */}
      <div className="flex items-center justify-between mb-1 sm:mb-2">
        <span className="text-[10px] sm:text-xs font-bold text-blue-600 tracking-wider uppercase truncate">
          {brand}
        </span>
        <span className="text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full truncate max-w-[40%]">
          {model}
        </span>
      </div>

      {/* 2. Título - Más compacto en mobile */}
      <div>
        <h3 className="inline-block text-left px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl
                      font-black text-xs sm:text-lg text-white line-clamp-2 sm:line-clamp-3 max-w-full
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