import 'isomorphic-unfetch'
import '@testing-library/jest-dom'

import { resetFactoryIds } from '~/mocks/factories/factory'
import { server } from '~/mocks/server'

process.env = {
  ...process.env,
  NEXT_PUBLIC_GRAPHQL_END_POINT: 'http://localhost:4000/dev/graphql',
}
interface Auth0HookReturnValue {
  isAuthenticated: boolean;
  getAccessTokenSilently: () => Promise<string>;
  isLoading: boolean;
}

jest.mock('@auth0/auth0-react', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require('react')
  return {
    Auth0Provider: ({ children }: { children: React.ReactNode }) => children,
    withAuthenticationRequired: (component: React.ComponentType) => component,
    useAuth0: (): Auth0HookReturnValue => {
      return {
        isAuthenticated: true,
        getAccessTokenSilently: React.useCallback(async () => 'TEST_TOKEN', []),
        isLoading: false,
      };
    },
  }
})

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen()
})

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  resetFactoryIds()
  server.resetHandlers()
})

// Clean up after the tests are finished.
afterAll(() => server.close())
