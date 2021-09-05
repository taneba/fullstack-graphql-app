import { TextareaHTMLAttributes } from 'react'
import React from 'react'

interface Props extends TextareaHTMLAttributes<HTMLElement> {
  label?: string
  className?: string
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(
  function TextArea({ className, ...restProps }: Props, ref) {
    return (
      <textarea
        {...restProps}
        className={className}
        value={restProps.value ?? undefined}
        tw="border rounded-lg w-full h-40 p-3"
        ref={ref}
      />
    )
  }
)
