import { useEffect } from 'react';

const PreloadResources = () => {
  useEffect(() => {
    // Preload condicional basado en pathname
    const currentPath = window.location.pathname;
    const criticalImages = [];
    
    // Solo preload en Home
    if (currentPath === '/' || currentPath === '/home') {
      criticalImages.push('/images/hero/megaphone_tiny.webp');
    }

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.type = 'image/webp';
      document.head.appendChild(link);
    });

    const preconnectDomains = [
      'https://www.googletagmanager.com',
      'https://raw.githubusercontent.com'
    ];

    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }, []);

  return null;
};

export default PreloadResources;
