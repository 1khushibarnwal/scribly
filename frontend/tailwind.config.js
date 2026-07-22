import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "forest",
      {
        scribly_light: {
          primary: "#0ea968",
          "primary-content": "#ffffff",
          secondary: "#1eb854",
          accent: "#0ea968",
          neutral: "#374151",
          "base-100": "#f7f8f6",
          "base-200": "#edeee9",
          "base-300": "#dfe1db",
          "base-content": "#2b2f2b",
          info: "#3abff8",
          success: "#0ea968",
          warning: "#e8a734",
          error: "#e05252",
        },
      },
    ],
  },
};
