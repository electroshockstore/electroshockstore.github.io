import { useState } from 'react';

const QuestionMarkIcon = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePos({ x, y });
  };

  const rotateY = mousePos.x * 20;
  const rotateX = -mousePos.y * 15;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
      className="hero-icon-3d"
      style={{
        transform: `perspective(800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${isHovered ? 1.08 : 1})`,
      }}
    >
      {/* Orbit rings */}
      <div className="hero-icon-orbit hero-icon-orbit-1" />
      <div className="hero-icon-orbit hero-icon-orbit-2" />

      <svg
        viewBox="0 0 200 240"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 12px 40px rgba(59,130,246,0.7)) drop-shadow(0 0 60px rgba(139,92,246,0.4))' }}
      >
        <defs>
          <linearGradient id="qGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="40%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="qGradSide" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
        
        {/* 3D depth layers */}
        <ellipse cx="102" cy="208" rx="17" ry="15" fill="url(#qGradSide)" />
        <path
          d="M 68 74 Q 64 42 100 30 Q 148 16 152 54 Q 158 84 132 98 Q 118 108 112 122 L 108 148"
          fill="none"
          stroke="#1e3a8a"
          strokeWidth="30"
          strokeLinecap="round"
          transform="translate(4, 5)"
        />
        
        {/* Main question mark */}
        <path
          d="M 68 74 Q 64 42 100 30 Q 148 16 152 54 Q 158 84 132 98 Q 118 108 112 122 L 108 148"
          fill="none"
          stroke="url(#qGrad)"
          strokeWidth="30"
          strokeLinecap="round"
        />
        
        {/* Highlight */}
        <path
          d="M 72 72 Q 70 48 100 36 Q 140 24 146 54"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        
        {/* Dot */}
        <ellipse cx="100" cy="196" rx="17" ry="16" fill="url(#qGrad)" />
        <ellipse cx="95" cy="190" rx="7" ry="5" fill="rgba(255,255,255,0.4)" />
        
        {/* Specular highlight */}
        <circle cx="88" cy="56" r="6" fill="rgba(255,255,255,0.5)" />
      </svg>

      {/* Floating particles */}
      <div className="hero-icon-particle hero-icon-particle-1" />
      <div className="hero-icon-particle hero-icon-particle-2" />
      <div className="hero-icon-particle hero-icon-particle-3" />
      <div className="hero-icon-particle hero-icon-particle-4" />
    </div>
  );
};

export default QuestionMarkIcon;
