import { useState, useEffect } from 'react';

/**
 * Suscribe a un media query (mirrors Tailwind breakpoints).
 * @param {string} query - ej. '(min-width: 1024px)'
 * @returns {boolean} si el query matchea
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
};

/** True en desktop (Tailwind `lg` = 1024px). */
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');

export default useMediaQuery;
