import { AppError } from './AppError';

/**
 * Error Logger - Sistema centralizado de logging
 * Maneja el registro de errores en desarrollo y producción
 */
class ErrorLogger {
  constructor() {
    this.isDevelopment = import.meta.env.DEV;
    this.isProduction = import.meta.env.PROD;
  }

  /**
   * Log de error con contexto completo
   */
  log(error, context = {}) {
    const errorInfo = this._buildErrorInfo(error, context);
    
    // Log en consola (siempre en desarrollo, solo operacionales en producción)
    if (this.isDevelopment || error.isOperational) {
      this._logToConsole(errorInfo);
    }
    
    // Enviar a servicio externo en producción
    if (this.isProduction) {
      this._sendToExternalService(errorInfo);
    }
    
    return errorInfo;
  }

  /**
   * Log de warning (no crítico)
   */
  warn(message, context = {}) {
    const warnInfo = {
      level: 'warning',
      message,
      context,
      timestamp: new Date().toISOString(),
      url: window.location.href
    };
    
    console.warn('[APP WARNING]', warnInfo);
    
    if (this.isProduction) {
      this._sendToExternalService(warnInfo);
    }
  }

  /**
   * Log de info (tracking general)
   */
  info(message, context = {}) {
    if (this.isDevelopment) {
      console.info('[APP INFO]', { message, context, timestamp: new Date().toISOString() });
    }
  }

  /**
   * Construye objeto de información del error
   */
  _buildErrorInfo(error, context) {
    const isAppError = error instanceof AppError;
    
    return {
      level: 'error',
      message: error.message,
      code: isAppError ? error.code : 'UNKNOWN_ERROR',
      isOperational: isAppError ? error.isOperational : false,
      statusCode: isAppError ? error.statusCode : 500,
      stack: error.stack,
      context: {
        ...context,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        // Datos adicionales si es AppError
        ...(isAppError && error.field && { field: error.field }),
        ...(isAppError && error.resource && { resource: error.resource }),
        ...(isAppError && error.timeout && { timeout: error.timeout })
      }
    };
  }

  /**
   * Log formateado en consola
   */
  _logToConsole(errorInfo) {
    const style = errorInfo.isOperational 
      ? 'color: #f59e0b; font-weight: bold;' 
      : 'color: #ef4444; font-weight: bold;';
    
    console.group(`%c[${errorInfo.isOperational ? 'OPERATIONAL' : 'CRITICAL'} ERROR]`, style);
    console.error('Message:', errorInfo.message);
    console.error('Code:', errorInfo.code);
    console.error('Context:', errorInfo.context);
    if (errorInfo.stack) {
      console.error('Stack:', errorInfo.stack);
    }
    console.groupEnd();
  }

  /**
   * Enviar a servicio externo (Sentry, LogRocket, etc.)
   */
  _sendToExternalService(errorInfo) {
    // Integración con Sentry
    if (window.Sentry) {
      if (errorInfo.level === 'error') {
        window.Sentry.captureException(new Error(errorInfo.message), {
          level: 'error',
          extra: errorInfo.context,
          tags: {
            code: errorInfo.code,
            isOperational: errorInfo.isOperational
          }
        });
      } else if (errorInfo.level === 'warning') {
        window.Sentry.captureMessage(errorInfo.message, {
          level: 'warning',
          extra: errorInfo.context
        });
      }
    }
    
    // Aquí podrías agregar otros servicios como LogRocket, Datadog, etc.
  }
}

// Singleton instance
export const errorLogger = new ErrorLogger();

/**
 * Handler principal de errores
 * Procesa el error y retorna información útil para el usuario
 */
export const handleError = (error, context = {}) => {
  // Log del error
  const errorInfo = errorLogger.log(error, context);
  
  // Retornar mensaje amigable para el usuario
  return {
    message: getUserFriendlyMessage(error),
    code: errorInfo.code,
    canRetry: isRetryable(error),
    timestamp: errorInfo.context.timestamp
  };
};

/**
 * Determina si un error es recuperable con retry
 */
const isRetryable = (error) => {
  if (error instanceof AppError) {
    return ['NETWORK_ERROR', 'TIMEOUT_ERROR'].includes(error.code);
  }
  return false;
};

/**
 * Convierte errores técnicos en mensajes amigables
 */
const getUserFriendlyMessage = (error) => {
  if (error instanceof AppError) {
    // Mensajes personalizados por tipo
    const messages = {
      'NETWORK_ERROR': 'No pudimos conectar con el servidor. Verifica tu conexión a internet.',
      'TIMEOUT_ERROR': 'La operación tardó demasiado. Por favor, intenta nuevamente.',
      'VALIDATION_ERROR': error.message, // Ya es amigable
      'NOT_FOUND': error.message, // Ya es amigable
      'DATA_ERROR': 'Hubo un problema con los datos. Por favor, intenta nuevamente.'
    };
    
    return messages[error.code] || error.message;
  }
  
  // Error genérico
  return 'Ocurrió un error inesperado. Por favor, intenta nuevamente.';
};

/**
 * Wrapper para funciones async con manejo automático de errores
 */
export const withErrorHandling = (fn, context = {}) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      const errorInfo = handleError(error, { ...context, args });
      throw error; // Re-throw para que el componente pueda manejarlo
    }
  };
};

export default errorLogger;
