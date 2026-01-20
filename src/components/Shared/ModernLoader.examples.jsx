/**
 * EJEMPLOS DE USO DEL MODERNLOADER
 * 
 * Este archivo muestra diferentes formas de usar el componente ModernLoader
 * en tu aplicación.
 */

import ModernLoader from './ModernLoader';

// ============================================
// EJEMPLO 1: Loader básico con órbita (default)
// ============================================
export const BasicOrbitLoader = () => (
  <ModernLoader />
);

// ============================================
// EJEMPLO 2: Loader con mensaje personalizado
// ============================================
export const LoaderWithMessage = () => (
  <ModernLoader 
    variant="orbit" 
    message="Cargando productos" 
    size="lg" 
  />
);

// ============================================
// EJEMPLO 3: Diferentes variantes de animación
// ============================================

// Variante de puntos animados
export const DotsLoader = () => (
  <ModernLoader 
    variant="dots" 
    message="Procesando" 
    size="md" 
  />
);

// Variante de pulso con anillos
export const PulseLoader = () => (
  <ModernLoader 
    variant="pulse" 
    message="Sincronizando" 
    size="lg" 
  />
);

// Variante de barras
export const BarsLoader = () => (
  <ModernLoader 
    variant="bars" 
    message="Cargando datos" 
    size="md" 
  />
);

// Variante de órbita (recomendada)
export const OrbitLoader = () => (
  <ModernLoader 
    variant="orbit" 
    message="Preparando contenido" 
    size="lg" 
  />
);

// ============================================
// EJEMPLO 4: Diferentes tamaños
// ============================================
export const SmallLoader = () => (
  <ModernLoader variant="orbit" size="sm" />
);

export const MediumLoader = () => (
  <ModernLoader variant="orbit" size="md" />
);

export const LargeLoader = () => (
  <ModernLoader variant="orbit" size="lg" />
);

// ============================================
// EJEMPLO 5: Uso en Suspense (como en App.jsx)
// ============================================
import { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./SomeComponent'));

export const SuspenseExample = () => (
  <Suspense fallback={<ModernLoader variant="orbit" message="Cargando" size="lg" />}>
    <LazyComponent />
  </Suspense>
);

// ============================================
// EJEMPLO 6: Uso condicional en componentes
// ============================================
export const ConditionalLoader = ({ isLoading, data }) => {
  if (isLoading) {
    return <ModernLoader variant="pulse" message="Cargando datos" size="md" />;
  }

  return (
    <div>
      {/* Tu contenido aquí */}
      {data && <p>{data}</p>}
    </div>
  );
};

// ============================================
// EJEMPLO 7: Loader inline (sin pantalla completa)
// ============================================
// Para crear un loader más pequeño que no ocupe toda la pantalla,
// puedes extraer solo la parte de animación:

export const InlineLoader = ({ variant = 'orbit' }) => {
  const OrbitAnimation = () => (
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-pulse" />
      </div>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute inset-0 animate-spin"
          style={{
            animationDuration: `${2 + i * 0.5}s`,
            animationDelay: `${i * 0.2}s`
          }}
        >
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234))',
              opacity: 0.8 - i * 0.2,
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
            }}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex items-center justify-center p-4">
      <OrbitAnimation />
    </div>
  );
};

// ============================================
// RECOMENDACIONES DE USO
// ============================================
/*
1. Para páginas completas (lazy loading): usa variant="orbit" con size="lg"
2. Para secciones o componentes: usa variant="pulse" o "dots" con size="md"
3. Para elementos pequeños: usa variant="dots" con size="sm"
4. Siempre incluye un mensaje descriptivo para mejor UX
5. La variante "orbit" es la más moderna y atractiva

VARIANTES DISPONIBLES:
- "orbit": Animación de órbita con partículas giratorias (RECOMENDADA)
- "pulse": Anillos pulsantes concéntricos
- "dots": Puntos que rebotan
- "bars": Barras de altura variable

TAMAÑOS DISPONIBLES:
- "sm": 8x8 (32px)
- "md": 16x16 (64px)
- "lg": 24x24 (96px)
*/
