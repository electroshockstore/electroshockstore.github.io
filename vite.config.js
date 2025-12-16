import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Optimizaciones para SEO y performance
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@nextui-org/react', 'framer-motion'],
        }
      }
    },
    // Minificación agresiva
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Optimizar chunks
    chunkSizeWarningLimit: 1000,
    // Source maps para producción (opcional, desactivar si no se necesita)
    sourcemap: false
  },
  // Optimizaciones de servidor dev
  server: {
    port: 3000,
    open: true
  },
  // Pre-bundling de dependencias
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
})
