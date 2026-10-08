import { memo } from 'react';
import ProductCard from './ProductCard/index';

const ProductCardWrapper = memo(({ product, viewMode, onClick, index = 0, listName = 'Product List', style, isFeatured = false }) => {
  return (
    <div className="product-card-enter h-full" style={style}>
      <ProductCard
        product={product}
        viewMode={viewMode}
        onClick={onClick}
        index={index}
        listName={listName}
        isFeatured={isFeatured}
      />
    </div>
  );
}, (prevProps, nextProps) => {
  // Incluye index/viewMode: al reordenar cambia el stagger y la prioridad de imagen
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.index === nextProps.index &&
    prevProps.viewMode === nextProps.viewMode &&
    prevProps.isFeatured === nextProps.isFeatured
  );
});

ProductCardWrapper.displayName = 'ProductCardWrapper';
export default ProductCardWrapper;
