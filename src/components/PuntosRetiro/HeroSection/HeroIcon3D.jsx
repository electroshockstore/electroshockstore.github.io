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
      <div className="absolute inset-[10%] border-[2px] border-[#0e0e0e] bg-[#f6f6f6] transform rotate-[3deg] shadow-[6px_6px_0_0_#0e0e0e]" />
      <div className="absolute inset-[10%] border border-[#0e0e0e]/20 transform -rotate-[2deg]" />
      
      {/* Icon container */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-6 sm:p-8">
        {!isIOS ? (
          <QuestionMarkIcon />
        ) : (
          <svg
            viewBox="0 0 200 240"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 8px 16px rgba(200,245,25,0.55))' }}
          >
            <defs>
              <linearGradient id="qGradDesktop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c8f519" />
                <stop offset="100%" stopColor="#5c7500" />
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
        className="landing-mono absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-black uppercase tracking-[0.14em] text-[#c8f519] px-3 py-1.5 z-20 border-[2px] border-[#0e0e0e] bg-[#0e0e0e] shadow-[3px_3px_0_0_rgba(14,14,14,0.3)]"
      >
        Retiros personales
      </div>
    </div>
  );
};

export default HeroIcon3D;
