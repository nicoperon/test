// https://tailwindcss.com/docs/configuration
module.exports = {
  content: [
    './app/**/*.php',
    './resources/**/*.{php,ts}',
    './resources/views/**/*.php',
    './public/content/themes/sage/index.php',
  ],
  theme: {
    extend: {
      colors: {}, // Extend Tailwind's default colors
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
