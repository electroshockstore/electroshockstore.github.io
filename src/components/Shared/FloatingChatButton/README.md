# FloatingChatButton Component

Botón flotante de WhatsApp con menú expandible y modal de condiciones.

## Estructura

```
FloatingChatButton/
├── index.jsx              # Componente principal (orquestador)
├── MainButton.jsx         # Botón principal circular/pill
├── ExpandedMenu.jsx       # Menú con opciones (WhatsApp, Puntos, Condiciones)
├── MenuHeader.jsx         # SVG animado decorativo
├── ConditionsModal.jsx    # Modal para condiciones de venta
├── FloatingParticles.jsx  # Partículas flotantes decorativas
├── WhatsAppIcon.jsx       # Icono SVG de WhatsApp
└── README.md             # Esta documentación
```

## Estilos

Los estilos están en `src/Styles/Index.css` bajo la sección:
- **FLOATING CHAT BUTTON - Componentes**

### Clases principales:
- `.fcb-main-button` - Botón principal
- `.fcb-menu-wrapper` - Contenedor del menú expandido
- `.fcb-panel` - Panel glassmorphism
- `.fcb-card` - Tarjetas del menú
- `.fcb-modal` - Modal de condiciones

## Características

- ✅ Diseño responsive (circular en mobile, pill en desktop)
- ✅ Animaciones suaves con GPU acceleration
- ✅ Glassmorphism effects
- ✅ Partículas flotantes decorativas
- ✅ SVG animado en header del menú
- ✅ Modal para condiciones de venta
- ✅ Hint tooltip en mobile
- ✅ Notification badge
- ✅ Accesibilidad (aria-labels)

## Uso

```jsx
import FloatingChatButton from './components/Shared/FloatingChatButton';

function App() {
  return (
    <>
      {/* Tu contenido */}
      <FloatingChatButton />
    </>
  );
}
```

## Posicionamiento

El botón usa `position: fixed` con las clases:
- `.floating-button-fixed` - Izquierda (WhatsApp)
- `.floating-button-fixed-right` - Derecha (Scroll to Top)

Definidas en `src/Styles/Index.css` con:
- `bottom: max(1.5rem, env(safe-area-inset-bottom, 0px) + 1.5rem)`
- `transform: translate3d(0, 0, 0)` para GPU acceleration
- `z-index: 99999`

## Optimizaciones

- Portal rendering para evitar conflictos de z-index
- GPU acceleration con `translate3d` y `will-change`
- Lazy loading de modal
- Animaciones optimizadas con `cubic-bezier`
- Backdrop blur solo cuando es necesario
