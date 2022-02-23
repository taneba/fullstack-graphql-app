import { useAuth0 } from '@auth0/auth0-react'
import { PersonIcon } from '@radix-ui/react-icons'
import Link, { LinkProps } from 'next/link'
import React from 'react'

export function Navbar() {
  const { isAuthenticated } = useAuth0()
  return (
    <nav tw="w-full border-b py-3 px-4 flex justify-between">
      <ul tw="flex space-x-4">
        <li>
          <NavItem href="/">Home</NavItem>
        </li>
        <li>
          <NavItem href="/todos">Todos</NavItem>
        </li>
        <li>
          <NavItem href="/users">All Users</NavItem>
        </li>
        <li>
          <NavItem href="/all-todos">All Todos</NavItem>
        </li>
      </ul>
      {isAuthenticated ? (
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
  return (
    <Link href={href}>
      <p tw="hover:text-gray-800 text-gray-500 cursor-pointer flex items-center">
        {children}
      </p>
    </Link>
  )
}
