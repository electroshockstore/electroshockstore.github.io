import { MapPin, Phone, Mail, Clock, ExternalLink, MessageCircle } from 'lucide-react';

const Footer = () => {


  const locations = [
    {
      name: 'Berazategui',
      address: 'Berazategui, Buenos Aires',

    },
    {
      name: 'Cruce Florencio Varela',
      address: 'Florencio Varela, Buenos Aires',
 

    }
  ];

  // URL del mapa con ambas ubicaciones marcadas - usando embed estándar sin API key
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d104469.78!2d-58.25!3d-34.79!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2d1e8e8e8e8e8%3A0x8e8e8e8e8e8e8e8!2sBerazategui%2C%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1234567890`;

  return (
    <footer className="w-full bg-[#0a0c12] text-white pt-16 pb-24 lg:pb-12 relative overflow-hidden border-t border-white/5">
      {/* Elementos decorativos de fondo mejorados */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 blur-[150px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/20 blur-[150px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* --- LAYOUT MOBILE --- */}
        <div className="lg:hidden flex flex-col gap-5">
          {/* Header Card Mejorado */}
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-[2.5rem] p-6 border border-white/20 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full" />
            <div className="relative flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 rounded-2xl shadow-lg shadow-blue-900/40">
                <img src="/logotipo_tiny.png" alt="Logo" className="h-11 w-auto" />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tight leading-none bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Shock-Store</h3>
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.25em] mt-1">Premium Hardware</p>
              </div>
            </div>
          </div>

          {/* Grid de Información Rápida Mejorado */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative bg-gradient-to-br from-blue-600/20 to-blue-700/10 rounded-[2rem] p-5 border border-blue-500/30 shadow-xl overflow-hidden group">
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-blue-500/20 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-700" />
              <Clock className="h-6 w-6 text-blue-400 mb-3 relative z-10" strokeWidth={2.5} />
              <p className="text-[9px] font-black text-blue-300 uppercase tracking-[0.2em] relative z-10">Horarios</p>
              <p className="text-sm font-bold mt-1 text-white/80 relative z-10">Lun - Dom</p>
              <p className="text-xl font-black text-white relative z-10">9:00 - 21:00</p>
            </div>

            <a href="#" className="relative bg-gradient-to-br from-emerald-600/20 to-emerald-700/10 rounded-[2rem] p-5 border border-emerald-500/30 shadow-xl active:scale-95 transition-all group overflow-hidden">
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-emerald-500/20 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-700" />
              <div className="flex justify-between items-start mb-3 relative z-10">
                <MessageCircle className="h-6 w-6 text-emerald-400" strokeWidth={2.5} />
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              </div>
              <p className="text-[9px] font-black text-emerald-300 uppercase tracking-[0.2em] relative z-10">WhatsApp</p>
              <p className="text-sm font-bold mt-1 text-white/80 relative z-10">Consultas</p>
              <p className="text-xl font-black text-white group-hover:text-emerald-300 transition-colors relative z-10">Chat ahora</p>
            </a>
          </div>

          {/* Ubicaciones y Mapa Mejorado */}
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h4 className="text-xs font-black uppercase tracking-[0.25em] text-gray-300 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-400" strokeWidth={2.5} /> Sucursales
                </h4>
                <div className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full">
                  <span className="text-[10px] font-black text-blue-400">2 PUNTOS</span>
                </div>
              </div>
              <div className="space-y-3">
                {locations.map((loc, i) => (
                  <a 
                    key={i}
                    href={loc.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/10 hover:border-blue-500/40 transition-all active:scale-95 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)] animate-pulse" />
                      <div className="min-w-0">
                        <p className="font-black text-sm truncate text-white">{loc.name}</p>
                        <p className="text-[10px] text-gray-400 truncate font-semibold">{loc.address}</p>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-500 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
            
            {/* Mapa Mobile Mejorado */}
            <div className="h-56 w-full relative overflow-hidden">
              <iframe 
                src={mapEmbedUrl}
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de ubicaciones Shock-Store"
                className="grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c12] via-[#0a0c12]/30 to-transparent pointer-events-none" />
            
            </div>
          </div>
        </div>


        {/* --- LAYOUT DESKTOP --- */}
        <div className="hidden lg:grid grid-cols-12 gap-10 items-start">
          
          {/* Columna 1: Brand & Description */}
          <div className="col-span-4 space-y-8">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-2xl rounded-full" />
              <div className="relative flex items-center gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 rounded-3xl border border-white/20 shadow-2xl shadow-blue-900/40">
                  <img src="/logotipo_tiny.png" alt="Logo" className="h-14 w-auto" />
                </div>
                <div>
                  <h3 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">Shock-Store</h3>
                  <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-1.5" />
                </div>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-medium">
              Elevando tu experiencia tecnológica con componentes de alta gama y asesoramiento especializado. <span className="text-blue-400 font-bold">Expertos en hardware de alto rendimiento.</span>
            </p>
          </div>

          {/* Columna 2: Contact & Hours */}
          <div className="col-span-3 space-y-6">
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-blue-400 flex items-center gap-2">
              <div className="w-1 h-4 bg-blue-500 rounded-full" />
              Contacto
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600/20 to-blue-700/10 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 group-hover:border-blue-400/50 transition-all duration-300">
                  <Clock className="h-6 w-6 text-blue-400" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Horarios</p>
                  <p className="text-base font-black text-white">Lun - Dom: 9h a 21h</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600/20 to-emerald-700/10 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 group-hover:border-emerald-400/50 transition-all duration-300">
                  <Phone className="h-6 w-6 text-emerald-400" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Ventas</p>
                  <p className="text-base font-black text-white">WhatsApp Oficial</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600/20 to-purple-700/10 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 group-hover:border-purple-400/50 transition-all duration-300">
                  <Mail className="h-6 w-6 text-purple-400" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Email</p>
                  <p className="text-base font-black text-white">info@shock-store.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna 3: Sucursales & Map - Full Width Grid */}
          <div className="col-span-5 space-y-5">
             <div className="flex items-center justify-between">
               <h4 className="text-sm font-black uppercase tracking-[0.3em] text-blue-400 flex items-center gap-2">
                 <div className="w-1 h-4 bg-blue-500 rounded-full" />
                 Puntos De Retiro
               </h4>
              
             </div>
             
             {/* Grid: Ubicaciones + Mapa lado a lado */}
             <div className="grid grid-cols-2 gap-5">
               {/* Ubicaciones */}
               <div className="space-y-3">
                 {locations.map((loc, i) => (
                   <a 
                     key={i} 
                     href={loc.mapsUrl}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="group flex items-center justify-between p-4 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 hover:border-blue-500/40 hover:bg-white/15 transition-all cursor-pointer"
                   >
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-pulse" />
                        <div>
                          <p className="text-sm font-black text-white leading-none">{loc.name}</p>
                          <p className="text-xs text-gray-400 mt-1.5 font-semibold">{loc.address}</p>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-600 group-hover:text-blue-400 transition-colors" />
                   </a>
                 ))}
               </div>

               {/* Mapa Desktop - Lado derecho con estilo mejorado */}
               <div className="relative h-full min-h-[160px] rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl group">
                  <iframe 
                    src={mapEmbedUrl}
                    width="100%" 
                    height="100%" 
                    style={{border:0}} 
                    allowFullScreen 
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa de ubicaciones Shock-Store"
                    className="grayscale group-hover:grayscale-0 transition-all duration-700" 
                  />
                
                
          
                
               </div>
             </div>
          </div>
        </div>

        {/* Footer Bottom Mejorado */}
        <div className="mt-4 pt-8 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 ">

            <div className="w-10 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent " />
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em]">
              © 2025 Shock-Store · Buenos Aires, Argentina
            </p>
            <div className="w-10 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          </div>
          
          <div className="flex items-center gap-4 ">
            <span className="text-[15px] font-bold text-gray-600 uppercase tracking-wider">Desarrollado por</span>
            <div className="px-5 py-2.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-white/20 shadow-lg">
               <span className="text-lg font-black bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">JLdev Studio</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;