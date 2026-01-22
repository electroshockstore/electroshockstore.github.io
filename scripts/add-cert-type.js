import fs from 'fs';
import path from 'path';

const filePath = 'src/data/categories/fuentes.json';

function addCertType() {
  console.log(`\n📝 Procesando: ${filePath}`);
  
  const fullPath = path.join(process.cwd(), filePath);
  const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  
  let modified = 0;
  
  data.products.forEach(product => {
    // Si ya tiene certType, saltar
    if (product.certType) {
      return;
    }
    
    let certType = null;
    
    // Buscar en el nombre del producto
    const nameUpper = product.name?.toUpperCase() || '';
    
    // Buscar en las especificaciones
    const certSpec = product.specifications?.Certificacion?.toUpperCase() || 
                     product.specifications?.certificacion?.toUpperCase() || '';
    
    // Detectar certificación
    if (nameUpper.includes('80 PLUS GOLD') || nameUpper.includes('80+ GOLD') || 
        certSpec.includes('80 PLUS GOLD') || certSpec.includes('GOLD')) {
      certType = '80_PLUS_GOLD';
    } else if (nameUpper.includes('80 PLUS BRONZE') || nameUpper.includes('80+ BRONZE') || 
               certSpec.includes('80 PLUS BRONZE') || certSpec.includes('BRONZE')) {
      certType = '80_PLUS_BRONZE';
    } else if (nameUpper.includes('80 PLUS PLATINUM') || nameUpper.includes('80+ PLATINUM') || 
               certSpec.includes('80 PLUS PLATINUM') || certSpec.includes('PLATINUM')) {
      certType = '80_PLUS_PLATINUM';
    } else if (nameUpper.includes('80 PLUS TITANIUM') || nameUpper.includes('80+ TITANIUM') || 
               certSpec.includes('80 PLUS TITANIUM') || certSpec.includes('TITANIUM')) {
      certType = '80_PLUS_TITANIUM';
    } else if (nameUpper.includes('80 PLUS') || nameUpper.includes('80+') || 
               certSpec.includes('80 PLUS')) {
      certType = '80_PLUS';
    }
    
    if (certType) {
      product.certType = certType;
      modified++;
      console.log(`  ✓ ${product.name} → ${certType}`);
    } else {
      console.log(`  ⚠️  ${product.name} → Sin certificación detectada`);
    }
  });
  
  // Guardar archivo
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n✅ ${filePath}: ${modified} productos actualizados`);
  console.log('\n🎉 ¡Proceso completado!');
}

addCertType();
