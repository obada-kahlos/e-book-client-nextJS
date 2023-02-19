/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    darkMode: "class",
    extend: {
      colors: {
        dark: {
          bgColor: "#474E68",
          PrimaryColour: "#25316D",
          secondaryColour: "#205295",
          headingColor: "#fff",
          paragraphColor: "rgba(255,255,2550,8)",
          spanColor: "rgba(255,255,2550,5)",
        },
        light: {
          bgColor: "#fff",
          PrimaryColour: "#6096B4",
          secondaryColour: "#93BFCF",
          headingColor: "#BDCDD6",
          paragraphColor: "#EEE9DA",
          spanColor: "rgba(0,0,0,0.5)",
        },
      },
      boxShadow: {
        myShadow: "0px 10px 60px -3px rgba(0,0,0,0.19)",
      },
    },
  },
  daisyui: {},
  plugins: [require("daisyui")],
};
