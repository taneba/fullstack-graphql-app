import tw from 'twin.macro'
import { TextareaHTMLAttributes } from 'react'
import React from 'react'

interface Props extends TextareaHTMLAttributes<HTMLElement> {
  label?: string
  className?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ name, className, ...restProps }, ref) => {
    return (
      <textarea
        {...restProps}
        value={restProps.value ?? undefined}
        tw="border rounded-lg w-full h-40 p-3"
        ref={ref}
      />
    )
  }
)
