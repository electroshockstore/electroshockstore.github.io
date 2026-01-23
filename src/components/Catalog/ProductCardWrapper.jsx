import { memo } from 'react';
import ProductCard from './ProductCard/index';
import ProductCardMayoristaBlanco from './ProductCardMayoristaBlanco';

// Pre-check para evitar condicional en cada render
const isMayoristaProduct = (product) => 
  product.category === 'Mayorista' && product.quantity && product.unitPrice;

const ProductCardWrapper = memo(({ product, viewMode, onClick, index = 0, listName = 'Product List' }) => {
  // Usar el card especial para Mayorista
  if (isMayoristaProduct(product)) {
    return (
      <ProductCardMayoristaBlanco
        product={product}
        onClick={onClick}
        index={index}
      />
    );
  }

  // Card estándar para productos normales
  return (
    <ProductCard
      product={product}
      viewMode={viewMode}
      onClick={onClick}
      index={index}
      listName={listName}
    />
  );
}, (prevProps, nextProps) => {
  // Custom comparison para evitar re-renders
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.viewMode === nextProps.viewMode &&
    prevProps.index === nextProps.index
  );
});

ProductCardWrapper.displayName = 'ProductCardWrapper';
export default ProductCardWrapper;
