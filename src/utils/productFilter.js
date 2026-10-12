import { getSpecValue } from './filterConfig';
import { normalizeFilterValue } from './filterNormalizers';

/** Normaliza para comparar: minúsculas, sin acentos ni espacios extremos. */
export const normalizeText = (str = '') =>
  str
    .toString()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();

const SEARCH_FIELDS = ['name', 'brand', 'model', 'sku', 'category'];

/**
 * Búsqueda por tokens (AND): cada palabra del query debe aparecer en
 * alguno de los campos del producto. Insensible a acentos y mayúsculas.
 * "7600 ryzen" matchea "AMD Ryzen 5 7600" aunque el orden no coincida.
 */
export function matchesSearch(product, query) {
  const tokens = normalizeText(query).split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;
  const haystack = SEARCH_FIELDS.map((f) => normalizeText(product?.[f])).join(' ');
  return tokens.every((t) => haystack.includes(t));
}

function matchesSubFilters(product, subFilters) {
  const activeFilters = Object.entries(subFilters ?? {}).filter(
    ([, values]) => values?.length > 0
  );
  if (activeFilters.length === 0) return true;
  if (!product.specifications) return false;

  return activeFilters.every(([filterType, selectedValues]) => {
    const specValue = getSpecValue(product.specifications, filterType);
    if (!specValue) return false;
    const normalizedProductValue = normalizeFilterValue(filterType, specValue);
    if (!normalizedProductValue || normalizedProductValue === '' || normalizedProductValue === 'null') {
      return false;
    }
    return selectedValues.some((selectedValue) => {
      const normalizedSelected = normalizeFilterValue(filterType, selectedValue);
      if (!normalizedSelected || normalizedSelected === '' || normalizedSelected === 'null') {
        return false;
      }
      return (
        normalizedProductValue.toString().toLowerCase().trim() ===
        normalizedSelected.toString().toLowerCase().trim()
      );
    });
  });
}

/**
 * Filtrado conjuntivo: query + categoría + subfiltros se aplican SIEMPRE
 * juntos (AND). Antes la búsqueda ignoraba la categoría y los subfiltros,
 * así que escribir en /categoria/procesadores mostraba GPUs y RAMs.
 */
export function applyProductFilters(products, { query = '', category = null, subFilters = {} } = {}) {
  const q = (query ?? '').trim();
  return (products ?? []).filter((p) => {
    if (category && p.category !== category) return false;
    if (q && !matchesSearch(p, q)) return false;
    if (!matchesSubFilters(p, subFilters)) return false;
    return true;
  });
}
