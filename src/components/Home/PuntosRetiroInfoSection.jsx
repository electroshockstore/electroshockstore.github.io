import { useNavigate } from 'react-router-dom';
import { MapPin, Ban, Truck, ArrowRight } from 'lucide-react';

const PuntosRetiroInfoSection = () => {
  const navigate = useNavigate();

  return (
    <section 
      className="group relative w-full min-h-[500px] md:min-h-[550px] lg:min-h-[600px] xl:min-h-[650px] overflow-hidden md:rounded-2xl lg:rounded-[3rem] md:border md:border-blue-500/40 bg-[#0a0a0f] transition-all duration-500 md:hover:border-blue-500/60 md:ring-2 md:ring-blue-500/30 md:shadow-xl md:shadow-blue-900/50 md:hover:shadow-2xl md:hover:shadow-blue-900/60"
      style={{ 
        boxShadow: typeof window !== 'undefined' && window.innerWidth >= 768 ? '0 0 30px rgba(59, 130, 246, 0.4), 0 0 60px rgba(37, 99, 235, 0.2)' : 'none'
      }}
    >
      
      {/* Fondo con Efectos */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-[#0a0a0f] to-purple-900/20 opacity-100" />
        <div className="absolute -top-[30%] -left-[15%] w-[60%] h-[80%] bg-blue-600/30 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute -bottom-[30%] -right-[15%] w-[60%] h-[80%] bg-purple-600/30 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Glow inferior - Solo desktop (igual que PCBuilder) */}
      <div className="hidden md:block absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-600/30 via-blue-500/10 to-transparent pointer-events-none z-20" />

      {/* Máscaras de difuminado superior e inferior - Solo en mobile */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#0a0a0f] to-transparent z-[5] md:hidden pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a0f] to-transparent z-[5] md:hidden pointer-events-none" />

      <div className="relative z-10 w-full h-full flex items-center justify-center px-4 py-8 sm:px-8 sm:py-12 md:px-12 md:py-16 lg:px-16 lg:py-20 xl:px-20 xl:py-24">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 w-full max-w-7xl items-center">
          
          {/* IMAGEN - Primero en mobile, segundo en desktop */}
          <div className="relative flex items-center justify-center order-1 lg:order-2 w-full">
            <div className="absolute w-full h-full bg-blue-500/20 blur-[100px] rounded-full animate-pulse" />
            
            <div className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px] 2xl:max-w-[550px] transform transition-all duration-1000 group-hover:scale-105 group-hover:-rotate-1">
              <img
                src="/images/puntos_retiro.webp"
                alt="Puntos de Retiro"
                className="w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)] filter brightness-110"
              />
              
          
            </div>
          </div>
          
          {/* CONTENIDO - Segundo en mobile, primero en desktop */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 order-2 lg:order-1 w-full">
            
            {/* Badge Sin Local Físico */}
            <div className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-full border border-purple-400/30 shadow-lg">
              <MapPin className="text-purple-300 w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
              <span className="font-bold text-purple-200 uppercase tracking-wider text-xs sm:text-sm">
                Sin Local Físico
              </span>
            </div>

            {/* Título */}
            <div className="space-y-3 sm:space-y-4">
              <h2 className="font-black tracking-tighter leading-[0.9]" style={{ fontSize: 'clamp(2rem, 5vw + 0.5rem, 4.5rem)' }}>
                <span className="text-white block opacity-90">Coordiná la</span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent filter drop-shadow-[0_0_40px_rgba(59,130,246,0.7)]">
                    Entrega
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent blur-2xl opacity-40">
                    Entrega
                  </span>
                </span>
              </h2>
              
              <p className="text-gray-400 font-medium max-w-xl leading-relaxed mx-auto lg:mx-0 text-base sm:text-lg md:text-xl">
                <span className="text-white border-b-4 border-blue-500/50 pb-1 font-extrabold">Revisás y pagás</span> en el momento del retiro. Seguridad total en tu compra.
              </p>
            </div>

            {/* Mini Cards */}
            <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-xs sm:max-w-full">
              {[
                { icon: Ban, text: 'Sin Anticipos', gradient: 'from-blue-500/10 to-purple-500/10', border: 'border-blue-400/30', iconColor: 'text-blue-300', glow: 'shadow-blue-500/20' },
                { icon: MapPin, text: 'Puntos Seguros', gradient: 'from-purple-500/10 to-cyan-500/10', border: 'border-purple-400/30', iconColor: 'text-purple-300', glow: 'shadow-purple-500/20' },
                { icon: Truck, text: 'Sin Envíos', gradient: 'from-cyan-500/10 to-blue-500/10', border: 'border-cyan-400/30', iconColor: 'text-cyan-300', glow: 'shadow-cyan-500/20' }
              ].map((item, i) => (
                <div key={i} className={`group flex items-center gap-3 p-3 sm:flex-col sm:justify-center sm:gap-2.5 sm:p-4 lg:p-5 bg-gradient-to-br ${item.gradient} backdrop-blur-xl rounded-xl sm:rounded-2xl border ${item.border} ${item.glow} shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl hover:border-opacity-60`}>
                  <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 ${item.iconColor} group-hover:scale-110 transition-transform flex-shrink-0`} strokeWidth={2.5} />
                  <span className="font-bold text-white/90 text-xs sm:text-sm uppercase tracking-wide sm:text-center leading-tight">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => navigate('/puntos-de-retiro')}
              className="group relative inline-flex items-center justify-center gap-3 px-6 sm:px-8 lg:px-10 py-4 sm:py-5 lg:py-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-2xl sm:rounded-3xl font-black text-white transition-all duration-300 hover:scale-105 shadow-[0_20px_50px_rgba(147,51,234,0.4)] hover:shadow-purple-500/60 active:scale-95 border-b-4 border-white/20 w-full sm:w-auto text-sm sm:text-base lg:text-lg"
            >
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="whitespace-nowrap">¿Donde Retiro los Productos?</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PuntosRetiroInfoSection;
