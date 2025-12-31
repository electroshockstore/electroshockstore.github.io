import { MapPin, ArrowLeft } from 'lucide-react';

const HeroSection = ({ onBack }) => {
  return (
    <section className="relative py-8 sm:py-12 md:py-20 px-4 sm:px-6">
      <div className="relative max-w-7xl mx-auto">
        {/* Back button */}
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 sm:mb-8 bg-white/5 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 rounded-full border border-white/10 text-sm hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-semibold">Volver</span>
        </button>

        {/* Title */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md px-4 py-2 sm:px-8 sm:py-4 rounded-full border border-blue-500/30 mb-4 sm:mb-8">
            <MapPin className="w-5 h-5 sm:w-7 sm:h-7 text-blue-400" strokeWidth={2.5} />
            <span className="text-blue-400 font-black text-sm sm:text-lg">Puntos de Retiro</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-3 sm:mb-6 leading-tight px-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              ¿Dónde Retiro
            </span>
            <br />
            <span className="text-white">Mi Compra?</span>
          </h1>
          
          <p className="text-base sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
            Elegí el punto más cercano y coordiná tu entrega <span className="text-blue-400 font-bold">segura</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
