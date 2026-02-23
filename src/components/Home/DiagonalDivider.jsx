import { memo } from 'react';

/**
 * Separador simple entre secciones - Solo spacing
 * Minimalista y acorde al proyecto
 */
const DiagonalDivider = memo(() => {
  return (
    <div className="w-full py-4" />
  );
});

DiagonalDivider.displayName = 'DiagonalDivider';

export default DiagonalDivider;
