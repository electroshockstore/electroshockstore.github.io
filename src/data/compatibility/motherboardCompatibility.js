// Motherboard Compatibility extensions
// IDs verificados contra src/data/categories/motherboards.json.
// El motor prefiere `specifications`; este mapa aporta chipset y slots
// donde los specs vienen incompletos.
export const motherboardCompatibilityData = {
  // ASUS TUF Gaming A620M-PLUS WiFi AM5
  600: {
    socket: 'AM5',
    chipset: 'A620',
    tipoMemoriaRAM: 'DDR5',
    factorDeForma: 'Micro-ATX',
    slotsRAM: 4,
    uso_principal: ['Gaming', 'Trabajo', 'General']
  },
  // Gigabyte A620M Gaming X DDR5 AM5
  601: {
    socket: 'AM5',
    chipset: 'A620',
    tipoMemoriaRAM: 'DDR5',
    factorDeForma: 'Micro-ATX',
    slotsRAM: 4,
    uso_principal: ['Gaming', 'Trabajo', 'General']
  },
  // ASUS Prime A520M-K AM4
  602: {
    socket: 'AM4',
    chipset: 'A520',
    tipoMemoriaRAM: 'DDR4',
    factorDeForma: 'Micro-ATX',
    slotsRAM: 2,
    uso_principal: ['General', 'Trabajo']
  },
  // Gigabyte B650M Gaming WiFi DDR5 AM5
  604: {
    socket: 'AM5',
    chipset: 'B650',
    tipoMemoriaRAM: 'DDR5',
    factorDeForma: 'Micro-ATX',
    slotsRAM: 2,
    uso_principal: ['Gaming', 'Trabajo']
  },
  // Gigabyte B650M-H UD AMD AM5 DDR5
  608: {
    socket: 'AM5',
    chipset: 'B650',
    tipoMemoriaRAM: 'DDR5',
    factorDeForma: 'Micro-ATX',
    slotsRAM: 2,
    uso_principal: ['Gaming', 'Trabajo', 'General']
  },
  // ASUS Prime B460M-A R2.0 LGA1200 (INTEL - NO ES AM4!)
  609: {
    socket: 'LGA1200',
    chipset: 'B460',
    tipoMemoriaRAM: 'DDR4',
    factorDeForma: 'Micro-ATX',
    slotsRAM: 4,
    plataforma: 'Intel',
    uso_principal: ['General', 'Trabajo']
  },
  // Asus Prime H610M-K D4 CSM LGA1700 (INTEL)
  610: {
    socket: 'LGA1700',
    chipset: 'H610',
    tipoMemoriaRAM: 'DDR4',
    factorDeForma: 'Micro-ATX',
    slotsRAM: 2,
    plataforma: 'Intel',
    uso_principal: ['General', 'Trabajo']
  },
  // Gigabyte B760M DS3H LGA1700 (INTEL, DDR4 o DDR5 según versión)
  611: {
    socket: 'LGA1700',
    chipset: 'B760',
    tipoMemoriaRAM: 'DDR4/DDR5',
    factorDeForma: 'Micro-ATX',
    slotsRAM: 4,
    plataforma: 'Intel',
    uso_principal: ['Gaming', 'Trabajo', 'General']
  },
  // ASUS PRIME A620M-A-CSM DDR5 AM5
  615: {
    socket: 'AM5',
    chipset: 'A620',
    tipoMemoriaRAM: 'DDR5',
    factorDeForma: 'Micro-ATX',
    slotsRAM: 4,
    uso_principal: ['Gaming', 'Trabajo', 'General']
  },
  // ASUS TUF Gaming B650M-PLUS WIFI AM5
  616: {
    socket: 'AM5',
    chipset: 'B650',
    tipoMemoriaRAM: 'DDR5',
    factorDeForma: 'Micro-ATX',
    slotsRAM: 4,
    uso_principal: ['Gaming', 'Trabajo', 'General']
  }
};
