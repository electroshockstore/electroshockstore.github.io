import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { getAppScroller } from '../../../context/ScrollContext';

const FIST_SRC = '/herologo.png';

// Proporción real de la imagen (ancho / alto)
const FIST_ASPECT = 581 / 387;

/**
 * LandingCenterpiece — la imagen del puño/rayo como pieza persistente del
 * landing. Sigue el scroll (glide + spring) y se posiciona centrada en la
 * sección activa; en el hero se ve a tamaño completo y en el resto más chica.
 *
 * Detrás del contenido (z-0), sin capturar eventos.
 */
const LandingCenterpiece = () => {
  const topMV = useMotionValue(0);
  const scaleMV = useMotionValue(1);

  const smoothTop = useSpring(topMV, {
    stiffness: 80,
    damping: 20,
    mass: 0.7,
  });
  const smoothScale = useSpring(scaleMV, {
    stiffness: 110,
    damping: 22,
  });

  const raf = useRef(0);

  useEffect(() => {
    const scroller = getAppScroller();
    if (!scroller) return;

    const update = () => {
      const sections = Array.from(scroller.querySelectorAll('main > section'));
      if (!sections.length) return;

      const vh = scroller.clientHeight;
      const viewCenter = vh / 2;

      // Sección activa: la que tiene su centro más cerca del centro del viewport.
      let best = null;
      let bestDist = Infinity;
      sections.forEach((s, i) => {
        const r = s.getBoundingClientRect();
        if (r.height < 2) return;

        const offset = parseFloat(s.dataset.centerpiece) || 0.5;
        const center = r.top + r.height * offset;
        const dist = Math.abs(center - viewCenter);

        if (dist < bestDist) {
          bestDist = dist;
          best = { center, index: i };
        }
      });

      if (!best) return;

      topMV.set(best.center);
      scaleMV.set(best.index === 0 ? 1 : 0.5);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(update);
    };

    update();
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf.current);
    };
  }, [topMV, scaleMV]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute left-1/2"
        style={{ top: smoothTop, x: '-50%', y: '-50%', scale: smoothScale }}
      >
        <div
          className="relative"
          style={{ aspectRatio: FIST_ASPECT, height: 'min(116vh, 64vw)' }}
        >
          <img
            src={FIST_SRC}
            alt=""
            draggable={false}
            className="hero-fist-img h-full w-full object-contain"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default LandingCenterpiece;
