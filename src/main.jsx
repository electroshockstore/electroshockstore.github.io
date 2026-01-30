import ReactDOM from 'react-dom/client'; 
import App from "./App";
import './Styles/Index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PreloadResources from './components/SEO/PreloadResources';
import { initDeviceDetection } from './utils/deviceDetection';

// Inicializar detección de dispositivo para optimizaciones
initDeviceDetection();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <PreloadResources />
    <App />
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
  </>
);
