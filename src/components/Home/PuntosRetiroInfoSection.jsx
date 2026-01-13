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

      {/* Mobile Layout - Vertical Stack */}
      <div className="sm:hidden w-full relative z-10 px-4 py-8">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/30 to-blue-500/30 backdrop-blur-sm rounded-full shadow-2xl shadow-purple-500/40 border border-purple-400/50">
            <MapPin className="w-4 h-4 text-purple-300 animate-pulse" />
            <span className="text-sm font-bold text-purple-200 uppercase tracking-widest">
              Sin Local Físico
            </span>
          </div>
          
          {/* Imagen */}
          <div className="relative w-full max-w-[280px] h-[200px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <img
              src="/images/puntos_retiro.webp"
              alt="Puntos de Retiro"
              className="relative w-full h-full object-contain drop-shadow-[0_0_60px_rgba(147,51,234,0.5)] filter brightness-110 animate-float"
            />
          </div>
          
          {/* Título */}
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]">
              Coordiná la{' '}
            </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-purple-300 via-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(147,51,234,0.8)]">
                Entrega
              </span>
            </span>
          </h2>
          
          {/* Descripción */}
          <p className="text-lg text-gray-200 font-semibold">
            <span className="text-purple-300 font-bold">Revisás y pagás</span> en el momento.
          </p>

          {/* Mini cards */}
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { icon: Ban, text: 'Sin Anticipos', gradient: 'from-red-500 to-red-900' },
              { icon: MapPin, text: 'Puntos Seguros', gradient: 'from-blue-400 to-cyan-500' },
              { icon: Truck, text: 'NO Hacemos Envíos', gradient: 'from-yellow-300 to-yellow-900' }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20"
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
            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:from-purple-400 hover:via-blue-400 hover:to-cyan-400 rounded-xl font-bold text-base text-white shadow-2xl shadow-purple-500/50 transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-purple-400/40"
          >
            <MapPin className="w-5 h-5" />
            <span>¿Dónde retiro los productos?</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Desktop Layout - Side by Side */}
      <div className="hidden sm:flex w-full h-full relative z-10 px-6 lg:px-8 py-6 items-center">
        <div className="w-full h-full grid grid-cols-[1.2fr_1fr] gap-6 items-center">
          {/* Lado izquierdo - Contenido */}
          <div className="flex flex-col justify-center space-y-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-purple-500/30 to-blue-500/30 backdrop-blur-sm rounded-full shadow-2xl shadow-purple-500/40 border border-purple-400/50 w-fit">
              <MapPin className="w-4 h-4 text-purple-300 animate-pulse" />
              <span className="text-sm font-bold text-purple-200 uppercase tracking-widest">
                Sin Local Físico
              </span>
            </div>
            
            {/* Título */}
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[0.95]">
              <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                Coordiná la{' '}
              </span>
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-purple-300 via-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(147,51,234,0.8)]">
                  Entrega
                </span>
              </span>
            </h2>
            
            {/* Descripción */}
            <p className="text-lg lg:text-xl text-gray-200 font-bold">
              <span className="text-purple-300 font-black">Revisás y pagás</span> en el momento.
            </p>

            {/* Mini cards */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: Ban, text: 'Sin Anticipos', gradient: 'from-red-500 to-red-900' },
                { icon: MapPin, text: 'Puntos Seguros', gradient: 'from-blue-400 to-cyan-500' },
                { icon: Truck, text: 'NO Hacemos Envíos', gradient: 'from-yellow-300 to-yellow-900' }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20"
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
              className="group relative inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:from-purple-400 hover:via-blue-400 hover:to-cyan-400 rounded-xl font-bold text-base text-white shadow-2xl shadow-purple-500/50 transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-purple-400/40 w-fit"
            >
              <MapPin className="w-5 h-5" />
              <span>¿Dónde retiro los productos?</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Lado derecho - Imagen */}
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="relative w-full h-full max-h-[300px] flex items-center justify-center">
              <img
                src="/images/puntos_retiro.webp"
                alt="Puntos de Retiro"
                className="w-full h-full object-contain drop-shadow-[0_0_80px_rgba(147,51,234,0.6)] filter brightness-110 animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PuntosRetiroInfoSection;
