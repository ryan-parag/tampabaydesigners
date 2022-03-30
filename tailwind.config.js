module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        light: { raw: "(prefers-color-scheme: light)" },
        dark: { raw: "(prefers-color-scheme: dark)" }
      },
      zIndex: {
        '-1': '-1',
        '-3': '-3',
        '-5': '-5',
        '-10': '-10'
       }
    }
  },
  variants: {
    extend: {
      scale: ['active']
    }
  },
  plugins: [
    function({ addBase, config }) {
      addBase({
        body: {
          color: config("theme.colors.black"),
          backgroundColor: config("theme.colors.white")
        },
        "@screen dark": {
          body: {
            color: config("theme.colors.white"),
            backgroundColor: config("theme.colors.black")
          }
        }
      });
    }
  ]
}