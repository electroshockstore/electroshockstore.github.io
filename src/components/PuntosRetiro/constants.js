import { DollarSign, AlertTriangle, CheckCircle, Shield, Camera, MapPinned, Truck, X, Percent } from 'lucide-react';

export const PICKUP_POINTS = [
  {
    id: 1,
    name: 'Bingo BZ Cruce (Puerta)',
    address: 'Cruce Florencio Varela, Provincia de Buenos Aires',
    schedule: '16:30 hs',
    days: 'Lunes a Viernes',
    weekendSchedule: 'Todo el día',
    mapUrl: 'https://maps.app.goo.gl/ivNLJMo7kHxtdUJAA',
    image: '/images/puntos_retiro/bz_cruce.webp',
    color: 'from-purple-600 to-pink-500',
    gradient: 'from-purple-500/20 to-pink-500/20',
    security: [
      { icon: Shield, text: 'Seguridad Municipal e Interna' },
      { icon: Camera, text: 'Cámaras de Seguridad' },
      { icon: MapPinned, text: 'Punto Seguro Transitable' }
    ]
  },
  {
    id: 2,
    name: 'Carrefour (Patio Comidas)',
    address: 'Av. Gral. José de San Martín 554. Florencio Varela, Provincia de Buenos Aires',
    schedule: 'Coordinar',
    days: 'Todos los días',
    weekendSchedule: 'Disponible',
    mapUrl: 'https://maps.app.goo.gl/kXdMaP1UVaRw5x767',
    image: '/images/puntos_retiro/carrefour.webp',
    color: 'from-green-600 to-emerald-500',
    gradient: 'from-green-500/20 to-emerald-500/20',
    security: [
      { icon: Shield, text: 'Seguridad del Centro Comercial' },
      { icon: Camera, text: 'Cámaras de Seguridad' },
      { icon: MapPinned, text: 'Punto Seguro Transitable' }
    ]
  }
];

export const IMPORTANT_RULES = [
  {
    icon: DollarSign,
    title: 'Sin Depositos Previos',
    subtitle: 'Sin Anticipos ni Señas',
    description: 'No solicitamos pagos previos, No se deje engañar con estafas',
    gradient: 'from-red-500 via-pink-500 to-rose-500',
    bgGradient: 'from-red-500/10 via-pink-500/5 to-rose-500/10',
    borderColor: 'border-red-500/30',
    iconBg: 'from-red-500/20 to-pink-500/20'
  },
  {
    icon: AlertTriangle,
    title: 'Pago Inmediato',
    subtitle: 'Sin excepciones',
    description: 'No lo intenten estafadores, conocemos todas las modalidades',
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    bgGradient: 'from-orange-500/10 via-amber-500/5 to-yellow-500/10',
    borderColor: 'border-orange-500/30',
    iconBg: 'from-orange-500/20 to-amber-500/20'
  },
  {
    icon: CheckCircle,
    title: 'Sin Local fisico',
    subtitle: 'Sin local físico',
    description: 'Los productos se entregan sellados, Pago previo para apertura',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    bgGradient: 'from-blue-500/10 via-cyan-500/5 to-teal-500/10',
    borderColor: 'border-blue-500/30',
    iconBg: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    icon: Percent,
    title: '10% Recargo',
    subtitle: 'Transferencias menores a $100.000',
    description: 'Cargos extras aplicables',
    gradient: 'from-red-600 via-rose-500 to-pink-500',
    bgGradient: 'from-red-600/10 via-rose-500/5 to-pink-500/10',
    borderColor: 'border-red-600/30',
    iconBg: 'from-red-600/20 to-rose-500/20'
  },
  {
    icon: Truck,
    title: 'hacemos Envios',
    subtitle: 'No se retira en mi domicilio Ni vendemos por MercadoLibre.',
    description: 'Puntos Seguros',
    gradient: 'from-slate-500 via-gray-500 to-zinc-500',
    bgGradient: 'from-slate-500/10 via-gray-500/5 to-zinc-500/10',
    borderColor: 'border-slate-500/30',
    iconBg: 'from-slate-500/20 to-gray-500/20'
  }
];
