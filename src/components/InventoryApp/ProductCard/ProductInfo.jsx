const ProductInfo = ({ name, brand, model, isUsed }) => {
  const displayName = isUsed ? `${name} - USADA` : name;
  
  return (
    <div className="space-y-1 text-left">
      {/* 1. Marca y Modelo */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-blue-600 tracking-wider uppercase truncate">
          {brand}
        </span>
        <span className="text-xs sm:text-[15px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full truncate max-w-[40%]">
          {model}
        </span>
      </div>

      {/* 2. Título - Siempre visible completo en mobile */}
      <div>
        <h3 className="inline-block text-left px-3 sm:px-4 py-2 rounded-xl
                      font-black text-sm sm:text-lg text-white line-clamp-3 max-w-full
                      bg-gradient-to-r from-blue-600 to-purple-600 
                      shadow-xl border-2 border-blue-500
                      transition-all duration-300 leading-tight">
          {displayName}
        </h3>
      </div>
      
    </div>
  );
};

export default ProductInfo;