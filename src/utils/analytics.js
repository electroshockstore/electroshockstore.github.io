// ═══════════════════════════════════════════════════════════════
// Google Analytics 4 - Tracking Utilities
// Eventos de e-commerce y personalizados para medir interacción con productos
// ═══════════════════════════════════════════════════════════════

/**
 * Verifica si gtag está disponible
 */
const isGtagAvailable = () => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

/**
 * Formatea un producto al formato de GA4 e-commerce
 */
const formatProductForGA4 = (product, index = 0, listName = 'Product List') => {
  return {
    item_id: product.id?.toString() || 'unknown',
    item_name: product.name || 'Unknown Product',
    item_brand: product.brand || 'Unknown Brand',
    item_category: product.category || 'Uncategorized',
    item_variant: product.model || '',
    price: product.price || 0,
    quantity: 1,
    index: index,
    item_list_name: listName,
    item_list_id: listName.toLowerCase().replace(/\s+/g, '_')
  };
};

/**
 * EVENT 1: View Item List - Cuando se carga una lista de productos
 * Usar en: Store.jsx cuando se muestran productos filtrados
 */
export const trackViewItemList = (products, listName = 'Product List') => {
  if (!isGtagAvailable() || !products || products.length === 0) return;

  try {
    const items = products.slice(0, 10).map((product, index) => 
      formatProductForGA4(product, index, listName)
    );

    window.gtag('event', 'view_item_list', {
      item_list_name: listName,
      item_list_id: listName.toLowerCase().replace(/\s+/g, '_'),
      items: items
    });

    if (import.meta.env.DEV) {
      console.log('📊 GA4: view_item_list', { listName, itemCount: items.length });
    }
  } catch (error) {
    console.error('Error tracking view_item_list:', error);
  }
};

/**
 * EVENT 2: Select Item - Cuando se hace click en un producto del listado
 * Usar en: ProductCard cuando se hace click
 */
export const trackSelectItem = (product, index = 0, listName = 'Product List') => {
  if (!isGtagAvailable() || !product) return;

  try {
    const item = formatProductForGA4(product, index, listName);

    window.gtag('event', 'select_item', {
      item_list_name: listName,
      item_list_id: listName.toLowerCase().replace(/\s+/g, '_'),
      items: [item]
    });

    if (import.meta.env.DEV) {
      console.log('📊 GA4: select_item', { productName: product.name, index });
    }
  } catch (error) {
    console.error('Error tracking select_item:', error);
  }
};

/**
 * EVENT 3: View Item - Cuando se abre el detalle de un producto
 * Usar en: ProductDetail cuando se muestra el modal/página
 */
export const trackViewItem = (product) => {
  if (!isGtagAvailable() || !product) return;

  try {
    const item = formatProductForGA4(product);

    window.gtag('event', 'view_item', {
      currency: 'COP',
      value: product.price || 0,
      items: [item]
    });

    if (import.meta.env.DEV) {
      console.log('📊 GA4: view_item', { productName: product.name, price: product.price });
    }
  } catch (error) {
    console.error('Error tracking view_item:', error);
  }
};

/**
 * EVENT 4: WhatsApp Click - Evento personalizado para clicks en WhatsApp
 * Usar en: Botones de WhatsApp
 */
export const trackWhatsAppClick = (product, actionType = 'consult') => {
  if (!isGtagAvailable() || !product) return;

  try {
    window.gtag('event', 'whatsapp_click', {
      event_category: 'engagement',
      event_label: product.name,
      product_id: product.id?.toString(),
      product_name: product.name,
      product_category: product.category,
      product_price: product.price,
      action_type: actionType, // 'consult', 'buy', 'quote'
      value: product.price || 0
    });

    if (import.meta.env.DEV) {
      console.log('📊 GA4: whatsapp_click', { productName: product.name, actionType });
    }
  } catch (error) {
    console.error('Error tracking whatsapp_click:', error);
  }
};

/**
 * EVENT 5: Add to Cart - Cuando se agrega al carrito o PC Builder
 * Usar en: PC Builder cuando se agrega un componente
 */
export const trackAddToCart = (product, quantity = 1) => {
  if (!isGtagAvailable() || !product) return;

  try {
    const item = formatProductForGA4(product);
    item.quantity = quantity;

    window.gtag('event', 'add_to_cart', {
      currency: 'COP',
      value: (product.price || 0) * quantity,
      items: [item]
    });

    if (import.meta.env.DEV) {
      console.log('📊 GA4: add_to_cart', { productName: product.name, quantity });
    }
  } catch (error) {
    console.error('Error tracking add_to_cart:', error);
  }
};

/**
 * EVENT 6: Begin Checkout - Cuando inicia proceso de compra/consulta
 * Usar en: PC Builder cuando se va a consultar la build completa
 */
export const trackBeginCheckout = (products, totalValue) => {
  if (!isGtagAvailable() || !products || products.length === 0) return;

  try {
    const items = products.map((product, index) => 
      formatProductForGA4(product, index, 'PC Builder')
    );

    window.gtag('event', 'begin_checkout', {
      currency: 'COP',
      value: totalValue || 0,
      items: items
    });

    if (import.meta.env.DEV) {
      console.log('📊 GA4: begin_checkout', { itemCount: items.length, totalValue });
    }
  } catch (error) {
    console.error('Error tracking begin_checkout:', error);
  }
};

/**
 * EVENT 7: Search - Cuando se busca un producto
 * Usar en: Barra de búsqueda si existe
 */
export const trackSearch = (searchTerm, resultsCount = 0) => {
  if (!isGtagAvailable() || !searchTerm) return;

  try {
    window.gtag('event', 'search', {
      search_term: searchTerm,
      results_count: resultsCount
    });

    if (import.meta.env.DEV) {
      console.log('📊 GA4: search', { searchTerm, resultsCount });
    }
  } catch (error) {
    console.error('Error tracking search:', error);
  }
};

/**
 * EVENT 8: View Category - Evento personalizado para filtros de categoría
 * Usar en: CategoryFilter cuando se selecciona una categoría
 */
export const trackViewCategory = (categoryName, productCount = 0) => {
  if (!isGtagAvailable() || !categoryName) return;

  try {
    window.gtag('event', 'view_category', {
      event_category: 'navigation',
      event_label: categoryName,
      category_name: categoryName,
      product_count: productCount
    });

    if (import.meta.env.DEV) {
      console.log('📊 GA4: view_category', { categoryName, productCount });
    }
  } catch (error) {
    console.error('Error tracking view_category:', error);
  }
};

/**
 * EVENT 9: Share Product - Cuando se comparte un producto
 */
export const trackShareProduct = (product, method = 'unknown') => {
  if (!isGtagAvailable() || !product) return;

  try {
    window.gtag('event', 'share', {
      method: method,
      content_type: 'product',
      item_id: product.id?.toString(),
      content_id: product.id?.toString(),
      product_name: product.name
    });

    if (import.meta.env.DEV) {
      console.log('📊 GA4: share', { productName: product.name, method });
    }
  } catch (error) {
    console.error('Error tracking share:', error);
  }
};

/**
 * EVENT 10: PC Builder Interaction - Eventos del PC Builder
 */
export const trackPCBuilderAction = (action, componentCategory = '', productName = '') => {
  if (!isGtagAvailable()) return;

  try {
    window.gtag('event', 'pc_builder_action', {
      event_category: 'pc_builder',
      event_label: action,
      action: action, // 'open', 'add_component', 'remove_component', 'clear_build', 'consult_build'
      component_category: componentCategory,
      product_name: productName
    });

    if (import.meta.env.DEV) {
      console.log('📊 GA4: pc_builder_action', { action, componentCategory });
    }
  } catch (error) {
    console.error('Error tracking pc_builder_action:', error);
  }
};

// Exportar todas las funciones
export default {
  trackViewItemList,
  trackSelectItem,
  trackViewItem,
  trackWhatsAppClick,
  trackAddToCart,
  trackBeginCheckout,
  trackSearch,
  trackViewCategory,
  trackShareProduct,
  trackPCBuilderAction
};
