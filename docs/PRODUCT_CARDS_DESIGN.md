# 📦 Diseño de Product Cards - ElectroShock

## 📋 Índice
1. [Visión General](#visión-general)
2. [Tipos de Product Cards](#tipos-de-product-cards)
3. [Especificaciones Técnicas](#especificaciones-técnicas)
4. [Guía de Rediseño](#guía-de-rediseño)

---

## 🎯 Visión General

El sistema de Product Cards de ElectroShock está diseñado con **4 variantes especializadas** para diferentes contextos de uso, cada una optimizada para su propósito específico.

### Principios de Diseño
- ✅ **Responsive-first**: Mobile → Tablet → Desktop
- ✅ **Performance**: Lazy loading, GPU acceleration, memoization
- ✅ **Accesibilidad**: Contraste WCAG AA, estados claros
- ✅ **Consistencia visual**: Sistema de colores y espaciado unificado

---

## 🃏 Tipos de Product Cards

### 1. **ProductCard** (Catálogo Principal)
**Ubicación**: `/categoria/:categorySlug`  
**Archivo**: `src/components/Catalog/ProductCard/index.jsx`

#### Características
- **2 modos de vista**: Grid y List
- **Elementos decorativos**: Círculos con blur, formas geométricas
- **Badges dinámicos**: Stock, DDR4/DDR5, Certificaciones
- **Glow especial**: Para productos destacados (featured)

#### Estructura Visual

```
┌─────────────────────────────────┐
│  ┌─────────────────────────┐   │ ← Imagen (aspect-square)
│  │                         │   │   + Glow decorativo (featured)
│  │      PRODUCTO           │   │   + Círculos blur (azul/púrpura)
│  │                         │   │
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │ 🏷️ MARCA                │   │ ← Info
│  │ Nombre del Producto     │   │
│  │ [DDR5] [80+ Gold]       │   │ ← Badges
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │ $ 45,000                │   │ ← Precio
│  │ Contado                 │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

#### Responsive Breakpoints
```css
/* Mobile */
p-2, text-xs, rounded-xl

/* Desktop (sm:) */
p-5, text-base, rounded-2xl
```

#### Colores y Efectos
- **Glow inferior**: `from-blue-500/60 via-purple-500/30`
- **Glow lateral izq**: `from-cyan-500/40`
- **Glow lateral der**: `from-orange-500/40`
- **Círculo superior**: `from-blue-400/30 to-cyan-400/20`
- **Círculo inferior**: `from-purple-400/30 to-pink-400/20`

---

### 2. **CompactProductCard** (PC Builder)
**Ubicación**: `/armatupc`  
**Archivo**: `src/components/PCBuilder/CompactProductCard.jsx`

#### Características
- **Sistema de compatibilidad**: Verde/Amarillo/Rojo/Neutral
- **Ultra compacto**: Optimizado para grids de 2-6 columnas
- **Razones de incompatibilidad**: Tooltips informativos
- **Estado seleccionado**: Ring azul + badge

#### Estructura Visual

```
┌──────────────────────────┐
│ [✓ Compatible]          │ ← Badge de estado
│  ┌──────────────────┐   │
│  │                  │   │ ← Imagen compacta
│  │    PRODUCTO      │   │   (aspect-square)
│  │                  │   │
│  └──────────────────┘   │
│  MARCA               │   │ ← Info ultra compacta
│  Nombre Producto     │   │   (text-[10px] mobile)
│  $ 25,000            │   │
│  ┌────────────────┐  │   │
│  │   AGREGAR      │  │   │ ← CTA
│  └────────────────┘  │   │
└──────────────────────────┘
```

#### Sistema de Estados

| Estado | Color | Badge | Borde |
|--------|-------|-------|-------|
| **Neutral** | Gris | Sin validar | `border-gray-200` |
| **Compatible** | Verde | ✓ Compatible | `border-green-400` |
| **Advertencia** | Amarillo | ⚠ Advertencia | `border-yellow-400` |
| **Incompatible** | Rojo | ✗ Incompatible | `border-red-400` |
| **Seleccionado** | Azul | ✓ SELECCIONADO | `border-blue-600 ring-4` |

#### Responsive Grid
```css
/* Mobile: 2 columnas */
grid-cols-2 gap-2

/* Desktop: 4-6 columnas */
lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6
```

---

### 3. **ProductCardMayorista** (Packs de Ahorro)
**Ubicación**: Home + `/categoria/mayorista`  
**Archivo**: `src/components/Home/ProductCardMayorista.jsx`

#### Características
- **Fondo oscuro**: Gradiente `from-[#1a1a2e] via-[#16213e]`
- **Badges flotantes**: Pack quantity + Descuento %
- **Cálculo de ahorro**: Dinámico con precio unitario
- **Borde dorado**: `border-amber-400/50`

#### Estructura Visual

```
┌─────────────────────────────────┐
│ [x5] ────────────── [-25%]     │ ← Badges flotantes
│  ┌─────────────────────────┐   │
│  │                         │   │ ← Imagen con glow
│  │      PRODUCTO           │   │   circular ámbar
│  │                         │   │
│  └─────────────────────────┘   │
│  🏷️ MARCA                      │
│  Nombre del Producto           │
│  [Pack x5]                     │
│  ┌─────────────────────────┐   │
│  │ 🎉 Ahorrás              │   │ ← Box de ahorro
│  │ $ 15,000                │   │   (verde brillante)
│  │ en este pack            │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

#### Colores Característicos
- **Fondo**: `from-[#1a1a2e] via-[#16213e] to-[#0f1419]`
- **Borde**: `border-amber-400/50`
- **Badge Pack**: `from-amber-500 to-orange-600`
- **Badge Descuento**: `from-green-500 to-emerald-600`
- **Box Ahorro**: `from-green-500/20 to-emerald-500/20`
- **Texto Ahorro**: `text-green-400`

---

### 4. **ProductCardMayoristaBlanco** (Catálogo Mayorista)
**Ubicación**: `/categoria/mayorista` (vista catálogo)  
**Archivo**: `src/components/Catalog/ProductCardMayoristaBlanco.jsx`

#### Características
- **Fondo blanco**: Versión clara del card mayorista
- **Misma estructura**: Pero con colores invertidos
- **Integración catálogo**: Se mezcla con ProductCard normal

---

## 🔧 Especificaciones Técnicas

### Performance Optimizations

#### 1. Lazy Loading de Imágenes
```javascript
// Primeros 8 productos: eager
const imageLoading = index < 8 ? "eager" : "lazy";
const imageFetchPriority = index < 8 ? "high" : "low";
```

#### 2. Memoization
```javascript
// Evita re-renders innecesarios
const ProductCard = memo(({ ... }), (prevProps, nextProps) => {
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.product.price === nextProps.product.price &&
    prevProps.product.stock === nextProps.product.stock
  );
});
```

#### 3. GPU Acceleration
```css
transform: translateZ(0);
backface-visibility: hidden;
will-change: transform;
```

### Animaciones

#### Scroll Reveal
```javascript
useScrollReveal({ 
  threshold: 0.1, 
  rootMargin: '50px',
  delay: Math.min(index * 50, 300) // Delay escalonado
});
```

#### Hover Effects
```css
/* Escala suave */
hover:scale-[1.02]
transition-all duration-300

/* Sombras progresivas */
shadow-md hover:shadow-xl
```

---

## 🎨 Sistema de Colores

### Gradientes Principales

#### Azul/Cyan (Tecnología)
```css
from-blue-400/30 to-cyan-400/20
from-blue-500/60 via-purple-500/30
```

#### Púrpura/Rosa (Premium)
```css
from-purple-400/30 to-pink-400/20
from-purple-600 to-pink-600
```

#### Ámbar/Naranja (Ahorro)
```css
from-amber-500 to-orange-600
from-green-500 to-emerald-600
```

### Estados de Stock

| Estado | Color | Badge |
|--------|-------|-------|
| Disponible | Verde | `text-emerald-700 bg-emerald-50` |
| Últimas unidades | Naranja | `text-orange-600 bg-orange-50` |
| Sin stock | Rojo | `text-red-600 bg-red-50` |

---

## 📐 Sistema de Espaciado

### Padding Responsive
```css
/* Mobile → Desktop */
p-2 sm:p-5
p-1.5 lg:p-2 xl:p-2.5
px-1.5 py-0.5 sm:px-3 sm:py-1.5
```

### Gap Responsive
```css
gap-2 sm:gap-4
gap-1 sm:gap-3
gap-0.5 lg:gap-1
```

### Border Radius
```css
/* Mobile → Desktop */
rounded-lg sm:rounded-xl
rounded-xl sm:rounded-2xl
rounded-lg sm:rounded-3xl
```

---

## 🎯 Guía de Rediseño

### Consideraciones Clave

#### 1. **Mantener Performance**
- ✅ Lazy loading para imágenes
- ✅ Memoization de componentes
- ✅ GPU acceleration en animaciones
- ❌ Evitar `animate-pulse` en múltiples elementos
- ❌ Evitar blur excesivo (max `blur-2xl`)

#### 2. **Responsive Design**
- ✅ Mobile-first approach
- ✅ Breakpoints: `sm:` (640px), `lg:` (1024px), `xl:` (1280px)
- ✅ Tamaños de texto escalables: `text-[10px] lg:text-xs xl:text-sm`
- ✅ Padding/gap progresivo

#### 3. **Accesibilidad**
- ✅ Contraste mínimo 4.5:1 (WCAG AA)
- ✅ Estados hover/focus claros
- ✅ Textos alternativos en imágenes
- ✅ Tamaños de toque mínimo 44x44px

#### 4. **Consistencia Visual**
- ✅ Usar clases CSS reutilizables (ver `src/Styles/Index.css`)
- ✅ Sistema de colores unificado
- ✅ Espaciado consistente
- ✅ Animaciones coherentes

### Áreas de Mejora Sugeridas

#### 🔴 Crítico
1. **Unificar estilos inline**: Migrar a clases CSS reutilizables
2. **Optimizar imágenes**: WebP + lazy loading + srcset
3. **Reducir complejidad**: Simplificar estructura DOM

#### 🟡 Medio
1. **Mejorar contraste**: Algunos textos pequeños en mobile
2. **Skeleton loading**: Mientras cargan las imágenes
3. **Animaciones más suaves**: Reducir duración a 200ms

#### 🟢 Bajo
1. **Dark mode**: Variantes oscuras de los cards
2. **Micro-interacciones**: Feedback táctil mejorado
3. **Variantes adicionales**: Cards para ofertas especiales

---

## 📊 Métricas de Performance

### Tamaños de Componente
- **ProductCard**: ~8KB (minified)
- **CompactProductCard**: ~6KB (minified)
- **ProductCardMayorista**: ~4KB (minified)

### Render Time (promedio)
- **Primera carga**: ~50ms
- **Re-render**: ~10ms (con memoization)
- **Scroll reveal**: ~5ms por card

### Lighthouse Scores (objetivo)
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+

---

## 🔗 Referencias

### Archivos Relacionados
```
src/
├── components/
│   ├── Catalog/
│   │   ├── ProductCard/
│   │   │   ├── index.jsx          # Card principal
│   │   │   ├── ProductImage.jsx   # Componente imagen
│   │   │   ├── ProductInfo.jsx    # Componente info
│   │   │   ├── PriceDisplay.jsx   # Componente precio
│   │   │   ├── StockBadge.jsx     # Badge de stock
│   │   │   └── StockStatus.jsx    # Estado de stock
│   │   ├── ProductCardMayoristaBlanco.jsx
│   │   └── ProductCardWrapper.jsx # Wrapper selector
│   ├── Home/
│   │   └── ProductCardMayorista.jsx
│   └── PCBuilder/
│       └── CompactProductCard.jsx
├── Styles/
│   └── Index.css                  # Clases reutilizables
└── hooks/
    └── useScrollReveal.js         # Hook de animación
```

### Dependencias
- **React**: 18.x
- **Lucide React**: Iconos
- **Tailwind CSS**: 3.x
- **React Router**: Navegación

---

## 📝 Notas Finales

Este documento describe el estado actual del sistema de Product Cards. Para cualquier rediseño:

1. **Consultar este documento** antes de empezar
2. **Mantener la estructura de archivos** existente
3. **Respetar los principios de performance**
4. **Testear en mobile primero**
5. **Validar accesibilidad** con herramientas

---

**Última actualización**: Febrero 2026  
**Versión**: 1.0  
**Autor**: ElectroShock Dev Team
