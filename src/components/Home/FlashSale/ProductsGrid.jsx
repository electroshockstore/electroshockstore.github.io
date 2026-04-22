import PropTypes from 'prop-types';
import { Zap } from 'lucide-react';
import FlashSaleProduct from './FlashSaleProduct';

/**
 * ProductsGrid - Grid de productos con header y footer
 */
const ProductsGrid = ({ products = [] }) => {
  // Calcular descuento promedio para mostrar en el badge
  const avgDiscount = products.length > 0 
    ? Math.round(products.reduce((sum, p) => sum + p.discountPercentage, 0) / products.length)
    : 0;

  return (
    <div className="relative px-4 sm:px-6 md:px-11 py-6 sm:py-8 md:py-10 bg-[#09090d]">
      {/* Side labels - Solo desktop */}
      <span className="hidden lg:block absolute left-2.5 top-1/2 -translate-y-1/2 font-mono text-[8px] font-medium tracking-[0.22em] uppercase text-lime-400 opacity-35 [writing-mode:vertical-rl] rotate-180 pointer-events-none">
        Ofertas que vuelan
      </span>
      <span className="hidden lg:block absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-[8px] font-medium tracking-[0.22em] uppercase text-lime-400 opacity-35 [writing-mode:vertical-rl] pointer-events-none">
        No te las pierdas
      </span>

      {/* Products header */}
      <div className="flex flex-row items-center justify-between gap-3 sm:gap-4 mb-5 pb-4 border-b border-white/[0.055]">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-lime-400 flex-shrink-0" />
          <span className="font-mono text-[10px] sm:text-xs md:text-[13px] font-medium tracking-[0.1em] uppercase text-white">
            {Math.min(products.length, 3)} Producto{products.length !== 1 ? 's' : ''} con descuento
          </span>
        </div>
        <span className="border border-lime-400/30 bg-lime-400/[0.07] text-lime-400 font-mono text-[8px] sm:text-[9px] font-medium tracking-[0.1em] uppercase px-2 sm:px-4 py-1 sm:py-1.5 rounded-full whitespace-nowrap flex-shrink-0">
          Hasta {avgDiscount}% Off
        </span>
      </div>

      {/* Grid - Mobile: 2 arriba verticales, 1 abajo horizontal | Desktop: 3 columnas */}
      <div className="mb-5">
        {/* Mobile layout */}
        <div className="sm:hidden">
          <div className="grid grid-cols-2 gap-3 mb-3">
            {products.slice(0, 2).map((product, index) => {
              const originalPrice = product.price;
              const discountedPrice = Math.round(originalPrice * (1 - product.discountPercentage / 100));
              const savings = originalPrice - discountedPrice;
              const isLowStock = product.stock != null && product.stock <= 5;

              return (
                <FlashSaleProduct 
                  key={product.id} 
                  product={product} 
                  index={index}
                  discountPercentage={product.discountPercentage}
                  originalPrice={originalPrice}
                  discountedPrice={discountedPrice}
                  savings={savings}
                  isLowStock={isLowStock}
                />
              );
            })}
          </div>
          {/* Tercera card horizontal */}
          {products[2] && (() => {
            const product = products[2];
            const originalPrice = product.price;
            const discountedPrice = Math.round(originalPrice * (1 - product.discountPercentage / 100));
            const savings = originalPrice - discountedPrice;
            const isLowStock = product.stock != null && product.stock <= 5;

            return (
              <FlashSaleProduct 
                product={product} 
                index={2}
                discountPercentage={product.discountPercentage}
                originalPrice={originalPrice}
                discountedPrice={discountedPrice}
                savings={savings}
                isLowStock={isLowStock}
                horizontal={true}
              />
            );
          })()}
        </div>

        {/* Desktop layout */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {products.slice(0, 3).map((product, index) => {
            const originalPrice = product.price;
            const discountedPrice = Math.round(originalPrice * (1 - product.discountPercentage / 100));
            const savings = originalPrice - discountedPrice;
            const isLowStock = product.stock != null && product.stock <= 5;

            return (
              <FlashSaleProduct 
                key={product.id} 
                product={product} 
                index={index}
                discountPercentage={product.discountPercentage}
                originalPrice={originalPrice}
                discountedPrice={discountedPrice}
                savings={savings}
                isLowStock={isLowStock}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

ProductsGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      discountPercentage: PropTypes.number,
      subtitle: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.string),
      stock: PropTypes.number,
    })
  ).isRequired,
};

export default ProductsGrid;
