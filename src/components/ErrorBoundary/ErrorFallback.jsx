import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

/**
 * UI de fallback cuando ocurre un error
 */
const ErrorFallback = ({ error, errorInfo, resetError, errorCount }) => {
  const isDevelopment = import.meta.env.DEV;
  const hasRepeatedErrors = errorCount > 2;

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <AlertTriangle className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                ¡Ups! Algo salió mal
              </h1>
              <p className="text-white/90 text-sm sm:text-base mt-1">
                Ocurrió un error inesperado en la aplicación
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          {/* Mensaje principal */}
          <div className="mb-6">
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              {hasRepeatedErrors ? (
                <>
                  Parece que el error persiste. Te recomendamos volver al inicio 
                  o contactar con soporte si el problema continúa.
                </>
              ) : (
                <>
                  No te preocupes, nuestro equipo ha sido notificado. 
                  Puedes intentar recargar la página o volver al inicio.
                </>
              )}
            </p>
          </div>

          {/* Detalles del error (solo en desarrollo) */}
          {isDevelopment && error && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-bold text-gray-900 mb-2">
                Detalles del error (solo visible en desarrollo):
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-semibold text-gray-600">Mensaje:</p>
                  <p className="text-xs text-red-600 font-mono break-all">
                    {error.message}
                  </p>
                </div>
                {errorInfo && (
                  <div>
                    <p className="text-xs font-semibold text-gray-600">Stack:</p>
                    <pre className="text-xs text-gray-700 font-mono overflow-x-auto max-h-32 bg-white p-2 rounded border border-gray-200">
                      {errorInfo.componentStack}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-3">
            {!hasRepeatedErrors && (
              <button
                onClick={resetError}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <RefreshCw className="w-5 h-5" />
                Intentar nuevamente
              </button>
            )}
            
            <button
              onClick={handleGoHome}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105"
            >
              <Home className="w-5 h-5" />
              Volver al inicio
            </button>
          </div>

          {/* Info adicional */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Si el problema persiste, contacta con soporte técnico
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
