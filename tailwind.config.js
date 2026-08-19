/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f8fafc', // slate-50
        surface: '#ffffff',
        primary: '#2563eb', // blue-600
        primaryHover: '#1d4ed8', // blue-700
        secondary: '#64748b', // slate-500
        textMain: '#0f172a', // slate-900
        textMuted: '#64748b', // slate-500
        border: '#e2e8f0', // slate-200
        success: '#16a34a', // green-600
        warning: '#d97706', // amber-600
        danger: '#dc2626', // red-600
        // Kaseya/Datto inspired
        kaseya: '#00b140', // Kaseya green
        datto: '#0055b8', // Datto blue
      }
    },
  },
  plugins: [],
}
