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

  // Limpiar subfiltros cuando cambia la categoría
  useEffect(() => {
    setSubFilters({});
  }, [selectedCategory]);

  useEffect(() => {
    let filtered = products || [];

    // Si hay búsqueda activa, buscar en TODOS los productos ignorando filtros
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query) ||
        product.model?.toLowerCase().includes(query) ||
        product.sku?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query)
      );
    } else {
      // Solo aplicar filtros si NO hay búsqueda activa
      if (selectedCategory && selectedCategory !== 'Todos') {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }

      Object.entries(subFilters).forEach(([filterType, selectedValues]) => {
        if (selectedValues && selectedValues.length > 0) {
          filtered = filtered.filter(product => {
            if (!product.specifications) return false;
            
            // Buscar la clave correcta en specifications (case-insensitive)
            const specValue = product.specifications[filterType];
            if (!specValue) return false;
            
            const valueStr = specValue.toString().toLowerCase();
            
            // Normalizar el valor del producto usando la misma lógica que SidebarFilters
            let normalizedProductValue = specValue;
            
            // Marca (normalizar para joystick)
            if (filterType === 'marca') {
              if (valueStr.includes('playstation') || valueStr.includes('sony')) {
                normalizedProductValue = 'Sony/PlayStation';
              } else if (valueStr.includes('microsoft') || valueStr.includes('xbox')) {
                normalizedProductValue = 'Microsoft/Xbox';
              }
            }
            
            // Iluminación
            else if (filterType === 'iluminacionRGB' || filterType === 'Iluminación') {
              if (valueStr.includes('rgb') || valueStr.includes('argb')) {
                normalizedProductValue = 'RGB';
              } else if (valueStr.includes('no') || valueStr.includes('sin') || valueStr.includes('posee')) {
                normalizedProductValue = 'Sin RGB';
              }
            }
            
            // Conexión/Conectividad
            else if (filterType === 'tipoConectividad' || filterType === 'Conectividad' || filterType === 'Tipo de conexión' || filterType === 'inalambrico') {
              if (valueStr.includes('inalámbrico') || valueStr.includes('wireless') || valueStr.includes('bluetooth') || valueStr.includes('sí') || valueStr.includes('2.4')) {
                normalizedProductValue = 'Inalámbrico';
              } else if (valueStr.includes('alámbrico') || valueStr.includes('cable') || valueStr.includes('usb') || valueStr.includes('3.5') || valueStr.includes('no') || valueStr.includes('gaming, cableado')) {
                normalizedProductValue = 'Alámbrico';
              }
            }
            
            // Batería (para joystick)
            else if (filterType === 'tipoBateria') {
              if (valueStr.includes('recargable') || valueStr.includes('interna') || valueStr.includes('li-ion') || valueStr.includes('litio')) {
                normalizedProductValue = 'Batería Interna';
              } else if (valueStr.includes('pilas aa') || valueStr.includes('aa (')) {
                normalizedProductValue = 'Pilas AA';
              }
            }
            
            // Compatibilidad (simplificado para joystick)
            else if (filterType === 'compatibilidad' || filterType === 'Compatibilidad') {
              const hasPC = valueStr.includes('pc') || valueStr.includes('windows');
              const hasConsole = valueStr.includes('ps') || valueStr.includes('xbox') || valueStr.includes('switch') || valueStr.includes('playstation');
              const hasMobile = valueStr.includes('android') || valueStr.includes('ios') || valueStr.includes('celular');
              
              if (hasPC && hasConsole && hasMobile) normalizedProductValue = 'PC/Consolas/Android';
              else if (hasPC && hasConsole) normalizedProductValue = 'PC/Consolas';
              else if (hasConsole) normalizedProductValue = 'Consolas';
              else if (hasPC) normalizedProductValue = 'PC';
            }
            
            // Potencia
            else if (filterType === 'Potencia') {
              const match = valueStr.match(/(\d+)\s*w/);
              if (match) normalizedProductValue = `${match[1]}W`;
            }
            
            // Certificación
            else if (filterType === 'Certificacion') {
              if (valueStr.includes('gold')) normalizedProductValue = '80 Plus Gold';
              else if (valueStr.includes('bronze')) normalizedProductValue = '80 Plus Bronze';
              else if (valueStr.includes('white')) normalizedProductValue = '80 Plus White';
              else if (valueStr.includes('silver')) normalizedProductValue = '80 Plus Silver';
              else if (valueStr.includes('sin')) normalizedProductValue = 'Sin certificación';
            }
            
            // Capacidad
            else if (filterType === 'capacidadTotal' || filterType === 'Capacidad' || filterType === 'Capacidad total') {
              const match = valueStr.match(/(\d+)\s*(gb|tb)/);
              if (match) {
                const num = match[1];
                const unit = match[2].toUpperCase();
                normalizedProductValue = `${num}${unit}`;
              }
            }
            
            // Tipo de memoria
            else if (filterType === 'tipoMemoriaRAM') {
              normalizedProductValue = specValue.toUpperCase();
            }
            
            // Arquitectura
            else if (filterType === 'Arquitectura') {
              if (valueStr.includes('mecánico')) normalizedProductValue = 'Mecánico';
              else if (valueStr.includes('membrana')) normalizedProductValue = 'Membrana';
            }
            
            // Sensor
            else if (filterType === 'tipoSensor') {
              if (valueStr.includes('óptico')) normalizedProductValue = 'Óptico';
              else if (valueStr.includes('láser')) normalizedProductValue = 'Láser';
            }
            
            // DPI
            else if (filterType === 'dpi') {
              const match = valueStr.match(/(\d+)/);
              if (match) normalizedProductValue = `${match[1]} DPI`;
            }
            
            // Comparar el valor normalizado con los filtros seleccionados
            return selectedValues.some(selectedValue => 
              normalizedProductValue.toString().toLowerCase() === selectedValue.toLowerCase()
            );
          });
        }
      });
    }

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