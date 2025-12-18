/**
 * Compatibility Engine - Core validation logic for PC Builder
 */

/**
 * Check compatibility between components
 * @param {Object} pcBuild - Current PC configuration
 * @param {Object} candidateProduct - Product to check compatibility for
 * @param {string} category - Category of the candidate product
 * @returns {Object} CompatibilityResult
 */
export function checkCompatibility(pcBuild, candidateProduct, category) {
  if (!candidateProduct || !candidateProduct.compatibility) {
    return {
      compatible: true,
      status: 'neutral',
      reasons: []
    };
  }
  
  // Check if there are any components to validate against
  const hasComponents = pcBuild.cpu || pcBuild.motherboard || pcBuild.ram.length > 0 || 
                        pcBuild.psu || pcBuild.gpu || pcBuild.storage.length > 0;
  
  const reasons = [];
  let compatible = true;
  let hasWarnings = false;
  
  // Socket compatibility (CPU <-> Motherboard)
  if (category === 'Procesadores' && pcBuild.motherboard) {
    const cpuSocket = candidateProduct.compatibility.socket;
    const mbSocket = pcBuild.motherboard.compatibility?.socket;
    
    if (cpuSocket && mbSocket && cpuSocket !== mbSocket) {
      compatible = false;
      reasons.push(`Socket incompatible: CPU requiere ${cpuSocket}, Motherboard tiene ${mbSocket}`);
    }
    
    // Chipset compatibility
    const chipsets = candidateProduct.compatibility.chipsetsCompatibles;
    const mbChipset = pcBuild.motherboard.compatibility?.chipset;
    
    if (chipsets && mbChipset && !chipsets.includes(mbChipset)) {
      compatible = false;
      reasons.push(`Chipset incompatible: CPU no soporta ${mbChipset}`);
    }
  }
  
  if (category === 'Motherboards' && pcBuild.cpu) {
    const mbSocket = candidateProduct.compatibility.socket;
    const cpuSocket = pcBuild.cpu.compatibility?.socket;
    
    if (mbSocket && cpuSocket && mbSocket !== cpuSocket) {
      compatible = false;
      reasons.push(`Socket incompatible: Motherboard tiene ${mbSocket}, CPU requiere ${cpuSocket}`);
    }
    
    // Chipset compatibility
    const mbChipset = candidateProduct.compatibility.chipset;
    const cpuChipsets = pcBuild.cpu.compatibility?.chipsetsCompatibles;
    
    if (mbChipset && cpuChipsets && !cpuChipsets.includes(mbChipset)) {
      compatible = false;
      reasons.push(`Chipset incompatible: ${mbChipset} no es compatible con ${pcBuild.cpu.name}`);
    }
  }
  
  // RAM Type compatibility
  if (category === 'Memorias RAM') {
    const ramType = candidateProduct.compatibility.tipo;
    
    if (pcBuild.cpu) {
      const cpuRAMType = pcBuild.cpu.compatibility?.memoriaRAM;
      if (cpuRAMType && ramType && cpuRAMType !== ramType) {
        compatible = false;
        reasons.push(`Tipo de RAM incompatible: CPU requiere ${cpuRAMType}, RAM es ${ramType}`);
      }
    }
    
    if (pcBuild.motherboard) {
      const mbRAMType = pcBuild.motherboard.compatibility?.tipoMemoriaRAM;
      if (mbRAMType && ramType && mbRAMType !== ramType) {
        compatible = false;
        reasons.push(`Tipo de RAM incompatible: Motherboard requiere ${mbRAMType}, RAM es ${ramType}`);
      }
    }
  }
  
  if ((category === 'Procesadores' || category === 'Motherboards') && pcBuild.ram.length > 0) {
    const ramType = pcBuild.ram[0].compatibility?.tipo;
    const newRAMType = category === 'Procesadores' 
      ? candidateProduct.compatibility.memoriaRAM
      : candidateProduct.compatibility.tipoMemoriaRAM;
    
    if (ramType && newRAMType && ramType !== newRAMType) {
      compatible = false;
      reasons.push(`Tipo de RAM incompatible: RAM actual es ${ramType}, componente requiere ${newRAMType}`);
    }
  }
  
  // Power consumption validation
  if (category === 'Fuentes') {
    const psuCapacity = candidateProduct.compatibility.capacidad_watts;
    const totalConsumption = calculateTotalPowerConsumption(pcBuild);
    const requiredCapacity = totalConsumption * 1.2; // 20% overhead
    
    if (psuCapacity && psuCapacity < requiredCapacity) {
      compatible = false;
      reasons.push(
        `PSU insuficiente: Consumo total ${totalConsumption}W + 20% = ${Math.round(requiredCapacity)}W, ` +
        `Capacidad ${psuCapacity}W (déficit: ${Math.round(requiredCapacity - psuCapacity)}W)`
      );
    }
  }
  
  // Check if current PSU is sufficient for new component
  if (pcBuild.psu && (category === 'Procesadores' || category === 'GPU')) {
    const psuCapacity = pcBuild.psu.compatibility?.capacidad_watts;
    const newConsumption = candidateProduct.compatibility.consumo_watts || 0;
    
    // Calculate consumption without the component being replaced
    let currentConsumption = 0;
    if (category === 'Procesadores' && pcBuild.cpu) {
      currentConsumption = calculateTotalPowerConsumption({
        ...pcBuild,
        cpu: null
      });
    } else if (category === 'GPU' && pcBuild.gpu) {
      currentConsumption = calculateTotalPowerConsumption({
        ...pcBuild,
        gpu: null
      });
    } else {
      currentConsumption = calculateTotalPowerConsumption(pcBuild);
    }
    
    const totalWithNew = currentConsumption + newConsumption;
    const requiredCapacity = totalWithNew * 1.2;
    
    if (psuCapacity && psuCapacity < requiredCapacity) {
      hasWarnings = true;
      reasons.push(
        `Advertencia: PSU puede ser insuficiente. Consumo estimado ${Math.round(requiredCapacity)}W, ` +
        `Capacidad ${psuCapacity}W`
      );
    }
  }
  
  // Determine final status
  let status = 'neutral';
  
  // Only show compatibility status if there are components to validate against
  if (hasComponents) {
    if (!compatible) {
      status = 'red';
    } else if (hasWarnings) {
      status = 'yellow';
    } else if (reasons.length === 0) {
      status = 'green';
    }
  }
  
  return {
    compatible,
    status,
    reasons
  };
}

/**
 * Calculate total power consumption of a PC build
 * @param {Object} pcBuild - PC configuration
 * @returns {number} Total watts
 */
export function calculateTotalPowerConsumption(pcBuild) {
  let total = 0;
  
  if (pcBuild.cpu?.compatibility?.consumo_watts) {
    total += pcBuild.cpu.compatibility.consumo_watts;
  }
  
  if (pcBuild.gpu?.compatibility?.consumo_watts) {
    total += pcBuild.gpu.compatibility.consumo_watts;
  }
  
  // RAM typically consumes 3-5W per module
  total += pcBuild.ram.length * 4;
  
  // Storage typically consumes 2-8W per device
  total += pcBuild.storage.length * 5;
  
  // Motherboard base consumption ~50-80W
  if (pcBuild.motherboard) {
    total += 60;
  }
  
  // Cooling typically 5-15W
  if (pcBuild.cooling) {
    total += 10;
  }
  
  return total;
}

/**
 * Get all compatible products for a category
 * @param {Object} pcBuild - Current PC configuration
 * @param {Array} products - All available products
 * @param {string} category - Category to filter
 * @returns {Array} Products with compatibility status
 */
export function getCompatibleProducts(pcBuild, products, category) {
  return products
    .filter(p => p.category === category)
    .map(product => ({
      ...product,
      compatibilityResult: checkCompatibility(pcBuild, product, category)
    }))
    .sort((a, b) => {
      // Sort by compatibility status: green first, then yellow, then red
      const statusOrder = { green: 0, yellow: 1, red: 2 };
      return statusOrder[a.compatibilityResult.status] - statusOrder[b.compatibilityResult.status];
    });
}
