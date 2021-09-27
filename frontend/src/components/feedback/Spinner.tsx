import { SpinnerCircularFixed, SpinnerCircularFixedProps } from 'spinners-react'

import { Portal } from '..'

interface Props extends Pick<SpinnerCircularFixedProps, 'size'> {
  global?: boolean
}

export function Spinner({ global = false, size = 40 }: Props) {
  const Inner = (
    <SpinnerCircularFixed color="rgba(30, 58, 138)" size={global ? 40 : size} />
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
