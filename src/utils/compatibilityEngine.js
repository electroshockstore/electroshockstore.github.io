/**
 * Compatibility Engine - Sistema de validación de compatibilidad para PC Builder
 * Versión mejorada con validación robusta
 */

/**
 * Extrae el socket de un producto (CPU o Motherboard)
 */
function getSocket(product) {
  if (!product) return null;
  
  const socket = product.compatibility?.socket || 
                 product.specifications?.socket || 
                 product.specs?.socket ||
                 null;
  
  // Normalizar el socket (quitar espacios, mayúsculas)
  return socket ? socket.trim().toUpperCase() : null;
}

/**
 * Extrae el tipo de RAM de un producto
 */
function getRAMType(product) {
  if (!product) return null;
  
  // Buscar en múltiples ubicaciones posibles
  const ramType = product.ddrType || // Root level (más común)
                  product.compatibility?.memoriaRAM || 
                  product.compatibility?.tipoMemoriaRAM ||
                  product.specifications?.memoriaRAM ||
                  product.specifications?.tipoMemoriaRAM ||
                  product.compatibility?.tipo || // Para RAM modules
                  product.specifications?.tipo ||
                  product.specifications?.tipoMemoria ||
                  null;
  
  // Normalizar el tipo de RAM (quitar espacios, mayúsculas)
  return ramType ? ramType.trim().toUpperCase() : null;
}

/**
 * Extrae el formato de RAM (DIMM/SODIMM)
 */
function getRAMFormat(product) {
  if (!product) return 'DIMM'; // Default para desktop
  
  const formato = product.compatibility?.formato ||
                  product.specifications?.formato ||
                  product.specifications?.formatoMemoriaRAM ||
                  null;
  
  // Si encontramos formato, normalizarlo
  if (formato) {
    const formatoUpper = formato.trim().toUpperCase();
    // Detectar SODIMM
    if (formatoUpper.includes('SODIMM') || formatoUpper.includes('SO-DIMM')) {
      return 'SODIMM';
    }
    // Detectar DIMM/UDIMM
    if (formatoUpper.includes('DIMM') || formatoUpper.includes('UDIMM')) {
      return 'DIMM';
    }
  }
  
  return 'DIMM'; // Default para desktop
}

/**
 * Extrae el consumo en watts
 */
function getPowerConsumption(product) {
  return product.compatibility?.consumo_watts ||
         product.powerConsumption ||
         product.specifications?.consumo_watts ||
         0;
}

/**
 * Extrae la capacidad de la fuente en watts
 */
function getPSUCapacity(product) {
  const capacity = product.compatibility?.capacidad_watts ||
                   product.specifications?.potencia ||
                   product.specifications?.capacidad ||
                   null;
  
  if (!capacity) return null;
  
  // Si es string, extraer el número (ej: "650W" -> 650)
  if (typeof capacity === 'string') {
    const match = capacity.match(/(\d+)/);
    return match ? parseInt(match[1]) : null;
  }
  
  return capacity;
}

/**
 * Verifica la compatibilidad entre componentes
 */
export function checkCompatibility(pcBuild, candidateProduct, category) {
  if (!candidateProduct) {
    return { compatible: true, status: 'neutral', reasons: [] };
  }
  
  const hasComponents = pcBuild.cpu || pcBuild.motherboard || pcBuild.ram.length > 0;
  const reasons = [];
  let compatible = true;
  let hasWarnings = false;
  
  // ==================== PROCESADORES ====================
  if (category === 'Procesadores') {
    const cpuSocket = getSocket(candidateProduct);
    const cpuRAMType = getRAMType(candidateProduct);
    
    // Validar socket con motherboard
    if (pcBuild.motherboard) {
      const mbSocket = getSocket(pcBuild.motherboard);
      
      if (cpuSocket && mbSocket) {
        if (cpuSocket === mbSocket) {
          reasons.push(`✓ Socket ${cpuSocket} compatible con tu motherboard`);
        } else {
          compatible = false;
          reasons.push(`✗ Socket incompatible: CPU ${cpuSocket} vs Motherboard ${mbSocket}`);
        }
      } else if (!cpuSocket) {
        hasWarnings = true;
        reasons.push(`⚠ Socket del CPU no especificado`);
      }
    } else if (cpuSocket) {
      reasons.push(`ℹ Socket: ${cpuSocket}`);
    }
    
    // Validar tipo de RAM
    if (pcBuild.ram.length > 0) {
      const ramType = getRAMType(pcBuild.ram[0]);
      
      if (cpuRAMType && ramType) {
        if (cpuRAMType === ramType) {
          reasons.push(`✓ Compatible con tu RAM ${ramType}`);
        } else {
          compatible = false;
          reasons.push(`✗ RAM incompatible: CPU requiere ${cpuRAMType}, tienes ${ramType}`);
        }
      }
    } else if (cpuRAMType) {
      reasons.push(`ℹ Requiere RAM ${cpuRAMType}`);
    }
    
    // Info sobre gráficos integrados
    const hasIGPU = candidateProduct.compatibility?.graficosIntegrados ||
                    candidateProduct.specifications?.graficosIntegrados;
    if (hasIGPU && hasIGPU !== 'No') {
      reasons.push(`✓ Incluye gráficos integrados`);
    } else if (!pcBuild.gpu) {
      hasWarnings = true;
      reasons.push(`⚠ Sin gráficos integrados - necesitarás GPU dedicada`);
    }
  }
  
  // ==================== MOTHERBOARDS ====================
  if (category === 'Motherboards') {
    const mbSocket = getSocket(candidateProduct);
    const mbRAMType = getRAMType(candidateProduct);
    
    // Validar socket con CPU
    if (pcBuild.cpu) {
      const cpuSocket = getSocket(pcBuild.cpu);
      
      if (mbSocket && cpuSocket) {
        if (mbSocket === cpuSocket) {
          reasons.push(`✓ Socket ${mbSocket} compatible con tu CPU`);
        } else {
          compatible = false;
          reasons.push(`✗ Socket incompatible: Motherboard ${mbSocket} vs CPU ${cpuSocket}`);
        }
      } else if (!mbSocket) {
        hasWarnings = true;
        reasons.push(`⚠ Socket del motherboard no especificado`);
      }
    } else if (mbSocket) {
      reasons.push(`ℹ Socket: ${mbSocket}`);
    }
    
    // Validar tipo de RAM
    if (pcBuild.ram.length > 0) {
      const ramType = getRAMType(pcBuild.ram[0]);
      
      if (mbRAMType && ramType) {
        if (mbRAMType === ramType) {
          reasons.push(`✓ Compatible con tu RAM ${ramType}`);
        } else {
          compatible = false;
          reasons.push(`✗ RAM incompatible: Motherboard requiere ${mbRAMType}, tienes ${ramType}`);
        }
      }
    } else if (mbRAMType) {
      reasons.push(`ℹ Requiere RAM ${mbRAMType}`);
    }
  }
  
  // ==================== MEMORIAS RAM ====================
  if (category === 'Memorias RAM') {
    const ramType = getRAMType(candidateProduct);
    const ramFormat = getRAMFormat(candidateProduct);
    
    // Rechazar SODIMM (para laptops)
    if (ramFormat === 'SODIMM') {
      compatible = false;
      reasons.push(`✗ SODIMM es para laptops, no para PC de escritorio`);
      return { compatible, status: 'red', reasons };
    }
    
    let hasValidation = false;
    
    // Validar con CPU
    if (pcBuild.cpu) {
      const cpuRAMType = getRAMType(pcBuild.cpu);
      
      if (cpuRAMType && ramType) {
        hasValidation = true;
        if (cpuRAMType === ramType) {
          reasons.push(`✓ Compatible con tu CPU (${ramType})`);
        } else {
          compatible = false;
          reasons.push(`✗ CPU requiere ${cpuRAMType}, esta RAM es ${ramType}`);
        }
      }
    }
    
    // Validar con Motherboard
    if (pcBuild.motherboard) {
      const mbRAMType = getRAMType(pcBuild.motherboard);
      
      if (mbRAMType && ramType) {
        hasValidation = true;
        if (mbRAMType === ramType) {
          reasons.push(`✓ Compatible con tu Motherboard (${ramType})`);
        } else {
          compatible = false;
          reasons.push(`✗ Motherboard requiere ${mbRAMType}, esta RAM es ${ramType}`);
        }
      }
    }
    
    // Si no hay validación pero tenemos el tipo, mostrarlo
    if (!hasValidation && ramType) {
      reasons.push(`ℹ Tipo: ${ramType}`);
    }
  }
  
  // ==================== FUENTES (PSU) ====================
  if (category === 'Fuentes') {
    const psuCapacity = getPSUCapacity(candidateProduct);
    const totalConsumption = calculateTotalPowerConsumption(pcBuild);
    
    // Factor de picos de consumo
    let spikeFactor = 1.3;
    if (pcBuild.gpu) {
      const gpuConsumption = getPowerConsumption(pcBuild.gpu);
      if (gpuConsumption > 250) spikeFactor = 1.5;
      else if (gpuConsumption >= 150) spikeFactor = 1.4;
    }
    
    const minRequired = Math.round(totalConsumption * spikeFactor);
    const recommendedWithMargin = Math.round(minRequired * 1.15);
    
    if (!psuCapacity) {
      hasWarnings = true;
      reasons.push('⚠ Fuente sin especificación de potencia');
    } else if (psuCapacity < minRequired) {
      compatible = false;
      reasons.push(`✗ Insuficiente: Requiere ${minRequired}W mínimo, esta tiene ${psuCapacity}W`);
    } else if (psuCapacity < recommendedWithMargin) {
      hasWarnings = true;
      reasons.push(`⚠ Suficiente (${psuCapacity}W) pero sin margen para upgrades`);
      reasons.push(`ℹ Consumo actual: ${totalConsumption}W`);
    } else {
      reasons.push(`✓ Recomendada - ${psuCapacity}W con margen para upgrades`);
      reasons.push(`ℹ Consumo actual: ${totalConsumption}W`);
    }
  }
  
  // Determinar status final
  let status = 'neutral';
  if (hasComponents) {
    if (!compatible) {
      status = 'red';
    } else if (hasWarnings) {
      status = 'yellow';
    } else if (reasons.length > 0) {
      status = 'green';
    }
  }
  
  return { compatible, status, reasons };
}

/**
 * Calcula el consumo total de energía del build
 */
export function calculateTotalPowerConsumption(pcBuild) {
  let total = 0;
  
  // CPU
  if (pcBuild.cpu) {
    total += getPowerConsumption(pcBuild.cpu);
  }
  
  // GPU
  if (pcBuild.gpu) {
    total += getPowerConsumption(pcBuild.gpu);
  }
  
  // RAM (aproximadamente 4W por módulo)
  total += pcBuild.ram.length * 4;
  
  // Storage (aproximadamente 5W por unidad)
  total += pcBuild.storage.length * 5;
  
  // Motherboard (aproximadamente 60W)
  if (pcBuild.motherboard) total += 60;
  
  // Cooling (aproximadamente 10W)
  if (pcBuild.cooling) total += 10;
  
  return total;
}

/**
 * Obtiene productos compatibles para una categoría
 */
export function getCompatibleProducts(pcBuild, products, category) {
  return products
    .filter(p => p.category === category)
    .map(product => ({
      ...product,
      compatibilityResult: checkCompatibility(pcBuild, product, category)
    }))
    .sort((a, b) => {
      const statusOrder = { green: 0, yellow: 1, neutral: 2, red: 3 };
      return statusOrder[a.compatibilityResult.status] - statusOrder[b.compatibilityResult.status];
    });
}
