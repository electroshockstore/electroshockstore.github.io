const HeroBackground = () => {
  return (
    <>
      {/* Background: oscuro en mobile, tinta clara del landing en desktop */}
      <div className="absolute inset-0 bg-[rgb(3,7,18)] lg:bg-[#e4e4e4]" />

      {/* Grid pattern */}
      <div className="hero-grid-pattern absolute inset-0 opacity-[0.04] pointer-events-none lg:opacity-[0.12]" />

      {/* Gradient blobs (solo mobile) */}
      <div className="hero-blob absolute top-10 left-5 sm:top-20 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 rounded-full pointer-events-none blur-[40px] sm:blur-[60px] bg-blue-600/15 lg:hidden" />
      <div
        className="hero-blob absolute bottom-10 right-5 sm:bottom-20 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 rounded-full pointer-events-none blur-[40px] sm:blur-[70px] bg-purple-600/12 lg:hidden"
        style={{ animationDelay: '1s' }}
      />

      {/* Resplandor lima (solo desktop) */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 hidden h-96 w-96 -translate-x-1/2 rounded-full bg-[#c8f519]/15 blur-[100px] lg:block"
        aria-hidden="true"
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px hero-top-accent lg:hidden" />
      {/* Filete lima superior (solo desktop) */}
      <div className="absolute top-0 left-0 right-0 hidden h-1 bg-[#c8f519] lg:block" aria-hidden="true" />
    </>
  );
};

export default HeroBackground;
