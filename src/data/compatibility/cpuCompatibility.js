// CPU Compatibility extensions
// Maps CPU IDs to their compatibility data
export const cpuCompatibilityData = {
  // AMD Ryzen 7 5700 AM4
  34: {
    socket: 'AM4',
    memoriaRAM: 'DDR4',
    chipsetsCompatibles: ['A520', 'B450', 'B550', 'X570'],
    consumo_watts: 65,
    graficosIntegrados: false,
    uso_principal: ['Gaming', 'Trabajo', 'General']
  },
  // AMD Ryzen 7 5700G AM4
  35: {
    socket: 'AM4',
    memoriaRAM: 'DDR4',
    chipsetsCompatibles: ['A520', 'B450', 'B550', 'X570'],
    consumo_watts: 65,
    graficosIntegrados: true,
    uso_principal: ['Gaming', 'Multimedia', 'Trabajo', 'General']
  },
  // AMD Ryzen 5 7600 AM5
  37: {
    socket: 'AM5',
    memoriaRAM: 'DDR5',
    chipsetsCompatibles: ['A620', 'B650', 'X670', 'B650E', 'X670E'],
    consumo_watts: 65,
    graficosIntegrados: true,
    uso_principal: ['Gaming', 'Trabajo', 'General']
  },
  // AMD Ryzen 5 5500 AM4
  38: {
    socket: 'AM4',
    memoriaRAM: 'DDR4',
    chipsetsCompatibles: ['A520', 'B450', 'B550', 'X570'],
    consumo_watts: 65,
    graficosIntegrados: false,
    uso_principal: ['Gaming', 'Trabajo', 'General']
  },
  // AMD Ryzen 5 5600GT AM4
  39: {
    socket: 'AM4',
    memoriaRAM: 'DDR4',
    chipsetsCompatibles: ['A520', 'B450', 'B550', 'X570'],
    consumo_watts: 65,
    graficosIntegrados: true,
    uso_principal: ['Gaming', 'Multimedia', 'General']
  },
  // AMD Ryzen 5 4500 AM4
  41: {
    socket: 'AM4',
    memoriaRAM: 'DDR4',
    chipsetsCompatibles: ['A520', 'B450', 'B550', 'X570'],
    consumo_watts: 65,
    graficosIntegrados: false,
    uso_principal: ['Trabajo', 'General']
  },
  // Intel Core i5-11400 LGA1200
  42: {
    socket: 'LGA1200',
    memoriaRAM: 'DDR4',
    chipsetsCompatibles: ['B460', 'H470', 'Z490', 'B560', 'H510', 'Z590'],
    consumo_watts: 65,
    graficosIntegrados: true,
    uso_principal: ['Gaming', 'Trabajo', 'General']
  },
  // AMD Ryzen 5 8400F AM5
  43: {
    socket: 'AM5',
    memoriaRAM: 'DDR5',
    chipsetsCompatibles: ['A620', 'B650', 'X670', 'B650E', 'X670E'],
    consumo_watts: 65,
    graficosIntegrados: false,
    uso_principal: ['Gaming', 'Trabajo', 'General']
  },
  // AMD Ryzen 3 3200G AM4
  44: {
    socket: 'AM4',
    memoriaRAM: 'DDR4',
    chipsetsCompatibles: ['A320', 'A520', 'B450', 'B550', 'X470', 'X570'],
    consumo_watts: 65,
    graficosIntegrados: true,
    uso_principal: ['Multimedia', 'General']
  },
  // AMD Ryzen 5 8600G AM5
  300: {
    socket: 'AM5',
    memoriaRAM: 'DDR5',
    chipsetsCompatibles: ['A620', 'B650', 'X670', 'B650E', 'X670E'],
    consumo_watts: 65,
    graficosIntegrados: true,
    uso_principal: ['Gaming', 'Multimedia', 'Trabajo', 'General']
  }
};
