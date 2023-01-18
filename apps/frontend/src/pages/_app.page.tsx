// import 'twin.macro'

import { Auth0Provider } from '@auth0/auth0-react'
import { AppProps } from 'next/app'
import { config, TamaguiProvider } from 'ui'

import { Navbar, UrqlClientProvider } from '~/components/'
import { CurrentUserProvider } from '~/contexts/currentUser'
// import { GlobalStyles } from '~/style/GlobalStyles'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <GlobalStyles /> */}
      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ''}
        clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ''}
        audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE || ''}
        redirectUri={
          typeof window !== 'undefined' ? window.location.origin : undefined
        }
      >
        <TamaguiProvider
          config={config}
          disableInjectCSS
          defaultTheme="light"
          disableRootThemeClass
        >
          <UrqlClientProvider>
            <CurrentUserProvider>
              <Navbar />
              <Component {...pageProps} />
            </CurrentUserProvider>
          </UrqlClientProvider>
        </TamaguiProvider>
      </Auth0Provider>
      <div
        id="modal"
        // tw="max-w-xl mx-auto relative"
      />
    </>
  )
}

export default MyApp
