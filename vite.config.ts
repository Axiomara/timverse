import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 1. Mematikan sourcemap agar folder 'src' tidak muncul di tab Sources browser
    sourcemap: false,
    
    // 2. Menggunakan esbuild untuk membuang console dan debugger secara aman
    minify: 'esbuild',
  },
  // Konfigurasi tambahan untuk esbuild agar menghapus console.log
  esbuild: {
    drop: ['console', 'debugger'],
  },
})