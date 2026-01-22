import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Archivos a procesar
const files = [
  'src/data/categories/memorias.json',
  'src/data/categories/motherboards.json',
  'src/data/categories/procesadores.json'
];

function addDdrType() {
  files.forEach(filePath => {
    console.log(`\n📝 Procesando: ${filePath}`);
    
    const fullPath = path.join(process.cwd(), filePath);
    const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    
    let modified = 0;
    
    data.products.forEach(product => {
      // Si ya tiene ddrType, saltar
      if (product.ddrType) {
        return;
      }
      
      let ddrType = null;
      
      // MEMORIAS RAM
      if (product.category === 'Memorias RAM') {
        if (product.name?.toUpperCase().includes('DDR5') || 
            product.specifications?.tipoMemoriaRAM?.toUpperCase().includes('DDR5')) {
          ddrType = 'DDR5';
        } else if (product.name?.toUpperCase().includes('DDR4') || 
                   product.specifications?.tipoMemoriaRAM?.toUpperCase().includes('DDR4')) {
          ddrType = 'DDR4';
        } else if (product.name?.toUpperCase().includes('DDR3') || 
                   product.specifications?.tipoMemoriaRAM?.toUpperCase().includes('DDR3')) {
          ddrType = 'DDR3';
        }
      }
      
      // MOTHERBOARDS
      if (product.category === 'Motherboards') {
        if (product.specifications?.tipoMemoriaRAM?.toUpperCase().includes('DDR5') ||
            product.specifications?.tipoMemoria?.toUpperCase().includes('DDR5')) {
          ddrType = 'DDR5';
        } else if (product.specifications?.tipoMemoriaRAM?.toUpperCase().includes('DDR4') ||
                   product.specifications?.tipoMemoria?.toUpperCase().includes('DDR4')) {
          ddrType = 'DDR4';
        } else if (product.specifications?.tipoMemoriaRAM?.toUpperCase().includes('DDR3') ||
                   product.specifications?.tipoMemoria?.toUpperCase().includes('DDR3')) {
          ddrType = 'DDR3';
        }
      }
      
      // PROCESADORES
      if (product.category === 'Procesadores') {
        const socket = product.specifications?.socket?.toUpperCase();
        
        // AMD
        if (socket === 'AM5') {
          ddrType = 'DDR5';
        } else if (socket === 'AM4' || socket === 'AM3+' || socket === 'AM3') {
          ddrType = 'DDR4';
        }
        
        // Intel
        if (socket?.includes('LGA1700') || socket?.includes('1700')) {
          // LGA1700 puede ser DDR4 o DDR5, verificar en specs
          if (product.specifications?.memoriaRAM?.toUpperCase().includes('DDR5')) {
            ddrType = 'DDR5';
          } else {
            ddrType = 'DDR4';
          }
        } else if (socket?.includes('LGA1200') || socket?.includes('1200') ||
                   socket?.includes('LGA1151') || socket?.includes('1151')) {
          ddrType = 'DDR4';
        }
      }
      
      if (ddrType) {
        product.ddrType = ddrType;
        modified++;
        console.log(`  ✓ ${product.name} → ${ddrType}`);
      }
    });
    
    // Guardar archivo
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`\n✅ ${filePath}: ${modified} productos actualizados`);
  });
  
  console.log('\n🎉 ¡Proceso completado!');
}

addDdrType();
