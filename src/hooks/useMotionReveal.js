/**
 * Hook optimizado para Scroll Reveal con Framer Motion
 * Mucho más eficiente que IntersectionObserver + CSS
 * 
 * Ventajas sobre useScrollReveal:
 * - GPU-accelerated (solo opacity + transform)
 * - No depende de clases CSS que el navegador puede ignorar
 * - Mejor performance en modos de ahorro de energía
 * - Animaciones más suaves y consistentes
 * 
 * @param {string} animation - Tipo de animación: 'fade-in', 'slide-up', 'slide-left', 'slide-right', 'scale'
 * @param {number} delay - Delay en segundos (default: 0)
 * @param {number} duration - Duración en segundos (default: 0.6)
 * @returns {Object} Variantes de animación para motion components
 */
const useMotionReveal = (animation = 'fade-in', delay = 0, duration = 0.6) => {
  // Variantes predefinidas optimizadas (solo opacity + transform)
  const variants = {
    'fade-in': {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration, delay, ease: [0.16, 1, 0.3, 1] }
      }
    },
    'slide-up': {
      hidden: { opacity: 0, y: 40 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration, delay, ease: [0.16, 1, 0.3, 1] }
      }
    },
    'slide-down': {
      hidden: { opacity: 0, y: -40 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration, delay, ease: [0.16, 1, 0.3, 1] }
      }
    },
    'slide-left': {
      hidden: { opacity: 0, x: 40 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration, delay, ease: [0.16, 1, 0.3, 1] }
      }
    },
    'slide-right': {
      hidden: { opacity: 0, x: -40 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration, delay, ease: [0.16, 1, 0.3, 1] }
      }
    },
    'scale': {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration, delay, ease: [0.16, 1, 0.3, 1] }
      }
    },
    'scale-up': {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration, delay, ease: [0.16, 1, 0.3, 1] }
      }
    }
  };

  return {
    variants: variants[animation] || variants['fade-in'],
    // Props comunes para motion components
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.1 }, // Trigger cuando 10% es visible
    style: { willChange: 'opacity, transform' } // Pre-optimización GPU
  };
};

export default useMotionReveal;
