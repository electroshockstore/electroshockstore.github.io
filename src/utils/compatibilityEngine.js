/**
 * Compatibility Engine v2.0
 * Sistema profesional de validación de compatibilidad para PC Builder
 *
 * Mejoras clave:
 * - Normalización centralizada de campos
 * - Validación exhaustiva de RAM (tipo, velocidad, capacidad máxima, slots)
 * - Validación de TDP y cooling
 * - Validación de form factor (ATX / mATX / ITX)
 * - Validación de conectores PCIe de la PSU vs GPU
 * - Validación de slots M.2 / SATA
 * - Sistema de severidad de errores (error / warning / info)
 * - Todos los mensajes limpios y estructurados
 */

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTES
// ─────────────────────────────────────────────────────────────────────────────

/** Jerarquía de form factors (cuánto cabe dentro de cuánto) */
const FORM_FACTOR_HIERARCHY = {
  'E-ATX': 4,
  'ATX': 3,
  'MATX': 2,
  'M-ATX': 2,
  'MICRO-ATX': 2,
  'ITX': 1,
  'MINI-ITX': 1,
};

/** Factor de seguridad de picos por rango de GPU */
const GPU_SPIKE_FACTORS = [
  { threshold: 300, factor: 1.55 },
  { threshold: 200, factor: 1.45 },
  { threshold: 100, factor: 1.35 },
  { threshold: 0,   factor: 1.25 },
];

/** Consumos estimados de componentes sin dato explícito (W) */
const ESTIMATED_POWER = {
  motherboard: 50,
  ram_per_module: 4,
  storage_ssd: 5,
  storage_hdd: 8,
  cooling: 10,
  case_fans: 5,
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS DE NORMALIZACIÓN
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Busca un valor en múltiples rutas de un objeto.
 * Retorna el primer valor no nulo/undefined encontrado.
 */
function pick(obj, ...paths) {
  for (const path of paths) {
    const keys = path.split('.');
    let cur = obj;
    for (const k of keys) {
      if (cur == null) break;
      cur = cur[k];
    }
    if (cur != null && cur !== '') return cur;
  }
  return null;
}

/** Normaliza a string en mayúsculas sin espacios superfluos */
function norm(val) {
  return val != null ? String(val).trim().toUpperCase() : null;
}

/** Extrae el primer número de un string (ej: "650W" → 650, "DDR5-6000" → 6000) */
function extractInt(val) {
  if (val == null) return null;
  const m = String(val).match(/(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

/** Normaliza el tipo DDR: "DDR5", "ddr5", "DDR 5" → "DDR5" */
function normDDR(val) {
  if (!val) return null;
  return norm(val).replace(/[\s\-_]/g, '');
}

/** Normaliza form factor */
function normFF(val) {
  if (!val) return null;
  return norm(val).replace(/[\s\-_]/g, '');
}

// ─────────────────────────────────────────────────────────────────────────────
// EXTRACTORES DE CAMPOS
// ─────────────────────────────────────────────────────────────────────────────

function getSocket(p) {
  return norm(pick(p,
    'compatibility.socket', 'compatibility.Socket',
    'specifications.socket', 'specifications.Socket',
    'specs.socket', 'specs.Socket',
    'socket',
  ));
}

function getRAMType(p) {
  return normDDR(pick(p,
    'ddrType',
    'compatibility.memoriaRAM', 'compatibility.tipoMemoriaRAM',
    'compatibility.tipo',
    'specifications.memoriaRAM', 'specifications.tipoMemoriaRAM',
    'specifications.tipo', 'specifications.tipoMemoria',
    'specs.memoriaRAM', 'specs.tipo',
  ));
}

function getRAMFormat(p) {
  const raw = norm(pick(p,
    'compatibility.formato',
    'specifications.formato', 'specifications.formatoMemoriaRAM',
    'specs.formato',
  ));
  if (!raw) return 'DIMM';
  if (raw.includes('SODIMM') || raw.includes('SO-DIMM') || raw.includes('SODIMM')) return 'SODIMM';
  return 'DIMM';
}

function getRAMSpeed(p) {
  return extractInt(pick(p,
    'compatibility.velocidad', 'compatibility.speed',
    'specifications.velocidad', 'specifications.speed',
    'specifications.frecuencia',
    'specs.velocidad', 'specs.speed',
    'speed', 'frecuencia',
  ));
}

/** Velocidades máximas soportadas por la motherboard (array o string separada por comas) */
function getMBMaxRAMSpeed(p) {
  const raw = pick(p,
    'compatibility.maxRAMSpeed', 'compatibility.velocidadMaxRAM',
    'specifications.maxRAMSpeed', 'specifications.velocidadMaxRAM',
    'specs.maxRAMSpeed',
  );
  if (!raw) return null;
  if (Array.isArray(raw)) return raw.map(Number);
  // Podría ser "6000, 5600, 5200"
  return String(raw).split(/[,;]/).map(v => extractInt(v)).filter(Boolean);
}

/** Capacidad máxima de RAM soportada por MB (GB) */
function getMBMaxRAMCapacity(p) {
  return extractInt(pick(p,
    'compatibility.maxRAMCapacity', 'compatibility.maxMemoria',
    'specifications.maxRAMCapacity', 'specifications.memoriaMaxima',
    'specs.maxRAMCapacity',
  ));
}

/** Número de slots de RAM en la MB */
function getMBRAMSlots(p) {
  return extractInt(pick(p,
    'compatibility.ramSlots', 'compatibility.slots',
    'specifications.ramSlots', 'specifications.slots',
    'specs.ramSlots',
  ));
}

/** Capacidad de un módulo de RAM en GB */
function getRAMCapacityGB(p) {
  return extractInt(pick(p,
    'compatibility.capacidad', 'specifications.capacidad',
    'specifications.capacidadGB', 'specs.capacidad',
    'capacidad',
  ));
}

/** TDP del procesador (W) */
function getCPUTDP(p) {
  return extractInt(pick(p,
    'compatibility.tdp', 'specifications.tdp',
    'specs.tdp', 'tdp',
  ));
}

/** TDP máximo soportado por el cooler */
function getCoolerMaxTDP(p) {
  return extractInt(pick(p,
    'compatibility.maxTDP', 'compatibility.tdpMax',
    'specifications.maxTDP', 'specifications.tdpMax',
    'specs.maxTDP',
  ));
}

/** Sockets soportados por el cooler (array o string separada por comas) */
function getCoolerSockets(p) {
  const raw = pick(p,
    'compatibility.sockets', 'compatibility.socketsSoportados',
    'specifications.sockets', 'specifications.socketsSoportados',
    'specs.sockets',
  );
  if (!raw) return null;
  if (Array.isArray(raw)) return raw.map(norm);
  return String(raw).split(/[,;\/]/).map(norm).filter(Boolean);
}

function getPowerConsumption(p) {
  return extractInt(pick(p,
    'compatibility.consumo_watts', 'compatibility.tdp',
    'specifications.consumo_watts', 'specifications.tdp',
    'powerConsumption', 'tdp',
    'specs.consumo_watts', 'specs.tdp',
  )) || 0;
}

function getPSUCapacity(p) {
  return extractInt(pick(p,
    'compatibility.capacidad_watts',
    'specifications.potencia', 'specifications.capacidad',
    'specs.capacidad_watts',
    'capacidad_watts', 'potencia',
  ));
}

/** Conectores PCIe que ofrece la PSU (ej: ["8-pin", "6+2-pin"]) */
function getPSUPCIeConnectors(p) {
  const raw = pick(p,
    'compatibility.conectoresPCIe', 'specifications.conectoresPCIe',
    'specs.conectoresPCIe',
  );
  if (!raw) return null;
  if (Array.isArray(raw)) return raw;
  return String(raw).split(/[,;]/).map(s => s.trim()).filter(Boolean);
}

/** Conectores PCIe requeridos por la GPU */
function getGPUPCIeConnectors(p) {
  const raw = pick(p,
    'compatibility.conectoresPCIe', 'specifications.conectoresPCIe',
    'specs.conectoresPCIe',
  );
  if (!raw) return null;
  if (Array.isArray(raw)) return raw;
  return String(raw).split(/[,;]/).map(s => s.trim()).filter(Boolean);
}

function getFormFactor(p) {
  const raw = norm(pick(p,
    'compatibility.formFactor', 'compatibility.formato',
    'specifications.formFactor', 'specifications.formato',
    'specs.formFactor',
    'formFactor', 'formato',
  ));
  if (!raw) return null;
  return normFF(raw);
}

/** Slots M.2 disponibles en la MB */
function getMBM2Slots(p) {
  return extractInt(pick(p,
    'compatibility.slotsM2', 'specifications.slotsM2',
    'specs.slotsM2',
  ));
}

/** Puertos SATA disponibles en la MB */
function getMBSATAPorts(p) {
  return extractInt(pick(p,
    'compatibility.puertosSATA', 'specifications.puertosSATA',
    'specs.puertosSATA',
  ));
}

/** Interfaz del storage (M.2, SATA, NVMe) */
function getStorageInterface(p) {
  return norm(pick(p,
    'compatibility.interfaz', 'specifications.interfaz',
    'specs.interfaz', 'interfaz',
  ));
}

// ─────────────────────────────────────────────────────────────────────────────
// SISTEMA DE MENSAJES
// ─────────────────────────────────────────────────────────────────────────────

const MSG = {
  ok:   (msg) => ({ type: 'ok',      icon: '✓', text: msg }),
  warn: (msg) => ({ type: 'warning', icon: '⚠', text: msg }),
  err:  (msg) => ({ type: 'error',   icon: '✗', text: msg }),
  info: (msg) => ({ type: 'info',    icon: 'ℹ', text: msg }),
};

/** Convierte mensajes estructurados al formato legacy de strings para compatibilidad hacia atrás */
function toLegacyReasons(messages) {
  return messages.map(m => `${m.icon} ${m.text}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// VALIDADORES POR CATEGORÍA
// ─────────────────────────────────────────────────────────────────────────────

function validateCPU(pcBuild, cpu) {
  const messages = [];
  let compatible = true;

  const cpuSocket  = getSocket(cpu);
  const cpuRAMType = getRAMType(cpu);
  const cpuTDP     = getCPUTDP(cpu);

  // — Socket vs Motherboard —
  if (pcBuild.motherboard) {
    const mbSocket = getSocket(pcBuild.motherboard);
    if (!cpuSocket) {
      messages.push(MSG.warn('Socket del procesador no especificado'));
    } else if (!mbSocket) {
      messages.push(MSG.warn('Socket del motherboard no especificado'));
    } else if (cpuSocket === mbSocket) {
      messages.push(MSG.ok(`Socket ${cpuSocket} — compatible con el motherboard`));
    } else {
      compatible = false;
      messages.push(MSG.err(`Socket incompatible: procesador ${cpuSocket} / motherboard ${mbSocket}`));
    }
  } else if (cpuSocket) {
    messages.push(MSG.info(`Socket: ${cpuSocket}`));
  }

  // — Tipo de RAM vs módulos instalados —
  if (pcBuild.ram.length > 0) {
    const ramType = getRAMType(pcBuild.ram[0]);
    if (cpuRAMType && ramType && cpuRAMType !== ramType) {
      compatible = false;
      messages.push(MSG.err(`Incompatibilidad de RAM: procesador soporta ${cpuRAMType}, tienes ${ramType}`));
    } else if (cpuRAMType && ramType && cpuRAMType === ramType) {
      messages.push(MSG.ok(`Tipo de RAM ${cpuRAMType} compatible`));
    }
  } else if (cpuRAMType) {
    messages.push(MSG.info(`Requiere RAM ${cpuRAMType}`));
  }

  // — TDP vs Cooler —
  if (pcBuild.cooling && cpuTDP) {
    const maxTDP = getCoolerMaxTDP(pcBuild.cooling);
    if (maxTDP && cpuTDP > maxTDP) {
      compatible = false;
      messages.push(MSG.err(`Refrigeración insuficiente: procesador ${cpuTDP}W TDP / cooler soporta hasta ${maxTDP}W`));
    } else if (maxTDP) {
      messages.push(MSG.ok(`Refrigeración adecuada (TDP ${cpuTDP}W ≤ ${maxTDP}W)`));
    }
  } else if (cpuTDP) {
    messages.push(MSG.info(`TDP: ${cpuTDP}W`));
  }

  // — Gráficos integrados —
  const iGPU = pick(cpu, 'compatibility.graficosIntegrados', 'specifications.graficosIntegrados');
  if (iGPU && iGPU !== 'No' && iGPU !== false) {
    messages.push(MSG.ok('Incluye gráficos integrados'));
  } else if (iGPU === 'No' || iGPU === false) {
    messages.push(MSG.info('Requiere GPU dedicada'));
  }

  return { compatible, messages };
}

// ─────────────────────────────────────────────────────────────────────────────

function validateMotherboard(pcBuild, mb) {
  const messages = [];
  let compatible = true;

  const mbSocket   = getSocket(mb);
  const mbRAMType  = getRAMType(mb);
  const mbFF       = getFormFactor(mb);
  const mbRAMSlots = getMBRAMSlots(mb);
  const mbMaxRAM   = getMBMaxRAMCapacity(mb);

  // — Socket vs CPU —
  if (pcBuild.cpu) {
    const cpuSocket = getSocket(pcBuild.cpu);
    if (!mbSocket) {
      messages.push(MSG.warn('Socket del motherboard no especificado'));
    } else if (!cpuSocket) {
      messages.push(MSG.warn('Socket del procesador no especificado'));
    } else if (mbSocket === cpuSocket) {
      messages.push(MSG.ok(`Socket ${mbSocket} — compatible con el procesador`));
    } else {
      compatible = false;
      messages.push(MSG.err(`Socket incompatible: motherboard ${mbSocket} / procesador ${cpuSocket}`));
    }
  } else if (mbSocket) {
    messages.push(MSG.info(`Socket: ${mbSocket}`));
  }

  // — Tipo de RAM —
  if (pcBuild.ram.length > 0) {
    const ramType = getRAMType(pcBuild.ram[0]);
    if (mbRAMType && ramType) {
      if (mbRAMType === ramType) {
        messages.push(MSG.ok(`Tipo de RAM ${ramType} compatible`));
      } else {
        compatible = false;
        messages.push(MSG.err(`RAM incompatible: motherboard requiere ${mbRAMType}, tienes ${ramType}`));
      }
    }
  } else if (mbRAMType && !pcBuild.cpu) {
    messages.push(MSG.info(`Soporta ${mbRAMType}`));
  }

  // — Capacidad total de RAM vs slots —
  if (pcBuild.ram.length > 0 && mbRAMSlots != null) {
    if (pcBuild.ram.length > mbRAMSlots) {
      compatible = false;
      messages.push(MSG.err(`Demasiados módulos de RAM: motherboard tiene ${mbRAMSlots} slots, intentas instalar ${pcBuild.ram.length}`));
    } else {
      messages.push(MSG.info(`Usando ${pcBuild.ram.length} de ${mbRAMSlots} slots de RAM`));
    }

    if (mbMaxRAM != null) {
      const totalRAMGB = pcBuild.ram.reduce((acc, r) => acc + (getRAMCapacityGB(r) || 0), 0);
      if (totalRAMGB > mbMaxRAM) {
        compatible = false;
        messages.push(MSG.err(`Capacidad de RAM excedida: máximo ${mbMaxRAM}GB, estás instalando ${totalRAMGB}GB`));
      } else if (totalRAMGB > 0) {
        messages.push(MSG.ok(`${totalRAMGB}GB de RAM — dentro del límite de ${mbMaxRAM}GB`));
      }
    }
  }

  // — Form Factor vs Case —
  if (pcBuild.case) {
    const caseFF = getFormFactor(pcBuild.case);
    if (mbFF && caseFF) {
      const mbLevel   = FORM_FACTOR_HIERARCHY[mbFF]   ?? 0;
      const caseLevel = FORM_FACTOR_HIERARCHY[caseFF] ?? 0;
      if (mbLevel > caseLevel) {
        compatible = false;
        messages.push(MSG.err(`Form factor incompatible: motherboard ${mbFF} no cabe en gabinete ${caseFF}`));
      } else {
        messages.push(MSG.ok(`Form factor ${mbFF} compatible con gabinete ${caseFF}`));
      }
    }
  } else if (mbFF) {
    messages.push(MSG.info(`Form factor: ${mbFF}`));
  }

  // — Slots M.2 disponibles —
  if (mbFF) {
    const usedM2 = pcBuild.storage.filter(s => {
      const iface = getStorageInterface(s);
      return iface && (iface.includes('M.2') || iface.includes('NVME') || iface.includes('M2'));
    }).length;
    const m2Slots = getMBM2Slots(mb);
    if (m2Slots != null && usedM2 > 0) {
      if (usedM2 > m2Slots) {
        compatible = false;
        messages.push(MSG.err(`No hay suficientes slots M.2: disponibles ${m2Slots}, necesarios ${usedM2}`));
      } else {
        messages.push(MSG.ok(`Slots M.2: ${usedM2} de ${m2Slots} usados`));
      }
    }
  }

  return { compatible, messages };
}

// ─────────────────────────────────────────────────────────────────────────────

function validateRAM(pcBuild, ram) {
  const messages = [];
  let compatible = true;

  const ramType   = getRAMType(ram);
  const ramFormat = getRAMFormat(ram);
  const ramSpeed  = getRAMSpeed(ram);

  // — Formato SODIMM (para laptop) —
  if (ramFormat === 'SODIMM') {
    compatible = false;
    messages.push(MSG.err('Módulo SO-DIMM: diseñado para laptops, no compatible con PC de escritorio'));
    return { compatible, messages };
  }

  let checkedAny = false;
  let typeOk = false;

  // — Tipo vs CPU —
  if (pcBuild.cpu) {
    const cpuRAMType = getRAMType(pcBuild.cpu);
    if (cpuRAMType && ramType) {
      checkedAny = true;
      if (cpuRAMType !== ramType) {
        compatible = false;
        messages.push(MSG.err(`Incompatible con el procesador: CPU requiere ${cpuRAMType}, este módulo es ${ramType}`));
      } else {
        typeOk = true;
      }
    }
  }

  // — Tipo vs Motherboard —
  if (pcBuild.motherboard) {
    const mbRAMType = getRAMType(pcBuild.motherboard);
    if (mbRAMType && ramType) {
      checkedAny = true;
      if (mbRAMType !== ramType) {
        compatible = false;
        messages.push(MSG.err(`Incompatible con el motherboard: requiere ${mbRAMType}, este módulo es ${ramType}`));
      } else {
        typeOk = true;
      }
    }

    // — Velocidad vs MB —
    const maxSpeeds = getMBMaxRAMSpeed(pcBuild.motherboard);
    if (ramSpeed && maxSpeeds && maxSpeeds.length > 0) {
      const maxSupported = Math.max(...maxSpeeds);
      if (ramSpeed > maxSupported) {
        messages.push(MSG.warn(`RAM a ${ramSpeed}MHz supera el máximo del motherboard (${maxSupported}MHz); funcionará a menor frecuencia`));
      } else {
        messages.push(MSG.ok(`Velocidad ${ramSpeed}MHz soportada por el motherboard`));
      }
    }

    // — Slots disponibles —
    const slots = getMBRAMSlots(pcBuild.motherboard);
    if (slots != null) {
      const existingCount = pcBuild.ram.length; // módulos ya en el build (sin contar el candidato)
      if (existingCount >= slots) {
        compatible = false;
        messages.push(MSG.err(`No hay slots disponibles: motherboard tiene ${slots} slots y ya están ocupados`));
      } else {
        messages.push(MSG.info(`Slots disponibles: ${slots - existingCount - 1} restantes tras esta adición`));
      }
    }

    // — Capacidad máxima —
    const maxCap = getMBMaxRAMCapacity(pcBuild.motherboard);
    if (maxCap != null) {
      const currentGB  = pcBuild.ram.reduce((acc, r) => acc + (getRAMCapacityGB(r) || 0), 0);
      const newModGB   = getRAMCapacityGB(ram) || 0;
      const totalAfter = currentGB + newModGB;
      if (totalAfter > maxCap) {
        compatible = false;
        messages.push(MSG.err(`Capacidad excedida: instalar este módulo llevaría la RAM a ${totalAfter}GB (máximo ${maxCap}GB)`));
      }
    }
  }

  if (typeOk && compatible) {
    messages.push(MSG.ok(`Tipo ${ramType} — compatible`));
  }

  if (!checkedAny && ramType) {
    messages.push(MSG.info(`Tipo: ${ramType}${ramSpeed ? ` @ ${ramSpeed}MHz` : ''}`));
  }

  return { compatible, messages };
}

// ─────────────────────────────────────────────────────────────────────────────

function validateGPU(pcBuild, gpu) {
  const messages = [];
  let compatible = true;

  // — Conectores PCIe requeridos vs PSU —
  if (pcBuild.psu) {
    const required  = getGPUPCIeConnectors(gpu);
    const available = getPSUPCIeConnectors(pcBuild.psu);
    if (required && available) {
      // Conteo simple: verificar que PSU tenga al menos la misma cantidad
      if (required.length > available.length) {
        messages.push(MSG.warn(`La GPU requiere ${required.length} conectores PCIe; verifica que la PSU los provea`));
      } else {
        messages.push(MSG.ok('Conectores PCIe disponibles en la PSU'));
      }
    }
  }

  const gpuConsumption = getPowerConsumption(gpu);
  if (gpuConsumption) {
    messages.push(MSG.info(`Consumo: ${gpuConsumption}W`));
  }

  return { compatible, messages };
}

// ─────────────────────────────────────────────────────────────────────────────

function validateCooling(pcBuild, cooler) {
  const messages = [];
  let compatible = true;

  const maxTDP      = getCoolerMaxTDP(cooler);
  const coolerSockets = getCoolerSockets(cooler);

  // — TDP vs CPU —
  if (pcBuild.cpu) {
    const cpuTDP    = getCPUTDP(pcBuild.cpu);
    const cpuSocket = getSocket(pcBuild.cpu);

    if (maxTDP && cpuTDP) {
      if (cpuTDP > maxTDP) {
        compatible = false;
        messages.push(MSG.err(`TDP insuficiente: CPU ${cpuTDP}W / cooler soporta ${maxTDP}W máximo`));
      } else {
        const margin = Math.round(((maxTDP - cpuTDP) / maxTDP) * 100);
        messages.push(MSG.ok(`TDP adecuado: ${cpuTDP}W CPU / ${maxTDP}W cooler (${margin}% de margen)`));
      }
    } else if (maxTDP) {
      messages.push(MSG.info(`TDP máximo soportado: ${maxTDP}W`));
    }

    // — Compatibilidad de socket con cooler —
    if (coolerSockets && cpuSocket) {
      const socketMatch = coolerSockets.some(s => norm(s) === norm(cpuSocket));
      if (!socketMatch) {
        compatible = false;
        messages.push(MSG.err(`Socket no soportado: cooler compatible con [${coolerSockets.join(', ')}], CPU usa ${cpuSocket}`));
      } else {
        messages.push(MSG.ok(`Socket ${cpuSocket} soportado por este cooler`));
      }
    }
  } else {
    if (maxTDP) messages.push(MSG.info(`TDP máximo: ${maxTDP}W`));
    if (coolerSockets) messages.push(MSG.info(`Sockets: ${coolerSockets.join(', ')}`));
  }

  return { compatible, messages };
}

// ─────────────────────────────────────────────────────────────────────────────

function validateStorage(pcBuild, storage) {
  const messages = [];
  let compatible = true;

  const iface = getStorageInterface(storage);
  if (!iface) {
    messages.push(MSG.info('Interfaz de almacenamiento no especificada'));
    return { compatible, messages };
  }

  const isNVMe = iface.includes('NVME') || iface.includes('M.2') || iface.includes('M2');
  const isSATA = iface.includes('SATA');

  if (pcBuild.motherboard) {
    if (isNVMe) {
      const m2Slots = getMBM2Slots(pcBuild.motherboard);
      const usedM2  = pcBuild.storage.filter(s => {
        const si = getStorageInterface(s);
        return si && (si.includes('NVME') || si.includes('M.2') || si.includes('M2'));
      }).length;

      if (m2Slots != null) {
        const remaining = m2Slots - usedM2;
        if (remaining <= 0) {
          compatible = false;
          messages.push(MSG.err(`Sin slots M.2 disponibles (${m2Slots} ocupados)`));
        } else {
          messages.push(MSG.ok(`Slot M.2 disponible (${remaining - 1} restantes tras esta adición)`));
        }
      } else {
        messages.push(MSG.info(`Interfaz: ${iface}`));
      }
    }

    if (isSATA) {
      const sataPorts = getMBSATAPorts(pcBuild.motherboard);
      const usedSATA  = pcBuild.storage.filter(s => {
        const si = getStorageInterface(s);
        return si && si.includes('SATA');
      }).length;

      if (sataPorts != null) {
        const remaining = sataPorts - usedSATA;
        if (remaining <= 0) {
          compatible = false;
          messages.push(MSG.err(`Sin puertos SATA disponibles (${sataPorts} ocupados)`));
        } else {
          messages.push(MSG.ok(`Puerto SATA disponible (${remaining - 1} restantes tras esta adición)`));
        }
      } else {
        messages.push(MSG.info(`Interfaz: ${iface}`));
      }
    }
  } else {
    messages.push(MSG.info(`Interfaz: ${iface}`));
  }

  return { compatible, messages };
}

// ─────────────────────────────────────────────────────────────────────────────

function validatePSU(pcBuild, psu) {
  const messages = [];
  let compatible = true;

  const psuCapacity    = getPSUCapacity(psu);
  const totalConsumption = calculateTotalPowerConsumption(pcBuild);

  if (!psuCapacity) {
    messages.push(MSG.warn('Potencia de la fuente no especificada — verifica manualmente'));
    return { compatible: true, messages };
  }

  // Factor de seguridad dinámico
  const gpuConsumption = pcBuild.gpu ? getPowerConsumption(pcBuild.gpu) : 0;
  let spikeFactor = GPU_SPIKE_FACTORS.find(({ threshold }) => gpuConsumption > threshold)?.factor ?? 1.25;

  const minRequired        = Math.round(totalConsumption * spikeFactor);
  const recommendedMargin  = Math.round(totalConsumption * spikeFactor * 1.15);

  if (totalConsumption === 0) {
    messages.push(MSG.info(`Capacidad: ${psuCapacity}W (agrega componentes para calcular consumo)`));
    return { compatible: true, messages };
  }

  if (psuCapacity < minRequired) {
    compatible = false;
    messages.push(MSG.err(`Potencia insuficiente: sistema requiere ~${minRequired}W, la fuente provee ${psuCapacity}W`));
    messages.push(MSG.info(`Consumo estimado: ${totalConsumption}W (factor picos x${spikeFactor.toFixed(2)})`));
  } else if (psuCapacity < recommendedMargin) {
    messages.push(MSG.warn(`Potencia justa (${psuCapacity}W): funcional pero sin margen para upgrades`));
    messages.push(MSG.info(`Consumo estimado: ${totalConsumption}W · Mínimo seguro: ${minRequired}W`));
  } else {
    const efficiency = Math.round((totalConsumption / psuCapacity) * 100);
    messages.push(MSG.ok(`${psuCapacity}W — adecuada con margen de seguridad`));
    messages.push(MSG.info(`Consumo: ${totalConsumption}W (${efficiency}% de carga — zona de alta eficiencia)`));
  }

  return { compatible, messages };
}

// ─────────────────────────────────────────────────────────────────────────────
// PUNTO DE ENTRADA PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Verifica la compatibilidad de un producto candidato con el build actual.
 *
 * @param {Object} pcBuild       - Build actual: { cpu, motherboard, ram[], gpu, storage[], cooling, psu, case }
 * @param {Object} candidateProduct
 * @param {string} category      - Categoría del candidato
 * @returns {{ compatible: boolean, status: 'neutral'|'green'|'yellow'|'red', reasons: string[], messages: Object[] }}
 */
export function checkCompatibility(pcBuild, candidateProduct, category) {
  if (!candidateProduct) {
    return { compatible: true, status: 'neutral', reasons: [], messages: [] };
  }

  const hasComponents = !!(
    pcBuild.cpu ||
    pcBuild.motherboard ||
    pcBuild.ram?.length > 0 ||
    pcBuild.gpu ||
    pcBuild.storage?.length > 0 ||
    pcBuild.cooling ||
    pcBuild.psu
  );

  let result;

  const cat = norm(category) ?? '';

  if      (cat === 'PROCESADORES' || cat === 'CPU')              result = validateCPU(pcBuild, candidateProduct);
  else if (cat === 'MOTHERBOARDS' || cat === 'PLACA MADRE')      result = validateMotherboard(pcBuild, candidateProduct);
  else if (cat.includes('RAM') || cat.includes('MEMORIA'))       result = validateRAM(pcBuild, candidateProduct);
  else if (cat === 'GPU' || cat.includes('TARJETA DE VIDEO') || cat.includes('GRAFICA')) result = validateGPU(pcBuild, candidateProduct);
  else if (cat.includes('FUENTE') || cat === 'PSU')             result = validatePSU(pcBuild, candidateProduct);
  else if (cat.includes('COOLER') || cat.includes('REFRIGER'))  result = validateCooling(pcBuild, candidateProduct);
  else if (cat.includes('ALMACENAMIENTO') || cat.includes('STORAGE') || cat.includes('SSD') || cat.includes('HDD')) result = validateStorage(pcBuild, candidateProduct);
  else {
    result = { compatible: true, messages: [] };
  }

  const { compatible, messages } = result;

  const hasErrors   = messages.some(m => m.type === 'error');
  const hasWarnings = messages.some(m => m.type === 'warning');
  const hasOk       = messages.some(m => m.type === 'ok');

  let status = 'neutral';
  if (hasComponents) {
    if (hasErrors)        status = 'red';
    else if (hasWarnings) status = 'yellow';
    else if (hasOk)       status = 'green';
  }

  return {
    compatible,
    status,
    messages,                         // formato rico: [{ type, icon, text }]
    reasons: toLegacyReasons(messages), // formato legacy: string[]
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// CÁLCULO DE CONSUMO ENERGÉTICO
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calcula el consumo total estimado en watts del build.
 * Usa valores reales cuando existen; aplica estimaciones cuando no.
 */
export function calculateTotalPowerConsumption(pcBuild) {
  let total = 0;

  if (pcBuild.cpu)        total += getPowerConsumption(pcBuild.cpu) || ESTIMATED_POWER.motherboard; // MB ~50W included sep.
  if (pcBuild.gpu)        total += getPowerConsumption(pcBuild.gpu);
  if (pcBuild.motherboard) total += ESTIMATED_POWER.motherboard;
  if (pcBuild.cooling)    total += ESTIMATED_POWER.cooling;

  // RAM
  total += (pcBuild.ram?.length ?? 0) * ESTIMATED_POWER.ram_per_module;

  // Storage
  for (const s of (pcBuild.storage ?? [])) {
    const iface = getStorageInterface(s);
    total += iface?.includes('HDD') ? ESTIMATED_POWER.storage_hdd : ESTIMATED_POWER.storage_ssd;
  }

  return total;
}

// ─────────────────────────────────────────────────────────────────────────────
// LISTADO CON COMPATIBILIDAD
// ─────────────────────────────────────────────────────────────────────────────

const STATUS_ORDER = { green: 0, neutral: 1, yellow: 2, red: 3 };

/**
 * Retorna todos los productos de una categoría con su resultado de compatibilidad,
 * ordenados de más a menos compatible.
 */
export function getCompatibleProducts(pcBuild, products, category) {
  return products
    .filter(p => norm(p.category) === norm(category))
    .map(product => ({
      ...product,
      compatibilityResult: checkCompatibility(pcBuild, product, category),
    }))
    .sort((a, b) =>
      (STATUS_ORDER[a.compatibilityResult.status] ?? 1) -
      (STATUS_ORDER[b.compatibilityResult.status] ?? 1)
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// RESUMEN GLOBAL DEL BUILD
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Devuelve un resumen de compatibilidad de todo el build.
 *
 * @returns {{
 *   overallStatus: 'ok'|'warnings'|'errors',
 *   issues: Array<{ component: string, message: Object }>,
 *   totalPower: number
 * }}
 */
export function getBuildSummary(pcBuild) {
  const COMPONENT_CATEGORIES = [
    { key: 'cpu',         label: 'Procesador',      category: 'Procesadores'     },
    { key: 'motherboard', label: 'Motherboard',      category: 'Motherboards'     },
    { key: 'gpu',         label: 'Tarjeta de video', category: 'GPU'              },
    { key: 'cooling',     label: 'Refrigeración',    category: 'Coolers'          },
    { key: 'psu',         label: 'Fuente de poder',  category: 'Fuentes'          },
  ];

  const issues = [];
  let hasErrors = false;
  let hasWarnings = false;

  for (const { key, label, category } of COMPONENT_CATEGORIES) {
    const product = pcBuild[key];
    if (!product) continue;

    // Re-evaluar cada componente contra el resto del build
    const tempBuild = { ...pcBuild, [key]: null };
    const { messages } = checkCompatibility(tempBuild, product, category);

    for (const msg of messages) {
      if (msg.type === 'error')   hasErrors   = true;
      if (msg.type === 'warning') hasWarnings = true;
      if (msg.type === 'error' || msg.type === 'warning') {
        issues.push({ component: label, message: msg });
      }
    }
  }

  // Validar también los arreglos (RAM, Storage)
  for (const ram of (pcBuild.ram ?? [])) {
    const tempBuild = { ...pcBuild, ram: pcBuild.ram.filter(r => r !== ram) };
    const { messages } = checkCompatibility(tempBuild, ram, 'Memorias RAM');
    for (const msg of messages) {
      if (msg.type === 'error')   hasErrors   = true;
      if (msg.type === 'warning') hasWarnings = true;
      if (msg.type === 'error' || msg.type === 'warning') {
        issues.push({ component: 'Memoria RAM', message: msg });
      }
    }
  }

  return {
    overallStatus: hasErrors ? 'errors' : hasWarnings ? 'warnings' : 'ok',
    issues,
    totalPower: calculateTotalPowerConsumption(pcBuild),
  };
}