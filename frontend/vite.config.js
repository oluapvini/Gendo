import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Escuta em todas as interfaces (necessário pro ngrok)
    port: 5173,
    strictPort: true, // Evita que mude de porta automaticamente
    allowedHosts: true,
    cors: true
  },
})
