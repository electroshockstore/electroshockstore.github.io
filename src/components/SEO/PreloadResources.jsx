import { useEffect } from 'react';

const PreloadResources = () => {
  useEffect(() => {
    // Precargar solo imágenes críticas que existen y son optimizadas
    const criticalImages = [
      '/images/builder_tiny.webp',
      '/images/hero/megaphone_tiny.webp',
      '/images/hero/stop_tiny.webp',
      '/images/hero/methods_tiny.webp',
      '/images/hero/atenttion_tiny.webp',
      '/images/hero/location_tiny.webp'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    const preconnectDomains = [
      'https://www.googletagmanager.com',
      'https://embed.tawk.to'
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
