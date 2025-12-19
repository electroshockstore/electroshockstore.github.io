import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Shield, Package, AlertTriangle, MapPin, Info } from 'lucide-react';

const slides = [
  {
    id: 1,
    tag: "VERIFICADO",
    title: "COMPRÁ CON SEGURIDAD",
    description: "¡NO TE DEJES ENGAÑAR!",
    points: [
      { text: "Solo venta web oficial, verificada y segura.", positive: true },
      { text: "¡ATENCIÓN! No tenemos Instagram ni Facebook.", highlight: true },
      { text: "Asesores autorizados solo en chat oficial.", positive: true }
    ],
    gradient: "from-blue-600 to-cyan-400",
    image: "/images/hero/megaphone_tiny.webp"
  },
  {
    id: 2,
    tag: "CONFIANZA",
    title: "SIN DEPÓSITOS",
    description: "¡NO TE DEJES ENGAÑAR!",
    points: [
      { text: "¡ATENCIÓN! NO pedimos dinero previo", highlight: true },
      { text: "Pagás al recibir el producto", positive: true },
      { text: "Revisás antes de abonar", positive: true }
    ],
    gradient: "from-emerald-500 to-teal-400",
    image: "/images/hero/stop_tiny.jpg"
  },
  {
    id: 3,
    tag: "LEER ATENTAMENTE",
    title: "CONDICIONES",
    description: "Información importante sobre la operación.",
    points: [
      { text: "NO PERMUTO", highlight: true },
      { text: "Efectivo o transferencia INMEDIATA", positive: false },
      { text: "Recargo en transf. < $100.000", highlight: true }
    ],
    gradient: "from-orange-500 to-red-500",
    image: "/images/hero/methods_tiny.webp"
  },
  {
    id: 4,
    tag: "STOCK",
    title: "VENTA PARTICULAR",
    description: "Liquidación de stock sellado.",
    points: [
      { text: "SOY PARTICULAR - SIN LOCAL", highlight: true },
      { text: "Productos sellados de fábrica", positive: true },
      { text: "Sin factura ni garantía escrita", highlight: true }
    ],
    gradient: "from-purple-600 to-pink-500",
    image: "/images/hero/atenttion_tiny.jpg"
  },
  {
    id: 5,
    tag: "ENTREGAS",
    title: "PUNTOS RETIRO",
    description: "Horarios fijos y seguros.",
    points: [
      { text: "Berazategui Centro (16:00hs)", positive: true },
      { text: "Cruce Varela - Bingo (16:30hs)", positive: true },
      { text: "NO viajo a otros puntos", highlight: true }
    ],
    gradient: "from-cyan-500 to-blue-600",
    image: "/images/hero/location_tiny.webp"
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => setCurrentSlide((prev) => (prev + 1) % slides.length), []);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const current = slides[currentSlide];

  return (
    <section className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] bg-[#020617] overflow-hidden rounded-2xl">
      
      {/* Background Image - Optimizado para móvil y desktop */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute right-0 top-0 w-full md:w-[70%] h-full z-0"
        >
          <img 
            src={current.image} 
            className="w-full h-full object-cover" 
            alt={current.title}
            loading="lazy"
          />
          {/* Overlay gradiente más fuerte en móvil */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/80 md:via-[#020617]/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Contenido a la izquierda - Optimizado para móvil */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-2 px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="max-w-2xl lg:max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id + '-text'}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5 }}
              >
                {/* Tag Superior */}
                <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <div className={`h-[2px] sm:h-[3px] w-8 sm:w-12 bg-gradient-to-r ${current.gradient}`} />
                  <span className="text-white font-black text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase">
                    {current.tag}
                  </span>
                </div>

                {/* Título - Responsive */}
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-4 sm:mb-6 md:mb-8">
                  {current.title}
                </h1>

                {/* Subtítulo / Descripción */}
                <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-slate-300 font-medium mb-6 sm:mb-8 md:mb-12 italic">
                  {current.description}
                </p>

                {/* Points - Optimizado para móvil */}
                <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-8">
                  {current.points.map((point, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                      className="flex items-start gap-3 sm:gap-4 group"
                    >
                      <div className="flex flex-col items-center pt-1">
                        <div className={`w-[2px] sm:w-[3px] h-6 sm:h-8 md:h-10 bg-gradient-to-b ${point.highlight ? 'from-red-500 to-red-600' : current.gradient}`} />
                      </div>
                      <span className={`text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-tight leading-snug ${point.highlight ? 'text-red-400' : 'text-white'}`}>
                        {point.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navegación - Optimizada para móvil */}
      <div className="absolute bottom-4 sm:bottom-8 md:bottom-12 right-4 sm:right-8 md:right-12 z-30 flex flex-col items-end gap-3 sm:gap-4 md:gap-6">
        {/* Contador - Más pequeño en móvil */}
        <div className="flex items-baseline gap-2 sm:gap-3">
          <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none">
            {String(currentSlide + 1).padStart(2, '0')}
          </span>
          <span className="text-white/20 font-black text-xl sm:text-2xl md:text-3xl">
            / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
        
        {/* Indicadores Lineales */}
        <div className="flex gap-1.5 sm:gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-[3px] sm:h-[4px] transition-all duration-500 rounded-full ${
                idx === currentSlide 
                  ? `w-10 sm:w-12 md:w-16 bg-gradient-to-r ${current.gradient}` 
                  : 'w-4 sm:w-6 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Botones de control - Más pequeños en móvil */}
        <div className="flex gap-2 sm:gap-3 md:gap-4">
          <button 
            onClick={prevSlide} 
            className="p-2 sm:p-3 md:p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all group active:scale-95"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </button>
          <button 
            onClick={nextSlide} 
            className="p-2 sm:p-3 md:p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all group active:scale-95"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </button>
        </div>
      </div>

    </section>
  );
};

export default HeroCarousel;