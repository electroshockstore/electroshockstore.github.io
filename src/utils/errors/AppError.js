/**
 * Custom Error Class - Base para todos los errores de la aplicación
 * Permite categorizar y manejar errores de forma consistente
 */
export class AppError extends Error {
  constructor(message, code = 'UNKNOWN_ERROR', isOperational = true, statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.isOperational = isOperational; // true = error esperado, false = bug
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
    
    // Captura el stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Errores específicos por tipo
 */
export class NetworkError extends AppError {
  constructor(message = 'Error de red', originalError = null) {
    super(message, 'NETWORK_ERROR', true, 503);
    this.originalError = originalError;
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Datos inválidos', field = null) {
    super(message, 'VALIDATION_ERROR', true, 400);
    this.field = field;
  }
}

export class NotFoundError extends AppError {
  constructor(resource = 'Recurso', id = null) {
    super(`${resource} no encontrado`, 'NOT_FOUND', true, 404);
    this.resource = resource;
    this.id = id;
  }
}

export class TimeoutError extends AppError {
  constructor(operation = 'Operación', timeout = 5000) {
    super(`${operation} excedió el tiempo límite (${timeout}ms)`, 'TIMEOUT_ERROR', true, 408);
    this.timeout = timeout;
  }
}

export class DataError extends AppError {
  constructor(message = 'Error en los datos', data = null) {
    super(message, 'DATA_ERROR', true, 422);
    this.data = data;
  }
}
