import { useEffect } from 'react';
import { detectPerformance } from '../constants/platform';

/**
 * Hook para optimizar performance según el hardware del dispositivo
 * Aplica clases CSS que reducen efectos visuales costosos en dispositivos de gama baja
 */
export const usePerformanceOptimization = () => {
  useEffect(() => {
    const performance = detectPerformance();
    const html = document.documentElement;

    // Aplicar clase según tier de performance
    html.classList.remove('perf-low', 'perf-medium', 'perf-high');
    html.classList.add(`perf-${performance.tier}`);

    // Clase legacy para compatibilidad
    if (performance.isLowEnd) {
      html.classList.add('is-low-end');
    } else {
      html.classList.remove('is-low-end');
    }

    // Logging
    console.log(`[Performance] Tier: ${performance.tier} - Optimizations applied`);

    return () => {
      html.classList.remove('perf-low', 'perf-medium', 'perf-high', 'is-low-end');
    };
  }, []);
};

export default usePerformanceOptimization;
