import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLElement> {
  label?: string
  name: string
  isRequired?: boolean
  note?: string
  textAlign?: 'right' | 'left' | 'center'
  suffix?: string
  className?: string
  hideValidationMark?: boolean
}

export function TextField({ className, ...restProps }: Props) {
  return (
    <div className={className}>
      <input {...restProps} tw="rounded-lg w-full p-3" />
    </div>
  )
}
