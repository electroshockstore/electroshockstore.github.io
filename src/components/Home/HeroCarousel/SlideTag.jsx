const SlideTag = ({ slide, isVisible, isIOS }) => {
  return (
    <div className={`flex items-center gap-1.5 sm:gap-3 mb-1.5 sm:mb-5 md:mb-6 ${isVisible && !isIOS ? 'animate-fade-in' : ''}`}>
      <div 
        className={`h-[2px] sm:h-[3px] w-6 sm:w-12 bg-gradient-to-r ${slide.gradient} origin-left`}
      />
      <div 
        className={`inline-flex items-center gap-1 sm:gap-2 px-1.5 sm:px-4 py-0.5 sm:py-1.5 bg-gradient-to-r ${slide.gradient} rounded-full shadow-lg`}
      >
        <div className="w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
        <span className="text-white font-black text-[7px] sm:text-xs tracking-[0.2em] sm:tracking-[0.35em] uppercase">
          {slide.tag}
        </span>
      </div>
    </div>
  );
};

export default SlideTag;
