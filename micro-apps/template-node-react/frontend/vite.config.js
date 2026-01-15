import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['javascript.lvh.me'],
    host: true, // Needed for Docker mapping
    port: 5173
  }
})