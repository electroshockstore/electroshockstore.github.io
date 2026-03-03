// SpecsSection — Editorial Premium
import { useState } from 'react';

const SpecsSection = ({ specifications }) => {
  const [hovered, setHovered] = useState(null);
  const [activeTab, setActiveTab] = useState('main');

  if (!specifications) return null;

  const formatLabel = (key) =>
    key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim();

  const isNum = (v) =>
    typeof v !== 'object' && !isNaN(parseFloat(String(v))) && String(v).trim() !== '';

  const splitUnit = (v) => {
    const m = String(v).trim().match(/^(\d+(?:\.\d+)?)\s*([A-Za-z%]+)?$/);
    return m ? { num: m[1], unit: m[2] || null } : { num: String(v), unit: null };
  };

  const specsArray = Object.entries(specifications).map(([key, value]) => ({
    key, value, label: formatLabel(key),
  }));

  const half = Math.ceil(specsArray.length / 2);
  const leftCol = specsArray.slice(0, half);
  const rightCol = specsArray.slice(half);
  const total = specsArray.length;

  const renderValue = (value) => {
    if (typeof value === 'object' && value !== null) {
      return (
        <div className="flex flex-col gap-0.5">
          {Object.entries(value).map(([sk, sv]) => (
            <div key={sk} className="flex gap-1.5 items-center justify-end">
              <span className="text-[10px] text-slate-400 font-medium">{sk}</span>
              <span className="text-[11px] font-bold text-slate-900">{sv}</span>
            </div>
          ))}
        </div>
      );
    }
    if (isNum(value)) {
      const { num, unit } = splitUnit(value);
      return (
        <span className="sv-num">
          {num}
          {unit && <span className="sv-unit">{unit}</span>}
        </span>
      );
    }
    return <span className="text-sm font-bold text-slate-900">{String(value)}</span>;
  };

  const SpecRow = ({ spec, idx, side }) => {
    const id = `${side}-${idx}`;
    const on = hovered === id;
    return (
      <div
        className={`sr relative flex items-center px-3 py-2.5 rounded-lg transition-all duration-150 cursor-default overflow-hidden ${
          on ? 'sr-on bg-slate-50 translate-x-0.5' : ''
        }`}
        onMouseEnter={() => setHovered(id)}
        onMouseLeave={() => setHovered(null)}
      >
        <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 whitespace-nowrap flex-shrink-0">
          {spec.label}
        </span>
        <span className="sr-dots" />
        <span className="flex-shrink-0 text-right">{renderValue(spec.value)}</span>
      </div>
    );
  };

  const Column = ({ specs, side }) => (
    <div className="space-y-0">
      {specs.map((s, i) => <SpecRow key={s.key} spec={s} idx={i} side={side} />)}
    </div>
  );

  return (
    <div className="sp-root">
      {/* HEADER */}
      <div className="flex items-start justify-between mb-1.5">
        <div>
          <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-600 mb-1.5">
            Producto
          </div>
          <div className="sp-title">
            Detalles<br />Técnicos
          </div>
        </div>
        <div>
          <div className="sp-num">{String(total).padStart(2, '0')}</div>
          <div className="text-[9px] font-semibold tracking-[0.18em] uppercase text-slate-400 text-right mt-0.5">
            specs
          </div>
        </div>
      </div>
      <div className="sp-bar" />

      {/* TABS — solo mobile */}
      <div className="md:hidden flex gap-1.5 mb-4 p-1 bg-slate-100 rounded-lg">
        <button
          className={`flex-1 px-2.5 py-2 rounded-lg border-none text-[11px] font-bold tracking-wider uppercase cursor-pointer transition-all duration-150 ${
            activeTab === 'main'
              ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
              : 'bg-transparent text-slate-400'
          }`}
          onClick={() => setActiveTab('main')}
        >
          Principales · {leftCol.length}
        </button>
        <button
          className={`flex-1 px-2.5 py-2 rounded-lg border-none text-[11px] font-bold tracking-wider uppercase cursor-pointer transition-all duration-150 ${
            activeTab === 'additional'
              ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
              : 'bg-transparent text-slate-400'
          }`}
          onClick={() => setActiveTab('additional')}
        >
          Adicional · {rightCol.length}
        </button>
      </div>

      {/* MOBILE — una columna */}
      <div className="md:hidden">
        <Column specs={activeTab === 'main' ? leftCol : rightCol} side={activeTab} />
      </div>

      {/* DESKTOP — dos columnas */}
      <div className="hidden md:grid md:grid-cols-2 gap-0">
        <div className="pr-7 border-r border-slate-100">
          <Column specs={leftCol} side="left" />
        </div>
        <div className="pl-7">
          <Column specs={rightCol} side="right" />
        </div>
      </div>
    </div>
  );
};

export default SpecsSection;
