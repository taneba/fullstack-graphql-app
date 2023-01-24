import { PersonIcon } from '@radix-ui/react-icons'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Anchor, Button, Text, useTheme, XStack } from 'ui'

import { useCurrentUser } from '~/contexts/currentUser'

export function Navbar() {
  const { isOnboarded } = useCurrentUser()

  return (
    <XStack
      width="100%"
      height={60}
      alignItems="center"
      justifyContent="space-between"
      borderBottomWidth={1}
      borderBottomColor="$gray7Light"
      px="$4"
    >
      {isOnboarded && (
        <XStack width="100%" space="$3">
          <NavItem href="/">Home</NavItem>
          <NavItem href="/todos">Todos</NavItem>
          <NavItem href="/users">All Users</NavItem>
          <NavItem href="/all-todos">All Todos</NavItem>
        </XStack>
      )}
      {isOnboarded ? (
        <XStack width="100%" space="$3">
          <NavItem href="/profile">
            <PersonIcon />
          </NavItem>
          <NavItem href="/signout">Sign Out</NavItem>
        </XStack>
      ) : (
        <NavItem href="/signin">Sign In</NavItem>
      )}
    </XStack>
  )
}

function NavItem({
  href,
  children,
}: {
  href: LinkProps['href']
  children: React.ReactNode
}) {
  const router = useRouter()

  const isCurrent = router.pathname === href

  return (
    <XStack
      borderBottomColor={isCurrent ? '$blue8Light' : undefined}
      h="100%"
      borderBottomWidth={isCurrent ? 2 : undefined}
      alignItems="center"
    >
      <Link href={href}>
        <Text textDecorationLine="none" fontFamily="$body">
          {children}
        </Text>
      </Link>
    </XStack>
  )
}
