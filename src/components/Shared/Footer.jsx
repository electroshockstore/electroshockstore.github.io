import { Store, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const locations = [
    {
      name: 'Berazategui',
      address: 'Berazategui, Buenos Aires',
      coords: { lat: -34.7631, lng: -58.2108 }
    },
    {
      name: 'Cruce Florencio Varela',
      address: 'Florencio Varela, Buenos Aires',
      coords: { lat: -34.8167, lng: -58.2833 }
    }
  ];

  return (
    <footer className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white pb-20 sm:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          
          <div className="space-y-3 sm:space-y-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <img 
                src="/logotipo_tiny.png" 
                alt="Shock-Store Logo" 
                className="h-12 sm:h-16 w-auto object-contain"
              />
              <div>
                <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight">Shock-Store</h3>
                <p className="text-xs sm:text-sm font-bold text-blue-400">Catálogo de Productos</p>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-medium hidden sm:block">
              Tu tienda de confianza para componentes de PC y tecnología. Calidad garantizada y los mejores precios del mercado.
            </p>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3 text-gray-300">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" strokeWidth={2.5} />
                <span className="text-xs sm:text-sm font-semibold">Lunes a Domingo: 9:00 - 21:00</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-gray-300">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" strokeWidth={2.5} />
                <span className="text-xs sm:text-sm font-semibold">Consultas por WhatsApp</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-gray-300 hidden sm:flex">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" strokeWidth={2.5} />
                <span className="text-xs sm:text-sm font-semibold">info@shock-store.com</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-base sm:text-xl font-black text-white flex items-center gap-2">
              <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" strokeWidth={2.5} />
              Ubicaciones
            </h4>
            
            <div className="space-y-2 sm:space-y-4">
              {locations.map((location, index) => (
                <div 
                  key={index}
                  className="bg-gray-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-700 hover:border-blue-500 transition-all duration-300"
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-black text-xs sm:text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-bold text-white text-sm sm:text-base mb-0.5 sm:mb-1">{location.name}</h5>
                      <p className="text-xs sm:text-sm text-gray-400 font-medium">{location.address}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 hidden lg:block">
            <h4 className="text-xl font-black text-white">Mapa de Ubicaciones</h4>
            
            <div className="relative w-full h-64 lg:h-full min-h-[250px] bg-gray-800 rounded-2xl overflow-hidden border-2 border-gray-700 shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52234.89!2d-58.25!3d-34.79!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2d1e8e8e8e8e8%3A0x8e8e8e8e8e8e8e8!2sBerazategui%2C%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              ></iframe>
              
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
                <p className="text-xs font-bold text-gray-900">📍 2 Ubicaciones</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
            <p className="text-xs sm:text-sm font-semibold text-gray-400">
              © {currentYear} Shock-Store. Todos los derechos reservados.
            </p>
            <p className="text-xs sm:text-base font-black text-white">
              Desarrollado por <span className="text-blue-400">JLdev Shock-Store</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
