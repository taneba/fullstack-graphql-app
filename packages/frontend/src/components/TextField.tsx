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
      <input
        {...restProps}
        tw="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-sm"
      />
    </div>
  )
}
