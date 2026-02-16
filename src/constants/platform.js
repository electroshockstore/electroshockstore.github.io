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
      isDesktop: true,
      isLowEnd: false
    };
  }

  const ua = navigator.userAgent;
  const isMobile = window.innerWidth <= BREAKPOINTS.MOBILE;

  return {
    isIOS: /iPad|iPhone|iPod/.test(ua) && !window.MSStream,
    isAndroid: /Android/.test(ua),
    isMobile,
    isDesktop: !isMobile,
    isLowEnd: false // Se detecta dinámicamente con detectPerformance()
  };
};

// Detección de performance del dispositivo
export const detectPerformance = () => {
  if (typeof window === 'undefined') {
    return {
      tier: 'high',
      isLowEnd: false,
      fps: 60,
      cores: 4,
      memory: 8
    };
  }

  const result = {
    tier: 'high',
    isLowEnd: false,
    fps: 60,
    cores: navigator.hardwareConcurrency || 4,
    memory: navigator.deviceMemory || 8
  };

  // Factores de detección
  const factors = {
    // 1. Memoria RAM
    lowMemory: result.memory <= 4,
    
    // 2. Núcleos de CPU
    lowCores: result.cores <= 2,
    
    // 3. Resolución de pantalla (más píxeles = más trabajo)
    highResolution: window.innerWidth * window.innerHeight > 2073600, // > 1920x1080
    
    // 4. Device pixel ratio alto
    highDPR: window.devicePixelRatio > 2,
    
    // 5. GPU integrada débil (heurística basada en UA)
    integratedGPU: /Intel|HD Graphics|UHD Graphics/i.test(navigator.userAgent)
  };

  // Calcular score (0-5, donde 5 es peor)
  const score = Object.values(factors).filter(Boolean).length;

  // Clasificar tier
  if (score >= 3) {
    result.tier = 'low';
    result.isLowEnd = true;
  } else if (score >= 2) {
    result.tier = 'medium';
    result.isLowEnd = false;
  } else {
    result.tier = 'high';
    result.isLowEnd = false;
  }

  // Logging para debug
  console.log('[Performance Detection]', {
    tier: result.tier,
    factors,
    score,
    resolution: `${window.innerWidth}x${window.innerHeight}`,
    dpr: window.devicePixelRatio,
    cores: result.cores,
    memory: result.memory
  });

  return result;
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
