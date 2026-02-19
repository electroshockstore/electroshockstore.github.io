import { useState, useEffect } from 'react';
import { fetchJSON } from '../utils/api/fetchWithRetry';
import { handleError } from '../utils/errors/errorHandler';
import { DataError } from '../utils/errors/AppError';

/**
 * Hook para obtener el histórico de precios de un producto
 * @param {number|string} productId - ID del producto
 * @returns {Object} { history, loading, error }
 */
export function usePriceHistory(productId) {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function fetchHistory() {
      try {
        setLoading(true);
        setError(null);

        // Fetch con retry y timeout
        const data = await fetchJSON('/data/price-history.json', {}, {
          retries: 2,
          timeout: 8000
        });

        if (!data || typeof data !== 'object') {
          throw new DataError('Formato de datos inválido');
        }

        const productHistory = data[String(productId)];

        if (isMounted) {
          if (productHistory && productHistory.h && Array.isArray(productHistory.h)) {
            // Validar estructura de datos
            if (!productHistory.name) {
              throw new DataError('Falta el nombre del producto en el histórico');
            }

            // Transformar datos para el gráfico
            const formattedHistory = productHistory.h.map(([timestamp, price]) => {
              if (!timestamp || typeof price !== 'number') {
                throw new DataError('Datos de histórico inválidos');
              }

              return {
                date: new Date(timestamp),
                price: price,
                formattedDate: new Date(timestamp).toLocaleDateString('es-AR', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })
              };
            });

            const currentPrice = formattedHistory[formattedHistory.length - 1]?.price;
            const oldestPrice = formattedHistory[0]?.price;
            const priceChange = formattedHistory.length > 1 
              ? currentPrice - oldestPrice
              : 0;
            const priceChangePercent = formattedHistory.length > 1 && oldestPrice > 0
              ? ((currentPrice - oldestPrice) / oldestPrice * 100).toFixed(1)
              : 0;

            setHistory({
              name: productHistory.name,
              data: formattedHistory,
              currentPrice,
              oldestPrice,
              priceChange,
              priceChangePercent
            });
          } else {
            setHistory(null);
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          const errorInfo = handleError(err, {
            operation: 'fetchPriceHistory',
            productId
          });
          setError(errorInfo.message);
          setLoading(false);
        }
      }
    }

    fetchHistory();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  return { history, loading, error };
}

/**
 * Hook para obtener el histórico completo (todos los productos)
 * @returns {Object} { allHistory, loading, error }
 */
export function useAllPriceHistory() {
  const [allHistory, setAllHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchAllHistory() {
      try {
        setLoading(true);
        setError(null);

        // Fetch con retry y timeout
        const data = await fetchJSON('/data/price-history.json', {}, {
          retries: 2,
          timeout: 8000
        });

        if (!data || typeof data !== 'object') {
          throw new DataError('Formato de datos inválido');
        }

        if (isMounted) {
          setAllHistory(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          const errorInfo = handleError(err, {
            operation: 'fetchAllPriceHistory'
          });
          setError(errorInfo.message);
          setLoading(false);
        }
      }
    }

    fetchAllHistory();

    return () => {
      isMounted = false;
    };
  }, []);

  return { allHistory, loading, error };
}

