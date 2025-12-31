/**
 * Utilidades de performance para optimización de React
 */

/**
 * Debounce function para limitar ejecuciones
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function para limitar frecuencia de ejecución
 */
export const throttle = (func, limit = 100) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Lazy load de componentes con retry
 */
export const lazyWithRetry = (componentImport, retries = 3, interval = 1000) => {
  return new Promise((resolve, reject) => {
    componentImport()
      .then(resolve)
      .catch((error) => {
        if (retries === 0) {
          reject(error);
          return;
        }
        
        setTimeout(() => {
          lazyWithRetry(componentImport, retries - 1, interval)
            .then(resolve)
            .catch(reject);
        }, interval);
      });
  });
};

/**
 * Preload de recursos críticos
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Batch de actualizaciones de estado
 */
export const batchUpdates = (updates) => {
  requestAnimationFrame(() => {
    updates.forEach(update => update());
  });
};

/**
 * Memoización simple para funciones costosas
 */
export const memoize = (fn) => {
  const cache = new Map();
  
  return (...args) => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    
    // Limitar tamaño del cache
    if (cache.size > 100) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    return result;
  };
};

/**
 * Detectar si el dispositivo es móvil
 */
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Detectar conexión lenta
 */
export const isSlowConnection = () => {
  if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    return connection?.effectiveType === 'slow-2g' || 
           connection?.effectiveType === '2g' ||
           connection?.saveData === true;
  }
  return false;
};

/**
 * Optimizar imágenes según el dispositivo
 */
export const getOptimizedImageUrl = (url, width = 800) => {
  if (!url) return '';
  
  // Si es una URL de Unsplash, agregar parámetros de optimización
  if (url.includes('unsplash.com')) {
    return `${url}&w=${width}&q=80&fm=webp&fit=crop`;
  }
  
  // Para imágenes locales, retornar tal cual (ya están optimizadas)
  return url;
};

/**
 * Calcular prioridad de carga de recursos
 */
export const getLoadPriority = (isAboveFold, isInteractive) => {
  if (isAboveFold && isInteractive) return 'high';
  if (isAboveFold) return 'medium';
  return 'low';
};
