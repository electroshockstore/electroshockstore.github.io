import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { products as initialProducts } from '../data';

const StockContext = createContext();

export { StockContext };

export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStock must be used within a StockProvider');
  }
  return context;
};

export const StockProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [stockAlerts, setStockAlerts] = useState([]);

  useEffect(() => {
    const lowStockProducts = products.filter(product => product.stock <= 5);
    setStockAlerts(lowStockProducts);
  }, [products]);

  const updateStock = useCallback((productId, newStock) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId 
          ? { ...product, stock: newStock }
          : product
      )
    );
  }, []);

  const decreaseStock = useCallback((productId, quantity = 1) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId 
          ? { ...product, stock: Math.max(0, product.stock - quantity) }
          : product
      )
    );
  }, []);

  const increaseStock = useCallback((productId, quantity = 1) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId 
          ? { ...product, stock: product.stock + quantity }
          : product
      )
    );
  }, []);

  const getProductById = useCallback((id) => {
    return products.find(product => product.id === id);
  }, [products]);

  const getProductsByCategory = useCallback((category) => {
    if (category === 'Todos') return products;
    return products.filter(product => product.category === category);
  }, [products]);

  const getProductsByBrand = useCallback((brand) => {
    if (brand === 'Todos') return products;
    return products.filter(product => product.brand === brand);
  }, [products]);

  const searchProducts = useCallback((query) => {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.brand.toLowerCase().includes(lowercaseQuery) ||
      product.model.toLowerCase().includes(lowercaseQuery) ||
      product.sku.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery)
    );
  }, [products]);

  const getLowStockProducts = useCallback(() => {
    return products.filter(product => product.stock <= 5);
  }, [products]);

  const getTotalProducts = useCallback(() => products.length, [products]);
  
  const getTotalStockValue = useCallback(() => {
    return products.reduce((total, product) => total + (product.price * product.stock), 0);
  }, [products]);

  const getOutOfStockProducts = useCallback(() => {
    return products.filter(product => product.stock === 0);
  }, [products]);

  const value = useMemo(() => ({
    products,
    stockAlerts,
    updateStock,
    decreaseStock,
    increaseStock,
    getProductById,
    getProductsByCategory,
    getProductsByBrand,
    searchProducts,
    getLowStockProducts,
    getTotalProducts,
    getTotalStockValue,
    getOutOfStockProducts
  }), [
    products,
    stockAlerts,
    updateStock,
    decreaseStock,
    increaseStock,
    getProductById,
    getProductsByCategory,
    getProductsByBrand,
    searchProducts,
    getLowStockProducts,
    getTotalProducts,
    getTotalStockValue,
    getOutOfStockProducts
  ]);

  return (
    <StockContext.Provider value={value}>
      {children}
    </StockContext.Provider>
  );
};