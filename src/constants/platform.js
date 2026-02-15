/**
 * Constantes de plataforma para estilos y configuración
 * Centraliza valores mágicos y configuraciones específicas de plataforma
 */

// Z-Index hierarchy
export const Z_INDEX = {
  // Modales y overlays
  MODAL_MAX: 2147483647,        // Max z-index para iOS Safari
  MODAL_BACKDROP: 2147483646,   // Backdrop de modales
  MODAL_STANDARD: 999999,       // Modales estándar
  
  // UI Elements
  FLOATING_BUTTON: 99999,       // Botones flotantes
  FLOATING_BACKDROP: 99998,     // Backdrop de botones flotantes
  HEADER: 50,                   // Header sticky
  DROPDOWN: 40,                 // Dropdowns
  TOOLTIP: 30,                  // Tooltips
  
  // Base
  BASE: 1
};

// Transforms para hardware acceleration
export const TRANSFORMS = {
  // iOS requiere translate3d para forzar GPU rendering
  GPU_ACCELERATION: {
    WebkitTransform: 'translate3d(0, 0, 0)',
    transform: 'translate3d(0, 0, 0)',
    WebkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden'
  },
  
  // Transform básico sin prefijos webkit
  BASIC: {
    transform: 'translate3d(0, 0, 0)'
  }
};

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
  WIDE: 1536
};

// Configuración de Lenis por plataforma
export const LENIS_CONFIG = {
  // Desktop: Smooth scroll completo
  DESKTOP: {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
    autoResize: true,
  },
  
  // Mobile: Desactivado (null)
  MOBILE: null
};

// Duraciones de animación
export const ANIMATION_DURATION = {
  INSTANT: 150,
  FAST: 200,
  NORMAL: 300,
  SLOW: 400,
  SLOWER: 500
};

// Detección de plataforma (funciones puras)
export const detectPlatform = () => {
  if (typeof window === 'undefined') {
    return {
      isIOS: false,
      isAndroid: false,
      isMobile: false,
      isDesktop: true
    };
  }

  const ua = navigator.userAgent;
  const isMobile = window.innerWidth <= BREAKPOINTS.MOBILE;

  return {
    isIOS: /iPad|iPhone|iPod/.test(ua) && !window.MSStream,
    isAndroid: /Android/.test(ua),
    isMobile,
    isDesktop: !isMobile
  };
};

// Obtener estilos de modal según plataforma
export const getModalStyles = (isIOS = false) => {
  const baseStyles = {
    zIndex: isIOS ? Z_INDEX.MODAL_MAX : Z_INDEX.MODAL_STANDARD
  };

  // iOS necesita hardware acceleration
  if (isIOS) {
    return {
      ...baseStyles,
      ...TRANSFORMS.GPU_ACCELERATION
    };
  }

  return baseStyles;
};

// Obtener estilos de backdrop según plataforma
export const getBackdropStyles = (isIOS = false) => {
  return {
    zIndex: isIOS ? Z_INDEX.MODAL_BACKDROP : Z_INDEX.MODAL_STANDARD - 1,
    ...(isIOS ? TRANSFORMS.GPU_ACCELERATION : {})
  };
};
