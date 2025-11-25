// Información principal del producto
const ProductMainInfo = ({ name, brand, model, category, description }) => {
  return (
    <div className="mb-4 sm:mb-6">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-3 sm:mb-4 leading-tight">
        {name}
      </h1>
      <div className="flex flex-wrap items-center gap-3">
        <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-shadow">
          {brand}
        </span>
        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-bold">
          {model}
        </span>
        <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
          {category}
        </span>
      </div>
      <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mt-4">
        {description}
      </p>
    </div>
  );
};

export default ProductMainInfo;
