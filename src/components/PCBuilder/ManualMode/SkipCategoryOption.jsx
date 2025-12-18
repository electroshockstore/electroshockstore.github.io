const SkipCategoryOption = ({ category, onSkip }) => {
  return (
    <button
      onClick={onSkip}
      className="w-full p-4 rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-white hover:border-blue-400 hover:bg-blue-50 transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-gray-200 group-hover:border-blue-400 transition-colors">
          <svg className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1 text-left">
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            Ya poseo este componente
          </h3>
          <p className="text-sm text-gray-600">
            Omitir {category} - Ya tengo uno
          </p>
        </div>
        <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
};

export default SkipCategoryOption;
