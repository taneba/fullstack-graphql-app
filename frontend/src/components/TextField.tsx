import React from 'react'
import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLElement> {
  name: string
  className?: string
}

export const TextField = React.forwardRef<HTMLInputElement, Props>(
  ({ className, ...restProps }, ref) => {
    return (
      <input
        className={className}
        {...restProps}
        value={restProps.value ?? undefined}
        ref={ref}
        tw="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-sm"
      />
    )
  }
)
