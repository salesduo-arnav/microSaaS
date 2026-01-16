import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        server: {
            host: true, // Needed for Docker mapping
            port: 5173,
            allowedHosts: [env.VITE_APP_DOMAIN || 'javascript.lvh.me']
        },
        plugins: [react()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
                react: path.resolve(__dirname, "./node_modules/react"),
                "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
                "react-router-dom": path.resolve(__dirname, "./node_modules/react-router-dom"),
            },
            dedupe: ['react', 'react-dom', 'react-router-dom'],
        },
    };
});
