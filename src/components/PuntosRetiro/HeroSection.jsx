const HeroSection = () => {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6">
      <div className="relative max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white mb-4 sm:mb-8 leading-tight px-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
              ¿Dónde Retiro
            </span>
            <br />
            <span className="text-white drop-shadow-2xl">Los Productos?</span>
          </h1>
          
          <p className="text-lg sm:text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4 font-semibold">
            Elegí el punto más cercano y coordiná tu entrega <span className="text-blue-400 font-black">segura</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
