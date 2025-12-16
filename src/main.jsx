import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { NextUIProvider } from '@nextui-org/react';
import App from "./App";
import './Styles/Index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PreloadResources from './components/SEO/PreloadResources';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NextUIProvider>
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
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ width: '500px', height: '500px', padding: '4px' }}
        />
    </NextUIProvider>
  </React.StrictMode>
);
