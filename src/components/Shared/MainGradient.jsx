import React from 'react';

const MainGradient = ({ 
  children, 
  className = '', 
  variant = 'background',
  border = false,
  hover = false
}) => {
  const baseClasses = 'transition-all duration-300';
  
  const variants = {
    background: 'bg-gradient-to-r from-[#003B99]/20 via-[#7D2FE6]/20 to-[#E82387]/20',
    border: 'border border-[#003B99]/30',
    text: 'bg-gradient-to-r from-[#003B99] via-[#7D2FE6] to-[#E82387] bg-clip-text text-transparent',
    full: 'bg-gradient-to-r from-[#003B99] via-[#7D2FE6] to-[#E82387]',
    light: 'bg-gradient-to-r from-[#003B99]/10 via-[#7D2FE6]/10 to-[#E82387]/10'
  };

  const hoverClasses = hover 
    ? 'hover:from-[#003B99]/30 hover:via-[#7D2FE6]/30 hover:to-[#E82387]/30 hover:border-[#003B99]/50' 
    : '';

  const borderClasses = border 
    ? 'border border-[#003B99]/30' 
    : '';

  return (
    <div className={`${baseClasses} ${variants[variant]} ${borderClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export default MainGradient;