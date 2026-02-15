import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Portal Component - Renderiza children en #portal-root (hermano de #root)
 * SIMPLIFICADO: Sin estado mounted para evitar delay de renderizado
 */
const Portal = ({ children }) => {
  const portalRoot = document.getElementById('portal-root');
  
  if (!portalRoot) {
    console.error('[Portal] ❌ portal-root NO ENCONTRADO en el DOM');
    return null;
  }

  return createPortal(children, portalRoot);
};

export default Portal;
