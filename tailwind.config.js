/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    darkMode: "class",
    extend: {
      colors: {
        bothColor: "#55cc16",
        dark: {
          bgColor: "#191919",
          PrimaryColour: "#301E67",
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
        myShadow: "0px 10px 60px -3px rgba(255,255,255,0.19)",
      },
    },
  },
  daisyui: {},
  plugins: [require("daisyui")],
};
