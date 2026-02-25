const HeroBackground = () => {
  return (
    <>
      {/* Background */}
      <div className="absolute inset-0 bg-[rgb(3,7,18)]" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none hero-grid-pattern" />

      {/* Gradient blobs */}
      <div className="hero-blob absolute top-10 left-5 sm:top-20 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 rounded-full pointer-events-none blur-[40px] sm:blur-[60px] bg-blue-600/15" />
      <div 
        className="hero-blob absolute bottom-10 right-5 sm:bottom-20 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 rounded-full pointer-events-none blur-[40px] sm:blur-[70px] bg-purple-600/12"
        style={{ animationDelay: '1s' }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px hero-top-accent" />
    </>
  );
};

export default HeroBackground;
