/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "merqado-blue": {
          DEFAULT: "#0033A0", // Azul principal
          light: "#E6F0FF",
          dark: "#00227A",
        },
        "merqado-orange": {
          DEFAULT: "#F28C28", // Laranja para CTAs
          light: "#FFDDC1",
          dark: "#c2680fff",
        },
        "merqado-gray": {
          light: "#F5F5F5", // Cinza claro para fundos
          medium: "#A9A9A9", // Cinza para textos secundários
          dark: "#333333", // Cinza escuro para textos principais
        },
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "16px",
      },
    },
  },
  plugins: [],
};
