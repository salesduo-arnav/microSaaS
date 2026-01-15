import uiPreset from '@salesduo/ui/tailwind.preset';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [uiPreset],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // IMPORTANT: Scan the shared UI library for classes
    "./node_modules/@salesduo/ui/src/**/*.{js,ts,jsx,tsx}" 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}