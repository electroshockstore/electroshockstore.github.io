/**
 * Hook MEJORADO para Scroll Reveal con Framer Motion
 * 
 * OPTIMIZACIONES CRÍTICAS:
 * 1. once: true - Animar solo UNA VEZ (no recalcular en cada scroll)
 * 2. amount: 0.1 - Trigger cuando 10% es visible
 * 3. margin negativo - Pre-trigger antes de entrar al viewport
 * 4. Solo opacity + transform - GPU accelerated
 * 5. willChange pre-declarado - Hint al navegador
 * 6. Easing mejorado para sensación premium
 * 
 * REGLA DE ORO: NUNCA animar width, height, top, left, margin, padding
 * Solo: opacity, scale, x, y, rotate
 * 
 * @param {string} animation - Tipo de animación: 'fade-in', 'slide-up', 'slide-left', 'slide-right', 'scale'
 * @param {number} delay - Delay en segundos (default: 0)
 * @param {number} duration - Duración en segundos (default: 0.8 - más suave)
 * @returns {Object} Variantes de animación para motion components
 */
const useMotionReveal = (animation = 'fade-in', delay = 0, duration = 0.8) => {
  // Easing premium para sensación más suave
  const premiumEasing = [0.25, 0.1, 0.25, 1]; // cubic-bezier similar a ease-out pero más suave
  
  // Variantes MEJORADAS (más notorias pero suaves)
  const variants = {
    'fade-in': {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration, delay, ease: premiumEasing }
      }
    },
    'slide-up': {
      hidden: { opacity: 0, y: 50 }, // Aumentado de 30 a 50 para ser más notorio
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration, delay, ease: premiumEasing }
      }
    },
    'slide-down': {
      hidden: { opacity: 0, y: -50 }, // Aumentado de -30 a -50
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration, delay, ease: premiumEasing }
      }
    },
    'slide-left': {
      hidden: { opacity: 0, x: 50 }, // Aumentado de 30 a 50
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration, delay, ease: premiumEasing }
      }
    },
    'slide-right': {
      hidden: { opacity: 0, x: -50 }, // Aumentado de -30 a -50
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration, delay, ease: premiumEasing }
      }
    },
    'scale': {
      hidden: { opacity: 0, scale: 0.92 }, // Reducido de 0.95 a 0.92 para ser más notorio
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration, delay, ease: premiumEasing }
      }
    },
    'scale-up': {
      hidden: { opacity: 0, scale: 0.85 }, // Reducido de 0.9 a 0.85
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration, delay, ease: premiumEasing }
      }
    },
    // Nueva animación: slide-up con scale combinado (muy premium)
    'slide-scale': {
      hidden: { opacity: 0, y: 40, scale: 0.95 },
      visible: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        transition: { duration, delay, ease: premiumEasing }
      }
    }
  };

  return {
    variants: variants[animation] || variants['fade-in'],
    // Props OPTIMIZADOS
    initial: "hidden",
    whileInView: "visible",
    viewport: { 
      once: true, // ⚡ CRÍTICO: Solo animar UNA VEZ
      amount: 0.1, // Trigger cuando 10% es visible
      margin: "0px 0px -100px 0px" // Pre-trigger 100px antes para animación más temprana
    },
    // ⚡ CRÍTICO: Pre-declarar will-change para GPU
    style: { 
      willChange: 'opacity, transform',
      // Forzar GPU layer
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden'
    }
  };
};

export default useMotionReveal;
