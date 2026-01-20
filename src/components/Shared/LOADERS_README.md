# 🎨 Sistema de Loaders Modernos

Sistema completo de componentes de carga modernos y atractivos para reemplazar los spinners antiguos.

## 📦 Componentes Disponibles

### 1. ModernLoader (Pantalla Completa)
Loader para páginas completas, ideal para lazy loading y Suspense.

```jsx
import ModernLoader from './components/Shared/ModernLoader';

// Uso básico
<ModernLoader />

// Con opciones personalizadas
<ModernLoader 
  variant="orbit"    // 'orbit', 'pulse', 'dots', 'bars'
  message="Cargando productos" 
  size="lg"          // 'sm', 'md', 'lg'
/>
```

### 2. InlineLoader (Componentes)
Loader compacto para usar dentro de componentes, cards, botones, etc.

```jsx
import InlineLoader from './components/Shared/InlineLoader';

// Uso básico
<InlineLoader />

// Con opciones
<InlineLoader 
  variant="orbit"    // 'spinner', 'orbit', 'pulse', 'dots'
  size="md"          // 'xs', 'sm', 'md', 'lg'
  className="my-4"
/>
```

## 🎭 Variantes de Animación

### ModernLoader (Pantalla Completa)

#### 1. **orbit** (Recomendada) ⭐
Animación de órbita con partículas giratorias. La más moderna y atractiva.
```jsx
<ModernLoader variant="orbit" message="Cargando" size="lg" />
```

#### 2. **pulse**
Anillos pulsantes concéntricos con efecto de onda.
```jsx
<ModernLoader variant="pulse" message="Sincronizando" size="lg" />
```

#### 3. **dots**
Puntos que rebotan de forma secuencial.
```jsx
<ModernLoader variant="dots" message="Procesando" size="md" />
```

#### 4. **bars**
Barras de altura variable con animación de pulso.
```jsx
<ModernLoader variant="bars" message="Cargando datos" size="md" />
```

### InlineLoader (Componentes)

#### 1. **orbit** (Recomendada) ⭐
Versión compacta de la órbita para espacios reducidos.
```jsx
<InlineLoader variant="orbit" size="md" />
```

#### 2. **spinner**
Spinner circular clásico pero moderno.
```jsx
<InlineLoader variant="spinner" size="sm" />
```

#### 3. **pulse**
Pulso concéntrico compacto.
```jsx
<InlineLoader variant="pulse" size="md" />
```

#### 4. **dots**
Tres puntos animados horizontalmente.
```jsx
<InlineLoader variant="dots" size="sm" />
```

## 📏 Tamaños Disponibles

### ModernLoader
- `sm`: 32px (8x8)
- `md`: 64px (16x16) - Default
- `lg`: 96px (24x24)

### InlineLoader
- `xs`: 16px (4x4)
- `sm`: 24px (6x6)
- `md`: 40px (10x10) - Default
- `lg`: 64px (16x16)

## 💡 Casos de Uso

### 1. Lazy Loading de Páginas (App.jsx)
```jsx
import { lazy, Suspense } from 'react';
import ModernLoader from './components/Shared/ModernLoader';

const Home = lazy(() => import('./pages/Home'));

const PageLoader = () => (
  <ModernLoader variant="orbit" message="Cargando" size="lg" />
);

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Home />
    </Suspense>
  );
}
```

### 2. Carga de Datos en Componentes
```jsx
import InlineLoader from './components/Shared/InlineLoader';

function ProductList({ isLoading, products }) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <InlineLoader variant="orbit" size="lg" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => <ProductCard key={product.id} {...product} />)}
    </div>
  );
}
```

### 3. Botones con Estado de Carga
```jsx
import InlineLoader from './components/Shared/InlineLoader';

function SubmitButton({ isLoading, onClick }) {
  return (
    <button 
      onClick={onClick}
      disabled={isLoading}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg"
    >
      {isLoading ? (
        <InlineLoader variant="spinner" size="xs" />
      ) : (
        'Enviar'
      )}
    </button>
  );
}
```

### 4. Cards con Carga
```jsx
import InlineLoader from './components/Shared/InlineLoader';

function ProductCard({ product, isLoading }) {
  return (
    <div className="border rounded-lg p-4">
      {isLoading ? (
        <div className="h-48 flex items-center justify-center">
          <InlineLoader variant="pulse" size="md" />
        </div>
      ) : (
        <>
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.price}</p>
        </>
      )}
    </div>
  );
}
```

### 5. Secciones de Página
```jsx
import InlineLoader from './components/Shared/InlineLoader';

function DashboardSection({ data, isLoading }) {
  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Estadísticas</h2>
      
      {isLoading ? (
        <div className="py-12">
          <InlineLoader variant="orbit" size="lg" />
          <p className="text-center text-gray-600 mt-4">
            Cargando estadísticas...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {/* Contenido */}
        </div>
      )}
    </section>
  );
}
```

## 🎨 Personalización

### Colores
Los loaders usan gradientes de Tailwind CSS. Para cambiar los colores, modifica las clases:

```jsx
// De:
from-blue-500 to-purple-600

// A:
from-green-500 to-teal-600
```

### Velocidad de Animación
Ajusta la duración en los estilos inline:

```jsx
style={{
  animationDuration: '2s',  // Más lento
  animationDuration: '0.8s' // Más rápido
}}
```

## ✅ Mejores Prácticas

1. **Usa ModernLoader para páginas completas** (lazy loading, Suspense)
2. **Usa InlineLoader para componentes y secciones**
3. **Siempre incluye mensajes descriptivos** para mejor UX
4. **Elige la variante "orbit"** para un look más moderno
5. **Ajusta el tamaño según el contexto**:
   - `xs/sm`: Botones, iconos
   - `md`: Cards, secciones pequeñas
   - `lg`: Páginas completas, secciones grandes

## 🚀 Migración desde el Loader Antiguo

### Antes:
```jsx
<div className="text-center">
  <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
  <p className="text-gray-600 font-medium">Cargando...</p>
</div>
```

### Después:
```jsx
<ModernLoader variant="orbit" message="Cargando" size="lg" />
```

O para uso inline:
```jsx
<InlineLoader variant="orbit" size="md" />
```

## 📱 Responsive

Ambos componentes son completamente responsive y se adaptan a todos los tamaños de pantalla.

## ♿ Accesibilidad

Los loaders incluyen:
- Animaciones suaves que respetan `prefers-reduced-motion`
- Mensajes descriptivos para lectores de pantalla
- Colores con buen contraste

## 🎯 Recomendaciones por Contexto

| Contexto | Componente | Variante | Tamaño |
|----------|-----------|----------|--------|
| Lazy loading páginas | ModernLoader | orbit | lg |
| Carga de datos | InlineLoader | orbit/pulse | md |
| Botones | InlineLoader | spinner | xs/sm |
| Cards | InlineLoader | pulse | md |
| Modales | ModernLoader | orbit | md |
| Secciones | InlineLoader | orbit | lg |

---

**Creado para mejorar la experiencia de usuario con animaciones modernas y atractivas** ✨
