// Sección de imagen del producto con galería
import { useState } from 'react';
import { Package, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductImageSection = ({ images = [], name, stock, stockStatus }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const hasMultipleImages = images.length > 1;
  const currentImage = images[currentImageIndex] || images[0];

  const nextImage = () => {
    setImageLoaded(false);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setImageLoaded(false);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg p-6 overflow-hidden">
      {/* Imagen principal */}
      <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden relative group">
        <img
          src={currentImage}
          alt={`${name} - Imagen ${currentImageIndex + 1}`}
          className={`w-full h-full object-contain transition-all duration-300 ${
            imageLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="w-full h-full absolute inset-0 bg-gray-100 hidden items-center justify-center">
          <Package className="h-20 w-20 text-gray-300" />
        </div>

        {/* Badge de stock */}
        <div
          className={`absolute top-3 right-3 px-4 py-2 ${stockStatus.badgeColor} text-white rounded-full font-bold text-sm shadow-lg`}
        >
          {stock} un.
        </div>

        {/* Controles de navegación */}
        {hasMultipleImages && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>

            {/* Indicador de imagen actual */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 text-white rounded-full text-xs font-semibold">
              {currentImageIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Miniaturas */}
      {hasMultipleImages && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => {
                setImageLoaded(false);
                setCurrentImageIndex(index);
              }}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentImageIndex
                  ? 'border-blue-600 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={img}
                alt={`Miniatura ${index + 1}`}
                className="w-full h-full object-contain bg-gray-50"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageSection;
