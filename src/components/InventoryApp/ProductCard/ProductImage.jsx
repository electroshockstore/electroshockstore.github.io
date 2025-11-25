// Componente para la imagen del producto
import { Package } from 'lucide-react';

const ProductImage = ({ src, alt, className = "" }) => {
  return (
    <div className={`relative aspect-square bg-gray-50 p-8 border-b-2 border-gray-200 ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain drop-shadow-2xl 
                 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
        loading="lazy"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 
                    hidden items-center justify-center rounded-2xl">
        <Package className="h-20 w-20 text-gray-400" />
      </div>
    </div>
  );
};

export default ProductImage;
