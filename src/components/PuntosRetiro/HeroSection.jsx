import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import useIOSDetection from '../../hooks/useIOSDetection';

// Interactive 3D Question Mark SVG Component
const Interactive3DQuestionMark = ({ isIOS }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (isIOS) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setMousePos({
      x: (e.clientX - cx) / (rect.width / 2),
      y: (e.clientY - cy) / (rect.height / 2),
    });
  };

  const rotateY = isIOS ? 0 : mousePos.x * 25;
  const rotateX = isIOS ? 0 : -mousePos.y * 20;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
      className="relative flex items-center justify-center cursor-pointer select-none"
      style={{ width: '100%', height: '100%' }}
    >
      <motion.div
        animate={isIOS ? {} : {
          rotateY,
          rotateX,
          scale: isHovered ? 1.08 : 1,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        style={{ transformStyle: 'preserve-3d', perspective: 800 }}
      >
        {/* Floating glow rings */}
        {!isIOS && (
          <>
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '110%', height: '110%',
                top: '-5%', left: '-5%',
                border: '2px solid rgba(59,130,246,0.3)',
                filter: 'blur(2px)',
              }}
              animate={{ rotate: 360, scale: [1, 1.04, 1] }}
              transition={{ rotate: { duration: 12, repeat: Infinity, ease: 'linear' }, scale: { duration: 3, repeat: Infinity } }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '130%', height: '130%',
                top: '-15%', left: '-15%',
                border: '1px solid rgba(139,92,246,0.2)',
                filter: 'blur(1px)',
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          </>
        )}

        {/* SVG 3D Question Mark */}
        <svg
          viewBox="0 0 200 240"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: '100%',
            height: '100%',
            filter: isIOS
              ? 'drop-shadow(0 8px 16px rgba(59,130,246,0.5))'
              : 'drop-shadow(0 12px 40px rgba(59,130,246,0.7)) drop-shadow(0 0 60px rgba(139,92,246,0.4))',
          }}
        >
          <defs>
            {/* Main gradient - front face */}
            <linearGradient id="frontGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="40%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            {/* Side/depth gradient */}
            <linearGradient id="sideGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            {/* Highlight gradient */}
            <linearGradient id="highlightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            {/* Purple accent */}
            <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            {/* Glow filter */}
            <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Inner shadow */}
            <filter id="innerShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#1e3a8a" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* === 3D DEPTH LAYERS (back/side) === */}
          {/* Bottom dot depth */}
          <ellipse cx="102" cy="208" rx="17" ry="15" fill="url(#sideGrad)" />
          <ellipse cx="102" cy="202" rx="17" ry="15" fill="#1e3a8a" />
          
          {/* Question mark curve depth - offset shapes for 3D illusion */}
          {/* Main curve body depth */}
          <path
            d="M 68 74 Q 64 42 100 30 Q 148 16 152 54 Q 158 84 132 98 Q 118 108 112 122 L 108 148"
            fill="none"
            stroke="#1e3a8a"
            strokeWidth="30"
            strokeLinecap="round"
            transform="translate(5, 6)"
          />
          {/* Thin extrusion line */}
          <path
            d="M 68 74 Q 64 42 100 30 Q 148 16 152 54 Q 158 84 132 98 Q 118 108 112 122 L 108 148"
            fill="none"
            stroke="#1d4ed8"
            strokeWidth="30"
            strokeLinecap="round"
            transform="translate(3, 4)"
          />

          {/* === FRONT FACES === */}
          {/* Main Q-mark stroke */}
          <path
            d="M 68 74 Q 64 42 100 30 Q 148 16 152 54 Q 158 84 132 98 Q 118 108 112 122 L 108 148"
            fill="none"
            stroke="url(#frontGrad)"
            strokeWidth="30"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* Highlight on curve top */}
          <path
            d="M 72 72 Q 70 48 100 36 Q 140 24 146 54"
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Bottom dot front */}
          <ellipse cx="100" cy="196" rx="17" ry="16" fill="url(#frontGrad)" filter="url(#glow)" />
          {/* Dot highlight */}
          <ellipse cx="95" cy="190" rx="7" ry="5" fill="rgba(255,255,255,0.4)" />

          {/* Purple accent inner glow line on curve */}
          <path
            d="M 85 70 Q 83 52 100 42 Q 128 32 136 54 Q 140 72 124 86 Q 114 96 110 112 L 108 138"
            fill="none"
            stroke="url(#accentGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Specular highlight dot */}
          <circle cx="88" cy="56" r="6" fill="rgba(255,255,255,0.5)" />
          <circle cx="88" cy="56" r="3" fill="rgba(255,255,255,0.8)" />
        </svg>
      </motion.div>

      {/* Floating particles around it */}
      {!isIOS && (
        <>
          {[
            { x: -30, y: -20, size: 4, color: '#3b82f6', delay: 0 },
            { x: 35, y: -35, size: 3, color: '#a78bfa', delay: 0.4 },
            { x: 40, y: 20, size: 5, color: '#60a5fa', delay: 0.8 },
            { x: -35, y: 30, size: 3, color: '#818cf8', delay: 1.2 },
            { x: 0, y: -45, size: 2, color: '#c4b5fd', delay: 1.6 },
          ].map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: p.size,
                height: p.size,
                background: p.color,
                left: `calc(50% + ${p.x}px)`,
                top: `calc(50% + ${p.y}px)`,
                boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              }}
              animate={{
                y: [0, -12, 0],
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

// Animated noise texture overlay
const NoiseOverlay = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
);

const HeroSection = () => {
  const isIOS = useIOSDetection();

  const titleVariants = isIOS
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 40, skewX: 4 },
        visible: (i) => ({
          opacity: 1, y: 0, skewX: 0,
          transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
        })
      };

  const descriptionVariants = isIOS
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] } }
      };

  const badgeVariants = isIOS
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.9, ease: [0.16, 1, 0.3, 1] } }
      };

  return (
    <section className="relative py-10 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden min-h-[85vh] flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gray-950" />
      <NoiseOverlay />

      {/* Grid lines - brutalist detail */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Background blobs */}
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <motion.div
          className="absolute top-10 left-5 sm:top-20 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-600/15 rounded-full"
          style={{ filter: isIOS ? 'blur(40px)' : 'blur(60px)' }}
          animate={isIOS ? {} : { scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={isIOS ? {} : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-purple-600/12 rounded-full"
          style={{ filter: isIOS ? 'blur(40px)' : 'blur(70px)' }}
          animate={isIOS ? {} : { scale: [1, 1.1, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={isIOS ? {} : { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        {/* Extra center accent */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[500px] sm:h-[500px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
      </div>

      {/* Top accent bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: 'linear-gradient(90deg, transparent, #3b82f6, #8b5cf6, transparent)' }}
        initial={isIOS ? {} : { scaleX: 0, opacity: 0 }}
        animate={isIOS ? {} : { scaleX: 1, opacity: 1 }}
        transition={isIOS ? {} : { duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Main layout: text + 3D icon */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

          {/* === LEFT: Text Content === */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">

            {/* Eyebrow label */}
            <motion.div
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 mb-5 sm:mb-7"
            >
              <span
                className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] px-3 py-1.5 text-blue-400"
                style={{
                  border: '1px solid rgba(59,130,246,0.4)',
                  background: 'rgba(59,130,246,0.08)',
                  clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                }}
              >
                📍 Puntos de retiro disponibles
              </span>
              <motion.span
                className="w-2 h-2 rounded-full bg-blue-400"
                animate={isIOS ? {} : { opacity: [1, 0.2, 1], scale: [1, 0.8, 1] }}
                transition={isIOS ? {} : { duration: 1.5, repeat: Infinity }}
              />
            </motion.div>

            {/* Main Title */}
            <h1
              className="font-black leading-[0.88] mb-5 sm:mb-7"
              style={{ fontFamily: "'Arial Black', 'Impact', sans-serif" }}
            >
              {/* Line 1 */}
              <div className="overflow-hidden mb-1">
                <motion.span
                  className="inline-block text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  variants={titleVariants}
                  style={isIOS ? {} : { willChange: 'opacity, transform' }}
                >
                  ¿
                </motion.span>
              </div>

              {/* "Dónde Retiro" with brutal marker */}
              <div className="overflow-visible mb-2">
                <motion.span
                  className="inline-block relative text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  variants={titleVariants}
                  style={isIOS ? {} : { willChange: 'opacity, transform' }}
                >
                  {/* Marker layers */}
                  <span className="absolute inset-0 bg-blue-600 -skew-x-6 rotate-[-1.5deg] opacity-100 translate-x-2 translate-y-2" />
                  <span className="absolute inset-0 bg-blue-500 -skew-x-6 rotate-[-0.5deg] opacity-100 translate-x-1 translate-y-1" />
                  <span className="absolute inset-0 bg-blue-400 -skew-x-6 opacity-100" />
                  {/* Corner accents */}
                  <span className="absolute -top-1 -left-1 w-3 h-3 bg-white opacity-80" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-900 opacity-80" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
                  {/* Text */}
                  <span
                    className="relative text-black px-4 sm:px-6 md:px-8 inline-block font-black uppercase"
                    style={{
                      textShadow: '2px 2px 0 rgba(0,0,0,0.2)',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    Dónde Retiro
                  </span>
                  {/* Glow */}
                  {!isIOS && (
                    <span
                      className="absolute inset-0 bg-blue-400 opacity-50"
                      style={{ filter: 'blur(30px)', animation: 'pulse 2s ease-in-out infinite' }}
                    />
                  )}
                </motion.span>
              </div>

              <br />

              {/* "Los Productos?" line */}
              <div className="overflow-hidden mt-1">
                <motion.span
                  className="inline-block text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl mr-3 sm:mr-5"
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  variants={titleVariants}
                  style={isIOS ? {} : { willChange: 'opacity, transform' }}
                >
                  Los
                </motion.span>
                <motion.span
                  className="inline-block relative text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
                  custom={3}
                  initial="hidden"
                  animate="visible"
                  variants={titleVariants}
                  style={isIOS ? {} : { willChange: 'opacity, transform' }}
                >
                  <span className="relative text-white">
                    Productos
                    {/* underline accent */}
                    <motion.span
                      className="absolute -bottom-1 left-0 h-1 bg-purple-500"
                      initial={isIOS ? {} : { width: 0 }}
                      animate={isIOS ? {} : { width: '100%' }}
                      transition={isIOS ? {} : { duration: 0.6, delay: 0.8 }}
                    />
                  </span>
                  <span className="text-blue-400">?</span>
                </motion.span>
              </div>
            </h1>

            {/* Description */}
            <motion.p
              className="text-base sm:text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium mb-7 sm:mb-9"
              variants={descriptionVariants}
              initial="hidden"
              animate="visible"
              style={isIOS ? {} : { willChange: 'opacity, transform' }}
            >
              Elegí el punto más cercano y coordiná tu entrega{' '}
              <span
                className="font-black text-white relative inline-block px-1"
                style={{ background: 'rgba(59,130,246,0.15)' }}
              >
                segura
              </span>
            </motion.p>

            {/* CTA + Stats row */}
            <motion.div
              className="flex flex-col sm:flex-row items-center lg:items-start gap-4 sm:gap-6"
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
            >
              {/* CTA Button */}
              <motion.button
                className="group relative w-full sm:w-auto px-8 py-4 font-black text-sm sm:text-base uppercase tracking-widest text-black overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
                  clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
                  boxShadow: '4px 4px 0 #1e3a8a',
                }}
                whileHover={isIOS ? {} : { scale: 1.03, boxShadow: '6px 6px 0 #1e3a8a' }}
                whileTap={isIOS ? {} : { scale: 0.97 }}
              >
                <span className="relative z-10">No tenemos Local Fisico →</span>
                {!isIOS && (
                  <motion.span
                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.button>

              {/* Stats */}
              <div className="flex items-center gap-4 sm:gap-6">
                {[
                  { val: '3', label: 'Puntos de retiro' },
                  { val: 'Coordinar', label: 'horarios' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl sm:text-3xl font-black text-white" style={{ letterSpacing: '-0.04em' }}>
                      {stat.val}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* === RIGHT: 3D Interactive Question Mark === */}
          <motion.div
            className="order-1 lg:order-2 flex-shrink-0 relative"
            style={{ width: 'clamp(160px, 28vw, 320px)', height: 'clamp(200px, 35vw, 400px)' }}
            initial={isIOS ? {} : { opacity: 0, x: 40, scale: 0.85 }}
            animate={isIOS ? {} : { opacity: 1, x: 0, scale: 1 }}
            transition={isIOS ? {} : { duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Animated orbit ring behind */}
            {!isIOS && (
              <motion.div
                className="absolute inset-[-20%] rounded-full pointer-events-none"
                style={{
                  border: '1px dashed rgba(59,130,246,0.2)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />
            )}

            {/* Background block - brutalist */}
            <div
              className="absolute inset-[10%]"
              style={{
                background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.06) 100%)',
                border: '1px solid rgba(59,130,246,0.15)',
                transform: 'rotate(3deg)',
              }}
            />
            <div
              className="absolute inset-[10%]"
              style={{
                background: 'linear-gradient(135deg, rgba(59,130,246,0.05) 0%, rgba(139,92,246,0.04) 100%)',
                border: '1px solid rgba(59,130,246,0.08)',
                transform: 'rotate(-2deg)',
              }}
            />

            {/* The actual 3D Q mark */}
            <div className="absolute inset-0 z-10 flex items-center justify-center p-6 sm:p-8">
              <Interactive3DQuestionMark isIOS={isIOS} />
            </div>

            {/* Bottom label chip */}
            <motion.div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-black uppercase tracking-widest text-blue-400 px-3 py-1 z-20"
              style={{
                background: 'rgba(0,0,0,0.9)',
                border: '1px solid rgba(59,130,246,0.3)',
                clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
              }}
              animate={isIOS ? {} : { opacity: [0.7, 1, 0.7] }}
              transition={isIOS ? {} : { duration: 2, repeat: Infinity }}
            >
             Retiros Personales
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom feature pills */}
        <motion.div
          className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mt-10 sm:mt-14"
          initial={isIOS ? {} : { opacity: 0, y: 20 }}
          animate={isIOS ? {} : { opacity: 1, y: 0 }}
          transition={isIOS ? {} : { duration: 0.5, delay: 1.1 }}
        >
          {[
            { icon: '🔒', text: 'Puntos Seguros' },
            { icon: '📍', text: 'No Pedimos Adelantos Ni Señas' },
            { icon: '⚡', text: 'Retiros en el dia' },
            { icon: '✅', text: 'Confirmación instantánea' },
          ].map((pill, i) => (
            <motion.span
              key={i}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-gray-400"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              whileHover={isIOS ? {} : {
                color: '#93c5fd',
                borderColor: 'rgba(59,130,246,0.4)',
                background: 'rgba(59,130,246,0.06)',
                y: -2,
              }}
              transition={{ duration: 0.15 }}
            >
              <span>{pill.icon}</span>
              <span>{pill.text}</span>
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;