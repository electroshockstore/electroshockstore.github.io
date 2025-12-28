import { memo } from 'react';
import ProductCard from './ProductCard/index';
import ProductCardMayoristaBlanco from './ProductCardMayoristaBlanco';

const ProductCardWrapper = memo(({ product, viewMode, onClick, index = 0, listName = 'Product List' }) => {
  // Si es categoría Mayorista, usar el card especial
  if (product.category === 'Mayorista' && product.quantity && product.unitPrice) {
    return (
      <ProductCardMayoristaBlanco
        product={product}
        onClick={onClick}
        index={index}
      />
    );
  }

  // Para productos normales, usar el ProductCard estándar
  return (
    <ProductCard
      product={product}
      viewMode={viewMode}
      onClick={onClick}
      index={index}
      listName={listName}
    />
  );
});

ProductCardWrapper.displayName = 'ProductCardWrapper';
export default ProductCardWrapper;
