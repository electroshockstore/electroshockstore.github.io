import { useViewTransition } from '../../hooks/useViewTransition';

/**
 * Wrapper para aplicar View Transitions a cambios de estado
 * Útil para filtros, modales, y otros cambios de UI
 */
export const ViewTransitionWrapper = ({ children, onUpdate, transitionName }) => {
  const { startTransition } = useViewTransition();

  const handleUpdate = (...args) => {
    startTransition(() => {
      onUpdate?.(...args);
    });
  };

  return children({ handleUpdate });
};

/**
 * HOC para agregar View Transitions a cualquier componente
 */
export const withViewTransition = (Component) => {
  return (props) => {
    const { startTransition } = useViewTransition();
    return <Component {...props} startTransition={startTransition} />;
  };
};

export default ViewTransitionWrapper;
