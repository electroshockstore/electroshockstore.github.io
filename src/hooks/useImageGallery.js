import { useState } from 'react';

export const useImageGallery = (images = []) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const hasMultiple = images.length > 1;
  const currentImage = images[currentIndex] || images[0];

  const next = () => {
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goTo = (index) => {
    setImageLoaded(false);
    setCurrentIndex(index);
  };

  const onLoad = () => {
    setImageLoaded(true);
  };

  return {
    currentIndex,
    currentImage,
    imageLoaded,
    hasMultiple,
    next,
    prev,
    goTo,
    onLoad,
  };
};
