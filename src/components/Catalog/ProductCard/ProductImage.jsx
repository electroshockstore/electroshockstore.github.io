import { Package } from 'lucide-react';

const ProductImage = ({ src, alt, className = "" }) => {
  return (
    <div className={`relative w-full h-full bg-white p-6 ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain
                 group-hover:scale-110 transition-all duration-500"
        loading="lazy"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 
                    hidden items-center justify-center rounded-xl">
        <Package className="h-16 w-16 text-gray-400" />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default ProductImage;
