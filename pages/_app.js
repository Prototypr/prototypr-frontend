import {useContext, useState, useEffect, useMemo } from "react";
import "@/styles/index.scss";
import { SessionProvider } from "next-auth/react";
import "@/styles/toolStyles.css";
import { Toaster } from "react-hot-toast";
import * as Portal from "@radix-ui/react-portal";
// import { LocaleProvider, LocaleContext } from '../context/LocaleContext';
import LocaleAlert from "@/components/Locale/LocaleAlert";
import { addLocaleData, IntlProvider } from "react-intl";
import EN from "../locales/en-US";
import ES from "../locales/es-ES";
import { useRouter } from "next/router";


function App({ Component, pageProps: { session, ...pageProps } }) {
  // addLocaleData([...en, ...de])
  // const {locale} = useContext(LocaleContext)
  const { locale } = useRouter();
  const [shortLocale] = locale ? locale.split("-") : ["en"];

  const [localeAlert, setLocaleAlert] = useState(false)
  const [localeOfNavigator, setLocaleOfNavigator] = useState("")

  useEffect(()=> {
    if (navigator.language && locale && navigator.language !== locale) {
      setLocaleAlert(true)
      setLocaleOfNavigator(navigator.language)
    }
  },[])

  const messages = useMemo(() => {

    switch (shortLocale) {
      case "es":
        return ES;
      case "en":
        return EN;
      default:
        return EN;
    }
  }, [shortLocale]);

  return (
    // https://next-auth.js.org/getting-started/upgrade-v4#sessionprovider
    // `session` comes from `getServerSideProps` or `getInitialProps`.
    // Avoids flickering/session loading on first load.
      <IntlProvider 
      key={locale || "en-US"}
      defaultLocale="en-US" locale={locale || "en-US"} messages={messages}>

        <>
          <SessionProvider session={session} refetchInterval={5 * 60}>
            <Component {...pageProps} />
          </SessionProvider>
          <LocaleAlert 
            locale={localeOfNavigator} 
            open={localeAlert}
            setOpen={(flag) => setLocaleAlert(flag)} />
          <Portal.Root>
            <Toaster
              toastOptions={{
                position: "top-right",
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
      </IntlProvider>
  );
}

export default App;
