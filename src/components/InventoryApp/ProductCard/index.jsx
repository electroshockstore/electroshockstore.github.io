// ProductCard componentizado siguiendo SOLID
import { memo, useMemo, useCallback } from 'react';
import StockBadge from './StockBadge';
import StockStatus from './StockStatus';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import PriceDisplay from './PriceDisplay';
import ViewDetailsButton from './ViewDetailsButton';

// Utilidad para obtener imagen del producto o fallback por categoría
const getProductImage = (product) => {
  // Si el producto tiene imágenes, usar la primera
  if (product.images && product.images.length > 0) {
    return product.images[0];
  }
  
  // Fallback a imágenes por categoría
  const categoryImages = {
    'Fuentes': 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400',
    'Almacenamiento': 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400',
    'Memorias RAM': 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400',
    'Motherboards': 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400',
    'Procesadores': 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400',
    'Refrigeración': 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400'
  };
  return categoryImages[product.category] || 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400';
};

// Hook personalizado para el estado del stock
const useStockStatus = (stock, minStock) => {
  return useMemo(() => {
    if (stock === 0) return { 
      text: 'Agotado', 
      color: 'from-red-500 to-red-600',
      textColor: 'text-red-600',
      bgColor: 'bg-red-500/10'
    };
    if (stock <= minStock) return { 
      text: 'Últimas unidades', 
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-500/10'
    };
    return { 
      text: 'Disponible', 
      color: 'from-emerald-500 to-green-600',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-500/10'
    };
  }, [stock, minStock]);
};

const ProductCard = memo(({ product, viewMode, onClick }) => {
  const stockStatus = useStockStatus(product.stock, product.minStock);
  const productImage = useMemo(() => getProductImage(product), [product]);
  const handleClick = useCallback(() => onClick(product), [onClick, product]);

  // Vista de lista (horizontal)
  if (viewMode === 'list') {
    return (
      <div 
        className="group relative bg-white rounded-2xl 
                   border-2 border-gray-200 shadow-lg 
                   hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5
                   transition-all duration-300 overflow-hidden p-4 sm:p-6 hover:z-10 cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          {/* Imagen compacta */}
          <div className="relative w-full sm:w-32 h-32 flex-shrink-0 bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
            <img
              src={productImage}
              alt={product.name}
              className="w-full h-full object-contain"
              loading="lazy"
            />
            <div className={`absolute -top-2 -right-2 w-10 h-10 rounded-xl bg-gradient-to-br ${stockStatus.color} 
                           shadow-lg flex items-center justify-center`}>
              <span className="text-white font-bold text-sm">{product.stock}</span>
            </div>
          </div>
          
          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-black text-lg sm:text-xl text-gray-900 mb-2 line-clamp-1">
              {product.name}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">
                {product.brand}
              </span>
              <span className="text-sm text-gray-600 font-medium">{product.model}</span>
              <div className={`px-3 py-1 rounded-full ${stockStatus.bgColor} ${stockStatus.textColor} text-xs font-semibold`}>
                {stockStatus.text}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-green-700">
                {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(product.price)}
              </span>
              <span className="text-xs text-gray-500">{product.category}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vista Grid (por defecto)
  return (
    <div 
      className="group relative bg-white rounded-2xl 
                 border-2 border-gray-200 shadow-lg 
                 hover:shadow-2xl hover:border-gray-300 hover:-translate-y-1
                 transition-all duration-300 overflow-hidden hover:z-10 cursor-pointer"
      onClick={handleClick}
    >
      {/* Imagen */}
      <ProductImage src={productImage} alt={product.name} />
      
      {/* Badges */}
      <StockStatus stockStatus={stockStatus} />
      <StockBadge stock={product.stock} stockStatus={stockStatus} />
      
      {/* Contenido */}
      <div className="relative p-6 space-y-4">
        <ProductInfo 
          name={product.name}
          brand={product.brand}
          model={product.model}
        />
        
        <PriceDisplay 
          price={product.price}
          category={product.category}
        />
        
        <ViewDetailsButton onClick={handleClick} />
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
