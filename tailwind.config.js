// tailwind.config.js - Sistema de Diseño Coherente + OPTIMIZADO

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  // OPTIMIZACIÓN: Purge agresivo en producción
  safelist: [
    // Clases dinámicas que necesitamos mantener
    'animate-spin',
    'animate-pulse',
    'animate-bounce',
    // Animaciones custom
    'animate-shine',
    'animate-pulse-ring',
    'animate-wiggle',
    'animate-arrow-bounce',
    'animate-accent-line',
    'animate-float-particle-1',
    'animate-float-particle-2',
    'animate-bot-pulse',
    'animate-bot-glow',
    'animate-arrow-wiggle',
    'animate-button-float',
    'animate-button-glow',
    // Clases de transición
    'page-transition',
    'product-card-enter',
    'pc-builder-card-enter',
    'floating-chat-enter',
    'chat-options-enter',
    'header-bot-enter',
    'search-results-enter',
    'modal-scale-enter',
    'carousel-image-transition',
    'carousel-content-transition',
    'carousel-point-transition'
  ],
  theme: {
    extend: {
      // Tipografía coherente
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h1': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h2': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '500' }],
        'body': ['1rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
        'caption': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '400' }],
        'small': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '400' }],
      },
      
      // Espaciado coherente basado en múltiplos de 4
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      
      // Bordes redondeados - Estilo Apple High-Round
      borderRadius: {
        'xs': '0.25rem',    // 4px
        'sm': '0.5rem',     // 8px
        'md': '0.75rem',    // 12px
        'lg': '1rem',       // 16px - Cards pequeñas
        'xl': '1.25rem',    // 20px - Cards de producto, Sidebar (Nivel I)
        '2xl': '1.5rem',    // 24px - Dashboard Cards grandes (Nivel I+)
        '3xl': '2rem',      // 32px
        'full': '9999px',   // Píldora total - Botones, Filtros, Inputs (Nivel II)
      },
      
      // Sistema de sombras - Estilo Apple (elevación fuerte)
      boxShadow: {
        // Sombras Apple High-Round
        'card': '0 8px 20px rgba(0, 0, 0, 0.1)',            // Cards en reposo - más fuerte
        'card-hover': '0 12px 30px rgba(0, 0, 0, 0.15)',    // Cards hover - elevación clara
        'button': '0 4px 12px rgba(37, 99, 235, 0.25)',     // Botones primarios
        'button-hover': '0 6px 16px rgba(37, 99, 235, 0.35)', // Botones hover
        'widget': '0 10px 25px rgba(0, 0, 0, 0.12)',        // Dashboard widgets
        'widget-hover': '0 15px 35px rgba(0, 0, 0, 0.18)',  // Dashboard widgets hover
        
        // Sombras legacy (mantener compatibilidad)
        'float-sm': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'float': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'float-lg': '0 16px 40px rgba(0, 0, 0, 0.16)',
        'float-xl': '0 24px 64px rgba(0, 0, 0, 0.20)',
        'inner-soft': 'inset 0 2px 4px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 20px rgba(0, 122, 255, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 122, 255, 0.4)',
      },
      
      // Gradientes personalizados
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #003B99 0%, #7D2FE6 50%, #E82387 100%)',
        'gradient-brand-hover': 'linear-gradient(135deg, #002B79 0%, #6D1FD6 50%, #D81377 100%)',
      },
      
      // Paleta de colores coherente
      colors: {
        // Colores de superficie más contrastantes
        surface: {
          25: '#FDFDFD',   // Blanco casi puro para cards
          50: '#F8F9FA',   // Fondo principal más claro
          100: '#F1F3F4',  // Fondo secundario
          200: '#E8EAED',  // Bordes suaves
          300: '#DADCE0',  // Separadores
          400: '#BDC1C6',  // Elementos deshabilitados
          500: '#9AA0A6',  // Texto secundario
          600: '#80868B',  // Texto terciario
          700: '#5F6368',  // Texto principal
          800: '#3C4043',  // Texto enfático
          900: '#202124',  // Texto máximo contraste
        },
        
        // Fondo más oscuro para mejor contraste
        background: {
          primary: '#F0F2F5',    // Fondo principal más oscuro
          secondary: '#E4E6EA',  // Fondo secundario
          tertiary: '#FFFFFF',   // Fondo de cards
        },
        
        // Color primario (azul sistema)
        primary: {
          50: '#EBF8FF',
          100: '#BEE3F8',
          200: '#90CDF4',
          300: '#63B3ED',
          400: '#4299E1',
          500: '#007AFF',  // Color principal
          600: '#0056CC',
          700: '#2C5282',
          800: '#2A4365',
          900: '#1A365D',
        },
        
        // Colores semánticos
        success: {
          50: '#F0FDF4',
          500: '#34C759',
          600: '#16A34A',
        },
        warning: {
          50: '#FFFBEB',
          500: '#FF9500',
          600: '#D97706',
        },
        error: {
          50: '#FEF2F2',
          500: '#FF3B30',
          600: '#DC2626',
        },
      },
      // Animaciones coherentes
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.3s ease-out',
        'slideIn': 'slideIn 0.4s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      
      // Transiciones coherentes - Sistema de Diseño
      transitionDuration: {
        'fast': '200ms',      // Transiciones rápidas (hover, focus)
        'normal': '300ms',    // Transiciones normales (cards, modales)
        'slow': '500ms',      // Transiciones lentas (animaciones complejas)
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      
      // Backdrop blur coherente
      backdropBlur: {
        'soft': '8px',
        'medium': '16px',
        'strong': '24px',
      },
    },
  },
  darkMode: "class",
  plugins: [
    function({ addBase, addUtilities }) {
      addBase({
        // Reset y base coherente
        '*': {
          'box-sizing': 'border-box',
        },
        'html': {
          'scroll-behavior': 'smooth',
        },
        'body': {
          'font-family': 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          'font-feature-settings': '"cv02", "cv03", "cv04", "cv11"',
          'color': '#212121',
          'background-color': '#FAFAFA',
        },
        
        // Scrollbar coherente
        '::-webkit-scrollbar': {
          width: '6px',
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#E0E0E0',
          borderRadius: '3px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#BDBDBD',
        },
      });
      
      addUtilities({
        // ===== SISTEMA DE DISEÑO APPLE HIGH-ROUND =====
        
        // Card estándar - Estilo Apple
        '.design-card': {
          'background-color': '#FFFFFF',
          'border': 'none',
          'border-radius': '1.25rem',  // 20px - Alto redondeo
          'box-shadow': '0 8px 20px rgba(0, 0, 0, 0.1)',
          'padding': '1.25rem',        // 20px - Espaciado generoso
          'transition': 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        },
        
        '.design-card:hover': {
          'box-shadow': '0 12px 30px rgba(0, 0, 0, 0.15)',
          'transform': 'translateY(-3px)',
        },
        
        // Widget de Dashboard - Redondeo extra alto
        '.design-widget': {
          'background-color': '#FFFFFF',
          'border': 'none',
          'border-radius': '1.5rem',   // 24px - Widgets grandes
          'box-shadow': '0 10px 25px rgba(0, 0, 0, 0.12)',
          'padding': '1.5rem',         // 24px
          'transition': 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        },
        
        '.design-widget:hover': {
          'box-shadow': '0 15px 35px rgba(0, 0, 0, 0.18)',
          'transform': 'translateY(-3px)',
        },
        
        // Componentes base flotantes (legacy - mantener compatibilidad)
        '.card-float': {
          'background-color': '#FFFFFF',
          'border': '1px solid rgba(218, 220, 224, 0.6)',
          'border-radius': '1.5rem',
          'box-shadow': '0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)',
        },
        
        '.card-float-hover': {
          'transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        
        '.card-float-hover:hover': {
          'transform': 'translateY(-4px)',
          'box-shadow': '0 16px 40px rgba(0, 0, 0, 0.16), 0 8px 16px rgba(0, 0, 0, 0.12)',
        },
        
        '.glass-surface': {
          'background-color': 'rgba(255, 255, 255, 0.95)',
          'backdrop-filter': 'blur(20px)',
          'border': '1px solid rgba(218, 220, 224, 0.8)',
        },
        
        '.text-hierarchy-1': {
          'font-size': '2.5rem',
          'line-height': '1.2',
          'font-weight': '600',
          'letter-spacing': '-0.01em',
          'color': '#212121',
        },
        
        '.text-hierarchy-2': {
          'font-size': '2rem',
          'line-height': '1.3',
          'font-weight': '600',
          'letter-spacing': '-0.01em',
          'color': '#212121',
        },
        
        '.text-hierarchy-3': {
          'font-size': '1.5rem',
          'line-height': '1.4',
          'font-weight': '500',
          'color': '#424242',
        },
        
        '.text-body': {
          'font-size': '1rem',
          'line-height': '1.6',
          'color': '#616161',
        },
        
        '.text-caption': {
          'font-size': '0.875rem',
          'line-height': '1.5',
          'color': '#757575',
        },
        
        // ===== SISTEMA DE TÍTULOS COMPLETO =====
        
        // H1 - Títulos principales con gradiente (ej: "Gestión de Stock", "Movimientos")
        '.title-h1': {
          'font-size': '2.5rem',
          'line-height': '1.2',
          'font-weight': '700',
          'letter-spacing': '-0.01em',
          'background': 'linear-gradient(135deg, #003B99 0%, #7D2FE6 50%, #E82387 100%)',
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'color': 'transparent',
        },
        
        // H2 - Subtítulos importantes (ej: "Historial de Movimientos", "Total Productos")
        '.title-h2': {
          'font-size': '1.75rem',
          'line-height': '1.3',
          'font-weight': '600',
          'letter-spacing': '-0.01em',
          'color': '#1f2937',
        },
        
        // H3 - Secciones (ej: títulos de cards, secciones de tabla)
        '.title-h3': {
          'font-size': '1.25rem',
          'line-height': '1.4',
          'font-weight': '600',
          'letter-spacing': '0',
          'color': '#374151',
        },
        
        // H4 - Subsecciones menores
        '.title-h4': {
          'font-size': '1.125rem',
          'line-height': '1.5',
          'font-weight': '500',
          'letter-spacing': '0',
          'color': '#4b5563',
        },
        
        // ===== SISTEMA DE BOTONES APPLE HIGH-ROUND =====
        
        // Botón primario (acción principal) - Píldora total
        '.design-btn-primary': {
          'background-color': '#2563EB',  // blue-600
          'color': '#ffffff',
          'padding': '0.75rem 1.5rem',    // py-3 px-6 - Más generoso
          'border-radius': '9999px',      // Píldora total
          'font-weight': '600',
          'font-size': '0.875rem',
          'display': 'inline-flex',
          'align-items': 'center',
          'gap': '0.5rem',
          'box-shadow': '0 4px 12px rgba(37, 99, 235, 0.25)',
          'transition': 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          'border': 'none',
          'cursor': 'pointer',
        },
        
        '.design-btn-primary:hover': {
          'background-color': '#1D4ED8',  // blue-700
          'box-shadow': '0 6px 16px rgba(37, 99, 235, 0.35)',
          'transform': 'translateY(-1px)',
        },
        
        // Botón secundario (acción secundaria) - Píldora total
        '.design-btn-secondary': {
          'background-color': '#FFFFFF',
          'color': '#374151',             // gray-700
          'padding': '0.75rem 1.5rem',
          'border-radius': '9999px',      // Píldora total
          'font-weight': '500',
          'font-size': '0.875rem',
          'display': 'inline-flex',
          'align-items': 'center',
          'gap': '0.5rem',
          'border': '1px solid #E5E7EB',  // gray-200
          'box-shadow': '0 2px 8px rgba(0, 0, 0, 0.06)',
          'transition': 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          'cursor': 'pointer',
        },
        
        '.design-btn-secondary:hover': {
          'background-color': '#F9FAFB',  // gray-50
          'box-shadow': '0 4px 12px rgba(0, 0, 0, 0.1)',
          'transform': 'translateY(-1px)',
        },
        
        // Botón deshabilitado - Píldora total
        '.design-btn-disabled': {
          'background-color': '#F3F4F6',  // gray-100
          'color': '#9CA3AF',             // gray-400
          'padding': '0.75rem 1.5rem',
          'border-radius': '9999px',      // Píldora total
          'font-weight': '600',
          'font-size': '0.875rem',
          'border': 'none',
          'cursor': 'not-allowed',
        },
        
        // ===== BOTONES CON GRADIENTE (LEGACY) =====
        
        // Botón principal con gradiente
        '.btn-primary': {
          'background': 'linear-gradient(135deg, #003B99 0%, #7D2FE6 50%, #E82387 100%)',
          'color': '#ffffff',
          'padding': '0.75rem 2rem',
          'border-radius': '1rem',
          'font-weight': '600',
          'font-size': '0.875rem',
          'display': 'inline-flex',
          'align-items': 'center',
          'gap': '0.5rem',
          'box-shadow': '0 4px 12px rgba(125, 47, 230, 0.3)',
          'transition': 'all 0.3s ease',
          'border': 'none',
          'cursor': 'pointer',
        },
        
        '.btn-primary:hover': {
          'background': 'linear-gradient(135deg, #002B79 0%, #6D1FD6 50%, #D81377 100%)',
          'transform': 'translateY(-2px)',
          'box-shadow': '0 8px 25px rgba(125, 47, 230, 0.4)',
        },
        
        // Botón secundario (legacy)
        '.btn-secondary': {
          'background': '#ffffff',
          'color': '#374151',
          'padding': '0.75rem 2rem',
          'border-radius': '1rem',
          'font-weight': '500',
          'font-size': '0.875rem',
          'display': 'inline-flex',
          'align-items': 'center',
          'gap': '0.5rem',
          'box-shadow': '0 2px 8px rgba(0, 0, 0, 0.1)',
          'border': '1px solid #e5e7eb',
          'transition': 'all 0.3s ease',
          'cursor': 'pointer',
        },
        
        '.btn-secondary:hover': {
          'background': '#f9fafb',
          'transform': 'translateY(-1px)',
          'box-shadow': '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
        
        // ===== SISTEMA DE ICONOS CON GRADIENTE =====
        
        // Contenedor de icono con gradiente
        '.icon-gradient': {
          'width': '4rem',
          'height': '4rem',
          'background': 'linear-gradient(135deg, #003B99 0%, #7D2FE6 50%, #E82387 100%)',
          'border-radius': '1rem',
          'display': 'flex',
          'align-items': 'center',
          'justify-content': 'center',
          'box-shadow': '0 8px 24px rgba(125, 47, 230, 0.3)',
        },
        
        // Icono pequeño con gradiente
        '.icon-gradient-sm': {
          'width': '2.5rem',
          'height': '2.5rem',
          'background': 'linear-gradient(135deg, #003B99 0%, #7D2FE6 50%, #E82387 100%)',
          'border-radius': '0.75rem',
          'display': 'flex',
          'align-items': 'center',
          'justify-content': 'center',
          'box-shadow': '0 4px 12px rgba(125, 47, 230, 0.25)',
        },
        
        // ===== PASTILLAS DE ESTADO APPLE HIGH-ROUND =====
        
        // Disponible (verde profesional) - Píldora total
        '.design-badge-available': {
          'background-color': '#ECFDF5',  // emerald-50
          'color': '#047857',             // emerald-700
          'border': 'none',
          'padding': '0.5rem 1rem',
          'border-radius': '9999px',      // Píldora total
          'font-weight': '600',
          'font-size': '0.75rem',
          'display': 'inline-flex',
          'align-items': 'center',
          'gap': '0.375rem',
          'box-shadow': '0 2px 6px rgba(16, 185, 129, 0.15)',
        },
        
        // Stock Bajo (naranja corporativo) - Píldora total
        '.design-badge-low': {
          'background-color': '#FFF7ED',  // orange-50
          'color': '#C2410C',             // orange-700
          'border': 'none',
          'padding': '0.5rem 1rem',
          'border-radius': '9999px',      // Píldora total
          'font-weight': '600',
          'font-size': '0.75rem',
          'display': 'inline-flex',
          'align-items': 'center',
          'gap': '0.375rem',
          'box-shadow': '0 2px 6px rgba(249, 115, 22, 0.15)',
        },
        
        // Sin Stock (rojo suave) - Píldora total
        '.design-badge-out': {
          'background-color': '#FEF2F2',  // red-50
          'color': '#B91C1C',             // red-700
          'border': 'none',
          'padding': '0.5rem 1rem',
          'border-radius': '9999px',      // Píldora total
          'font-weight': '600',
          'font-size': '0.75rem',
          'display': 'inline-flex',
          'align-items': 'center',
          'gap': '0.375rem',
          'box-shadow': '0 2px 6px rgba(239, 68, 68, 0.15)',
        },
        
        // ===== ELEMENTOS DESTACADOS =====
        
        // Texto destacado con gradiente (para nombres importantes)
        '.text-highlight': {
          'background': 'linear-gradient(135deg, #003B99 0%, #7D2FE6 50%, #E82387 100%)',
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'color': 'transparent',
          'font-weight': '600',
        },
        
        // Badge/chip con gradiente
        '.badge-gradient': {
          'background': 'linear-gradient(135deg, #003B99 0%, #7D2FE6 50%, #E82387 100%)',
          'color': '#ffffff',
          'padding': '0.25rem 0.75rem',
          'border-radius': '9999px',
          'font-size': '0.75rem',
          'font-weight': '500',
          'display': 'inline-flex',
          'align-items': 'center',
        },
        
        // Reducir animaciones si el usuario prefiere menos movimiento
        '@media (prefers-reduced-motion: reduce)': {
          '*': {
            'animation-duration': '0.01ms !important',
            'animation-iteration-count': '1 !important',
            'transition-duration': '0.01ms !important',
          },
        },
      });
    }
  ]
}
