import { purple } from '@radix-ui/colors'
import { globalCss } from 'stitches.config'
import tw, { globalStyles as baseStyles, theme } from 'twin.macro'

const customStyles = {
  html: { ...tw`h-full w-full` },
  body: {
    WebkitTapHighlightColor: purple.purple8,
    ...tw`antialiased h-full w-full`,
  },
}

export const globalStyles = () => {
  globalCss(customStyles)()
  globalCss(baseStyles as Record<any, any>)()
}
