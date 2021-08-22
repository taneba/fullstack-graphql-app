import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import * as React from 'react'
import {
  cacheExchange,
  Client,
  createClient,
  debugExchange,
  dedupExchange,
  fetchExchange,
  Provider as UrqlProvider,
} from 'urql'

const exchanges = [dedupExchange, cacheExchange, debugExchange, fetchExchange]

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
        })
      )
    }
    getTokenAndSetupUrqlClient()
  }, [isAuthenticated, getAccessTokenSilently, isLoading])

  return !isLoading && client ? (
    <UrqlProvider value={client}>{children}</UrqlProvider>
  ) : null
}
