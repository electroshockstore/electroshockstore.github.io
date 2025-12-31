// ═══════════════════════════════════════════════════════════════
// RANGO DE IDs: 1400-1499 (Placas de Video)
// Próximo ID disponible: 1401
// IMPORTANTE: NO usar IDs fuera de este rango
// ═══════════════════════════════════════════════════════════════
export const placasVideoProducts = [
  {
    id: 1400,
    name: "Nvidia GeForce Asus Dual RTX 3050 6GB OC PCIe 4.0",
    brand: "ASUS",
    model: "DUAL-RTX3050-O6G",
    category: "Placas de Video",
    price: 350000, 
    stock: 1,
    isUsed: false,
    images: [
      "/images/placas_video/rtx_3050.webp",
      "/images/placas_video/rtx_3050_side.webp",
      "/images/placas_video/rtx_3050_side2.webp",
      "/images/placas_video/rtx_3050_side3.webp",
      "/images/placas_video/rtx_3050_back.webp"
    ],
    description: "ASUS Dual GeForce RTX 3050 OC Edition 6GB GDDR6. Arquitectura NVIDIA Ampere con 2304 núcleos CUDA, Ray Tracing, DLSS 2, y refrigeración dual Axial-tech. Ideal para gaming 1080p, eSports y edición de video ligera. No requiere conector de energía adicional (70W TDP).",
    specifications: {
      producto: "Placa Video Nvidia GeForce Asus Dual RTX 3050 6GB OC",
      marca: "ASUS",
      linea: "GeForce RTX 3050",
      modelo: "DUAL-RTX3050-O6G",
      modeloDetallado: "ASUS Dual GeForce RTX 3050 OC Edition 6GB",
      arquitectura: "NVIDIA Ampere",
      procesoFabricacion: "8 nm",
      gpu: "NVIDIA GA107",
      memoria: {
        tamaño: "6 GB",
        tipo: "GDDR6",
        bus: "96 bit",
        velocidad: "14 Gbps",
        anchoBanda: "168 GB/s"
      },
      nucleos: {
        cuda: "2304",
        tensorCores: "Sí (3ª generación)",
        rtCores: "Sí (2ª generación)"
      },
      frecuencias: {
        base: "1507 MHz",
        boost: "1537 MHz (OC Mode)",
        modoOC: "Activado de fábrica"
      },
      interfaz: {
        tipo: "PCI Express 4.0",
        compatibilidad: "PCIe 4.0 / 3.0 / 2.0"
      },
      salidas: {
        hdmi: "1x HDMI 2.1",
        displayPort: "3x DisplayPort 1.4a",
        resolucionMaxima: "7680 x 4320 (8K)",
        monitoresSimultaneos: "Hasta 4"
      },
      tecnologias: {
        rayTracing: "Sí (RT Cores 2ª Gen)",
        dlss: "DLSS 2",
        nvidiaReflex: "Sí",
        nvidiaBroadcast: "Sí",
        gSync: "Sí",
        directX: "12 Ultimate",
        openGL: "4.6",
        vulkan: "Sí",
        cudaVersion: "8.6"
      },
      refrigeracion: {
        tipo: "Doble ventilador Axial-tech",
        tecnologia: "0dB Technology (ventiladores se detienen en baja carga)",
        diseño: "Dual-slot",
        disipador: "Aluminio con heatpipes"
      },
      energia: {
        tdp: "70 W",
        conectorEnergia: "No requiere (alimentación por PCIe)",
        fuenteRecomendada: "450 W",
        eficienciaEnergetica: "Alta (ideal para PCs compactas)"
      },
      dimensiones: {
        largo: "201 mm",
        ancho: "120 mm",
        alto: "37 mm (2 slots)",
        formato: "Dual Slot",
        peso: "Aprox. 500g"
      },
      requisitosMinimos: {
        fuente: "450W",
        slot: "PCIe x16",
        espacioGabinete: "210mm mínimo",
        sistemaOperativo: "Windows 10/11 (64-bit)"
      },
      usoRecomendado: [
        "Gaming 1080p (60+ FPS)",
        "eSports competitivo",
        "Streaming básico",
        "Edición de video ligera (1080p)",
        "Diseño gráfico 2D/3D básico",
        "PC compactas (SFF)",
        "Workstation entry-level"
      ],
      rendimiento: {
        gaming1080p: "Excelente (60+ FPS en títulos AAA)",
        gaming1440p: "Bueno (30-60 FPS con ajustes)",
        rayTracing: "Básico (1080p con DLSS)",
        edicionVideo: "1080p fluido, 4K básico",
        renderizado3D: "Entry-level"
      },
      caracteristicasDestacadas: [
        "No requiere conector de energía adicional",
        "Ideal para PCs compactas y SFF",
        "Ray Tracing y DLSS 2",
        "Refrigeración silenciosa 0dB",
        "Bajo consumo (70W TDP)",
        "PCIe 4.0 compatible con 3.0",
        "4 salidas de video simultáneas",
        "Overclocked de fábrica",
        "Arquitectura Ampere eficiente"
      ],
      contenidoCaja: [
        "1x Placa de video ASUS Dual RTX 3050 6GB",
        "Manual de usuario",
        "Tarjeta de garantía"
      ],
      garantia: "Según fabricante",
      notas: [
        "Producto nuevo sellado",
        "No requiere cables de alimentación adicionales",
        "Perfecto para upgrades sin cambiar fuente",
        "Compatible con gabinetes compactos"
      ]
    }
  }
];
