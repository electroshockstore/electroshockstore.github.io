import { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { ArrowRight } from 'lucide-react';
import { trackWhatsAppClick } from '../../../utils/analytics';
import PickupPointModal from '../../Shared/PickupPointModal';
import { formatPrice } from '../../../utils/formatPrice';

/**
 * Botón de WhatsApp específico para ofertas relámpago
 * Incluye mensaje personalizado con descuento y urgencia
 */
const FlashSaleWhatsAppButton = ({ product, discountPercentage }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);

  const sendWhatsAppMessage = useCallback((point) => {
    if (product) {
      trackWhatsAppClick(product, 'flash_sale');
    }
    
    const phoneNumber = '5491125718382';
    const originalPrice = product.price;
    const discountedPrice = Math.round(originalPrice * (1 - discountPercentage / 100));
    
    // Construir mensaje específico para oferta relámpago
    let message = `🔥 OFERTA RELAMPAGO 🔥\n\n`;
    message += `Hola! Quiero aprovechar esta oferta relampago:\n\n`;
    message += `Producto: ${product.name}\n`;
    message += `Descuento: ${discountPercentage}% OFF\n`;
    message += `Precio original: ${formatPrice(originalPrice)}\n`;
    message += `Precio oferta: ${formatPrice(discountedPrice)}\n`;
    message += `Ahorro: ${formatPrice(originalPrice - discountedPrice)}\n`;
    
    if (point) {
      message += `\nPunto de retiro seleccionado:\n`;
      message += `${point.name} - ${point.address}\n`;
    }
    
    message += `\nQuiero reservar este producto antes de que termine la oferta!`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Limpiar estado
    setShowModal(false);
    setSelectedPoint(null);
  }, [product, discountPercentage]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPoint(null);
  };

  const handleSelectAndSend = (point) => {
    setSelectedPoint(point);
    // Pequeño delay para mostrar la selección antes de enviar
    setTimeout(() => {
      sendWhatsAppMessage(point);
    }, 300);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        style={{ 
          WebkitTapHighlightColor: 'transparent',
          cursor: 'pointer'
        }}
        className="bg-lime-400 text-[#09090d] border-none rounded-lg px-4 py-3 font-sans text-[11px] font-black uppercase tracking-widest w-full transition-all duration-200 hover:bg-lime-300 active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
        </svg>
        Lo Quiero
        <span className="text-base leading-none">→</span>
      </button>

      {/* Modal de selección de punto de retiro */}
      <PickupPointModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSelectPoint={handleSelectAndSend}
        selectedPoint={selectedPoint}
      />
    </>
  );
};

FlashSaleWhatsAppButton.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  discountPercentage: PropTypes.number.isRequired,
};

export default memo(FlashSaleWhatsAppButton);
