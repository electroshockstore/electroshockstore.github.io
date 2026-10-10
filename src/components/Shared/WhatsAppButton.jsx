import { memo, useCallback, useState } from 'react';
import { trackWhatsAppClick } from '../../utils/analytics';
import PickupPointModal from './PickupPointModal';
import CTAPill from './CTAPill';
import WhatsAppIcon from './WhatsAppIcon';

const WhatsAppButton = ({ productName, product, className = "" }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);

  const sendWhatsAppMessage = useCallback((point) => {
    if (product) {
      trackWhatsAppClick(product, 'consult');
    }
    
    const phoneNumber = '5491125718382';
    const price = product?.price ? `$${product.price.toLocaleString('es-AR')}` : '';
    
    // Construir mensaje sin emojis para evitar problemas de encoding
    let message = `Hola! Vi este producto en su catalogo web:\n\n`;
    message += `Producto: ${productName}\n`;
    message += `Precio: ${price}\n`;
    
    if (point) {
      message += `\nPunto de retiro seleccionado:\n`;
      message += `${point.name} - ${point.address}\n`;
    }
    
    message += `\nNecesitaria mas informacion. Podrian ayudarme?`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Limpiar estado
    setShowModal(false);
    setSelectedPoint(null);
  }, [product, productName]);

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
        caption="Consultar por WhatsApp"
        label="Más información"
        prefix={<WhatsAppIcon className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />}
        onClick={handleOpenModal}
        className={`w-full text-sm shadow-lg sm:text-base ${className}`}
        style={{ WebkitTapHighlightColor: 'transparent', cursor: 'pointer' }}
      />

      {/* Modal de selección de punto de retiro */}
      <PickupPointModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSelectPoint={handleSelectAndSend}
        selectedPoint={selectedPoint}
        subtitle={productName}
      />
    </>
  );
};

export default memo(WhatsAppButton);
