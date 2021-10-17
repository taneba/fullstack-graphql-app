import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Cross1Icon } from '@radix-ui/react-icons'
import React from 'react'
import { styled } from 'stitches.config'
import tw from 'twin.macro'

export function Dialog({ children, ...props }: { children: React.ReactNode }) {
  return (
    <DialogPrimitive.Root {...props}>
      <StyledOverlay />
      {children}
    </DialogPrimitive.Root>
  )
}

interface Props {
  children: React.ReactNode
  title?: string
  description?: string
}

export const DialogContent = React.forwardRef<HTMLDivElement, Props>(
  function DialogContent({ children, ...props }: Props, forwardedRef) {
    return (
      <StyledContent {...props} ref={forwardedRef}>
        <StyledOverlay>おお</StyledOverlay>

        {children}
        <DialogPrimitive.Close asChild>
          <IconButton>
            <Cross1Icon />
          </IconButton>
        </DialogPrimitive.Close>
      </StyledContent>
    )
  }
)

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  ...tw`bg-blackA9 fixed inset-0 h-full w-full`,
})

const StyledContent = styled(DialogPrimitive.Content, {
  ...tw`
  bg-white rounded-md shadow-sm fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    w-10/12 max-w-md max-h-9/10 p-6 animate-contentShow focus:outline-none`,
})

const IconButton = styled('button', {
  ...tw`
  rounded-full h-6 w-6 inline-flex items-center justify-center absolute top-2.5 right-2.5
  focus:shadow-sm
  `,
})

const StyledTitle = styled(DialogPrimitive.Title, {
  ...tw`m-0 font-semibold text-lg`,
})

const StyledDescription = styled(DialogPrimitive.Description, {
  ...tw`mx-0 mt-2 mb-5 text-base text-slate9`,
})

export const DialogTitle = StyledTitle
export const DialogDescription = StyledDescription
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close
