import { useState, useEffect } from 'react';

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

        const response = await fetch('/data/price-history.json');
        
        if (!response.ok) {
          throw new Error('No se pudo cargar el histórico de precios');
        }

        const data = await response.json();
        const productHistory = data[String(productId)];

        if (isMounted) {
          if (productHistory) {
            // Transformar datos para el gráfico
            const formattedHistory = productHistory.h.map(([timestamp, price]) => ({
              date: new Date(timestamp),
              price: price,
              formattedDate: new Date(timestamp).toLocaleDateString('es-AR', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })
            }));

            setHistory({
              name: productHistory.name,
              data: formattedHistory,
              currentPrice: formattedHistory[formattedHistory.length - 1]?.price,
              oldestPrice: formattedHistory[0]?.price,
              priceChange: formattedHistory.length > 1 
                ? formattedHistory[formattedHistory.length - 1].price - formattedHistory[0].price
                : 0,
              priceChangePercent: formattedHistory.length > 1
                ? ((formattedHistory[formattedHistory.length - 1].price - formattedHistory[0].price) / formattedHistory[0].price * 100).toFixed(1)
                : 0
            });
          } else {
            setHistory(null);
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
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

        const response = await fetch('/data/price-history.json');
        
        if (!response.ok) {
          throw new Error('No se pudo cargar el histórico de precios');
        }

        const data = await response.json();

        if (isMounted) {
          setAllHistory(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
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
