import { useRevealOnScroll } from './useRevealOnScroll';

/**
 * Revela elementos al hacer scroll usando el observer COMPARTIDO.
 * Devuelve [ref, revealed] (ver useRevealOnScroll).
 *
 * @param {number} delay - Delay en ms para animación escalonada
 * @returns {[object, boolean]} ref + estado revelado
 */
const useScrollReveal = ({ delay = 0 } = {}) => {
  return useRevealOnScroll(delay);
};

export default useScrollReveal;
