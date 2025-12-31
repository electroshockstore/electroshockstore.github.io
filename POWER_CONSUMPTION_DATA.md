# Datos de Consumo de Energía para Componentes PC

## PROCESADORES (src/data/categories/procesadores.js)
Agregar campo `powerConsumption` después de `stock`:

- **AMD Ryzen 7 5700** (ID: 34): `powerConsumption: 88` // TDP 65W
- **AMD Ryzen 7 5700G** (ID: 35): `powerConsumption: 88` // TDP 65W
- **AMD Ryzen 5 7600** (ID: 37): `powerConsumption: 88` // TDP 65W
- **AMD Ryzen 5 5500** (ID: 38): `powerConsumption: 88` // TDP 65W
- **AMD Ryzen 5 5600GT** (ID: 39): `powerConsumption: 88` // TDP 65W
- **AMD Ryzen 5 4500** (ID: 41): `powerConsumption: 88` // TDP 65W
- **Intel Core i5-11400** (ID: 42): `powerConsumption: 154` // TDP 65W, PL2 154W
- **AMD Ryzen 5 8400F** (ID: 43): `powerConsumption: 88` // TDP 65W
- **AMD Ryzen 3 3200G** (ID: 44): `powerConsumption: 88` // TDP 65W
- **AMD Ryzen 5 8600G** (ID: 300): `powerConsumption: 88` // TDP 65W
- **AMD Athlon 3000G** (ID: 301): `powerConsumption: 45` // TDP 35W

## PLACAS DE VIDEO (src/data/categories/placas_video.js)
Agregar campo `powerConsumption` después de `stock`:

- **RTX 3050 6GB**: `powerConsumption: 130` // TDP 130W
- **RTX 4060**: `powerConsumption: 115` // TDP 115W
- **RTX 4060 Ti**: `powerConsumption: 160` // TDP 160W
- **RX 6600**: `powerConsumption: 132` // TDP 132W
- **RX 6600 XT**: `powerConsumption: 160` // TDP 160W
- **RX 6650 XT**: `powerConsumption: 180` // TDP 180W
- **RX 6700 XT**: `powerConsumption: 230` // TDP 230W
- **RX 6750 XT**: `powerConsumption: 250` // TDP 250W
- **RTX 3060**: `powerConsumption: 170` // TDP 170W
- **RTX 3060 Ti**: `powerConsumption: 200` // TDP 200W
- **RTX 4070**: `powerConsumption: 200` // TDP 200W
- **RTX 4070 Super**: `powerConsumption: 220` // TDP 220W
- **RTX 4070 Ti**: `powerConsumption: 285` // TDP 285W

## REFRIGERACIÓN (src/data/categories/refrigeracion.js)
Agregar campo `powerConsumption` después de `stock`:

- **Coolers de aire (120mm)**: `powerConsumption: 5` // ~5W por ventilador
- **Coolers de aire (140mm)**: `powerConsumption: 6` // ~6W por ventilador
- **Watercoolers 120mm**: `powerConsumption: 10` // Bomba + 1 ventilador
- **Watercoolers 240mm**: `powerConsumption: 15` // Bomba + 2 ventiladores
- **Watercoolers 280mm**: `powerConsumption: 17` // Bomba + 2 ventiladores
- **Watercoolers 360mm**: `powerConsumption: 20` // Bomba + 3 ventiladores
- **Kits de ventiladores (3x)**: `powerConsumption: 15` // 3 ventiladores

## FUENTES (src/data/categories/fuentes.js)
Agregar campo `wattage` después de `stock` (ya existe en algunos):

Verificar que todas las fuentes tengan el campo `wattage` con su potencia nominal:
- 500W, 550W, 600W, 650W, 700W, 750W, 850W, 1000W, etc.

## NOTAS IMPORTANTES:

### Motherboards
Consumo fijo: **50W** (ya implementado en el código)

### RAM
Consumo por módulo: **5W** (ya implementado en el código)
- DDR4: ~3-5W por módulo
- DDR5: ~4-6W por módulo

### Almacenamiento
Consumo por unidad: **8W** (ya implementado en el código)
- SSD NVMe: ~5-8W
- SSD SATA: ~2-4W
- HDD: ~6-10W

### Margen de Seguridad
El sistema ya aplica:
- 20% de margen en el cálculo base
- 30% adicional para la recomendación de fuente
- Total: ~56% de margen sobre el consumo teórico

### Ejemplo de Cálculo:
```
Ryzen 7 5700G: 88W
Motherboard: 50W
RAM 16GB (2x8): 10W
RX 6600: 132W
SSD NVMe: 8W
Cooler 120mm: 5W
-------------------
Total: 293W
Con 20% margen: 352W
Recomendado (30% más): 458W → Fuente mínima 500W
```
