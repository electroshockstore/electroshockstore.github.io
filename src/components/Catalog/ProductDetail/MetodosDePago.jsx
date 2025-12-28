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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            
            return (
              <div
                key={method.id}
                className="group relative"
              >
                {/* Card */}
                <div className={`relative bg-white rounded-3xl border-2 overflow-hidden shadow-[0_20px_60px_rgb(0,0,0,0.25)] ${method.id === 'efectivo' ? 'border-emerald-300' : 'border-blue-300'} backdrop-blur-sm`}>
                  
                  {/* Background image for efectivo method */}
                  {method.id === 'efectivo' && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
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
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: 'url(/images/transfer_tiny.webp)',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right'
                      }}
                    />
                  )}
                  
                  {/* Gradient background decoration */}
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${method.bgColor} opacity-40 rounded-full blur-3xl transform translate-x-20 -translate-y-20`} />

                  {/* Content */}
                  <div className="relative p-3 sm:p-6 lg:p-6 pb-4 sm:pb-6">
                    {/* Icon Circle */}
                    <div className={`inline-flex p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br ${method.gradient} shadow-[0_10px_30px_rgba(0,0,0,0.3)] sm:shadow-[0_15px_50px_rgba(0,0,0,0.4)] mb-4 sm:mb-6`}>
                      <Icon className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white" strokeWidth={2.5} />
                    </div>

                    {/* TÍTULO MEJORADO (MODERNO) */}
                    <h3 className={`
                        text-2xl sm:text-xl lg:text-5xl
                        font-extrabold 
                        tracking-tight 
                        leading-snug 
                        mb-1 sm:mb-2
                        ${method.id === 'efectivo' ? 'text-emerald-700' : 'text-blue-700'}
                    `}>
                      {method.title}
                    </h3>
                    
                    <p className={`font-semibold text-sm sm:text-base mb-0 ${method.id === 'efectivo' ? 'text-emerald-700' : 'text-blue-700'}`}>
                      {method.description}
                    </p>
                  </div>

                  {/* Bottom accent line - always visible */}
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
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white rounded-xl sm:rounded-2xl border-2 border-gray-200 shadow-md">
              <Shield className="h-4 w-4 sm:h-6 sm:w-6 text-gray-700" strokeWidth={2.5} />
              <h3 className="text-lg sm:text-2xl font-black text-gray-900">
                Tips de Seguridad
              </h3>
            </div>
          </div>

         {/* Tips Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  {securityTips.map((tip, index) => {
    const Icon = tip.icon;

    return (
      <div key={index} className="group relative">
        {/* Card Principal con overflow-hidden para contener los bordes redondeados */}
        <div className={`relative bg-white rounded-2xl sm:rounded-[2rem] border-2 border-gray-100 p-6 sm:p-7 
          transition-all duration-500 shadow-[0_9px_30px_rgba(0,0,0,0.04)] 
           h-full overflow-hidden flex flex-col`}
        >
          {/* Fondo sutil (Liquid Style) */}
          <div className={`absolute inset-0 ${tip.bgColor} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />

          {/* Icon Circle with Gradient */}
          <div className="relative z-10">
            <div className={`inline-flex p-3.5 rounded-2xl bg-gradient-to-br ${tip.gradient} shadow-lg mb-5 
             `}>
              <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" strokeWidth={2.5} />
            </div>

            <h4 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
              {tip.title}
            </h4>

            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              {tip.description}
            </p>
          </div>

          {/* Bottom Border CORREGIDO: Adaptado perfectamente al redondeo */}
          <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${tip.gradient} transition-transform duration-500 transform origin-left`} />
        </div>
      </div>
    );
  })}
</div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 sm:mt-8 text-center px-4">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl sm:rounded-2xl border-2 border-blue-200 shadow-md">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
            <p className="text-xs sm:text-sm font-bold text-gray-800 text-center">
              Verifica siempre que el monto y los datos sean correctos antes de confirmar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetodosDePago;