import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Cho phép truy cập từ host
    port: 3000,       // Cổng mặc định
    watch: {
      usePolling: true // Hỗ trợ hot-reload trong Docker
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // dùng @ thay cho src
    },
  },
})
