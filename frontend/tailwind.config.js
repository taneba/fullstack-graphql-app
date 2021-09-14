/* eslint @typescript-eslint/no-var-requires: "off" */
const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    colors: {
      ...colors,
      placeholder: '#AFAFAF',
      white: colors.white,
      black: {
        a9: 'rgba(0, 0, 0, 0.44)',
        DEFAULT: '#000000',
      },
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    maxHeight: {
      0: '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      '9/10': '90%',
      full: '100%',
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        overlayShow: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        contentShow: {
          '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
          '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
    },
  },
  variants: {
    extend: {
      borderColor: ['focus-visible'],
      opacity: ['disabled'],
    },
  },
}
