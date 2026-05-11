// tailwind.config.js (ESM, works with Vite + ESLint)
export default {
  // Prevent Tailwind from resetting Bootstrap’s styles
  corePlugins: { preflight: false },

  // Optional: add a prefix so Tailwind utilities never clash with Bootstrap
  // Example: use tw-bg-gray-100 instead of bg-gray-100
  prefix: 'tw-',

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
