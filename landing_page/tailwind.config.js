module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', "./src/subframe/**/*.{tsx,ts,js,jsx}"],
  // theme: {
  //   extend: {
  //     colors: {
  //       dark: {
  //         primary: '#000000',
  //         secondary: '#111111',
  //         accent: '#6366F1', // Indigo instead of teal
  //       },
  //       text: {
  //         primary: '#F9FAFB',
  //         secondary: '#94A3B8', // Light gray
  //       },
  //       accent: {
  //         light: '#818CF8',
  //         DEFAULT: '#6366F1',
  //         dark: '#4F46E5', // Darker indigo for active states
  //       }
  //     },
  //   },
  // },
  plugins: [],
  presets: [require("./src/subframe/tailwind.config.js")]
};
