import { memo } from 'react';
import useInViewport from '../../hooks/useInViewport';

/**
 * Componente Reveal con CSS nativo - Reemplazo de MotionReveal
 * Usa IntersectionObserver + CSS animations para mejor rendimiento
 * 
 * @param {string} animation - Tipo: 'fade-in', 'slide-up', 'slide-left', 'slide-right'
 * @param {number} delay - Delay en segundos
 * @param {string} as - Tag HTML (default: 'div')
 */
const Reveal = memo(({ 
  children, 
  animation = 'fade-in',
  delay = 0,
  as = 'div',
  className = '',
  ...props 
}) => {
  const [ref, isInView] = useInViewport({ threshold: 0.1 });
  
  const Component = as;
  
  // Clase base + animación + estado
  const classes = `
    reveal-element
    reveal-${animation}
    ${isInView ? 'reveal-visible' : 'reveal-hidden'}
    ${className}
  `.trim();

  const style = {
    animationDelay: `${delay}s`,
  };

  return (
    <Component 
      ref={ref} 
      className={classes}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
});

Reveal.displayName = 'Reveal';

export default Reveal;
