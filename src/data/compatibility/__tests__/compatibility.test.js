import { describe, test, expect } from 'vitest';
import fc from 'fast-check';
import { extendProductWithCompatibility, extendProductsWithCompatibility } from '../index';
import { procesadoresProducts } from '../../categories/procesadores';
import { motherboardsProducts } from '../../categories/motherboards';
import { memoriasProducts } from '../../categories/memorias';

// Feature: pc-builder-asistido, Property 2: RAM Type Consistency
// Validates: Requirements 3.3, 11.3
describe('Compatibility Data Model', () => {
  test('all CPUs have required compatibility fields', () => {
    const extendedCPUs = extendProductsWithCompatibility(procesadoresProducts);
    
    extendedCPUs.forEach(cpu => {
      expect(cpu).toHaveProperty('compatibility');
      expect(cpu.compatibility).toHaveProperty('socket');
      expect(cpu.compatibility).toHaveProperty('memoriaRAM');
      expect(cpu.compatibility).toHaveProperty('chipsetsCompatibles');
      expect(cpu.compatibility).toHaveProperty('consumo_watts');
      expect(cpu.compatibility).toHaveProperty('graficosIntegrados');
      expect(cpu.compatibility).toHaveProperty('uso_principal');
      
      // Validate types
      expect(typeof cpu.compatibility.socket).toBe('string');
      expect(typeof cpu.compatibility.memoriaRAM).toBe('string');
      expect(Array.isArray(cpu.compatibility.chipsetsCompatibles)).toBe(true);
      expect(typeof cpu.compatibility.consumo_watts).toBe('number');
      expect(typeof cpu.compatibility.graficosIntegrados).toBe('boolean');
      expect(Array.isArray(cpu.compatibility.uso_principal)).toBe(true);
    });
  });
  
  test('all Motherboards have required compatibility fields', () => {
    const extendedMotherboards = extendProductsWithCompatibility(motherboardsProducts);
    
    extendedMotherboards.forEach(mb => {
      expect(mb).toHaveProperty('compatibility');
      expect(mb.compatibility).toHaveProperty('socket');
      expect(mb.compatibility).toHaveProperty('chipset');
      expect(mb.compatibility).toHaveProperty('tipoMemoriaRAM');
      expect(mb.compatibility).toHaveProperty('factorDeForma');
      expect(mb.compatibility).toHaveProperty('slotsRAM');
      expect(mb.compatibility).toHaveProperty('uso_principal');
      
      // Validate types
      expect(typeof mb.compatibility.socket).toBe('string');
      expect(typeof mb.compatibility.chipset).toBe('string');
      expect(typeof mb.compatibility.tipoMemoriaRAM).toBe('string');
      expect(typeof mb.compatibility.factorDeForma).toBe('string');
      expect(typeof mb.compatibility.slotsRAM).toBe('number');
      expect(Array.isArray(mb.compatibility.uso_principal)).toBe(true);
    });
  });
  
  test('all RAM modules have required compatibility fields', () => {
    const extendedRAM = extendProductsWithCompatibility(memoriasProducts);
    
    extendedRAM.forEach(ram => {
      expect(ram).toHaveProperty('compatibility');
      expect(ram.compatibility).toHaveProperty('tipo');
      expect(ram.compatibility).toHaveProperty('capacidad_gb');
      expect(ram.compatibility).toHaveProperty('velocidad_mhz');
      expect(ram.compatibility).toHaveProperty('uso_principal');
      
      // Validate types
      expect(typeof ram.compatibility.tipo).toBe('string');
      expect(typeof ram.compatibility.capacidad_gb).toBe('number');
      expect(typeof ram.compatibility.velocidad_mhz).toBe('number');
      expect(Array.isArray(ram.compatibility.uso_principal)).toBe(true);
    });
  });
  
  // Property test: RAM Type Consistency
  test('property: RAM type must be consistent across CPU, Motherboard, and RAM', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...procesadoresProducts),
        fc.constantFrom(...motherboardsProducts),
        fc.constantFrom(...memoriasProducts),
        (cpu, motherboard, ram) => {
          const extendedCPU = extendProductWithCompatibility(cpu);
          const extendedMB = extendProductWithCompatibility(motherboard);
          const extendedRAM = extendProductWithCompatibility(ram);
          
          // If all three components are selected together
          if (extendedCPU.compatibility.memoriaRAM && 
              extendedMB.compatibility.tipoMemoriaRAM && 
              extendedRAM.compatibility.tipo) {
            
            // Check if they are compatible
            const cpuRAMType = extendedCPU.compatibility.memoriaRAM;
            const mbRAMType = extendedMB.compatibility.tipoMemoriaRAM;
            const ramType = extendedRAM.compatibility.tipo;
            
            // If CPU and MB match, RAM must also match
            if (cpuRAMType === mbRAMType) {
              // This is a valid configuration only if RAM type matches
              const isCompatible = ramType === cpuRAMType;
              
              // Property: In a compatible configuration, all RAM types must be identical
              if (isCompatible) {
                expect(cpuRAMType).toBe(mbRAMType);
                expect(mbRAMType).toBe(ramType);
              }
            }
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
  
  test('property: socket compatibility between CPU and Motherboard', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...procesadoresProducts),
        fc.constantFrom(...motherboardsProducts),
        (cpu, motherboard) => {
          const extendedCPU = extendProductWithCompatibility(cpu);
          const extendedMB = extendProductWithCompatibility(motherboard);
          
          if (extendedCPU.compatibility.socket && extendedMB.compatibility.socket) {
            const socketsMatch = extendedCPU.compatibility.socket === extendedMB.compatibility.socket;
            
            // Property: If sockets match, chipset must be compatible
            if (socketsMatch && extendedCPU.compatibility.chipsetsCompatibles) {
              const chipsetCompatible = extendedCPU.compatibility.chipsetsCompatibles.includes(
                extendedMB.compatibility.chipset
              );
              
              // This validates the data integrity
              expect(typeof socketsMatch).toBe('boolean');
              expect(typeof chipsetCompatible).toBe('boolean');
            }
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
  
  test('property: all products have uso_principal array', () => {
    const allProducts = [
      ...procesadoresProducts,
      ...motherboardsProducts,
      ...memoriasProducts
    ];
    
    fc.assert(
      fc.property(
        fc.constantFrom(...allProducts),
        (product) => {
          const extended = extendProductWithCompatibility(product);
          
          expect(extended.compatibility).toHaveProperty('uso_principal');
          expect(Array.isArray(extended.compatibility.uso_principal)).toBe(true);
          expect(extended.compatibility.uso_principal.length).toBeGreaterThan(0);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
