import tw from 'twin.macro'

const Root = tw.div`self-center mx-auto bg-sky3 p-3 border-sky5 border rounded-md`

const P = tw.p`text-xs whitespace-pre-wrap leading-relaxed text-sky11`

const Pre = tw.pre`
border-slate8 bg-slate9 text-3xs p-2 overflow-x-scroll my-2 text-white rounded-sm
`

export const DevNote = {
  P,
  Root,
  Pre,
}
