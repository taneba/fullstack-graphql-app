import React from 'react'
import tw from 'twin.macro'

interface Props {
  children: React.ReactNode
  type?: 'submit' | 'reset' | 'button'
  className?: string
  primary?: boolean
  onClick?: () => void
  disabled?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  function Button(
    {
      type = 'button',
      children,
      className,
      onClick,
      disabled = false,
      primary = false,
    }: Props,
    forwardedRef
  ) {
    return (
      <button
        type={type}
        className={className}
        disabled={disabled}
        onClick={onClick}
        tw="px-4 py-2 rounded-lg disabled:bg-placeholder"
        css={[
          primary &&
            tw`
        text-blue-900 bg-blue-100
        `,
        ]}
        ref={forwardedRef}
      >
        {children}
      </button>
    )
  }
)
