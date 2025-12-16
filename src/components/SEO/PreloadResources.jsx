import { useEffect } from 'react';

const PreloadResources = () => {
  useEffect(() => {
    const criticalImages = [
      '/logotipo.png',
      '/images/hero/hero1.webp',
      '/images/hero/hero2.webp'
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
