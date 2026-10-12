import { describe, test, expect } from 'vitest';
import { matchesSearch, applyProductFilters } from '../productFilter';

const P = (over = {}) => ({
  id: 1,
  name: 'AMD Ryzen 5 7600 AM5',
  brand: 'AMD',
  model: 'Ryzen 5 7600',
  sku: 'AMD-R5-7600',
  category: 'Procesadores',
  specifications: { Socket: 'AM5', Marca: 'AMD' },
  ...over,
});

describe('matchesSearch', () => {
  test('tokens en cualquier orden (AND)', () => {
    expect(matchesSearch(P(), '7600 ryzen')).toBe(true);
    expect(matchesSearch(P(), 'ryzen intel')).toBe(false);
  });

  test('insensible a acentos', () => {
    const p = P({ name: 'Placa de video con gráfica integrada' });
    expect(matchesSearch(p, 'grafica')).toBe(true);
    expect(matchesSearch(p, 'GRÁFICA')).toBe(true);
  });

  test('busca por SKU', () => {
    expect(matchesSearch(P(), 'r5-7600')).toBe(true);
  });

  test('query vacía matchea todo', () => {
    expect(matchesSearch(P(), '   ')).toBe(true);
  });
});

describe('applyProductFilters', () => {
  const gpu = P({ id: 2, name: 'NVIDIA RTX 4060', brand: 'NVIDIA', category: 'Placas de Video', specifications: { Chipset: 'AD104' } });

  test('la búsqueda NO ignora la categoría activa', () => {
    const res = applyProductFilters([P(), gpu], { query: 'ryzen', category: 'Procesadores' });
    expect(res.map((p) => p.id)).toEqual([1]);
  });

  test('la búsqueda NO ignora los subfiltros activos', () => {
    const res = applyProductFilters([P(), gpu], {
      query: '',
      category: null,
      subFilters: { Marca: ['AMD'] },
    });
    // GPU NVIDIA con spec Marca ausente → excluida
    expect(res.map((p) => p.id)).toEqual([1]);
  });

  test('sin query ni filtros devuelve todo', () => {
    expect(applyProductFilters([P(), gpu], {}).length).toBe(2);
  });
});
