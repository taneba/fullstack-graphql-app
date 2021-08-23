interface Props {
  children: React.ReactNode
  type?: 'submit' | 'reset' | 'button'
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export function Button({
  type = 'button',
  children,
  className,
  onClick,
  disabled = false,
}: Props) {
  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
      tw="w-full rounded-full h-44px disabled:bg-placeholder"
    >
      {children}
    </button>
  )
}
