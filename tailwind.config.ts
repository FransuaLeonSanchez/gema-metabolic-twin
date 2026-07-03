import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./screens/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "#E8EDF5",
        bg: "#F6F8FC",
        bg2: "#FFFFFF",
        card: "#FFFFFF",
        card2: "#EEF2F8",
        line: "#E3E8F1",
        txt: "#0F1B2D",
        sub: "#5B6B85",
        hint: "#93A0B5",
        brand: {
          blue: "#2563EB",
          sky: "#0284C7",
          teal: "#0D9488",
          amber: "#D97706",
          red: "#E11D48",
          purple: "#7C3AED",
          green: "#16A34A",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 8px 28px rgba(15,27,45,0.10)",
        glow: "0 0 28px rgba(37,99,235,0.20)",
        card: "0 1px 2px rgba(15,27,45,0.05), 0 12px 28px -18px rgba(15,27,45,0.22)",
        fab: "0 12px 26px -6px rgba(99,124,246,0.45)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #3D7BF6 0%, #7C5CF6 100%)",
      },
      keyframes: {
        breathe: {
          "0%,100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.03)" },
        },
        float: {
          "0%,100%": { transform: "translateY(-4px)" },
          "50%": { transform: "translateY(4px)" },
        },
        auraPulse: {
          "0%,100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.08)" },
        },
        blink: {
          "0%,92%,100%": { transform: "scaleY(1)" },
          "96%": { transform: "scaleY(0.1)" },
        },
        twinkle: {
          "0%,100%": { opacity: "0.25" },
          "50%": { opacity: "1" },
        },
        flash: {
          "0%": { opacity: "0" },
          "10%": { opacity: "0.9" },
          "100%": { opacity: "0" },
        },
        grow: {
          "0%": { transform: "scaleY(0)" },
          "100%": { transform: "scaleY(1)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        breathe: "breathe 3.4s ease-in-out infinite",
        float: "float 4.2s ease-in-out infinite",
        aura: "auraPulse 3.6s ease-in-out infinite",
        blink: "blink 4s ease-in-out infinite",
        twinkle: "twinkle 2.2s ease-in-out infinite",
        flash: "flash 0.4s ease-out",
        fadeUp: "fadeUp 320ms ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
