import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import ScrollButton from '../Shared/ScrollButton';
import FloatingChatButton from '../Shared/FloatingChatButton';

const CatalogLayout = ({ children, searchQuery, onSearchChange, onGoHome }) => {
  return (
<div className="min-h-screen w-full relative overflow-hidden">
  <div className="absolute inset-0 bg-[#E5E7EB]" />

  <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%]
    bg-[#EEF2F7] blur-[120px]" />

  <div className="absolute top-[10%] right-[-15%] w-[50%] h-[50%]
    bg-[#DCE4EC] blur-[140px]" />

  <div className="absolute bottom-[-30%] left-[20%] w-[70%] h-[70%]
    bg-[#C7CCD1] blur-[160px]" />

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
