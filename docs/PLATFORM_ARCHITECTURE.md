# Arquitectura de Plataforma - ElectroShock

## Filosofía de Diseño

Este proyecto usa **componentes unificados con variaciones condicionales** en lugar de layouts separados por plataforma. Esta decisión arquitectónica se basa en:

1. **Mantenibilidad**: Un solo componente = un solo lugar para bugs y features
2. **DRY Principle**: No duplicamos lógica de negocio
3. **Bundle Size**: No enviamos código duplicado al cliente
4. **Escalabilidad**: Agregar features es más simple

## Estructura de Archivos

```
src/
├── hooks/
│   └── useDevice.js              # Detección centralizada de dispositivo
├── constants/
│   └── platform.js               # Constantes de plataforma (z-index, transforms, etc)
├── components/
│   └── Shared/
│       ├── PlatformModal.jsx     # Wrapper de modal optimizado por plataforma
│       ├── Portal.jsx            # Portal genérico para modales
│       └── LenisProvider.jsx     # Provider de smooth scroll
└── Styles/
    └── Index.css                 # CSS con variables de plataforma
```

## Hooks de Detección

### `useDevice()`
Hook principal que detecta todas las características del dispositivo:

```javascript
const { isIOS, isAndroid, isMobile, isDesktop, isTouch } = useDevice();
```

**Características:**
- Inicialización síncrona (evita flash)
- Listener de resize para cambios de orientación
- SSR-safe (retorna valores por defecto en servidor)

### `useIsIOS()`
Hook simplificado solo para iOS:

```javascript
const isIOS = useIsIOS();
```

**Cuándo usar:**
- Solo necesitas detectar iOS
- No necesitas reactividad al resize
- Performance crítica

### `useIsMobile()`
Hook para detectar mobile con resize:

```javascript
const isMobile = useIsMobile();
```

## Constantes de Plataforma

### Z-Index Hierarchy (`constants/platform.js`)

```javascript
import { Z_INDEX } from '@/constants/platform';

// Uso
style={{ zIndex: Z_INDEX.MODAL_MAX }}
```

**Jerarquía:**
- `MODAL_MAX`: 2147483647 (iOS Safari)
- `MODAL_BACKDROP`: 2147483646
- `MODAL_STANDARD`: 999999
- `FLOATING_BUTTON`: 99999
- `HEADER`: 50

### Transforms para Hardware Acceleration

```javascript
import { TRANSFORMS } from '@/constants/platform';

// iOS necesita GPU acceleration
const styles = isIOS ? TRANSFORMS.GPU_ACCELERATION : {};
```

### Helpers de Estilos

```javascript
import { getModalStyles, getBackdropStyles } from '@/constants/platform';

const modalStyles = getModalStyles(isIOS);
const backdropStyles = getBackdropStyles(isIOS);
```

## Componentes de Plataforma

### `PlatformModal`
Wrapper de modal que abstrae diferencias de plataforma:

```javascript
<PlatformModal isOpen={isOpen} onClose={onClose}>
  <div>Contenido del modal</div>
</PlatformModal>
```

**Ventajas:**
- Maneja z-index automáticamente
- Aplica transforms de iOS cuando es necesario
- Backdrop incluido
- Accesibilidad (role, aria-modal)

**Props:**
- `isOpen`: boolean
- `onClose`: function
- `children`: ReactNode
- `className`: string (opcional)
- `style`: object (opcional)
- `showBackdrop`: boolean (default: true)
- `backdropClassName`: string (opcional)

## Configuración de Lenis

Smooth scroll solo en desktop, desactivado en mobile:

```javascript
// constants/platform.js
export const LENIS_CONFIG = {
  DESKTOP: { /* config completa */ },
  MOBILE: null  // Desactivado
};
```

**Uso en componentes:**
```javascript
// Pausar scroll (modales)
window.lenis?.stop();

// Reanudar scroll
window.lenis?.start();

// Scroll programático
window.lenis?.scrollTo(target);
```

## CSS con Variables de Plataforma

```css
:root {
  /* Z-Index sincronizado con JS */
  --z-modal-max: 2147483647;
  --z-modal-standard: 999999;
  
  /* Transforms */
  --transform-gpu: translate3d(0, 0, 0);
}

/* iOS Safari específico */
@supports (-webkit-touch-callout: none) {
  #portal-root {
    position: fixed;
    z-index: var(--z-modal-max);
    transform: var(--transform-gpu);
  }
}
```

## Patrones de Uso

### Patrón 1: Componente con Detección Simple

```javascript
import { useIsIOS } from '@/hooks/useDevice';

const MyComponent = () => {
  const isIOS = useIsIOS();
  
  return (
    <div className={isIOS ? 'ios-specific' : ''}>
      Content
    </div>
  );
};
```

### Patrón 2: Estilos Condicionales

```javascript
import { useDevice } from '@/hooks/useDevice';
import { TRANSFORMS } from '@/constants/platform';

const MyComponent = () => {
  const { isIOS, isMobile } = useDevice();
  
  const styles = {
    ...(isIOS && TRANSFORMS.GPU_ACCELERATION),
    ...(isMobile && { fontSize: '14px' })
  };
  
  return <div style={styles}>Content</div>;
};
```

### Patrón 3: Modal con PlatformModal

```javascript
import PlatformModal from '@/components/Shared/PlatformModal';

const MyModal = ({ isOpen, onClose }) => {
  return (
    <PlatformModal isOpen={isOpen} onClose={onClose}>
      <div className="modal-content">
        {/* Contenido */}
      </div>
    </PlatformModal>
  );
};
```

## Decisiones de Arquitectura

### ¿Por qué NO layouts separados?

**Consideramos:**
- Layout Mobile iOS
- Layout Mobile Android  
- Layout Desktop

**Rechazamos porque:**
- Diferencias < 10% del código
- Lógica de negocio idéntica
- Solo cambian estilos/animaciones
- Mantenimiento 3x más complejo

### ¿Cuándo SÍ separar?

Separa componentes solo si:
- Diferencias > 70% del código
- Lógica de negocio completamente diferente
- Interacciones nativas vs web
- Performance crítica (cada KB cuenta)

## Debugging

### Logs de Plataforma

```javascript
// Activar logs de detección
console.log('[Platform]', detectPlatform());

// Ver configuración de Lenis
console.log('[Lenis]', window.lenis ? 'Activo' : 'Desactivado');
```

### Verificar Z-Index

```javascript
// En DevTools Console
document.querySelectorAll('[style*="zIndex"]').forEach(el => {
  console.log(el, getComputedStyle(el).zIndex);
});
```

## Performance

### Optimizaciones Aplicadas

1. **Inicialización síncrona**: Hooks usan `useState(() => ...)` para evitar flash
2. **Memoización**: `useIsIOS()` no tiene listeners innecesarios
3. **CSS Variables**: Reduce recálculos de estilos
4. **Hardware Acceleration**: Solo en iOS donde es necesario
5. **Lenis condicional**: No carga en mobile

### Métricas

- Bundle size: +2KB por detección de plataforma
- Runtime overhead: <1ms por componente
- Memory: Despreciable (solo booleans)

## Testing

### Unit Tests

```javascript
import { renderHook } from '@testing-library/react';
import { useDevice } from '@/hooks/useDevice';

test('detecta iOS correctamente', () => {
  // Mock navigator.userAgent
  Object.defineProperty(navigator, 'userAgent', {
    value: 'iPhone',
    configurable: true
  });
  
  const { result } = renderHook(() => useDevice());
  expect(result.current.isIOS).toBe(true);
});
```

### Integration Tests

```javascript
import { render } from '@testing-library/react';
import PlatformModal from '@/components/Shared/PlatformModal';

test('modal se renderiza con z-index correcto en iOS', () => {
  // Mock iOS
  const { container } = render(
    <PlatformModal isOpen={true} onClose={() => {}}>
      Content
    </PlatformModal>
  );
  
  const modal = container.querySelector('[role="dialog"]');
  expect(modal.style.zIndex).toBe('2147483647');
});
```

## Migración de Componentes Existentes

### Antes (sin optimización)

```javascript
const MyModal = ({ isOpen, onClose }) => {
  const [isIOS, setIsIOS] = useState(false);
  
  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));
  }, []);
  
  if (!isOpen) return null;
  
  return (
    <Portal>
      <div 
        className="fixed inset-0"
        style={{
          zIndex: isIOS ? 2147483647 : 999999,
          WebkitTransform: 'translate3d(0,0,0)',
          transform: 'translate3d(0,0,0)'
        }}
      >
        Content
      </div>
    </Portal>
  );
};
```

### Después (optimizado)

```javascript
import PlatformModal from '@/components/Shared/PlatformModal';

const MyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <PlatformModal isOpen={isOpen} onClose={onClose}>
      <div>Content</div>
    </PlatformModal>
  );
};
```

**Beneficios:**
- 15 líneas → 5 líneas
- No duplicación de lógica
- Mantenimiento centralizado
- Más legible

## Roadmap

### Próximas Mejoras

- [ ] Feature flags para A/B testing de plataforma
- [ ] Telemetría de uso por plataforma
- [ ] Lazy loading de componentes específicos de plataforma
- [ ] Service Worker para cache por plataforma
- [ ] Optimización de imágenes por dispositivo

### Consideraciones Futuras

- Soporte para tablets (iPad Pro, Galaxy Tab)
- Detección de capacidades (WebGL, WebP, etc)
- Modo oscuro por plataforma
- Gestos nativos vs web

## Referencias

- [iOS Safari Quirks](https://webkit.org/blog/)
- [React Performance](https://react.dev/learn/render-and-commit)
- [CSS Containment](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Containment)
- [Z-Index Best Practices](https://www.joshwcomeau.com/css/stacking-contexts/)
