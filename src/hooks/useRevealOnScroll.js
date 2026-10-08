import { useEffect, useRef } from 'react';
import { observeReveal, unobserveReveal } from '../utils/revealObserver';

/**
 * Revela un elemento al entrar en viewport usando un observer compartido.
 * @param {number} delay - Delay en ms para entrada escalonada (stagger)
 * @returns {object} ref para asignar al elemento (debe tener clase product-card-reveal)
 */
export const useRevealOnScroll = (delay = 0) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (delay) element.dataset.revealDelay = String(delay);
    observeReveal(element);

    return () => unobserveReveal(element);
  }, [delay]);

  return ref;
};

export default useRevealOnScroll;
