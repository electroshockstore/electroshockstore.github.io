/**
 * Loader moderno y premium para ElectroShock
 * ULTRA-OPTIMIZADO: Blur reducido, menos animaciones, mejor performance
 */
const ModernLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0f] overflow-hidden">
      {/* Partículas de fondo OPTIMIZADAS - Solo desktop, blur reducido, sin animate-pulse */}
      <div className="hidden md:block absolute inset-0 overflow-hidden">
        {/* Blur reducido de blur-3xl (48px) → blur-xl (24px) */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/25 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/25 rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-xl" />
      </div>

      {/* Contenedor principal */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        
        {/* Logo con efectos premium OPTIMIZADOS */}
        <div className="relative">
          {/* Glow rings animados - SOLO 1 en lugar de 3 */}
          <div className="absolute inset-0 -m-8">
            <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-ping" />
          </div>

          {/* Glow de fondo del logo OPTIMIZADO - Sin animate-pulse, blur reducido */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full blur-xl opacity-40" />
          
          {/* Logo con animación float suave */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 animate-float">
            <img 
              src="/logotipo_tiny.png" 
              alt="ElectroShock" 
              className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.8)]"
            />
          </div>

          {/* Partículas orbitales ELIMINADAS - Muy costosas */}
        </div>

        {/* Texto de carga */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
              ElectroShock
            </span>
          </h2>
          
          {/* Barra de progreso animada - Sin backdrop-blur */}
          <div className="w-48 sm:w-64 h-1.5 bg-gray-800/50 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full animate-loading-bar shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
          </div>

          {/* Texto sin animate-pulse */}
          <p className="text-sm text-gray-400 font-medium">
            Cargando ...
          </p>
        </div>
      </div>

      {/* Grid de fondo sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />
    </div>
  );
};

export default ModernLoader;
