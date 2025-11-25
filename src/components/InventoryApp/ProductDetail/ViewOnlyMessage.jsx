// Información de métodos de pago
import { Banknote, CreditCard, AlertTriangle, CheckCircle2, Wifi, Shield } from 'lucide-react';

const ViewOnlyMessage = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex p-3 sm:p-4 bg-blue-100 rounded-full mb-3 sm:mb-4">
          <CreditCard className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600" strokeWidth={2.5} />
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">
          Métodos de Pago
        </h3>
        <p className="text-sm sm:text-base text-gray-600 font-medium">
          Aceptamos las siguientes formas de pago
        </p>
      </div>

      {/* Métodos de pago */}
      <div className="space-y-4 mb-6">
        {/* Efectivo */}
        <div className="bg-white rounded-xl border-2 border-gray-200 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 p-2 bg-green-100 rounded-lg">
              <Banknote className="h-6 w-6 text-green-600" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-base text-gray-900 mb-1">
                Efectivo
              </h4>
              <p className="text-sm text-gray-600 font-medium">
                Pago en el momento de la entrega
              </p>
            </div>
          </div>
        </div>

        {/* Transferencias */}
        <div className="bg-white rounded-xl border-2 border-blue-200 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
              <CreditCard className="h-6 w-6 text-blue-600" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-base text-gray-900 mb-1">
                Transferencias
              </h4>
              <p className="text-sm text-gray-600 font-medium mb-2">
                Solo para compras mayores a <span className="font-bold text-blue-600">$100.000</span>
              </p>
              <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 rounded-lg border border-orange-200">
                <AlertTriangle className="h-4 w-4 text-orange-600 flex-shrink-0" strokeWidth={2.5} />
                <p className="text-xs font-bold text-orange-700">
                  Deben ser inmediatas. No pierdan tiempo con estafas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips de seguridad */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-gray-700" strokeWidth={2.5} />
          <h4 className="font-bold text-base text-gray-900">
            Tips de Seguridad
          </h4>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
            <p className="text-sm text-gray-700 font-medium">
              Checkear su cuenta bancaria y saldo con su banco antes de salir
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <Wifi className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
            <p className="text-sm text-gray-700 font-medium">
              Tener conexión a internet cuando salgan a retirar
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
            <p className="text-sm text-gray-700 font-medium">
              No se entrega producto sin que la transferencia se impacte realmente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOnlyMessage;
