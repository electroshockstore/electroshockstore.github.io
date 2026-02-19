# Sistema de Manejo de Errores

Sistema profesional y SOLID para manejo de errores en la aplicación.

## 📁 Estructura

```
src/utils/errors/
├── AppError.js          # Clases de error personalizadas
├── errorHandler.js      # Logger y handler centralizado
├── index.js            # Exports
└── README.md           # Esta documentación
```

## 🎯 Características

- ✅ Clases de error tipadas y específicas
- ✅ Logging centralizado con contexto
- ✅ Integración con servicios externos (Sentry)
- ✅ Mensajes amigables para usuarios
- ✅ Stack traces en desarrollo
- ✅ Retry logic automático
- ✅ Error Boundaries para React

## 📚 Uso

### 1. Lanzar errores específicos

```javascript
import { ValidationError, NetworkError } from '@/utils/errors';

// Error de validación
if (!email.includes('@')) {
  throw new ValidationError('Email inválido', 'email');
}

// Error de red
if (!response.ok) {
  throw new NetworkError('Error al conectar con el servidor');
}
```

### 2. Manejar errores con el handler

```javascript
import { handleError } from '@/utils/errors';

try {
  await fetchData();
} catch (error) {
  const errorInfo = handleError(error, {
    operation: 'fetchData',
    userId: currentUser.id
  });
  
  // errorInfo contiene:
  // - message: mensaje amigable para el usuario
  // - code: código del error
  // - canRetry: si se puede reintentar
  // - timestamp: cuándo ocurrió
  
  showNotification(errorInfo.message);
}
```

### 3. Wrapper para funciones async

```javascript
import { withErrorHandling } from '@/utils/errors';

const fetchProducts = withErrorHandling(
  async (categoryId) => {
    const response = await fetch(`/api/products/${categoryId}`);
    return response.json();
  },
  { operation: 'fetchProducts' }
);

// Uso
try {
  const products = await fetchProducts(123);
} catch (error) {
  // El error ya fue loggeado automáticamente
  showError(error.message);
}
```

### 4. Logging manual

```javascript
import { errorLogger } from '@/utils/errors';

// Error
errorLogger.log(error, { userId, action: 'checkout' });

// Warning
errorLogger.warn('Stock bajo', { productId, stock: 2 });

// Info
errorLogger.info('Usuario inició sesión', { userId });
```

## 🔧 Clases de Error Disponibles

### AppError (Base)
Error base para todos los errores de la aplicación.

```javascript
new AppError(message, code, isOperational, statusCode)
```

### NetworkError
Errores de red o HTTP.

```javascript
new NetworkError('Error al conectar')
```

### ValidationError
Errores de validación de datos.

```javascript
new ValidationError('Email inválido', 'email')
```

### NotFoundError
Recursos no encontrados.

```javascript
new NotFoundError('Producto', productId)
```

### TimeoutError
Operaciones que exceden el tiempo límite.

```javascript
new TimeoutError('Fetch de productos', 5000)
```

### DataError
Errores en la estructura o formato de datos.

```javascript
new DataError('JSON inválido', rawData)
```

## 🎨 Error Boundary

Envuelve componentes para capturar errores de renderizado:

```jsx
import ErrorBoundary from '@/components/ErrorBoundary';

<ErrorBoundary name="ProductList">
  <ProductList products={products} />
</ErrorBoundary>
```

Con fallback personalizado:

```jsx
<ErrorBoundary
  fallback={({ error, resetError }) => (
    <div>
      <h1>Error: {error.message}</h1>
      <button onClick={resetError}>Reintentar</button>
    </div>
  )}
>
  <MyComponent />
</ErrorBoundary>
```

## 🔄 Fetch con Retry

```javascript
import { fetchWithRetry, fetchJSON } from '@/utils/api/fetchWithRetry';

// Fetch básico con retry
const response = await fetchWithRetry('/api/products', {}, {
  retries: 3,
  timeout: 5000,
  retryDelay: 1000
});

// Fetch JSON con validación
const data = await fetchJSON('/api/products');
```

## 📊 Integración con Sentry

El sistema está preparado para integrarse con Sentry:

```javascript
// En tu index.html o App.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
  // ... otras opciones
});

// Los errores se enviarán automáticamente
```

## 🧪 Testing

```javascript
import { AppError, handleError } from '@/utils/errors';

describe('Error Handling', () => {
  it('should log and format errors correctly', () => {
    const error = new AppError('Test error', 'TEST_ERROR');
    const result = handleError(error);
    
    expect(result.code).toBe('TEST_ERROR');
    expect(result.message).toBeDefined();
  });
});
```

## 📝 Best Practices

1. **Usa errores específicos**: Prefiere `ValidationError` sobre `Error` genérico
2. **Agrega contexto**: Siempre pasa contexto relevante al logger
3. **Mensajes amigables**: Los mensajes deben ser comprensibles para usuarios
4. **No silencies errores**: Siempre logea o maneja los errores
5. **Usa Error Boundaries**: Envuelve componentes críticos
6. **Valida datos**: Valida antes de procesar para errores tempranos

## 🚀 Próximos Pasos

- [ ] Agregar métricas de errores (frecuencia, tipos)
- [ ] Dashboard de errores en tiempo real
- [ ] Alertas automáticas para errores críticos
- [ ] Tests de integración completos
