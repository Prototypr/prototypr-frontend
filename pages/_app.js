import "@/styles/index.scss";
import { SessionProvider } from "next-auth/react";
import "@/styles/toolStyles.css";
import { Toaster } from "react-hot-toast";
import * as Portal from "@radix-ui/react-portal";
import { SWRConfig } from 'swr'
import fetchJson from '@/lib/iron-session/fetchJson'

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    // https://next-auth.js.org/getting-started/upgrade-v4#sessionprovider
    // `session` comes from `getServerSideProps` or `getInitialProps`.
    // Avoids flickering/session loading on first load.
    <>
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err)
        },
      }}
    >
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <Component {...pageProps} />
      </SessionProvider>
      </SWRConfig>
      <Portal.Root>
        <Toaster
          toastOptions={{
            position: "top-rigcenterht",
            className: "toastOverride",

            success: {
              iconTheme: {
                primary: "#10B981",
                secondary: "white",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "white",
              },
            },
          }}
        />
      </Portal.Root>
    </>
  );
}

export default App;
