import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Store from "./modules/Store";
import ProductDetailPage from "./modules/ProductDetailPage";
import { FilterProvider } from "./context/FilterContext";
import { StockProvider } from "./context/StockContext";

function App() {
  return (
    <StockProvider>
      <FilterProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-b from-[#E5E7EB] to-[#C7CCD1] antialiased">
            <main className="relative z-10 w-full">
              <Routes>
                <Route path="/" element={<Store />} />
                <Route path="/producto/:id" element={<ProductDetailPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </FilterProvider>
    </StockProvider>
  );
}

export default App;
