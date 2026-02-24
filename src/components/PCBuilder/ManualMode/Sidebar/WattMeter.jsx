/**
 * WattMeter - Medidor de consumo eléctrico
 * Single Responsibility: Visualizar el consumo de watts
 */
const WattMeter = ({ totalWattage, percentage }) => {
  const bars = 20;
  const filledBars = Math.round((percentage / 100) * bars);
  const color = percentage < 60 ? '#22C55E' : percentage < 85 ? '#F97316' : '#EF4444';

  return (
    <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 20 }}>
      {Array.from({ length: bars }, (_, i) => (
        <div key={i} style={{
          flex: 1,
          height: `${50 + (i / bars) * 50}%`,
          borderRadius: 2,
          background: i < filledBars ? color : '#E2E8F0',
          transition: 'background 0.3s ease',
        }} />
      ))}
    </div>
  );
};

export default WattMeter;
