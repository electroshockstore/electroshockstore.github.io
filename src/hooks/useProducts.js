import { useMemo } from 'react';
import { products as allProducts } from '../data';

/**
 * Hook simple y performante para acceder a productos
 * Sin estado innecesario, sin re-renders, solo datos estáticos
 */
export const useProducts = () => {
  return useMemo(() => ({
    products: allProducts,
    getProductById: (id) => allProducts.find(p => p.id === id),
    getProductsByCategory: (category) => 
      category === 'Todos' ? allProducts : allProducts.filter(p => p.category === category),
  }), []);
};
