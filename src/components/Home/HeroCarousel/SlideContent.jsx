import SlideTag from './SlideTag';
import SlideTitle from './SlideTitle';
import SlideDescription from './SlideDescription';
import SlidePoints from './SlidePoints';

const SlideContent = ({ slide, animationVariants, isVisible, isIOS }) => {
  return (
    <div>
      <SlideTag slide={slide} isVisible={isVisible} isIOS={isIOS} />
      <SlideTitle slide={slide} animationVariants={animationVariants} isVisible={isVisible} isIOS={isIOS} />
      <SlideDescription slide={slide} isVisible={isVisible} isIOS={isIOS} />
      <SlidePoints slide={slide} isVisible={isVisible} isIOS={isIOS} />
    </div>
  );
};

export default SlideContent;
