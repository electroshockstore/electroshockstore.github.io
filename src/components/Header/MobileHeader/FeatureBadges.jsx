import { Truck, ShieldCheck, Award } from 'lucide-react';

const FeatureBadges = () => {
  const badges = [
    {
      icon: Truck,
      text: 'Puntos de \nretiro'
    },
    {
      icon: ShieldCheck,
      text: 'Pago\nseguro'
    },
    {
      icon: Award,
      text: 'Sin Depositos\nPrevios'
    }
  ];

  return (
    <div className="flex items-center justify-between gap-2">
      {badges.map((badge, index) => (
        <div key={index} className="flex items-center gap-2 flex-1">
          <div className="p-1.5 bg-blue-500/15 rounded-lg border border-blue-500/20">
            <badge.icon className="h-3.5 w-3.5 text-blue-400" strokeWidth={2.2} />
          </div>
          <span className="text-[10px] font-semibold text-gray-400 leading-tight whitespace-pre-line">
            {badge.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FeatureBadges;
