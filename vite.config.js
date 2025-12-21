import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion'],
        }
      }
    },
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
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
