import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import ScrollButton from '../Shared/ScrollButton';
import FloatingChatButton from '../Shared/FloatingChatButton';

const CatalogLayout = ({ children, searchQuery, onSearchChange, onGoHome }) => {
  return (
<div className="min-h-screen w-full relative overflow-hidden">
  {/* Fondo base con más color */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />

  {/* Elementos decorativos con más intensidad */}
  <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%]
    bg-blue-200/50 blur-[80px] rounded-full" />

  <div className="absolute top-[20%] right-[-5%] w-[35%] h-[35%]
    bg-purple-200/40 blur-[70px] rounded-full" />

  <div className="absolute bottom-[-10%] left-[30%] w-[40%] h-[40%]
    bg-cyan-200/40 blur-[80px] rounded-full" />

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
