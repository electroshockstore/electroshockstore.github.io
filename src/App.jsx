import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Store from "./modules/Store";
import ProductDetailPage from "./Modules/ProductDetailPage";
import PCBuilder from "./Modules/PCBuilder";
import { FilterProvider } from "./context/FilterContext";
import { StockProvider } from "./context/StockContext";
import { PCBuilderProvider } from "./context/PCBuilderContext";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorNotification from "./components/ErrorNotification";
import { useErrorHandler } from "./hooks/useErrorHandler";
import SkipToContent from "./components/SEO/SkipToContent";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

function AnimatedRoutes() {
  const location = useLocation();
  
  // Solo animar transiciones entre páginas diferentes (no entre categorías)
  const getRouteKey = (pathname) => {
    if (pathname.includes('/armatupc')) {
      return 'armatupc';
    }
    if (pathname.includes('/categoria/') && pathname.split('/').length === 4) {
      return 'product-detail'; // Página de detalle de producto
    }
    return 'store'; // Página principal/categorías
  };

  return (
    
    <AnimatePresence mode="wait">
      <Routes location={location} key={getRouteKey(location.pathname)}>
        <Route
          path="/"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Store />
            </motion.div>
          }
        />
        <Route
          path="/armatupc/:mode"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <PCBuilder />
            </motion.div>
          }
        />
        {/* Ruta legacy para compatibilidad */}
        <Route
          path="/pc-builder"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <PCBuilder />
            </motion.div>
          }
        />
        <Route
          path="/categoria/:categorySlug"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Store />
            </motion.div>
          }
        />
        <Route
          path="/categoria/:categorySlug/:productSku"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ProductDetailPage />
            </motion.div>
          }
        />
        {/* Ruta legacy para compatibilidad */}
        <Route
          path="/producto/:id"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ProductDetailPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
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
