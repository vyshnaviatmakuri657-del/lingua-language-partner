import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        klaus: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
        },
        slate: {
          750: "#1b253b",
          850: "#111827",
          925: "#090d16",
        },
      },
      boxShadow: {
        "glow-indigo": "0 0 25px -4px rgba(99, 102, 241, 0.35)",
        "glow-teal": "0 0 25px -4px rgba(20, 184, 166, 0.35)",
        "glow-amber": "0 0 25px -4px rgba(245, 158, 11, 0.35)",
        "card-elevated": "0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)",
        "card-hover": "0 20px 40px -12px rgba(99, 102, 241, 0.22), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)",
      },
      animation: {
        "float": "float 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2.5s infinite linear",
        "gradient-x": "gradient-x 6s ease infinite",
        "wave-bar": "wave-bar 1.2s ease-in-out infinite",
        "flame": "flame 1.5s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 12px rgba(99, 102, 241, 0.4))" },
          "50%": { opacity: "0.8", filter: "drop-shadow(0 0 20px rgba(20, 184, 166, 0.6))" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "gradient-x": {
          "0%, 100%": { "background-size": "200% 200%", "background-position": "left center" },
          "50%": { "background-size": "200% 200%", "background-position": "right center" },
        },
        "wave-bar": {
          "0%, 100%": { height: "20%" },
          "50%": { height: "100%" },
        },
        flame: {
          "0%": { transform: "scale(1) rotate(-1deg)" },
          "100%": { transform: "scale(1.08) rotate(2deg)" },
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "'Noto Sans Telugu'",
          "'Noto Sans Devanagari'",
          "'Noto Sans Tamil'",
          "'Noto Sans KR'",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
