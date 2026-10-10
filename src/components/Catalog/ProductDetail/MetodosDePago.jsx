import { Banknote, CreditCard, AlertTriangle, CheckCircle2, Wifi, Shield, Sparkles } from 'lucide-react';

const MetodosDePago = () => {

  const paymentMethods = [
    {
      id: 'efectivo',
      icon: Banknote,
      title: 'Efectivo',
      description: 'En el momento',
      color: 'emerald',
      iconBg: 'bg-emerald-500',
      accentLine: 'bg-emerald-500',
      available: true
    },
    {
      id: 'transferencia',
      icon: CreditCard,
      title: 'Transferencia',
      description: 'Mayores a $100.000', // Texto mejorado
      color: 'blue',
      iconBg: 'bg-blue-500',
      accentLine: 'bg-blue-500',
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
    <div className="bg-white border border-gray-200 p-4 sm:p-6 rounded-xl relative overflow-hidden">
      <div className="relative">
        {/* Header Section — composición maximalista */}
        <div className="relative overflow-hidden text-center mb-6 sm:mb-8">
          {/* Número fantasma */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-2 top-0 select-none font-black leading-none text-gray-900/[0.05] text-[clamp(4rem,12vw,8rem)]"
            style={{ fontFamily: "'Bebas Neue','Arial Black',sans-serif" }}
          >
            01
          </span>

          {/* Eyebrow con reglas */}
          <div className="relative flex items-center justify-center gap-3 mb-4 sm:mb-5">
            <span className="hidden h-px w-10 bg-gray-300 sm:block" />
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 shadow-sm sm:px-4 sm:py-2">
              <Sparkles className="h-3 w-3 text-blue-600 sm:h-4 sm:w-4" />
              <span className="text-xs font-bold text-gray-700 sm:text-sm">Métodos de Pago</span>
            </span>
            <span className="hidden h-px w-10 bg-gray-300 sm:block" />
          </div>

          <h2 className="relative font-black uppercase leading-[0.9] tracking-tight text-gray-900 text-[clamp(2.4rem,6vw,4.5rem)]">
            Opciones de Pago
            <span className="block bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Seguros y Confiables
            </span>
          </h2>

          <p className="relative mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400 sm:text-[11px]">
            02 métodos · Sin anticipos
          </p>
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
                  
                  {/* Content */}
                  <div className="relative p-4 sm:p-6">
                    {/* Icon Circle */}
                    <div className={`inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl ${method.iconBg} shadow-lg mb-3 sm:mb-4`}>
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
                  <div className={`h-1.5 sm:h-2 ${method.accentLine}`} />
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