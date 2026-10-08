import { useCallback, useState } from 'react';

const STORAGE_KEY = 'recentSearches';
const MAX = 5;

const readStored = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((s) => typeof s === 'string').slice(0, MAX)
      : [];
  } catch {
    return [];
  }
};

const persist = (next) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // modo privado / storage lleno: no bloquea la búsqueda
  }
};

/**
 * Búsquedas recientes persistidas (máx. 5), sin duplicados.
 *
 * Persistimos de forma SÍNCRONA (leyendo el storage como fuente de verdad)
 * antes del setState: la búsqueda navega en el mismo tick, el componente se
 * desmonta y un updater de setState diferido se descartaría sin llegar a
 * guardar.
 */
export const useRecentSearches = () => {
  const [recent, setRecent] = useState(readStored);

  const add = useCallback((term) => {
    const clean = term.trim();
    if (clean.length < 2) return;

    const current = readStored();
    const next = [
      clean,
      ...current.filter((s) => s.toLowerCase() !== clean.toLowerCase()),
    ].slice(0, MAX);

    persist(next);
    setRecent(next);
  }, []);

  const remove = useCallback((term) => {
    const next = readStored().filter((s) => s !== term);
    persist(next);
    setRecent(next);
  }, []);

  const clear = useCallback(() => {
    persist([]);
    setRecent([]);
  }, []);

  return { recent, add, remove, clear };
};
