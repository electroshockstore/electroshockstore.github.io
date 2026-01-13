import { useNavigate } from 'react-router-dom';
import { MapPin, Ban, Truck, ArrowRight } from 'lucide-react';

const PuntosRetiroInfoSection = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full h-full relative overflow-hidden border-y-0 sm:rounded-3xl sm:border sm:border-gray-800 sm:border-blue-500/40 sm:ring-2 sm:ring-blue-500/30 sm:shadow-xl sm:shadow-blue-900/50 bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#1a1a2e]">
      {/* Partículas de fondo animadas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="w-full h-full relative z-10 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10 flex items-center">
        {/* Hero Section - Layout moderno con imagen flotante */}
        <div className="w-full h-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-4 lg:gap-8 items-center h-full">
            {/* Lado izquierdo - Contenido */}
            <div className="text-center lg:text-left order-2 lg:order-1 flex flex-col justify-center">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-purple-500/30 to-blue-500/30 backdrop-blur-sm rounded-full mb-6 shadow-2xl shadow-purple-500/40 border border-purple-400/50 w-fit mx-auto lg:mx-0">
                <MapPin className="w-5 h-5 text-purple-300 animate-pulse" />
                <span className="text-base font-bold text-purple-200 uppercase tracking-widest">
                  Sin Local Físico
                </span>
              </div>
              
              <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 tracking-tight leading-[0.95]">
                <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] filter brightness-110">
                  Coordiná la{' '}
                </span>
                <br />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-purple-300 via-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(147,51,234,0.8)] filter brightness-125">
                    Entrega
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-500 blur-3xl opacity-60 -z-10 animate-pulse scale-110" />
                </span>
              </h2>
              
              <p className="text-xl sm:text-2xl lg:text-3xl text-gray-200 font-bold drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] leading-relaxed mb-8">
                <span className="text-purple-300 font-black">Revisás y pagás</span> en el momento. 
              </p>

              {/* Mini cards inline - MÁS GRANDES */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8 ">
                {[
                  { icon: Ban, text: 'Sin Anticipos', gradient: 'from-red-500 to-red-900' },
                  { icon: MapPin, text: 'Puntos Seguros', gradient: 'from-blue-400 to-cyan-500' },
                  { icon: Truck, text: 'NO Envíos', gradient: 'from-yellow-300 to-yellow-900' }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="inline-flex items-center gap-2.5 px-5 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${item.gradient}`}>
                        <Icon className="h-5 w-5 text-white" strokeWidth={2.5} />
                      </div>
                      <span className="text-base font-bold text-white">{item.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* CTA Button - MÁS GRANDE */}
              <button
                onClick={() => navigate('/puntos-de-retiro')}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:from-purple-400 hover:via-blue-400 hover:to-cyan-400 rounded-2xl font-black text-lg text-white shadow-2xl shadow-purple-500/50 hover:shadow-3xl hover:shadow-purple-500/70 transition-all duration-500 hover:scale-105 active:scale-95 border-2 border-purple-400/40 hover:border-purple-300/60 w-fit mx-auto lg:mx-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10 scale-110" />
                
                <MapPin className="w-6 h-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500" />
                <span className="relative z-10 tracking-wide">¿Dónde retiro los productos?</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 group-hover:scale-110 transition-transform duration-500" />
              </button>
            </div>

            {/* Lado derecho - Imagen ENORME */}
            <div className="relative order-1 lg:order-2 flex items-center justify-center h-full w-full">
              {/* Glow effects detrás de la imagen */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
              
              {/* Imagen flotante con animación - MÁXIMO TAMAÑO */}
              <div className="relative animate-float w-full h-full flex items-center justify-center p-4">
                <img
                  src="/images/puntos_retiro.webp"
                  alt="Puntos de Retiro"
                  className="w-full h-full max-h-[320px] lg:max-h-full object-contain drop-shadow-[0_0_80px_rgba(147,51,234,0.7)] filter brightness-110 hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

      </div>     
      </div>
    </section>
  );
};

export default PuntosRetiroInfoSection;
