import tw from 'twin.macro'
import { TextareaHTMLAttributes } from 'react'

interface Props extends TextareaHTMLAttributes<HTMLElement> {
  label?: string
  name: string
  isRequired?: boolean
  topNote?: string
  bottomNote?: string
  className?: string
}

export function Textarea({
  label,
  topNote,
  bottomNote,
  name,
  isRequired,
  className,
  ...restProps
}: Props) {
  return <textarea {...restProps} tw="border rounded-lg w-full h-40 p-3" />
}
