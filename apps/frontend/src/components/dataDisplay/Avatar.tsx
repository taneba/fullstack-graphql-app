import * as AvatarPrimitive from '@radix-ui/react-avatar'
// export function OldAvatar({
//   name,
//   size = 'm',
// }: {
//   name: User['name']
//   size?: 's' | 'm' | 'l'
// }) {
//   const firstTwoChar = (name ?? 'NN').substring(0, 2)
//   return (
//     <AvatarPrimitive.Root
//       css={[
//         tw`inline-flex items-center justify-center align-middle overflow-hidden select-none w-11 h-11 rounded-full bg-black-a9`,
//         size === 's'
//           ? tw`w-7 h-7`
//           : size === 'l'
//           ? tw`w-20 h-20`
//           : tw`w-11 h-11`,
//       ]}
//     >
//       <AvatarPrimitive.Image tw="w-full h-full object-cover" />
//       <AvatarPrimitive.Fallback
//         css={[
//           tw`w-full h-full flex items-center justify-center bg-violet-300 border-violet-400 border-2 leading-4 font-semibold rounded-full`,
//           size === 's' ? tw`text-xs` : size === 'l' ? tw`text-lg` : tw`text-sm`,
//         ]}
//       >
//         {firstTwoChar}
//       </AvatarPrimitive.Fallback>
//     </AvatarPrimitive.Root>
//   )
// }
import { Avatar as TAvatar, SizeTokens } from 'tamagui'

// import tw from 'twin.macro'
import { User } from '~/generated/graphql'
export function Avatar({
  name,
  size,
}: {
  name: User['name']
  size?: SizeTokens
}) {
  const firstTwoChar = (name ?? 'NN').substring(0, 2)

  return (
    <TAvatar circular size={size}>
      <TAvatar.Image src="http://placekitten.com/200/300" />

      <TAvatar.Fallback bc="red" />
    </TAvatar>
  )
}
