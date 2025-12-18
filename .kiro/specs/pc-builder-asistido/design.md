# Design Document: PC Builder Asistido

## Overview

El PC Builder Asistido es un configurador de PCs que opera completamente en el frontend, diseñado para ofrecer dos experiencias distintas pero complementarias: un modo asistido para usuarios novatos que necesitan guía paso a paso, y un modo manual para usuarios expertos que desean control total con validación en tiempo real.

El sistema se integra con la arquitectura existente de Shock-Store, aprovechando la estructura de datos de productos ya establecida y extendiendo los modelos de datos con campos de compatibilidad técnica. La solución no requiere backend dinámico, utilizando únicamente JavaScript para la lógica de validación y JSON estático para los datos de inventario.

### Objetivos Clave

1. **Experiencia Dual**: Proporcionar dos flujos de usuario claramente diferenciados que se adapten al nivel de conocimiento técnico
2. **Validación en Tiempo Real**: Implementar un motor de compatibilidad que valide socket, chipset, RAM, form factor, consumo eléctrico y dimensiones físicas
3. **Educación del Usuario**: Transformar el proceso de selección en una experiencia de aprendizaje mediante feedback contextual
4. **Integración Transparente**: Mantener coherencia con la UI/UX existente de Shock-Store

## Architecture

### High-Level Architecture

El sistema sigue una arquitectura de componentes React con gestión de estado centralizada, similar al patrón existente en la aplicación:

```
┌─────────────────────────────────────────────────────────────┐
│                     PC Builder Module                        │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐              ┌──────────────┐            │
│  │ Mode Selector│              │ Summary Panel│            │
│  │  Component   │              │  (Persistent)│            │
│  └──────┬───────┘              └──────────────┘            │
│         │                                                    │
│    ┌────┴────┐                                              │
│    │         │                                              │
│ ┌──▼──────┐  ┌▼──────────┐                                 │
│ │ Assisted│  │  Manual   │                                 │
│ │  Mode   │  │   Mode    │                                 │
│ └──┬──────┘  └┬──────────┘                                 │
│    │          │                                             │
│    │          └──────┬──────────────────┐                  │
│    │                 │                  │                  │
│ ┌──▼─────────────┐ ┌─▼──────────────┐ ┌▼────────────────┐ │
│ │ Recommendation │ │ Component      │ │ Compatibility   │ │
│ │    Engine      │ │ Selector       │ │ Validator       │ │
│ └────────────────┘ └────────────────┘ └─────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   Data Layer (JSON)                          │
├─────────────────────────────────────────────────────────────┤
│  Products with Extended Compatibility Fields                 │
│  - socket, chipset, tipo_ram, form_factor                   │
│  - consumo_watts, longitud_mm, uso_principal                │
└─────────────────────────────────────────────────────────────┘
```

### Component Hierarchy


```
PCBuilderApp
├── PCBuilderContext (State Management)
├── ModeSelector
│   ├── AssistedModeButton
│   └── ManualModeButton
├── AssistedMode
│   ├── QuestionFlow
│   │   ├── BudgetQuestion
│   │   ├── UsageQuestion
│   │   └── GamingDetailsQuestion (conditional)
│   └── RecommendationSummary
├── ManualMode
│   ├── CategorySelector
│   ├── ComponentList
│   │   └── ComponentCard (with traffic light indicator)
│   └── CompatibilityTooltip
├── SummaryPanel (persistent across modes)
│   ├── SelectedComponentsList
│   ├── TotalPrice
│   └── ActionButtons
└── VisualizationPanel (optional)
    └── PCVisualization3D

Shared Services:
├── CompatibilityEngine
│   ├── checkCompatibility()
│   ├── detectBottleneck()
│   └── calculatePowerConsumption()
├── RecommendationEngine
│   ├── selectOptimalCPU()
│   ├── selectOptimalGPU()
│   └── buildCompleteConfig()
└── ConfigurationService
    ├── saveConfiguration()
    ├── loadConfiguration()
    └── encodeToURL()
```

## Components and Interfaces

### 1. PCBuilderContext

**Purpose**: Gestión centralizada del estado de la configuración actual

**State Structure**:
```javascript
{
  mode: 'selection' | 'assisted' | 'manual',
  pcBuild: {
    cpu: Product | null,
    motherboard: Product | null,
    ram: Product[] | [],
    gpu: Product | null,
    psu: Product | null,
    storage: Product[] | [],
    case: Product | null,
    cooling: Product | null
  },
  assistedAnswers: {
    budget: { min: number, max: number } | null,
    usage: string | null,
    gamingDetails: { resolution: string, fps: number } | null
  },
  compatibilityStatus: Map<string, CompatibilityResult>,
  totalPrice: number,
  warnings: Warning[]
}
```

**Interface**:
```typescript
interface PCBuilderContextValue {
  state: PCBuilderState;
  selectComponent: (category: string, product: Product) => void;
  removeComponent: (category: string) => void;
  setMode: (mode: Mode) => void;
  setAssistedAnswer: (question: string, answer: any) => void;
  generateRecommendation: () => void;
  clearConfiguration: () => void;
  saveConfiguration: () => string;
  loadConfiguration: (configId: string) => void;
}
```

### 2. CompatibilityEngine

**Purpose**: Motor central de validación de compatibilidad

**Core Function**:
```typescript
interface CompatibilityResult {
  compatible: boolean;
  status: 'green' | 'yellow' | 'red';
  reasons: string[];
  suggestions?: Product[];
}

function checkCompatibility(
  pcBuild: PCBuild,
  candidateProduct: Product,
  category: string
): CompatibilityResult
```

**Validation Rules**:
- Socket Compatibility: CPU.socket === Motherboard.socket
- RAM Type: CPU.memoriaRAM === Motherboard.tipoMemoriaRAM === RAM.tipo
- Form Factor: Motherboard.factorDeForma fits in Case.formFactorSupport
- Power: sum(components.consumo_watts) * 1.2 <= PSU.capacidad_watts
- Physical Dimensions: GPU.longitud_mm <= Case.maxGPULength_mm
- Chipset: CPU.chipsetsCompatibles includes Motherboard.chipset

### 3. RecommendationEngine

**Purpose**: Algoritmo de recomendación para modo asistido

**Algorithm Flow**:
1. Filter products by budget range
2. Filter by uso_principal matching user's usage
3. Select optimal CPU based on usage priority
4. Select optimal GPU based on usage and remaining budget
5. Select compatible Motherboard (socket + chipset match)
6. Select compatible RAM (type match + capacity)
7. Calculate total power consumption
8. Select PSU with 20% overhead
9. Select Case that fits motherboard and GPU
10. Validate entire configuration

**Interface**:
```typescript
interface RecommendationCriteria {
  budget: { min: number, max: number };
  usage: 'Gaming' | 'Trabajo' | 'Multimedia' | 'General';
  gamingDetails?: { resolution: string, fps: number };
}

function generateRecommendation(
  criteria: RecommendationCriteria,
  inventory: Product[]
): PCBuild
```

### 4. Component Traffic Light System

**Purpose**: Sistema visual de indicadores de compatibilidad

**Status Calculation**:
```typescript
function calculateComponentStatus(
  component: Product,
  pcBuild: PCBuild
): 'green' | 'yellow' | 'red' {
  const compatibility = checkCompatibility(pcBuild, component, component.category);
  
  if (!compatibility.compatible) return 'red';
  
  const bottleneck = detectBottleneck(pcBuild, component);
  if (bottleneck.severity === 'high') return 'yellow';
  
  return 'green';
}
```

**Visual Indicators**:
- 🟢 Green: Fully compatible, no warnings
- 🟡 Yellow: Compatible but with performance warnings (bottleneck, overkill)
- 🔴 Red: Incompatible, selection disabled

## Data Models

### Extended Product Schema

Todos los productos existentes deben extenderse con campos de compatibilidad:

```javascript
{
  // Existing fields
  id: number,
  name: string,
  brand: string,
  category: string,
  price: number,
  stock: number,
  
  // New compatibility fields
  compatibility: {
    // CPU specific
    socket?: string,              // "AM5", "LGA1700"
    memoriaRAM?: string,          // "DDR4", "DDR5"
    chipsetsCompatibles?: string[], // ["B650", "X670"]
    consumo_watts?: number,       // TDP
    graficosIntegrados?: boolean,
    
    // Motherboard specific
    chipset?: string,             // "B650", "Z790"
    factorDeForma?: string,       // "ATX", "Micro-ATX", "Mini-ITX"
    tipoMemoriaRAM?: string,      // "DDR4", "DDR5"
    slotsRAM?: number,
    
    // RAM specific
    tipo?: string,                // "DDR4", "DDR5"
    capacidad_gb?: number,
    velocidad_mhz?: number,
    
    // GPU specific
    longitud_mm?: number,
    consumo_watts?: number,
    
    // PSU specific
    capacidad_watts?: number,
    certificacion?: string,       // "80+ Bronze", "80+ Gold"
    
    // Case specific
    formFactorSupport?: string[], // ["ATX", "Micro-ATX"]
    maxGPULength_mm?: number,
    
    // General
    uso_principal?: string[]      // ["Gaming", "Trabajo", "General"]
  }
}
```

### Performance Tier Classification

Para detección de bottlenecks, clasificar componentes por gama:

```javascript
const performanceTiers = {
  cpu: {
    entry: ['Ryzen 3', 'Core i3', 'Ryzen 5 4500'],
    mid: ['Ryzen 5', 'Core i5'],
    high: ['Ryzen 7', 'Core i7'],
    enthusiast: ['Ryzen 9', 'Core i9']
  },
  gpu: {
    entry: ['GTX 1650', 'RX 6500'],
    mid: ['RTX 3060', 'RX 6600'],
    high: ['RTX 4070', 'RX 7800'],
    enthusiast: ['RTX 4090', 'RX 7900']
  }
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Socket Compatibility Invariant
*For any* CPU and Motherboard selected together in pcBuild, the socket types must match exactly.
**Validates: Requirements 3.2, 11.2**

### Property 2: RAM Type Consistency
*For any* configuration with CPU, Motherboard, and RAM modules, all RAM type fields (DDR4/DDR5) must be identical.
**Validates: Requirements 3.3, 11.3**

### Property 3: Power Budget Sufficiency
*For any* complete configuration, the PSU capacity must exceed the sum of all component power consumption by at least 20%.
**Validates: Requirements 3.4, 11.5**

### Property 4: Physical Dimension Compatibility
*For any* configuration with GPU and Case, the GPU length must be less than or equal to the Case's maximum GPU length.
**Validates: Requirements 3.5, 11.6**

### Property 5: Form Factor Compatibility
*For any* configuration with Motherboard and Case, the Motherboard's form factor must be in the Case's supported form factors list.
**Validates: Requirements 11.4**

### Property 6: Budget Constraint Adherence
*For any* assisted mode recommendation with budget range [min, max], the total price of recommended components must fall within that range.
**Validates: Requirements 3.1**

### Property 7: Compatibility Status Completeness
*For any* component selection, checkCompatibility must evaluate and return status for all remaining component categories.
**Validates: Requirements 6.1, 6.2, 11.7**

### Property 8: Traffic Light Correctness
*For any* component with red indicator, the selection must be disabled; for any component with green indicator, selection must be enabled.
**Validates: Requirements 6.3, 6.5, 7.1**

### Property 9: Price Calculation Accuracy
*For any* configuration, the total price must equal the sum of all individual component prices.
**Validates: Requirements 4.2, 9.4**

### Property 10: Configuration Persistence Round-Trip
*For any* configuration saved and then loaded, the loaded configuration must be identical to the original.
**Validates: Requirements 4.5, 13.3, 13.5**

### Property 11: Answer Storage Completeness
*For any* sequence of answers in assisted mode, all answers must be stored in the assistedAnswers state object.
**Validates: Requirements 1.4**

### Property 12: Recommendation Completeness
*For any* valid set of assisted mode answers, the recommendation engine must return a configuration with all essential components (CPU, Motherboard, RAM, PSU).
**Validates: Requirements 1.5, 2.5**

### Property 13: Component Replacement Idempotence
*For any* component category, replacing a component twice with the same new component should result in the same state as replacing it once.
**Validates: Requirements 5.5**

### Property 14: Summary Panel Synchronization
*For any* component addition or removal, the summary panel must update to reflect the current pcBuild state.
**Validates: Requirements 9.2, 9.5**

### Property 15: Bottleneck Detection Symmetry
*For any* CPU-GPU pair where CPU tier >> GPU tier, a bottleneck warning must be generated; similarly for GPU tier >> CPU tier.
**Validates: Requirements 12.1, 12.4**

### Property 16: Stock Status Visibility
*For any* component displayed in the UI, the stock status must be visible and accurate.
**Validates: Requirements 14.1, 14.2**

### Property 17: Out-of-Stock Warning Propagation
*For any* configuration containing out-of-stock components, warnings must appear in the summary panel.
**Validates: Requirements 14.3**

### Property 18: Incompatibility Reason Specificity
*For any* incompatible component, the tooltip must contain at least one specific technical reason for the incompatibility.
**Validates: Requirements 7.3, 7.4, 7.5**

### Property 19: Mode Transition State Preservation
*For any* configuration in assisted mode that transitions to manual mode, all selected components must remain in pcBuild.
**Validates: Requirements 4.4, 4.5**

### Property 20: Category Product Completeness
*For any* category selection in manual mode, all products of that category must be displayed.
**Validates: Requirements 5.2**

## Error Handling

### Validation Errors

**Socket Mismatch**:
```javascript
{
  type: 'SOCKET_MISMATCH',
  message: 'Socket incompatible: CPU requiere {cpuSocket}, Motherboard tiene {mbSocket}',
  severity: 'error',
  blocking: true
}
```

**Insufficient Power**:
```javascript
{
  type: 'INSUFFICIENT_POWER',
  message: 'PSU insuficiente: Consumo total {total}W, Capacidad {capacity}W (déficit: {deficit}W)',
  severity: 'error',
  blocking: true
}
```

**Performance Bottleneck**:
```javascript
{
  type: 'BOTTLENECK_WARNING',
  message: 'Advertencia: {component1} puede limitar el rendimiento de {component2}',
  severity: 'warning',
  blocking: false
}
```

### Data Loading Errors

- Graceful degradation si faltan campos de compatibilidad
- Logging de productos con datos incompletos
- Fallback a validación básica si campos opcionales faltan

### User Input Errors

- Validación de rangos de presupuesto
- Manejo de selecciones vacías
- Prevención de configuraciones incompletas al guardar

## Testing Strategy

### Unit Testing

**Framework**: Vitest (ya utilizado en el proyecto)

**Test Coverage**:
- CompatibilityEngine: Todas las reglas de validación individuales
- RecommendationEngine: Algoritmo de selección con diferentes criterios
- Price calculation: Suma correcta de precios
- State management: Acciones del contexto
- Component status calculation: Lógica de semáforo

**Example Unit Tests**:
```javascript
describe('CompatibilityEngine', () => {
  test('rejects CPU-Motherboard with mismatched sockets', () => {
    const cpu = { socket: 'AM5' };
    const motherboard = { socket: 'AM4' };
    const result = checkSocketCompatibility(cpu, motherboard);
    expect(result.compatible).toBe(false);
  });
  
  test('accepts CPU-Motherboard with matching sockets', () => {
    const cpu = { socket: 'AM5' };
    const motherboard = { socket: 'AM5' };
    const result = checkSocketCompatibility(cpu, motherboard);
    expect(result.compatible).toBe(true);
  });
});
```

### Property-Based Testing

**Framework**: fast-check (JavaScript PBT library)

**Configuration**: Minimum 100 iterations per property test

**Test Tagging Format**: `// Feature: pc-builder-asistido, Property {N}: {description}`

**Key Properties to Test**:

1. **Socket Compatibility** (Property 1)
2. **RAM Type Consistency** (Property 2)
3. **Power Budget** (Property 3)
4. **Physical Dimensions** (Property 4)
5. **Configuration Round-Trip** (Property 10)
6. **Price Calculation** (Property 9)

**Example Property Test**:
```javascript
import fc from 'fast-check';

// Feature: pc-builder-asistido, Property 1: Socket Compatibility Invariant
test('CPU and Motherboard must have matching sockets', () => {
  fc.assert(
    fc.property(
      fc.record({
        cpu: cpuArbitrary(),
        motherboard: motherboardArbitrary()
      }),
      ({ cpu, motherboard }) => {
        const pcBuild = { cpu, motherboard };
        const isValid = validateConfiguration(pcBuild);
        
        if (isValid) {
          // If configuration is valid, sockets must match
          expect(cpu.compatibility.socket).toBe(motherboard.compatibility.socket);
        }
        return true;
      }
    ),
    { numRuns: 100 }
  );
});
```

### Integration Testing

- Flujo completo de modo asistido
- Transición entre modos
- Guardado y carga de configuraciones
- Interacción con datos reales del inventario

### Manual Testing Checklist

- Verificar indicadores visuales en diferentes estados
- Probar tooltips de incompatibilidad
- Validar responsive design en móviles
- Verificar accesibilidad (keyboard navigation, screen readers)

## Implementation Notes

### Phase 1: Data Migration
- Extender productos existentes con campos de compatibilidad
- Crear script de migración para agregar campos faltantes
- Validar integridad de datos

### Phase 2: Core Engine
- Implementar CompatibilityEngine
- Implementar RecommendationEngine
- Crear tests unitarios y de propiedades

### Phase 3: UI Components
- Crear componentes de modo asistido
- Crear componentes de modo manual
- Implementar sistema de semáforo

### Phase 4: Integration
- Integrar con Store existente
- Agregar rutas y navegación
- Implementar persistencia de configuración

### Phase 5: Polish
- Agregar visualización 3D (opcional)
- Optimizar rendimiento
- Mejorar accesibilidad
