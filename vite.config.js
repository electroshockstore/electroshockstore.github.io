import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/catalogo/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
