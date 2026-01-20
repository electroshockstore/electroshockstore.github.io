import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { FilterProvider } from "./context/FilterContext";
import { StockProvider } from "./context/StockContext";
import { PCBuilderProvider } from "./context/PCBuilderContext";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorNotification from "./components/ErrorNotification";
import { useErrorHandler } from "./hooks/useErrorHandler";
import SkipToContent from "./components/SEO/SkipToContent";
import ModernLoader from "./components/Shared/ModernLoader";

// Lazy load de páginas principales
const Home = lazy(() => import("./pages/Home"));
const Catalog = lazy(() => import("./pages/Catalog"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const PCBuilder = lazy(() => import("./pages/PCBuilder"));
const PuntosRetiro = lazy(() => import("./pages/PuntosRetiro"));

// Loading component moderno y atractivo
const PageLoader = () => (
  <ModernLoader 
    variant="orbit" 
    message="Cargando" 
    size="lg" 
  />
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes location={location}>
        <Route path="/" element={<div className="page-transition"><Home /></div>} />
        <Route path="/categoria/:categorySlug" element={<div className="page-transition"><Catalog /></div>} />
        <Route path="/categoria/:categorySlug/:productSku" element={<div className="page-transition"><ProductDetailPage /></div>} />
        <Route path="/producto/:id" element={<div className="page-transition"><ProductDetailPage /></div>} />
        <Route path="/armatupc" element={<div className="page-transition"><PCBuilder /></div>} />
        <Route path="/pc-builder" element={<div className="page-transition"><PCBuilder /></div>} />
        <Route path="/puntos-de-retiro" element={<div className="page-transition"><PuntosRetiro /></div>} />
      </Routes>
    </Suspense>
  );
}

function AppContent() {
  const { networkError, resourceError, clearErrors } = useErrorHandler();
  
  const handleReload = () => {
    window.location.reload();
  };

  const currentError = networkError || resourceError;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E5E7EB] to-[#C7CCD1] antialiased">
      {/* Notificación de errores */}
      <ErrorNotification 
        error={currentError}
        onClose={clearErrors}
        onReload={handleReload}
      />
      
      <main id="main-content" className="relative z-10 w-full">
        <AnimatedRoutes />
      </main>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <StockProvider>
        <FilterProvider>
          <PCBuilderProvider>
            <Router basename="/">
              <SkipToContent />
              <AppContent />
            </Router>
          </PCBuilderProvider>
        </FilterProvider>
      </StockProvider>
    </ErrorBoundary>
  );
}

export default App;
