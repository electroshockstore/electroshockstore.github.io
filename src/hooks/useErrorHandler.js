import { useEffect, useState } from 'react';

export const useErrorHandler = () => {
  const [networkError, setNetworkError] = useState(null);
  const [resourceError, setResourceError] = useState(null);

  // Auto-clear errors after 8 seconds
  useEffect(() => {
    if (networkError) {
      const timer = setTimeout(() => {
        setNetworkError(null);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [networkError]);

  useEffect(() => {
    if (resourceError) {
      const timer = setTimeout(() => {
        setResourceError(null);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [resourceError]);

  useEffect(() => {
    // Solo manejar errores de conexión críticos
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

    // Solo manejar errores de recursos críticos (CSS/JS propios)
    const handleResourceError = (event) => {
      const target = event.target || event.srcElement;
      
      // Solo mostrar errores de recursos críticos propios
      if (target.tagName === 'LINK' && target.rel === 'stylesheet' && 
          target.href && (target.href.includes(window.location.hostname) || target.href.startsWith('/'))) {
        setResourceError({
          type: 'css',
          message: 'Error al cargar estilos',
          action: 'Recarga la página para intentar nuevamente'
        });
      } else if (target.tagName === 'SCRIPT' && 
                 target.src && (target.src.includes(window.location.hostname) || target.src.startsWith('/')) &&
                 !target.src.includes('google') && !target.src.includes('analytics')) {
        setResourceError({
          type: 'js',
          message: 'Error al cargar la aplicación',
          action: 'Recarga la página para intentar nuevamente'
        });
      }
      // Ignorar todos los demás errores (imágenes, servicios externos, etc.)
    };

    // Event listeners solo para errores críticos
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('error', handleResourceError, true);

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('error', handleResourceError, true);
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