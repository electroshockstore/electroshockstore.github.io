/**
 * Componente de accesibilidad: Skip to main content
 * Mejora la navegación por teclado y accesibilidad
 */
const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] 
                 focus:px-6 focus:py-3 focus:bg-blue-600 focus:text-white focus:rounded-lg 
                 focus:font-bold focus:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-400"
    >
      Saltar al contenido principal
    </a>
  );
};

export default SkipToContent;
