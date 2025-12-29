import { useState } from 'react';
import { usePCBuilder } from '../../../context/PCBuilderContext';

const QuestionFlow = ({ onComplete }) => {
  const { setAssistedAnswer, assistedAnswers } = usePCBuilder();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Budget options
  const budgetOptions = [
    { label: 'Económico', range: { min: 0, max: 500000 }, icon: '💰' },
    { label: 'Medio', range: { min: 500000, max: 1000000 }, icon: '💵' },
    { label: 'Alto', range: { min: 1000000, max: 1500000 }, icon: '💸' },
    { label: 'Premium', range: { min: 1500000, max: 3000000 }, icon: '👑' }
  ];
  
  // Usage options
  const usageOptions = [
    { value: 'Gaming', label: 'Gaming', icon: '🎮', description: 'Juegos de alta calidad' },
    { value: 'Trabajo', label: 'Trabajo', icon: '💼', description: 'Productividad y oficina' },
    { value: 'Multimedia', label: 'Multimedia', icon: '🎬', description: 'Edición de video/foto' },
    { value: 'General', label: 'General', icon: '🏠', description: 'Uso diario y navegación' }
  ];
  
  // Gaming details options
  const resolutionOptions = [
    { value: '1080p', label: '1080p (Full HD)', icon: '📺' },
    { value: '1440p', label: '1440p (2K)', icon: '🖥️' },
    { value: '4K', label: '4K (Ultra HD)', icon: '📽️' }
  ];
  
  const fpsOptions = [
    { value: 60, label: '60 FPS', icon: '⚡' },
    { value: 120, label: '120 FPS', icon: '⚡⚡' },
    { value: 144, label: '144+ FPS', icon: '⚡⚡⚡' }
  ];
  
  const handleBudgetSelect = (budget) => {
    setAssistedAnswer('budget', budget.range);
    setCurrentStep(2);
  };
  
  const handleUsageSelect = (usage) => {
    setAssistedAnswer('usage', usage.value);
    if (usage.value === 'Gaming') {
      setCurrentStep(3);
    } else {
      onComplete();
    }
  };
  
  const handleGamingDetailsSelect = (resolution, fps) => {
    setAssistedAnswer('gamingDetails', { resolution, fps });
    onComplete();
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-600">
            Paso {currentStep} de {assistedAnswers.usage === 'Gaming' ? 3 : 2}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round((currentStep / (assistedAnswers.usage === 'Gaming' ? 3 : 2)) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / (assistedAnswers.usage === 'Gaming' ? 3 : 2)) * 100}%` }}
          />
        </div>
      </div>
      
      {/* Step 1: Budget */}
      {currentStep === 1 && (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              ¿Cuál es tu presupuesto?
            </h2>
            <p className="text-gray-600">
              Selecciona el rango de precio que mejor se ajuste
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {budgetOptions.map((budget) => (
              <button
                key={budget.label}
                onClick={() => handleBudgetSelect(budget)}
                className="text-left bg-gray-50 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-500 rounded-xl p-6 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{budget.icon}</span>
                  <h3 className="text-xl font-bold text-gray-900">{budget.label}</h3>
                </div>
                <p className="text-gray-700 font-semibold">
                  ${budget.range.min.toLocaleString('es-AR')} - ${budget.range.max.toLocaleString('es-AR')}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Step 2: Usage */}
      {currentStep === 2 && (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <button
            onClick={handleBack}
            className="mb-6 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
          >
            ← Volver
          </button>
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              ¿Para qué usarás tu PC?
            </h2>
            <p className="text-gray-600">
              Esto nos ayudará a seleccionar los componentes adecuados
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {usageOptions.map((usage) => (
              <button
                key={usage.value}
                onClick={() => handleUsageSelect(usage)}
                className="text-left bg-gray-50 hover:bg-purple-50 border-2 border-gray-200 hover:border-purple-500 rounded-xl p-6 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{usage.icon}</span>
                  <h3 className="text-xl font-bold text-gray-900">{usage.label}</h3>
                </div>
                <p className="text-gray-600 text-sm">{usage.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Step 3: Gaming Details (conditional) */}
      {currentStep === 3 && (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <button
            onClick={handleBack}
            className="mb-6 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
          >
            ← Volver
          </button>
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Detalles de Gaming
            </h2>
            <p className="text-gray-600">
              Especifica tu resolución y FPS objetivo
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Resolution */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Resolución</h3>
              <div className="grid grid-cols-3 gap-3">
                {resolutionOptions.map((res) => (
                  <button
                    key={res.value}
                    onClick={() => {
                      const currentDetails = assistedAnswers.gamingDetails || {};
                      setAssistedAnswer('gamingDetails', { ...currentDetails, resolution: res.value });
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      assistedAnswers.gamingDetails?.resolution === res.value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 bg-white'
                    }`}
                  >
                    <div className="text-2xl mb-2">{res.icon}</div>
                    <div className="font-semibold text-sm">{res.label}</div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* FPS */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">FPS Objetivo</h3>
              <div className="grid grid-cols-3 gap-3">
                {fpsOptions.map((fps) => (
                  <button
                    key={fps.value}
                    onClick={() => {
                      const currentDetails = assistedAnswers.gamingDetails || {};
                      setAssistedAnswer('gamingDetails', { ...currentDetails, fps: fps.value });
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      assistedAnswers.gamingDetails?.fps === fps.value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 bg-white'
                    }`}
                  >
                    <div className="text-2xl mb-2">{fps.icon}</div>
                    <div className="font-semibold text-sm">{fps.label}</div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Continue Button */}
            {assistedAnswers.gamingDetails?.resolution && assistedAnswers.gamingDetails?.fps && (
              <button
                onClick={() => handleGamingDetailsSelect(
                  assistedAnswers.gamingDetails.resolution,
                  assistedAnswers.gamingDetails.fps
                )}
                className="w-full mt-6 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Generar Recomendación →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionFlow;
