import { describe, test, expect } from 'vitest';
import { checkCompatibility } from '../../../utils/compatibilityEngine';
import { extendProductsWithCompatibility } from '../index';
import procesadoresData from '../../categories/procesadores.json';
import motherboardsData from '../../categories/motherboards.json';
import memoriasData from '../../categories/memorias.json';

const cpus = extendProductsWithCompatibility(procesadoresData.products);
const mbs = extendProductsWithCompatibility(motherboardsData.products);
const rams = extendProductsWithCompatibility(memoriasData.products);

const emptyBuild = () => ({
  cpu: null, motherboard: null, ram: [], gpu: null,
  psu: null, storage: [], case: null, cooling: null, monitor: null,
});

const byName = (list, part) => list.find(p => p.name.includes(part));

// Feature: builder-especializado — el socket manda, sin importar los mapas viejos
describe('Especialista en sockets', () => {
  test('matriz completa CPU×Mother: el specification.Socket siempre manda', () => {
    const specSocket = (p) =>
      String(p.specifications?.Socket ?? '').toUpperCase().replace(/[\s\-_]/g, '').replace(/^FCLGA/, 'LGA');
    for (const cpu of cpus) {
      const build = { ...emptyBuild(), cpu };
      for (const mb of mbs) {
        const r = checkCompatibility(build, mb, 'Motherboards');
        const same = specSocket(cpu) === specSocket(mb);
        const socketErr = r.messages.some(m => m.type === 'error' && /socket incompatible/i.test(m.text));
        if (same) {
          expect(socketErr).toBe(false);
        } else {
          expect(socketErr).toBe(true);
        }
      }
    }
  });

  test('CPU AM4 (5700G) rechaza mothers AM5 y acepta AM4', () => {
    const cpu = byName(cpus, '5700G');
    const build = { ...emptyBuild(), cpu };
    const am5 = byName(mbs, 'A620M-PLUS');
    const rBad = checkCompatibility(build, am5, 'Motherboards');
    expect(rBad.status).toBe('red');
    expect(rBad.reasons.join(' ')).toMatch(/Socket incompatible/i);

    const am4 = byName(mbs, 'A520M-K');
    const rOk = checkCompatibility(build, am4, 'Motherboards');
    expect(rOk.status).toBe('green');
  });

  test('CPU AM5 (7600) rechaza mothers AM4', () => {
    const cpu = byName(cpus, 'Ryzen 5 7600');
    const build = { ...emptyBuild(), cpu };
    const am4 = byName(mbs, 'A520M-K');
    const r = checkCompatibility(build, am4, 'Motherboards');
    expect(r.status).toBe('red');
  });

  test('Intel FCLGA1200 matchea mother LGA1200 (normalización de socket)', () => {
    const cpu = byName(cpus, 'i5-11400');
    const build = { ...emptyBuild(), cpu };
    const mb = byName(mbs, 'B460M-A');
    const r = checkCompatibility(build, mb, 'Motherboards');
    expect(r.status).toBe('green');
  });

  test('CPU DDR4/DDR5 (12700KF) acepta RAM DDR4', () => {
    const cpu = byName(cpus, '12700KF');
    const build = { ...emptyBuild(), cpu };
    const ddr4 = rams.find(r => r.ddrType === 'DDR4' && !r.name.includes('SODIMM'));
    const r = checkCompatibility(build, ddr4, 'Memorias RAM');
    expect(r.status).toBe('green');
  });

  test('CPU AM4 + RAM DDR5 es error, + DDR4 es ok', () => {
    const cpu = byName(cpus, '5700G');
    const build = { ...emptyBuild(), cpu };
    const ddr5 = rams.find(r => r.ddrType === 'DDR5');
    expect(checkCompatibility(build, ddr5, 'Memorias RAM').status).toBe('red');
    const ddr4 = rams.find(r => r.ddrType === 'DDR4' && !r.name.includes('SODIMM'));
    expect(checkCompatibility(build, ddr4, 'Memorias RAM').status).toBe('green');
  });
});
