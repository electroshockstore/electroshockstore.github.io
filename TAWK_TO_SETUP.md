# Configuración de Tawk.to Chat en Vivo

## ⚠️ IMPORTANTE: Necesitas configurar tu Property ID

El chat en vivo está configurado pero necesita tu **Property ID** y **Widget ID** de Tawk.to.

## 📋 Pasos para obtener tus IDs:

### 1. Crear cuenta en Tawk.to (si no tienes)
- Ve a https://www.tawk.to/
- Crea una cuenta gratuita
- Verifica tu email

### 2. Obtener tu Property ID y Widget ID
1. Inicia sesión en https://dashboard.tawk.to/
2. Ve a **Administration** → **Channels** → **Chat Widget**
3. Haz clic en tu sitio web
4. Busca el código de instalación que se ve así:

```javascript
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/PROPERTY_ID/WIDGET_ID';  // ← Aquí están tus IDs
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
```

### 3. Reemplazar en tu código
Abre el archivo `index.html` y busca esta línea:

```javascript
s1.src='https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
```

Reemplaza `YOUR_PROPERTY_ID` y `YOUR_WIDGET_ID` con tus valores reales.

**Ejemplo:**
```javascript
// Antes:
s1.src='https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';

// Después (con tus IDs reales):
s1.src='https://embed.tawk.to/5f8a9b1c4c3f8e1234567890/1ek2m3n4o5p6q7r8';
```

### 4. Configuración adicional en Tawk.to Dashboard

#### Personalizar el widget:
1. Ve a **Administration** → **Channels** → **Chat Widget**
2. Personaliza:
   - **Nombre del widget**: "Shock-Store Soporte"
   - **Color principal**: Verde (#10b981) para coincidir con tu marca
   - **Mensaje de bienvenida**: "¡Hola! 👋 ¿En qué podemos ayudarte hoy?"
   - **Idioma**: Español

#### Configurar horarios:
1. Ve a **Administration** → **Availability**
2. Configura tus horarios de atención
3. Mensaje fuera de horario: "Estamos fuera de línea. Déjanos tu mensaje y te responderemos pronto."

#### Agregar agentes:
1. Ve a **Administration** → **Agents**
2. Invita a tu equipo
3. Asigna roles y permisos

## ✅ Verificar que funciona

1. Guarda los cambios en `index.html`
2. Ejecuta `npm run dev` o despliega tu sitio
3. Abre tu sitio web
4. Haz clic en el botón flotante verde "Chatea con nosotros"
5. Selecciona "Chat en Vivo"
6. Deberías ver el widget de Tawk.to abrirse

## 🎨 Características implementadas

- ✅ Widget oculto por defecto (solo se muestra cuando el usuario hace clic)
- ✅ Botón flotante personalizado con tu marca
- ✅ Indicador de agente online/offline
- ✅ Mensaje inicial automático cuando se abre el chat
- ✅ Integración con Google Analytics
- ✅ Responsive (funciona en mobile y desktop)

## 🔧 Solución de problemas

### El chat no se abre
- Verifica que los IDs estén correctos
- Abre la consola del navegador (F12) y busca errores
- Verifica que no haya bloqueadores de scripts

### El indicador online/offline no funciona
- Asegúrate de tener al menos un agente conectado en el dashboard
- Verifica que el estado del agente esté en "Online"

### El mensaje inicial no se envía
- Esto es normal, el mensaje inicial es solo una sugerencia
- El usuario debe escribir y enviar el mensaje

## 📞 Contacto

Si tienes problemas con la configuración, puedes:
1. Revisar la documentación oficial: https://help.tawk.to/
2. Contactar al soporte de Tawk.to
3. Verificar que tu cuenta esté activa

---

**Nota**: Tawk.to es completamente gratuito y no tiene límite de chats. Es una excelente opción para soporte en vivo.
