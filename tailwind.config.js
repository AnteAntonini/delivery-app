// tailwind.config.js

module.exports = {
  content: [
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "##317AC7",
      },
    },
  },
  plugins: [],
  safelist: ["bg-primary", "text-primary"],
};
