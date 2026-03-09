const SlideDescription = ({ slide, isVisible, isIOS }) => {
  return (
    <div 
      className={`relative inline-block mb-2 sm:mb-10 md:mb-14 lg:mb-16 ${isVisible && !isIOS ? 'animate-fade-in delay-100' : ''}`}
    >
      <p className="text-[11px] sm:text-2xl md:text-3xl lg:text-4xl text-white font-black italic leading-tight relative z-10">
        {slide.description}
      </p>
      <div className={`absolute -bottom-0.5 sm:-bottom-2 left-0 right-0 h-1 sm:h-3 bg-gradient-to-r ${slide.gradient} opacity-40 sm:opacity-50 ${isIOS ? 'blur-sm' : 'blur-sm animate-pulse'}`} />
      <div className={`absolute -bottom-0.5 sm:-bottom-2 left-0 w-full h-[2px] sm:h-[5px] bg-gradient-to-r ${slide.gradient}`} />
    </div>
  );
};

export default SlideDescription;
