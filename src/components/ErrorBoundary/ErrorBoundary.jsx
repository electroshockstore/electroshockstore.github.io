import { Component } from 'react';
import { errorLogger } from '../../utils/errors/errorHandler';
import ErrorFallback from './ErrorFallback';

/**
 * Error Boundary - Captura errores de renderizado en React
 * Previene que toda la app se rompa por un error en un componente
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    // Actualizar estado para mostrar UI de fallback
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log del error
    errorLogger.log(error, {
      componentStack: errorInfo.componentStack,
      boundary: this.props.name || 'ErrorBoundary',
      errorCount: this.state.errorCount + 1
    });

    // Actualizar estado con información adicional
    this.setState(prevState => ({
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));

    // Callback opcional
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });

    // Callback opcional de reset
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      // Usar fallback personalizado si se proporciona
      if (this.props.fallback) {
        return this.props.fallback({
          error: this.state.error,
          errorInfo: this.state.errorInfo,
          resetError: this.handleReset
        });
      }

      // Fallback por defecto
      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          resetError={this.handleReset}
          errorCount={this.state.errorCount}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
