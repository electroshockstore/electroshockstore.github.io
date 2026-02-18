import { memo } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, MapPinOff } from 'lucide-react';

const AdditionalInfoSection = memo(() => {
  // Animation variants - GPU-accelerated properties only
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <motion.div 
      className="relative py-8 sm:py-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      style={{ willChange: 'opacity, transform' }}
    >
      {/* Resplandor ambiental con filter inline */}
      <div 
        className="absolute -inset-1 bg-gradient-to-r from-yellow-600/10 via-orange-600/10 to-yellow-600/10 opacity-50 rounded-[2.5rem]" 
        style={{ filter: 'blur(16px)' }}
      />

      {/* Contenedor Principal ultra-optimizado - sin backdrop-blur */}
      <motion.div 
        className="relative bg-gray-900/95 rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 md:p-10 border border-white/10 overflow-hidden shadow-2xl"
        variants={itemVariants}
        style={{ willChange: 'opacity, transform' }}
      >
        
        {/* Decoración de luz interna ULTRA-OPTIMIZADA - sin blur */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-500/5 rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-orange-600/5 rounded-full pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-5 sm:gap-8">
          
          {/* Icono simplificado - sin glow animado */}
          <motion.div 
            className="relative flex-shrink-0"
            variants={itemVariants}
            style={{ willChange: 'opacity, transform' }}
          >
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-yellow-500/50 shadow-lg">
              <AlertTriangle className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-400" strokeWidth={2.5} />
            </div>
          </motion.div>

          {/* Contenido de Texto */}
          <motion.div 
            className="flex-1 text-center md:text-left"
            variants={itemVariants}
            style={{ willChange: 'opacity, transform' }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-3 sm:mb-4"
              variants={itemVariants}
              style={{ willChange: 'opacity, transform' }}
            >
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-500" />
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500/90">Aviso de Disponibilidad</span>
            </motion.div>

            <motion.h3 
              className="text-xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4 tracking-tight leading-tight"
              variants={itemVariants}
              style={{ willChange: 'opacity, transform' }}
            >
              Importante sobre <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-400 bg-clip-text text-transparent">los horarios</span>
            </motion.h3>

            <motion.div 
              className="space-y-3 sm:space-y-4"
              variants={itemVariants}
              style={{ willChange: 'opacity, transform' }}
            >
              <div className="relative inline-block">
                <p className="text-base sm:text-xl text-gray-200 leading-relaxed font-medium">
                  <span className="relative z-10">
                    <strong className="text-yellow-400 font-black">solo en los puntos de retiro seguros</strong>,
                    no se viaja a otro lado por falta de tiempo.
                  </span>
                </p>
                {/* Subrayado decorativo estático */}
                <div className="h-0.5 sm:h-1 w-full bg-yellow-500/20 absolute bottom-0.5 sm:bottom-1 left-0 -rotate-1 rounded-full" />
              </div>

              <div className="flex items-start gap-2.5 sm:gap-3 bg-gray-800/50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-white/5">
                <MapPinOff className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  Por favor, coordinar con <span className="text-white font-bold">anticipación</span> .
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Barra decorativa inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
      </motion.div>
    </motion.div>
  );
});

AdditionalInfoSection.displayName = 'AdditionalInfoSection';

export default AdditionalInfoSection;