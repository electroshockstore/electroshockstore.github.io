const HeroSection = () => {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white mb-4 sm:mb-8 leading-[0.9] px-4">
            {/* Primera palabra */}
            <span className="hero-title-word inline-block mr-2 sm:mr-4 text-white">
              ¿
            </span>
            
            {/* Palabras destacadas con marker effect BRUTAL */}
            <span className="hero-title-word inline-block relative">
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
              
              {/* Glow effect brutal - Solo desktop */}
              <span className="hidden sm:block absolute inset-0 bg-blue-500 blur-2xl opacity-60 animate-pulse" />
            </span>
            
            <br />
            
            {/* Segunda línea */}
            <span className="hero-title-word inline-block mr-2 sm:mr-4 text-white">
              Los
            </span>
            <span className="hero-title-word inline-block text-white">
              Productos?
            </span>
          </h1>
          
          <p className="hero-description-enter text-lg sm:text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4 font-semibold">
            Elegí el punto más cercano y coordiná tu entrega <span className="text-blue-400 font-black">segura</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
