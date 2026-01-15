import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      allowedHosts: [env.VITE_APP_DOMAIN || 'javascript.lvh.me'],
      host: true, // Needed for Docker mapping
      port: 5173
    }
  };
})