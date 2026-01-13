/**
 * Compatibility Engine - Sistema de validación de compatibilidad para PC Builder
 */

/**
 * Verifica la compatibilidad entre componentes
 */
export function checkCompatibility(pcBuild, candidateProduct, category) {
  if (!candidateProduct || !candidateProduct.compatibility) {
    return { compatible: true, status: 'neutral', reasons: [] };
  }
  
  const hasComponents = pcBuild.cpu || pcBuild.motherboard || pcBuild.ram.length > 0;
  const reasons = [];
  let compatible = true;
  let hasWarnings = false;
  
  // ==================== PROCESADORES ====================
  if (category === 'Procesadores') {
    // Validar socket con motherboard
    if (pcBuild.motherboard) {
      const cpuSocket = candidateProduct.compatibility.socket;
      const mbSocket = pcBuild.motherboard.compatibility?.socket;
      
      if (cpuSocket && mbSocket && cpuSocket !== mbSocket) {
        compatible = false;
        reasons.push(`Socket incompatible: CPU ${cpuSocket} vs Motherboard ${mbSocket}`);
      }
    }
    
    // Validar tipo de RAM
    if (pcBuild.ram.length > 0) {
      const cpuRAMType = candidateProduct.compatibility.memoriaRAM;
      const ramType = pcBuild.ram[0].compatibility?.tipo;
      
      if (cpuRAMType && ramType && cpuRAMType !== ramType) {
        compatible = false;
        reasons.push(`RAM incompatible: CPU requiere ${cpuRAMType}, tienes ${ramType}`);
      }
    }
  }
  
  // ==================== MOTHERBOARDS ====================
  if (category === 'Motherboards') {
    // Validar socket con CPU
    if (pcBuild.cpu) {
      const mbSocket = candidateProduct.compatibility.socket;
      const cpuSocket = pcBuild.cpu.compatibility?.socket;
      
      if (mbSocket && cpuSocket && mbSocket !== cpuSocket) {
        compatible = false;
        reasons.push(`Socket incompatible: Motherboard ${mbSocket} vs CPU ${cpuSocket}`);
      }
    }
    
    // Validar tipo de RAM
    if (pcBuild.ram.length > 0) {
      const mbRAMType = candidateProduct.compatibility.tipoMemoriaRAM;
      const ramType = pcBuild.ram[0].compatibility?.tipo;
      
      if (mbRAMType && ramType && mbRAMType !== ramType) {
        compatible = false;
        reasons.push(`RAM incompatible: Motherboard requiere ${mbRAMType}, tienes ${ramType}`);
      }
    }
  }
  
  // ==================== MEMORIAS RAM ====================
  if (category === 'Memorias RAM') {
    const ramType = candidateProduct.compatibility?.tipo;
    const ramFormat = candidateProduct.compatibility?.formato;
    
    // Rechazar SODIMM
    if (ramFormat === 'SODIMM') {
      compatible = false;
      reasons.push(`SODIMM es para laptops, no para PC de escritorio`);
      return { compatible, status: 'red', reasons };
    }
    
    // Validar con CPU
    if (pcBuild.cpu) {
      const cpuRAMType = pcBuild.cpu.compatibility?.memoriaRAM;
      if (cpuRAMType && ramType && cpuRAMType !== ramType) {
        compatible = false;
        reasons.push(`CPU requiere ${cpuRAMType}, esta RAM es ${ramType}`);
      }
    }
    
    // Validar con Motherboard
    if (pcBuild.motherboard) {
      const mbRAMType = pcBuild.motherboard.compatibility?.tipoMemoriaRAM;
      if (mbRAMType && ramType && mbRAMType !== ramType) {
        compatible = false;
        reasons.push(`Motherboard requiere ${mbRAMType}, esta RAM es ${ramType}`);
      }
    }
  }
  
  // ==================== FUENTES (PSU) ====================
  if (category === 'Fuentes') {
    const psuCapacity = candidateProduct.compatibility?.capacidad_watts;
    const totalConsumption = calculateTotalPowerConsumption(pcBuild);
    
    let spikeFactor = 1.3;
    if (pcBuild.gpu) {
      const gpuConsumption = pcBuild.gpu.compatibility?.consumo_watts || 0;
      if (gpuConsumption > 250) spikeFactor = 1.5;
      else if (gpuConsumption >= 150) spikeFactor = 1.4;
    }
    
    const minRequired = Math.round(totalConsumption * spikeFactor);
    const recommendedWithMargin = Math.round(minRequired * 1.15);
    
    if (!psuCapacity) {
      compatible = false;
      reasons.push('Fuente sin especificación de potencia');
    } else if (psuCapacity < minRequired) {
      compatible = false;
      reasons.push(`⚠️ Insuficiente: Requiere ${minRequired}W mínimo, esta tiene ${psuCapacity}W`);
    } else if (psuCapacity < recommendedWithMargin) {
      hasWarnings = true;
      reasons.push(`✓ Suficiente (${psuCapacity}W) pero sin margen para upgrades`);
    } else {
      reasons.push(`✓ Recomendada - ${psuCapacity}W con margen para upgrades`);
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
 * Calcula el consumo total de energía
 */
export function calculateTotalPowerConsumption(pcBuild) {
  let total = 0;
  
  if (pcBuild.cpu?.compatibility?.consumo_watts) {
    total += pcBuild.cpu.compatibility.consumo_watts;
  }
  
  if (pcBuild.gpu?.compatibility?.consumo_watts) {
    total += pcBuild.gpu.compatibility.consumo_watts;
  }
  
  total += pcBuild.ram.length * 4;
  total += pcBuild.storage.length * 5;
  
  if (pcBuild.motherboard) total += 60;
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
