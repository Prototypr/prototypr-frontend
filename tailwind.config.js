const { blueDark,mauve, violet } = require("@radix-ui/colors");

const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/constants.js",
  ],
  corePlugins: {
    // due to https://github.com/tailwindlabs/tailwindcss/issues/6602 - buttons disappear
    preflight: false,
  },
  variants: {
    extend: {
      opacity: ["group-hover", "hover"],
      background: ["group-hover", "hover"],
    },
  },
  theme: {
    fontFamily: {
      inter: "'Inter', sans-serif;",
      // "noto-sans": "'Noto Sans', sans-serif;",
      // "noto-serif": "'Noto Serif', serif;",
    },
    screens: {
      'xs': '475px',
      // => @media (min-width: 640px) { ... }
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }
      '2md':'850px',
      
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
      '2lg':'1140px',

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      scale: {
        '114': '1.14',
      },
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
          blueDark,
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
          DEFAULT: "#2352BA",
          0: "#EDF3FF",
          100: "#CADBFF",
          200: "#95B4F5",
          300: "#77A1FF",
          400: "#5086FE",
          500: "#376ADC",
          600: "#2352BA",
          700: "#133C98",
          800: "#072A76",
          900: "#001A54",
        },
        neutral: {
          0: "#FFFFFF",
          100: "#FCFDFF",
          200: "#F0F2F7",
          300: "#E4E6EB",
          400: "#D0D2D6",
          500: "#B3B5BA",
          600: "#86888C",
          700: "#6D6F73",
          800: "#313336",
          900: "#1C1D1F",
        },
        success: {
          DEFAULT: "#23A159",
          100: "#F0FFF6",
          200: "#ACFFD0",
          300: "#69FFA9",
          400: "#43D481",
          500: "#23A159",
          600: "#0E6E37",
        },
        failure: {
          DEFAULT: "#C4413F",
          100: "#FFF0EF",
          200: "#FFACAA",
          300: "#F76562",
          400: "#C4413F",
          500: "#912523",
          600: "#5E1110",
        },
        warning: {
          DEFAULT: "#D5A740",
          100: "#FEF9EE",
          200: "#FEE2A7",
          300: "#FECB60",
          400: "#D5A740",
          500: "#A37B26",
          600: "#705212",
        },
        blue: {
          default: "#2352BA",
          dark: "#11337A",
          light: "#F7F9FC",
          hover: "#4178F0",
          gradient:
            "linear-gradient(180deg, #4178F0 5.47%, #2352BA 51.56%, #1C3F8A 100%)",
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
        sm: "0 1px 2px rgba(0, 0, 0, 0.07)",
        md: "0px 2px 6px rgba(0, 0, 0, 0.1)",
        lg: "0px 5px 14px rgba(0, 0, 0, 0.05), 0px 2px 6px rgba(0, 0, 0, 0.05)",
        xl: "0px 24px 40px rgba(0, 0, 0, 0.03), 0px 8px 24px rgba(0, 0, 0, 0.05)",
        xxl: "0px 60px 100px rgba(0, 0, 0, 0.07), 0px 20px 40px rgba(0, 0, 0, 0.0417275)",
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
    require("@tailwindcss/line-clamp"),
  ],
};
