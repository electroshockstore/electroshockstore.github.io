/**
 * SectionTitle — jerarquía de títulos firma maximalista.
 *
 * Patrón: pill eyebrow + título gigante Bebas de dos líneas
 * (línea blanca/oscura + palabra en degradado azul→púrpura).
 * Mismo lenguaje que SectionHeader del home y el badge JLdev.
 *
 * - `tone="dark"`: superficies claras (título grafito).
 * - `tone="light"`: superficies oscuras (título blanco).
 * Sin JS ni animaciones: solo texto y CSS (cero costo de rendimiento,
 * pinta inmediato y ayuda al LCP). Tamaños con clamp → mobile safe.
 *
 * @param {React.ReactNode} eyebrow - Contenido de la pill superior.
 * @param {string} titleTop - Primera línea del título.
 * @param {string} [titleAccent] - Segunda línea en degradado.
 * @param {React.ReactNode} [description] - Bajada pequeña.
 * @param {React.ReactNode} [action] - Acción a la derecha del eyebrow.
 * @param {'dark'|'light'} [tone]
 * @param {'h1'|'h2'} [as] - Nivel de heading (uno solo h1 por página).
 * @param {'md'|'lg'} [size]
 */
const BEBAS = "'Bebas Neue','Arial Black',sans-serif";
const ACCENT =
  'bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent';

const SectionTitle = ({
  eyebrow,
  titleTop,
  titleAccent,
  description,
  action,
  tone = 'dark',
  as: Tag = 'h2',
  size = 'md',
  className = '',
}) => {
  const light = tone === 'light';
  const titleSize =
    size === 'lg'
      ? 'text-[clamp(3rem,9vw,6.5rem)]'
      : 'text-[clamp(2.2rem,6vw,4rem)]';

  return (
    <div className={`flex flex-col items-start ${className}`}>
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] sm:text-[11px] ${
            light
              ? 'border-white/10 bg-white/5 text-gray-300'
              : 'border-blue-200 bg-white text-gray-700 shadow-sm'
          }`}
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
          {eyebrow}
        </span>
        {action}
      </div>

      <Tag
        className={`mt-3 font-black uppercase leading-[0.85] tracking-tight sm:mt-4 ${titleSize} ${
          light ? 'text-white' : 'text-gray-900'
        }`}
        style={{ fontFamily: BEBAS }}
      >
        <span className="block">{titleTop}</span>
        {titleAccent && (
          <span className={`block ${ACCENT}`}>{titleAccent}</span>
        )}
      </Tag>

      {description && (
        <p
          className={`mt-2 max-w-xl text-sm font-medium leading-relaxed sm:mt-3 sm:text-base ${
            light ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
