import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FilterProvider } from "./context/FilterContext";
import { PCBuilderProvider } from "./context/PCBuilderContext";
import { ScrollProvider, ScrollRestoration } from "./context/ScrollContext";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorNotification from "./components/ErrorNotification";
import { useErrorHandler } from "./hooks/useErrorHandler";
import SkipToContent from "./components/SEO/SkipToContent";
import ModernLoader from "./components/Shared/ModernLoader";
import {
  CatalogSkeleton,
  ProductDetailSkeleton,
  HomeSkeleton,
} from "./components/Shared/Skeleton";
import ScrollToTop from "./components/Shared/ScrollToTop";
import FloatingChatButton from "./components/Shared/FloatingChatButton";
import ScrollButton from "./components/Shared/ScrollButton";
import useIOSDetection from "./hooks/useIOSDetection";
import { usePerformanceOptimization } from "./hooks/usePerformanceOptimization";

// Lazy load de páginas principales
const Home = lazy(() => import("./pages/Home"));
const Catalog = lazy(() => import("./pages/Catalog"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const PCBuilder = lazy(() => import("./pages/PCBuilder"));
const PuntosRetiro = lazy(() => import("./pages/PuntosRetiro"));

// Loading component simple con logo real (rutas sin skeleton dedicado)
const PageLoader = () => <ModernLoader />;

// Suspense por ruta: cada chunk lazy muestra un skeleton con la forma
// de su contenido en lugar de un spinner genérico.
function AnimatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Suspense fallback={<HomeSkeleton />}><Home /></Suspense>} />
      <Route path="/categoria/:categorySlug" element={<Suspense fallback={<CatalogSkeleton />}><Catalog /></Suspense>} />
      <Route path="/buscar" element={<Suspense fallback={<CatalogSkeleton />}><Catalog /></Suspense>} />
      <Route path="/categoria/:categorySlug/:productSku" element={<Suspense fallback={<ProductDetailSkeleton />}><ProductDetailPage /></Suspense>} />
      <Route path="/producto/:id" element={<Suspense fallback={<ProductDetailSkeleton />}><ProductDetailPage /></Suspense>} />
      <Route path="/armatupc" element={<Suspense fallback={<PageLoader />}><PCBuilder /></Suspense>} />
      <Route path="/pc-builder" element={<Suspense fallback={<PageLoader />}><PCBuilder /></Suspense>} />
      <Route path="/puntos-de-retiro" element={<Suspense fallback={<PageLoader />}><PuntosRetiro /></Suspense>} />
    </Routes>
  );
}

function AppContent() {
  const { networkError, resourceError, clearErrors } = useErrorHandler();
  
  const handleReload = () => {
    window.location.reload();
  };

  const currentError = networkError || resourceError;

  return (
    <div className="app-shell bg-gradient-to-b from-[#E5E7EB] to-[#C7CCD1] antialiased">
      {/* ─── Global Animated Background (fijo, no scrollea) ─── */}
      <div className="animated-bg-container">
        {/* Animated mesh blobs */}
        <div className="mesh-blob mesh-blob-orange -top-32 -left-32 w-[600px] h-[600px] opacity-40" />
        <div className="mesh-blob mesh-blob-red -bottom-32 -right-32 w-[700px] h-[700px] opacity-35" />
        
        {/* Grid pattern overlay */}
        <div className="bg-grid-pattern absolute inset-0 opacity-10" />
        
        {/* Diagonal accent lines */}
        <div className="accent-line-vertical accent-line-amber right-0 opacity-20 hidden lg:block" />
        <div className="accent-line-vertical accent-line-amber left-1/3 opacity-15 hidden lg:block" />
      </div>

      {/* ─── Scroll container de la app (único scroll) ─── */}
      <ScrollProvider>
        {/* Notificación de errores */}
        <ErrorNotification 
          error={currentError}
          onClose={clearErrors}
          onReload={handleReload}
        />
        
        <main id="main-content" className="relative z-10 w-full page-transition">
          <AnimatedRoutes />
        </main>
      </ScrollProvider>

      {/* Botones flotantes globales - Nivel más alto para evitar problemas de z-index */}
      <FloatingChatButton />
      <ScrollButton />
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
            <ScrollRestoration />
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
