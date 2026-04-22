import { useState, useEffect } from 'react';
import { flashSaleConfig } from '../data/flashSaleConfig';

// Importar todas las categorías
import mouseData from '../data/categories/mouse.json';
import tecladosData from '../data/categories/teclados.json';
import auricularesData from '../data/categories/auriculares.json';
import monitoresData from '../data/categories/monitores.json';
import almacenamientoData from '../data/categories/almacenamiento.json';
import procesadoresData from '../data/categories/procesadores.json';
import motherboardsData from '../data/categories/motherboards.json';
import memoriasData from '../data/categories/memorias.json';
import placasVideoData from '../data/categories/placas_video.json';
import fuentesData from '../data/categories/fuentes.json';
import refrigeracionData from '../data/categories/refrigeracion.json';
import conectividadData from '../data/categories/conectividad.json';
import joystickData from '../data/categories/joystick.json';

/**
 * Hook para obtener productos de la oferta flash
 * Busca los productos por ID en todas las categorías y aplica descuentos y stock individuales
 */
export const useFlashSaleProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = () => {
      // Combinar todos los productos de todas las categorías
      const allProducts = [
        ...mouseData.products,
        ...tecladosData.products,
        ...auricularesData.products,
        ...monitoresData.products,
        ...almacenamientoData.products,
        ...procesadoresData.products,
        ...motherboardsData.products,
        ...memoriasData.products,
        ...placasVideoData.products,
        ...fuentesData.products,
        ...refrigeracionData.products,
        ...conectividadData.products,
        ...joystickData.products
      ];

      // Mapear productos con sus descuentos individuales y stock de la config
      const flashProducts = flashSaleConfig.products
        .map(({ id, discountPercentage, stock }) => {
          const product = allProducts.find(p => p.id === id);
          if (!product) return null;
          
          // Agregar el descuento individual y stock de la configuración al producto
          return {
            ...product,
            discountPercentage,
            stock // El stock de la config sobrescribe el del catálogo
          };
        })
        .filter(Boolean); // Remover undefined si algún ID no existe

      setProducts(flashProducts);
      setIsLoading(false);
    };

    loadProducts();
  }, []);

  return { products, isLoading, config: flashSaleConfig };
};
