import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Portal Component - Renderiza children en #portal-root (hermano de #root)
 * SIMPLIFICADO: Sin estado mounted para evitar delay de renderizado
 */
const Portal = ({ children }) => {
  console.log('[Portal] Renderizando, children:', children);
  
  const portalRoot = document.getElementById('portal-root');
  
  if (!portalRoot) {
    console.error('[Portal] ❌ portal-root NO ENCONTRADO en el DOM');
    return null;
  }

  console.log('[Portal] ✅ Creando portal en portal-root');
  return createPortal(children, portalRoot);
};

export default Portal;
