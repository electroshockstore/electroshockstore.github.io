import { useState, useEffect } from 'react';

/**
 * Debouncea un valor: actualiza `debounced` solo después de `delay` ms
 * sin cambios. Ideal para búsqueda/filtros sin re-filtrar por tecla.
 */
export const useDebouncedValue = (value, delay = 250) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
};
