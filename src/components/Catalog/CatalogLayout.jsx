import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import ScrollButton from '../Shared/ScrollButton';

const CatalogLayout = ({ children, searchQuery, onSearchChange, onGoHome }) => {
  return (
    //BG component
    <div className="min-h-screen w-full catalog-bg overflow-hidden relative">
      {/* ─── Grid pattern overlay ─── */}
      <div className="bg-grid-pattern absolute inset-0 opacity-10 pointer-events-none" />

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
      </div>
    </div>
  );
};

export default CatalogLayout;
