import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import * as React from 'react'
import {
  cacheExchange,
  Client,
  createClient,
  debugExchange,
  dedupExchange,
  Exchange,
  fetchExchange,
  Provider as UrqlProvider,
} from 'urql'
import { delay, pipe, tap } from 'wonka'

const fakeSlowNetworkExchange: Exchange =
  ({ forward }) =>
  (ops$) =>
    pipe(ops$, delay(1000), forward)

const authCheckExchange: Exchange =
  ({ forward }) =>
  (ops$) =>
    pipe(
      ops$,
      forward,
      tap((result) => {
        if (result.error) {
          if (
            result.error.graphQLErrors.some(
              (err) => err?.extensions?.code === 'NOT_AUTHENTICATED'
            )
          ) {
            if (window.location.pathname !== '/signin') {
              window.location.replace('/signin')
            }
          }

          if (
            result.error.graphQLErrors.some(
              (err) => err.extensions.code === 'USER_NOT_FOUND'
            )
          ) {
            if (window.location.pathname !== '/onboarding') {
              window.location.replace('/onboarding')
            }
          }

          if (
            result.error.graphQLErrors.some(
              (err) => err?.extensions?.code === 'NOT_AUTHORIZED'
            )
          ) {
            window.alert('You do not have right access to the resource')
          }
        }
      })
    )

const exchanges = [
  dedupExchange,
  cacheExchange,
  ...(process.env.NODE_ENV !== 'test' ? [debugExchange] : []),
  authCheckExchange,
  fakeSlowNetworkExchange,
  fetchExchange,
]

export function UrqlClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0()
  const [client, setClient] = useState<Client | null>(null)

  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated) // NOTE: keep this for easy debugging

    if (isLoading) {
      return
    }

    const getTokenAndSetupUrqlClient = async () => {
      const token = isAuthenticated ? await getAccessTokenSilently() : ''
      console.log('token:', token) // NOTE: keep this for easy debugging

      setClient(
        createClient({
          url: process.env.NEXT_PUBLIC_GRAPHQL_END_POINT as string,
          exchanges: exchanges,
          requestPolicy: 'cache-first',
          fetchOptions: () => ({
            headers: {
              authorization: token ? `Bearer ${token}` : '',
            },
          }),
          suspense: true,
        })
      )
    }
    getTokenAndSetupUrqlClient()
  }, [isAuthenticated, getAccessTokenSilently, isLoading])

  return !isLoading && client ? (
    <UrqlProvider value={client}>{children}</UrqlProvider>
  ) : null
}
