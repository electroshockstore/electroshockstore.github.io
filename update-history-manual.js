const fs = require('fs');

// Mapeo manual basado en la comparación de los archivos
// Formato: "ID_ANTIGUO": "ID_NUEVO"
const idMapping = {
  // Almacenamiento - Los que cambiaron de posición
  "202": "204",  // Lexar NM620 1TB
  "203": "205",  // Kingston NV3 1TB
  "204": "206",  // Adata Legend 710 512GB
  "205": "207",  // Kingston A400 960GB
  "206": "208",  // SanDisk SSD Plus 1TB
  "207": "209",  // Kingston NV2 250GB
  "208": "210",  // Lexar NM620 512GB
  "209": "211",  // Patriot Burst Elite 480GB
  "210": "212",  // Hiksemi Wave 960GB
  "211": "213",  // Netac N535S 480GB
  "212": "214",  // WD Green 480GB
  "213": "215",  // Patriot Burst Elite 960GB
  "214": "216",  // Patriot Burst Elite 240GB
  "215": "217",  // Kingston A400 480GB
  "216": "218",  // Adata Swordfish 500GB
  "217": "219",  // WD Green SN350 240GB
  "218": "220",  // WD Green SN350 480GB
  "219": "221",  // WD Green SN350 500GB
  "220": "222",  // Adata SU650 256GB
  "221": "223",  // WD Elements 2TB
  "222": "224",  // WD Elements 1TB
  "223": "225",  // WD Elements 4TB
  "224": "226",  // Seagate SkyHawk 4TB
  "225": "227",  // Kingston A400 240GB
  
  // Procesadores - Los que cambiaron
  "304": "300",  // AMD Ryzen 7 5700G
  "305": "301",  // AMD Ryzen 5 7600
  "306": "302",  // AMD Ryzen 5 5500
  "308": "303",  // AMD Ryzen 5 8500G
  "309": "304",  // AMD Ryzen 5 8600G
  "310": "305",  // Intel Core i5-11400
  "311": "306",  // AMD Ryzen 5 8400F
  "312": "307",  // AMD Ryzen 3 3200G
  "313": "308",  // AMD Ryzen 5 4500
  "314": "310",  // AMD Athlon 3000G
  "315": "311",  // Intel Core i3-10100F
  "316": "312",  // Intel Core i7-12700KF
  "317": "313",  // Intel Core i5-10400F
  "318": "314",  // Intel Core i5-14400F
  "320": "315",  // Intel Core i3-12100
};

// Leer histórico actual
const priceHistory = JSON.parse(fs.readFileSync('public/data/price-history.json', 'utf8'));

// Crear nuevo histórico con IDs actualizados
const newPriceHistory = {};

Object.entries(priceHistory).forEach(([oldId, data]) => {
  const newId = idMapping[oldId] || oldId;
  newPriceHistory[newId] = data;
  
  if (idMapping[oldId]) {
    console.log(`Mapeado: ${oldId} -> ${newId} (${data.name})`);
  }
});

// Guardar
fs.writeFileSync('public/data/price-history.json', JSON.stringify(newPriceHistory, null, 2), 'utf8');

console.log(`\n✓ Histórico actualizado. Total de IDs mapeados: ${Object.keys(idMapping).length}`);
