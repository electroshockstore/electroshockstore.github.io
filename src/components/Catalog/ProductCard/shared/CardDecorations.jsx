import { memo } from 'react';

const CardDecorations = memo(() => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {/* Círculo superior derecha - Azul */}
      <div className="absolute -top-10 -right-10 w-30 h-30 bg-gradient-to-br from-blue-400/30 to-cyan-400/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
      
      {/* Círculo inferior izquierda - Púrpura */}
      <div className="absolute -bottom-20 -left-10 w-32 h-30 bg-gradient-to-tr from-purple-400/30 to-pink-400/20 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
      
      {/* Forma geométrica angular - Naranja */}
      <div className="absolute top-0 left-0 w-10 h-10 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-400 to-transparent" 
          style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} 
        />
      </div>
    </div>
  );
});

CardDecorations.displayName = 'CardDecorations';
export default CardDecorations;
