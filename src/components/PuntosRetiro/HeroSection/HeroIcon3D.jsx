import useIOSDetection from '../../../hooks/useIOSDetection';
import QuestionMarkIcon from './QuestionMarkIcon';

const HeroIcon3D = () => {
  const isIOS = useIOSDetection();

  return (
    <div className="hidden lg:block flex-shrink-0 relative lg:order-2" style={{ 
      width: 'clamp(240px, 22vw, 360px)', 
      height: 'clamp(300px, 28vw, 450px)' 
    }}>
      {/* Background layers */}
      <div className="hero-icon-bg-1 absolute inset-[10%] border transform rotate-[3deg]" />
      <div className="hero-icon-bg-2 absolute inset-[10%] border transform -rotate-[2deg]" />
      
      {/* Icon container */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-6 sm:p-8">
        {!isIOS ? (
          <QuestionMarkIcon />
        ) : (
          <svg
            viewBox="0 0 200 240"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 8px 16px rgba(59,130,246,0.5))' }}
          >
            <defs>
              <linearGradient id="qGradDesktop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
            <path
              d="M 68 74 Q 64 42 100 30 Q 148 16 152 54 Q 158 84 132 98 Q 118 108 112 122 L 108 148"
              fill="none"
              stroke="url(#qGradDesktop)"
              strokeWidth="30"
              strokeLinecap="round"
            />
            <ellipse cx="100" cy="196" rx="17" ry="16" fill="url(#qGradDesktop)" />
          </svg>
        )}
      </div>

      {/* Label */}
      <div 
        className="hero-icon-label absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-black uppercase tracking-widest text-blue-300 px-3 py-1 z-20 border border-blue-500/30 bg-black/90"
        style={{
          clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)'
        }}
      >
        RETIROS PERSONALES
      </div>
    </div>
  );
};

export default HeroIcon3D;
