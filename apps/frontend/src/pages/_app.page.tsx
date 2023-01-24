import '@tamagui/core/reset.css'
import '../style/reset.css'

import { Auth0Provider } from '@auth0/auth0-react'
import { Inter } from '@next/font/google'
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme'
import { AppProps } from 'next/app'
import { startTransition } from 'react'
import { config, TamaguiProvider, Theme } from 'ui'

import { Navbar, UrqlClientProvider } from '~/components/'
import { Container, ContainerLarge } from '~/components/layout/Container'
import { CurrentUserProvider } from '~/contexts/currentUser'

const inter = Inter({ subsets: ['latin'] })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ''}
        clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ''}
        audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE || ''}
        redirectUri={
          typeof window !== 'undefined' ? window.location.origin : undefined
        }
      >
        <ThemeProvider>
          <Theme name="pink">
            <UrqlClientProvider>
              <CurrentUserProvider>
                <Navbar />
                <ContainerLarge>
                  <Component {...pageProps} />
                </ContainerLarge>
              </CurrentUserProvider>
            </UrqlClientProvider>
          </Theme>
        </ThemeProvider>
      </Auth0Provider>
    </main>
  )
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useRootTheme()

  return (
    <NextThemeProvider
      onChangeTheme={(next) => {
        startTransition(() => {
          setTheme(next)
        })
      }}
    >
      <TamaguiProvider
        config={config}
        // disableInjectCSS
        defaultTheme="light"
        disableRootThemeClass
      >
        {children}
      </TamaguiProvider>
    </NextThemeProvider>
  )
}

export default MyApp
