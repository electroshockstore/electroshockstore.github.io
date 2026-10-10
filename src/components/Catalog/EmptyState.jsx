import OffsetGlowCTA from '../Shared/OffsetGlowCTA';

const EmptyState = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 empty-state">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-12 shadow-2xl border border-gray-700/50 max-w-md">
        <div className="bg-blue-500/20 backdrop-blur-sm p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-gray-300">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          Sin resultados
        </span>
        <h3
          className="mb-3 font-black uppercase leading-[0.9] tracking-tight text-white text-[clamp(1.6rem,5vw,2.2rem)]"
          style={{ fontFamily: "'Bebas Neue','Arial Black',sans-serif" }}
        >
          Nada por aquí{' '}
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            todavía
          </span>
        </h3>
        <p className="text-gray-400 mb-6">No encontramos productos que coincidan con los filtros seleccionados.</p>
        <OffsetGlowCTA
          label="Ver todas las categorías"
          onClick={onReset}
          className="text-sm"
        />
      </div>
    </div>
  );
};

export default EmptyState;
