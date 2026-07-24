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
       },
      // Layered shadows in place of borders (https://jakub.kr/work/shadows):
      // a crisp 1px outline, a tight blur hugging the edge, and a soft wash.
      // Hover adds a broader fourth layer for lift. Dark mode swaps the 1px
      // outline to white — black shadows are invisible on a black page.
      // The outline layer is inset so it draws over the card's own frosted
      // background instead of compositing with the gradient orbs behind it.
      boxShadow: {
        'card': 'inset 0 0 0 1px rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06), 0 2px 4px 0 rgb(0 0 0 / 0.04)',
        'card-hover': 'inset 0 0 0 1px rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08), 0 2px 4px 0 rgb(0 0 0 / 0.06), 0 8px 16px -4px rgb(0 0 0 / 0.08)',
        'card-dark': 'inset 0 0 0 1px rgb(255 255 255 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.32), 0 2px 4px 0 rgb(0 0 0 / 0.24)',
        'card-dark-hover': 'inset 0 0 0 1px rgb(255 255 255 / 0.12), 0 1px 2px -1px rgb(0 0 0 / 0.44), 0 2px 4px 0 rgb(0 0 0 / 0.32), 0 8px 16px -4px rgb(0 0 0 / 0.4)',
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
