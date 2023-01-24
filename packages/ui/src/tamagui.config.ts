import { createTamagui, TextNonStyleProps, TextProps } from 'tamagui'
import { shorthands } from '@tamagui/shorthands'
import { themes } from '@tamagui/theme-base'
import { createMedia } from '@tamagui/react-native-media-driver'

import { animations } from './animations'
import { fontTokens, tokens } from './token'

export const config = createTamagui({
  animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    heading: fontTokens.headingFont,
    body: fontTokens.bodyFont,
  },
  themes,
  tokens,
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
  defaultProps: {
    Text: {
      fontFamily: '$body',
    },
  } as any,
})

type AppConfig = typeof config

// this will give you types for your components
// note - if using your own design system, put the package name here instead of tamagui
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}
