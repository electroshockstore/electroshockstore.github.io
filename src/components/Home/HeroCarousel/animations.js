export const getAnimationVariants = (isIOS, isVisible) => {
  if (!isVisible) {
    return {
      image: {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        transition: { duration: 0 }
      },
      marker: {
        initial: { opacity: 1, scale: 1 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0 }
      }
    };
  }

  if (isIOS) {
    return {
      image: {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        transition: { duration: 0 }
      },
      marker: {
        initial: { opacity: 1, scale: 1 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0 }
      }
    };
  }
  
  return {
    image: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.6, ease: "easeOut" }
    },
    marker: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }
    }
  };
};
