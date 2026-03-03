import { useState, useEffect } from 'react';
import { useIsIOS } from './useDevice';

export const useLightbox = (images = []) => {
  const isIOS = useIsIOS();
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  const open = (index = 0) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goTo = (index) => {
    setCurrentIndex(index);
  };

  // Bloquear scroll cuando lightbox está abierto
  useEffect(() => {
    if (!isOpen) return;

    if (isIOS) {
      setScrollY(window.scrollY);
      setViewportHeight(window.innerHeight);
    }

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isOpen, isIOS]);

  // Actualizar viewport height en resize (solo iOS)
  useEffect(() => {
    if (!isOpen || !isIOS) return;

    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, isIOS]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length]);

  return {
    isOpen,
    currentIndex,
    scrollY,
    viewportHeight,
    isIOS,
    open,
    close,
    next,
    prev,
    goTo,
  };
};
