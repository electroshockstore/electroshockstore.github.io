import { motion } from 'framer-motion';
import useIOSDetection from '../../hooks/useIOSDetection';

const HeroSection = () => {
  const isIOS = useIOSDetection();
  // Variantes de animación
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 overflow-hidden">
      {/* Animated background blobs - Optimizado para iOS */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className={`absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full ${isIOS ? 'blur-2xl' : 'blur-3xl'}`}
          animate={isIOS ? {} : { 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={isIOS ? {} : { 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className={`absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full ${isIOS ? 'blur-2xl' : 'blur-3xl'}`}
          animate={isIOS ? {} : { 
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.25, 0.2]
          }}
          transition={isIOS ? {} : { 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white mb-4 sm:mb-8 leading-[0.9] px-4">
            {/* Primera palabra */}
            <motion.span 
              className="inline-block mr-2 sm:mr-4 text-white"
              custom={0}
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              style={{ willChange: 'opacity, transform' }}
            >
              ¿
            </motion.span>
            
            {/* Palabras destacadas con marker effect BRUTAL */}
            <motion.span 
              className="inline-block relative"
              custom={1}
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              style={{ willChange: 'opacity, transform' }}
            >
              {/* Múltiples capas de marker para efecto 3D brutal */}
              <span className="absolute inset-0 bg-blue-500 -skew-x-6 rotate-[-2deg] opacity-95 translate-x-1 translate-y-1" />
              <span className="absolute inset-0 bg-blue-500 -skew-x-6 rotate-[-1deg] opacity-90" />
              
              {/* Texto sobre el marker - ULTRA BOLD */}
              <span 
                className="relative text-black px-2 sm:px-5 md:px-8 inline-block font-black uppercase"
                style={{
                  textShadow: '1px 1px 0px rgba(0,0,0,0.3)',
                  letterSpacing: '-0.02em'
                }}
              >
                Dónde Retiro
              </span>
              
              {/* Glow effect brutal - Solo desktop - Optimizado para iOS */}
              <span className={`hidden sm:block absolute inset-0 bg-blue-500 ${isIOS ? 'blur-xl' : 'blur-2xl'} opacity-60 ${isIOS ? '' : 'animate-pulse'}`} />
            </motion.span>
            
            <br />
            
            {/* Segunda línea */}
            <motion.span 
              className="inline-block mr-2 sm:mr-4 text-white"
              custom={2}
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              style={{ willChange: 'opacity, transform' }}
            >
              Los
            </motion.span>
            <motion.span 
              className="inline-block text-white"
              custom={3}
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              style={{ willChange: 'opacity, transform' }}
            >
              Productos?
            </motion.span>
          </h1>
          
          <motion.p 
            className="text-lg sm:text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4 font-semibold"
            variants={descriptionVariants}
            initial="hidden"
            animate="visible"
            style={{ willChange: 'opacity, transform' }}
          >
            Elegí el punto más cercano y coordiná tu entrega <span className="text-blue-400 font-black">segura</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
