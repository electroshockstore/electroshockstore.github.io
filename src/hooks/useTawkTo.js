import { useEffect, useState } from 'react';

export const useTawkTo = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    // Configurar Tawk.to cuando se carga
    const configureTawk = () => {
      if (window.Tawk_API) {
        // Configurar cuando se carga
        const originalOnLoad = window.Tawk_API.onLoad;
        window.Tawk_API.onLoad = function() {
          // Ejecutar el onLoad original si existe
          if (originalOnLoad) originalOnLoad();
          
          setIsLoaded(true);
          
          // OCULTAR COMPLETAMENTE el widget flotante
          window.Tawk_API.hideWidget();
          
          // Configurar en español
          window.Tawk_API.setAttributes({
            name: 'Visitante de Shock-Store',
            email: '',
            hash: ''
          }, function(error) {
            if (error) {
              console.warn('Error configurando Tawk.to:', error);
            }
          });
        };

        // Detectar cuando hay agentes online
        window.Tawk_API.onStatusChange = function(status) {
          setIsOnline(status === 'online');
        };

        // Personalizar el widget
        window.Tawk_API.onChatMaximized = function() {
          // Analytics cuando se abre el chat
          if (window.gtag) {
            window.gtag('event', 'chat_opened', {
              event_category: 'engagement',
              event_label: 'tawk_to_chat'
            });
          }
        };
      }
    };

    // Esperar a que Tawk.to se cargue
    if (window.Tawk_API) {
      configureTawk();
    } else {
      // Polling para esperar que se cargue
      const checkTawk = setInterval(() => {
        if (window.Tawk_API) {
          configureTawk();
          clearInterval(checkTawk);
        }
      }, 500);

      // Cleanup después de 10 segundos
      setTimeout(() => {
        clearInterval(checkTawk);
      }, 10000);

      return () => clearInterval(checkTawk);
    }
  }, []);

  const openChat = (initialMessage = null) => {
    // Usar la función global personalizada que abre directamente maximizado
    if (window.openTawkChat) {
      return window.openTawkChat(initialMessage);
    }
    
    // Fallback al método tradicional
    if (window.Tawk_API && window.Tawk_API.maximize) {
      try {
        window.Tawk_API.maximize();
        
        // Enviar mensaje inicial si se proporciona
        if (initialMessage) {
          setTimeout(() => {
            if (window.Tawk_API.addEvent) {
              window.Tawk_API.addEvent({
                event: 'message',
                message: initialMessage
              });
            }
          }, 1000);
        }
        
        return true;
      } catch (error) {
        console.error('Error abriendo chat:', error);
        return false;
      }
    }
    return false;
  };

  const hideWidget = () => {
    // No hacer nada ya que el widget siempre está oculto
    return true;
  };

  const showWidget = () => {
    // No mostrar el widget flotante, solo permitir maximizado
    return false;
  };

  const sendMessage = (message) => {
    if (window.Tawk_API && window.Tawk_API.addEvent) {
      window.Tawk_API.addEvent({
        event: 'message',
        message: message
      });
    }
  };

  return {
    isLoaded,
    isOnline,
    openChat,
    hideWidget,
    showWidget,
    sendMessage
  };
};