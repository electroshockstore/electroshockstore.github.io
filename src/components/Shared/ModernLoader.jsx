/**
 * Loader simple con el logotipo real de ElectroShock
 */
const ModernLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#E5E7EB] to-[#C7CCD1]">
      <div className="flex justify-center">
        <img 
          src="/logotipo_tiny.png" 
          alt="ElectroShock" 
          className="w-48 h-48 animate-pulse"
        />
      </div>
    </div>
  );
};

export default ModernLoader;
