// ═══════════════════════════════════════════════════════════════
// RANGO DE IDs: 600-699 (Motherboards)
// Próximo ID disponible: 607
// ═══════════════════════════════════════════════════════════════
export const motherboardsProducts = [
  {
    id: 602, // Ajustado al rango
    name: "ASUS Prime A520M-K AM4",
    brand: "ASUS",
    model: "Prime A520M-K",
    category: "Motherboards",
    price: 80000,
    stock: 7,
    ownConsumption: "25W - 35W", // Consumo base del chipset y componentes
    maxPowerSupport: "Hasta 105W TDP", // Soporta Ryzen 9, pero recomendada hasta Ryzen 7 por VRM
    images: ["/images/motherboard/A520m_K_Csm.webp", "/images/motherboard/A520m_K_Csm_moth.webp"],
    description: "Mother Asus Prime A520M-K AM4 DDR4 64GB HDMI M.2",
    specifications: {
      marca: "Asus",
      chipset: "AMD A520",
      socket: "AM4",
      vrm: "4+2 Fases de poder",
      factorDeForma: "mATX",
      tipoMemoriaRAM: "DDR4"
    }
  },
  {
    id: 603,
    name: "Gigabyte B650M Gaming WiFi DDR5 AM5",
    brand: "Gigabyte",
    model: "B650M Gaming WiFi",
    category: "Motherboards",
    price: 200000,
    stock: 1,
    ownConsumption: "40W - 55W", // Mayor consumo por WiFi y chipset B650
    maxPowerSupport: "Hasta 170W TDP", // Diseñada para manejar procesadores de alto rendimiento AM5
    images: ["/images/motherboard/b650m_wifi.webp", "/images/motherboard/b650m_wifi_moth.webp"],
    description: "Mother Gigabyte B650M Gaming WiFi DDR5 B650 AMD con WiFi integrado",
    specifications: {
      marca: "Gigabyte",
      socket: "AM5",
      vrm: "5+2+2 Digital VRM Solution",
      tipoMemoria: "DDR5",
      lan: "2.5GbE",
      wifi: "Wi-Fi 6E incorporado"
    }
  },
  {
    id: 604,
    name: "ASUS Prime B450M-A II CSM AM4",
    brand: "ASUS",
    model: "Prime B450M-A II CSM",
    category: "Motherboards",
    price: 120000,
    stock: 1,
    ownConsumption: "30W - 40W",
    maxPowerSupport: "Hasta 105W TDP",
    images: ["/images/motherboard/b450m_II_full.webp", "/images/motherboard/b450m_II_mother.webp"],
    description: "Mother Asus Prime B450M-A II CSM AM4 DDR4 128GB",
    specifications: {
      marca: "Asus",
      linea: "Prime",
      modelo: "B450M-A II CSM",
      socket: "AM4",
      chipset: "B450",
      capacidadMaximaSoportada: "128 GB"
    }
  },
  {
    id: 605,
    name: "ASUS Prime B460M-A R2.0 LGA1200",
    brand: "ASUS",
    model: "Prime B460M-A R2.0",
    category: "Motherboards",
    price: 180000,
    stock: 1,
    ownConsumption: "35W - 45W",
    maxPowerSupport: "Hasta 125W (PL1)",
    images: ["/images/motherboard/B460m-a R2.0.webp"],
    description: "Mother Asus Prime B460M-A R2.0 Intel Socket 1200 DDR4 128GB",
    specifications: {
      marca: "Asus",
      socket: "LGA1200",
      plataforma: "Intel",
      chipset: "B460 (H470 en R2.0)",
      tipoMemoriaRAM: "DDR4"
    }
  },
  {
    id: 606,
    name: "Gigabyte A520M K V2 UD DDR4 AM4",
    brand: "Gigabyte",
    model: "A520M K V2",
    category: "Motherboards",
    price: 80000,
    stock: 6,
    ownConsumption: "20W - 30W", // Diseño Ultra Durable de bajo consumo
    maxPowerSupport: "Hasta 105W TDP",
    images: ["/images/motherboard/a520m_k_v2.webp", "/images/motherboard/a520m_k_v2_moth.webp"],
    description: "Mother Gigabyte UD A520M K V2 DDR4 AMD Ryzen Gamer M.2 PC",
    specifications: {
      marca: "Gigabyte",
      linea: "Ultra Durable",
      chipset: "AMD A520",
      socket: "AM4",
      vrm: "4+2 Fases"
    }
  },
  {
    id: 600,
    name: "Gigabyte B650M-H UD AMD AM5 DDR5",
    brand: "Gigabyte",
    model: "B650M-H",
    category: "Motherboards",
    price: 145000,
    stock: 1,
    ownConsumption: "35W - 50W",
    maxPowerSupport: "Hasta 162W (PPT)", // Soporta procesadores AM5 potentes
    images: ["/images/motherboard/gigabyte_b650m-h.webp", "/images/motherboard/gigabyte_b650m-h_3.webp"],
    description: "Mother Gigabyte B650M-H UD AMD AM5 DDR5 con soporte para Ryzen 7000/8000/9000",
    specifications: {
      marca: "Gigabyte",
      chipset: "AMD B650",
      vrm: "5+2+2 fases",
      soportePerfiles: "AMD EXPO / Intel XMP"
    }
  },
  {
    id: 601,
    name: "Gigabyte A620M H DDR5 AMD AM5",
    brand: "Gigabyte",
    model: "A620M H",
    category: "Motherboards",
    price: 120000,
    stock: 1,
    ownConsumption: "30W - 40W",
    maxPowerSupport: "Hasta 120W (PPT recomendado)", // Limitada por chipset A620
    images: ["/images/motherboard/a620m_h_ud.webp", "/images/motherboard/a620m_h_ud_front.webp"],
    description: "Mother Gigabyte A620M H DDR5 AMD AM5 para Ryzen Serie 7000/8000/9000",
    specifications: {
      marca: "Gigabyte",
      chipset: "AMD A620",
      socket: "AM5",
      vrm: "5+2+2 Digital VRM"
    }
  }
];