// Card de precio destacado
const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0
  }).format(price);
};

const PriceCard = ({ price }) => {
  return (
    <div className="mb-4 sm:mb-6">
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-green-200 hover:shadow-lg transition-all">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-sm sm:text-base font-semibold text-green-700">
            Precio
          </span>
        </div>
        <div className="text-center">
          <span className="font-black text-4xl sm:text-5xl text-green-700 block">
            {formatPrice(price)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
