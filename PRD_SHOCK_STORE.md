# PRD - Shock-Store: Catálogo de Productos Tecnológicos y PC Builder

## 1. INTRODUCCIÓN

### 1.1 Resumen Ejecutivo
Shock-Store es una plataforma web de catálogo y venta de productos tecnológicos y componentes de PC. El sistema permite a los usuarios explorar productos, filtrarlos por categorías y especificaciones, obtener información detallada de cada producto, y utilizar una herramienta interactiva de construcción de PC (PC Builder) que valida compatibilidad entre componentes y genera recomendaciones personalizadas según presupuesto y uso.

### 1.2 Objetivos del Proyecto
- Proporcionar un catálogo completo de productos tecnológicos con búsqueda y filtrado avanzado
- Ofrecer una herramienta de PC Builder con dos modos: asistido (para principiantes) y manual (para expertos)
- Validar automáticamente la compatibilidad entre componentes de PC
- Optimizar el sitio para motores de búsqueda (SEO)
- Garantizar una experiencia responsive en todos los dispositivos

### 1.3 Stack Tecnológico
- **Frontend**: React 18, Vite
- **Styling**: TailwindCSS, NextUI
- **Routing**: React Router DOM v6
- **Animations**: Framer Motion
- **State Management**: React Context API
- **Testing**: Vitest, @testing-library/react, fast-check (property-based testing)
- **Deployment**: GitHub Pages con GitHub Actions
- **Analytics**: Google Analytics
- **Chat**: Tawk.to

---

## 2. GLOSARIO DE TÉRMINOS

- **System**: La aplicación web Shock-Store
- **User**: Cualquier visitante o cliente que accede a la plataforma
- **Product**: Un artículo tecnológico disponible en el catálogo
- **Category**: Agrupación de productos por tipo (procesadores, motherboards, RAM, etc.)
- **PC Builder**: Herramienta interactiva para armar configuraciones de PC
- **Assisted Mode**: Modo del PC Builder que genera recomendaciones automáticas
- **Manual Mode**: Modo del PC Builder con selección manual y validación de compatibilidad
- **Component**: Un producto específico que forma parte de una configuración de PC
- **Compatibility Engine**: Motor de validación que verifica compatibilidad entre componentes
- **SKU**: Identificador único de producto basado en nombre y marca
- **Stock Status**: Estado de disponibilidad de un producto
- **Filter**: Criterio de búsqueda o selección aplicado al catálogo
- **SEO Metadata**: Información estructurada para optimización en motores de búsqueda

---

## 3. REQUISITOS FUNCIONALES

### 3.1 Exploración de Catálogo

**RF-001: Visualización de Home Page**
- El sistema debe mostrar un hero carousel con productos destacados
- El sistema debe mostrar una grilla de categorías de productos con imágenes representativas
- El sistema debe mostrar secciones destacadas del PC Builder

**RF-002: Navegación por Categorías**
- El sistema debe permitir al usuario hacer clic en una categoría y navegar a ella
- El sistema debe mostrar todos los productos pertenecientes a la categoría seleccionada
- El sistema debe generar URLs semánticas con slugs de categoría

**RF-003: Visualización de Productos**
- El sistema debe mostrar para cada producto: nombre, marca, precio, estado de stock e imagen principal
- El sistema debe adaptar la visualización a diferentes tamaños de pantalla (responsive)


### 3.2 Búsqueda y Filtrado

**RF-004: Búsqueda en Tiempo Real**
- El sistema debe filtrar productos en tiempo real mientras el usuario escribe en la barra de búsqueda
- La búsqueda debe aplicarse sobre nombre, marca y especificaciones del producto

**RF-005: Filtrado por Categoría**
- El sistema debe mostrar solo productos de la categoría seleccionada
- El sistema debe mostrar filtros laterales relevantes para cada categoría específica

**RF-006: Filtros Múltiples**
- El sistema debe permitir aplicar múltiples filtros simultáneamente
- El sistema debe mostrar solo productos que cumplan TODOS los criterios seleccionados
- El sistema debe permitir limpiar todos los filtros y restaurar la lista completa

### 3.3 Ordenamiento

**RF-007: Ordenamiento por Precio**
- El sistema debe permitir ordenar productos de menor a mayor precio (ascendente)
- El sistema debe permitir ordenar productos de mayor a menor precio (descendente)
- El ordenamiento debe mantener los filtros y categoría actuales
- El sistema debe mostrar productos en orden por defecto cuando no hay ordenamiento seleccionado

### 3.4 Detalle de Producto

**RF-008: Página de Detalle**
- El sistema debe navegar a una página dedicada al hacer clic en un producto
- El sistema debe mostrar múltiples imágenes del producto con navegación entre ellas
- El sistema debe mostrar especificaciones completas, precio y estado de stock
- El sistema debe mostrar métodos de pago y condiciones de compra
- El sistema debe generar metadata SEO optimizada (Open Graph, Twitter Cards)


### 3.5 PC Builder - Modo Asistido

**RF-009: Flujo de Recomendación Asistida**
- El sistema debe solicitar selección de rango de presupuesto (Económico/Medio/Alto/Premium)
- El sistema debe solicitar selección de caso de uso (Gaming/Trabajo/Multimedia/General)
- Si el uso es Gaming, el sistema debe solicitar resolución objetivo y FPS
- El sistema debe generar una configuración completa con todos los componentes compatibles
- El sistema debe mostrar precio total y permitir transición a ajuste manual

**RF-010: Motor de Recomendaciones**
- El sistema debe seleccionar componentes basándose en presupuesto y uso
- El sistema debe garantizar compatibilidad entre todos los componentes recomendados
- El sistema debe incluir como mínimo: CPU, Motherboard, RAM y PSU
- El sistema debe optimizar la selección según el caso de uso especificado

### 3.6 PC Builder - Modo Manual

**RF-011: Selección Manual de Componentes**
- El sistema debe mostrar pestañas de categorías para todos los tipos de componentes
- Al seleccionar una categoría, el sistema debe mostrar todos los productos con indicadores de compatibilidad
- Al seleccionar un componente, el sistema debe actualizar el estado de compatibilidad de todas las categorías
- El sistema debe deshabilitar componentes incompatibles y mostrar la razón específica
- El sistema debe avanzar automáticamente a la siguiente categoría lógica tras una selección

### 3.7 Validación de Compatibilidad

**RF-012: Validación CPU-Motherboard**
- El sistema debe validar compatibilidad de socket entre CPU y Motherboard
- El sistema debe validar compatibilidad de chipset
- El sistema debe bloquear selecciones incompatibles con mensaje específico

**RF-013: Validación de RAM**
- El sistema debe validar tipo de RAM (DDR4 vs DDR5) con Motherboard
- El sistema debe validar tipo de RAM con CPU
- El sistema debe bloquear RAM incompatible con mensaje específico


**RF-014: Validación de Consumo Eléctrico**
- El sistema debe calcular consumo total de energía de todos los componentes
- El sistema debe validar que la PSU tenga capacidad suficiente (consumo + 20% margen)
- El sistema debe mostrar advertencia si la PSU es insuficiente

**RF-015: Validación de Cooler**
- El sistema debe validar compatibilidad de socket entre Cooler y CPU
- El sistema debe validar que el TDP del Cooler sea suficiente para el CPU
- El sistema debe bloquear coolers incompatibles con mensaje específico

### 3.8 Detección de Bottlenecks

**RF-016: Advertencias de Bottleneck**
- El sistema debe detectar desbalances significativos entre CPU y GPU
- El sistema debe mostrar advertencia indicando qué componente limita el rendimiento
- El sistema debe permitir la selección pero marcarla con indicador amarillo
- El sistema debe mostrar indicador verde cuando los componentes están balanceados

### 3.9 Resumen de Configuración

**RF-017: Panel de Resumen en Tiempo Real**
- El sistema debe actualizar el panel de resumen inmediatamente al seleccionar un componente
- El sistema debe mostrar todos los componentes seleccionados con nombres y precios
- El sistema debe calcular y mostrar el precio total (suma de todos los componentes)
- El sistema debe actualizar el resumen al remover un componente
- El sistema debe mostrar mensaje de estado vacío cuando no hay componentes seleccionados

### 3.10 Modos de Vista

**RF-018: Toggle de Vista Grid/List**
- El sistema debe permitir cambiar entre vista de grilla y vista de lista
- En vista de grilla, el sistema debe mostrar productos en columnas múltiples responsive
- En vista de lista, el sistema debe mostrar productos en una columna con detalles
- El cambio de vista debe mantener filtros, ordenamiento y categoría actual


### 3.11 Optimización SEO

**RF-019: Meta Tags Dinámicos**
- El sistema debe generar meta tags dinámicos basados en el contenido de cada página
- El sistema debe incluir datos estructurados Schema.org en formato JSON-LD para productos
- El sistema debe generar sitemap.xml completo durante el build
- El sistema debe incluir metadata específica para cada categoría
- El sistema debe proporcionar metadata Open Graph y Twitter Cards para compartir en redes sociales

### 3.12 Chat en Vivo

**RF-020: Integración de Chat**
- El sistema debe mostrar un botón flotante de chat en todas las páginas
- Al hacer clic, el sistema debe abrir el widget de Tawk.to
- El widget debe permanecer oculto cuando no está en uso
- Al cerrar el chat, el sistema debe ocultar el widget pero mantener el botón visible

### 3.13 Responsive Design

**RF-021: Adaptación a Dispositivos**
- El sistema debe mostrar layout optimizado para pantallas pequeñas (móvil)
- El sistema debe mostrar layout optimizado para pantallas medianas (tablet)
- El sistema debe responder apropiadamente a gestos táctiles
- El PC Builder debe adaptar su interfaz para scroll vertical en móvil
- Los filtros deben presentarse en formato mobile-friendly

### 3.14 Manejo de Errores

**RF-022: Gestión de Errores**
- El sistema debe mostrar notificación amigable cuando ocurre un error de red
- El sistema debe mostrar UI de fallback cuando falla la carga de un recurso
- Las notificaciones de error deben ofrecer opciones para reintentar o descartar
- El sistema debe capturar errores críticos con error boundary y mostrar opción de recuperación
- Al limpiar errores, el sistema debe remover notificaciones y restaurar funcionalidad normal


### 3.15 Animaciones y Transiciones

**RF-023: Transiciones de Página**
- El sistema debe animar transiciones entre secciones principales con efectos de fade y slide
- El sistema debe actualizar contenido sin transiciones completas dentro de la misma sección
- Las animaciones deben completarse en 400 milisegundos
- El sistema debe cancelar animaciones incompletas al navegar rápidamente
- Las grillas de productos deben mostrar animaciones escalonadas

### 3.16 Estados de Stock

**RF-024: Indicadores de Stock**
- El sistema debe mostrar badge verde "Disponible" para productos con stock > 5
- El sistema debe mostrar badge rojo "Sin Stock" para productos con stock = 0
- El sistema debe mostrar badge amarillo "Bajo Stock" para productos con stock 1-5
- Los indicadores visuales deben ser consistentes en todas las vistas
- El sistema debe actualizar el display inmediatamente cuando cambia el stock

### 3.17 URLs y Routing

**RF-025: URLs Semánticas**
- El sistema debe generar URLs con slug de categoría al acceder a una categoría
- El sistema debe generar URLs con slug de categoría y SKU de producto al acceder a un producto
- Los SKUs deben generarse de forma consistente desde nombre y marca del producto
- El sistema debe mantener estructura semántica al compartir URLs
- El sistema debe mantener compatibilidad con URLs legacy

---

## 4. ARQUITECTURA DEL SISTEMA

### 4.1 Arquitectura de Alto Nivel

```
App.jsx (Root)
├── Context Providers
│   ├── StockProvider
│   ├── FilterProvider
│   └── PCBuilderProvider
├── React Router
│   ├── Store Module (/)
│   ├── PC Builder Module (/armatupc/:mode)
│   └── Product Detail Module (/categoria/:slug/:sku)
└── Error Boundary
```


### 4.2 Módulos Principales

**Store Module**
- Header (búsqueda, navegación)
- CategoryFilter (selección de categorías)
- HeroCarousel (productos destacados)
- PCBuilderSection (CTA a PC Builder)
- CategoryProductSection (grilla de categorías)
- ProductGrid (listado de productos)
  - SidebarFilters (filtros específicos de categoría)
  - SortSelector (ordenamiento por precio)
  - ViewToggleButton (cambio grid/list)
  - ProductCard[] (productos individuales)

**PC Builder Module**
- Mode Selection
  - AssistedMode
    - Budget Selection
    - Usage Selection
    - Gaming Details (condicional)
    - Recommendation Display
  - ManualMode
    - CategorySidebar (categorías de componentes)
    - ProductGrid (filtrado por categoría)
    - CompatibleProductCard[] (con indicadores)
    - BuildSummaryPanel (componentes seleccionados)
- Compatibility Engine (capa de validación)

**Product Detail Module**
- ProductImageSection (galería de imágenes)
- ProductInfoCard (información principal)
- SpecsSection (especificaciones técnicas)
- MetodosDePago (métodos de pago)
- SEO Metadata (tags dinámicos)

### 4.3 Gestión de Estado (Context API)

**FilterContext**
- searchQuery: string
- selectedCategory: string | null
- subFilters: Map<string, Set<string>>
- filteredProducts: Product[]
- Métodos: setSearchQuery, setSelectedCategory, handleSubFilterChange, clearSubFilters

**PCBuilderContext**
- mode: 'selection' | 'assisted' | 'manual'
- pcBuild: { cpu, motherboard, ram[], gpu, psu, storage[], case, cooling }
- assistedAnswers: { budget, usage, gamingDetails }
- compatibilityStatus: Map<number, CompatibilityResult>
- warnings: Warning[]
- totalPrice: number
- Métodos: selectComponent, removeComponent, setAssistedAnswer, clearConfiguration, loadConfiguration

**StockContext**
- Métodos: getStockStatus, updateStock


### 4.4 Modelos de Datos

**Product**
```javascript
{
  id: number,
  name: string,
  brand: string,
  category: string,
  price: number,
  stock: number,
  images: string[],
  description: string,
  specifications: Record<string, any>,
  compatibility?: CompatibilitySpecs
}
```

**CompatibilitySpecs**
```javascript
{
  socket?: string,
  chipset?: string,
  chipsetsCompatibles?: string[],
  memoriaRAM?: string,
  tipoMemoriaRAM?: string,
  tipo?: string,
  capacidad_watts?: number,
  consumo_watts?: number,
  tdp?: number
}
```

**CompatibilityResult**
```javascript
{
  compatible: boolean,
  status: 'neutral' | 'green' | 'yellow' | 'red',
  reasons: string[]
}
```

### 4.5 Categorías de Productos

- Fuentes (PSU): IDs 100-199
- Almacenamiento: IDs 200-299
- Procesadores (CPU): IDs 300-399
- Memorias RAM: IDs 400-499
- Mouse: IDs 500-599
- Motherboards: IDs 600-699
- Teclados: IDs 700-799
- Auriculares: IDs 800-899
- Conectividad: IDs 900-999
- Monitores: IDs 1000-1099
- Joystick: IDs 1100-1199
- Refrigeración: IDs 1200-1299

### 4.6 Estructura de URLs

```
/                                    → Home (todas las categorías)
/categoria/{category-slug}           → Vista de categoría
/categoria/{category-slug}/{sku}     → Detalle de producto
/armatupc/manual                     → PC Builder (modo manual)
/armatupc/asistido                   → PC Builder (modo asistido)
```


---

## 5. LÓGICA DE NEGOCIO CRÍTICA

### 5.1 Motor de Compatibilidad

**Validación CPU-Motherboard**
- Verificar que socket del CPU coincida con socket del Motherboard
- Verificar que chipset del Motherboard esté en lista de chipsets compatibles del CPU
- Bloquear selección si hay incompatibilidad

**Validación de RAM**
- Verificar que tipo de RAM (DDR4/DDR5) coincida con tipo soportado por CPU
- Verificar que tipo de RAM coincida con tipo soportado por Motherboard
- Excluir RAM SODIMM (formato laptop)
- Bloquear selección si hay incompatibilidad

**Validación de Consumo Eléctrico**
- Calcular consumo total: CPU + GPU + (RAM × 4W) + (Storage × 5W) + Motherboard (60W) + Cooling (10W)
- Agregar 20% de margen de seguridad
- Verificar que capacidad de PSU sea mayor o igual al consumo total + margen
- Mostrar advertencia si PSU es insuficiente

**Validación de Cooler**
- Verificar que socket del Cooler coincida con socket del CPU
- Verificar que TDP del Cooler sea suficiente para TDP del CPU
- Bloquear selección si hay incompatibilidad

### 5.2 Motor de Recomendaciones

**Algoritmo de Selección de CPU**
1. Determinar rango de presupuesto para CPU según uso:
   - Gaming: 25-40% del presupuesto total
   - Trabajo: 25-35% del presupuesto total
   - Multimedia: 25-35% del presupuesto total
   - General: 20-30% del presupuesto total

2. Filtrar CPUs en rango de presupuesto

3. Scoring de CPUs (0-100 puntos):
   - Núcleos (30%): más núcleos = mayor score
   - Uso específico (35%): optimizar según Gaming/Trabajo/Multimedia/General
   - Eficiencia de presupuesto (20%): usar mayor porcentaje del presupuesto asignado
   - Generación (15%): CPUs más recientes obtienen mayor score

4. Seleccionar CPU con mayor score


**Algoritmo de Selección de Motherboard**
1. Filtrar motherboards con socket compatible con CPU seleccionado
2. Filtrar motherboards con tipo de RAM compatible con CPU
3. Filtrar motherboards dentro del presupuesto restante

4. Scoring de Motherboards (0-280 puntos):
   - Socket compatible (100 puntos): crítico
   - Tipo de RAM compatible (100 puntos): crítico
   - Presupuesto (50 puntos): usar eficientemente el presupuesto
   - Features (30 puntos): WiFi, Bluetooth, tamaño ATX, chipset moderno

5. Seleccionar Motherboard con mayor score

**Algoritmo de Selección de RAM**
1. Filtrar RAM con tipo compatible (DDR4/DDR5)
2. Excluir RAM SODIMM (formato laptop)
3. Filtrar RAM dentro del presupuesto restante

4. Scoring de RAM (0-270 puntos):
   - Tipo compatible (100 puntos): crítico
   - Presupuesto (50 puntos): permitir 15% de flexibilidad
   - Capacidad según uso (80 puntos):
     - Gaming/Multimedia: priorizar 32GB > 16GB > 8GB
     - Trabajo: priorizar 32GB > 16GB > 8GB
     - General: priorizar 16GB > 8GB > 32GB
   - Velocidad (40 puntos): mayor velocidad = mayor score

5. Seleccionar RAM con mayor score

**Algoritmo de Selección de PSU**
1. Calcular wattaje requerido: (TDP_CPU × 2) + 150W (mínimo 400W)
2. Filtrar PSUs con capacidad >= wattaje requerido × 0.85
3. Filtrar PSUs dentro del presupuesto restante

4. Scoring de PSUs (0-220 puntos):
   - Capacidad de wattaje (100 puntos): mayor margen = mayor score
   - Certificación (50 puntos): Titanium > Platinum > Gold > Bronze > White
   - Presupuesto (50 puntos): dentro del presupuesto
   - Modularidad (20 puntos): Full Modular > Semi Modular > No Modular

5. Seleccionar PSU con mayor score


### 5.3 Detección de Bottlenecks

**Criterios de Bottleneck CPU-GPU**
- Comparar tier de rendimiento de CPU vs GPU
- Si diferencia de tier > 2 niveles: bottleneck detectado
- Identificar componente limitante (CPU o GPU)
- Generar advertencia pero permitir selección
- Marcar con indicador amarillo

**Estados de Compatibilidad**
- Verde: Todos los componentes compatibles, sin bottlenecks
- Amarillo: Componentes compatibles pero con advertencia de bottleneck
- Rojo: Componentes incompatibles, selección bloqueada
- Neutral: Sin suficientes componentes para validar

### 5.4 Cálculo de Precio Total

```javascript
totalPrice = 
  (cpu?.price || 0) +
  (motherboard?.price || 0) +
  ram.reduce((sum, item) => sum + (item?.price || 0), 0) +
  (gpu?.price || 0) +
  (psu?.price || 0) +
  storage.reduce((sum, item) => sum + (item?.price || 0), 0) +
  (case?.price || 0) +
  (cooling?.price || 0)
```

### 5.5 Generación de SKU

```javascript
function generateSKU(name, brand) {
  // Limpiar nombre: solo alfanuméricos, max 4 palabras
  const cleanName = name.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .split(/\s+/)
    .slice(0, 4)
    .join('-');
  
  // Limpiar marca: solo alfanuméricos
  const cleanBrand = brand.toLowerCase()
    .replace(/[^a-z0-9]/g, '');
  
  return `${cleanBrand}-${cleanName}`;
}
```

### 5.6 Determinación de Estado de Stock

```javascript
function getStockStatus(quantity) {
  if (quantity === 0) return 'Sin Stock';      // Rojo
  if (quantity >= 1 && quantity <= 5) return 'Bajo Stock';  // Amarillo
  if (quantity > 5) return 'Disponible';       // Verde
}
```


---

## 6. REQUISITOS NO FUNCIONALES

### 6.1 Performance

**RNF-001: Tiempo de Carga**
- La página inicial debe cargar en menos de 3 segundos en conexión 3G
- Las transiciones entre páginas deben completarse en menos de 400ms
- La búsqueda en tiempo real debe responder en menos de 100ms

**RNF-002: Optimización**
- Implementar code splitting por rutas
- Implementar lazy loading de imágenes
- Usar formato WebP para imágenes
- Implementar memoización en componentes costosos
- Debouncing en input de búsqueda (300ms)

### 6.2 SEO

**RNF-003: Optimización para Motores de Búsqueda**
- Generar meta tags dinámicos para cada página
- Incluir datos estructurados Schema.org en JSON-LD
- Generar sitemap.xml automáticamente en cada build
- Implementar Open Graph y Twitter Cards
- URLs semánticas y amigables
- Títulos y descripciones únicos por página

### 6.3 Accesibilidad

**RNF-004: WCAG 2.1 Nivel AA**
- Contraste de colores mínimo 4.5:1
- Navegación completa por teclado
- Etiquetas ARIA apropiadas
- Textos alternativos en imágenes
- Skip to content link
- Focus visible en elementos interactivos

### 6.4 Seguridad

**RNF-005: Seguridad de Datos**
- Sanitizar queries de búsqueda para prevenir XSS
- Validar parámetros de URL antes de routing
- Escapar contenido generado por usuario
- HTTPS obligatorio en producción
- No almacenar datos sensibles en localStorage


### 6.5 Compatibilidad

**RNF-006: Navegadores Soportados**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Navegadores móviles modernos (iOS Safari 14+, Chrome Mobile)

**RNF-007: Dispositivos**
- Desktop: 1920×1080 y superiores
- Laptop: 1366×768 y superiores
- Tablet: 768×1024 (portrait y landscape)
- Mobile: 375×667 y superiores

### 6.6 Mantenibilidad

**RNF-008: Código**
- Componentes React modulares y reutilizables
- Separación clara de responsabilidades
- Documentación inline en funciones complejas
- Nombres descriptivos de variables y funciones
- Máximo 300 líneas por componente

**RNF-009: Testing**
- Cobertura mínima de 70% en lógica de negocio
- Unit tests para funciones puras
- Property-based tests para validaciones críticas
- Integration tests para flujos principales

### 6.7 Escalabilidad

**RNF-010: Capacidad**
- Soportar catálogo de hasta 10,000 productos
- Soportar hasta 50 categorías
- Soportar hasta 20 filtros simultáneos
- Tiempo de respuesta constante independiente del tamaño del catálogo

---

## 7. CASOS DE USO PRINCIPALES

### 7.1 UC-001: Buscar Producto por Nombre

**Actor**: Usuario  
**Precondición**: Usuario está en la página principal  
**Flujo Principal**:
1. Usuario escribe "ryzen" en la barra de búsqueda
2. Sistema filtra productos en tiempo real
3. Sistema muestra solo productos que contienen "ryzen" en nombre, marca o especificaciones
4. Usuario ve lista filtrada de procesadores Ryzen

**Postcondición**: Lista de productos filtrada por búsqueda


### 7.2 UC-002: Armar PC con Modo Asistido

**Actor**: Usuario principiante  
**Precondición**: Usuario accede al PC Builder  
**Flujo Principal**:
1. Usuario selecciona "Modo Asistido"
2. Sistema solicita presupuesto
3. Usuario selecciona "Medio" ($150,000 - $250,000)
4. Sistema solicita uso
5. Usuario selecciona "Gaming"
6. Sistema solicita detalles de gaming
7. Usuario selecciona "1080p" y "60 FPS"
8. Sistema genera configuración completa:
   - CPU: AMD Ryzen 5 5600
   - Motherboard: Gigabyte B550M
   - RAM: Kingston Fury 16GB DDR4
   - PSU: Thermaltake 600W
   - Storage: SSD NVMe 500GB
   - Cooling: Cooler incluido con CPU
9. Sistema muestra precio total: $220,000
10. Usuario ve configuración completa y puede ajustar manualmente

**Postcondición**: Configuración de PC completa y compatible generada

### 7.3 UC-003: Validar Compatibilidad en Modo Manual

**Actor**: Usuario avanzado  
**Precondición**: Usuario está en PC Builder modo manual  
**Flujo Principal**:
1. Usuario selecciona CPU: Intel Core i5-12400 (Socket LGA1700, DDR4)
2. Sistema actualiza compatibilidad de todas las categorías
3. Usuario selecciona categoría Motherboards
4. Sistema muestra:
   - Motherboards LGA1700 con indicador verde (compatibles)
   - Motherboards AM4 con indicador rojo y mensaje "Socket incompatible" (bloqueadas)
5. Usuario selecciona Motherboard compatible: ASUS B660M (LGA1700, DDR4)
6. Sistema avanza automáticamente a categoría RAM
7. Usuario ve:
   - RAM DDR4 con indicador verde (compatible)
   - RAM DDR5 con indicador rojo y mensaje "Tipo de RAM incompatible" (bloqueada)
8. Usuario selecciona RAM DDR4 16GB
9. Sistema actualiza resumen con precio total

**Postcondición**: Componentes compatibles seleccionados, incompatibles bloqueados


### 7.4 UC-004: Detectar Bottleneck

**Actor**: Usuario  
**Precondición**: Usuario tiene CPU y GPU seleccionados  
**Flujo Principal**:
1. Usuario selecciona CPU de gama alta: Intel Core i9-13900K
2. Usuario selecciona GPU de gama baja: GTX 1650
3. Sistema detecta desbalance significativo
4. Sistema muestra advertencia amarilla: "Bottleneck detectado: GPU limitará rendimiento del CPU"
5. Sistema permite la selección pero marca con indicador amarillo
6. Usuario ve advertencia en panel de resumen

**Postcondición**: Advertencia de bottleneck mostrada, selección permitida

### 7.5 UC-005: Ver Detalle de Producto con SEO

**Actor**: Usuario, Motor de búsqueda  
**Precondición**: Usuario hace clic en un producto  
**Flujo Principal**:
1. Usuario hace clic en "AMD Ryzen 5 5600"
2. Sistema navega a `/categoria/procesadores/amd-ryzen-5-5600`
3. Sistema genera meta tags dinámicos:
   - Title: "AMD Ryzen 5 5600 - Procesadores | Shock-Store"
   - Description: "AMD Ryzen 5 5600 - 6 núcleos, 12 hilos, Socket AM4..."
   - Open Graph image, title, description
   - Twitter Card metadata
4. Sistema genera JSON-LD con datos estructurados:
   ```json
   {
     "@type": "Product",
     "name": "AMD Ryzen 5 5600",
     "offers": {
       "@type": "Offer",
       "price": "45000",
       "availability": "InStock"
     }
   }
   ```
5. Usuario ve página de detalle con imágenes, especificaciones, precio
6. Motor de búsqueda indexa correctamente con metadata rica

**Postcondición**: Página de detalle mostrada con SEO optimizado

---

## 8. FLUJOS DE USUARIO

### 8.1 Flujo: Compra Informada

```
Home → Categoría → Filtros → Ordenar por precio → 
Ver detalle → Revisar especificaciones → Contactar por chat
```


### 8.2 Flujo: PC Builder Asistido

```
Home → PC Builder → Modo Asistido → 
Seleccionar presupuesto → Seleccionar uso → 
(Si Gaming: Seleccionar resolución/FPS) →
Ver recomendación → Ajustar manualmente (opcional) →
Contactar por chat
```

### 8.3 Flujo: PC Builder Manual

```
Home → PC Builder → Modo Manual →
Seleccionar CPU → Seleccionar Motherboard →
Seleccionar RAM → Seleccionar PSU →
Seleccionar Storage → Seleccionar Cooling →
Ver resumen con precio total →
Contactar por chat
```

### 8.4 Flujo: Búsqueda Rápida

```
Home → Escribir en búsqueda → 
Ver resultados filtrados → 
Aplicar filtros adicionales →
Ver detalle de producto
```

---

## 9. WIREFRAMES Y MOCKUPS

### 9.1 Home Page

```
┌─────────────────────────────────────────┐
│ [Logo] Shock-Store    [Búsqueda] [Chat]│
├─────────────────────────────────────────┤
│ [Categorías: Todos | CPU | MB | RAM...] │
├─────────────────────────────────────────┤
│                                         │
│     ┌─────────────────────────────┐    │
│     │   Hero Carousel             │    │
│     │   [Producto Destacado]      │    │
│     └─────────────────────────────┘    │
│                                         │
│  ┌──────────────┐  ┌──────────────┐   │
│  │ PC Builder   │  │ PC Builder   │   │
│  │ Asistido     │  │ Manual       │   │
│  └──────────────┘  └──────────────┘   │
│                                         │
│  Categorías de Productos               │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐         │
│  │CPU │ │ MB │ │RAM │ │GPU │ ...     │
│  └────┘ └────┘ └────┘ └────┘         │
│                                         │
└─────────────────────────────────────────┘
```


### 9.2 Vista de Categoría con Productos

```
┌─────────────────────────────────────────────────────┐
│ [Logo] Shock-Store    [Búsqueda] [Chat]            │
├─────────────────────────────────────────────────────┤
│ [Categorías: Procesadores ▼]                        │
├──────────┬──────────────────────────────────────────┤
│ Filtros  │  [Grid/List] [Ordenar: Precio ▼]        │
│          │                                          │
│ Marca    │  ┌────────┐ ┌────────┐ ┌────────┐      │
│ □ AMD    │  │ [IMG]  │ │ [IMG]  │ │ [IMG]  │      │
│ □ Intel  │  │ Ryzen  │ │ i5     │ │ Ryzen  │      │
│          │  │ 5 5600 │ │ 12400  │ │ 7 5800 │      │
│ Socket   │  │$45,000 │ │$52,000 │ │$68,000 │      │
│ □ AM4    │  │🟢Stock │ │🟢Stock │ │🟡Bajo  │      │
│ □ AM5    │  └────────┘ └────────┘ └────────┘      │
│ □ 1700   │                                          │
│          │  ┌────────┐ ┌────────┐ ┌────────┐      │
│ [Limpiar]│  │ [IMG]  │ │ [IMG]  │ │ [IMG]  │      │
│          │  │ ...    │ │ ...    │ │ ...    │      │
└──────────┴──────────────────────────────────────────┘
```

### 9.3 PC Builder - Modo Manual

```
┌─────────────────────────────────────────────────────┐
│ [Logo] Shock-Store    [Volver] [Modo: Manual ▼]    │
├──────────┬──────────────────────────┬───────────────┤
│ Categorías│  Productos              │ Resumen       │
│          │                          │               │
│ ✓ CPU    │  ┌────────────────────┐ │ CPU:          │
│   MB     │  │ 🟢 Ryzen 5 5600    │ │ Ryzen 5 5600  │
│   RAM    │  │ Socket AM4, DDR4   │ │ $45,000       │
│   GPU    │  │ $45,000            │ │               │
│   PSU    │  │ [Seleccionar]      │ │ MB:           │
│   Storage│  └────────────────────┘ │ -             │
│   Cooling│                          │               │
│          │  ┌────────────────────┐ │ RAM:          │
│          │  │ 🟢 Ryzen 7 5800X   │ │ -             │
│          │  │ Socket AM4, DDR4   │ │               │
│          │  │ $68,000            │ │ Total:        │
│          │  │ [Seleccionar]      │ │ $45,000       │
│          │  └────────────────────┘ │               │
│          │                          │ [Limpiar]     │
│          │  ┌────────────────────┐ │               │
│          │  │ 🔴 i5-12400        │ │               │
│          │  │ Socket 1700, DDR4  │ │               │
│          │  │ ⚠️ Socket incomp.  │ │               │
│          │  │ [Bloqueado]        │ │               │
│          │  └────────────────────┘ │               │
└──────────┴──────────────────────────┴───────────────┘
```


### 9.4 PC Builder - Modo Asistido

```
┌─────────────────────────────────────────┐
│ [Logo] Shock-Store    [Volver]         │
├─────────────────────────────────────────┤
│                                         │
│  ¡Ayúdame a armar mi PC!               │
│                                         │
│  Paso 1: ¿Cuál es tu presupuesto?      │
│                                         │
│  ┌─────────────┐  ┌─────────────┐     │
│  │ Económico   │  │ Medio       │     │
│  │ $80k-$150k  │  │ $150k-$250k │     │
│  └─────────────┘  └─────────────┘     │
│                                         │
│  ┌─────────────┐  ┌─────────────┐     │
│  │ Alto        │  │ Premium     │     │
│  │ $250k-$400k │  │ $400k+      │     │
│  └─────────────┘  └─────────────┘     │
│                                         │
│              [Siguiente]                │
│                                         │
└─────────────────────────────────────────┘
```

### 9.5 Detalle de Producto

```
┌─────────────────────────────────────────────────────┐
│ [Logo] Shock-Store    [Búsqueda] [Chat]            │
├─────────────────────────────────────────────────────┤
│ Home > Procesadores > AMD Ryzen 5 5600             │
├──────────────────┬──────────────────────────────────┤
│                  │  AMD Ryzen 5 5600                │
│  ┌────────────┐ │  Marca: AMD                       │
│  │            │ │                                   │
│  │  [Imagen]  │ │  $45,000                          │
│  │  Principal │ │  🟢 Disponible                    │
│  │            │ │                                   │
│  └────────────┘ │  Especificaciones:                │
│                  │  • Socket: AM4                    │
│  [◀] [▶]        │  • Núcleos: 6                     │
│  [🔲][🔲][🔲]   │  • Hilos: 12                      │
│                  │  • Frecuencia: 3.5 GHz            │
│                  │  • TDP: 65W                       │
│                  │  • Memoria: DDR4                  │
│                  │                                   │
│                  │  Métodos de Pago:                 │
│                  │  💳 Tarjeta | 💵 Efectivo         │
│                  │                                   │
│                  │  [Contactar por WhatsApp]         │
└──────────────────┴──────────────────────────────────┘
```

---

## 10. ESTRATEGIA DE TESTING

### 10.1 Unit Testing

**Herramientas**: Vitest, @testing-library/react

**Cobertura**:
- Componentes individuales (render, props, eventos)
- Context providers (state management)
- Funciones utilitarias (slugify, SKU generation)
- Lógica de filtros y ordenamiento
- Cálculos de precio
- Determinación de estado de stock


### 10.2 Property-Based Testing

**Herramienta**: fast-check

**Configuración**:
- Mínimo 100 iteraciones por propiedad
- Cada test debe incluir comentario con formato: `// Feature: shock-store-complete, Property {N}: {descripción}`
- Generadores personalizados (arbitraries) para productos, builds, filtros

**Propiedades Críticas a Testear**:

1. **Navegación y Filtrado**
   - Filtrado por categoría solo muestra productos de esa categoría
   - Búsqueda solo retorna productos que contienen el query
   - Múltiples filtros aplican intersección (AND lógico)
   - Limpiar filtros restaura lista original

2. **Ordenamiento**
   - Orden ascendente: cada precio ≤ siguiente precio
   - Orden descendente: cada precio ≥ siguiente precio
   - Ordenar no cambia qué productos están en la lista

3. **Compatibilidad**
   - CPU y Motherboard con sockets diferentes → incompatible
   - RAM tipo diferente a Motherboard → incompatible
   - Consumo total + 20% > capacidad PSU → incompatible
   - Cooler socket diferente a CPU → incompatible

4. **Cálculo de Precio**
   - Precio total = suma de precios individuales
   - Remover componente reduce precio total correctamente

5. **SKU Generation**
   - Mismo nombre + marca → mismo SKU (determinismo)
   - SKU solo contiene caracteres alfanuméricos y guiones

6. **Stock Status**
   - stock > 5 → "Disponible"
   - stock = 0 → "Sin Stock"
   - 1 ≤ stock ≤ 5 → "Bajo Stock"

### 10.3 Integration Testing

**Flujos a Testear**:
- Context interactions con componentes
- Navegación entre rutas
- Compatibility engine con PC Builder
- Recommendation engine con datos de productos
- SEO metadata generation pipeline


### 10.4 Edge Cases

**Casos Específicos a Testear**:
- Listas de productos vacías
- Productos sin especificaciones
- Valores de precio extremos (0, negativos, muy altos)
- Combinaciones máximas de filtros
- Todas las combinaciones de incompatibilidad
- PC builds vacíos
- URLs inválidas o malformadas
- Búsquedas con caracteres especiales
- Productos sin imágenes
- Categorías sin productos

---

## 11. PLAN DE DEPLOYMENT

### 11.1 Proceso de Build

```bash
npm run build
# Ejecuta:
# 1. vite build (optimización y bundling)
# 2. node scripts/generate-sitemap.js (genera sitemap.xml)
# 3. Genera archivos en /dist
```

### 11.2 GitHub Actions CI/CD

**Trigger**: Push a rama `main`

**Pipeline**:
1. Checkout código
2. Instalar dependencias (`npm install`)
3. Ejecutar tests (`npm test`)
4. Build producción (`npm run build`)
5. Deploy a GitHub Pages (rama `gh-pages`)

### 11.3 Configuración de Producción

**Variables de Entorno**:
- `VITE_GA_ID`: Google Analytics ID (G-3QWBT9X9KE)
- `VITE_TAWK_ID`: Tawk.to Widget ID
- `BASE_URL`: URL base para GitHub Pages

**Optimizaciones**:
- Minificación de JS/CSS
- Tree-shaking de código no usado
- Compresión gzip/brotli
- Cache de assets estáticos
- Lazy loading de rutas

### 11.4 Monitoreo

**Google Analytics**:
- Pageviews por ruta
- Eventos de interacción (clicks, búsquedas)
- Tiempo en página
- Tasa de rebote
- Conversiones (contactos por chat)


---

## 12. ROADMAP Y FASES

### Fase 1: MVP (Completado) ✅
- Catálogo de productos con búsqueda y filtros
- Navegación por categorías
- Páginas de detalle de productos
- PC Builder modo manual con validación de compatibilidad
- PC Builder modo asistido con recomendaciones
- SEO básico (meta tags, sitemap)
- Responsive design
- Deploy en GitHub Pages

### Fase 2: Mejoras de UX (Futuro)
- Comparador de productos
- Historial de precios
- Wishlist / Lista de deseos
- Configuraciones guardadas de PC Builder
- Compartir configuraciones por URL
- Modo oscuro / claro

### Fase 3: Features Avanzadas (Futuro)
- Cuentas de usuario
- Carrito de compras
- Sistema de reviews y ratings
- Notificaciones de stock
- Alertas de precio
- Recomendaciones personalizadas basadas en historial

### Fase 4: Optimizaciones (Futuro)
- Server-Side Rendering (SSR)
- Progressive Web App (PWA)
- GraphQL API
- WebSocket para actualizaciones en tiempo real
- A/B testing framework
- Analytics avanzado

---

## 13. RIESGOS Y MITIGACIONES

### Riesgo 1: Datos de Productos Incompletos
**Impacto**: Alto  
**Probabilidad**: Media  
**Mitigación**:
- Validación de datos en carga
- Valores por defecto para campos opcionales
- Logging de productos con datos faltantes
- UI graceful para especificaciones faltantes

### Riesgo 2: Incompatibilidades No Detectadas
**Impacto**: Alto  
**Probabilidad**: Media  
**Mitigación**:
- Property-based testing exhaustivo
- Validación múltiple (socket, chipset, RAM, PSU)
- Logging de casos edge
- Feedback de usuarios para mejorar validaciones


### Riesgo 3: Performance con Catálogo Grande
**Impacto**: Medio  
**Probabilidad**: Alta  
**Mitigación**:
- Paginación o scroll infinito
- Virtualización de listas largas
- Memoización agresiva
- Debouncing en búsqueda
- Lazy loading de imágenes

### Riesgo 4: SEO No Efectivo
**Impacto**: Alto  
**Probabilidad**: Baja  
**Mitigación**:
- Validación de meta tags con herramientas (Google Search Console)
- Testing de structured data
- Monitoreo de rankings
- Iteración basada en analytics

### Riesgo 5: Errores en Recomendaciones
**Impacto**: Alto  
**Probabilidad**: Media  
**Mitigación**:
- Testing exhaustivo del motor de recomendaciones
- Logging de todas las recomendaciones generadas
- Feedback de usuarios
- Fallbacks múltiples en algoritmo de selección

---

## 14. MÉTRICAS DE ÉXITO

### 14.1 Métricas de Producto

**Engagement**:
- Tiempo promedio en sitio: > 3 minutos
- Páginas por sesión: > 4
- Tasa de rebote: < 50%
- Uso de PC Builder: > 20% de visitantes

**Conversión**:
- Clicks en "Contactar": > 5% de visitantes
- Configuraciones completadas en PC Builder: > 30% de usuarios que inician
- Productos vistos en detalle: > 40% de visitantes

### 14.2 Métricas Técnicas

**Performance**:
- Lighthouse Score: > 90
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

**Calidad**:
- Cobertura de tests: > 70%
- Errores en producción: < 1% de sesiones
- Uptime: > 99.5%


### 14.3 Métricas de Negocio

**Tráfico**:
- Visitantes únicos mensuales: objetivo según estrategia de marketing
- Tráfico orgánico: > 40% del total
- Retorno de visitantes: > 25%

**SEO**:
- Páginas indexadas: 100% del catálogo
- Posicionamiento para keywords objetivo: Top 10
- Click-through rate desde búsqueda: > 3%

---

## 15. DEPENDENCIAS Y LIMITACIONES

### 15.1 Dependencias Externas

**Servicios de Terceros**:
- Tawk.to (chat en vivo): Dependencia crítica para soporte
- Google Analytics: Dependencia para métricas
- GitHub Pages: Dependencia para hosting

**Librerías Principales**:
- React 18: Framework base
- React Router DOM: Navegación
- TailwindCSS: Estilos
- Framer Motion: Animaciones
- fast-check: Property-based testing

### 15.2 Limitaciones Conocidas

**Técnicas**:
- Sin backend: No hay persistencia de datos de usuario
- Sin autenticación: No hay cuentas de usuario
- Sin carrito: No hay funcionalidad de e-commerce completa
- Datos estáticos: Productos definidos en código, no en base de datos

**Funcionales**:
- PC Builder no incluye GPU en recomendaciones automáticas (presupuesto limitado)
- Validación de compatibilidad limitada a reglas implementadas
- Sin soporte para múltiples idiomas
- Sin modo offline

**Escalabilidad**:
- Catálogo limitado por tamaño de bundle
- Filtrado en cliente (no en servidor)
- Sin paginación en listados

---

## 16. GLOSARIO TÉCNICO

**SPA (Single Page Application)**: Aplicación web que carga una sola página HTML y actualiza dinámicamente el contenido

**SSR (Server-Side Rendering)**: Renderizado de páginas en el servidor antes de enviarlas al cliente

**PWA (Progressive Web App)**: Aplicación web que funciona como app nativa con capacidades offline

**SEO (Search Engine Optimization)**: Optimización para motores de búsqueda

**Schema.org**: Vocabulario estándar para datos estructurados en la web

**JSON-LD**: Formato de datos estructurados basado en JSON

**Open Graph**: Protocolo para compartir contenido en redes sociales

**Twitter Cards**: Formato de metadata para compartir en Twitter

**Property-Based Testing**: Testing que verifica propiedades universales con datos generados aleatoriamente

**Arbitrary**: Generador de datos aleatorios para property-based testing

**Context API**: Sistema de gestión de estado global en React

**Code Splitting**: Técnica de dividir el bundle en chunks más pequeños

**Lazy Loading**: Carga diferida de recursos hasta que son necesarios

**Tree Shaking**: Eliminación de código no usado en el bundle final

**Memoization**: Técnica de cacheo de resultados de funciones costosas

**Debouncing**: Técnica de retrasar ejecución hasta que cese la actividad

---

## 17. APÉNDICES

### Apéndice A: Estructura de Directorios

```
shock-store/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .kiro/
│   └── specs/
│       └── shock-store-complete/
├── public/
│   ├── images/
│   ├── robots.txt
│   └── CNAME
├── src/
│   ├── components/
│   │   ├── InventoryApp/
│   │   ├── PCBuilder/
│   │   └── SEO/
│   ├── context/
│   │   ├── FilterContext.jsx
│   │   ├── PCBuilderContext.jsx
│   │   └── StockContext.jsx
│   ├── data/
│   │   └── categories/
│   ├── hooks/
│   ├── Modules/
│   │   ├── Store.jsx
│   │   ├── PCBuilder.jsx
│   │   └── ProductDetailPage.jsx
│   ├── Styles/
│   ├── utils/
│   │   ├── compatibilityEngine.js
│   │   └── slugify.js
│   ├── App.jsx
│   └── main.jsx
├── scripts/
│   ├── generate-sitemap.js
│   └── generate-404.js
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```


### Apéndice B: Comandos Útiles

```bash
# Desarrollo
npm install          # Instalar dependencias
npm run dev          # Servidor de desarrollo (http://localhost:5173)
npm run preview      # Preview del build

# Testing
npm test             # Ejecutar tests una vez
npm run test:watch   # Ejecutar tests en modo watch

# Build y Deploy
npm run build        # Build de producción + sitemap
npm run deploy       # Build + deploy a GitHub Pages

# Utilidades
npm run lint         # Linting con ESLint
npm run clean        # Limpiar cache y builds
npm run analyze      # Analizar tamaño del bundle
```

### Apéndice C: URLs de Referencia

**Producción**: https://shock-store.github.io  
**Repositorio**: https://github.com/shock-store/catalogo  
**Analytics**: Google Analytics Dashboard  
**Chat**: Tawk.to Dashboard  

**Documentación**:
- React: https://react.dev
- Vite: https://vitejs.dev
- TailwindCSS: https://tailwindcss.com
- React Router: https://reactrouter.com
- fast-check: https://fast-check.dev
- Schema.org: https://schema.org

### Apéndice D: Contactos del Proyecto

**Equipo de Desarrollo**:
- Product Owner: [Nombre]
- Tech Lead: [Nombre]
- Frontend Developers: [Nombres]
- QA Engineer: [Nombre]

**Stakeholders**:
- Business Owner: [Nombre]
- Marketing: [Nombre]
- Customer Support: [Nombre]

---

## 18. HISTORIAL DE CAMBIOS

| Versión | Fecha | Autor | Cambios |
|---------|-------|-------|---------|
| 1.0 | 2024-12-20 | Kiro AI | Creación inicial del PRD completo |

---

## 19. APROBACIONES

| Rol | Nombre | Firma | Fecha |
|-----|--------|-------|-------|
| Product Owner | | | |
| Tech Lead | | | |
| Stakeholder | | | |

---

**FIN DEL DOCUMENTO**

---

*Este PRD es un documento vivo y debe actualizarse conforme evoluciona el proyecto.*
