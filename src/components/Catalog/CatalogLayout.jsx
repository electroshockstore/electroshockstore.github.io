import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import ScrollButton from '../Shared/ScrollButton';
import FloatingChatButton from '../Shared/FloatingChatButton';

const CatalogLayout = ({ children, searchQuery, onSearchChange, onGoHome }) => {
  return (
<div className="min-h-screen w-full relative overflow-hidden">
  {/* Fondo base optimizado */}
  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200" />

  {/* Elementos decorativos OPTIMIZADOS - blur reducido para mejor rendimiento */}
  <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%]
    bg-blue-100/40 blur-[60px] rounded-full" />

  <div className="absolute top-[20%] right-[-5%] w-[35%] h-[35%]
    bg-purple-100/30 blur-[50px] rounded-full" />

  <div className="absolute bottom-[-10%] left-[30%] w-[40%] h-[40%]
    bg-cyan-100/30 blur-[60px] rounded-full" />

  <div className="relative z-10 flex flex-col min-h-screen">
    <Header 
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      onGoHome={onGoHome}
    />

    <main className="flex-1 w-full flex flex-col relative">
      {children}
    </main>

    <Footer />
    <ScrollButton />
    <FloatingChatButton />
  </div>
</div>
  );
};

export default CatalogLayout;
