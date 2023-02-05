import React from 'react'
import { InputHTMLAttributes } from 'react'
import { cn } from 'ui'

interface Props extends InputHTMLAttributes<HTMLElement> {
  name: string
  className?: string
}

export const TextField = React.forwardRef<HTMLInputElement, Props>(
  function TextField({ className, ...restProps }: Props, ref) {
    return (
      <input
        className={cn(
          className,
          'w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:shadow-sm focus:outline-none'
        )}
        {...restProps}
        value={restProps.value ?? undefined}
        ref={ref}
      />
    )
  }
)
