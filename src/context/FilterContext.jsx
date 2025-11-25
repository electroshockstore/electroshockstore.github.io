import { createContext, useContext, useState, useEffect } from 'react';
import { useStock } from './StockContext';

const FilterContext = createContext();

export { FilterContext };

export function FilterProvider({ children }) {
  const { products } = useStock();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [subFilters, setSubFilters] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let filtered = products || [];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query) ||
        product.model?.toLowerCase().includes(query) ||
        product.sku?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query)
      );
    }

    if (selectedCategory && selectedCategory !== 'Todos') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    Object.entries(subFilters).forEach(([filterType, values]) => {
      if (values && values.length > 0) {
        filtered = filtered.filter(product => {
          if (!product.specifications) return false;
          
          const specKeys = Object.keys(product.specifications);
          const matchingKey = specKeys.find(key => 
            key.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === 
            filterType.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          );
          
          if (!matchingKey) return false;
          
          const specValue = product.specifications[matchingKey];
          if (!specValue) return false;
          
          return values.some(value => 
            specValue.toLowerCase().includes(value.toLowerCase())
          );
        });
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, subFilters]);

  const handleSubFilterChange = (filterType, values) => {
    setSubFilters(prev => ({
      ...prev,
      [filterType]: values
    }));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todos');
    setSubFilters({});
  };

  const clearSubFilters = () => {
    setSubFilters({});
  };

  const value = {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    subFilters,
    handleSubFilterChange,
    filteredProducts,
    clearFilters,
    clearSubFilters
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}