# Requirements Document

## Introduction

El PC Builder Asistido es un configurador de PCs que ofrece dos modos de experiencia: un modo guiado para usuarios novatos que necesitan asistencia en la selección de componentes compatibles, y un modo manual para usuarios expertos que desean control total con validación de compatibilidad en tiempo real. El sistema opera completamente en el frontend sin requerir backend dinámico, utilizando datos estáticos en JSON y lógica de validación en JavaScript para garantizar que todas las configuraciones sean técnicamente viables.

## Glossary

- **PC Builder**: Sistema de configuración de computadoras que permite seleccionar componentes individuales
- **Modo Asistido**: Flujo guiado mediante preguntas que recomienda automáticamente componentes compatibles
- **Modo Manual**: Interfaz de selección libre con validación de compatibilidad en tiempo real
- **Socket**: Tipo de conexión física entre CPU y Motherboard (ej: AM5, LGA 1700)
- **Chipset**: Conjunto de circuitos integrados en la motherboard que determina compatibilidad con CPUs
- **Form Factor**: Tamaño y formato estándar de componentes (ej: ATX, Micro-ATX, Mini-ITX)
- **PSU**: Power Supply Unit (Fuente de Poder)
- **Bottleneck**: Desequilibrio de rendimiento donde un componente limita el potencial de otro
- **pcBuild**: Objeto de estado que almacena la configuración actual del usuario
- **Semaforización**: Sistema de indicadores visuales (verde/amarillo/rojo) para mostrar compatibilidad

## Requirements

### Requirement 1

**User Story:** Como usuario nuevo sin conocimientos técnicos, quiero que el sistema me guíe paso a paso en la selección de componentes, para que pueda armar una PC compatible sin cometer errores.

#### Acceptance Criteria

1. WHEN el usuario accede al PC Builder THEN el sistema SHALL mostrar dos opciones claramente diferenciadas: "Ayúdame a armar mi PC (Recomendado para principiantes)" y "Armar PC manualmente (Para expertos)"
2. WHEN el usuario selecciona el modo asistido THEN el sistema SHALL iniciar una secuencia de preguntas de opción múltiple
3. WHEN el sistema presenta una pregunta THEN el sistema SHALL mostrar opciones predefinidas sin permitir entrada de texto libre
4. WHEN el usuario completa todas las preguntas THEN el sistema SHALL almacenar las respuestas en el objeto pcBuild
5. WHEN el usuario finaliza el cuestionario THEN el sistema SHALL generar automáticamente una configuración completa y compatible

### Requirement 2

**User Story:** Como usuario del modo asistido, quiero responder preguntas sobre mi presupuesto y uso previsto, para que el sistema recomiende componentes adecuados a mis necesidades.

#### Acceptance Criteria

1. WHEN el modo asistido inicia THEN el sistema SHALL presentar como primera pregunta la selección de rango de presupuesto
2. WHEN el usuario selecciona un presupuesto THEN el sistema SHALL presentar opciones de uso principal (Gaming, Trabajo, Multimedia, General)
3. WHEN el usuario selecciona "Gaming" como uso THEN el sistema SHALL presentar preguntas adicionales sobre resolución o tasa de FPS deseada
4. WHEN el usuario selecciona un uso no-gaming THEN el sistema SHALL omitir preguntas específicas de gaming
5. WHEN todas las respuestas están completas THEN el sistema SHALL ejecutar el algoritmo de recomendación basado en los criterios especificados

### Requirement 3

**User Story:** Como usuario del modo asistido, quiero que el sistema seleccione automáticamente componentes compatibles entre sí, para que no tenga que preocuparme por incompatibilidades técnicas.

#### Acceptance Criteria

1. WHEN el sistema genera recomendaciones THEN el sistema SHALL seleccionar CPU y GPU dentro del rango de presupuesto especificado
2. WHEN el sistema selecciona una CPU THEN el sistema SHALL seleccionar una Motherboard con socket compatible
3. WHEN el sistema selecciona una Motherboard THEN el sistema SHALL seleccionar RAM del tipo compatible (DDR4 o DDR5)
4. WHEN el sistema calcula consumo total THEN el sistema SHALL seleccionar una PSU con capacidad suficiente más margen de seguridad
5. WHEN el sistema selecciona una GPU THEN el sistema SHALL verificar que la longitud física sea compatible con gabinetes disponibles

### Requirement 4

**User Story:** Como usuario que completó el modo asistido, quiero ver un resumen de la configuración recomendada y poder ajustarla manualmente, para que pueda aprender y personalizar mi PC.

#### Acceptance Criteria

1. WHEN el sistema completa las recomendaciones THEN el sistema SHALL mostrar un resumen con todos los componentes seleccionados
2. WHEN el resumen se muestra THEN el sistema SHALL incluir el precio total de la configuración
3. WHEN el usuario visualiza el resumen THEN el sistema SHALL ofrecer la opción de "Ajustar manualmente"
4. WHEN el usuario selecciona ajustar manualmente THEN el sistema SHALL cargar la configuración en el modo manual
5. WHEN la configuración se carga en modo manual THEN el sistema SHALL mantener todos los componentes previamente seleccionados

### Requirement 5

**User Story:** Como usuario experto, quiero seleccionar componentes manualmente por categoría, para que tenga control total sobre mi configuración.

#### Acceptance Criteria

1. WHEN el usuario accede al modo manual THEN el sistema SHALL mostrar categorías de componentes organizadas lógicamente
2. WHEN el usuario selecciona una categoría THEN el sistema SHALL mostrar todos los productos disponibles de esa categoría
3. WHEN el usuario selecciona un componente THEN el sistema SHALL agregarlo al objeto pcBuild
4. WHEN un componente se agrega THEN el sistema SHALL actualizar el precio total inmediatamente
5. WHEN el usuario cambia un componente ya seleccionado THEN el sistema SHALL reemplazar el componente anterior y recalcular compatibilidad

### Requirement 6

**User Story:** Como usuario del modo manual, quiero ver indicadores visuales de compatibilidad en tiempo real, para que pueda identificar rápidamente qué componentes son compatibles con mi selección actual.

#### Acceptance Criteria

1. WHEN el usuario selecciona un componente THEN el sistema SHALL ejecutar la función checkCompatibility para todos los componentes restantes
2. WHEN el sistema evalúa compatibilidad THEN el sistema SHALL asignar un estado de semáforo (verde, amarillo, rojo) a cada componente disponible
3. WHEN un componente es 100% compatible THEN el sistema SHALL mostrar un indicador verde
4. WHEN un componente es compatible pero con advertencia de rendimiento THEN el sistema SHALL mostrar un indicador amarillo
5. WHEN un componente es incompatible THEN el sistema SHALL mostrar un indicador rojo y deshabilitar la selección

### Requirement 7

**User Story:** Como usuario del modo manual, quiero entender por qué un componente está marcado como incompatible, para que pueda aprender sobre compatibilidad de hardware.

#### Acceptance Criteria

1. WHEN un componente tiene indicador rojo THEN el sistema SHALL deshabilitar la opción de selección
2. WHEN el usuario pasa el cursor sobre un componente incompatible THEN el sistema SHALL mostrar un tooltip explicativo
3. WHEN el tooltip se muestra THEN el sistema SHALL incluir la razón técnica específica de incompatibilidad
4. WHEN existe incompatibilidad de socket THEN el sistema SHALL mostrar mensaje indicando los sockets específicos que no coinciden
5. WHEN existe incompatibilidad de consumo THEN el sistema SHALL mostrar el consumo total versus la capacidad de la PSU

### Requirement 8

**User Story:** Como usuario del modo manual, quiero recibir advertencias cuando selecciono componentes que pueden crear desequilibrios de rendimiento, para que pueda tomar decisiones informadas.

#### Acceptance Criteria

1. WHEN el usuario selecciona un componente que crea desequilibrio THEN el sistema SHALL mostrar una notificación de advertencia
2. WHEN existe un bottleneck potencial THEN el sistema SHALL explicar qué componente limita el rendimiento de otro
3. WHEN la PSU es insuficiente THEN el sistema SHALL mostrar mensaje indicando el déficit de potencia en watts
4. WHEN la advertencia se muestra THEN el sistema SHALL permitir al usuario continuar o cambiar la selección
5. WHEN el usuario confirma una selección con advertencia THEN el sistema SHALL mantener el indicador amarillo visible

### Requirement 9

**User Story:** Como usuario de cualquier modo, quiero ver un resumen persistente de mi configuración actual, para que siempre sepa qué componentes he seleccionado y el costo total.

#### Acceptance Criteria

1. WHEN el usuario está en cualquier modo THEN el sistema SHALL mostrar un panel de resumen visible
2. WHEN un componente se agrega THEN el sistema SHALL actualizar el panel de resumen inmediatamente
3. WHEN el panel muestra componentes THEN el sistema SHALL incluir nombre, imagen miniatura y precio de cada uno
4. WHEN el panel calcula el total THEN el sistema SHALL sumar todos los precios de componentes seleccionados
5. WHEN el usuario elimina un componente THEN el sistema SHALL actualizar el resumen y recalcular el total

### Requirement 10

**User Story:** Como desarrollador del sistema, quiero que todos los datos de productos se almacenen en archivos JSON estáticos, para que el sistema funcione completamente en el frontend sin requerir backend.

#### Acceptance Criteria

1. WHEN el sistema se inicializa THEN el sistema SHALL cargar todos los archivos JSON de inventario
2. WHEN se define un producto THEN el producto SHALL incluir campos de compatibilidad (socket, chipset, tipo_ram, form_factor, consumo_watts, longitud_mm)
3. WHEN se define un producto THEN el producto SHALL incluir campos de negocio (precio, nombre, categoría, uso_principal, stock)
4. WHEN los datos se estructuran THEN el sistema SHALL organizar productos por categoría en archivos separados
5. WHEN el sistema accede a datos THEN el sistema SHALL utilizar únicamente datos cargados en memoria sin llamadas a APIs externas

### Requirement 11

**User Story:** Como desarrollador del sistema, quiero una función central de validación de compatibilidad, para que todas las reglas de compatibilidad se gestionen de forma consistente.

#### Acceptance Criteria

1. WHEN se invoca checkCompatibility THEN la función SHALL recibir el objeto pcBuild como parámetro
2. WHEN checkCompatibility se ejecuta THEN la función SHALL validar compatibilidad de socket entre CPU y Motherboard
3. WHEN checkCompatibility se ejecuta THEN la función SHALL validar compatibilidad de tipo de RAM entre CPU, Motherboard y módulos RAM
4. WHEN checkCompatibility se ejecuta THEN la función SHALL validar que el form_factor de la Motherboard sea compatible con el gabinete
5. WHEN checkCompatibility se ejecuta THEN la función SHALL calcular consumo total y validar contra capacidad de PSU
6. WHEN checkCompatibility se ejecuta THEN la función SHALL validar que la longitud de GPU sea compatible con el gabinete
7. WHEN checkCompatibility completa validaciones THEN la función SHALL retornar un objeto con IDs de componentes compatibles por categoría

### Requirement 12

**User Story:** Como usuario, quiero que el sistema detecte automáticamente bottlenecks potenciales, para que pueda optimizar el balance de rendimiento de mi configuración.

#### Acceptance Criteria

1. WHEN el sistema evalúa rendimiento THEN el sistema SHALL comparar el nivel de gama de CPU versus GPU
2. WHEN una GPU de alta gama se combina con CPU de gama baja THEN el sistema SHALL generar advertencia de bottleneck
3. WHEN una CPU de alta gama se combina con GPU de gama baja THEN el sistema SHALL generar advertencia de subutilización
4. WHEN se detecta desequilibrio THEN el sistema SHALL sugerir alternativas de componentes más balanceados
5. WHEN el desequilibrio es menor THEN el sistema SHALL mostrar indicador amarillo sin bloquear la selección

### Requirement 13

**User Story:** Como usuario, quiero poder guardar y compartir mi configuración, para que pueda consultarla más tarde o compartirla con otros.

#### Acceptance Criteria

1. WHEN el usuario completa una configuración THEN el sistema SHALL ofrecer opción de "Guardar configuración"
2. WHEN el usuario guarda una configuración THEN el sistema SHALL generar un identificador único
3. WHEN se genera el identificador THEN el sistema SHALL codificar la configuración en la URL
4. WHEN el usuario copia la URL THEN el sistema SHALL permitir compartir la configuración mediante el enlace
5. WHEN se accede a una URL con configuración THEN el sistema SHALL cargar automáticamente los componentes especificados

### Requirement 14

**User Story:** Como usuario, quiero ver disponibilidad de stock en tiempo real, para que sepa si puedo comprar la configuración que armé.

#### Acceptance Criteria

1. WHEN el sistema muestra un componente THEN el sistema SHALL indicar el estado de stock actual
2. WHEN un componente está sin stock THEN el sistema SHALL mostrar indicador visual claro
3. WHEN un componente sin stock está en pcBuild THEN el sistema SHALL mostrar advertencia en el resumen
4. WHEN el usuario intenta finalizar con componentes sin stock THEN el sistema SHALL listar los componentes no disponibles
5. WHEN hay componentes sin stock THEN el sistema SHALL sugerir alternativas compatibles disponibles

### Requirement 15

**User Story:** Como usuario, quiero visualizar mi PC de forma gráfica mientras la armo, para que tenga una representación visual de mi configuración.

#### Acceptance Criteria

1. WHEN el usuario selecciona componentes THEN el sistema SHALL actualizar una visualización gráfica de la PC
2. WHEN un componente se agrega THEN el sistema SHALL mostrar una representación visual del componente en su ubicación
3. WHEN la visualización se renderiza THEN el sistema SHALL utilizar modelos 3D o ilustraciones 2D de componentes
4. WHEN todos los componentes están seleccionados THEN el sistema SHALL mostrar una PC completa visualmente
5. WHEN el usuario interactúa con la visualización THEN el sistema SHALL permitir rotar o hacer zoom en la vista
