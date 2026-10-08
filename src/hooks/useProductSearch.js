import { useMemo } from 'react';
import { products } from '../data';
import { useDebouncedValue } from './useDebouncedValue';

/** Normaliza para comparar: minúsculas, sin acentos ni espacios extremos. */
const normalize = (str = '') =>
  str
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

/**
 * Búsqueda de productos unificada (Fase 6): debounce + normalización de
 * acentos + ranking por relevancia. Fuente única para el dropdown del header
 * y para el filtrado del catálogo.
 *
 * @param {string} query - Texto crudo del input
 * @param {{limit?: number, delay?: number}} options
 * @returns {{results: Array, total: number, term: string, isStale: boolean}}
 */
export const useProductSearch = (query, { limit = 6, delay = 200 } = {}) => {
  const debouncedQuery = useDebouncedValue(query, delay);
  const term = normalize(debouncedQuery);

  const { results, total } = useMemo(() => {
    if (term.length < 2) return { results: [], total: 0 };

    const scored = [];
    for (const product of products) {
      const name = normalize(product.name);
      const brand = normalize(product.brand);
      const model = normalize(product.model);
      const category = normalize(product.category);

      let score = 0;
      if (name.startsWith(term)) score = 100;
      else if (name.includes(term)) score = 80;
      else if (brand.startsWith(term)) score = 60;
      else if (model.includes(term)) score = 55;
      else if (brand.includes(term)) score = 40;
      else if (category.includes(term)) score = 20;

      if (score > 0) scored.push({ product, score });
    }

    scored.sort(
      (a, b) => b.score - a.score || a.product.name.localeCompare(b.product.name)
    );

    return {
      results: scored.slice(0, limit).map((s) => s.product),
      total: scored.length,
    };
  }, [term, limit]);

  return {
    results,
    total,
    term: debouncedQuery,
    // true mientras el usuario sigue tipeando y el debounce no aplicó
    isStale: query !== debouncedQuery,
  };
};
