// Performance tier classification for bottleneck detection
export const performanceTiers = {
  cpu: {
    entry: {
      keywords: ['Ryzen 3', 'Core i3', 'Ryzen 5 4500', 'Ryzen 5 5500'],
      tier: 'entry',
      score: 1
    },
    mid: {
      keywords: ['Ryzen 5 5600', 'Ryzen 5 5700', 'Ryzen 5 7600', 'Ryzen 5 8400F', 'Core i5'],
      tier: 'mid',
      score: 2
    },
    high: {
      keywords: ['Ryzen 7', 'Ryzen 5 8600G', 'Core i7'],
      tier: 'high',
      score: 3
    },
    enthusiast: {
      keywords: ['Ryzen 9', 'Core i9'],
      tier: 'enthusiast',
      score: 4
    }
  },
  gpu: {
    entry: {
      keywords: ['GTX 1650', 'GTX 1050', 'RX 6500', 'RX 550'],
      tier: 'entry',
      score: 1
    },
    mid: {
      keywords: ['RTX 3060', 'RTX 2060', 'RX 6600', 'RX 5600'],
      tier: 'mid',
      score: 2
    },
    high: {
      keywords: ['RTX 4070', 'RTX 3070', 'RX 7800', 'RX 6800'],
      tier: 'high',
      score: 3
    },
    enthusiast: {
      keywords: ['RTX 4090', 'RTX 4080', 'RX 7900', 'RTX 3090'],
      tier: 'enthusiast',
      score: 4
    }
  }
};

/**
 * Get performance tier for a component
 * @param {Object} component - Product object
 * @param {string} category - 'cpu' or 'gpu'
 * @returns {Object} Tier information
 */
export function getPerformanceTier(component, category) {
  if (!component || !category) return { tier: 'unknown', score: 0 };
  
  const tiers = performanceTiers[category.toLowerCase()];
  if (!tiers) return { tier: 'unknown', score: 0 };
  
  const componentName = component.name || component.model || '';
  
  for (const [tierName, tierData] of Object.entries(tiers)) {
    for (const keyword of tierData.keywords) {
      if (componentName.includes(keyword)) {
        return tierData;
      }
    }
  }
  
  return { tier: 'unknown', score: 0 };
}

/**
 * Detect bottleneck between CPU and GPU
 * @param {Object} cpu - CPU product
 * @param {Object} gpu - GPU product
 * @returns {Object} Bottleneck analysis
 */
export function detectBottleneck(cpu, gpu) {
  if (!cpu || !gpu) {
    return { hasBottleneck: false, severity: 'none', message: '' };
  }
  
  const cpuTier = getPerformanceTier(cpu, 'cpu');
  const gpuTier = getPerformanceTier(gpu, 'gpu');
  
  const scoreDiff = Math.abs(cpuTier.score - gpuTier.score);
  
  if (scoreDiff === 0) {
    return { hasBottleneck: false, severity: 'none', message: 'Configuración balanceada' };
  }
  
  if (scoreDiff === 1) {
    return { 
      hasBottleneck: true, 
      severity: 'minor', 
      message: 'Ligero desequilibrio de rendimiento, pero aceptable'
    };
  }
  
  if (cpuTier.score < gpuTier.score) {
    return {
      hasBottleneck: true,
      severity: 'high',
      message: `El ${cpu.name} puede limitar el rendimiento del ${gpu.name}`,
      suggestion: 'Considera un CPU de mayor gama para aprovechar al máximo la GPU'
    };
  }
  
  return {
    hasBottleneck: true,
    severity: 'high',
    message: `El ${gpu.name} no aprovecha todo el potencial del ${cpu.name}`,
    suggestion: 'Considera una GPU de mayor gama o ahorra con un CPU más económico'
  };
}
