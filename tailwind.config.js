/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#059669",
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        secondary: {
          DEFAULT: "#0b2322",
        },
        accent: {
          DEFAULT: "#fbbf24",
        },
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #059669 0%, #047857 100%)",
        "parabolic-surface":
          "radial-gradient(circle at top, rgba(20,184,166,0.22), transparent 55%), linear-gradient(145deg, #0b2322 0%, #081c1b 45%, #0c1f1f 100%)",
      },
      borderRadius: {
        "parabolic-card": "1.75rem",
      },
      boxShadow: {
        "parabolic-soft": "0 18px 45px rgba(15,23,42,0.35)",
      },
    },
  },
  plugins: [],
};

