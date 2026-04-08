const fs = require('fs');

// Leer archivos antiguos (del commit)
const oldAlmacenamiento = JSON.parse(fs.readFileSync('old-almacenamiento.json', 'utf8'));
const oldProcesadores = JSON.parse(fs.readFileSync('old-procesadores.json', 'utf8'));

// Leer archivos actuales
const newAlmacenamiento = JSON.parse(fs.readFileSync('src/data/categories/almacenamiento.json', 'utf8'));
const newProcesadores = JSON.parse(fs.readFileSync('src/data/categories/procesadores.json', 'utf8'));

// Leer histórico de precios
const priceHistory = JSON.parse(fs.readFileSync('public/data/price-history.json', 'utf8'));

// Crear mapeo de IDs antiguos a nuevos
const idMapping = {};

function normalizeProductName(name) {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

function createMapping() {
  console.log('=== ALMACENAMIENTO ===\n');
  
  // Crear un mapa de nombre -> ID antiguo
  const oldAlmacenamientoMap = {};
  oldAlmacenamiento.products.forEach(p => {
    oldAlmacenamientoMap[normalizeProductName(p.name)] = p.id;
  });
  
  // Comparar con los nuevos IDs
  newAlmacenamiento.products.forEach(newProduct => {
    const normalizedName = normalizeProductName(newProduct.name);
    const oldId = oldAlmacenamientoMap[normalizedName];
    
    if (oldId && oldId !== newProduct.id) {
      idMapping[oldId.toString()] = newProduct.id.toString();
      console.log(`${oldId} -> ${newProduct.id}: ${newProduct.name}`);
    }
  });
  
  console.log('\n=== PROCESADORES ===\n');
  
  // Crear un mapa de nombre -> ID antiguo
  const oldProcesadoresMap = {};
  oldProcesadores.products.forEach(p => {
    oldProcesadoresMap[normalizeProductName(p.name)] = p.id;
  });
  
  // Comparar con los nuevos IDs
  newProcesadores.products.forEach(newProduct => {
    const normalizedName = normalizeProductName(newProduct.name);
    const oldId = oldProcesadoresMap[normalizedName];
    
    if (oldId && oldId !== newProduct.id) {
      idMapping[oldId.toString()] = newProduct.id.toString();
      console.log(`${oldId} -> ${newProduct.id}: ${newProduct.name}`);
    }
  });
}

// Crear el nuevo histórico con IDs actualizados
function updatePriceHistory() {
  const newPriceHistory = {};
  
  Object.entries(priceHistory).forEach(([oldId, data]) => {
    const newId = idMapping[oldId] || oldId;
    newPriceHistory[newId] = data;
  });
  
  return newPriceHistory;
}

// Ejecutar
console.log('=== Analizando cambios de IDs entre commits ===\n');
createMapping();

console.log('\n=== Resumen del Mapeo ===');
console.log(`Total de IDs que cambiaron: ${Object.keys(idMapping).length}\n`);

if (Object.keys(idMapping).length > 0) {
  console.log('Mapeo completo:');
  console.log(JSON.stringify(idMapping, null, 2));
  
  console.log('\n=== Actualizando histórico de precios ===');
  const newPriceHistory = updatePriceHistory();
  
  // Guardar el nuevo histórico
  fs.writeFileSync('public/data/price-history.json', JSON.stringify(newPriceHistory, null, 2), 'utf8');
  console.log('\n✓ Histórico de precios actualizado correctamente');
} else {
  console.log('No se encontraron cambios de IDs');
}
