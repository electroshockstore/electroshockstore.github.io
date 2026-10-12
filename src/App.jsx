import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
} from "./components/Shared/Skeleton";
import ScrollToTop from "./components/Shared/ScrollToTop";
import FloatingChatButton from "./components/Shared/FloatingChatButton";
import ScrollButton from "./components/Shared/ScrollButton";
import useIOSDetection from "./hooks/useIOSDetection";
import { usePerformanceOptimization } from "./hooks/usePerformanceOptimization";

// Home es la ruta inicial: import eager para pintar de inmediato sin
// fallback de Suspense (el flash del skeleton en cada carga venía de acá).
import Home from "./pages/Home";

// Lazy load del resto de páginas (no críticas en el primer paint)
const Catalog = lazy(() => import("./pages/Catalog"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const PCBuilder = lazy(() => import("./pages/PCBuilder"));
const PuntosRetiro = lazy(() => import("./pages/PuntosRetiro"));

// Loading component simple con logo real (rutas sin skeleton dedicado)
const PageLoader = () => <ModernLoader />;

// El fallback de Suspense se muestra incluso cuando el chunk carga en
// milisegundos (o ya está en caché) y produce un flash del skeleton.
// Se retrasa su aparición: solo pinta si la carga tarda más del delay.
const DelayedFallback = ({ fallback, delay = 250 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) return null;
  return fallback;
};

// Suspense por ruta: cada chunk lazy muestra un skeleton con la forma
// de su contenido en lugar de un spinner genérico.
// "/" no usa Suspense: Home es eager y pinta sin flash inicial.
function AnimatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categoria/:categorySlug" element={<Suspense fallback={<DelayedFallback fallback={<CatalogSkeleton />} />}><Catalog /></Suspense>} />
      <Route path="/buscar" element={<Suspense fallback={<DelayedFallback fallback={<CatalogSkeleton />} />}><Catalog /></Suspense>} />
      <Route path="/categoria/:categorySlug/:productSku" element={<Suspense fallback={<DelayedFallback fallback={<ProductDetailSkeleton />} />}><ProductDetailPage /></Suspense>} />
      <Route path="/producto/:id" element={<Suspense fallback={<DelayedFallback fallback={<ProductDetailSkeleton />} />}><ProductDetailPage /></Suspense>} />
      <Route path="/armatupc" element={<Suspense fallback={<DelayedFallback fallback={<PageLoader />} />}><PCBuilder /></Suspense>} />
      {/* /pc-builder es un alias legacy: canónico /armatupc (SEO, sin duplicar) */}
      <Route path="/pc-builder" element={<Navigate to="/armatupc" replace />} />
      <Route path="/puntos-de-retiro" element={<Suspense fallback={<DelayedFallback fallback={<PageLoader />} />}><PuntosRetiro /></Suspense>} />
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
