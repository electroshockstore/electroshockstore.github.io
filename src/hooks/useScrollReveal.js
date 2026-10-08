import { useRevealOnScroll } from './useRevealOnScroll';

/**
 * Revela elementos al hacer scroll usando el observer COMPARTIDO
 * (antes creaba un IntersectionObserver por elemento).
 *
 * @param {number} threshold - (deprecado, el observer usa su propia config)
 * @param {string} rootMargin - (deprecado)
 * @param {number} delay - Delay en ms para animación escalonada
 * @returns {object} ref para asignar al elemento
 */
const useScrollReveal = ({ delay = 0 } = {}) => {
  return useRevealOnScroll(delay);
};

export default useScrollReveal;
