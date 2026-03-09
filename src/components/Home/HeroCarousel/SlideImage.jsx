import { motion } from 'framer-motion';

const SlideImage = ({ slide, animationVariants, isVisible, isIOS, isFirstSlide }) => {
  return (
    <motion.div
      key={`hero-image-${slide.id}`}
      {...animationVariants.image}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      className="absolute inset-0 aspect-square md:aspect-video"
      style={{ 
        willChange: isVisible && !isIOS ? 'opacity' : 'auto',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        perspective: 1000,
        WebkitPerspective: 1000
      }}
    >
      <img 
        src={slide.image} 
        className="w-full h-full object-cover brightness-[0.8] sm:brightness-100" 
        alt=""
        loading={isFirstSlide ? "eager" : "lazy"}
        decoding="async"
        fetchpriority={isFirstSlide ? "high" : "low"}
        width="1920"
        height="1080"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/70 md:via-[#020617]/50 to-transparent" />
    </motion.div>
  );
};

export default SlideImage;
