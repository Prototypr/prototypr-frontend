import '@/styles/index.css'
import '@/styles/toolStyles.css'
import { SessionProvider } from "next-auth/react"

function App({ 
  Component, 
  pageProps:{session,...pageProps} 
}) {
  return( 
    // https://next-auth.js.org/getting-started/upgrade-v4#sessionprovider
    // `session` comes from `getServerSideProps` or `getInitialProps`.
    // Avoids flickering/session loading on first load.
    <SessionProvider session={session} refetchInterval={5 * 60}>
     <Component {...pageProps} />
    </SessionProvider>)
}

export default App
