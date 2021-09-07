import 'isomorphic-unfetch'
import '@testing-library/jest-dom/extend-expect'

import { server } from '~/mocks/server'

process.env = {
  ...process.env,
  NEXT_PUBLIC_GRAPHQL_END_POINT: 'http://localhost:4000/dev/graphql',
}

jest.mock('@auth0/auth0-react', () => {
  const React = require('react')
  return {
    Auth0Provider: ({ children }: any) => children,
    withAuthenticationRequired: (component: any) => component,
    useAuth0: () => {
      return {
        isAuthenticated: true,
        getAccessTokenSilently: React.useCallback(async () => 'TEST_TOKEN', []),
        isLoading: false,
      }
    },
  }
})

// Establish API mocking before all tests.
beforeAll(() => server.listen())

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close())
