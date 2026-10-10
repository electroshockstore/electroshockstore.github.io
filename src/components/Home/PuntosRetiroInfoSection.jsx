import { useNavigate } from 'react-router-dom';
import { MapPin, Ban, Truck } from 'lucide-react';
import MotionReveal from '../Shared/MotionReveal';
import OffsetGlowCTA from '../Shared/OffsetGlowCTA';

const PuntosRetiroInfoSection = () => {
  const navigate = useNavigate();

  return (
    <MotionReveal animation="slide-left" duration={0.7}>
      <section
      className="group relative w-full h-full overflow-hidden sm:rounded-3xl transition-all duration-300 
        sm:border-y sm:border border-gray-800 sm:border-cyan-500/40 sm:ring-2 sm:ring-cyan-500/30
        sm:shadow-xl sm:shadow-cyan-900/50 hover:shadow-2xl hover:shadow-cyan-900/60"
      style={{ 
        boxShadow: typeof window !== 'undefined' && window.innerWidth >= 640 ? '0 0 30px rgba(6, 182, 212, 0.4), 0 0 60px rgba(8, 145, 178, 0.2)' : 'none'
      }}
    >
      
      {/* Glow inferior */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyan-600/30 via-cyan-500/10 to-transparent pointer-events-none z-20" 
        style={{ filter: 'blur(24px)' }}
      />

      <div className="relative z-10 w-full h-full flex items-center justify-center px-4 py-6 sm:px-8 sm:py-12 md:px-12 md:py-16 lg:px-16 lg:py-20 xl:px-20 xl:py-24">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-2 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 w-full max-w-7xl items-center">
          
          {/* IMAGEN - Primero en mobile, segundo en desktop */}
          <div className="relative flex items-center justify-center order-1 lg:order-2 w-full min-h-[400px] sm:min-h-[500px]">
            {/* Ripple effect monocromo - Expansión amplia con animate-ping */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute w-[70%] h-[70%] rounded-full border-2 border-cyan-400/40 motion-reduce:animate-none animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute w-[85%] h-[85%] rounded-full border-2 border-cyan-400/30 motion-reduce:animate-none animate-ping" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }} />
              <div className="absolute w-[100%] h-[100%] rounded-full border-2 border-cyan-400/20 motion-reduce:animate-none animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
            </div>

            {/* Glow de la imagen */}
            <div
              className="absolute w-[60%] h-[60%] bg-cyan-500/15 rounded-full"
              style={{ filter: 'blur(60px)' }}
            />
            
            {/* Imagen central */}
            <div className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px] 2xl:max-w-[550px] transition-all duration-1000 group-hover:scale-105 group-hover:-rotate-1 z-10">
              <img
                src="/images/puntos_retiro.webp"
                alt="Puntos de Retiro"
                className="w-full h-auto object-contain drop-shadow-[0_0_40px_rgba(0,229,255,0.3)] drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)] brightness-110"
              />
            </div>

            {/* Badges flotantes - Los 3 arriba en línea horizontal */}
            {/* Badge 1: Sin Anticipos - Arriba izquierda */}
            <div className="absolute top-1 left-2 sm:-top-1 sm:-left-4 lg:-left-11 z-20 bg-emerald-600 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl shadow-2xl rotate-6 hover:rotate-0 transition-all duration-300 hover:scale-105 cursor-pointer group/badge">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="bg-white/20 rounded-lg sm:rounded-xl p-1 sm:p-1.5">
                  <Ban className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-[9px] sm:text-[10px] font-bold uppercase leading-tight opacity-90">Sin</div>
                  <div className="text-xs sm:text-base font-black uppercase leading-tight">Anticipos</div>
                </div>
              </div>
            </div>

            {/* Badge 2: Puntos Seguros - Arriba derecha */}
            <div className="absolute top-2 right-2 sm:-top-2 sm:-right-4 lg:-right-8 z-20 bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl shadow-2xl -rotate-6 hover:rotate-0 transition-all duration-300 hover:scale-105 cursor-pointer group/badge">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="bg-white/20 rounded-lg sm:rounded-xl p-1 sm:p-1.5">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-[9px] sm:text-[10px] font-bold uppercase leading-tight opacity-90">Puntos</div>
                  <div className="text-xs sm:text-base font-black uppercase leading-tight">Seguros</div>
                </div>
              </div>
            </div>

            {/* Badge 3: Sin Envíos - Arriba centro */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 sm:-top-2 z-20 bg-red-600 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-all duration-300 hover:scale-105 cursor-pointer group/badge">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="bg-white/20 rounded-lg sm:rounded-xl p-1 sm:p-1.5">
                  <Truck className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-[9px] sm:text-[10px] font-bold uppercase leading-tight opacity-90">Sin</div>
                  <div className="text-xs sm:text-base font-black uppercase leading-tight">Envíos</div>
                </div>
              </div>
            </div>

          </div>
          
          {/* CONTENIDO - Segundo en mobile, primero en desktop */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2 sm:space-y-6 md:space-y-7 lg:space-y-8 order-2 lg:order-1 w-full">
            
            {/* Badge Sin Local Físico */}
            <div className="pill inline-flex items-center gap-2 px-4 py-2 bg-cyber-surface rounded-full border border-cyber-line">
              <MapPin className="text-cyber-cyan w-4 h-4" strokeWidth={2.5} />
              <span className="font-bold text-gray-200 uppercase tracking-wider text-xs">
                Sin Local Físico
              </span>
            </div>

            {/* Título */}
            <div className="space-y-3 sm:space-y-4">
              <h2 className="font-black tracking-tighter leading-[0.9] relative text-balance text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                <div
                  className="absolute inset-0 opacity-30 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400"
                  style={{ filter: 'blur(48px)' }}
                />

                <span className="text-white block opacity-90 relative z-10 whitespace-nowrap">Coordiná la</span>
                <span className="relative inline-block z-10">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Entrega
                  </span>
                </span>
              </h2>

              <p className="text-gray-400 font-medium max-w-xl leading-relaxed mx-auto lg:mx-0 text-balance text-base sm:text-lg md:text-xl px-4 sm:px-0">
                <span className="text-white border-b-4 border-cyber-cyan/50 pb-1 font-extrabold">Revisás y pagás</span> en el momento.
              </p>
            </div>

            {/* CTA */}
            <div className="pt-2 w-full sm:w-auto">
              <OffsetGlowCTA
                label="¿Dónde Retiro los Productos?"
                prefix={<MapPin className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" strokeWidth={2.5} />}
                onClick={() => navigate('/puntos-de-retiro')}
                size="lg"
                className="text-sm sm:text-base lg:text-lg"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
    </MotionReveal>
  );
};

export default PuntosRetiroInfoSection;
