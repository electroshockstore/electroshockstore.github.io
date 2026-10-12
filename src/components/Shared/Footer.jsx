import { MapPin, Phone, Mail, Clock, ExternalLink, MessageCircle } from 'lucide-react';
import BrandLockup from '../Header/shared/BrandLockup';

const LOCATIONS = [
  {
    name: 'Bingo BZ Cruce (Puerta)',
    address: 'Cruce Florencio Varela, Provincia de Buenos Aires',
    mapsUrl: 'https://maps.app.goo.gl/ivNLJMo7kHxtdUJAA',
  },
  {
    name: 'Carrefour (Patio Comidas)',
    address: 'Av. Gral. José de San Martín 554. Florencio Varela, Provincia de Buenos Aires',
    mapsUrl: 'https://maps.app.goo.gl/kXdMaP1UVaRw5x767',
  },
];

const CONTACT = [
  { icon: Clock, label: 'Horarios', value: 'Lun - Dom: 9h a 21h' },
  { icon: Phone, label: 'Ventas', value: 'WhatsApp Oficial' },
  { icon: Mail, label: 'Email', value: 'info@electroshock.com' },
];

/**
 * Footer — cierre brutalista del landing (tinta + lima).
 * Mismo lenguaje que ShowcaseHero / ComboEntregaSection:
 * celdas cuadradas, mono uppercase, hero-square, hard shadows.
 * La marca JLdev Studio conserva su diseño original registrado.
 */
const Footer = () => (
  <footer className="relative w-full overflow-hidden bg-[#0e0e0e] text-white">
    {/* Filete lima superior con glow */}
    <div
      className="h-[5px] w-full bg-[#c8f519] shadow-[0_0_24px_rgba(200,245,25,0.55)]"
      aria-hidden="true"
    />

    {/* Vida de fondo: glow lima + dots + grilla */}
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-[#c8f519]/10 blur-[90px]" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#c8f519]/[0.07] blur-[100px]" />
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1.3px)',
          backgroundSize: '22px 22px',
          maskImage: 'radial-gradient(ellipse at 50% 0%, #000 30%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 0%, #000 30%, transparent 78%)',
        }}
      />
      <div className="absolute inset-0 mx-[24px] grid grid-cols-2 opacity-100 sm:mx-[48px] lg:mx-[72px] lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={i > 0 ? 'border-l border-white/[0.07]' : ''} />
        ))}
      </div>
    </div>

    <div className="relative mx-[24px] py-10 sm:mx-[48px] lg:mx-[72px] lg:py-14">
      {/* Encabezado */}
      <div className="flex flex-wrap items-center gap-3 border-b border-white/15 pb-6">
        <span className="hero-square" aria-hidden="true" />
        <span className="landing-mono bg-[#f6f6f6] px-3 py-1 text-[12px] font-black uppercase tracking-[0.08em] text-[#0e0e0e]">
          Catálogo virtual · Zona Sur, Buenos Aires
        </span>
        <span className="landing-mono ml-auto hidden text-[12px] font-black uppercase tracking-[0.18em] text-white/60 sm:block">
          03 / Cierre
        </span>
      </div>

      {/* Cuerpo */}
      <div className="grid grid-cols-1 gap-10 pt-8 lg:grid-cols-12 lg:gap-0">
        {/* Marca + CTA vivo */}
        <div className="flex flex-col items-start gap-5 lg:col-span-4 lg:border-r lg:border-white/15 lg:pr-10">
          <BrandLockup size="sm" />
          <p className="max-w-sm text-[15px] font-medium leading-relaxed text-gray-200">
            Elevando tu experiencia tecnológica con componentes de alta gama y
            asesoramiento especializado.{' '}
            <span className="font-bold text-[#c8f519]">
              Expertos en hardware de alto rendimiento.
            </span>
          </p>
          <a
            href="https://wa.me/541125718382"
            target="_blank"
            rel="noopener noreferrer"
            className="landing-btn font-black shadow-[5px_5px_0_0_rgba(200,245,25,0.35)] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_0_rgba(200,245,25,0.35)] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={3} />
            Hablanos por WhatsApp
          </a>
          <div className="flex items-center gap-2">
            <span className="hero-square" aria-hidden="true" />
            <span className="landing-mono text-[11px] font-black uppercase tracking-[0.18em] text-white/60">
              Sin local · Solo retiro
            </span>
          </div>
        </div>

        {/* Contacto */}
        <div className="flex flex-col gap-5 lg:col-span-3 lg:px-10">
          <div className="flex items-center gap-3">
            <span className="hero-square" aria-hidden="true" />
            <h4 className="landing-mono text-[12px] font-black uppercase tracking-[0.18em] text-[#c8f519]">
              Contacto
            </h4>
          </div>
          <ul className="flex flex-col">
            {CONTACT.map(({ icon: Icon, label, value }) => (
              <li
                key={label}
                className="group flex items-center gap-4 border-b border-white/10 py-3 transition-all duration-150 first:border-t hover:translate-x-1 hover:border-[#c8f519]/60"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/25 bg-white/10 text-[#c8f519] shadow-[3px_3px_0_0_rgba(200,245,25,0.25)] transition-colors duration-150 group-hover:border-[#0e0e0e] group-hover:bg-[#c8f519] group-hover:text-[#0e0e0e]">
                  <Icon className="h-5 w-5" strokeWidth={2.5} />
                </span>
                <span className="min-w-0">
                  <span className="landing-mono block text-[11px] font-black uppercase tracking-[0.18em] text-gray-400">
                    {label}
                  </span>
                  <span className="block truncate text-base font-extrabold tracking-tight text-white">
                    {value}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Puntos de retiro + mapa */}
        <div className="flex flex-col gap-5 lg:col-span-5 lg:border-l lg:border-white/15 lg:pl-10">
          <div className="flex items-center gap-3">
            <span className="hero-square" aria-hidden="true" />
            <h4 className="landing-mono text-[12px] font-black uppercase tracking-[0.18em] text-[#c8f519]">
              Puntos de retiro
            </h4>
            <span className="landing-mono ml-auto border border-[#c8f519]/70 bg-[#c8f519]/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#c8f519]">
              02 sucursales
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-3">
              {LOCATIONS.map((loc) => (
                <a
                  key={loc.name}
                  href={loc.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-1 flex-col justify-center gap-1.5 border border-white/15 bg-[#161616] p-4 shadow-[5px_5px_0_0_rgba(255,255,255,0.06)] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#c8f519] hover:bg-[#1b1e12] hover:shadow-[5px_5px_0_0_rgba(200,245,25,0.45)]"
                >
                  <span className="flex items-center gap-2 pr-6">
                    <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping bg-[#c8f519] opacity-60" />
                      <span className="relative inline-flex h-2.5 w-2.5 bg-[#c8f519] shadow-[0_0_10px_rgba(200,245,25,0.9)]" />
                    </span>
                    <span className="text-sm font-extrabold uppercase leading-tight tracking-tight text-white">
                      {loc.name}
                    </span>
                  </span>
                  <span className="pl-5 text-xs font-medium leading-snug text-gray-300">
                    {loc.address}
                  </span>
                  <ExternalLink
                    className="absolute right-3 top-3 h-4 w-4 text-white/40 transition-colors group-hover:text-[#c8f519]"
                    aria-hidden="true"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#c8f519] transition-all duration-300 group-hover:w-full"
                  />
                </a>
              ))}
            </div>

            <a
              href="https://www.google.com/maps/search/Florencio+Varela,+Buenos+Aires/@-34.78,-58.28,13z"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block min-h-[190px] overflow-hidden border border-white/25 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c8f519] hover:shadow-[6px_6px_0_0_rgba(200,245,25,0.4)]"
              aria-label="Ver ubicaciones en Google Maps"
            >
              <img
                src="/images/map_location.webp"
                alt="Mapa de ubicaciones ElectroShock"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover grayscale-[0.4] transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/55 via-transparent to-transparent" aria-hidden="true" />
              <span className="landing-mono absolute left-3 top-3 flex items-center gap-1.5 border border-[#0e0e0e] bg-[#c8f519] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#0e0e0e] shadow-[3px_3px_0_0_#0e0e0e]">
                <MapPin className="h-3 w-3" strokeWidth={3} />
                Ver en Maps
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 sm:flex-row">
        <p className="landing-mono text-[11px] font-black uppercase tracking-[0.18em] text-gray-400">
          © 2025 ElectroShock · Buenos Aires, Argentina
        </p>
        {/* Marca registrada JLdev Studio — diseño original intacto */}
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3 lg:gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-600 sm:text-sm lg:text-[15px]">
            Desarrollado por
          </span>
          <div className="border border-white/20 bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-4 py-2 shadow-lg sm:px-5 sm:py-2.5 rounded-xl">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-base font-black text-transparent sm:text-lg">
              JLdev Studio
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
