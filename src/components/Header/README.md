# Header Component - Estructura Completa

## 📁 Estructura de Carpetas

```
Header/
├── index.jsx                          # ✅ Componente principal (LIMPIO - solo orquestación)
├── Logo.jsx                           # Logo para Desktop (viejo)
├── HeaderActions.jsx                  # Acciones del Header Desktop
├── SearchBar.jsx                      # Barra de búsqueda
├── ConditionsModal.jsx                # Modal de condiciones
├── PromoCarousel.jsx                  # Carrusel de promociones
│
├── shared/                            # ✅ Componentes compartidos
│   └── ElectroShockLogo.jsx          # Logo reutilizable con imagen
│
├── DesktopHeader/                     # ✅ Componentes Desktop
│   └── index.jsx                      # Header Desktop completo
│
└── MobileHeader/                      # ✅ Componentes Mobile
    ├── index.jsx                      # Header Mobile (presentacional)
    ├── MobileHeaderWrapper.jsx        # Wrapper con lógica y estado
    ├── ActionButtons.jsx              # Botones de búsqueda y notificaciones
    ├── CategoryButton.jsx             # Botón de "Todas las categorías"
    └── FeatureBadges.jsx              # Badges de características
```

---

## 🎨 Componentes

### **Header Principal (index.jsx)**

Componente orquestador limpio que solo maneja:
- Estado del modal de condiciones
- Detección de scroll
- Detección de página (catálogo/PC Builder)
- Renderizado de PromoCarousel, MobileHeaderWrapper y DesktopHeader

**Props:**
- `onGoHome`: Función para navegar al home

---

### **Shared Components**

#### `ElectroShockLogo`
Logo reutilizable con imagen de ElectroShock.

**Props:**
- `onClick`: Función al hacer clic en el logo
- `size`: Tamaño del logo (`'small'`, `'default'`, `'large'`)

**Características:**
- Usa imagen `/electroshock_logo.png`
- Glow verde/cyan premium
- Gradiente: `from-emerald-400 via-emerald-500 to-cyan-500`
- Shadow: `shadow-2xl shadow-emerald-500/50`

**Uso:**
```jsx
<ElectroShockLogo onClick={handleGoHome} size="default" />
```

---

### **Desktop Components**

#### `DesktopHeader`
Header completo para desktop.

**Props:**
- `onGoHome`: Función para navegar al home
- `onConditionsClick`: Función para abrir modal de condiciones

**Contiene:**
- Logo (viejo)
- SearchBar
- HeaderActions

---

### **Mobile Components**

#### `MobileHeaderWrapper`
Wrapper con toda la lógica y estado del header mobile.

**Props:**
- `onGoHome`: Función para navegar al home
- `onConditionsClick`: Función para abrir modal de condiciones

**Responsabilidades:**
- Manejo de estado (búsqueda, modal de categorías)
- Navegación entre categorías
- Renderizado del modal de categorías
- Toggle entre header y búsqueda

#### `MobileHeader`
Componente presentacional del header mobile.

**Props:**
- `onGoHome`: Función para navegar al home
- `onConditionsClick`: Función para abrir modal de condiciones
- `onCategoryClick`: Función para abrir modal de categorías
- `onSearchClick`: Función para abrir búsqueda

**Estructura:**
1. Logo + Botones de acción
2. Botón de categorías
3. Feature badges

#### `ActionButtons`
Botones de búsqueda y notificaciones.

**Props:**
- `onSearchClick`: Función al hacer clic en búsqueda
- `onNotificationsClick`: Función al hacer clic en notificaciones

**Características:**
- Fondo: `from-gray-800/90 to-gray-900/90`
- Borde: `border-gray-700/50`
- Badge morado en notificaciones: `from-purple-500 to-purple-600`

#### `CategoryButton`
Botón premium con gradiente RGB para explorar categorías.

**Props:**
- `onClick`: Función al hacer clic

**Características:**
- Rounded: `3rem` (48px)
- Borde RGB: `linear-gradient(90deg, rgb(59, 130, 246), rgb(168, 85, 247), rgb(16, 185, 129))`
- Glow exterior animado
- Icono de Grid con glow morado

#### `FeatureBadges`
Badges informativos (Envíos, Pago seguro, Garantía oficial).

**Props:** Ninguna (componente estático)

**Características:**
- Fondo: `bg-blue-500/15`
- Borde: `border-blue-500/20`
- Iconos: Truck, ShieldCheck, Award

---

## 🔄 Flujo de Datos

```
Header (index.jsx)
├── MobileHeaderWrapper
│   ├── Estado y lógica
│   ├── Modal de categorías
│   └── MobileHeader (presentacional)
│       ├── ElectroShockLogo
│       ├── ActionButtons
│       ├── CategoryButton
│       └── FeatureBadges
│
└── DesktopHeader
    ├── Logo
    ├── SearchBar
    └── HeaderActions
```

---

## 🎯 Características del Diseño Mobile

### **Logo**
- Imagen de ElectroShock con glow verde/cyan
- Gradiente premium: `from-emerald-400 via-emerald-500 to-cyan-500`
- Shadow: `shadow-2xl shadow-emerald-500/50`

### **Botones de Acción**
- Fondo: `from-gray-800/90 to-gray-900/90`
- Borde: `border-gray-700/50`
- Badge morado en notificaciones: `from-purple-500 to-purple-600`

### **Botón de Categorías**
- Rounded: `3rem` (48px)
- Borde RGB: `linear-gradient(90deg, rgb(59, 130, 246), rgb(168, 85, 247), rgb(16, 185, 129))`
- Glow exterior animado
- Icono de Grid con glow morado

### **Feature Badges**
- Fondo: `bg-blue-500/15`
- Borde: `border-blue-500/20`
- Iconos: Truck, ShieldCheck, Award

---

## 🔄 Flujo de Navegación Mobile

1. **Logo** → Navega al home
2. **Búsqueda** → Abre barra de búsqueda mobile
3. **Notificaciones** → Abre modal de condiciones
4. **Categorías** → Abre modal con todas las categorías (CategoryFilter)

---

## ✅ Ventajas de esta Estructura

1. **Separación de responsabilidades**: Cada componente tiene una función clara
2. **Reutilizable**: Logo compartido entre mobile y desktop
3. **Mantenible**: Fácil encontrar y modificar componentes específicos
4. **Escalable**: Agregar nuevos componentes es simple
5. **Limpio**: El index.jsx es solo un orquestador
6. **Testeable**: Componentes pequeños y enfocados

---

## 📝 Notas Importantes

- El logo usa la imagen `/electroshock_logo.png`
- Todos los componentes mobile están en `MobileHeader/`
- Los componentes compartidos están en `shared/`
- El diseño es completamente responsive y premium
- La lógica está separada de la presentación (Wrapper vs Component)
