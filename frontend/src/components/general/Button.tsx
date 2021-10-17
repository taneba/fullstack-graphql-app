import React from 'react'
import { styled } from 'stitches.config'
import tw, { theme } from 'twin.macro'

interface Props {
  children: React.ReactNode
  type?: 'submit' | 'reset' | 'button'
  className?: string
  primary?: boolean
  onClick?: () => void
  disabled?: boolean
}

export const Button = styled('button', {
  ...tw`px-4 py-2 rounded-lg disabled:bg-placeholder`,
  variants: {
    color: {
      violet: tw`bg-violet9 text-violet1 hover:bg-violet10`,
      gray: tw`bg-slate8 text-slate1 hover:bg-slate9`,
    },
    size: {
      small: tw`text-sm h-6 px-2`,
      large: tw`text-lg h-9 px-4`,
    },
    outlined: {
      true: tw`bg-violet1 border-2`,
    },
  },
  compoundVariants: [
    {
      color: 'violet',
      outlined: true,
      css: tw`text-violet9 border-violet9`,
    },
    {
      color: 'gray',
      outlined: true,
      css: tw`text-slate8 border-slate8`,
    },
  ],
  defaultVariants: {
    color: 'violet',
  },
})

// export const Button = React.forwardRef<HTMLButtonElement, Props>(
//   function Button(
//     {
//       type = 'button',
//       children,
//       className,
//       onClick,
//       disabled = false,
//       primary = false,
//     }: Props,
//     forwardedRef
//   ) {
//     return (
//       <button
//         type={type}
//         className={className}
//         disabled={disabled}
//         onClick={onClick}
//         tw="px-4 py-2 rounded-lg disabled:bg-placeholder"
//         css={[
//           primary &&
//             tw`
//         text-blue-900 bg-blue-100
//         `,
//         ]}
//         ref={forwardedRef}
//       >
//         {children}
//       </button>
//     )
//   }
// )
