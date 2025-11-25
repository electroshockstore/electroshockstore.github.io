import React, { createContext, useContext, useState, useEffect } from 'react';
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
    const lowStockProducts = products.filter(product => product.stock <= product.minStock);
    setStockAlerts(lowStockProducts);
  }, [products]);

  const updateStock = (productId, newStock) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId 
          ? { ...product, stock: newStock }
          : product
      )
    );
  };

  const decreaseStock = (productId, quantity = 1) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId 
          ? { ...product, stock: Math.max(0, product.stock - quantity) }
          : product
      )
    );
  };

  const increaseStock = (productId, quantity = 1) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId 
          ? { ...product, stock: product.stock + quantity }
          : product
      )
    );
  };

  const getProductById = (id) => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (category) => {
    if (category === 'Todos') return products;
    return products.filter(product => product.category === category);
  };

  const getProductsByBrand = (brand) => {
    if (brand === 'Todos') return products;
    return products.filter(product => product.brand === brand);
  };

  const searchProducts = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.brand.toLowerCase().includes(lowercaseQuery) ||
      product.model.toLowerCase().includes(lowercaseQuery) ||
      product.sku.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery)
    );
  };

  const getLowStockProducts = () => {
    return products.filter(product => product.stock <= product.minStock);
  };

  const getTotalProducts = () => products.length;
  
  const getTotalStockValue = () => {
    return products.reduce((total, product) => total + (product.price * product.stock), 0);
  };

  const getOutOfStockProducts = () => {
    return products.filter(product => product.stock === 0);
  };

  return (
    <StockContext.Provider value={{
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
    }}>
      {children}
    </StockContext.Provider>
  );
};