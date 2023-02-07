import { cn } from '../util'

export interface StackProps {
  justify?: JustifyValues
  align?: AlignValues
  space?: StackSpace
  className?: string
  children: React.ReactNode
}

type JustifyValues = 'center' | 'between' | 'start' | 'end'
type AlignValues = 'center' | 'start' | 'end' | 'baseline'

type StackSpace = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 12 | 14 | 16 | 20

const justifyValues  = {
  center: `justify-center`,
  between: `justify-between`,
  start: `justify-start`,
  end: `justify-end`,
} as const satisfies Record<JustifyValues, string>

const alignValues = {
  center: `items-center`,
  baseline: `items-baseline`,
  start: `items-start`,
  end: `items-end`,
}  as const satisfies Record<AlignValues, string>

const vSpaces = {
  0: `space-y-0`,
  1: `space-y-1`,
  2: `space-y-2`,
  3: `space-y-3`,
  4: `space-y-4`,
  5: `space-y-5`,
  6: `space-y-6`,
  7: `space-y-7`,
  8: `space-y-8`,
  9: `space-y-8`,
  10: `space-y-8`,
  12: `space-y-12`,
  14: `space-y-14`,
  16: `space-y-16`,
  20: `space-y-20`,
} as const satisfies Record<StackSpace, string>

const hSpaces = {
  0: `space-x-0`,
  1: `space-x-1`,
  2: `space-x-2`,
  3: `space-x-3`,
  4: `space-x-4`,
  5: `space-x-5`,
  6: `space-x-6`,
  7: `space-x-7`,
  8: `space-x-8`,
  9: `space-x-8`,
  10: `space-x-8`,
  12: `space-x-12`,
  14: `space-x-14`,
  16: `space-x-16`,
  20: `space-x-20`,
} as const satisfies Record<StackSpace, string>
 
const BaseStack: React.FC<StackProps & { dir: 'vertical' | 'horizontal' }> = ({
  dir,
  justify,
  align,
  space,
  className,
  ...props
}) => (
  <div
    {...props}
    className={cn(className, 'flex', {
      'flex-col': dir === 'vertical',
      [vSpaces[space ?? 0]]: dir === 'vertical' && space != null,
      [hSpaces[space ?? 0]]: dir === 'horizontal' && space != null,
      [justifyValues[justify!]]: justify != null,
      [alignValues[align!]]: align != null,
    })}
  />
)

export const HStack = (props: StackProps) => (
  <BaseStack {...props} dir="horizontal" />
)

export const VStack = (props: StackProps) => (
  <BaseStack {...props} dir="vertical" />
)
