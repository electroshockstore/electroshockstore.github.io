// ═══════════════════════════════════════════════════════════════
// RANGO DE IDs: 400-499 (Memorias RAM)
// Próximo ID disponible: 416
// ═══════════════════════════════════════════════════════════════
export const memoriasProducts = [
  // ========== DDR5 ==========
  {
    id: 411,
    name: "ADATA XPG Lancer Blade DDR5 16GB 5600MHz",
    brand: "ADATA",
    model: "XPG Lancer Blade",
    category: "Memorias RAM",
    price: 285000,
    stock: 2,
    realPowerConsumption: "2.5W - 3.2W", // DDR5 es más eficiente por su PMIC integrado
    images: ["/images/ram/lancerblade_16gb_ddr5_sinrgb.webp"],
    description: "Memoria Ram Adata Xpg Lancer Blade 16gb 5600mhz DDR5, SIN RGB",
    specifications: {
      tipoMemoriaRAM: "DDR5",
      capacidad: "16 GB",
      velocidad: "5600 MHz",
      voltaje: "1.25V",
      pmic: "Integrado (Power Management IC)"
    }
  },
  {
    id: 412,
    name: "NETAC Shadow 2 DDR5 16GB 4800MHz",
    brand: "NETAC",
    model: "Shadow 2",
    category: "Memorias RAM",
    price: 250000,
    stock: 7,
    realPowerConsumption: "2.2W - 2.8W", // Voltaje estándar JEDEC de 1.1V
    images: ["/images/ram/netac_shadow2_ram.webp"],
    description: "Memoria RAM Netac 16gb Shadow 2 Ddr5 4800mhz Sin RGB",
    specifications: {
      tipoMemoriaRAM: "DDR5",
      capacidad: "16 GB",
      velocidad: "4800 MHz",
      voltaje: "1.1V"
    }
  },
  {
    id: 409,
    name: "NEO FORZA DDR5 16GB 5200 CL42",
    brand: "Neo Forza",
    model: "DDR5 5200",
    category: "Memorias RAM",
    price: 185000,
    stock: 2,
    realPowerConsumption: "2.4W - 3.0W",
    images: ["/images/ram/neo_forza_ddr5.webp"],
    description: "Memoria RAM Neo Forza DDR5 16GB 5200MHz CL42",
    specifications: {
      tipoMemoriaRAM: "DDR5",
      velocidad: "5200 MHz",
      voltaje: "1.25V"
    }
  },
  {
    id: 410,
    name: "Neo Forza DDR5 32GB 5200MHz CL42 UDIMM",
    brand: "Neo Forza",
    model: "NMUD532F82-5200JA10",
    category: "Memorias RAM",
    price: 340000,
    stock: 2,
    realPowerConsumption: "2.8W - 3.5W", // Mayor densidad de chips aumenta levemente el consumo
    images: ["/images/ram/neo_forza_ddr5.webp"],
    description: "Memoria RAM Neo Forza DDR5 32GB 5200MHz CL42 UDIMM con On-die ECC",
    specifications: {
      capacidadTotal: "32 GB",
      tipoMemoriaRAM: "DDR5",
      voltaje: "1.1V"
    }
  },
  // ========== DDR4 PREMIUM (RGB y Disipadas) ==========
  {
    id: 413,
    name: "ADATA XPG Gammix D35 DDR4 16GB 3200MHz",
    brand: "ADATA",
    model: "XPG Gammix D35",
    category: "Memorias RAM",
    price: 170000,
    stock: 2,
    realPowerConsumption: "3.5W - 4.2W", // DDR4 a 1.35V consume más que DDR5 base
    images: ["/images/ram/ram_xpg_gamminxd35_ddr4.webp"],
    description: "Memoria RAM PC Adata XPG Gammix D35 DDR4 16GB 3200MHz, Disipada Sin RGB",
    specifications: {
      tipoMemoria: "DDR4",
      voltaje: "1.35V",
      disipador: "Sí"
    }
  },
  {
    id: 400,
    name: "Memoria Ram Xpg D35g Spectrix 16gb Ddr4 RGB",
    brand: "XPG",
    model: "Spectrix D35G",
    category: "Memorias RAM",
    price: 185000,
    stock: 3,
    realPowerConsumption: "4.0W - 5.0W", // El RGB suma ~0.8W bajo carga de efectos
    images: ["/images/ram/spectrix-d35g_16gb.webp"],
    description: "Memoria Ram Xpg D35g 16gb Ddr4 Rgb 3200mhz",
    specifications: {
      tipoMemoriaRAM: "DDR4",
      rgb: "Sí",
      voltaje: "1.35 V"
    }
  },
  {
    id: 407,
    name: "Adata Xpg Ddr4 16gb Spectrix D35 RGB White",
    brand: "XPG",
    model: "Spectrix D35",
    category: "Memorias RAM",
    price: 185000,
    stock: 2,
    realPowerConsumption: "4.0W - 5.0W",
    images: ["/images/ram/spectrix_d35_white.webp"],
    description: "Memoria RAM XPG Spectrix D35 16GB DDR4 3200MHz RGB White",
    specifications: {
      tipoMemoriaRAM: "DDR4",
      rgb: "Sí",
      voltaje: "1.35V"
    }
  },
  {
    id: 414,
    name: "NETAC Shadow DDR4 16GB 3200MHz",
    brand: "NETAC",
    model: "Shadow",
    category: "Memorias RAM",
    price: 130000,
    stock: 4,
    realPowerConsumption: "3.4W - 4.0W",
    images: ["/images/ram/ram_netac_shadow_ddr4.webp"],
    description: "Memoria RAM Shadow 16GB DDR4 Disipada, sin RGB",
    specifications: {
      tipoMemoriaRAM: "DDR4",
      voltaje: "1.35V"
    }
  },
  {
    id: 408,
    name: "HyperX Fury 16GB DDR4 2666MHz CL16",
    brand: "HyperX",
    model: "Fury",
    category: "Memorias RAM",
    price: 150000,
    stock: 1,
    realPowerConsumption: "2.8W - 3.2W", // Menor frecuencia y voltaje (1.2V) reduce el consumo
    images: ["/images/ram/kingston_fury.webp"],
    description: "Memoria RAM HyperX Fury 16GB DDR4 2666MHz CL16",
    specifications: {
      tipo: "DDR4 SDRAM",
      voltaje: "1.2V",
      velocidad: "2666 MHz"
    }
  },
  // ========== BÁSICAS / OFFICE ==========
  {
    id: 406,
    name: "Lexar 16GB DDR4 3200MHz UDIMM",
    brand: "Lexar",
    model: "LD4AU016G",
    category: "Memorias RAM",
    price: 120000,
    stock: 12,
    realPowerConsumption: "2.8W - 3.4W", // Sin disipador ni RGB, a 1.2V
    images: ["/images/ram/adata16g_ddr4.webp"],
    description: "Lexar 16GB DDR4 3200MHz UDIMM",
    specifications: {
      voltaje: "1.2 V",
      tipoMemoriaRAM: "DDR4"
    }
  },
  {
    id: 405,
    name: "Patriot Signature DDR4 16GB 3200MHz",
    brand: "Patriot",
    model: "Signature",
    category: "Memorias RAM",
    price: 130000,
    stock: 5,
    realPowerConsumption: "2.8W - 3.4W",
    images: ["/images/ram/patriot_signature_ddr416.webp"],
    description: "Patriot Signature DDR4 16GB 3200MHz CL22",
    specifications: {
      voltaje: "1.2 V",
      tipoMemoriaRAM: "DDR4"
    }
  },
  {
    id: 404,
    name: "NETAC BASIC DDR4 16GB 3200 MHZ C16",
    brand: "Netac",
    model: "Basic",
    category: "Memorias RAM",
    price: 100000,
    stock: 4,
    realPowerConsumption: "3.4W - 4.0W", // Latencia CL16 suele requerir 1.35V
    images: ["/images/ram/netac_basic_16gb.webp"],
    description: "NETAC BASIC DDR4 16GB 3200 MHZ C16",
    specifications: {
      voltaje: "1.35 V",
      tipoMemoriaRAM: "DDR4"
    }
  },
  {
    id: 403,
    name: "ADATA DDR4 Premier 16GB 3200MHz",
    brand: "ADATA",
    model: "Premier",
    category: "Memorias RAM",
    price: 120000,
    stock: 5,
    realPowerConsumption: "2.8W - 3.4W",
    images: ["/images/ram/adata_ddr416gb_basic.webp"],
    description: "ADATA DDR4 Premier 16GB 3200MHz",
    specifications: {
      voltaje: "1.2 V",
      tipoMemoriaRAM: "DDR4"
    }
  },
  {
    id: 402,
    name: "Adata 4GB DDR4 2666 MHz SODIMM",
    brand: "ADATA",
    model: "Premier",
    category: "Memorias RAM",
    price: 40000,
    stock: 3,
    realPowerConsumption: "1.2W - 1.8W", // Módulo pequeño para Notebook
    images: ["/images/ram/adata_ddr4soddim_4gb.webp"],
    description: "Adata 4GB DDR4 2666 MHz SODIMM",
    specifications: {
      formatoMemoriaRAM: "SODIMM",
      voltaje: "1.2 V"
    }
  },
  {
    id: 415, // Ajustado al rango
    name: "Adata Premier 8GB U-DIMM DDR3 1600MHz",
    brand: "ADATA",
    model: "Premier",
    category: "Memorias RAM",
    price: 40000,
    stock: 2,
    realPowerConsumption: "3.0W - 4.5W", // DDR3 es la menos eficiente (1.5V)
    images: ["/images/ram/adata_dd38gb.webp"],
    description: "Adata Premier 8GB U-DIMM DDR3 1600MHz",
    specifications: {
      tipoMemoriaRAM: "DDR3",
      voltaje: "1.5 V"
    }
  }
];