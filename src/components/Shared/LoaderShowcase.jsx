/**
 * COMPONENTE DEMO - Muestra todas las variantes de loaders
 * Puedes usar este componente temporalmente para ver todas las opciones
 * o como referencia para elegir el loader que más te guste
 */

import { useState } from 'react';
import ModernLoader from './ModernLoader';
import InlineLoader from './InlineLoader';

const LoaderShowcase = () => {
  const [selectedVariant, setSelectedVariant] = useState('orbit');
  const [selectedSize, setSelectedSize] = useState('md');
  const [showFullScreen, setShowFullScreen] = useState(false);

  if (showFullScreen) {
    return (
      <div className="relative">
        <ModernLoader 
          variant={selectedVariant} 
          message="Cargando contenido" 
          size={selectedSize} 
        />
        <button
          onClick={() => setShowFullScreen(false)}
          className="absolute top-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors z-50"
        >
          Cerrar Vista Completa
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎨 Sistema de Loaders Modernos
          </h1>
          <p className="text-gray-600 text-lg">
            Explora todas las variantes y encuentra el loader perfecto para tu aplicación
          </p>
        </div>

        {/* Controles */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Selector de Variante */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Variante de Animación
              </label>
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="orbit">Orbit (Recomendada)</option>
                <option value="pulse">Pulse</option>
                <option value="dots">Dots</option>
                <option value="bars">Bars</option>
                <option value="spinner">Spinner</option>
              </select>
            </div>

            {/* Selector de Tamaño */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tamaño
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="xs">Extra Small (xs)</option>
                <option value="sm">Small (sm)</option>
                <option value="md">Medium (md)</option>
                <option value="lg">Large (lg)</option>
              </select>
            </div>

            {/* Botón Vista Completa */}
            <div className="flex items-end">
              <button
                onClick={() => setShowFullScreen(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-semibold"
              >
                Ver en Pantalla Completa
              </button>
            </div>
          </div>
        </div>

        {/* Preview Actual */}
        <div className="bg-white rounded-xl shadow-lg p-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Vista Previa Actual
          </h2>
          <div className="flex justify-center items-center min-h-[200px] bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg">
            <InlineLoader variant={selectedVariant} size={selectedSize} />
          </div>
          <div className="mt-6 text-center">
            <code className="bg-gray-100 px-4 py-2 rounded-lg text-sm">
              {`<InlineLoader variant="${selectedVariant}" size="${selectedSize}" />`}
            </code>
          </div>
        </div>

        {/* Grid de Todas las Variantes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Orbit */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
              Orbit ⭐
            </h3>
            <div className="flex justify-center items-center h-32 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg mb-4">
              <InlineLoader variant="orbit" size="md" />
            </div>
            <p className="text-sm text-gray-600 text-center">
              Moderna y atractiva. Ideal para páginas principales.
            </p>
          </div>

          {/* Pulse */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
              Pulse
            </h3>
            <div className="flex justify-center items-center h-32 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg mb-4">
              <InlineLoader variant="pulse" size="md" />
            </div>
            <p className="text-sm text-gray-600 text-center">
              Suave y elegante. Perfecta para secciones.
            </p>
          </div>

          {/* Dots */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
              Dots
            </h3>
            <div className="flex justify-center items-center h-32 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg mb-4">
              <InlineLoader variant="dots" size="md" />
            </div>
            <p className="text-sm text-gray-600 text-center">
              Simple y efectiva. Ideal para espacios pequeños.
            </p>
          </div>

          {/* Spinner */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
              Spinner
            </h3>
            <div className="flex justify-center items-center h-32 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg mb-4">
              <InlineLoader variant="spinner" size="md" />
            </div>
            <p className="text-sm text-gray-600 text-center">
              Clásica pero moderna. Para botones y acciones.
            </p>
          </div>
        </div>

        {/* Ejemplos de Tamaños */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Comparación de Tamaños
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700 mb-4">Extra Small</p>
              <div className="flex justify-center items-center h-24 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg">
                <InlineLoader variant="orbit" size="xs" />
              </div>
              <code className="text-xs text-gray-500 mt-2 block">size="xs"</code>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700 mb-4">Small</p>
              <div className="flex justify-center items-center h-24 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg">
                <InlineLoader variant="orbit" size="sm" />
              </div>
              <code className="text-xs text-gray-500 mt-2 block">size="sm"</code>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700 mb-4">Medium</p>
              <div className="flex justify-center items-center h-24 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg">
                <InlineLoader variant="orbit" size="md" />
              </div>
              <code className="text-xs text-gray-500 mt-2 block">size="md"</code>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700 mb-4">Large</p>
              <div className="flex justify-center items-center h-24 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg">
                <InlineLoader variant="orbit" size="lg" />
              </div>
              <code className="text-xs text-gray-500 mt-2 block">size="lg"</code>
            </div>
          </div>
        </div>

        {/* Casos de Uso */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            💡 Casos de Uso Recomendados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-lg mb-2">🌐 Páginas Completas</h3>
              <p className="text-gray-600 mb-3">Lazy loading, Suspense</p>
              <code className="text-xs bg-gray-100 px-3 py-1 rounded block">
                ModernLoader variant="orbit" size="lg"
              </code>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-lg mb-2">📦 Cards y Secciones</h3>
              <p className="text-gray-600 mb-3">Carga de contenido</p>
              <code className="text-xs bg-gray-100 px-3 py-1 rounded block">
                InlineLoader variant="pulse" size="md"
              </code>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-lg mb-2">🔘 Botones</h3>
              <p className="text-gray-600 mb-3">Estados de carga</p>
              <code className="text-xs bg-gray-100 px-3 py-1 rounded block">
                InlineLoader variant="spinner" size="xs"
              </code>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-lg mb-2">📊 Datos y Tablas</h3>
              <p className="text-gray-600 mb-3">Carga de información</p>
              <code className="text-xs bg-gray-100 px-3 py-1 rounded block">
                InlineLoader variant="orbit" size="md"
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoaderShowcase;
