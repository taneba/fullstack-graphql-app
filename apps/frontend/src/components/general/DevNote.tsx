import { cn } from 'ui'

const P = (props: { className?: string; children: React.ReactNode }) => (
  <p
    {...props}
    className={cn(
      props?.className,
      'whitespace-pre-wrap text-xs leading-relaxed'
    )}
  />
)
const Pre = (props: { className?: string; children: React.ReactNode }) => (
  <p
    {...props}
    className={cn(
      props?.className,
      'text-3xs my-2 overflow-x-scroll rounded-sm border-gray-600 bg-gray-700 p-2 text-white'
    )}
  />
)
const Root = (props: { className?: string; children: React.ReactNode }) => (
  <p
    {...props}
    className={cn(
      props?.className,
      'mx-auto self-center rounded-md border-2 border-cyan-100 bg-cyan-50 p-3'
    )}
  />
)

export const DevNote = {
  P,
  Root,
  Pre,
}
