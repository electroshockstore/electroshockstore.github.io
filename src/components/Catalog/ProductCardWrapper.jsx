import { memo } from 'react';
import ProductCard from './ProductCard/index';
import ProductCardMayoristaBlanco from './ProductCardMayoristaBlanco';

// Pre-check para evitar condicional en cada render
const isMayoristaProduct = (product) => 
  product.category === 'Mayorista' && product.quantity && product.unitPrice;

const ProductCardWrapper = memo(({ product, viewMode, onClick, index = 0, listName = 'Product List', style, isFeatured = false }) => {
  // Usar el card especial para Mayorista
  if (isMayoristaProduct(product)) {
    return (
      <div className="product-card-enter" style={style}>
        <ProductCardMayoristaBlanco
          product={product}
          onClick={onClick}
          index={index}
        />
      </div>
    );
  }

  // Card estándar para productos normales
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
  // Comparación simple - solo ID del producto
  return prevProps.product.id === nextProps.product.id;
});

ProductCardWrapper.displayName = 'ProductCardWrapper';
export default ProductCardWrapper;
