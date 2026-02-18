# Mystery Box 3D - Cubo Animado Ultra Ligero

## 📋 Descripción

Componente de cubo 3D animado con CSS puro, ideal para mostrar "Cajas Misteriosas", "Packs Gamer" o productos sorpresa en tu tienda. Inspirado en el estilo de Northflank.

## ✨ Características

- **100% CSS Puro**: Sin librerías pesadas como Three.js
- **Ultra Ligero**: Menos de 10KB total
- **Animación Suave**: Rotación infinita en 3D
- **Rejilla Tecnológica**: Plano de suelo con perspectiva 3D
- **Resplandor Pulsante**: Efecto de luz que emana del cubo
- **4 Variantes de Color**: Cyan, Purple, Orange, Green
- **Responsive**: Optimizado para mobile y desktop
- **Accesible**: Respeta `prefers-reduced-motion`

## 🎨 Uso Básico

```jsx
import MysteryBox3D from '../components/Shared/MysteryBox3D';

function ProductPage() {
  return (
    <MysteryBox3D 
      title="Caja Misteriosa"
      subtitle="Pack Gamer Sorpresa"
      price="$15.000"
      glowColor="cyan"
    />
  );
}
```

## 🎯 Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | string | "Caja Misteriosa" | Título principal |
| `subtitle` | string | "Pack Gamer Sorpresa" | Subtítulo descriptivo |
| `price` | string | "$XX.XXX" | Precio del producto |
| `glowColor` | string | "cyan" | Color del brillo: `cyan`, `purple`, `orange`, `green` |

## 🌈 Variantes de Color

### Cyan (Default)
```jsx
<MysteryBox3D glowColor="cyan" />
```
Ideal para: Productos tecnológicos, componentes de PC

### Purple
```jsx
<MysteryBox3D glowColor="purple" />
```
Ideal para: Gaming, periféricos RGB

### Orange
```jsx
<MysteryBox3D glowColor="orange" />
```
Ideal para: Ofertas especiales, promociones

### Green
```jsx
<MysteryBox3D glowColor="green" />
```
Ideal para: Productos eco-friendly, ofertas verdes

## 📐 Especificaciones Técnicas

### Cubo 3D
- **Tamaño**: 120px × 120px (desktop), 100px × 100px (mobile)
- **Animación**: Rotación completa en 20s (30s en mobile)
- **Caras**: 6 caras con bordes neón y fondo semi-transparente
- **Perspectiva**: 1000px para efecto 3D realista

### Plano de Suelo
- **Tamaño**: 300px × 300px (desktop), 250px × 250px (mobile)
- **Rejilla**: 30px × 30px con líneas semi-transparentes
- **Rotación**: 75deg en eje X para perspectiva
- **Opacidad**: 0.6 para efecto sutil

### Resplandor
- **Tamaño**: 150px × 150px
- **Blur**: 40px (30px en mobile)
- **Animación**: Pulso de 3s con escala 1.0 → 1.2
- **Opacidad**: 0.4 → 0.8 en el pulso

## 🎨 Personalización Avanzada

### Cambiar Velocidad de Rotación

```css
.cube-3d {
  animation-duration: 15s; /* Más rápido */
}
```

### Cambiar Tamaño del Cubo

```css
.cube-3d {
  width: 150px;
  height: 150px;
}

.cube-face {
  width: 150px;
  height: 150px;
}

.cube-front { transform: translateZ(75px); }
/* Ajustar todas las caras proporcionalmente */
```

### Agregar Contenido Personalizado

```jsx
<div className="cube-face cube-front">
  <img src="/logo.png" alt="Logo" />
</div>
```

## 💡 Ejemplos de Uso

### Pack Gamer RGB
```jsx
<MysteryBox3D 
  title="Pack Gamer RGB"
  subtitle="Teclado + Mouse + Auriculares"
  price="$45.000"
  glowColor="purple"
/>
```

### Caja Sorpresa Tech
```jsx
<MysteryBox3D 
  title="Tech Mystery Box"
  subtitle="3 Productos Aleatorios"
  price="$25.000"
  glowColor="cyan"
/>
```

### Oferta Especial
```jsx
<MysteryBox3D 
  title="Oferta Relámpago"
  subtitle="Componentes de PC"
  price="$35.000"
  glowColor="orange"
/>
```

## ⚡ Optimizaciones de Rendimiento

### Desktop
- Animación completa a 60fps
- Blur de 40px en resplandor
- Backdrop-filter activo

### Mobile
- Animación más lenta (30s)
- Blur reducido a 30px
- Tamaño de cubo reducido

### Dispositivos de Gama Baja
- Animación desactivada
- Cubo en posición estática
- Sin backdrop-filter
- Resplandor estático

### Accesibilidad
- Respeta `prefers-reduced-motion`
- Desactiva todas las animaciones si el usuario lo prefiere

## 🎯 Integración en Shock Store

### En Página de Producto
```jsx
import MysteryBox3D from '../components/Shared/MysteryBox3D';

function MysteryProductPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="grid md:grid-cols-2 gap-8">
        <MysteryBox3D 
          title="Caja Misteriosa Gamer"
          subtitle="Valor mínimo $50.000"
          price="$30.000"
          glowColor="purple"
        />
        <div>
          <h2>¿Qué incluye?</h2>
          <ul>
            <li>3-5 productos gaming</li>
            <li>Valor garantizado</li>
            <li>Productos nuevos</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
```

### En Grid de Productos
```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <MysteryBox3D 
    title="Pack Básico"
    price="$15.000"
    glowColor="cyan"
  />
  <MysteryBox3D 
    title="Pack Premium"
    price="$30.000"
    glowColor="purple"
  />
  <MysteryBox3D 
    title="Pack Ultimate"
    price="$50.000"
    glowColor="orange"
  />
</div>
```

## 🔍 Debugging

### Verificar Animación
```javascript
// En la consola del navegador
const cube = document.querySelector('.cube-3d');
console.log(getComputedStyle(cube).animation);
```

### Verificar Perspectiva
```javascript
const scene = document.querySelector('.scene-3d');
console.log(getComputedStyle(scene).perspective);
```

## 🌐 Compatibilidad

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (iOS y macOS)
- ✅ Opera
- ⚠️ IE11 (sin soporte de `transform-style: preserve-3d`)

## 📚 Referencias

- [MDN: transform-style](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style)
- [MDN: perspective](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective)
- [CSS Tricks: 3D Transforms](https://css-tricks.com/almanac/properties/t/transform/)
- [Northflank Design](https://northflank.com) - Inspiración visual

## 🎨 Capturas de Pantalla

El componente se ve así:

```
┌─────────────────────────────┐
│   Caja Misteriosa           │
│   Pack Gamer Sorpresa       │
│      [$30.000]              │
│                             │
│         ╔═══╗               │
│        ╔╝ ? ╚╗              │
│       ╔╝     ╚╗             │
│      ╚════════╝             │
│    ▓▓▓▓▓▓▓▓▓▓▓▓▓            │
│   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓           │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓          │
│                             │
│  [Descubrir Contenido →]   │
└─────────────────────────────┘
```

## 💡 Tips

1. Usa `cyan` para productos tech
2. Usa `purple` para gaming
3. Usa `orange` para ofertas
4. Usa `green` para eco-friendly
5. Combina con animaciones de entrada para más impacto
6. Agrega un contador de stock limitado para urgencia
