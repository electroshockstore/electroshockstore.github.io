// ═══════════════════════════════════════════════════════════════
// Custom Hook: useAnalytics
// Hook para facilitar el tracking de eventos de GA4 en componentes React
// ═══════════════════════════════════════════════════════════════

import { useEffect, useRef } from 'react';
import {
  trackViewItemList,
  trackViewItem,
  trackViewCategory
} from '../utils/analytics';

/**
 * Hooks de tracking GA4 con guards anti doble-reporte.
 * (Se eliminó el wrapper genérico `useAnalytics` sin usos.)
 */

/**
 * Hook para trackear vista de producto automáticamente
 * Usar en: ProductDetail modal/page
 */
export const useProductView = (product) => {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (product && !hasTracked.current) {
      trackViewItem(product);
      hasTracked.current = true;
    }

    // Reset cuando cambia el producto
    return () => {
      hasTracked.current = false;
    };
  }, [product?.id]); // Solo re-trackear si cambia el ID del producto
};

/**
 * Hook para trackear vista de lista automáticamente
 * Usar en: Store.jsx cuando cambian los productos mostrados
 */
export const useProductListView = (products, listName = 'Product List') => {
  const hasTracked = useRef(false);
  const lastProductIds = useRef('');

  useEffect(() => {
    if (!products || products.length === 0) return;

    // Crear un hash de los IDs para detectar cambios en la lista
    const currentProductIds = products.map(p => p.id).join(',');

    if (currentProductIds !== lastProductIds.current) {
      trackViewItemList(products, listName);
      lastProductIds.current = currentProductIds;
      hasTracked.current = true;
    }
  }, [products, listName]);
};

/**
 * Hook para trackear cambio de categoría
 * Usar en: CategoryFilter
 */
export const useCategoryTracking = (category, productCount) => {
  const previousCategory = useRef(category);

  useEffect(() => {
    if (category && category !== previousCategory.current && category !== 'Todos') {
      trackViewCategory(category, productCount);
      previousCategory.current = category;
    }
  }, [category, productCount]);
};
