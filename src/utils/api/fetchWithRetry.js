import { NetworkError, TimeoutError } from '../errors/AppError';
import { errorLogger } from '../errors/errorHandler';

/**
 * Configuración por defecto
 */
const DEFAULT_CONFIG = {
  retries: 3,
  timeout: 5000,
  retryDelay: 1000,
  retryOn: [408, 429, 500, 502, 503, 504], // Status codes que permiten retry
  shouldRetry: null // Función custom para determinar si hacer retry
};

/**
 * Fetch con retry automático y timeout
 * @param {string} url - URL a consultar
 * @param {Object} options - Opciones de fetch
 * @param {Object} config - Configuración de retry
 * @returns {Promise<Response>}
 */
export const fetchWithRetry = async (url, options = {}, config = {}) => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const { retries, timeout, retryDelay, retryOn, shouldRetry } = finalConfig;
  
  let lastError;
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Crear AbortController para timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        // Verificar si el status code permite retry
        if (!response.ok) {
          const shouldRetryRequest = shouldRetry 
            ? shouldRetry(response, attempt)
            : retryOn.includes(response.status);
          
          if (shouldRetryRequest && attempt < retries) {
            errorLogger.warn(`Fetch failed with status ${response.status}, retrying...`, {
              url,
              attempt: attempt + 1,
              status: response.status
            });
            
            await delay(retryDelay * (attempt + 1)); // Exponential backoff
            continue;
          }
          
          throw new NetworkError(
            `HTTP ${response.status}: ${response.statusText}`,
            { status: response.status, url }
          );
        }
        
        return response;
        
      } catch (fetchError) {
        clearTimeout(timeoutId);
        
        // Timeout error
        if (fetchError.name === 'AbortError') {
          throw new TimeoutError(`Fetch to ${url}`, timeout);
        }
        
        throw fetchError;
      }
      
    } catch (error) {
      lastError = error;
      
      // Si es el último intento, lanzar el error
      if (attempt === retries) {
        errorLogger.log(error, {
          operation: 'fetchWithRetry',
          url,
          attempts: attempt + 1
        });
        throw error;
      }
      
      // Si es un error de red, reintentar
      if (error instanceof NetworkError || error instanceof TimeoutError) {
        errorLogger.warn(`Fetch attempt ${attempt + 1} failed, retrying...`, {
          url,
          error: error.message
        });
        
        await delay(retryDelay * (attempt + 1));
        continue;
      }
      
      // Otros errores no son recuperables
      throw error;
    }
  }
  
  throw lastError;
};

/**
 * Fetch JSON con retry y validación
 */
export const fetchJSON = async (url, options = {}, config = {}) => {
  try {
    const response = await fetchWithRetry(url, options, config);
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new NetworkError('La respuesta no es JSON válido');
    }
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new NetworkError('Error al parsear JSON', error);
    }
    throw error;
  }
};

/**
 * Delay helper
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch con cache (para datos estáticos)
 */
const cache = new Map();

export const fetchWithCache = async (url, options = {}, config = {}) => {
  const cacheKey = `${url}-${JSON.stringify(options)}`;
  
  // Verificar cache
  if (cache.has(cacheKey)) {
    const cached = cache.get(cacheKey);
    const age = Date.now() - cached.timestamp;
    
    // Cache válido por 5 minutos
    if (age < 5 * 60 * 1000) {
      errorLogger.info('Returning cached data', { url });
      return cached.data;
    }
  }
  
  // Fetch nuevo
  const data = await fetchJSON(url, options, config);
  
  // Guardar en cache
  cache.set(cacheKey, {
    data,
    timestamp: Date.now()
  });
  
  return data;
};

/**
 * Limpiar cache
 */
export const clearCache = () => {
  cache.clear();
};

export default fetchWithRetry;
