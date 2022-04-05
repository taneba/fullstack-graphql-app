import { useAuth0 } from '@auth0/auth0-react'
import { useRouter } from 'next/router'
import React, { createContext, useContext, useMemo } from 'react'
import { useQuery } from 'urql'

import { Spinner } from '~/components'
import { gql } from '~/generated'

type CurrentUserModel = Omit<
  ReturnType<typeof useCurrentUserInternal>,
  'auth0Loading'
>

const CurrentUserContext = createContext<CurrentUserModel>(undefined as any)

const GetProfile = gql(/* GraphQL */ `
  query GetProfile {
    getProfile {
      __typename
      ... on User {
        id
        email
        name
        role
        __typename
      }
      ... on UserNotFound {
        message
        role
        __typename
      }
    }
  }
`)

export function useCurrentUser() {
  return useContext(CurrentUserContext)
}

function useCurrentUserInternal() {
  const { isAuthenticated, user, isLoading } = useAuth0()

  const [res, execute] = useQuery({
    query: GetProfile,
    requestPolicy: 'network-only',
    pause: !isAuthenticated,
  })

  const isOnboarded = useMemo(
    () => isAuthenticated && res.data?.getProfile?.__typename === 'User',
    [isAuthenticated, res.data?.getProfile?.__typename]
  )

  return {
    currentUser: res.data?.getProfile,
    auth0Loading: isLoading,
    isOnboarded,
    isAuthenticated,
    executeGetProfile: execute,
  }
}

export function CurrentUserProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const value = useCurrentUserInternal()
  const router = useRouter()

  const { auth0Loading, ...rest } = value

  if (auth0Loading) {
    return <Spinner global />
  }

  const { isAuthenticated, isOnboarded } = rest

  console.log('isOnboarded', isOnboarded)

  if (isAuthenticated && !isOnboarded) {
    if (router.pathname !== '/onboarding') {
      router.replace('/onboarding')
    }
  }

  return (
    <CurrentUserContext.Provider value={rest}>
      {children}
    </CurrentUserContext.Provider>
  )
}
