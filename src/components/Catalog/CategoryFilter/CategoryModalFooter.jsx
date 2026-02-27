const CategoryModalFooter = () => {
  return (
    <div 
      className="flex-shrink-0 px-4 py-4 border-t relative overflow-hidden"
      style={{
        background: 'linear-gradient(to top, rgb(17, 24, 39), rgb(31, 41, 55), rgb(17, 24, 39))',
        borderColor: 'rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Glow decorativo inferior */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none"
        style={{ filter: 'blur(32px)' }}
      />
      
      <div className="flex items-center justify-center gap-3 text-sm text-gray-300 relative z-10">
        <div className="w-10 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full" />
        <span className="font-bold">Selecciona una categoría</span>
        <div className="w-10 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full" />
      </div>
    </div>
  );
};

export default CategoryModalFooter;
