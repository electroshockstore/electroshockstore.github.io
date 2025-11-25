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
    <footer className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg">
                <Store className="h-8 w-8 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-3xl font-black text-white tracking-tight">Shock-Store</h3>
                <p className="text-sm font-bold text-blue-400">Catálogo de Productos</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-400 leading-relaxed font-medium">
              Tu tienda de confianza para componentes de PC y tecnología. Calidad garantizada y los mejores precios del mercado.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Clock className="h-5 w-5 text-blue-400" strokeWidth={2.5} />
                <span className="text-sm font-semibold">Lun - Sáb: 9:00 - 20:00</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="h-5 w-5 text-blue-400" strokeWidth={2.5} />
                <span className="text-sm font-semibold">Consultas por WhatsApp</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="h-5 w-5 text-blue-400" strokeWidth={2.5} />
                <span className="text-sm font-semibold">info@shock-store.com</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-black text-white flex items-center gap-2">
              <MapPin className="h-6 w-6 text-blue-400" strokeWidth={2.5} />
              Nuestras Ubicaciones
            </h4>
            
            <div className="space-y-4">
              {locations.map((location, index) => (
                <div 
                  key={index}
                  className="bg-gray-800/50 rounded-xl p-4 border-2 border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-black text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-bold text-white text-base mb-1">{location.name}</h5>
                      <p className="text-sm text-gray-400 font-medium">{location.address}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
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

        <div className="mt-8 pt-6 border-t-2 border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm font-semibold text-gray-400">
              © {currentYear} Shock-Store. Todos los derechos reservados.
            </p>
            <p className="text-base font-black text-white">
              Desarrollado por <span className="text-blue-400">JLdev Shock-Store</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
