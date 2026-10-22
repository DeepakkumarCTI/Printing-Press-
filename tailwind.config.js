/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        printora: {
          white: "#FFFFFF",
          warm: "#F5F3EF",
          mustard: "#D9AD32",
          charcoal: "#38343A",
          muted: "#77716F",
          line: "#E8E4DE",
          pale: "#FBF8F1"
        }
      },
      boxShadow: {
        soft: "0 12px 35px rgba(56, 52, 58, 0.08)"
      }
    },
  },
  plugins: [],
};
