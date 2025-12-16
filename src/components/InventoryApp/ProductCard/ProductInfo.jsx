const ProductInfo = ({ name, brand, model }) => {
  return (
    <div className="space-y-1 text-left">
      {/* 1. Marca y Modelo (Elemento superior - sin cambios) */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
          {brand}
        </span>
        <span className="text-[15px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
          {model}
        </span>
      </div>

      {/* 2. Título como Badge - ALINEADO A LA IZQUIERDA */}
      {/* Quitamos el div de centrado y mx-auto. Usamos inline-block y text-left. */}
      <div>
        <h3 className="inline-block /* Asegura que solo ocupe el ancho del contenido */
                      text-left px-4 py-2 rounded-xl
                      font-black text-lg text-white line-clamp-2  max-w-full
                      
                      /* Gradiente Azul-Violeta Fijo */
                      bg-gradient-to-r from-blue-600 to-purple-600 
                      shadow-xl border-2 border-blue-500
                      transition-all duration-300">
          {name}
        </h3>
      </div>
      
    </div>
  );
};

export default ProductInfo;