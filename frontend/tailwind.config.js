/* eslint @typescript-eslint/no-var-requires: "off" */
const colors = require('@radix-ui/colors')

const blackA = {
  blackA1: 'rgba(0, 0, 0, 0.012)',
  blackA2: 'rgba(0, 0, 0, 0.027)',
  blackA3: 'rgba(0, 0, 0, 0.047)',
  blackA4: 'rgba(0, 0, 0, 0.071)',
  blackA5: 'rgba(0, 0, 0, 0.090)',
  blackA6: 'rgba(0, 0, 0, 0.114)',
  blackA7: 'rgba(0, 0, 0, 0.141)',
  blackA8: 'rgba(0, 0, 0, 0.220)',
  blackA9: 'rgba(0, 0, 0, 0.439)',
  blackA10: 'rgba(0, 0, 0, 0.478)',
  blackA11: 'rgba(0, 0, 0, 0.565)',
  blackA12: 'rgba(0, 0, 0, 0.910)',
}

module.exports = {
  theme: {
    fontSize: {
      '3xs': '.55rem',
      '2xs': '.65rem',
      xs: '.75rem',
      sm: '.875rem',
      tiny: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    // colors: colors,
    colors: {
      ...colors.blue,
      ...colors.violet,
      ...colors.slate,
      ...colors.blackA,
      ...colors.whiteA,
      ...colors.sky,
      ...colors.skyA,
      ...colors.red,
      ...blackA,
      placeholder: '#AFAFAF',
      white: '#FFFFFF',
      black: '#000000',
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
