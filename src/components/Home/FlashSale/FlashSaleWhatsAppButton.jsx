import { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { trackWhatsAppClick } from '../../../utils/analytics';
import PickupPointModal from '../../Shared/PickupPointModal';
import CTAPill from '../../Shared/CTAPill';
import WhatsAppIcon from '../../Shared/WhatsAppIcon';
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
      <CTAPill
        variant="green"
        size="sm"
        label="Lo Quiero"
        prefix={<WhatsAppIcon className="h-5 w-5 shrink-0" />}
        onClick={handleOpenModal}
        className="w-full font-sans text-[11px] font-black uppercase tracking-widest hover:brightness-110"
        style={{
          WebkitTapHighlightColor: 'transparent',
          cursor: 'pointer'
        }}
      />

      {/* Modal de selección de punto de retiro */}
      <PickupPointModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSelectPoint={handleSelectAndSend}
        selectedPoint={selectedPoint}
        subtitle={product?.name}
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
