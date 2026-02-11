# Solución SOLO para iOS Mobile

## Problema
iOS Safari mobile tiene parpadeos/vibraciones con:
- Framer Motion animations
- backdrop-blur
- blur effects grandes
- animate-pulse CSS

## Solución
CSS específico que SOLO afecta iOS mobile (no desktop, no Android)

## Implementación

Agregar al final de `src/Styles/Index.css`:

```css
/* ===== FIX SOLO PARA iOS MOBILE ===== */
/* Detecta iOS Y mobile (max-width: 768px) */
@supports (-webkit-touch-callout: none) {
  @media (max-width: 768px) {
    
    /* Desactivar animaciones problemáticas */
    .animate-pulse,
    .animate-float-particle-1,
    .animate-float-particle-2,
    .animate-shine,
    .animate-pulse-ring,
    .animate-accent-line {
      animation: none !important;
    }
    
    /* Reducir blur masivo */
    .blur-\[100px\],
    .blur-\[120px\] {
      filter: blur(40px) !important;
    }
    
    .blur-3xl {
      filter: blur(32px) !important;
    }
    
    .blur-2xl {
      filter: blur(20px) !important;
    }
    
    /* Desactivar backdrop-blur */
    .backdrop-blur-xl,
    .backdrop-blur-lg,
    .backdrop-blur-md,
    .backdrop-blur-sm {
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      background-color: rgba(0, 0, 0, 0.3) !important;
    }
    
    /* Desactivar transiciones en elementos con blur */
    [class*="blur-"] {
      transition: none !important;
    }
    
    /* Forzar GPU acceleration */
    * {
      -webkit-transform: translateZ(0);
      -webkit-backface-visibility: hidden;
    }
  }
}
```

## Qué hace
- SOLO afecta iOS mobile (< 768px)
- Desktop iOS: sin cambios
- Android: sin cambios  
- Desktop: sin cambios

## Qué desactiva en iOS mobile
1. Animaciones CSS problemáticas
2. Blur masivo → blur reducido
3. Backdrop-blur → background sólido
4. Transiciones en elementos con blur
5. Fuerza GPU acceleration

## Resultado
- iOS mobile: sin parpadeos, versión simplificada
- Todo lo demás: funciona normal con todas las animaciones
