import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Shield, Package, AlertTriangle, MapPin, Info, AlertCircle, CheckCircle2 } from 'lucide-react';

// --- DEFINICIÓN DE SLIDES CORREGIDA ---
const slides = [
  { // <-- SE ELIMINÓ LA LLAVE EXTRA DE AQUÍ
    "id": 1,
    "icon": Shield, // Se corrigió a la referencia del icono
    "title": "COMPRÁ CON SEGURIDAD",
    "subtitle": "¡NO TE DEJES ENGAÑAR!",
    "points": [
      {
        "text": "Solo vendemos a través de esta web oficial, verificada y segura.",
        "highlight": false,
        "positive": true 
      },
      {
        "text": "¡ATENCIÓN! NO tenemos cuentas oficiales de venta en Instagram ni Facebook.",
        "highlight": true
      },
      {
        "text": "Asesores autorizados solo en el chat web y WhatsApp oficial.",
        "highlight": false,
        "positive": true
      }

    ],
    theme: "blue",
    image: "/images/hero/megaphone_tiny.webp"
  },
  {
    id: 2,
    icon: Package,
    title: "SIN DEPÓSITOS",
    subtitle: "¡NO TE DEJES ENGAÑAR!",
    points: [
      { text: "¡ATENCIÓN! NO pedimos dinero previo", highlight: true },
      { text: "Pagás al recibir el producto", highlight: false, positive: true }, // Verde
      { text: "Revisá antes de abonar", highlight: false, positive: true } // Verde
    ],
    theme: "emerald",
    image: "/images/hero/stop_tiny.jpg"
  },
  {
    id: 3,
    icon: AlertTriangle,
    title: "CONDICIONES",
    subtitle: "Leé atentamente",
    points: [
      { text: "NO PERMUTO", highlight: true },
      { text: "Solo efectivo o transferencia", highlight: false }, 
      { text: "Recargo en transf. < $100.000", highlight: true }
    ],
    theme: "orange",
    image: "/images/hero/methods_tiny.webp"
  },
  {
    id: 4,
    icon: Info,
    title: "VENTA PARTICULAR",
    subtitle: "Liquidación de stock",
    points: [
      { text: "SOY PARTICULAR - SIN LOCAL", highlight: true },
      { text: "Productos sellados de fábrica", highlight: false, positive: true }, // Verde (calidad)
      { text: "Sin factura ni garantía escrita", highlight: true }
    ],
    theme: "purple",
    image: "/images/hero/atenttion_tiny.jpg"
  },
  {
    id: 5,
    icon: MapPin,
    title: "PUNTOS RETIRO",
    subtitle: "Horarios fijos y seguros",
    points: [
      { text: "Berazategui Centro (16:00hs)", highlight: false, positive: true },
      { text: "Cruce Varela - Bingo (16:30hs)", highlight: false, positive: true },
      { text: "NO viajo a otros puntos", highlight: true }
    ],
    theme: "cyan",
    image: "/images/hero/location_tiny.webp"
  }
];

const colorMap = {
  blue: { bg: 'bg-blue-600', border: 'border-blue-500/30', glow: 'shadow-blue-500/20', icon: 'text-blue-400' },
  emerald: { bg: 'bg-emerald-600', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/20', icon: 'text-emerald-400' },
  orange: { bg: 'bg-orange-600', border: 'border-orange-500/30', glow: 'shadow-orange-500/20', icon: 'text-orange-400' },
  purple: { bg: 'bg-purple-600', border: 'border-purple-500/30', glow: 'shadow-purple-500/20', icon: 'text-purple-400' },
  cyan: { bg: 'bg-cyan-600', border: 'border-cyan-500/30', glow: 'shadow-cyan-500/20', icon: 'text-cyan-400' },
};

// Se agregó el icono Shield al mapa para que el acceso sea por nombre de string
const iconMap = {
  Shield: Shield,
  Package: Package,
  AlertTriangle: AlertTriangle,
  MapPin: MapPin,
  Info: Info,
  AlertCircle: AlertCircle,
  CheckCircle2: CheckCircle2,
};


const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, [isPaused, currentSlide]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const current = slides[currentSlide];
  const theme = colorMap[current.theme];
  // Usa el iconMap para obtener el componente Icon
  const Icon = iconMap[current.icon.name] || AlertCircle; // Fallback a AlertCircle

  // --- FUNCIÓN MEJORADA: APLICA VERDE PARA PUNTOS POSITIVOS/IMPORTANTES ---
  const renderPointText = (text, isHighlight, isPositive) => {
    // Palabras clave que siempre deben destacarse en ROJO (negaciones, advertencias)
    const redKeywords = ["NO", "SIN", "SOY", "ATENCIÓN", "RECARGO", "SIN LOCAL"];
    
    // Si es una afirmación positiva (ej: Pagás al recibir, Sellados de fábrica)
    const positiveColorClass = "font-black text-emerald-400 drop-shadow-md px-0.5 tracking-wide";
    
    // Si es una alerta (ej: NO tenemos FB, NO PERMUTO)
    const highlightColorClass = "font-black text-red-400 drop-shadow-md px-0.5 tracking-wide";

    const parts = text.split(' ');
    
    return parts.map((word, i) => {
      // Limpiar palabra para la comparación
      const cleanWord = word.replace(/[^a-zA-ZÁÉÍÓÚÑ]/g, "").toUpperCase();
      const isRedKeyword = redKeywords.includes(cleanWord);

      let className = "text-gray-100"; // Color por defecto

      if (isHighlight || isRedKeyword) {
        // Regla: Si tiene highlight O contiene una palabra clave de negación/alerta, es ROJO.
        className = highlightColorClass;
      } else if (isPositive) {
        // Regla: Si no es una alerta roja, pero está marcada como 'positive', es VERDE.
        // Solo colorea la palabra clave principal, no toda la frase.
        className = positiveColorClass;
      }

      // Si la palabra es un punto importante (rojo o verde), la envuelve.
      if (isHighlight || isRedKeyword || (isPositive && i === 0)) { // Destaca la primera palabra del punto positivo
        return (
          <span key={i} className={`inline-block ${className}`}>
            {word}
            {" "} 
          </span>
        );
      }
      
      // El resto del texto se renderiza normal.
      return <span key={i} className="text-gray-100">{word} </span>;
    });
  };

  return (
    <div className="w-full mb-8 sm:mb-16 lg:mb-20 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-[95vw] lg:max-w-[90vw] xl:max-w-[85vw] 2xl:max-w-[1800px] mx-auto font-sans selection:bg-red-500/30">

      {/* --- MAIN CARD --- */}
      <div
        className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[3rem] shadow-2xl lg:shadow-[0_25px_80px_-15px_rgba(0,0,0,0.5)] bg-[#0f1115] border border-white/10 group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >

        <div className="relative min-h-[650px] md:min-h-[550px] lg:min-h-[650px] xl:min-h-[700px] 2xl:min-h-[750px] flex flex-col md:flex-row">

          {/* === IZQUIERDA: IMAGEN + TÍTULO === */}
          <div className="md:w-[55%] lg:w-[58%] xl:w-[60%] relative overflow-hidden flex flex-col justify-end p-8 md:p-12 lg:p-16 xl:p-20 2xl:p-24">
            {/* Fondo Imagen Animada */}
            <AnimatePresence mode='wait'>
              <motion.div
                key={current.id + '-img'}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0 z-0"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
                <div className={`absolute inset-0 bg-${current.theme}-900/20 mix-blend-overlay z-10`} />
                <img
                  src={current.image}
                  alt="Background"
                  className="w-full h-full object-cover grayscale-[30%]"
                />
              </motion.div>
            </AnimatePresence>

            {/* Contenido Texto */}
            <div className="relative z-20 mt-auto">
              <AnimatePresence mode='wait'>
                <motion.div
                  key={current.id + '-title'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={`inline-flex items-center gap-2 px-3 py-1 lg:px-4 lg:py-1.5 rounded-full border ${theme.border} bg-black/40 backdrop-blur-md mb-4 lg:mb-6`}>
                    <Icon className={`w-4 h-4 lg:w-5 lg:h-5 ${theme.icon}`} />
                    <span className={`text-xs lg:text-sm font-bold uppercase tracking-wider ${theme.icon} opacity-90`}>Información Importante</span>
                  </div>

                  <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-2 lg:mb-4 drop-shadow-lg">
                    {current.title}
                  </h2>
                  <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gray-200 font-medium tracking-tight">
                    {current.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* === DERECHA: PANEL DE INFORMACIÓN (TECH HUD) === */}
          <div className="md:w-[45%] lg:w-[42%] xl:w-[40%] relative bg-[#0a0a0a]/80 md:bg-white/[0.02] backdrop-blur-2xl border-t md:border-t-0 md:border-l border-white/5 p-6 md:p-10 lg:p-12 xl:p-16 2xl:p-20 flex flex-col justify-center">

            {/* Glow ambiental dinámico detrás del panel */}
            <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-b ${theme.bg} opacity-[0.03] pointer-events-none`} />

            <AnimatePresence mode='wait'>
              <motion.div
                key={current.id + '-points'}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="space-y-4 relative z-10"
              >
                {/* Header del Panel */}
                <div className="mb-6 lg:mb-8 border-b border-white/10 pb-4">
                  <h3 className="text-white/50 text-xs lg:text-sm font-mono uppercase tracking-[0.2em] mb-1">Detalles de operación</h3>
                  <div className="h-0.5 w-12 lg:w-16 bg-gradient-to-r from-red-500 to-transparent" />
                </div>

                {/* Tarjetas de Puntos */}
                {current.points.map((point, idx) => (
                  <div
                    key={idx}
                    className={`
                      group/card relative p-4 lg:p-5 xl:p-6 2xl:p-7 rounded-xl lg:rounded-2xl border transition-all duration-300
                      ${point.highlight
                        ? 'bg-red-500/[0.08] border-red-500/20 hover:bg-red-500/[0.12]'
                        : (point.positive ? 'bg-emerald-500/[0.08] border-emerald-500/20 hover:bg-emerald-500/[0.12]' : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.06] hover:border-white/10')
                      }
                    `}
                  >
                    <div className="flex items-start gap-3 lg:gap-4">
                      <div className={`
                        mt-1 p-1.5 lg:p-2 rounded-lg shrink-0 transition-colors
                        ${point.highlight ? 'bg-red-500/20 text-red-400' : (point.positive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-gray-400 group-hover/card:text-white')}
                      `}>
                        {point.highlight ? <AlertCircle size={20} className="lg:w-6 lg:h-6" /> : <CheckCircle2 size={20} className="lg:w-6 lg:h-6" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl leading-relaxed text-gray-300 break-words">
                          {/* Pasar el nuevo parámetro 'positive' a renderPointText */}
                          {renderPointText(point.text, point.highlight, point.positive)}
                        </p>
                      </div>
                    </div>
                    {/* Tech Corner Accent */}
                    {(point.highlight || point.positive) && (
                      <div className="absolute top-0 right-0 p-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${point.highlight ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(52,211,163,0.6)]'}`} />
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Controles de Navegación integrados en el panel */}
            <div className="mt-8 lg:mt-10 flex items-center justify-between pt-6 lg:pt-8 border-t border-white/5">

              {/* Indicadores (Puntos) */}
              <div className="flex gap-1.5 lg:gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1 lg:h-1.5 transition-all duration-300 rounded-full ${idx === currentSlide ? `w-6 lg:w-8 ${theme.bg}` : 'w-2 lg:w-3 bg-white/20 hover:bg-white/40'}`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Botones Flechas */}
              <div className="flex gap-2 lg:gap-3">
                <button onClick={prevSlide} className="p-2 lg:p-3 rounded-lg lg:rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-white/70 hover:text-white">
                  <ChevronLeft size={20} className="lg:w-6 lg:h-6" />
                </button>
                <button onClick={nextSlide} className="p-2 lg:p-3 rounded-lg lg:rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-white/70 hover:text-white">
                  <ChevronRight size={20} className="lg:w-6 lg:h-6" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;