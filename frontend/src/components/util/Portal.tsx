import * as PortalPrimitive from '@radix-ui/react-portal'

export function Portal({ children, ...rest }: PortalPrimitive.PortalProps) {
  return <PortalPrimitive.Root {...rest}>{children}</PortalPrimitive.Root>
}
