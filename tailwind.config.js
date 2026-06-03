/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050505',
        charcoal: '#101010',
        gold: '#d6b15d',
        champagne: '#f3dfab',
        smoke: '#a5a5a5',
        emerald: '#36d6a3',
        cyan: '#6bd7ff',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 50px rgba(214, 177, 93, 0.18)',
        soft: '0 24px 80px rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        'luxury-radial':
          'radial-gradient(circle at 18% 12%, rgba(214, 177, 93, 0.16), transparent 30%), radial-gradient(circle at 82% 8%, rgba(54, 214, 163, 0.09), transparent 28%), linear-gradient(135deg, #050505 0%, #0d0d0d 52%, #050505 100%)',
      },
    },
  },
  plugins: [],
};
