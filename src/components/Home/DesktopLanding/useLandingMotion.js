import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { useIsDesktop } from '../../../hooks/useMediaQuery';

/**
 * Gates de motion para el landing desktop.
 * El parallax / stacking solo se habilita en desktop real (lg),
 * sin prefers-reduced-motion, sin tier bajo (perf-low / is-low-end)
 * y fuera de iOS (mismo criterio que HeroCarousel).
 */
export const useLandingEnabled = () => {
  const isDesktop = useIsDesktop();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compute = () => {
      const low =
        document.documentElement.classList.contains('perf-low') ||
        document.documentElement.classList.contains('is-low-end');
      const ios = document.body.classList.contains('is-ios');
      setEnabled(isDesktop && !mq.matches && !low && !ios);
    };
    compute();
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', compute);
    }
    const obs = new MutationObserver(compute);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => {
      if (typeof mq.removeEventListener === 'function') {
        mq.removeEventListener('change', compute);
      }
      obs.disconnect();
    };
  }, [isDesktop]);

  return enabled;
};

/**
 * Parallax vertical atado al progreso de una sección dentro del
 * scroll-container de la app ([data-app-scroll], no window).
 * `useScroll({ target })` trackea por elemento, así que funciona
 * con cualquier scroller.
 */
export const useParallaxY = (from = 50, to = -50) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [from, to]);
  return { ref, y };
};
