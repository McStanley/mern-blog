import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        react: {
          50: '#ecfcff',
          100: '#cef6ff',
          200: '#a4ebfd',
          300: '#61dafb',
          400: '#1fc0f1',
          500: '#03a3d7',
          600: '#0681b4',
          700: '#0c6892',
          800: '#145576',
          900: '#154764',
          950: '#072d45',
        },
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.break-anywhere': {
          'overflow-wrap': 'anywhere',
        },
      });
    }),
  ],
} satisfies Config;
