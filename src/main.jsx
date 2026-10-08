import ReactDOM from 'react-dom/client';
import { lazy, Suspense } from 'react';
import App from "./App";
import './Styles/Index.css';
import 'react-toastify/dist/ReactToastify.css';
import PreloadResources from './components/SEO/PreloadResources';
import { initDeviceDetection } from './utils/deviceDetection';

// Toast fuera del critical path: solo se monta al primer uso
const ToastContainer = lazy(() =>
  import('react-toastify').then((m) => ({ default: m.ToastContainer }))
);

// Inicializar detección de dispositivo para optimizaciones
initDeviceDetection();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <PreloadResources />
    <App />
    <Suspense fallback={null}>
      <ToastContainer
      position="top-center"
      theme="light"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      limit={3}
      className="!w-auto !max-w-md"
      />
    </Suspense>
  </>
);
