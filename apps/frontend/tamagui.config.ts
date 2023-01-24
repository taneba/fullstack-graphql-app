/* eslint-disable @typescript-eslint/no-empty-interface */
import { config } from 'ui'
type AppConfig = typeof config

// this will give you types for your components
// note - if using your own design system, put the package name here instead of tamagui
declare module 'ui' {
  interface TamaguiCustomConfig extends AppConfig {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  type ThemeFallbackValue = {}
}

export default config
