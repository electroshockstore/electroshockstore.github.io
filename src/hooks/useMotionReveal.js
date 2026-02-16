/**
 * Hook ULTRA-OPTIMIZADO para Scroll Reveal con Framer Motion + Lenis
 * 
 * OPTIMIZACIONES CRÍTICAS PARA LENIS:
 * 1. once: true - Animar solo UNA VEZ (no recalcular en cada scroll)
 * 2. amount: 0.05 - Trigger temprano (menos cálculos)
 * 3. margin negativo - Pre-trigger antes de entrar al viewport
 * 4. Solo opacity + transform - GPU accelerated
 * 5. willChange pre-declarado - Hint al navegador
 * 
 * REGLA DE ORO: NUNCA animar width, height, top, left, margin, padding
 * Solo: opacity, scale, x, y, rotate
 * 
 * @param {string} animation - Tipo de animación: 'fade-in', 'slide-up', 'slide-left', 'slide-right', 'scale'
 * @param {number} delay - Delay en segundos (default: 0)
 * @param {number} duration - Duración en segundos (default: 0.6)
 * @returns {Object} Variantes de animación para motion components
 */
const useMotionReveal = (animation = 'fade-in', delay = 0, duration = 0.6) => {
  // Variantes ULTRA-OPTIMIZADAS (solo opacity + transform)
  // Easing simplificado para menos cálculos
  const variants = {
    'fade-in': {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration, delay, ease: "easeOut" }
      }
    },
    'slide-up': {
      hidden: { opacity: 0, y: 30 }, // Reducido de 40 a 30
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration, delay, ease: "easeOut" }
      }
    },
    'slide-down': {
      hidden: { opacity: 0, y: -30 }, // Reducido de -40 a -30
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration, delay, ease: "easeOut" }
      }
    },
    'slide-left': {
      hidden: { opacity: 0, x: 30 }, // Reducido de 40 a 30
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration, delay, ease: "easeOut" }
      }
    },
    'slide-right': {
      hidden: { opacity: 0, x: -30 }, // Reducido de -40 a -30
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration, delay, ease: "easeOut" }
      }
    },
    'scale': {
      hidden: { opacity: 0, scale: 0.95 }, // Reducido de 0.9 a 0.95
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration, delay, ease: "easeOut" }
      }
    },
    'scale-up': {
      hidden: { opacity: 0, scale: 0.9 }, // Reducido de 0.8 a 0.9
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration, delay, ease: "easeOut" }
      }
    }
  };

  return {
    variants: variants[animation] || variants['fade-in'],
    // Props ULTRA-OPTIMIZADOS para Lenis
    initial: "hidden",
    whileInView: "visible",
    viewport: { 
      once: true, // ⚡ CRÍTICO: Solo animar UNA VEZ (no recalcular)
      amount: 0.05, // ⚡ CRÍTICO: Trigger con 5% visible (menos cálculos)
      margin: "0px 0px -50px 0px" // ⚡ Pre-trigger 50px antes
    },
    // ⚡ CRÍTICO: Pre-declarar will-change para GPU
    style: { 
      willChange: 'opacity, transform',
      // Forzar GPU layer
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden'
    }
  };
};

export default useMotionReveal;
