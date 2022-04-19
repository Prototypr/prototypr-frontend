const { blueDark } = require("@radix-ui/colors");
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      inter: "'Inter', sans-serif;",
    },
    extend: {
      contrast: {
        110: "1.10",
        115: "1.15",
      },
      linearBorderGradients: ({ theme }) => ({
        directions: {
          // defaults to these values
          t: "to top",
          tr: "to top right",
          r: "to right",
          br: "to bottom right",
          b: "to bottom",
          bl: "to bottom left",
          l: "to left",
          tl: "to top left",
        },
        colors: {
          // defaults to {}
          red: "#f00",
          "blue-darkblue": ["#1e3a8a", "#3b82f6"],
          "red-blue": ["#f00", "#00f"],
          "blue-green": ["#0000ff", "#00FF00"],
          "red-green-blue": ["#f00", "#0f0", "#00f"],
          "black-white-with-stops": ["#000", "#000 45%", "#fff 55%", "#fff"],
        },
        background: {
          "gray-50": "#F9FAFB",
          "gray-900": "#111827",
          white: "#fff",
        },
        borders: {
          // defaults to these values (optional)
          1: "1px",
          2: "2px",
        },
      }),
      gridTemplateColumns: {
        // Simple 16 column grid
        24: "repeat(24, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-13": "span 13 / span 13",
        "span-14": "span 14 / span 14",
        "span-15": "span 15 / span 15",
        "span-16": "span 16 / span 16",
        "span-17": "span 17 / span 17",
        "span-18": "span 18 / span 18",
        "span-19": "span 19 / span 19",
        "span-20": "span 20 / span 20",
        "span-21": "span 21 / span 21",
        "span-22": "span 22 / span 22",
        "span-23": "span 23 / span 23",
        "span-24": "span 24 / span 24",
      },
      colors: {
        primary: {
          DEFAULT: "#3A5CCC",
          50: "#CCD5F2",
          100: "#BCC7EE",
          200: "#9BACE5",
          300: "#7B92DD",
          400: "#5A77D4",
          500: "#3A5CCC",
          600: "#2A47A4",
          700: "#1F3377",
          800: "#13204A",
          900: "#080D1E",
        },
        "accent-1": "#FAFAFA",
        "accent-2": "#EAEAEA",
        "accent-3": "#EEEEEE",
        "accent-7": "#333",
        "title-1": "#2B2B2B",
        "paragraph-1": "#010301",
        "gray-1": "#333333",
        "gray-2": "#4F4F4F",
        "gray-3": "#828282",
        "gray-4": "#F3F4F6",
        "gray-5": "#E0E0E0",
        "blue-1": "#2463EB",
        "neutrals-700": "#4A5568",
        "black-1": "#222222",
        success: "#0070f3",
        cyan: "#79FFE1",
      },
      spacing: {
        28: "7rem",
        "9/20": "45%",
        74: "19rem",
        46: "187px",
        100: "25rem",
        18: "4.5rem",
        65: "17rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
        s6xl: "3.43rem",
        "6.5xl": "3rem",
      },
      boxShadow: {
        small: "0 5px 10px rgba(0, 0, 0, 0.12)",
        medium: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
      animation: {
        spinner: "spinner 1.5s linear infinite",
      },
      keyframes: {
        spinner: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
      100: "100% 100%",
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwindcss-border-gradient-radius"),
  ],
};
