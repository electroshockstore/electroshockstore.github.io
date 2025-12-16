// ProductCard.jsx
import { memo, useMemo, useCallback } from 'react';
import StockBadge from './StockBadge';
import StockStatus from './StockStatus';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import PriceDisplay from './PriceDisplay';
import ViewDetailsButton from './ViewDetailsButton';

// Utilidad para obtener imagen (sin cambios en lógica, solo limpieza)
const getProductImage = (product) => {
  if (product.images && product.images.length > 0) return product.images[0];
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

const useStockStatus = () => {
  return useMemo(() => ({ 
    text: 'Disponible', 
    color: 'from-emerald-400 to-emerald-600',
    textColor: 'text-emerald-700',
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200'
  }), []);
};

const ProductCard = memo(({ product, viewMode, onClick }) => {
  const stockStatus = useStockStatus();
  const productImage = useMemo(() => getProductImage(product), [product]);
  const handleClick = useCallback(() => onClick(product), [onClick, product]);

  // Vista Lista
  if (viewMode === 'list') {
    return (
      <div 
        onClick={handleClick}
        className="group relative bg-white rounded-xl border border-gray-100 p-4
                   hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 
                   transition-all duration-300 cursor-pointer flex gap-6 items-center"
      >
        <div className="w-32 h-32 flex-shrink-0 bg-gray-50 rounded-lg p-2 relative overflow-hidden">
          <img src={productImage} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
        </div>
        
        <div className="flex-1 min-w-0 py-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-blue-600 mb-1 tracking-wide uppercase">{product.brand}</p>
              <h3 className="font-bold text-lg text-gray-900 line-clamp-1 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{product.model}</p>
            </div>
            <div className="text-right">
               <span className="block font-bold text-xl text-gray-900">
                {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(product.price)}
               </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-2">
             <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${stockStatus.badgeColor}`}>
                {stockStatus.text}
             </span>
             <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                Ver detalles →
             </button>
          </div>
        </div>
      </div>
    );
  }

  // Vista Grid (Diseño Moderno Vertical)
  return (
    <div 
      onClick={handleClick}
      className="group relative bg-white rounded-2xl border border-gray-100 
                 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5
                 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
    >
      {/* Zona de Imagen - Más altura para evitar cortes */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <ProductImage src={productImage} alt={product.name} />
        
        {/* Badges Flotantes (ya tienen position absolute dentro) */}
        <StockStatus stockStatus={stockStatus} />
        <StockBadge stock={product.stock} stockStatus={stockStatus} />
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
           <ProductInfo name={product.name} brand={product.brand} model={product.model} />
        </div>
        
        <div className="space-y-3 pt-2 border-t border-gray-50">
           <PriceDisplay price={product.price} category={product.category} />
           <ViewDetailsButton onClick={handleClick} />
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;