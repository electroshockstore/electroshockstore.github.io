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
        manualChunks: (id) => {
          // Vendors principales
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-core';
            }
            if (id.includes('react-router')) {
              return 'react-router';
            }
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            if (id.includes('lucide-react')) {
              return 'lucide-icons';
            }
            if (id.includes('recharts')) {
              return 'recharts';
            }
            if (id.includes('react-toastify')) {
              return 'toastify';
            }
            return 'vendor';
          }
          
          // CRÍTICO: Separar cada categoría en su propio chunk
          if (id.includes('src/data/categories/')) {
            const category = id.split('categories/')[1]?.split('.')[0];
            return category ? `category-${category}` : 'data';
          }
          
          // Separar componentes grandes
          if (id.includes('src/components/PCBuilder/')) {
            return 'pc-builder';
          }
          
          if (id.includes('src/Modules/')) {
            const module = id.split('Modules/')[1]?.split('.')[0];
            return module ? `module-${module.toLowerCase()}` : 'modules';
          }
        }
      }
    },
    minify: 'esbuild',
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    sourcemap: false,
    target: 'es2015',
    reportCompressedSize: false,
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  server: {
    port: 3000,
    open: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  }
})
