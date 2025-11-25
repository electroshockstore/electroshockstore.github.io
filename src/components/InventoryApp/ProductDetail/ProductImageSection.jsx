// Sección de imagen del producto
import { useState } from 'react';
import { Package } from 'lucide-react';

const ProductImageSection = ({ image, name, stock, stockStatus }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8 overflow-hidden group hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden relative">
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-contain transition-all duration-500 ${
            imageLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          } group-hover:scale-105`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="w-full h-full absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 hidden items-center justify-center">
          <Package className="h-20 w-20 text-blue-300" />
        </div>

        {/* Badge de stock flotante */}
        <div
          className={`absolute top-2 right-2 sm:top-4 sm:right-4 px-3 py-1.5 sm:px-4 sm:py-2 ${stockStatus.badgeColor} text-white rounded-full font-bold text-xs sm:text-sm shadow-lg ${stockStatus.glowColor}`}
        >
          {stock} un.
        </div>
      </div>
    </div>
  );
};

export default ProductImageSection;
