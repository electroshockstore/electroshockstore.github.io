/**
 * SISTEMA DE RECOMENDACIÓN MEJORADO V2.0
 * Mejoras implementadas:
 * 1. Validación estricta de compatibilidad con scoring
 * 2. Sistema de prioridades balanceado por uso
 * 3. Detección inteligente de especificaciones
 * 4. Fallback robusto con múltiples niveles
 * 5. Mejor manejo de restricciones de presupuesto
 */

export function generateRecommendation(criteria, products) {
  const { budget, usage, gamingDetails } = criteria;
  
  if (!budget || !usage) {
    console.error('Missing criteria:', criteria);
    return null;
  }
  
  console.log('=== RECOMMENDATION ENGINE V2.0 ===');
  console.log('Budget:', budget);
  console.log('Usage:', usage);
  console.log('Gaming Details:', gamingDetails);
  
  // Filtrar solo productos con stock
  const availableProducts = products.filter(p => p.stock > 0);
  
  // Separar por categoría
  const cpus = availableProducts.filter(p => p.category === 'Procesadores');
  const motherboards = availableProducts.filter(p => p.category === 'Motherboards');
  const rams = availableProducts.filter(p => p.category === 'Memorias RAM');
  const psus = availableProducts.filter(p => p.category === 'Fuentes');
  const coolers = availableProducts.filter(p => p.category === 'Refrigeración');
  const storage = availableProducts.filter(p => p.category === 'Almacenamiento');
  
  console.log('Available components:', {
    cpus: cpus.length,
    motherboards: motherboards.length,
    rams: rams.length,
    psus: psus.length,
    coolers: coolers.length,
    storage: storage.length
  });
  
  // PASO 1: Seleccionar CPU (componente ancla)
  const cpu = selectOptimalCPU(cpus, budget.max, usage, gamingDetails);
  if (!cpu) {
    console.error('No se encontró CPU adecuado');
    return null;
  }
  
  let remainingBudget = budget.max - cpu.price;
  console.log(`\nCPU: ${cpu.name} - $${cpu.price}`);
  console.log(`Presupuesto restante: $${remainingBudget}`);
  
  // PASO 2: Seleccionar Motherboard compatible
  const motherboard = selectCompatibleMotherboard(motherboards, cpu, remainingBudget);
  if (!motherboard) {
    console.error('No se encontró motherboard compatible');
    return null;
  }
  
  remainingBudget -= motherboard.price;
  console.log(`\nMotherboard: ${motherboard.name} - $${motherboard.price}`);
  console.log(`Presupuesto restante: $${remainingBudget}`);
  
  // PASO 3: Seleccionar RAM compatible
  const ram = selectCompatibleRAM(rams, cpu, motherboard, usage, remainingBudget);
  if (!ram) {
    console.error('No se encontró RAM compatible');
    return null;
  }
  
  remainingBudget -= ram.price;
  console.log(`\nRAM: ${ram.name} - $${ram.price}`);
  console.log(`Presupuesto restante: $${remainingBudget}`);
  
  // PASO 4: Seleccionar Storage (prioridad alta)
  const selectedStorage = selectStorage(storage, remainingBudget, usage);
  if (selectedStorage) {
    remainingBudget -= selectedStorage.price;
    console.log(`\nStorage: ${selectedStorage.name} - $${selectedStorage.price}`);
    console.log(`Presupuesto restante: $${remainingBudget}`);
  }
  
  // PASO 5: Determinar necesidad de cooler
  const needsCooler = !cpuIncludesCooler(cpu);
  let cooling = null;
  
  if (needsCooler && remainingBudget > 15000) {
    cooling = selectCooler(coolers, cpu, remainingBudget);
    if (cooling) {
      remainingBudget -= cooling.price;
      console.log(`\nCooler: ${cooling.name} - $${cooling.price}`);
      console.log(`Presupuesto restante: $${remainingBudget}`);
    }
  } else if (!needsCooler) {
    console.log('\nCPU incluye cooler de stock');
  }
  
  // PASO 6: Seleccionar PSU (componente crítico)
  const requiredWattage = calculateRequiredWattage(cpu, cooling);
  const psu = selectPSU(psus, requiredWattage, remainingBudget);
  if (!psu) {
    console.error('No se encontró PSU adecuado');
    return null;
  }
  
  remainingBudget -= psu.price;
  console.log(`\nPSU: ${psu.name} - $${psu.price}`);
  console.log(`Presupuesto final restante: $${remainingBudget}`);
  
  // Construir resultado
  const build = {
    cpu,
    motherboard,
    ram: [ram],
    psu,
    cooling,
    storage: selectedStorage ? [selectedStorage] : [],
    gpu: null,
    case: null
  };
  
  const totalPrice = cpu.price + motherboard.price + ram.price + psu.price + 
                     (cooling?.price || 0) + (selectedStorage?.price || 0);
  
  console.log('\n=== BUILD COMPLETADO ===');
  console.log(`Precio total: $${totalPrice}`);
  console.log(`Presupuesto máximo: $${budget.max}`);
  console.log(`Dentro del presupuesto: ${totalPrice <= budget.max ? 'SÍ' : 'NO'}`);
  console.log(`Ahorro: $${budget.max - totalPrice}`);
  
  return build;
}

// ============================================================================
// FUNCIONES DE EXTRACCIÓN DE ESPECIFICACIONES
// ============================================================================

function extractCPUSpecs(cpu) {
  const specs = cpu.specifications || {};
  const name = cpu.name.toLowerCase();
  const description = (cpu.description || '').toLowerCase();
  
  return {
    socket: specs.socket || specs.Socket || extractSocket(name),
    ramType: specs.memoriaRAM || specs['Memoria RAM'] || extractRAMType(name),
    cores: parseInt(specs.nucleos || specs.Nucleos || extractCores(name)) || 4,
    tdp: parseInt(specs.tdp || specs.TDP || extractTDP(name)) || 65,
    hasIGPU: detectIntegratedGraphics(specs, name, description),
    brand: detectCPUBrand(name)
  };
}

function extractSocket(text) {
  const socketPatterns = [
    /AM5/i, /AM4/i, /AM3/i,
    /LGA\s?1700/i, /LGA\s?1200/i, /LGA\s?1151/i
  ];
  
  for (const pattern of socketPatterns) {
    const match = text.match(pattern);
    if (match) return match[0].replace(/\s/g, '');
  }
  return null;
}

function extractRAMType(text) {
  if (text.includes('ddr5')) return 'DDR5';
  if (text.includes('ddr4')) return 'DDR4';
  if (text.includes('ddr3')) return 'DDR3';
  return null;
}

function extractCores(text) {
  const coreMatch = text.match(/(\d+)\s*(?:core|núcleo)/i);
  return coreMatch ? coreMatch[1] : null;
}

function extractTDP(text) {
  const tdpMatch = text.match(/(\d+)W/i);
  return tdpMatch ? tdpMatch[1] : null;
}

function detectIntegratedGraphics(specs, name, description) {
  const igpuField = specs.graficosIntegrados || specs['Gráficos Integrados'];
  
  if (igpuField && igpuField !== 'No' && igpuField !== 'No posee') {
    return true;
  }
  
  // Detectar por modelo de CPU
  const hasIGPUIndicators = [
    /intel.*(?:core|pentium|celeron)(?!.*[fk])/i, // Intel sin F o K
    /ryzen.*[g]/i, // AMD Ryzen con G
    /athlon.*[g]/i, // AMD Athlon con G
    /radeon.*graphics/i,
    /uhd.*graphics/i,
    /iris/i
  ];
  
  const text = name + ' ' + description;
  return hasIGPUIndicators.some(pattern => pattern.test(text));
}

function detectCPUBrand(name) {
  if (name.includes('intel')) return 'Intel';
  if (name.includes('amd')) return 'AMD';
  return 'Unknown';
}

function cpuIncludesCooler(cpu) {
  const specs = cpu.specifications || {};
  const disipador = specs.disipador || specs.Disipador || '';
  const name = cpu.name.toLowerCase();
  const description = (cpu.description || '').toLowerCase();
  
  // Verificar campo específico
  if (disipador && disipador !== 'No' && disipador !== 'No posee' && disipador !== 'N/A') {
    return true;
  }
  
  // Palabras clave que indican cooler incluido
  const coolerKeywords = [
    'cooler incluido', 'disipador incluido', 'wraith', 
    'stock cooler', 'refrigeración stock', 'con cooler'
  ];
  
  const text = name + ' ' + description;
  return coolerKeywords.some(keyword => text.includes(keyword));
}

function calculateRequiredWattage(cpu, cooler) {
  const cpuTDP = extractCPUSpecs(cpu).tdp;
  
  // Fórmula mejorada: (CPU TDP * 2) + 100W de margen + 50W para periféricos
  const baseWattage = (cpuTDP * 2) + 150;
  
  // Mínimo 400W para cualquier sistema
  return Math.max(baseWattage, 400);
}

// ============================================================================
// FUNCIONES DE SELECCIÓN DE COMPONENTES
// ============================================================================

function selectOptimalCPU(cpus, totalBudget, usage, gamingDetails) {
  if (cpus.length === 0) return null;
  
  // Asignación dinámica de presupuesto para CPU según uso
  const cpuBudgetRatios = {
    'Gaming': { min: 0.25, max: 0.40 },
    'Trabajo': { min: 0.25, max: 0.35 },
    'Multimedia': { min: 0.25, max: 0.35 },
    'General': { min: 0.20, max: 0.30 }
  };
  
  const ratio = cpuBudgetRatios[usage] || { min: 0.20, max: 0.30 };
  const minBudget = totalBudget * ratio.min;
  const maxBudget = totalBudget * ratio.max;
  
  console.log(`\nRango presupuesto CPU: $${minBudget} - $${maxBudget}`);
  
  // Filtrar CPUs en rango
  let candidates = cpus.filter(cpu => cpu.price >= minBudget && cpu.price <= maxBudget);
  
  if (candidates.length === 0) {
    console.warn('No hay CPUs en rango ideal, expandiendo búsqueda...');
    candidates = cpus.filter(cpu => cpu.price <= maxBudget);
  }
  
  if (candidates.length === 0) {
    console.warn('Sin CPUs en presupuesto, tomando el más económico');
    return cpus.sort((a, b) => a.price - b.price)[0];
  }
  
  // Scoring avanzado
  const scored = candidates.map(cpu => {
    const specs = extractCPUSpecs(cpu);
    let score = 0;
    
    // 1. Scoring por núcleos (peso: 30%)
    if (specs.cores >= 12) score += 30;
    else if (specs.cores >= 8) score += 25;
    else if (specs.cores >= 6) score += 20;
    else if (specs.cores >= 4) score += 15;
    else score += 10;
    
    // 2. Scoring por uso específico (peso: 35%)
    if (usage === 'Gaming') {
      if (gamingDetails?.resolution === '4K' && specs.cores >= 8) score += 20;
      else if (gamingDetails?.fps >= 144 && specs.cores >= 6) score += 18;
      else if (gamingDetails?.fps >= 120) score += 15;
      else score += 12;
      
      // En gaming, iGPU es secundario
      if (specs.hasIGPU) score += 5;
      
    } else if (usage === 'Trabajo' || usage === 'Multimedia') {
      // Priorizar multi-core y iGPU
      if (specs.cores >= 8) score += 20;
      if (specs.hasIGPU) score += 15;
      
    } else if (usage === 'General') {
      // iGPU es CRÍTICO para uso general
      if (specs.hasIGPU) score += 30;
      else score -= 25; // Penalización fuerte
      
      if (specs.cores >= 6) score += 10;
    }
    
    // 3. Eficiencia de presupuesto (peso: 20%)
    const budgetEfficiency = cpu.price / maxBudget;
    if (budgetEfficiency >= 0.85) score += 20;
    else if (budgetEfficiency >= 0.70) score += 15;
    else if (budgetEfficiency >= 0.50) score += 10;
    else score += 5;
    
    // 4. Bonus por generación reciente (peso: 15%)
    const name = cpu.name.toLowerCase();
    if (name.includes('14th') || name.includes('14') || name.includes('7000')) score += 15;
    else if (name.includes('13th') || name.includes('13') || name.includes('5000')) score += 10;
    else if (name.includes('12th') || name.includes('12') || name.includes('3000')) score += 5;
    
    return { cpu, score, specs };
  });
  
  // Ordenar por score
  scored.sort((a, b) => b.score - a.score);
  
  console.log('\nTop 3 CPUs:');
  scored.slice(0, 3).forEach((s, i) => {
    console.log(`${i + 1}. ${s.cpu.name} - Score: ${s.score} - $${s.cpu.price}`);
    console.log(`   Cores: ${s.specs.cores}, iGPU: ${s.specs.hasIGPU}, Socket: ${s.specs.socket}`);
  });
  
  return scored[0].cpu;
}

function selectCompatibleMotherboard(motherboards, cpu, budget) {
  if (motherboards.length === 0) return null;
  
  const cpuSpecs = extractCPUSpecs(cpu);
  console.log(`\nBuscando motherboard compatible:`);
  console.log(`  Socket: ${cpuSpecs.socket}`);
  console.log(`  RAM: ${cpuSpecs.ramType}`);
  console.log(`  Presupuesto: $${budget}`);
  
  // Scoring de compatibilidad
  const scored = motherboards.map(mb => {
    const mbSpecs = mb.specifications || {};
    const mbSocket = mbSpecs.socket || mbSpecs.Socket;
    const mbRAM = mbSpecs.tipoMemoria || mbSpecs.tipoMemoriaRAM || mbSpecs['Tipo de memoria'];
    
    let compatScore = 0;
    let compatible = true;
    
    // 1. Socket (CRÍTICO - 100 puntos)
    if (mbSocket === cpuSpecs.socket) {
      compatScore += 100;
    } else if (mbSocket && cpuSpecs.socket && 
               mbSocket.toLowerCase().includes(cpuSpecs.socket.toLowerCase())) {
      compatScore += 80;
    } else {
      compatible = false;
    }
    
    // 2. RAM Type (CRÍTICO - 100 puntos)
    if (cpuSpecs.ramType && mbRAM) {
      if (mbRAM.includes(cpuSpecs.ramType)) {
        compatScore += 100;
      } else {
        compatible = false;
      }
    } else if (mbRAM) {
      compatScore += 50; // Parcial si no podemos verificar completamente
    }
    
    // 3. Presupuesto (50 puntos)
    if (mb.price <= budget) {
      const budgetRatio = mb.price / budget;
      compatScore += 50 * budgetRatio;
    } else {
      compatScore -= 100; // Penalización por exceder presupuesto
    }
    
    // 4. Features (bonus, 30 puntos)
    const mbName = mb.name.toLowerCase();
    if (mbName.includes('wifi')) compatScore += 10;
    if (mbName.includes('bt') || mbName.includes('bluetooth')) compatScore += 5;
    if (mbName.includes('atx') && !mbName.includes('micro')) compatScore += 10;
    if (mbName.includes('b550') || mbName.includes('b650') || 
        mbName.includes('z690') || mbName.includes('z790')) compatScore += 5;
    
    return { mb, compatScore, compatible, mbSocket, mbRAM };
  });
  
  // Filtrar solo compatibles
  let compatible = scored.filter(s => s.compatible);
  
  if (compatible.length === 0) {
    console.error('¡NO SE ENCONTRARON MOTHERBOARDS COMPATIBLES!');
    console.log('Motherboards disponibles:');
    scored.slice(0, 5).forEach(s => {
      console.log(`  ${s.mb.name}`);
      console.log(`    Socket: ${s.mbSocket} (necesita: ${cpuSpecs.socket})`);
      console.log(`    RAM: ${s.mbRAM} (necesita: ${cpuSpecs.ramType})`);
      console.log(`    Precio: $${s.mb.price} (presupuesto: $${budget})`);
    });
    return null;
  }
  
  // Ordenar por score
  compatible.sort((a, b) => b.compatScore - a.compatScore);
  
  console.log(`\nMotherboards compatibles encontradas: ${compatible.length}`);
  console.log(`Seleccionada: ${compatible[0].mb.name} (Score: ${compatible[0].compatScore})`);
  
  return compatible[0].mb;
}

function selectCompatibleRAM(rams, cpu, motherboard, usage, budget) {
  if (rams.length === 0) return null;
  
  const cpuSpecs = extractCPUSpecs(cpu);
  const mbSpecs = motherboard.specifications || {};
  const targetRAMType = cpuSpecs.ramType || 
                        mbSpecs.tipoMemoria || 
                        mbSpecs.tipoMemoriaRAM;
  
  console.log(`\nBuscando RAM compatible:`);
  console.log(`  Tipo: ${targetRAMType}`);
  console.log(`  Presupuesto: $${budget}`);
  
  // Scoring de RAM
  const scored = rams.map(ram => {
    const ramSpecs = ram.specifications || {};
    const ramFormat = ramSpecs.formatoMemoriaRAM || ramSpecs.formato || '';
    const ramType = ramSpecs.tipoMemoriaRAM || ramSpecs.tipo || ramSpecs.Tipo || ram.name;
    const capacity = ramSpecs.capacidad || ramSpecs.Capacidad || ram.name;
    const speed = parseInt(ramSpecs.velocidad || ramSpecs.velocidadMemoria || '0');
    
    let score = 0;
    let compatible = true;
    
    // 1. EXCLUIR SODIMM (laptop RAM) - CRÍTICO
    if (ramFormat.toUpperCase().includes('SODIMM')) {
      return { ram, score: -1000, compatible: false };
    }
    
    // 2. Compatibilidad de tipo (100 puntos)
    if (targetRAMType && ramType) {
      if (ramType.includes(targetRAMType)) {
        score += 100;
      } else {
        compatible = false;
      }
    }
    
    // 3. Presupuesto (50 puntos)
    if (ram.price <= budget * 1.15) { // Permitir 15% de flex
      score += 50 * (1 - (ram.price / (budget * 1.15)));
    } else {
      score -= 50;
    }
    
    // 4. Capacidad según uso (80 puntos)
    const is32GB = capacity && (capacity.includes('32') || capacity.includes('32GB'));
    const is16GB = capacity && (capacity.includes('16') || capacity.includes('16GB'));
    const is8GB = capacity && (capacity.includes('8') || capacity.includes('8GB'));
    
    if (usage === 'Gaming' || usage === 'Multimedia') {
      if (is32GB) score += 80;
      else if (is16GB) score += 70;
      else if (is8GB) score += 40;
    } else if (usage === 'Trabajo') {
      if (is32GB) score += 80;
      else if (is16GB) score += 75;
      else if (is8GB) score += 50;
    } else {
      if (is16GB) score += 80;
      else if (is8GB) score += 70;
      else if (is32GB) score += 60;
    }
    
    // 5. Velocidad (40 puntos)
    if (speed >= 6000) score += 40;
    else if (speed >= 5200) score += 35;
    else if (speed >= 4800) score += 30;
    else if (speed >= 3600) score += 25;
    else if (speed >= 3200) score += 20;
    else if (speed >= 2666) score += 15;
    
    return { ram, score, compatible, capacity, speed };
  });
  
  // Filtrar compatibles
  let compatible = scored.filter(s => s.compatible && s.score > 0);
  
  if (compatible.length === 0) {
    console.warn('No se encontró RAM compatible en presupuesto, buscando alternativas...');
    // Fallback: cualquier RAM de escritorio (no SODIMM)
    compatible = scored.filter(s => s.score > -1000);
  }
  
  if (compatible.length === 0) {
    console.error('No se encontró RAM compatible');
    return null;
  }
  
  // Ordenar por score
  compatible.sort((a, b) => b.score - a.score);
  
  console.log(`RAMs compatibles: ${compatible.length}`);
  console.log(`Seleccionada: ${compatible[0].ram.name} (Score: ${compatible[0].score})`);
  console.log(`  Capacidad: ${compatible[0].capacity}, Velocidad: ${compatible[0].speed}MHz`);
  
  return compatible[0].ram;
}

function selectStorage(storage, budget, usage) {
  if (storage.length === 0) return null;
  
  console.log(`\nBuscando Storage - Presupuesto: $${budget}`);
  
  // Clasificar tipos de storage
  const classified = storage.map(s => {
    const name = s.name.toLowerCase();
    const specs = s.specifications || {};
    
    let type = 'UNKNOWN';
    let capacity = 0;
    
    // Detectar tipo
    if (name.includes('nvme') || (name.includes('m.2') && !name.includes('sata'))) {
      type = 'NVMe';
    } else if (name.includes('ssd') && !name.includes('externo')) {
      type = 'SSD';
    } else if (name.includes('hdd') || name.includes('disco duro')) {
      type = 'HDD';
    }
    
    // Extraer capacidad
    const capacityMatch = name.match(/(\d+)\s*(tb|gb)/i);
    if (capacityMatch) {
      capacity = parseInt(capacityMatch[1]);
      if (capacityMatch[2].toLowerCase() === 'tb') capacity *= 1000;
    }
    
    return { storage: s, type, capacity };
  });
  
  // Scoring
  const scored = classified.map(({ storage, type, capacity }) => {
    let score = 0;
    
    // 1. Tipo de storage (60 puntos)
    if (type === 'NVMe') score += 60;
    else if (type === 'SSD') score += 45;
    else if (type === 'HDD') score += 20;
    
    // 2. Presupuesto (40 puntos)
    if (storage.price <= budget) {
      score += 40 * (storage.price / budget);
    } else {
      score -= 50;
    }
    
    // 3. Capacidad según uso (50 puntos)
    if (usage === 'Gaming' || usage === 'Multimedia') {
      if (capacity >= 1000) score += 50;
      else if (capacity >= 500) score += 40;
      else if (capacity >= 240) score += 25;
    } else {
      if (capacity >= 500) score += 50;
      else if (capacity >= 240) score += 45;
      else if (capacity >= 120) score += 35;
    }
    
    return { storage, score, type, capacity };
  });
  
  // Filtrar y ordenar
  const affordable = scored.filter(s => s.storage.price <= budget);
  
  if (affordable.length === 0) {
    console.warn('No hay storage en presupuesto');
    return null;
  }
  
  affordable.sort((a, b) => b.score - a.score);
  
  console.log(`Storage seleccionado: ${affordable[0].storage.name}`);
  console.log(`  Tipo: ${affordable[0].type}, Capacidad: ${affordable[0].capacity}GB`);
  
  return affordable[0].storage;
}

function selectCooler(coolers, cpu, budget) {
  if (coolers.length === 0) return null;
  
  const cpuSpecs = extractCPUSpecs(cpu);
  
  console.log(`\nBuscando Cooler:`);
  console.log(`  Socket: ${cpuSpecs.socket}`);
  console.log(`  TDP: ${cpuSpecs.tdp}W`);
  console.log(`  Presupuesto: $${budget}`);
  
  const scored = coolers.map(cooler => {
    const name = cooler.name.toLowerCase();
    const specs = JSON.stringify(cooler.specifications || {}).toLowerCase();
    const fullInfo = name + ' ' + specs;
    
    let score = 0;
    let compatible = true;
    
    // 1. Compatibilidad de socket (100 puntos)
    if (cpuSpecs.socket) {
      const socket = cpuSpecs.socket.toLowerCase();
      
      if (socket.includes('am5') && fullInfo.includes('am5')) score += 100;
      else if (socket.includes('am4') && fullInfo.includes('am4')) score += 100;
      else if (socket.includes('1700') && fullInfo.includes('1700')) score += 100;
      else if (socket.includes('1200') && fullInfo.includes('1200')) score += 100;
      else if (socket.includes('1151') && fullInfo.includes('1151')) score += 100;
      else compatible = false;
    }
    
    // 2. Capacidad TDP (80 puntos)
    const tdpMatch = name.match(/(\d+)w/i);
    if (tdpMatch) {
      const coolerTDP = parseInt(tdpMatch[1]);
      if (coolerTDP >= cpuSpecs.tdp * 1.5) score += 80;
      else if (coolerTDP >= cpuSpecs.tdp * 1.2) score += 60;
      else if (coolerTDP >= cpuSpecs.tdp) score += 40;
      else score += 20;
    } else {
      score += 30; // Score neutral si no tenemos info de TDP
    }
    
    // 3. Tipo de cooler (30 puntos)
    if (fullInfo.includes('liquida') || fullInfo.includes('aio')) score += 30;
    else if (fullInfo.includes('torre') || fullInfo.includes('tower')) score += 25;
    else score += 15;
    
    // 4. Presupuesto (40 puntos)
    if (cooler.price <= budget) {
      score += 40 * (cooler.price / budget);
    } else {
      score -= 40;
    }
    
    return { cooler, score, compatible };
  });
  
  // Filtrar compatibles
  let compatible = scored.filter(s => s.compatible && s.cooler.price <= budget * 1.2);
  
  if (compatible.length === 0) {
    console.warn('No se encontró cooler compatible, usando fallback');
    compatible = scored.filter(s => s.cooler.price <= budget * 1.3);
  }
  
  if (compatible.length === 0) {
    console.warn('No hay coolers en presupuesto');
    return null;
  }
  
  compatible.sort((a, b) => b.score - a.score);
  
  console.log(`Cooler seleccionado: ${compatible[0].cooler.name} (Score: ${compatible[0].score})`);
  
  return compatible[0].cooler;
}

function selectPSU(psus, requiredWatts, budget) {
  if (psus.length === 0) return null;
  
  console.log(`\nBuscando PSU:`);
  console.log(`  Wattaje requerido: ${requiredWatts}W`);
  console.log(`  Presupuesto: ${budget}`);
  
  const scored = psus.map(psu => {
    const name = psu.name.toLowerCase();
    const specs = psu.specifications || {};
    
    // Extraer wattaje
    let wattage = 0;
    const wattMatch = name.match(/(\d+)\s*w/i);
    if (wattMatch) {
      wattage = parseInt(wattMatch[1]);
    } else {
      const potencia = specs.Potencia || specs.potencia;
      if (potencia) {
        const match = potencia.toString().match(/(\d+)/);
        if (match) wattage = parseInt(match[1]);
      }
    }
    
    // Detectar certificación
    let certification = 'None';
    if (name.includes('titanium')) certification = 'Titanium';
    else if (name.includes('platinum')) certification = 'Platinum';
    else if (name.includes('gold')) certification = 'Gold';
    else if (name.includes('bronze')) certification = 'Bronze';
    else if (name.includes('white')) certification = 'White';
    
    let score = 0;
    
    // 1. Capacidad de wattaje (100 puntos)
    if (wattage >= requiredWatts * 1.5) score += 100;
    else if (wattage >= requiredWatts * 1.3) score += 90;
    else if (wattage >= requiredWatts * 1.2) score += 80;
    else if (wattage >= requiredWatts) score += 70;
    else if (wattage >= requiredWatts * 0.9) score += 50;
    else score += 20;
    
    // 2. Certificación (50 puntos)
    const certScores = {
      'Titanium': 50,
      'Platinum': 45,
      'Gold': 40,
      'Bronze': 30,
      'White': 20,
      'None': 10
    };
    score += certScores[certification];
    
    // 3. Presupuesto (50 puntos)
    if (psu.price <= budget) {
      score += 50;
    } else if (psu.price <= budget * 1.15) {
      score += 30;
    } else {
      score -= 50;
    }
    
    // 4. Modularidad (bonus 20 puntos)
    if (name.includes('modular') || name.includes('full modular')) score += 20;
    else if (name.includes('semi modular') || name.includes('semi-modular')) score += 10;
    
    return { psu, score, wattage, certification };
  });
  
  // Filtrar PSUs viables
  let viable = scored.filter(s => 
    s.wattage >= requiredWatts * 0.85 && 
    s.psu.price <= budget * 1.2
  );
  
  if (viable.length === 0) {
    console.warn('No hay PSUs con wattaje suficiente, expandiendo criterios...');
    viable = scored.filter(s => s.psu.price <= budget * 1.3);
  }
  
  if (viable.length === 0) {
    console.warn('No hay PSUs en presupuesto, tomando el más económico');
    return scored.sort((a, b) => a.psu.price - b.psu.price)[0]?.psu;
  }
  
  // Ordenar por score
  viable.sort((a, b) => b.score - a.score);
  
  console.log(`PSU seleccionado: ${viable[0].psu.name}`);
  console.log(`  Wattaje: ${viable[0].wattage}W, Certificación: ${viable[0].certification}`);
  
  return viable[0].psu;
}