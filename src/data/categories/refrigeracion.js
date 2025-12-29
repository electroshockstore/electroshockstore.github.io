// ═══════════════════════════════════════════════════════════════
// RANGO DE IDs: 1200-1299 (Refrigeración)
// Próximo ID disponible: 1206
// ═══════════════════════════════════════════════════════════════
export const refrigeracionProducts = [
  {
    id: 1200,
    name: "Aerocool Duo 12 Pro Kit 3 Fans RGB + Controladora",
    brand: "AeroCool",
    model: "Duo 12 Pro",
    category: "Refrigeración",
    price: 60000,
    stock: 3,
    totalConsumption: "5.4W (Kit completo)", // 1.8W por fan (motor + LEDs)
    type: "Case Cooling",
    images: ["/images/refrigeracion/aerocool_duo12pro.webp", "/images/refrigeracion/aerocool_duo12pro_side.webp"],
    description: "Kit con 3 ventiladores ARGB de 120mm con iluminación RGB direccionable de doble anillo.",
    specifications: {
      "Cantidad Fans": "3 unidades",
      "Consumo": "1.8W por unidad",
      "Iluminación": "ARGB direccionable",
      "Hub Incluido": "H66F (SATA Powered)"
    }
  },
  {
    id: 1201,
    name: "Formula V Oasis L240 - Watercooler ARGB Blanco 310W",
    brand: "Formula V",
    model: "Oasis L240 ARGB",
    category: "Refrigeración",
    price: 100000,
    stock: 1,
    pumpConsumption: "3.5W", 
    fanConsumption: "4.8W (par)",
    maxTdpDissipation: "310W", // Capacidad térmica extrema
    images: ["/images/refrigeracion/watercooler_formulav_l240.webp", "/images/refrigeracion/watercooler_formulav_l240_side.webp"],
    description: "Refrigeración líquida AIO 240mm con iluminación ARGB, TDP 310W",
    specifications: {
      "Tipo": "Watercooler (AIO)",
      "Radiador": "240 mm",
      "TDP": "310W",
      "Compatibilidad": "Intel LGA 1700 / AMD AM5"
    }
  },
  {
    id: 1202,
    name: "Formula V Air Bridge Blanco ARGB x3 Fan",
    brand: "Formula V",
    model: "Air Bridge WH",
    category: "Refrigeración",
    price: 50000,
    stock: 3,
    totalConsumption: "6.0W approx.",
    type: "Case Cooling",
    images: ["/images/refrigeracion/formulav_cooler.webp", "/images/refrigeracion/formulav_cooler_side.webp"],
    description: "Kit de 3 ventiladores 120mm ARGB con rodamiento hidráulico.",
    specifications: {
      "Velocidad": "1200 RPM ± 10%",
      "Iluminación": "Inner & Outer ARGB Ring",
      "Extras": "Control remoto incluido"
    }
  },
  {
    id: 1203,
    name: "Cooler Master Hyper 420s ARGB Black",
    brand: "Cooler Master",
    model: "Hyper 420s ARGB",
    category: "Refrigeración",
    price: 45000,
    stock: 1,
    fanConsumption: "2.4W",
    maxTdpDissipation: "165W approx.", // Estimado para 4 heatpipes de 120mm
    images: ["/images/refrigeracion/cooler_hyper420s.webp", "/images/refrigeracion/cooler_hyper420s_side.webp"],
    description: "Cooler CPU por aire 120mm con 4 heatpipes de contacto directo.",
    specifications: {
      "Socket": "LGA1700, AM5, AM4",
      "Material": "4 Heat Pipes de cobre",
      "Nivel de Ruido": "27.2 dBA"
    }
  },
  {
    id: 1204,
    name: "Cooler Master Hyper 411 Nano ARGB Black",
    brand: "Cooler Master",
    model: "Hyper 411 Nano ARGB Black",
    category: "Refrigeración",
    price: 40000,
    stock: 1,
    fanConsumption: "1.8W",
    maxTdpDissipation: "130W",
    images: ["/images/refrigeracion/cooler_hyper411nano.webp", "/images/refrigeracion/cooler_hyper411nano_side.webp"],
    description: "Cooler CPU compacto 92mm con iluminación ARGB, ideal para gabinetes estrechos.",
    specifications: {
      "TDP": "130W",
      "Ventilador": "92 mm",
      "Velocidad": "600-2500 RPM"
    }
  },
  {
    id: 1205,
    name: "Redragon CC-1013 - Air Cooler 120mm ARGB 180W",
    brand: "Redragon",
    model: "CC-1013",
    category: "Refrigeración",
    price: 45000,
    stock: 5,
    fanConsumption: "2.5W",
    maxTdpDissipation: "180W",
    images: ["/images/refrigeracion/RG_cooler_cc1013.webp", "/images/refrigeracion/RG_cooler_cc1013_side.webp"],
    description: "Cooler CPU de alto rendimiento con 4 heatpipes de 6mm y ventilador de 120mm.",
    specifications: {
      "TDP": "180W",
      "Heatpipes": "4 de cobre 6mm",
      "Flujo de aire": "72 CFM"
    }
  }
];