import { globalCss } from 'stitches.config'
import tw, { globalStyles as baseStyles, theme } from 'twin.macro'

const customStyles = {
  body: {
    WebkitTapHighlightColor: theme`colors.purple.500`,
    ...tw`antialiased`,
  },
}

export const globalStyles = () => {
  globalCss(customStyles)()
  globalCss(baseStyles as Record<any, any>)()
}
