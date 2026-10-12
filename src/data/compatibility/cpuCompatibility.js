// CPU Compatibility extensions
// Maps CPU IDs to their compatibility data.
// IDs verificados contra src/data/categories/procesadores.json.
// El motor prefiere `specifications` del producto; este mapa aporta
// chipsets validados, consumo y datos de iGPU.
export const cpuCompatibilityData = {
  // AMD Ryzen 7 5700G AM4
  300: {
    socket: 'AM4',
    memoriaRAM: 'DDR4',
    chipsetsCompatibles: ['A520', 'B450', 'B550', 'X470', 'X570'],
    consumo_watts: 65,
    graficosIntegrados: true,
    uso_principal: ['Gaming', 'Multimedia', 'Trabajo', 'General']
  },
  // AMD Ryzen 5 7600 AM5
  301: {
    socket: 'AM5',
    memoriaRAM: 'DDR5',
    chipsetsCompatibles: ['A620', 'B650', 'X670', 'B650E', 'X670E'],
    consumo_watts: 65,
    graficosIntegrados: true,
    uso_principal: ['Gaming', 'Trabajo', 'General']
  },
  // AMD Ryzen 5 5500 AM4
  302: {
    socket: 'AM4',
    memoriaRAM: 'DDR4',
    chipsetsCompatibles: ['A520', 'B450', 'B550', 'X470', 'X570'],
    consumo_watts: 65,
    graficosIntegrados: false,
    uso_principal: ['Gaming', 'Trabajo', 'General']
  },
  // AMD Ryzen 5 8500G AM5
  303: {
    socket: 'AM5',
    memoriaRAM: 'DDR5',
    chipsetsCompatibles: ['A620', 'B650', 'X670', 'B650E', 'X670E'],
    consumo_watts: 65,
    graficosIntegrados: true,
    uso_principal: ['Gaming', 'Multimedia', 'Trabajo', 'General']
  },
  // AMD Ryzen 5 8600G AM5
  304: {
    socket: 'AM5',
    memoriaRAM: 'DDR5',
    chipsetsCompatibles: ['A620', 'B650', 'X670', 'B650E', 'X670E'],
    consumo_watts: 65,
    graficosIntegrados: true,
    uso_principal: ['Gaming', 'Multimedia', 'Trabajo', 'General']
  },
  // AMD Ryzen 5 8400F AM5
  305: {
    socket: 'AM5',
    memoriaRAM: 'DDR5',
    chipsetsCompatibles: ['A620', 'B650', 'X670', 'B650E', 'X670E'],
    consumo_watts: 65,
    graficosIntegrados: false,
    uso_principal: ['Gaming', 'Trabajo', 'General']
  },
  // AMD Ryzen 3 3200G AM4
  306: {
    socket: 'AM4',
    memoriaRAM: 'DDR4',
    chipsetsCompatibles: ['A320', 'A520', 'B450', 'B550', 'X470', 'X570'],
    consumo_watts: 65,
    graficosIntegrados: true,
    uso_principal: ['Multimedia', 'General']
  },
  // AMD Ryzen 5 4500 AM4
  307: {
    socket: 'AM4',
    memoriaRAM: 'DDR4',
    chipsetsCompatibles: ['A520', 'B450', 'B550', 'X470', 'X570'],
    consumo_watts: 65,
    graficosIntegrados: false,
    uso_principal: ['Trabajo', 'General']
  },
  // AMD Athlon 3000G AM4
  309: {
    socket: 'AM4',
    memoriaRAM: 'DDR4',
    chipsetsCompatibles: ['A320', 'A520', 'B450', 'B550', 'X470', 'X570'],
    consumo_watts: 35,
    graficosIntegrados: true,
    uso_principal: ['General']
  },
  // Intel Core i5-11400 LGA1200
  310: {
    socket: 'LGA1200',
    memoriaRAM: 'DDR4',
    chipsetsCompatibles: ['B460', 'H470', 'Z490', 'B560', 'H510', 'Z590'],
    consumo_watts: 65,
    graficosIntegrados: true,
    uso_principal: ['Gaming', 'Trabajo', 'General']
  },
  // Intel Core i3-10100F LGA1200
  311: {
    socket: 'LGA1200',
    memoriaRAM: 'DDR4',
    chipsetsCompatibles: ['H410', 'B460', 'H470', 'Z490', 'H510', 'B560'],
    consumo_watts: 65,
    graficosIntegrados: false,
    uso_principal: ['Trabajo', 'General']
  },
  // Intel Core i7-12700KF LGA1700 (DDR4 y DDR5 según mother)
  312: {
    socket: 'LGA1700',
    memoriaRAM: 'DDR4/DDR5',
    chipsetsCompatibles: ['Z690', 'B660', 'H670', 'Z790', 'B760', 'H770'],
    consumo_watts: 125,
    graficosIntegrados: false,
    uso_principal: ['Gaming', 'Trabajo', 'General']
  },
  // Intel Core i5-14400F LGA1700 (DDR4 y DDR5 según mother)
  314: {
    socket: 'LGA1700',
    memoriaRAM: 'DDR4/DDR5',
    chipsetsCompatibles: ['H610', 'B660', 'B760', 'Z690', 'Z790'],
    consumo_watts: 65,
    graficosIntegrados: false,
    uso_principal: ['Gaming', 'Trabajo', 'General']
  }
};
