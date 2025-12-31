# PuntosRetiro Components

Componentes modulares para la página de Puntos de Retiro, siguiendo principios SOLID.

## Estructura

```
PuntosRetiro/
├── constants.js              # Datos estáticos (puntos de retiro y reglas)
├── index.jsx                 # Barrel export de todos los componentes
├── HeroSection.jsx           # Sección hero con título y botón volver
├── ImportantRulesSection.jsx # Sección de reglas importantes
├── RuleCard.jsx              # Card individual de regla
├── PickupPointsGrid.jsx      # Grid de puntos de retiro
├── PickupPointCard.jsx       # Card individual de punto de retiro
├── SecurityFeatures.jsx      # Features de seguridad de cada punto
├── ScheduleGrid.jsx          # Grid de horarios
└── AdditionalInfoSection.jsx # Sección de información adicional
```

## Principios SOLID Aplicados

### Single Responsibility Principle (SRP)
- Cada componente tiene una única responsabilidad
- `HeroSection`: Solo maneja la presentación del hero
- `RuleCard`: Solo renderiza una regla individual
- `PickupPointCard`: Solo renderiza un punto de retiro
- `SecurityFeatures`: Solo muestra características de seguridad
- `ScheduleGrid`: Solo muestra horarios

### Open/Closed Principle (OCP)
- Los componentes reciben props para ser configurables
- Se pueden extender sin modificar el código existente
- Los datos están separados en `constants.js`

### Liskov Substitution Principle (LSP)
- Los componentes son intercambiables y predecibles
- Todos siguen el mismo patrón de props

### Interface Segregation Principle (ISP)
- Cada componente recibe solo las props que necesita
- No hay props innecesarias

### Dependency Inversion Principle (DIP)
- Los componentes dependen de abstracciones (props)
- No hay dependencias directas entre componentes hermanos
- El módulo principal orquesta la composición

## Uso

```jsx
import {
  HeroSection,
  ImportantRulesSection,
  PickupPointsGrid,
  AdditionalInfoSection
} from '../components/PuntosRetiro';
import { PICKUP_POINTS, IMPORTANT_RULES } from '../components/PuntosRetiro/constants';

// En el componente
<HeroSection onBack={handleGoHome} />
<ImportantRulesSection rules={IMPORTANT_RULES} />
<PickupPointsGrid pickupPoints={PICKUP_POINTS} />
<AdditionalInfoSection />
```

## Ventajas

- **Mantenibilidad**: Cada componente es pequeño y fácil de entender
- **Reusabilidad**: Los componentes pueden reutilizarse en otros contextos
- **Testabilidad**: Componentes pequeños son más fáciles de testear
- **Escalabilidad**: Fácil agregar nuevos componentes o modificar existentes
- **Separación de concerns**: Lógica, presentación y datos están separados
