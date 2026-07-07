import { memo } from 'react';
import ProductCard from './ProductCard/index';

const ProductCardWrapper = memo(({ product, viewMode, onClick, index = 0, listName = 'Product List', style, isFeatured = false }) => {
  return (
    <div className="product-card-enter" style={style}>
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
  return prevProps.product.id === nextProps.product.id;
});

ProductCardWrapper.displayName = 'ProductCardWrapper';
export default ProductCardWrapper;
