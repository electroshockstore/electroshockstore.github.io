// FUNCIÓN CORREGIDA PARA selectCompatibleMotherboard
// Copiar y reemplazar en recommendationEngine.js línea 345

function selectCompatibleMotherboard(motherboards, cpu, budget) {
  if (motherboards.length === 0) return null;
  
  const cpuSpecs = extractCPUSpecs(cpu);
  console.log(`\nBuscando motherboard compatible:`);
  console.log(`  Socket: ${cpuSpecs.socket}`);
  console.log(`  RAM: ${cpuSpecs.ramType}`);
  console.log(`  Presupuesto: ${budget}`);
  
  // Normalizar para comparación flexible
  const normalizeSocket = (socket) => {
    if (!socket) return '';
    return socket.toUpperCase().replace(/\s+/g, '').replace(/FCLGA/g, 'LGA');
  };
  
  const normalizeRAMType = (ramType) => {
    if (!ramType) return '';
    return ramType.toUpperCase().replace(/\s+/g, '');
  };
  
  const cpuSocketNorm = normalizeSocket(cpuSpecs.socket);
  const cpuRAMNorm = normalizeRAMType(cpuSpecs.ramType);
  
  console.log(`  Socket normalizado: ${cpuSocketNorm}`);
  console.log(`  RAM normalizado: ${cpuRAMNorm}`);
  
  // Scoring de compatibilidad
  const scored = motherboards.map(mb => {
    const mbSpecs = mb.specifications || {};
    const mbSocket = mbSpecs.socket || mbSpecs.Socket;
    const mbRAM = mbSpecs.tipoMemoria || mbSpecs.tipoMemoriaRAM || mbSpecs['Tipo de memoria'];
    
    const mbSocketNorm = normalizeSocket(mbSocket);
    const mbRAMNorm = normalizeRAMType(mbRAM);
    
    let compatScore = 0;
    let compatible = true;
    let reasons = [];
    
    // 1. Socket (CRÍTICO - 100 puntos)
    if (mbSocketNorm === cpuSocketNorm) {
      compatScore += 100;
      reasons.push(`✓ Socket ${mbSocket} compatible`);
    } else if (mbSocketNorm && cpuSocketNorm && mbSocketNorm.includes(cpuSocketNorm)) {
      compatScore += 80;
      reasons.push(`~ Socket ${mbSocket} parcialmente compatible`);
    } else if (!cpuSocketNorm) {
      // Si no pudimos detectar el socket del CPU, ser más permisivo
      compatScore += 60;
      reasons.push(`? Socket ${mbSocket} (CPU socket no detectado)`);
    } else {
      compatible = false;
      reasons.push(`✗ Socket ${mbSocket} incompatible (necesita ${cpuSpecs.socket})`);
    }
    
    // 2. RAM Type (CRÍTICO - 100 puntos)
    if (cpuRAMNorm && mbRAMNorm) {
      if (mbRAMNorm.includes(cpuRAMNorm)) {
        compatScore += 100;
        reasons.push(`✓ RAM ${mbRAM} compatible`);
      } else {
        compatible = false;
        reasons.push(`✗ RAM ${mbRAM} incompatible (necesita ${cpuSpecs.ramType})`);
      }
    } else if (mbRAMNorm && !cpuRAMNorm) {
      // Si no pudimos detectar RAM del CPU, ser permisivo
      compatScore += 80;
      reasons.push(`~ RAM ${mbRAM} (CPU RAM no detectado)`);
    } else if (!mbRAMNorm) {
      // Sin información de RAM en motherboard
      compatScore += 50;
      reasons.push(`? Sin info de RAM en motherboard`);
    }
    
    // 3. Presupuesto (50 puntos)
    if (mb.price <= budget) {
      const budgetRatio = mb.price / budget;
      compatScore += 50 * budgetRatio;
      reasons.push(`✓ Precio $${mb.price} OK`);
    } else if (mb.price <= budget * 1.15) {
      compatScore += 25;
      reasons.push(`~ Precio $${mb.price} +15%`);
    } else {
      compatScore -= 100;
      reasons.push(`✗ Precio $${mb.price} excede`);
    }
    
    // 4. Features (bonus, 30 puntos)
    const mbName = mb.name.toLowerCase();
    if (mbName.includes('wifi')) {
      compatScore += 10;
      reasons.push('+ WiFi');
    }
    if (mbName.includes('bt') || mbName.includes('bluetooth')) {
      compatScore += 5;
      reasons.push('+ BT');
    }
    
    return { mb, compatScore, compatible, mbSocket, mbRAM, mbSocketNorm, mbRAMNorm, reasons };
  });
  
  // Filtrar solo compatibles
  let compatible = scored.filter(s => s.compatible);
  
  if (compatible.length === 0) {
    console.error('\n❌ NO SE ENCONTRARON MOTHERBOARDS COMPATIBLES');
    console.log('\nMotherboards disponibles:');
    scored.slice(0, 10).forEach((s, i) => {
      console.log(`\n${i + 1}. ${s.mb.name} ($${s.mb.price})`);
      console.log(`   Socket: ${s.mbSocket} (norm: ${s.mbSocketNorm})`);
      console.log(`   RAM: ${s.mbRAM} (norm: ${s.mbRAMNorm})`);
      console.log(`   Razones: ${s.reasons.join(', ')}`);
    });
    
    // FALLBACK 1: Solo socket compatible
    console.log('\n⚠️ FALLBACK 1: Buscando solo por socket...');
    const socketOnly = scored.filter(s => {
      return s.mbSocketNorm === cpuSocketNorm || 
             (s.mbSocketNorm && cpuSocketNorm && s.mbSocketNorm.includes(cpuSocketNorm));
    });
    
    if (socketOnly.length > 0) {
      socketOnly.sort((a, b) => b.compatScore - a.compatScore);
      console.log(`✓ Encontradas ${socketOnly.length} con socket compatible`);
      console.log(`Seleccionada: ${socketOnly[0].mb.name}`);
      return socketOnly[0].mb;
    }
    
    // FALLBACK 2: Cualquier motherboard en presupuesto
    console.log('\n⚠️ FALLBACK 2: Cualquier motherboard en presupuesto...');
    const inBudget = scored.filter(s => s.mb.price <= budget * 1.2);
    if (inBudget.length > 0) {
      inBudget.sort((a, b) => b.compatScore - a.compatScore);
      console.log(`Seleccionada (sin verificar compatibilidad): ${inBudget[0].mb.name}`);
      return inBudget[0].mb;
    }
    
    return null;
  }
  
  // Ordenar por score
  compatible.sort((a, b) => b.compatScore - a.compatScore);
  
  console.log(`\n✓ ${compatible.length} motherboards compatibles`);
  console.log(`Seleccionada: ${compatible[0].mb.name} (Score: ${compatible[0].compatScore})`);
  console.log(`Razones: ${compatible[0].reasons.join(', ')}`);
  
  return compatible[0].mb;
}
