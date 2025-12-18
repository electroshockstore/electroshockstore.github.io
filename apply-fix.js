const fs = require('fs');

const main = fs.readFileSync('src/utils/recommendationEngine.js', 'utf8');
const fix = fs.readFileSync('src/utils/recommendationEngine_fix.js', 'utf8');

// Extraer la función del fix
const fixFuncMatch = fix.match(/function selectCompatibleMotherboard[\s\S]+?(?=\n\n|$)/);
if (!fixFuncMatch) {
  console.error('No se pudo extraer la función del fix');
  process.exit(1);
}

const fixFunc = fixFuncMatch[0];

// Reemplazar en el archivo principal
const regex = /function selectCompatibleMotherboard\(motherboards, cpu, budget\)[\s\S]+?^  return compatible\[0\]\.mb;\n}/m;

if (!regex.test(main)) {
  console.error('No se encontró la función en el archivo principal');
  process.exit(1);
}

const updated = main.replace(regex, fixFunc);

fs.writeFileSync('src/utils/recommendationEngine.js', updated, 'utf8');
console.log('✓ Fix aplicado correctamente');
console.log('✓ Normalización de sockets implementada (FCLGA1200 → LGA1200)');
