
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0EA5E9", // Ocean Blue
          light: "#38BDF8",   // Light Blue
          dark: "#0284C7",    // Dark Blue
        },
        secondary: {
          DEFAULT: "#F8FAFC", // Light Gray/White
          dark: "#F1F5F9",    // Slightly Darker Gray
        },
        accent: {
          DEFAULT: "#F59E0B", // Golden
          light: "#FCD34D",   // Light Gold
          dark: "#D97706",    // Dark Gold
        },
        text: {
          DEFAULT: "#1E293B", // Dark Blue-Gray
          light: "#64748B",   // Medium Blue-Gray
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
