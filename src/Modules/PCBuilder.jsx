import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePCBuilder } from '../context/PCBuilderContext';
import AssistedMode from '../components/PCBuilder/AssistedMode';
import ManualMode from '../components/PCBuilder/ManualMode';

/**
 * PC Builder - Main orchestrator component
 * Routes between assisted and manual builder modes
 * Access is controlled via navigation state from PCBuilderCard components
 */
const PCBuilder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, setMode } = usePCBuilder();
  
  // Set mode from navigation state on mount, default to manual
  useEffect(() => {
    const initialMode = location.state?.mode || 'manual';
    setMode(initialMode);
  }, [location.state?.mode, setMode]);
  
  const handleGoHome = () => {
    navigate('/');
  };
  
  const handleModeChange = (newMode) => {
    setMode(newMode);
  };
  
  // Render appropriate mode component
  if (mode === 'assisted') {
    return (
      <AssistedMode 
        onModeChange={handleModeChange}
        onGoHome={handleGoHome}
      />
    );
  }
  
  // Default to manual mode
  return (
    <ManualMode 
      onModeChange={handleModeChange}
      onGoHome={handleGoHome}
    />
  );
};

export default PCBuilder;
