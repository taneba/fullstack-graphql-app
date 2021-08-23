/* eslint @typescript-eslint/no-var-requires: "off" */
const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    colors: {
      ...colors,
      placeholder: '#AFAFAF',
      white: '#FFFFFF',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
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
