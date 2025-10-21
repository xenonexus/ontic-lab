/***********************
 * Tailwind Config
 ***********************/
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        inkDark: "#1C2526",
        emberDark: "#2F1A1C",
        crimson: "#A4161A",
        accent: "#FF4040",
        shadowDeep: "#4A0F12",
        edge: "#1A0F10",
        textPrimary: "#D3D7D9",
        textMuted: "#8A9498"
      },
      boxShadow: {
        glow: "0 0 24px rgba(255,255,255,0.2)",
        redGlow: "0 0 24px rgba(255,64,64,0.4)",
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255,255,255,0.2)' },
          '50%': { boxShadow: '0 0 0 8px rgba(255,255,255,0.15)' },
        },
        dna: {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '200' }
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 900ms ease-out',
        dna: 'dna 2s linear infinite',
      }
    },
  },
  safelist: [
    'ring-2', 'ring-4', 'ring-white/20', 'ring-accent/40', 'shadow-glow', 'shadow-redGlow'
  ],
  darkMode: 'class',
};
