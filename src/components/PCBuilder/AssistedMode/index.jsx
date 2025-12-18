import Header from '../../InventoryApp/Header';

const AssistedMode = ({ onModeChange, onGoHome }) => {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-neutral-50">
      <Header
        searchQuery=""
        onSearchChange={() => {}}
        onGoHome={onGoHome}
      />

      <main className="flex-1 overflow-y-auto">
        {/* HERO */}
        <section className="relative min-h-[calc(100vh-80px)] flex items-center">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop"
              alt="Coding background"
              className="w-full h-full object-cover"
            />
            {/* Neutral overlay */}
            <div className="absolute inset-0 bg-black/45" />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                
                {/* LEFT – Text / Glass panel */}
                <div
                  className="
                    bg-white/10 backdrop-blur-xl
                    border border-white/20
                    rounded-3xl
                    p-8 lg:p-10
                    shadow-2xl
                    text-white
                    space-y-8
                  "
                >
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    <span className="font-medium">En desarrollo</span>
                  </div>

                  {/* Title */}
                  <div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                      Modo Asistido
                    </h1>
                    <span className="block mt-3 text-2xl font-medium text-white/80">
                      Próximamente
                    </span>
                    <p className="mt-6 text-lg text-white/80 leading-relaxed">
                      Estamos construyendo una experiencia guiada que te ayudará
                      paso a paso a armar tu PC ideal, con validaciones automáticas
                      y recomendaciones inteligentes.
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-5">
                    {[
                      {
                        title: 'Recomendaciones inteligentes',
                        desc: 'Componentes sugeridos según tu presupuesto y uso',
                      },
                      {
                        title: 'Compatibilidad verificada',
                        desc: 'Validación automática en cada paso del armado',
                      },
                      {
                        title: 'Experiencia guiada',
                        desc: 'Ideal para usuarios sin experiencia técnica',
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                          <svg
                            className="w-4 h-4 text-blue-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {item.title}
                          </h3>
                          <p className="text-white/70 text-sm">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      onClick={() => onModeChange('manual')}
                      className="
                        bg-white text-gray-900 font-semibold
                        px-8 py-4 rounded-xl
                        hover:bg-white/90
                        transition shadow-lg
                      "
                    >
                      Probar modo manual
                    </button>

                    <button
                      className="
                        bg-white/10 border border-white/30
                        text-white font-semibold
                        px-8 py-4 rounded-xl
                        hover:bg-white/20
                        transition
                      "
                    >
                      Notificarme
                    </button>
                  </div>
                </div>

                {/* RIGHT – Visual */}
                <div className="hidden lg:block">
                  <div className="relative">
                    <div className="bg-gray-900/90 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/10">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-3 h-3 bg-red-500 rounded-full" />
                        <span className="w-3 h-3 bg-yellow-500 rounded-full" />
                        <span className="w-3 h-3 bg-green-500 rounded-full" />
                      </div>
                      <pre className="font-mono text-sm text-gray-300">
{`const buildPC = () => {
  // Validando compatibilidad...
  return optimizedBuild;
};`}
                      </pre>
                    </div>

                    {/* Soft accents */}
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/20 rounded-2xl blur-2xl" />
                    <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/10 rounded-2xl blur-2xl" />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* NEXT STEPS */}
        <section className="bg-white py-16 border-t">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                ¿Qué viene después?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Funcionalidades pensadas para mejorar tu experiencia
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Análisis de rendimiento',
                  desc: 'Estimaciones de FPS y benchmarks según tu build',
                },
                {
                  title: 'Comparador de precios',
                  desc: 'Mejores ofertas actualizadas en tiempo real',
                },
                {
                  title: 'Comunidad de builds',
                  desc: 'Explorá configuraciones creadas por otros usuarios',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="
                    rounded-2xl p-6
                    bg-gray-50
                    border
                    hover:shadow-lg
                    transition
                  "
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AssistedMode;
