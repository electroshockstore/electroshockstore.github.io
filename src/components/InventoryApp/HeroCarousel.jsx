import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, AlertCircle, CreditCard, MapPin, Clock, Package, Sparkles } from 'lucide-react';

const slides = [
  {
    id: 1,
    icon: AlertCircle,
    title: "VENDEDORES AUTORIZADOS",
    items: [
      { text: "Únicamente vía chat web", highlight: true },
      { text: "Evite ser estafado", highlight: true },
      { text: "NO tenemos instagram Ni pagina facebook oficial solo vendedores autorizados", highlight: true },
      { text: "Contacto oficial solo a través de nuestro sitio web", highlight: false }
    ],
    bgGradient: "from-blue-600 via-indigo-700 to-purple-900"
  },
  {
    id: 2,
    icon: Package,
    title: "SIN DEPÓSITOS",
    items: [
      { text: "NO solicitamos depósitos previos", highlight: true },
      { text: "Pago contra entrega del producto", highlight: false },
      { text: "Revisá el producto antes de pagar", highlight: false },
      { text: "Desconfía de quien te pida dinero por adelantado", highlight: true }
    ],
    bgGradient: "from-red-600 via-rose-700 to-pink-900"
  },
  {
    id: 3,
    icon: AlertCircle,
    title: "IMPORTANTE",
    items: [
      { text: "NO PERMUTO. Transferencias menores a $100.000 tienen recargo.", highlight: true },
      { text: "Efectivo o Transferencias inmediatas, ni lo intenten estafadores conozco todas.", highlight: false }
    ],
    bgGradient: "from-red-600 via-red-700 to-rose-900"
  },
  {
    id: 4,
    icon: Package,
    title: "CONDICIONES DE VENTA",
    items: [
      { text: "NO TENGO LOCAL SOY PARTICULAR", highlight: true },
      { text: "No hago facturas ni tengo garantía escrita.", highlight: true },
      { text: "Todos los productos estan sellados de fabrica. Por Cierre de local", highlight: true },
      { text: "Si se quiere abrir producto , se paga antes por seguridad", highlight: true }
    ],
    bgGradient: "from-orange-600 to-orange-800"
  },
  {
    id: 5,
    icon: MapPin,
    title: "RETIRO Y HORARIOS",
    items: [
      { text: "Punto de retiro:  Berazategui : AV Mitre y AV 14 , 16:00hs ", highlight: false },
      { text: "Punto de retiro:  Cruce Florencio Varela : Puerta Bingo (bz cruce) 16:30hs.", highlight: false },
      { text: "Fines de semana: Solo en zonas Florencio Varela todo el día.", highlight: false },
      { text: "No viajo a otro lado, solo tengo esos horarios por falta de tiempo.", highlight: true }
    ],
    bgGradient: "from-blue-600 via-blue-700 to-indigo-900"
  },
  {
    id: 6,
    icon: CreditCard,
    title: "FORMAS DE PAGO",
    items: [
      { text: "Transferencias bancarias EN EL MOMENTO DE IMPACTO (recargo en montos menores a $100.000)", highlight: false },
      { text: "Efectivo contra entrega", highlight: false },
      { text: "Se revisa producto se paga y se entrega.", highlight: false }
    ],
    bgGradient: "from-green-600 via-emerald-700 to-teal-900"
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Swipe handlers
  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = Math.abs(offset.x) * velocity.x;

    if (swipe < -10000) {
      nextSlide();
    } else if (swipe > 10000) {
      prevSlide();
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      opacity: 0
    }),
    center: {
      zIndex: 1,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      opacity: 0
    })
  };

  const current = slides[currentSlide];
  const Icon = current.icon;

  return (
    <div className="w-full mb-8 sm:mb-12 px-4 sm:px-6 lg:px-8">
      {/* Logo Section with Enhanced Animation */}
      <motion.div
        initial={{ opacity: 0, y: -40, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.8,
          type: "spring",
          stiffness: 100
        }}
        className="flex justify-center mb-8 sm:mb-12 relative"
      >
        <div className="relative group">
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img 
              src="/logotipo.png" 
              alt="Electro Shock Logo" 
              className="h-28 sm:h-36 md:h-44 lg:h-52 object-contain drop-shadow-2xl relative z-10"
            />
          </motion.div>
          
          {/* Glow effect behind logo */}
          <motion.div
            animate={{ 
              opacity: [0.5, 0.8, 0.5],
              scale: [0.9, 1.1, 0.9]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-blue-500 blur-3xl opacity-50 -z-10"
          />
        </div>
      </motion.div>

      <div 
        className="relative overflow-hidden rounded-3xl shadow-2xl"
        onMouseEnter={() => {
          setIsPaused(true);
          setIsHovering(true);
        }}
        onMouseLeave={() => {
          setIsPaused(false);
          setIsHovering(false);
        }}
      >
        {/* Enhanced background with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-95" />
        
        <div className="relative h-[450px] sm:h-[480px] md:h-[500px] lg:h-[420px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                opacity: { duration: 0.5, ease: "easeInOut" }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              className={`absolute inset-0 ${current.type === 'image' ? 'bg-gradient-to-br from-gray-50 to-gray-100' : `bg-gradient-to-br ${current.bgGradient}`} cursor-grab active:cursor-grabbing`}
            >
              {current.type === 'image' ? (
                // Image slide
                <div className="relative h-full w-full flex items-center justify-center p-4">
                  <img 
                    src={current.image} 
                    alt={current.alt}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                <>
                  {/* Animated mesh gradient overlay */}
                  <motion.div 
                    className="absolute inset-0"
                    animate={{
                      background: [
                        'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                      ]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                  />
                  
                  {/* Modern geometric pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full">
                      <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>
                  
                  <div className="relative h-full flex items-center px-6 sm:px-10 md:px-16 lg:px-20 py-8 text-white">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      
                      {/* Left Side - Content */}
                      <div className="space-y-6">
                        {/* Icon + Title */}
                        <div className="flex items-center gap-4">
                          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl border border-white/40 shadow-lg">
                            <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={2.5} />
                          </div>
                          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                            {current.title}
                          </h2>
                        </div>

                        {/* Items List */}
                        <div className="space-y-3">
                          {current.items.map((item, index) => (
                            <div
                              key={index}
                              className={`flex items-start gap-3 p-3 rounded-lg backdrop-blur-sm transition-all duration-300 ${
                                item.highlight 
                                  ? 'bg-white/95 border-l-4 border-red-500 shadow-lg' 
                                  : 'bg-white/80 border-l-4 border-emerald-500'
                              }`}
                            >
                              <span className={`text-2xl flex-shrink-0 ${
                                item.highlight ? 'text-red-600' : 'text-emerald-600'
                              }`}>
                                {item.highlight ? '⚠️' : '✓'}
                              </span>
                              <span className={`text-sm sm:text-base leading-snug ${
                                item.highlight 
                                  ? 'text-red-900 font-bold' 
                                  : 'text-gray-800 font-semibold'
                              }`}>
                                {item.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Side - Visual Element */}
                      <div className="hidden lg:flex items-center justify-center">
                        <div className="relative">
                          <motion.div
                            animate={{ 
                              scale: [1, 1.05, 1],
                              rotate: [0, 2, -2, 0]
                            }}
                            transition={{ 
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border-2 border-white/30 shadow-2xl"
                          >
                            <Icon className="w-48 h-48 text-white/80" strokeWidth={1.5} />
                          </motion.div>
                          
                          {/* Decorative elements */}
                          <motion.div
                            animate={{ 
                              opacity: [0.3, 0.6, 0.3],
                              scale: [0.9, 1.1, 0.9]
                            }}
                            transition={{ 
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="absolute inset-0 bg-white/20 blur-3xl rounded-full -z-10"
                          />
                        </div>
                      </div>

                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enhanced Navigation Arrows - Hidden on mobile */}
        <motion.button
          onClick={prevSlide}
          whileHover={{ scale: 1.15, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/60 backdrop-blur-md p-3 sm:p-4 rounded-full transition-all duration-300 z-20 shadow-2xl border border-white/30 group"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:text-gray-100" strokeWidth={3} />
        </motion.button>

        <motion.button
          onClick={nextSlide}
          whileHover={{ scale: 1.15, x: 5 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/60 backdrop-blur-md p-3 sm:p-4 rounded-full transition-all duration-300 z-20 shadow-2xl border border-white/30 group"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:text-gray-100" strokeWidth={3} />
        </motion.button>

        {/* Progress bar */}
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-white/80"
          initial={{ width: "0%" }}
          animate={{ width: isPaused ? `${(currentSlide / slides.length) * 100}%` : "100%" }}
          transition={{ duration: isPaused ? 0 : 8, ease: "linear" }}
          key={currentSlide}
        />
      </div>

      {/* Dots Indicator - Outside carousel, below it */}
      <div className="flex justify-center mt-6 gap-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            className={`transition-all duration-300 rounded-full shadow-lg ${
              index === currentSlide
                ? 'bg-blue-600 w-10 h-3.5'
                : 'bg-gray-400 w-3.5 h-3.5 hover:bg-gray-600'
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Minimalist Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-12 sm:mt-16 text-center px-4"
      >
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Explorá Nuestros Productos
        </h3>
        
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Seleccioná una categoría arriba para ver nuestro catálogo completo
        </p>
      </motion.div>
    </div>
  );
};

export default HeroCarousel;