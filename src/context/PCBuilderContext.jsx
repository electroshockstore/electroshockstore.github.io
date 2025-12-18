import { createContext, useContext, useState, useCallback } from 'react';

const PCBuilderContext = createContext(null);

export const usePCBuilder = () => {
  const context = useContext(PCBuilderContext);
  if (!context) {
    throw new Error('usePCBuilder must be used within PCBuilderProvider');
  }
  return context;
};

export const PCBuilderProvider = ({ children }) => {
  const [mode, setMode] = useState('selection'); // 'selection' | 'assisted' | 'manual'
  
  const [pcBuild, setPcBuild] = useState({
    cpu: null,
    motherboard: null,
    ram: [],
    gpu: null,
    psu: null,
    storage: [],
    case: null,
    cooling: null
  });
  
  const [assistedAnswers, setAssistedAnswers] = useState({
    budget: null,
    usage: null,
    gamingDetails: null
  });
  
  const [compatibilityStatus, setCompatibilityStatus] = useState(new Map());
  const [warnings, setWarnings] = useState([]);
  
  // Calculate total price
  const totalPrice = Object.values(pcBuild).reduce((total, component) => {
    if (Array.isArray(component)) {
      return total + component.reduce((sum, item) => sum + (item?.price || 0), 0);
    }
    return total + (component?.price || 0);
  }, 0);
  
  const selectComponent = useCallback((category, product) => {
    setPcBuild(prev => {
      const categoryKey = category.toLowerCase().replace(/\s+/g, '');
      
      // Handle array categories (RAM, Storage)
      if (categoryKey === 'memoriasram' || categoryKey === 'ram') {
        return {
          ...prev,
          ram: [...prev.ram, product]
        };
      }
      
      if (categoryKey === 'almacenamiento' || categoryKey === 'storage') {
        return {
          ...prev,
          storage: [...prev.storage, product]
        };
      }
      
      // Map category names to pcBuild keys
      const keyMap = {
        'procesadores': 'cpu',
        'motherboards': 'motherboard',
        'fuentes': 'psu',
        'refrigeración': 'cooling',
        'refrigeracion': 'cooling'
      };
      
      const key = keyMap[categoryKey] || categoryKey;
      
      return {
        ...prev,
        [key]: product
      };
    });
  }, []);
  
  const removeComponent = useCallback((category, productId = null) => {
    setPcBuild(prev => {
      const categoryKey = category.toLowerCase().replace(/\s+/g, '');
      
      // Handle array categories
      if (categoryKey === 'memoriasram' || categoryKey === 'ram') {
        if (productId) {
          return {
            ...prev,
            ram: prev.ram.filter(item => item.id !== productId)
          };
        }
        return {
          ...prev,
          ram: []
        };
      }
      
      if (categoryKey === 'almacenamiento' || categoryKey === 'storage') {
        if (productId) {
          return {
            ...prev,
            storage: prev.storage.filter(item => item.id !== productId)
          };
        }
        return {
          ...prev,
          storage: []
        };
      }
      
      const keyMap = {
        'procesadores': 'cpu',
        'motherboards': 'motherboard',
        'fuentes': 'psu',
        'refrigeración': 'cooling',
        'refrigeracion': 'cooling'
      };
      
      const key = keyMap[categoryKey] || categoryKey;
      
      return {
        ...prev,
        [key]: null
      };
    });
  }, []);
  
  const setAssistedAnswer = useCallback((question, answer) => {
    setAssistedAnswers(prev => ({
      ...prev,
      [question]: answer
    }));
  }, []);
  
  const clearConfiguration = useCallback(() => {
    setPcBuild({
      cpu: null,
      motherboard: null,
      ram: [],
      gpu: null,
      psu: null,
      storage: [],
      case: null,
      cooling: null
    });
    setWarnings([]);
    setCompatibilityStatus(new Map());
  }, []);
  
  const loadConfiguration = useCallback((config) => {
    if (config && typeof config === 'object') {
      setPcBuild(config);
    }
  }, []);
  
  const value = {
    mode,
    setMode,
    pcBuild,
    selectComponent,
    removeComponent,
    assistedAnswers,
    setAssistedAnswer,
    compatibilityStatus,
    setCompatibilityStatus,
    warnings,
    setWarnings,
    totalPrice,
    clearConfiguration,
    loadConfiguration
  };
  
  return (
    <PCBuilderContext.Provider value={value}>
      {children}
    </PCBuilderContext.Provider>
  );
};
