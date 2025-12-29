// CPU Compatibility extensions
// Maps CPU IDs to their compatibility data
export const cpuCompatibilityData = {
  // AMD Ryzen 5 8600G AM5 DDR5
  300: {
    socket: 'AM5',
    memoriaRAM: 'DDR5',
    chipsetsCompatibles: ['A620', 'B650', 'X670', 'B650E', 'X670E'],
    consumo_watts: 65,
    graficosIntegrados: true,
    uso_principal: ['Gaming', 'Multimedia', 'Trabajo', 'General']
  },
  // AMD Athlon 3000G AM4
  301: {
    socket: 'AM4',
    memoriaRAM: 'DDR4',
    chipsetsCompatibles: ['A320', 'A520', 'B450', 'B550', 'X470', 'X570'],
    consumo_watts: 35,
    graficosIntegrados: true,
    uso_principal: ['General']
  },
  // AMD Ryzen 7 5700 AM4
  302: {
    socket: 'AM4',
    memoriaRAM: 'DDR4',
    chipsetsCompatibles: ['A520', 'B450', 'B550', 'X570'],
    consumo_watts: 65,
    graficosIntegrados: false,
    uso_principal: ['Gaming', 'Trabajo', 'General']
  },
  // AMD Ryzen 7 5700G AM4
  303: {
    socket: 'AM4',
    memoriaRAM: 'DDR4',
    chipsetsCompatibles: ['A520', 'B450', 'B550', 'X570'],
    consumo_watts: 65,
    graficosIntegrados: true,
    uso_principal: ['Gaming', 'Multimedia', 'Trabajo', 'General']
  },
  // AMD Ryzen 5 7600 AM5
  304: {
    socket: 'AM5',
    memoriaRAM: 'DDR5',
    chipsetsCompatibles: ['A620', 'B650', 'X670', 'B650E', 'X670E'],
    consumo_watts: 65,
    graficosIntegrados: true,
    uso_principal: ['Gaming', 'Trabajo', 'General']
  },
  // AMD Ryzen 5 5500 AM4
  305: {
    socket: 'AM4',
    memoriaRAM: 'DDR4',
    chipsetsCompatibles: ['A520', 'B450', 'B550', 'X570'],
    consumo_watts: 65,
    graficosIntegrados: false,
    uso_principal: ['Gaming', 'Trabajo', 'General']
  },
  // AMD Ryzen 5 5600GT AM4
  306: {
    socket: 'AM4',
    memoriaRAM: 'DDR4',
    chipsetsCompatibles: ['A520', 'B450', 'B550', 'X570'],
    consumo_watts: 65,
    graficosIntegrados: true,
    uso_principal: ['Gaming', 'Multimedia', 'General']
  },
  // AMD Ryzen 5 4500 AM4
  307: {
    socket: 'AM4',
    memoriaRAM: 'DDR4',
    chipsetsCompatibles: ['A520', 'B450', 'B550', 'X570'],
    consumo_watts: 65,
    graficosIntegrados: false,
    uso_principal: ['Trabajo', 'General']
  },
  // Intel Core i5-11400 LGA1200
  308: {
    socket: 'LGA1200',
    memoriaRAM: 'DDR4',
    chipsetsCompatibles: ['B460', 'H470', 'Z490', 'B560', 'H510', 'Z590'],
    consumo_watts: 65,
    graficosIntegrados: true,
    uso_principal: ['Gaming', 'Trabajo', 'General']
  },
  // AMD Ryzen 5 8400F AM5
  309: {
    socket: 'AM5',
    memoriaRAM: 'DDR5',
    chipsetsCompatibles: ['A620', 'B650', 'X670', 'B650E', 'X670E'],
    consumo_watts: 65,
    graficosIntegrados: false,
    uso_principal: ['Gaming', 'Trabajo', 'General']
  },
  // AMD Ryzen 3 3200G AM4
  310: {
    socket: 'AM4',
    memoriaRAM: 'DDR4',
    chipsetsCompatibles: ['A320', 'A520', 'B450', 'B550', 'X470', 'X570'],
    consumo_watts: 65,
    graficosIntegrados: true,
    uso_principal: ['Multimedia', 'General']
  }
};
