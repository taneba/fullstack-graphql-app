import { useAuth0 } from '@auth0/auth0-react'
import { PersonIcon } from '@radix-ui/react-icons'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import tw from 'twin.macro'

import { useCurrentUser } from '~/contexts/currentUser'

export function Navbar() {
  const { isOnboarded } = useCurrentUser()
  return (
    <nav tw="w-full border-b h-16 px-6 flex justify-between items-center">
      <div tw="flex space-x-6 h-full">
        <NavItem href="/">Home</NavItem>
        <NavItem href="/todos">Todos</NavItem>
        <NavItem href="/users">All Users</NavItem>
        <NavItem href="/all-todos">All Todos</NavItem>
      </div>
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
      <div tw="flex h-full" css={isCurrent && tw`border-b border-blue-500`}>
        <p tw="hover:text-gray-800 text-gray-500 cursor-pointer flex items-center">
          {children}
        </p>
      </div>
    </Link>
  )
}
