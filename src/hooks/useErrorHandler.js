import { useEffect, useState } from 'react';

export const useErrorHandler = () => {
  const [networkError, setNetworkError] = useState(null);
  const [resourceError, setResourceError] = useState(null);

  useEffect(() => {
    // Manejar errores de red
    const handleOnline = () => {
      setNetworkError(null);
    };

    const handleOffline = () => {
      setNetworkError({
        type: 'network',
        message: 'Sin conexión a internet',
        action: 'Verifica tu conexión y recarga la página'
      });
    };

    // Manejar errores de recursos (CSS, JS, imágenes)
    const handleResourceError = (event) => {
      const target = event.target || event.srcElement;
      
      if (target.tagName === 'LINK' && target.rel === 'stylesheet') {
        setResourceError({
          type: 'css',
          message: 'Error al cargar estilos',
          action: 'Recarga la página para intentar nuevamente'
        });
      } else if (target.tagName === 'SCRIPT') {
        setResourceError({
          type: 'js',
          message: 'Error al cargar scripts',
          action: 'Recarga la página para intentar nuevamente'
        });
      } else if (target.tagName === 'IMG') {
        // Para imágenes, solo log, no mostrar error al usuario
        console.warn('Error al cargar imagen:', target.src);
      }
    };

    // Manejar errores de fetch/API
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response;
      } catch (error) {
        console.error('Error de fetch:', error);
        setNetworkError({
          type: 'api',
          message: 'Error de conexión',
          action: 'Verifica tu conexión y recarga la página'
        });
        throw error;
      }
    };

    // Event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('error', handleResourceError, true);

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('error', handleResourceError, true);
      window.fetch = originalFetch;
    };
  }, []);

  const clearErrors = () => {
    setNetworkError(null);
    setResourceError(null);
  };

  return {
    networkError,
    resourceError,
    clearErrors,
    hasErrors: networkError || resourceError
  };
};