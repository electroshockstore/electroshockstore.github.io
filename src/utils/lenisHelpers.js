/**
 * Utilidades helper para Lenis
 * Funciones auxiliares para trabajar con smooth scroll
 */

/**
 * Detiene el scroll temporalmente (útil para modales)
 * @param {Lenis} lenis - Instancia de Lenis
 */
export const stopScroll = (lenis) => {
  if (lenis) {
    lenis.stop();
  } else {
    document.body.style.overflow = 'hidden';
  }
};

/**
 * Reanuda el scroll
 * @param {Lenis} lenis - Instancia de Lenis
 */
export const startScroll = (lenis) => {
  if (lenis) {
    lenis.start();
  } else {
    document.body.style.overflow = '';
  }
};

/**
 * Scroll suave a un elemento con offset
 * @param {Lenis} lenis - Instancia de Lenis
 * @param {string|HTMLElement} target - Selector o elemento
 * @param {number} offset - Offset en píxeles (negativo para arriba)
 * @param {number} duration - Duración en segundos
 */
export const scrollToWithOffset = (lenis, target, offset = 0, duration = 1.2) => {
  if (lenis) {
    lenis.scrollTo(target, {
      offset,
      duration,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
  } else {
    // Fallback a scroll nativo
    const element = typeof target === 'string' 
      ? document.querySelector(target) 
      : target;
    
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
};

/**
 * Obtiene la posición actual del scroll
 * @param {Lenis} lenis - Instancia de Lenis
 * @returns {number} Posición del scroll
 */
export const getScrollPosition = (lenis) => {
  if (lenis) {
    return lenis.scroll;
  }
  return window.pageYOffset || document.documentElement.scrollTop;
};

/**
 * Verifica si el scroll está en la parte superior
 * @param {Lenis} lenis - Instancia de Lenis
 * @param {number} threshold - Umbral en píxeles
 * @returns {boolean}
 */
export const isScrollAtTop = (lenis, threshold = 50) => {
  return getScrollPosition(lenis) < threshold;
};

/**
 * Verifica si el scroll está en la parte inferior
 * @param {Lenis} lenis - Instancia de Lenis
 * @param {number} threshold - Umbral en píxeles
 * @returns {boolean}
 */
export const isScrollAtBottom = (lenis, threshold = 50) => {
  const scrollPosition = getScrollPosition(lenis);
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  
  return scrollPosition + windowHeight >= documentHeight - threshold;
};

/**
 * Añade clase al body cuando se está scrolleando
 * Útil para efectos visuales en el header
 * @param {Lenis} lenis - Instancia de Lenis
 * @param {string} className - Clase a añadir
 * @param {number} threshold - Umbral en píxeles
 */
export const addScrollClass = (lenis, className = 'is-scrolled', threshold = 50) => {
  const handleScroll = () => {
    const scrolled = getScrollPosition(lenis) > threshold;
    document.body.classList.toggle(className, scrolled);
  };

  if (lenis) {
    lenis.on('scroll', handleScroll);
    return () => lenis.off('scroll', handleScroll);
  } else {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }
};

export default {
  stopScroll,
  startScroll,
  scrollToWithOffset,
  getScrollPosition,
  isScrollAtTop,
  isScrollAtBottom,
  addScrollClass
};
