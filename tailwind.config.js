module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/components/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/pages/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Georgia", "serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#0f172a",
          accent: "#2563eb",
          subtle: "#64748b",
        },
      },
      boxShadow: {
        card: "0 6px 24px rgba(15,23,42,0.08)",
      },
      borderRadius: {
        xl: "1rem",
      },
      container: {
        center: true,
        padding: "1rem",
        screens: { lg: "980px", xl: "1120px" },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
