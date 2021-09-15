import Loader, { LoaderProps } from 'react-loader-spinner'

import { Portal } from '..'

interface Props extends Pick<LoaderProps, 'height' | 'visible'> {
  global?: boolean
}

export function Spinner({ global = false, height = 24 }: Props) {
  const Inner = (
    <Loader
      type="TailSpin"
      color="rgba(30, 58, 138)"
      height={global ? 40 : height}
    />
  )
  return global ? (
    <Portal>
      <div tw="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {Inner}
      </div>
    </Portal>
  ) : (
    Inner
  )
}
