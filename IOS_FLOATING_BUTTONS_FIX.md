# iOS Floating Buttons Fix - Visual Viewport Solution

## Problema

En iOS Safari, los botones flotantes con `position: fixed` se salen del viewport cuando:
- La barra de direcciones se oculta/muestra al hacer scroll
- El teclado virtual aparece
- La interfaz del navegador cambia de tamaño dinámicamente

Esto NO ocurre en Android ni Desktop, donde `position: fixed` funciona perfectamente.

## Causa Raíz

iOS Safari tiene un comportamiento único con `position: fixed`:
- El viewport cambia de tamaño cuando la barra de direcciones se oculta
- Los elementos `fixed` se calculan respecto al viewport inicial, no al dinámico
- Esto causa que los botones queden "fuera" del área visible

## Solución Implementada

### 1. Visual Viewport API (Solo iOS)

Usamos la [Visual Viewport API](https://developer.mozilla.org/en-US/docs/Web/API/Visual_Viewport_API) que es soportada por iOS Safari y nos da el tamaño real del viewport visible:

```javascript
// Detectar iOS
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// Calcular offset dinámico
useEffect(() => {
  if (!isIOS || !window.visualViewport) return;

  const handleViewportChange = () => {
    const offset = window.innerHeight - window.visualViewport.height;
    setViewportOffset(offset);
  };

  window.visualViewport.addEventListener('resize', handleViewportChange);
  window.visualViewport.addEventListener('scroll', handleViewportChange);
  
  handleViewportChange();

  return () => {
    window.visualViewport.removeEventListener('resize', handleViewportChange);
    window.visualViewport.removeEventListener('scroll', handleViewportChange);
  };
}, [isIOS]);
```

### 2. Transform Dinámico (Solo iOS)

Aplicamos un `transform` negativo para compensar el offset:

```javascript
<div 
  className="floating-button-fixed"
  style={isIOS ? {
    transform: `translate3d(0, ${-viewportOffset}px, 0)`
  } : undefined}
>
```

### 3. CSS Base (Todas las plataformas)

El CSS mantiene `position: fixed` para todas las plataformas:

```css
.floating-button-fixed {
  position: fixed !important;
  bottom: calc(1rem + env(safe-area-inset-bottom, 0px)) !important;
  left: calc(1rem + env(safe-area-inset-left, 0px)) !important;
  z-index: 99999 !important;
}

.floating-button-fixed-right {
  position: fixed !important;
  bottom: calc(1rem + env(safe-area-inset-bottom, 0px)) !important;
  right: calc(1rem + env(safe-area-inset-right, 0px)) !important;
  z-index: 99999 !important;
}
```

## Componentes Actualizados

### 1. FloatingChatButton.jsx
- Botón de WhatsApp (izquierda inferior)
- Menú expandible con opciones
- Fix aplicado con visualViewport

### 2. ScrollButton.jsx
- Botón de scroll to top (derecha inferior)
- Aparece después de 300px de scroll
- Fix aplicado con visualViewport

## Por Qué Esta Solución

### ✅ Ventajas

1. **No afecta otras plataformas**: Solo se activa en iOS
2. **Usa APIs nativas**: visualViewport es estándar y performante
3. **Mantiene position fixed**: No cambiamos a absolute que tiene otros problemas
4. **Respeta safe areas**: Usa `env(safe-area-inset-*)` para notch/home indicator
5. **GPU accelerated**: Usa `translate3d` para mejor performance

### ❌ Alternativas descartadas

1. **Position absolute + scrollY**: Requiere recalcular en cada scroll, menos performante
2. **JavaScript scroll listeners**: Causan jank y lag en iOS
3. **CSS dvh units**: No solucionan el problema de fixed positioning
4. **Cambiar a sticky**: No funciona para elementos fuera del flujo del documento

## Testing

### Desktop/Android
- Los botones deben permanecer fijos en sus posiciones
- No debe haber transform aplicado
- Comportamiento idéntico al anterior

### iOS Safari
- Los botones deben permanecer visibles al hacer scroll
- Deben ajustarse cuando la barra de direcciones se oculta/muestra
- Deben respetar el safe area (notch, home indicator)
- No deben salirse del viewport en ningún momento

## Referencias

- [Visual Viewport API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Visual_Viewport_API)
- [iOS Safari position fixed issues - Stack Overflow](https://stackoverflow.com/questions/79753701/ios-26-safari-web-layouts-are-breaking-due-to-fixed-sticky-position-elements-g)
- [CSS Environment Variables - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/env)

## Archivos Modificados

- `src/components/Shared/FloatingChatButton.jsx`
- `src/components/Shared/ScrollButton.jsx`
- `src/Styles/Index.css` (CSS base ya existía)
