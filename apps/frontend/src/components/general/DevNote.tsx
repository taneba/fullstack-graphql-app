import tw from 'twin.macro'

const Root = tw.div`self-center mx-auto bg-cyan-50 p-3 border-cyan-100 border-2 rounded-md`

const P = tw.p`text-xs whitespace-pre-wrap leading-relaxed`

const Pre = tw.pre`
border-gray-600 bg-gray-700 text-3xs p-2 overflow-x-scroll my-2 text-white rounded-sm
`

export const DevNote = {
  P,
  Root,
  Pre,
}
