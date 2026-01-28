import ReactDOM from 'react-dom/client'; 
import App from "./App";
import './Styles/Index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PreloadResources from './components/SEO/PreloadResources';

// Detectar iOS y agregar clase al body para optimizaciones específicas
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isIOS) {
  document.body.classList.add('is-ios');
}
if (isMobile) {
  document.body.classList.add('is-mobile');
}

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
