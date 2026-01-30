/**
 * Device Detection & Performance Utilities
 * Detecta capacidades del dispositivo para optimizar performance
 */

/**
 * Detecta si el dispositivo es mobile
 */
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Detecta si es un dispositivo de baja potencia
 */
export const isLowEndDevice = () => {
  if (typeof window === 'undefined') return false;
  
  // Menos de 4 cores o menos de 4GB RAM
  const lowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;
  
  return lowCores || lowMemory;
};

/**
 * Detecta si el usuario prefiere animaciones reducidas
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Determina si se deben reducir las animaciones
 * Combina mobile, low-end device y preferencias del usuario
 */
export const shouldReduceAnimations = () => {
  return isMobile() || isLowEndDevice() || prefersReducedMotion();
};

/**
 * Detecta si es iOS
 */
export const isIOS = () => {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};

/**
 * Detecta si es Android
 */
export const isAndroid = () => {
  if (typeof window === 'undefined') return false;
  return /Android/i.test(navigator.userAgent);
};

/**
 * Obtiene el tipo de conexión (si está disponible)
 */
export const getConnectionType = () => {
  if (typeof window === 'undefined') return 'unknown';
  
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  if (!connection) return 'unknown';
  
  return connection.effectiveType || 'unknown';
};

/**
 * Detecta si la conexión es lenta
 */
export const isSlowConnection = () => {
  const connectionType = getConnectionType();
  return connectionType === 'slow-2g' || connectionType === '2g';
};

/**
 * Determina el nivel de performance del dispositivo
 * @returns {'high' | 'medium' | 'low'}
 */
export const getPerformanceLevel = () => {
  if (shouldReduceAnimations()) return 'low';
  if (isLowEndDevice()) return 'medium';
  return 'high';
};

/**
 * Configuración de animaciones según el dispositivo
 */
export const getAnimationConfig = () => {
  const level = getPerformanceLevel();
  
  return {
    enableBlur: level === 'high',
    enableParticles: level === 'high',
    enableComplexAnimations: level !== 'low',
    blurAmount: level === 'high' ? 'full' : level === 'medium' ? 'reduced' : 'none',
    animationDuration: level === 'high' ? 'normal' : 'fast',
  };
};

/**
 * Hook para agregar clase al body según el dispositivo
 */
export const addDeviceClasses = () => {
  if (typeof document === 'undefined') return;
  
  const body = document.body;
  
  if (isMobile()) body.classList.add('is-mobile');
  if (isIOS()) body.classList.add('is-ios');
  if (isAndroid()) body.classList.add('is-android');
  if (isLowEndDevice()) body.classList.add('is-low-end');
  if (shouldReduceAnimations()) body.classList.add('reduce-animations');
};

/**
 * Inicializar detección de dispositivo
 * Llamar al inicio de la app
 */
export const initDeviceDetection = () => {
  addDeviceClasses();
  
  // Log para debugging (solo en desarrollo)
  if (process.env.NODE_ENV === 'development') {
    console.log('🔍 Device Detection:', {
      isMobile: isMobile(),
      isIOS: isIOS(),
      isAndroid: isAndroid(),
      isLowEnd: isLowEndDevice(),
      shouldReduceAnimations: shouldReduceAnimations(),
      performanceLevel: getPerformanceLevel(),
      connectionType: getConnectionType(),
    });
  }
};
