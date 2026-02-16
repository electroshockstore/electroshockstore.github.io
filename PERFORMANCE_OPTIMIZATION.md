# Sistema de Optimización Automática de Performance

## Problema Identificado

El sitio se ve con lag en pantallas grandes con hardware débil, pero fluido en pantallas pequeñas.

### Causas:
1. **Más píxeles a renderizar**: 1920x1080 = 2M píxeles vs 375x667 = 250K píxeles (88% menos)
2. **Efectos visuales costosos**: blur(), backdrop-filter, animaciones infinitas
3. **GPUs integradas débiles**: Intel HD Graphics, UHD Graphics
4. **Memoria RAM baja**: ≤4GB
5. **Pocos núcleos de CPU**: ≤2 cores

## Solución Implementada

### 1. Detección Automática de Performance

El sistema detecta 5 factores:
- ✅ Memoria RAM (≤4GB = bajo)
- ✅ Núcleos CPU (≤2 = bajo)
- ✅ Resolución pantalla (>1920x1080 = alto)
- ✅ Device Pixel Ratio (>2 = alto)
- ✅ GPU integrada (Intel HD/UHD = bajo)

### 2. Clasificación en 3 Tiers

**TIER LOW** (3+ factores negativos):
- Blur reducido a 20px máximo
- Backdrop-blur desactivado completamente
- Animaciones infinitas desactivadas
- Mesh container simplificado
- Glows mínimos pero visibles

**TIER MEDIUM** (2 factores negativos):
- Blur reducido a 40px máximo
- Backdrop-blur reducido a 16px
- Algunas animaciones desactivadas
- Mesh container optimizado

**TIER HIGH** (0-1 factores negativos):
- Sin restricciones
- Todos los efectos visuales activos

### 3. Aplicación Automática

```javascript
// En App.jsx
usePerformanceOptimization(); // Se ejecuta al cargar la app
```

El hook:
1. Detecta el hardware
2. Aplica clase CSS: `perf-low`, `perf-medium`, o `perf-high`
3. Los estilos CSS se ajustan automáticamente

### 4. Logging para Debug

Abre la consola del navegador y verás:

```
[Performance Detection] {
  tier: "low",
  factors: {
    lowMemory: true,
    lowCores: false,
    highResolution: true,
    highDPR: false,
    integratedGPU: true
  },
  score: 3,
  resolution: "1920x1080",
  dpr: 1,
  cores: 4,
  memory: 4
}

[Performance] Tier: low - Optimizations applied
```

## Ejemplos de Optimización

### Blur Effects
```css
/* Antes (todos los dispositivos) */
.blur-[120px] { filter: blur(120px); }

/* Después (tier low) */
.perf-low .blur-[120px] { filter: blur(20px) !important; }
```

### Backdrop Blur
```css
/* Antes */
.backdrop-blur-3xl { backdrop-filter: blur(48px); }

/* Después (tier low) */
.perf-low .backdrop-blur-3xl {
  backdrop-filter: none !important;
  background-color: rgba(0, 0, 0, 0.4) !important;
}
```

### Animaciones
```css
/* Desactivadas en tier low */
.perf-low .animate-pulse,
.perf-low .animate-orbit-1,
.perf-low .animate-shimmer {
  animation: none !important;
}
```

## Beneficios

✅ **Automático**: No requiere configuración manual
✅ **Adaptativo**: Se ajusta al hardware real del usuario
✅ **Progresivo**: 3 niveles de optimización
✅ **Transparente**: El usuario no nota la diferencia visual drástica
✅ **Performance**: Reduce lag en pantallas grandes con hardware débil

## Testing

Para probar diferentes tiers, modifica temporalmente en `platform.js`:

```javascript
// Forzar tier low
const score = 5; // En lugar de calcular

// Forzar tier high
const score = 0;
```

## Compatibilidad

- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile (iOS/Android)
- ✅ Tablets
- ✅ Desktop (todas las resoluciones)
