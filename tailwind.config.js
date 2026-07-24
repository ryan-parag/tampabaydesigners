module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'media',
  theme: {
    fontFamily: {
      sans: ['Fragment-Sans', 'sans-serif'],
      serif: ['Fragment-Serif', 'serif'],
    },
    extend: {
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
        "@media (prefers-color-scheme: dark)": {
          body: {
            color: config("theme.colors.white"),
            backgroundColor: config("theme.colors.black")
          }
        }
      });
    }
  ]
}
