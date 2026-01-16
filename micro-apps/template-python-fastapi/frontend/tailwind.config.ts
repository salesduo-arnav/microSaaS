import type { Config } from "tailwindcss";
import uiPreset from '@salesduo/ui/tailwind.preset';

export default {
    presets: [uiPreset],
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{ts,tsx}",
        "./node_modules/@salesduo/ui/src/**/*.{ts,tsx}" // Include shared UI kit
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {}
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;
