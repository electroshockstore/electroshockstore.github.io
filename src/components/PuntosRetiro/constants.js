import { DollarSign, AlertTriangle, CheckCircle, Shield, Camera, MapPinned } from 'lucide-react';

export const PICKUP_POINTS = [
  {
    id: 1,
    name: 'Berazategui Centro',
    address: 'Av Mitre y 14. Via Cosenza',
    schedule: '16:00 hs',
    days: 'Lunes a Viernes',
    weekendSchedule: 'NO',
    mapUrl: 'https://maps.app.goo.gl/vZYggDMLYFrYt3qv5',
    image: '/images/puntos_retiro/via_cosenza.webp',
    color: 'from-blue-600 to-cyan-500',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    security: [
      { icon: Shield, text: 'Frente a Base Policial' },
      { icon: Camera, text: 'Cámaras de Seguridad' },
      { icon: MapPinned, text: 'Punto Seguro Transitable' }
    ]
  },
  {
    id: 2,
    name: 'Cruce Florencio Varela',
    address: 'Puerta del Bingo',
    schedule: '16:30 hs',
    days: 'Lunes a Viernes',
    weekendSchedule: 'Todo el día',
    mapUrl: 'https://maps.app.goo.gl/qouSL9xAgsLR3x4EA',
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
    id: 3,
    name: 'Carrefour Fcio Varela',
    address: 'Patio Comida. AV del Trabajo',
    schedule: 'A coordinar',
    days: 'Todos los días',
    weekendSchedule: 'Disponible',
    mapUrl: 'https://maps.app.goo.gl/2wB6dvSTKSSVPcsu9',
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
    description: ' Transferencias menores a $100.000 tienen recargo del 10% sin excepcion',
    gradient: 'from-red-500 via-pink-500 to-rose-500',
    bgGradient: 'from-red-500/10 via-pink-500/5 to-rose-500/10',
    borderColor: 'border-red-500/30',
    iconBg: 'from-red-500/20 to-pink-500/20'
  },
  {
    icon: AlertTriangle,
    title: 'Pago INMEDIATO',
    subtitle: 'Sin excepciones',
    description: 'Efectivo o transferencia inmediata. No intenten estafadores, conozco todas las modalides',
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    bgGradient: 'from-orange-500/10 via-amber-500/5 to-yellow-500/10',
    borderColor: 'border-orange-500/30',
    iconBg: 'from-orange-500/20 to-amber-500/20'
  },
  {
    icon: CheckCircle,
    title: 'Venta Particular',
    subtitle: 'Sin local físico',
    description: 'NO tengo local. Sin facturas ni garantía escrita. Todo sellado, se paga antes de abrir',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    bgGradient: 'from-blue-500/10 via-cyan-500/5 to-teal-500/10',
    borderColor: 'border-blue-500/30',
    iconBg: 'from-blue-500/20 to-cyan-500/20'
  }
];
