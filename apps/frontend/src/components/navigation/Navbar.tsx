import { PersonIcon } from '@radix-ui/react-icons'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import tw from 'twin.macro'

import { useCurrentUser } from '~/contexts/currentUser'

export function Navbar() {
  const { isOnboarded } = useCurrentUser()
  return (
    <nav tw="flex h-16 w-full items-center justify-between border-b px-6">
      {isOnboarded && (
        <div tw="flex h-full space-x-6">
          <NavItem href="/">Home</NavItem>
          <NavItem href="/todos">Todos</NavItem>
          <NavItem href="/users">All Users</NavItem>
          <NavItem href="/all-todos">All Todos</NavItem>
        </div>
      )}
      {isOnboarded ? (
        <div tw="flex space-x-3">
          <NavItem href="/profile">
            <PersonIcon />
          </NavItem>
          <NavItem href="/signout">Sign Out</NavItem>
        </div>
      ) : (
        <NavItem href="/signin">Sign In</NavItem>
      )}
    </nav>
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
    <Link href={href}>
      <div css={[tw`flex h-full`, isCurrent && tw`border-b border-blue-500`]}>
        <p tw="flex cursor-pointer items-center text-gray-500 hover:text-gray-800">
          {children}
        </p>
      </div>
    </Link>
  )
}
