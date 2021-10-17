import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { styled } from 'stitches.config'
import tw from 'twin.macro'

import { User } from '~/generated/graphql'

export function Avatar({
  name,
  size = 'm',
}: {
  name: User['name']
  size?: 's' | 'm' | 'l'
}) {
  const firstTwoChar = (name ?? 'NN').substring(0, 2)
  return (
    <AvatarRoot size={size}>
      <AvatarImage />
      <AvatarFallback size={size}>{firstTwoChar}</AvatarFallback>
    </AvatarRoot>
  )
}

const AvatarRoot = styled(AvatarPrimitive.Root, {
  ...tw`inline-flex items-center justify-center align-middle overflow-hidden select-none w-11 h-11 rounded-full bg-blackA12`,
  variants: {
    size: {
      s: tw`w-7 h-7`,
      m: tw`w-11 h-11`,
      l: tw`w-20 h-20`,
    },
  },
})

const AvatarFallback = styled(AvatarPrimitive.Fallback, {
  ...tw`w-full h-full flex items-center justify-center bg-violet8 border-violet9 border-2 leading-4 font-semibold rounded-full`,
  variants: {
    size: {
      s: tw`text-xs`,
      m: tw`text-sm`,
      l: tw`text-lg`,
    },
  },
})

const AvatarImage = styled(AvatarPrimitive.Image, {
  ...tw`w-full h-full object-cover`,
})
