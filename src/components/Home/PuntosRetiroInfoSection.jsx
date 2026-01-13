import { useNavigate } from 'react-router-dom';
import { MapPin, Ban, Truck, ArrowRight } from 'lucide-react';

const PuntosRetiroInfoSection = () => {
  const navigate = useNavigate();

  return (
    <section className="group relative w-full min-h-[450px] overflow-hidden sm:rounded-[2.5rem] border border-blue-500/30 bg-[#0a0a0f] transition-all duration-500 hover:border-blue-500/60 shadow-2xl shadow-blue-900/20">
      
      {/* Fondo con Efectos Modernos y Glows MEJORADOS */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-[#0a0a0f] to-purple-900/20 opacity-100" />
        
        {/* Glows Dinámicos Principales - MÁS INTENSOS */}
        <div className="absolute -top-[30%] -left-[15%] w-[60%] h-[80%] bg-blue-600/30 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute -bottom-[30%] -right-[15%] w-[60%] h-[80%] bg-purple-600/30 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Glows adicionales para más profundidad */}
        <div className="absolute top-1/4 left-1/4 w-[45%] h-[45%] bg-cyan-500/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-[40%] h-[40%] bg-indigo-500/25 blur-[110px] rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
        
        {/* Glows centrales para iluminación focal */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-purple-500/15 blur-[140px] rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 w-full h-full flex items-center p-8 sm:p-12 lg:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full max-w-[1400px] mx-auto items-center">
          
          {/* LADO IZQUIERDO: CONTENIDO (7 columnas en desktop) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            
            {/* MOBILE: Imagen ARRIBA - MÁS GRANDE */}
            <div className="lg:hidden relative w-full max-w-[400px] mb-6">
              {/* Glow effect MÁS INTENSO */}
              <div className="absolute inset-0 bg-blue-500/40 blur-[80px] rounded-full animate-pulse" />
              <div className="absolute inset-0 bg-purple-500/30 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              
              <div className="relative transform transition-all duration-700 hover:scale-105 animate-float">
                <img
                  src="/images/puntos_retiro.webp"
                  alt="Puntos de Retiro"
                  className="w-full h-auto object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.9)] filter brightness-115"
                />
                
                {/* Logo bounce - MOBILE */}
                <div className="absolute -top-5 -right-5 w-16 h-16 bg-purple-500/30 backdrop-blur-2xl rounded-3xl border border-white/20 flex items-center justify-center animate-bounce shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                  <img 
                    src="/logotipo_tiny.png" 
                    alt="Shock-Store Logo" 
                    className="h-16 w-auto object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Badge Hi-Tech con MapPin - TAMAÑO MÁS CONTROLADO */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 shadow-[0_0_30px_rgba(147,51,234,0.4)]">
              <MapPin style={{ width: 'clamp(0.875rem, 0.85vw, 1rem)', height: 'clamp(0.875rem, 0.85vw, 1rem)' }} className="text-purple-400 animate-pulse flex-shrink-0" strokeWidth={2.5} />
              <span style={{ fontSize: 'clamp(0.75rem, 0.8vw, 0.9rem)' }} className="font-black text-purple-200 uppercase tracking-[0.15em] whitespace-nowrap">
                Sin Local Físico
              </span>
            </div>

            {/* Título Gigante e Interactivo - TAMAÑOS CONTROLADOS */}
            <h2 className="font-black tracking-tighter leading-[0.9]" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
              <span className="text-white block">Coordiná la</span>
              <span className="relative block">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent filter drop-shadow-[0_0_40px_rgba(59,130,246,0.7)]">
                  Entrega
                </span>
                {/* Glow adicional en el título */}
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent blur-xl opacity-50">
                  Entrega
                </span>
              </span>
            </h2>

            {/* Descripción con jerarquía - TAMAÑO MÁS CONTROLADO */}
            <p className="text-gray-300 font-medium max-w-xl leading-relaxed" style={{ fontSize: 'clamp(0.875rem, 1vw, 1.125rem)' }}>
              <span className="text-white border-b-2 border-blue-500/50 font-bold">Revisás y pagás</span> en el momento. 
          
            </p>

            {/* Mini Cards MODERNAS en bloque horizontal - TAMAÑOS CONTROLADOS */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
              {[
                { icon: Ban, text: 'Sin Anticipos', color: 'from-red-500 to-orange-500', glow: 'shadow-[0_0_20px_rgba(239,68,68,0.4)]' },
                { icon: MapPin, text: 'Puntos Seguros', color: 'from-blue-500 to-cyan-500', glow: 'shadow-[0_0_20px_rgba(59,130,246,0.4)]' },
                { icon: Truck, text: 'Sin Envíos', color: 'from-yellow-500 to-amber-600', glow: 'shadow-[0_0_20px_rgba(234,179,8,0.4)]' }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className={`group/card relative flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br ${item.color} rounded-xl border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg ${item.glow} cursor-default`}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity rounded-xl" />
                  
                  <item.icon style={{ width: 'clamp(0.875rem, 0.85vw, 1rem)', height: 'clamp(0.875rem, 0.85vw, 1rem)' }} className="relative z-10 text-white drop-shadow-lg flex-shrink-0" strokeWidth={3} />
                  <span style={{ fontSize: 'clamp(0.75rem, 0.8vw, 0.85rem)' }} className="relative z-10 font-black text-white drop-shadow-md whitespace-nowrap">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Botón Call to Action PRO - TAMAÑO MÁS CONTROLADO */}
            <button
              onClick={() => navigate('/puntos-de-retiro')}
              className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:from-purple-400 hover:via-blue-400 hover:to-cyan-400 rounded-2xl font-black text-white overflow-hidden transition-all duration-300 hover:scale-[1.05] shadow-2xl shadow-purple-500/60 hover:shadow-[0_0_50px_rgba(147,51,234,0.8)] active:scale-95 border-2 border-purple-400/40"
              style={{ fontSize: 'clamp(0.875rem, 0.95vw, 1.05rem)' }}
            >
         
              {/* Shine effect interno */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              
              <MapPin style={{ width: 'clamp(1.125rem, 1.15vw, 1.25rem)', height: 'clamp(1.125rem, 1.15vw, 1.25rem)' }} className="relative z-10 flex-shrink-0" />
              <span className="relative z-10 whitespace-nowrap">¿Dónde retiro los Productos?</span>
              <ArrowRight style={{ width: 'clamp(1.125rem, 1.15vw, 1.25rem)', height: 'clamp(1.125rem, 1.15vw, 1.25rem)' }} className="relative z-10 group-hover:translate-x-2 transition-transform flex-shrink-0" />
            </button>
          </div>

          {/* LADO DERECHO: IMAGEN (5 columnas en desktop) - SOLO DESKTOP CON MÁS GLOW */}
          <div className="hidden lg:flex lg:col-span-5 relative items-center justify-center">
            {/* El "Aura" de la imagen con glow INTENSO */}
            <div className="absolute w-[130%] h-[130%] bg-blue-500/40 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute w-[120%] h-[120%] bg-purple-500/30 blur-[140px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            
            <div className="relative w-full max-w-[500px] transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-2 animate-float">
              <img
                src="/images/puntos_retiro.webp"
                alt="Puntos de Retiro"
                className="w-full h-auto object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.9)] filter brightness-115"
              />
       
              {/* Elemento flotante decorativo con bounce y glow - DESKTOP */}
              <div className="absolute -top-5 -right-5 w-20 h-20 bg-purple-500/30 backdrop-blur-2xl rounded-3xl border border-white/20 flex items-center justify-center animate-bounce shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                <img 
                  src="/logotipo_tiny.png" 
                  alt="Shock-Store Logo" 
                  className="h-20 w-auto object-contain"
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