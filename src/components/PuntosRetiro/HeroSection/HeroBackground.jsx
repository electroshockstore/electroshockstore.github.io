const HeroBackground = () => {
  return (
    <>
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'rgb(3, 7, 18)' }} />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      {/* Gradient blobs */}
      <div 
        className="hero-blob absolute top-10 left-5 sm:top-20 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 rounded-full pointer-events-none blur-[40px] sm:blur-[60px]"
        style={{ background: 'rgba(37, 99, 235, 0.15)' }}
      />
      <div 
        className="hero-blob absolute bottom-10 right-5 sm:bottom-20 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 rounded-full pointer-events-none blur-[40px] sm:blur-[70px]"
        style={{ 
          background: 'rgba(147, 51, 234, 0.12)',
          animationDelay: '1s'
        }}
      />

      {/* Top accent line */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #3b82f6, #8b5cf6, transparent)' }}
      />
    </>
  );
};

export default HeroBackground;
