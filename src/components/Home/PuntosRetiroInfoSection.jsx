import { useNavigate } from 'react-router-dom';
import { MapPin, Ban, Truck, ArrowRight } from 'lucide-react';

const PuntosRetiroInfoSection = () => {
  const navigate = useNavigate();

  return (
    <section className="group relative w-full min-h-[500px] lg:min-h-[600px] overflow-hidden sm:rounded-[3rem] border border-blue-500/30 bg-[#0a0a0f] transition-all duration-500 hover:border-blue-500/60 shadow-2xl shadow-blue-900/20">
      
      {/* Fondo con Efectos (Se mantiene igual, es excelente) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-[#0a0a0f] to-purple-900/20 opacity-100" />
        <div className="absolute -top-[30%] -left-[15%] w-[60%] h-[80%] bg-blue-600/30 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute -bottom-[30%] -right-[15%] w-[60%] h-[80%] bg-purple-600/30 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 w-full h-full flex items-center p-6 sm:p-12 lg:p-20">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 w-full max-w-[1500px] mx-auto items-center">
          
          {/* IMAGEN - Primero en mobile, segundo en desktop */}
          <div className="relative flex items-center justify-center order-1 lg:order-2 w-full">
            {/* Glows de fondo de la imagen más grandes */}
            <div className="absolute w-[100%] h-[100%] bg-blue-500/20 blur-[120px] rounded-full animate-pulse" />
            
            <div className="relative w-full max-w-[350px] sm:max-w-[450px] lg:max-w-[550px] transform transition-all duration-1000 group-hover:scale-110 group-hover:-rotate-2">
              <img
                src="/images/puntos_retiro.webp"
                alt="Puntos de Retiro"
                className="w-full h-auto object-contain drop-shadow-[0_50px_100px_rgba(0,0,0,0.8)] filter brightness-110"
              />
              
                {/* Logo Flotante más grande */}
              <div className="absolute top-0 -right-5 sm:right w-20 h-20 sm:w-24 sm:h-24 bg-white/10 backdrop-blur-3xl rounded-[2rem] border border-white/20 flex items-center justify-center shadow-2xl">
                <img src="/logotipo_tiny.png" alt="Logo" className="h-30 sm:h-16 w-auto object-contain" />
              </div>
            </div>
          
           
          </div>
          
          {/* CONTENIDO - Segundo en mobile, primero en desktop */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:space-y-8 order-2 lg:order-1 w-full">
            
            {/* Badge Sin Local Físico - Integrado en el contenido */}
            <div className="flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-full border border-purple-400/30 shadow-lg">
              <MapPin className="text-purple-300 w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
              <span className="font-bold text-purple-200 uppercase tracking-wider text-xs sm:text-sm">
                Sin Local Físico
              </span>
            </div>

            {/* Título con tamaños mucho más grandes */}
            <div className="space-y-4">
              <h2 className="font-black tracking-tighter leading-[0.85]" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                <span className="text-white block opacity-90">Coordiná la</span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent filter drop-shadow-[0_0_50px_rgba(59,130,246,0.8)]">
                    Entrega
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent blur-2xl opacity-40">
                    Entrega
                  </span>
                </span>
              </h2>
              
              <p className="text-gray-400 font-medium max-w-lg leading-relaxed mx-auto lg:mx-0" style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)' }}>
                <span className="text-white border-b-4 border-blue-500/50 pb-1 font-extrabold">Revisás y pagás</span> en el momento del retiro. Seguridad total en tu compra.
              </p>
            </div>

            {/* Mini Cards - Diseño compacto para mobile */}
            <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-xs sm:max-w-md lg:max-w-none">
              {[
                { icon: Ban, text: 'Sin Anticipos', gradient: 'from-blue-500/10 to-purple-500/10', border: 'border-blue-400/30', iconColor: 'text-blue-300', glow: 'shadow-blue-500/20' },
                { icon: MapPin, text: 'Puntos Seguros', gradient: 'from-purple-500/10 to-cyan-500/10', border: 'border-purple-400/30', iconColor: 'text-purple-300', glow: 'shadow-purple-500/20' },
                { icon: Truck, text: 'Sin Envíos', gradient: 'from-cyan-500/10 to-blue-500/10', border: 'border-cyan-400/30', iconColor: 'text-cyan-300', glow: 'shadow-cyan-500/20' }
              ].map((item, i) => (
                <div key={i} className={`group flex items-center gap-3 p-3.5 sm:flex-col sm:justify-center sm:gap-2.5 sm:p-5 bg-gradient-to-br ${item.gradient} backdrop-blur-xl rounded-xl sm:rounded-2xl border ${item.border} ${item.glow} shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl hover:border-opacity-60`}>
                  <item.icon className={`w-5 h-5 sm:w-7 sm:h-7 ${item.iconColor} group-hover:scale-110 transition-transform flex-shrink-0`} strokeWidth={2.5} />
                  <span className="font-bold text-white/90 text-xs sm:text-sm uppercase tracking-wide sm:text-center leading-tight">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Reforzado */}
            <button
              onClick={() => navigate('/puntos-de-retiro')}
              className="group relative flex items-center justify-center gap-3 lg:gap-4 px-8 lg:px-10 py-5 lg:py-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-3xl font-black text-white transition-all duration-300 hover:scale-[1.05] shadow-[0_20px_50px_rgba(147,51,234,0.4)] hover:shadow-purple-500/60 active:scale-95 border-b-4 border-white/20 w-full sm:w-auto"
              style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.25rem)' }}
            >
              <MapPin className="w-5 h-5 lg:w-6 lg:h-6" />
              <span className="text-sm sm:text-base">¿Donde Retiro los Productos?</span>
              <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PuntosRetiroInfoSection;