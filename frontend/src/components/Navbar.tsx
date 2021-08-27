import { useAuth0 } from '@auth0/auth0-react'
import Link, { LinkProps } from 'next/link'
import React from 'react'

export function Navbar() {
  const { isAuthenticated } = useAuth0()
  return (
    <nav tw="w-full border-b py-3 px-4 flex justify-between">
      <ul tw="flex space-x-2">
        <li>
          <NavItem href="/">Home</NavItem>
        </li>
        <li>
          <NavItem href="/todos">Todos</NavItem>
        </li>
        <li>
          <NavItem href="/users">Users</NavItem>
        </li>
      </ul>
      {isAuthenticated ? (
        <NavItem href="/signout">Sign Out</NavItem>
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
  return (
    <Link href={href}>
      <p tw="hover:text-gray-800 text-gray-500 cursor-pointer">{children}</p>
    </Link>
  )
}
