import { motion } from 'framer-motion';

/**
 * BentoGrid - Layout reutilizable para grids tipo bento
 * 
 * @param {Object} props
 * @param {Array} props.items - Array de items a renderizar
 * @param {Function} props.renderItem - Función que renderiza cada item (item, index) => JSX
 * @param {Object} props.mobileLayout - Configuración del layout móvil
 * @param {string} props.mobileLayout.cols - Columnas del grid (ej: '2fr 1fr' o 'repeat(2, 1fr)')
 * @param {Array} props.mobileLayout.areas - Array de objetos con gridColumn, gridRow para cada item
 * @param {string} props.mobileLayout.gap - Gap entre items (default: 'gap-3')
 * @param {Object} props.desktopLayout - Configuración del layout desktop (opcional)
 * @param {boolean} props.animate - Habilitar animaciones (default: true)
 */
const BentoGrid = ({
  items = [],
  renderItem,
  mobileLayout = { cols: 'repeat(2, 1fr)', gap: 'gap-3' },
  desktopLayout,
  animate = true,
  className = ''
}) => {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const MotionWrapper = animate ? motion.div : 'div';
  const motionProps = animate ? {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-100px" },
    variants: containerVariants
  } : {};

  return (
    <MotionWrapper
      {...motionProps}
      className={`w-full ${className}`}
    >
      <div 
        className={`grid ${mobileLayout.gap || 'gap-3'}`}
        style={{ 
          gridTemplateColumns: mobileLayout.cols,
          ...(mobileLayout.rows && { gridTemplateRows: mobileLayout.rows })
        }}
      >
        {items.map((item, index) => {
          const area = mobileLayout.areas?.[index] || {};
          const ItemWrapper = animate ? motion.div : 'div';
          const itemMotionProps = animate ? { variants: cardVariants } : {};

          return (
            <ItemWrapper
              key={item.id || index}
              {...itemMotionProps}
              style={{
                ...(area.gridColumn && { gridColumn: area.gridColumn }),
                ...(area.gridRow && { gridRow: area.gridRow }),
                ...(area.height && { height: area.height })
              }}
              className={area.gridRow === 'span 2' ? 'row-span-2' : ''}
            >
              {renderItem(item, index)}
            </ItemWrapper>
          );
        })}
      </div>
    </MotionWrapper>
  );
};

export default BentoGrid;
