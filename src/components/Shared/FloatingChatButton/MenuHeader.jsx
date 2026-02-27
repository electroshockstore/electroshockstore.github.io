/**
 * MenuHeader - SVG animado decorativo para el menú expandido
 */
const MenuHeader = () => (
  <svg
    className="fcb-svg-header"
    viewBox="0 0 300 64"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Gradientes */}
    <defs>
      <linearGradient id="wg1" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#00e676" stopOpacity="0" />
        <stop offset="40%" stopColor="#00e676" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.3" />
      </linearGradient>
      <linearGradient id="wg2" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#00e5ff" stopOpacity="0" />
        <stop offset="50%" stopColor="#00e5ff" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#00e676" stopOpacity="0.1" />
      </linearGradient>
    </defs>

    {/* Ondas animadas */}
    <path
      d="M0 36 Q40 18 80 36 T160 36 T240 36 T300 36"
      fill="none"
      stroke="url(#wg1)"
      strokeWidth="1.5"
      className="fcb-wave fcb-wave-1"
    />
    <path
      d="M0 36 Q40 54 80 36 T160 36 T240 36 T300 36"
      fill="none"
      stroke="url(#wg2)"
      strokeWidth="1"
      className="fcb-wave fcb-wave-2"
    />

    {/* Punto central con ping */}
    <g transform="translate(150,32)">
      <circle cx="0" cy="0" r="3" fill="#00e676" opacity="0.9" />
      <circle cx="0" cy="0" r="3" fill="none" stroke="#00e676" strokeWidth="1.5" className="fcb-ping fcb-ping-1" />
      <circle cx="0" cy="0" r="3" fill="none" stroke="#00e676" strokeWidth="1" className="fcb-ping fcb-ping-2" />
    </g>

    {/* Dots orbitando */}
    <g transform="translate(150,32)" className="fcb-orbit fcb-orbit-1">
      <circle cx="0" cy="0" r="2" fill="#00e5ff" opacity="0.7" />
    </g>
    <g transform="translate(150,32)" className="fcb-orbit fcb-orbit-2">
      <circle cx="0" cy="0" r="1.5" fill="#00e676" opacity="0.5" />
    </g>

    {/* Texto */}
    <text
      x="150"
      y="56"
      textAnchor="middle"
      fill="rgba(255,255,255,0.18)"
      fontSize="8"
      fontFamily="system-ui"
      fontWeight="600"
      letterSpacing="4"
    >
      EN LÍNEA AHORA
    </text>
  </svg>
);

export default MenuHeader;
