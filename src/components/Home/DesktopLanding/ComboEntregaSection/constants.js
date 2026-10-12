import { Ban, MapPin, Truck } from 'lucide-react';

/** Badges flotantes de la card de Puntos de Retiro. */
export const FLOATING_BADGES = [
  {
    label: 'Anticipos',
    Icon: Ban,
    className: 'left-2 top-5 -rotate-6 bg-emerald-600',
  },
  {
    label: 'Envíos',
    Icon: Truck,
    className: 'left-1/2 top-0 -translate-x-1/2 rotate-3 bg-red-600',
  },
  {
    label: 'Seguros',
    Icon: MapPin,
    className: 'right-2 top-12 rotate-6 bg-blue-600',
  },
];
