import { useCallback, useEffect, useState } from 'react';

/**
 * Cuenta regresiva hacia `targetMs` que se actualiza cada segundo.
 * Devuelve { days, hours, minutes, seconds, expired }.
 *
 * Compartido por la sección Flash Sale (mobile: HotSaleSection /
 * desktop: FlashSaleSection) para no duplicar la lógica del contador.
 */
export const useCountdown = (targetMs) => {
  const calc = useCallback(() => {
    const diff = Math.max(0, targetMs - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      expired: diff <= 0,
    };
  }, [targetMs]);

  const [timeLeft, setTimeLeft] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);

  return timeLeft;
};

export default useCountdown;
