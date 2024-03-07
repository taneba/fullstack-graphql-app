/* eslint-disable @typescript-eslint/no-var-requires */
import sharedConfig from 'tailwind-config/tailwind.config.js'
import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  ...sharedConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    // include shared ui
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
    },
  },
}
