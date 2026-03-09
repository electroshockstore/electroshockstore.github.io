import { motion } from 'framer-motion';

const SlideTitle = ({ slide, animationVariants, isVisible, isIOS }) => {
  return (
    <h1 className={`text-[52px] sm:text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black leading-[0.8] sm:leading-[0.8] tracking-[-0.03em] mb-2 sm:mb-6 md:mb-8 lg:mb-12 ${isVisible && !isIOS ? 'animate-fade-in' : ''}`}>
      {slide.title.split(' ').map((word, idx) => (
        <span
          key={`word-${idx}`}
          className="inline-block mr-1.5 sm:mr-4 md:mr-6 text-white"
          style={{
            textShadow: '2px 2px 0px rgba(0,0,0,0.9), 4px 4px 0px rgba(0,0,0,0.5)',
            WebkitTextStroke: '0.5px rgba(255,255,255,0.1)'
          }}
        >
          {word}
        </span>
      ))}
      
      <motion.span 
        className="inline-block relative"
        {...animationVariants.marker}
        style={isVisible && !isIOS ? { willChange: 'opacity, transform' } : {}}
      >
        <span className={`absolute inset-0 ${slide.highlightColor} -skew-x-6 rotate-[-2deg] opacity-95 translate-x-1 translate-y-1`} />
        <span className={`absolute inset-0 ${slide.highlightColor} -skew-x-6 rotate-[-1deg] opacity-90`} />
        
        <span 
          className="relative text-black px-2 sm:px-5 md:px-8 inline-block font-black uppercase"
          style={{
            textShadow: '1px 1px 0px rgba(0,0,0,0.3)',
            letterSpacing: '-0.02em'
          }}
        >
          {slide.titleHighlight}
        </span>
        
        <span className={`hidden sm:block absolute inset-0 ${slide.highlightColor} ${isIOS ? 'blur-xl' : 'blur-2xl'} opacity-60 ${isIOS ? '' : 'animate-pulse'}`} />
      </motion.span>
    </h1>
  );
};

export default SlideTitle;
