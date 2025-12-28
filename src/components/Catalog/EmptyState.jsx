const EmptyState = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-12 shadow-2xl border border-gray-700/50 max-w-md">
        <div className="bg-blue-500/20 backdrop-blur-sm p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">No hay productos disponibles</h3>
        <p className="text-gray-400 mb-6">No encontramos productos que coincidan con los filtros seleccionados.</p>
        <button
          onClick={onReset}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg"
        >
          Ver todas las categorías
        </button>
      </div>
    </div>
  );
};

export default EmptyState;
