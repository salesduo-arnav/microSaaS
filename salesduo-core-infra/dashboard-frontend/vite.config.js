import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Check port 3000 to match Nginx config later
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    allowedHosts: ['app.lvh.me']
  }
})