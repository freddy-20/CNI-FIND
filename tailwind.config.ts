import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1d4ed8",
          deep: "#0b1230",
          deep2: "#0f1b42",
          lightblue: "#eff6ff",
        },
        cameroon: {
          green: "#007a33",
          red: "#ce1126",
          yellow: "#fcd116",
        },
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(20px, -30px) scale(1.05)" },
        },
        floatSlow2: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-25px, 20px) scale(1.08)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        growBar: {
          "0%": { width: "0%" },
          "100%": { width: "var(--bar-width)" },
        },
      },
      animation: {
        "float-slow": "floatSlow 14s ease-in-out infinite",
        "float-slow2": "floatSlow2 18s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out both",
        "pulse-soft": "pulseSoft 2.4s ease-in-out infinite",
        "grow-bar": "growBar 1s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
