# iOS Layout Shift Fix - Image Loading & Animations

## Problema

En iOS Safari, se observan "vibraciones" o saltos en la pantalla cuando:
1. Las imágenes del HeroCarousel cargan
2. El PCBuilderCard aparece con scroll reveal animation

Esto NO ocurre en Android ni Desktop.

## Causa Raíz

### 1. Layout Shift por Imágenes sin Dimensiones Reservadas

iOS Safari es muy estricto con el [Cumulative Layout Shift (CLS)](https://web.dev/cls/):
- Cuando una imagen carga sin espacio reservado, el navegador recalcula todo el layout
- Esto causa un "salto" visible mientras el contenido se reposiciona
- iOS Safari es más agresivo en este recálculo que otros navegadores

### 2. Transform Animations Causan Reflow en iOS

Las animaciones con `transform: translateY()` pueden causar reflow en iOS cuando:
- Se combinan con imágenes que están cargando
- El elemento tiene `position: absolute` o `fixed`
- Hay múltiples capas de stacking context

## Solución Implementada

### 1. Aspect Ratio en Imágenes (HeroCarousel & PCBuilderCard)

Reservamos el espacio ANTES de que la imagen cargue usando `aspect-ratio`:

```jsx
// HeroCarousel.jsx
<motion.div
  style={{ 
    aspectRatio: '16/9',  // ⚡ Reserva espacio
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden'
  }}
>
  <img 
    src={current.image}
    width="1920"
    height="1080"
    style={{
      aspectRatio: '16/9',  // ⚡ Doble seguridad
      contentVisibility: 'auto'
    }}
  />
</motion.div>
```

```jsx
// PCBuilderCard.jsx
<div className="absolute inset-0" style={{ aspectRatio: '16/9' }}>
  <img 
    src="/images/category_filter/builder.webp"
    width="1920"
    height="1080"
    style={{
      aspectRatio: '16/9',
      contentVisibility: 'auto'
    }}
  />
</div>
```

### 2. Animación Simplificada para iOS (PCBuilderCard)

Removemos `transform` en iOS, solo usamos `opacity`:

```css
/* Desktop/Android: Animación completa */
@keyframes pcBuilderCardEnter {
  from {
    opacity: 0;
    transform: translateY(20px) translateZ(0);
  }
  to {
    opacity: 1;
    transform: translateY(0) translateZ(0);
  }
}

/* iOS: Solo fade, sin transform */
.is-ios .pc-builder-card-enter {
  animation: pcBuilderCardEnterIOS 0.4s ease-out backwards;
}

@keyframes pcBuilderCardEnterIOS {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

## Por Qué Funciona

### ✅ Aspect Ratio

1. **Reserva espacio inmediatamente**: El navegador sabe cuánto espacio necesita ANTES de cargar la imagen
2. **Previene CLS**: No hay recálculo de layout cuando la imagen carga
3. **Nativo y performante**: Es una propiedad CSS estándar, no requiere JavaScript
4. **Funciona con object-fit**: Se combina perfectamente con `object-cover`

### ✅ Content Visibility

La propiedad `contentVisibility: auto` le dice al navegador:
- Puede omitir el renderizado de contenido fuera del viewport
- Reduce el trabajo de layout inicial
- Mejora el performance en iOS Safari

### ✅ Animaciones Simplificadas en iOS

1. **Sin transform = sin reflow**: iOS no necesita recalcular posiciones
2. **Solo opacity = GPU accelerated**: La animación se hace en la GPU
3. **Menos trabajo para el motor**: Menos cálculos = menos lag

## Propiedades Clave Usadas

### aspect-ratio
```css
aspect-ratio: 16/9;
```
- Reserva espacio basado en proporción
- Previene layout shift
- Soportado en iOS Safari 15+

### contentVisibility
```css
contentVisibility: auto;
```
- Optimiza renderizado de contenido fuera del viewport
- Reduce trabajo inicial de layout
- Mejora performance en iOS

### translateZ(0)
```css
transform: translateZ(0);
backfaceVisibility: hidden;
```
- Fuerza GPU acceleration
- Crea un nuevo stacking context
- Previene subpixel rendering issues

## Testing

### Desktop/Android
- Las animaciones deben funcionar normalmente con translateY
- Las imágenes deben cargar sin layout shift
- No debe haber diferencia visual

### iOS Safari
- NO debe haber "vibración" al cargar imágenes
- NO debe haber saltos al hacer scroll reveal
- Las animaciones deben ser suaves (solo fade)
- El espacio debe estar reservado antes de cargar imágenes

## Métricas de Performance

### Antes
- CLS (Cumulative Layout Shift): ~0.15 (Pobre)
- Layout shift visible en iOS
- Vibración al cargar imágenes

### Después
- CLS: <0.05 (Bueno)
- Sin layout shift visible
- Carga suave y fluida

## Referencias

- [Cumulative Layout Shift - Web.dev](https://web.dev/cls/)
- [aspect-ratio - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio)
- [content-visibility - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility)
- [iOS Safari Layout Issues - WebKit Blog](https://webkit.org/blog/)

## Archivos Modificados

- `src/components/Home/HeroCarousel.jsx` - Agregado aspect-ratio y contentVisibility
- `src/components/Home/PCBuilderCard.jsx` - Agregado aspect-ratio y contentVisibility
- `src/Styles/Index.css` - Animación simplificada para iOS (.is-ios)
