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
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            if (id.includes('lucide-react')) {
              return 'lucide-icons';
            }
            // IMPORTANTE: Recharts debe ir en su propio chunk para evitar dependencias circulares
            if (id.includes('recharts')) {
              return 'recharts';
            }
            return 'vendor';
          }
          
          // Separar datos de categorías en chunks individuales
          if (id.includes('src/data/categories/')) {
            const category = id.split('categories/')[1]?.split('.')[0];
            return category ? `data-${category}` : 'data';
          }
          
          // Separar componentes grandes
          if (id.includes('src/components/PCBuilder/')) {
            return 'pc-builder-components';
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
      // Ayuda con dependencias CJS como las de recharts
      transformMixedEsModules: true
    }
  },
  server: {
    port: 3000,
    open: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'recharts'],
    exclude: []
  }
})
