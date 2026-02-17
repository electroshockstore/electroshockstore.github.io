import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FilterProvider } from "./context/FilterContext";
import { PCBuilderProvider } from "./context/PCBuilderContext";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorNotification from "./components/ErrorNotification";
import { useErrorHandler } from "./hooks/useErrorHandler";
import SkipToContent from "./components/SEO/SkipToContent";
import ModernLoader from "./components/Shared/ModernLoader";
import ScrollToTop from "./components/Shared/ScrollToTop";
import FloatingChatButton from "./components/Shared/FloatingChatButton";
import useIOSDetection from "./hooks/useIOSDetection";
import { usePerformanceOptimization } from "./hooks/usePerformanceOptimization";

// Lazy load de páginas principales
const Home = lazy(() => import("./pages/Home"));
const Catalog = lazy(() => import("./pages/Catalog"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const PCBuilder = lazy(() => import("./pages/PCBuilder"));
const PuntosRetiro = lazy(() => import("./pages/PuntosRetiro"));

// Loading component simple con logo real
const PageLoader = () => <ModernLoader />;

function AnimatedRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categoria/:categorySlug" element={<Catalog />} />
        <Route path="/categoria/:categorySlug/:productSku" element={<ProductDetailPage />} />
        <Route path="/producto/:id" element={<ProductDetailPage />} />
        <Route path="/armatupc" element={<PCBuilder />} />
        <Route path="/pc-builder" element={<PCBuilder />} />
        <Route path="/puntos-de-retiro" element={<PuntosRetiro />} />
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
    <div className="min-h-screen bg-gradient-to-b from-[#E5E7EB] to-[#C7CCD1] antialiased" style={{ isolation: 'isolate' }}>
      {/* Notificación de errores */}
      <ErrorNotification 
        error={currentError}
        onClose={clearErrors}
        onReload={handleReload}
      />
      
      <main id="main-content" className="relative z-10 w-full page-transition">
        <AnimatedRoutes />
      </main>

      {/* Botón flotante de WhatsApp - Nivel más alto para evitar problemas de z-index */}
      <FloatingChatButton />
    </div>
  );
}

function App() {
  // Detectar iOS y aplicar estilos específicos
  useIOSDetection();
  
  // Detectar performance del dispositivo y optimizar automáticamente
  usePerformanceOptimization();
  
  return (
    <ErrorBoundary>
      <FilterProvider>
        <PCBuilderProvider>
          <Router basename="/">
            <ScrollToTop />
            <SkipToContent />
            <AppContent />
          </Router>
        </PCBuilderProvider>
      </FilterProvider>
    </ErrorBoundary>
  );
}

export default App;
