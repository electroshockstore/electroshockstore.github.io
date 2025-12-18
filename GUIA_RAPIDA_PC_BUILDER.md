# 🚀 Guía Rápida - PC Builder Asistido

## ✅ TODO ESTÁ LISTO Y FUNCIONANDO

---

## 🎯 Acceso Rápido

### Opción 1: Botón en Header
1. Abrir: http://localhost:3001/
2. Click en botón **"PC Builder"** (icono CPU, color púrpura-rosa)

### Opción 2: URL Directa
- http://localhost:3001/pc-builder

---

## 🎮 Modo Asistido (Para Principiantes)

### Paso a Paso:
1. Click en **"¡Ayúdame a armar mi PC!"**
2. Seleccionar presupuesto (Económico/Medio/Alto/Premium)
3. Seleccionar uso (Gaming/Trabajo/Multimedia/General)
4. Si Gaming: Seleccionar resolución y FPS
5. Ver recomendación generada
6. Click en **"Ajustar Manualmente"** para personalizar

### Resultado:
- Configuración 100% compatible
- Precio total calculado
- Todos los componentes seleccionados automáticamente

---

## 🔧 Modo Manual (Para Expertos)

### Paso a Paso:
1. Click en **"Armar PC manualmente"**
2. Seleccionar categoría (CPU, Motherboard, RAM, etc.)
3. Ver productos con indicadores:
   - 🟢 Verde = Compatible
   - 🟡 Amarillo = Advertencia
   - 🔴 Rojo = Incompatible (bloqueado)
4. Click en producto compatible
5. Auto-avance a siguiente categoría
6. Repetir hasta completar

### Características:
- Tags verdes con ✓ para componentes seleccionados
- Tarjetas seleccionadas con borde azul brillante
- Panel lateral con resumen y precio total
- Advertencias de bottleneck en tiempo real

---

## 🎨 Indicadores Visuales

### Tags de Categoría:
- ⚪ **Blanco**: Sin seleccionar
- 🟢 **Verde con ✓**: Componente seleccionado
- 🔵 **Azul**: Categoría activa

### Tarjetas de Producto:
- 🟢 **Verde**: Compatible
- 🟡 **Amarillo**: Advertencia (bottleneck)
- 🔴 **Rojo**: Incompatible (bloqueado)
- 🔵 **Azul con badge "✓ SELECCIONADO"**: Producto seleccionado

---

## ✅ Validaciones Automáticas

El sistema valida automáticamente:
- ✅ Socket CPU ↔ Motherboard
- ✅ Chipset CPU ↔ Motherboard
- ✅ Tipo de RAM (DDR4/DDR5)
- ✅ Consumo eléctrico vs Capacidad PSU
- ✅ Cooler compatible con socket y TDP
- ✅ Bottlenecks CPU ↔ GPU

---

## 📊 Ejemplo Rápido

### Configuración Compatible:
```
1. CPU: AMD Ryzen 5 7600 (AM5, DDR5)
2. Motherboard: Gigabyte B650M (AM5, DDR5)
3. RAM: Kingston Fury DDR5 16GB
4. PSU: Thermaltake 600W
5. Cooler: Cooler Master Hyper 212

Resultado: 🟢 100% Compatible
```

### Incompatibilidad:
```
CPU: AMD Ryzen 5 7600 (AM5)
Motherboard: ASUS A520M (AM4)

Resultado: 🔴 Incompatible
Razón: Socket incompatible
```

---

## 🧪 Tests

Ejecutar tests:
```bash
npm test
```

Resultado esperado:
```
✓ 10 tests pasando
✓ 100 iteraciones por propiedad
```

---

## 📱 Responsive

- ✅ Funciona en móvil
- ✅ Funciona en tablet
- ✅ Funciona en desktop

---

## 🎉 Estado

**✅ COMPLETAMENTE FUNCIONAL**

- Modo Asistido: ✅
- Modo Manual: ✅
- Validaciones: ✅
- Indicadores: ✅
- Tests: ✅
- Navegación: ✅

---

**Dev Server**: http://localhost:3001/  
**Ruta PC Builder**: http://localhost:3001/pc-builder  
**Tests**: 10/10 pasando ✅
