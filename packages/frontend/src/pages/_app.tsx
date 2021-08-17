import '../styles/globals.css'
import '../styles/slick.css'
import { AppProps } from 'next/app'
import { GlobalStyles } from '../style/GlobalStyles'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <div tw="flex flex-col h-full bg-white">
        <Component {...pageProps} />
      </div>
      <div id="modal" tw="max-w-xl mx-auto relative" />
    </>
  )
}

export default MyApp
