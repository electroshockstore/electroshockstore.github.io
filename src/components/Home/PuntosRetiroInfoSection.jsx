import { useNavigate } from 'react-router-dom';
import { MapPin, Ban, Truck, ArrowRight } from 'lucide-react';

const PuntosRetiroInfoSection = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full relative overflow-hidden">
      {/* Partículas de fondo animadas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full py-12 sm:py-16 md:py-20 relative z-10 px-4">
        {/* Hero Section - Layout moderno con imagen flotante */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
            {/* Lado izquierdo - Contenido */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-purple-500/30 to-blue-500/30 backdrop-blur-sm rounded-full mb-6 shadow-2xl shadow-purple-500/40 border border-purple-400/50">
                <MapPin className="w-4 h-4 text-purple-300 animate-pulse" />
                <span className="text-sm font-bold text-purple-200 uppercase tracking-widest">
                  Sin Local Físico
                </span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
                <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] filter brightness-110">
                  Coordiná la{' '}
                </span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-purple-300 via-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(147,51,234,0.8)] filter brightness-125">
                    Entrega
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-500 blur-3xl opacity-60 -z-10 animate-pulse scale-110" />
                </span>
              </h2>
              
              <p className="text-lg sm:text-xl md:text-2xl text-gray-200 font-semibold drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] leading-relaxed mb-8">
                <span className="text-purple-300 font-bold">Revisás y pagás</span> en el momento. 
              </p>

              {/* Mini cards inline */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                {[
                  { icon: Ban, text: 'Sin Anticipos', gradient: 'from-red-500 to-red-900' },
                  { icon: MapPin, text: 'Puntos Seguros', gradient: 'from-blue-400 to-cyan-500' },
                  { icon: Truck, text: 'NO Hacemos Envíos', gradient: 'from-yellow-300 to-yellow-900' }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
                    >
                      <div className={`p-1.5 rounded-lg bg-gradient-to-br ${item.gradient}`}>
                        <Icon className="h-4 w-4 text-white" strokeWidth={2.5} />
                      </div>
                      <span className="text-sm font-bold text-white">{item.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => navigate('/puntos-de-retiro')}
                className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:from-purple-400 hover:via-blue-400 hover:to-cyan-400 rounded-2xl font-bold text-base sm:text-lg text-white shadow-2xl shadow-purple-500/50 hover:shadow-3xl hover:shadow-purple-500/70 transition-all duration-500 hover:scale-110 active:scale-95 border-2 border-purple-400/40 hover:border-purple-300/60"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10 scale-110" />
                
                <MapPin className="w-6 h-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500" />
                <span className="relative z-10 tracking-wide">¿Dónde retiro los productos?</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-3 group-hover:scale-110 transition-transform duration-500" />
                
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-300 rounded-full opacity-0 group-hover:opacity-100 animate-ping" />
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-300 rounded-full opacity-0 group-hover:opacity-100 animate-ping" style={{ animationDelay: '0.3s' }} />
              </button>
            </div>

            {/* Lado derecho - Imagen flotante */}
            <div className="relative order-1 lg:order-2">
              {/* Glow effects detrás de la imagen */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-3xl scale-75 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/20 to-purple-500/20 rounded-full blur-2xl scale-90 animate-pulse" style={{ animationDelay: '1s' }} />
              
              {/* Imagen flotante con animación */}
              <div className="relative animate-float">
                <img
                  src="/images/puntos_retiro.webp"
                  alt="Puntos de Retiro"
                  className="w-full h-auto drop-shadow-[0_0_80px_rgba(147,51,234,0.6)] filter brightness-110 hover:scale-105 transition-transform duration-700"
                />
                
                {/* Partículas flotantes alrededor */}
                <div className="absolute top-10 -left-10 w-20 h-20 bg-purple-400/30 rounded-full blur-xl animate-pulse" />
                <div className="absolute bottom-20 -right-10 w-24 h-24 bg-blue-400/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute top-1/2 -right-5 w-16 h-16 bg-cyan-400/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </div>
          </div>

      </div>     
      </div>
    </section>
  );
};

export default PuntosRetiroInfoSection;
