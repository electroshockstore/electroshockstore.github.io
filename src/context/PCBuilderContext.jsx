import { createContext, useContext, useState, useCallback, useMemo } from 'react';

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
    cooling: null,
    monitor: null
  });
  
  const [assistedAnswers, setAssistedAnswers] = useState({
    budget: null,
    usage: null,
    gamingDetails: null
  });
  
  const [compatibilityStatus, setCompatibilityStatus] = useState(new Map());
  const [warnings, setWarnings] = useState([]);
  
  // OPTIMIZACIÓN: Memoizar totalPrice
  const totalPrice = useMemo(() => {
    return Object.values(pcBuild).reduce((total, component) => {
      if (Array.isArray(component)) {
        return total + component.reduce((sum, item) => sum + (item?.price || 0), 0);
      }
      return total + (component?.price || 0);
    }, 0);
  }, [pcBuild]);
  
  // Calcular consumo total de watts basado en TDP de especificaciones
  const totalWattage = useMemo(() => {
    let total = 0;
    
    // CPU - Extrae TDP de specifications.tdp
    if (pcBuild.cpu) {
      const tdp = pcBuild.cpu.specifications?.tdp || pcBuild.cpu.powerConsumption;
      if (tdp) {
        // Convertir string "65 W" a número
        const tdpValue = typeof tdp === 'string' ? parseInt(tdp.replace(/\D/g, '')) : tdp;
        total += tdpValue;
      }
    }
    
    // Motherboard - Consumo base 50W
    if (pcBuild.motherboard) {
      total += 50;
    }
    
    // RAM - 5W por módulo (DDR4/DDR5)
    if (pcBuild.ram?.length > 0) {
      total += pcBuild.ram.length * 5;
    }
    
    // GPU - Extrae TDP de specifications.energia.tdp, specifications.tdp o powerConsumption
    if (pcBuild.gpu) {
      const tdp = pcBuild.gpu.specifications?.energia?.tdp || pcBuild.gpu.specifications?.tdp || pcBuild.gpu.powerConsumption;
      if (tdp) {
        const tdpValue = typeof tdp === 'string' ? parseInt(tdp.replace(/\D/g, '')) : tdp;
        total += tdpValue;
      }
    }
    
    // Storage - Extrae TDP o usa valores por defecto
    if (pcBuild.storage?.length > 0) {
      pcBuild.storage.forEach(item => {
        const tdp = item.specifications?.tdp || item.powerConsumption;
        if (tdp) {
          const tdpValue = typeof tdp === 'string' ? parseInt(tdp.replace(/\D/g, '')) : tdp;
          total += tdpValue;
        } else {
          // Valores por defecto según tipo
          const type = item.specifications?.tipo?.toLowerCase() || '';
          if (type.includes('nvme') || type.includes('m.2')) {
            total += 5; // SSD NVMe
          } else if (type.includes('ssd')) {
            total += 3; // SSD SATA
          } else {
            total += 8; // HDD por defecto
          }
        }
      });
    }
    
    // Cooling - Extrae TDP o usa valores por defecto
    if (pcBuild.cooling) {
      const tdp = pcBuild.cooling.specifications?.tdp || pcBuild.cooling.powerConsumption;
      if (tdp) {
        const tdpValue = typeof tdp === 'string' ? parseInt(tdp.replace(/\D/g, '')) : tdp;
        total += tdpValue;
      } else {
        // Valores por defecto según tipo
        const name = pcBuild.cooling.name?.toLowerCase() || '';
        if (name.includes('water') || name.includes('aio')) {
          // Watercooler: bomba + ventiladores
          if (name.includes('360')) total += 20;
          else if (name.includes('280')) total += 17;
          else if (name.includes('240')) total += 15;
          else total += 10;
        } else {
          // Air cooler: solo ventilador
          total += 5;
        }
      }
    }
    
    // Margen de seguridad del 25% (para picos de consumo)
    return Math.ceil(total * 1.25);
  }, [pcBuild]);
  
  // Watts mínimos requeridos (sin margen adicional)
  const minimumWattage = useMemo(() => {
    return totalWattage;
  }, [totalWattage]);
  
  // Watts recomendados - Con 30-50% de margen para eficiencia óptima
  const recommendedWattage = useMemo(() => {
    // Si el total es muy bajo, mínimo 400W
    if (totalWattage < 300) {
      return 400;
    }
    // Agregar 30% más para que la fuente trabaje en su rango óptimo (50-70% de carga)
    return Math.ceil(totalWattage * 1.3);
  }, [totalWattage]);
  
  // Función para evaluar compatibilidad de una fuente (Sistema de Semáforo)
  const evaluatePSU = useCallback((psuWattage) => {
    if (!psuWattage || totalWattage === 0) {
      return { status: 'unknown', message: '' };
    }
    
    // ROJO - Incompatible: Fuente menor al consumo real
    if (psuWattage < totalWattage) {
      return {
        status: 'red',
        message: `Incompatible: Esta fuente de ${psuWattage}W es insuficiente. El sistema requiere mínimo ${totalWattage}W.`
      };
    }
    
    // AMARILLO - Riesgosa: Cubre el consumo pero sin margen adecuado
    if (psuWattage < recommendedWattage) {
      const margin = ((psuWattage - totalWattage) / totalWattage * 100).toFixed(0);
      return {
        status: 'yellow',
        message: `Advertencia: Esta fuente de ${psuWattage}W es funcional pero limitada (${margin}% de margen). Se recomienda ${recommendedWattage}W para mayor estabilidad.`
      };
    }
    
    // VERDE - Recomendada: Tiene 30-50% de potencia sobrante
    const margin = ((psuWattage - totalWattage) / totalWattage * 100).toFixed(0);
    return {
      status: 'green',
      message: `Óptima: Esta fuente de ${psuWattage}W es ideal para tu build (${margin}% de margen). Trabajará eficientemente.`
    };
  }, [totalWattage, recommendedWattage]);
  
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
        'refrigeracion': 'cooling',
        'placasdevideo': 'gpu',
        'monitores': 'monitor'
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
        'refrigeracion': 'cooling',
        'placasdevideo': 'gpu',
        'monitores': 'monitor'
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
      cooling: null,
      monitor: null
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
    totalWattage,
    minimumWattage,
    recommendedWattage,
    evaluatePSU,
    clearConfiguration,
    loadConfiguration
  };
  
  return (
    <PCBuilderContext.Provider value={value}>
      {children}
    </PCBuilderContext.Provider>
  );
};
