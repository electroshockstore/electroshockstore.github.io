import { Banknote, CreditCard, AlertTriangle, CheckCircle2, Wifi, Shield, Sparkles } from 'lucide-react';

const PaymentMethodsSection = () => {
  const paymentMethods = [
    {
      id: 'efectivo',
      icon: Banknote,
      title: 'Efectivo',
      description: 'En el momento',
      gradient: 'from-yellow-500 to-cyan-500',
      bgGlow: 'from-emerald-500/20 to-green-500/20',
      borderColor: 'border-emerald-500/40',
      textColor: 'text-emerald-400'
    },
    {
      id: 'transferencia',
      icon: CreditCard,
      title: 'Transferencia',
      description: 'Mayores a $100.000',
      gradient: 'from-blue-500 to-cyan-400',
      bgGlow: 'from-blue-500/20 to-indigo-500/20',
      borderColor: 'border-blue-500/40',
      textColor: 'text-blue-400'
    }
  ];

  const securityTips = [
    {
      icon: CheckCircle2,
      title: 'Verificación Bancaria',
      description: 'Confirme su saldo y el estado de la cuenta inmediatamente antes de la transferencia.',
      gradient: 'from-emerald-500 to-green-500',
      bgColor: 'from-emerald-500/10 to-green-500/5',
      borderColor: 'border-emerald-500/30'
    },
    {
      icon: Wifi,
      title: 'Conexión a Internet',
      description: 'Disponga de una conexión a Internet estable y segura durante la entrega/retiro.',
      gradient: 'from-blue-500 to-cyan-400',
      bgColor: 'from-blue-500/10 to-cyan-500/5',
      borderColor: 'border-blue-500/30'
    },
    {
      icon: AlertTriangle,
      title: 'Validación de Pago',
      description: 'La entrega se efectúa solo cuando la transferencia esté acreditada en nuestra cuenta.',
      gradient: 'from-red-500 to-orange-500',
      bgColor: 'from-red-500/10 to-orange-500/5',
      borderColor: 'border-red-500/30'
    }
  ];

  return (
    <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 border border-white/10 mb-4 sm:mb-12 md:mb-16 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-5 right-5 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-5 left-5 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-full border border-blue-400/30 shadow-lg mb-4 sm:mb-6">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
            <span className="text-xs sm:text-sm font-bold text-gray-200">Métodos de Pago</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2 sm:mb-3">
            Opciones de Pago
          </h2>
          <p className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Seguras y Confiables
          </p>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            
            return (
              <div key={method.id} className="group relative h-full">
                {/* Glow effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${method.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500`} />
                
                {/* Card */}
                <div className={`relative h-full bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border-2 ${method.borderColor} overflow-hidden shadow-2xl transition-all duration-300 hover:border-opacity-80`}>
                  
                  {/* Background image for efectivo method */}
                  {method.id === 'efectivo' && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                      style={{
                        backgroundImage: 'url(/images/cash_tiny.webp)',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right'
                      }}
                    />
                  )}
                  
                  {/* Background image for transferencia method */}
                  {method.id === 'transferencia' && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                      style={{
                        backgroundImage: 'url(/images/transfer_tiny.webp)',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right'
                      }}
                    />
                  )}
                  
                  {/* Gradient background decoration */}
                  <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${method.bgGlow} rounded-full blur-3xl transform translate-x-16 -translate-y-16`} />

                  {/* Content */}
                  <div className="relative p-4 sm:p-6 lg:p-8 pb-4 sm:pb-6">
                    {/* Icon Circle */}
                    <div className={`inline-flex p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br ${method.gradient} shadow-[0_10px_40px_rgba(0,0,0,0.5)] mb-4 sm:mb-6`}>
                      <Icon className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white" strokeWidth={2.5} />
                    </div>

                    {/* Title */}
                    <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug mb-1 sm:mb-2 ${method.textColor}`}>
                      {method.title}
                    </h3>
                    
                    <p className={`font-semibold text-sm sm:text-base ${method.textColor} opacity-90`}>
                      {method.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className={`h-2 bg-gradient-to-r ${method.gradient}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Tips Section */}
        <div className="relative">
          {/* Section Header */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border-2 border-gray-600/50 shadow-lg">
              <Shield className="h-4 w-4 sm:h-6 sm:w-6 text-blue-400" strokeWidth={2.5} />
              <h3 className="text-lg sm:text-2xl font-black text-white">
                Tips de Seguridad
              </h3>
            </div>
          </div>

          {/* Tips Grid - Alturas iguales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr">
            {securityTips.map((tip, index) => {
              const Icon = tip.icon;

              return (
                <div key={index} className="group relative h-full">
                  {/* Glow effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${tip.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
                  
                  {/* Card Principal */}
                  <div className={`relative h-full flex flex-col bg-gradient-to-br ${tip.bgColor} backdrop-blur-sm rounded-2xl border ${tip.borderColor} p-5 sm:p-6 transition-all duration-500 shadow-lg hover:border-opacity-60 overflow-hidden`}>
                    {/* Subtle shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Icon Circle with Gradient */}
                    <div className="relative z-10 mb-4">
                      <div className={`inline-flex p-3 sm:p-3.5 rounded-xl bg-gradient-to-br ${tip.gradient} shadow-lg`}>
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" strokeWidth={2.5} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex-1 flex flex-col">
                      <h4 className="text-lg sm:text-xl font-bold text-white mb-3 tracking-tight">
                        {tip.title}
                      </h4>

                      <p className="text-sm text-gray-300 font-medium leading-relaxed mt-auto">
                        {tip.description}
                      </p>
                    </div>

                    {/* Bottom Border */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tip.gradient} transition-transform duration-500`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 sm:mt-8 text-center px-4">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-xl sm:rounded-2xl border-2 border-blue-400/30 shadow-lg backdrop-blur-sm">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0" />
            <p className="text-xs sm:text-sm font-bold text-gray-200 text-center">
              Verifica siempre que el monto y los datos sean correctos antes de confirmar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsSection;
