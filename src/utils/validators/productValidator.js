import { ValidationError, DataError } from '../errors/AppError';

/**
 * Validadores para productos
 */

/**
 * Valida que un producto tenga la estructura correcta
 */
export const validateProduct = (product) => {
  if (!product || typeof product !== 'object') {
    throw new ValidationError('El producto debe ser un objeto válido');
  }

  // Campos requeridos
  const requiredFields = ['id', 'name', 'price', 'category'];
  const missingFields = requiredFields.filter(field => !product[field]);

  if (missingFields.length > 0) {
    throw new ValidationError(
      `Faltan campos requeridos: ${missingFields.join(', ')}`,
      missingFields[0]
    );
  }

  // Validar tipos
  if (typeof product.id !== 'number' && typeof product.id !== 'string') {
    throw new ValidationError('El ID del producto debe ser un número o string', 'id');
  }

  if (typeof product.name !== 'string' || product.name.trim().length === 0) {
    throw new ValidationError('El nombre del producto debe ser un string no vacío', 'name');
  }

  if (typeof product.price !== 'number' || product.price < 0) {
    throw new ValidationError('El precio debe ser un número positivo', 'price');
  }

  if (typeof product.category !== 'string' || product.category.trim().length === 0) {
    throw new ValidationError('La categoría debe ser un string no vacío', 'category');
  }

  // Validar imágenes si existen
  if (product.images) {
    if (!Array.isArray(product.images) || product.images.length === 0) {
      throw new ValidationError('Las imágenes deben ser un array no vacío', 'images');
    }
  }

  return true;
};

/**
 * Valida un array de productos
 */
export const validateProducts = (products) => {
  if (!Array.isArray(products)) {
    throw new DataError('Los productos deben ser un array');
  }

  const errors = [];
  
  products.forEach((product, index) => {
    try {
      validateProduct(product);
    } catch (error) {
      errors.push({
        index,
        productId: product?.id,
        error: error.message
      });
    }
  });

  if (errors.length > 0) {
    throw new DataError(
      `Se encontraron ${errors.length} productos inválidos`,
      errors
    );
  }

  return true;
};

/**
 * Sanitiza un producto (limpia datos innecesarios o peligrosos)
 */
export const sanitizeProduct = (product) => {
  return {
    id: product.id,
    name: product.name?.trim(),
    brand: product.brand?.trim() || 'Sin marca',
    model: product.model?.trim() || '',
    price: Number(product.price),
    category: product.category?.trim(),
    images: Array.isArray(product.images) ? product.images : [],
    stock: Number(product.stock) || 0,
    isUsed: Boolean(product.isUsed),
    // Campos opcionales
    ...(product.ddrType && { ddrType: product.ddrType }),
    ...(product.certType && { certType: product.certType }),
    ...(product.description && { description: product.description?.trim() })
  };
};

/**
 * Valida y sanitiza un producto
 */
export const validateAndSanitizeProduct = (product) => {
  validateProduct(product);
  return sanitizeProduct(product);
};

/**
 * Valida y sanitiza un array de productos
 */
export const validateAndSanitizeProducts = (products) => {
  validateProducts(products);
  return products.map(sanitizeProduct);
};
