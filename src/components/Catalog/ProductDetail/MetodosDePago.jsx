import { Banknote, CreditCard, AlertTriangle, CheckCircle2, Wifi, Shield, Sparkles } from 'lucide-react';

const MetodosDePago = () => {

  const paymentMethods = [
    {
      id: 'efectivo',
      icon: Banknote,
      title: 'Efectivo',
      description: 'En el momento', 
      color: 'emerald',
   gradient: 'from-yellow-500 to-cyan-500',
      bgColor: 'from-emerald-50 to-green-50',
      available: true
    },
    {
      id: 'transferencia',
      icon: CreditCard,
      title: 'Transferencia',
      description: 'Mayores a $100.000', // Texto mejorado
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-400',
      bgColor: 'from-blue-50 to-indigo-50',
      available: true
    }
  ];

  // Consejos de seguridad ultra-sintetizados
  const securityTips = [
    {
      icon: CheckCircle2,
      title: 'Verificación Bancaria',
      description: 'Confirme su saldo y el estado de la cuenta inmediatamente antes de la transferencia.',
      gradient: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-50'
    },
    {
      icon: Wifi,
      title: 'Conexión a Internet',
      description: 'Disponga de una conexión a Internet estable y segura durante la entrega/retiro.',
      gradient: 'from-yellow-500 to-yellow-300',
      bgColor: 'bg-blue-50'
    },
    {
      icon: AlertTriangle,
      title: 'Validación de Pago',
      description: 'La entrega se efectúa solo cuando la transferencia esté acreditada en nuestra cuenta.', // Usando la versión más concisa
      gradient: 'from-red-500 to-orange-500',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4 sm:p-6 rounded-xl relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-5 right-5 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl" />
        <div className="absolute bottom-5 left-5 w-32 h-32 bg-emerald-200/20 rounded-full blur-2xl" />
      </div>

      <div className="relative">
        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-white rounded-full border-2 border-blue-200 shadow-sm mb-4 sm:mb-6">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
            <span className="text-xs sm:text-sm font-bold text-gray-700">Métodos de Pago</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 sm:mb-6 px-4">
            Opciones de Pago
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 mt-1 sm:mt-2 pb-1 sm:pb-2">
              Seguras y Confiables
            </span>
          </h2>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            
            return (
              <div
                key={method.id}
                className="group relative"
              >
                {/* Card */}
                <div className={`relative bg-white rounded-2xl sm:rounded-3xl border-2 overflow-hidden shadow-lg ${method.id === 'efectivo' ? 'border-emerald-300' : 'border-blue-300'}`}>
                  
                  {/* Background image for efectivo method */}
                  {method.id === 'efectivo' && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center "
                      style={{
                        backgroundImage: 'url(/images/cash_tiny.webp)',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right bottom'
                      }}
                    />
                  )}
                  
                  {/* Background image for transferencia method */}
                  {method.id === 'transferencia' && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: 'url(/images/transfer_tiny.webp)',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right bottom'
                      }}
                    />
                  )}
                  
                  {/* Gradient background decoration */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${method.bgColor} opacity-40 rounded-full blur-3xl`} />

                  {/* Content */}
                  <div className="relative p-4 sm:p-6">
                    {/* Icon Circle */}
                    <div className={`inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${method.gradient} shadow-lg mb-3 sm:mb-4`}>
                      <Icon className="h-5 w-5 sm:h-8 sm:w-8 text-white" strokeWidth={2.5} />
                    </div>

                    {/* Título y descripción */}
                    <div className="max-w-[60%] sm:max-w-none">
                      <h3 className={`text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mb-1 sm:mb-2 ${method.id === 'efectivo' ? 'text-emerald-700' : 'text-blue-700'}`}>
                        {method.title}
                      </h3>
                      
                      <p className={`font-semibold text-xs sm:text-base ${method.id === 'efectivo' ? 'text-emerald-600' : 'text-blue-600'}`}>
                        {method.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className={`h-1.5 sm:h-2 bg-gradient-to-r ${method.gradient}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MetodosDePago;