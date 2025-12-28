import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import ScrollButton from '../Shared/ScrollButton';
import FloatingChatButton from '../Shared/FloatingChatButton';

const CatalogLayout = ({ children, searchQuery, onSearchChange, onGoHome }) => {
  return (
    <div className="min-h-screen w-full flex flex-col relative bg-gradient-to-b from-[#E5E7EB] to-[#C7CCD1]">
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
  );
};

export default CatalogLayout;
