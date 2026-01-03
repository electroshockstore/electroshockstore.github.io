import { AlertTriangle, Clock, MapPinOff } from 'lucide-react';

const AdditionalInfoSection = () => {
  return (
    <div className="relative group pb-8">
      {/* 1. Resplandor ambiental de fondo (Glow permanente) */}
      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600/20 via-orange-600/20 to-yellow-600/20 blur-2xl opacity-70 rounded-[2.5rem]" />

      {/* 2. Contenedor Principal Estilo Glassmorphism - Optimizado para mobile */}
      <div className="relative bg-black/60 backdrop-blur-2xl rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 md:p-10 border border-white/10 overflow-hidden shadow-2xl">
        
        {/* Decoración de luz interna en la esquina OPTIMIZADA */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-500/8 blur-[40px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-orange-600/8 blur-[40px] rounded-full" />

        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-5 sm:gap-8">
          
          {/* 3. Icono con efecto Neón - Más pequeño en mobile */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-yellow-500/40 blur-2xl rounded-full animate-pulse" />
            <div className="relative bg-gradient-to-br from-gray-900 to-black p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-yellow-500/50 shadow-[0_0_25px_rgba(234,179,8,0.2)]">
              <AlertTriangle className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" strokeWidth={2.5} />
            </div>
          </div>

          {/* 4. Contenido de Texto - Optimizado para mobile */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-3 sm:mb-4">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-500" />
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500/90">Aviso de Disponibilidad</span>
            </div>

            <h3 className="text-xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4 tracking-tight leading-tight">
              Importante sobre <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-400 bg-clip-text text-transparent">los horarios</span>
            </h3>

            <div className="space-y-3 sm:space-y-4">
              <div className="relative group/text inline-block">
                <p className="text-base sm:text-xl text-gray-200 leading-relaxed font-medium">
                  <span className="relative z-10">
                    <strong className="text-yellow-400 font-black">solo en los puntos de retiro seguros</strong>,
                    no se viaja a otro lado por falta de tiempo.
                  </span>
                </p>
                {/* Subrayado decorativo */}
                <div className="h-0.5 sm:h-1 w-full bg-yellow-500/20 absolute bottom-0.5 sm:bottom-1 left-0 -rotate-1 rounded-full group-hover/text:bg-yellow-500/40 transition-colors" />
              </div>

              <div className="flex items-start gap-2.5 sm:gap-3 bg-white/5 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-white/5">
                <MapPinOff className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  Por favor, coordinar con <span className="text-white font-bold">anticipación</span> .
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Barra de progreso/decoración inferior estética */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
      </div>
    </div>
  );
};

export default AdditionalInfoSection;