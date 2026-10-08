import { useEffect, useRef, useState } from 'react';
import { observeReveal, unobserveReveal } from '../utils/revealObserver';

/**
 * Revela un elemento al entrar en viewport usando un observer compartido.
 * Devuelve [ref, revealed]: `revealed` va en el className para que React sea
 * dueño de la clase `scroll-revealed` y sobreviva re-renders (cambio de vista,
 * filtros) que de otro modo la borrarían al re-escribir className.
 * @param {number} delay - Delay en ms para entrada escalonada (stagger)
 * @returns {[object, boolean]} ref para asignar al elemento + estado revelado
 */
export const useRevealOnScroll = (delay = 0) => {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) return;
    const element = ref.current;
    if (!element) return;

    if (delay) element.dataset.revealDelay = String(delay);
    observeReveal(element, () => setRevealed(true));

    return () => unobserveReveal(element);
  }, [delay, revealed]);

  return [ref, revealed];
};

export default useRevealOnScroll;
