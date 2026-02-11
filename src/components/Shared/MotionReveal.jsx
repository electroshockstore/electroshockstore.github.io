import { motion } from 'framer-motion';
import useMotionReveal from '../../hooks/useMotionReveal';

/**
 * Componente wrapper para scroll reveal con Framer Motion
 * Reemplazo directo de elementos con useScrollReveal
 * 
 * Uso:
 * <MotionReveal animation="slide-up">
 *   <div>Tu contenido</div>
 * </MotionReveal>
 * 
 * @param {string} animation - Tipo de animación
 * @param {number} delay - Delay en segundos
 * @param {number} duration - Duración en segundos
 * @param {string} as - Elemento HTML a renderizar (default: 'div')
 * @param {Object} ...props - Props adicionales para el motion component
 */
const MotionReveal = ({ 
  animation = 'fade-in', 
  delay = 0, 
  duration = 0.6,
  as = 'div',
  children,
  className = '',
  ...props 
}) => {
  const motionProps = useMotionReveal(animation, delay, duration);
  const MotionComponent = motion[as];

  return (
    <MotionComponent
      {...motionProps}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

export default MotionReveal;
