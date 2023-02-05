import { TextareaHTMLAttributes } from 'react'
import React from 'react'
import { cn } from 'ui'

interface Props extends TextareaHTMLAttributes<HTMLElement> {
  label?: string
  className?: string
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(
  function TextArea({ className, ...restProps }: Props, ref) {
    return (
      <textarea
        {...restProps}
        className={cn(className, 'h-40 w-full rounded-lg border p-3')}
        value={restProps.value ?? undefined}
        ref={ref}
      />
    )
  }
)
