// Componente para la información del producto
const ProductInfo = ({ name, brand, model }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-center">
        <h3 className="text-center px-4 py-2.5 rounded-xl
                     font-black text-base text-white line-clamp-2 min-h-[3.5rem]
                     bg-gradient-to-r from-gray-800 to-gray-900 
                     shadow-lg border-2 border-gray-700
                     group-hover:from-blue-600 group-hover:to-purple-600
                     group-hover:border-blue-500 group-hover:shadow-xl
                     transition-all duration-300 max-w-full">
          {name}
        </h3>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 
                       text-blue-700 rounded-full text-xs font-bold border border-blue-200/50">
          {brand}
        </span>
        <span className="text-sm text-gray-600 font-medium">{model}</span>
      </div>
    </div>
  );
};

export default ProductInfo;
