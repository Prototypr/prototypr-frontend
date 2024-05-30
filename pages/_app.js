import dynamic from "next/dynamic";
import PlausibleProvider from 'next-plausible'

import { useMemo } from "react";
// import "@/styles/index.scss";
import { SessionProvider } from "next-auth/react";
// import "@/styles/toolStyles.css";
import { SWRConfig } from 'swr'
// import { LocaleProvider, LocaleContext } from '../context/LocaleContext';
// import LocaleAlert from "@/components/Locale/LocaleAlert";
import { IntlProvider } from "react-intl";
import EN from "../locales/en-US";
import ES from "../locales/es-ES";
import { useRouter } from "next/router";
import fetchJson from '@/lib/iron-session/fetchJson'

const TopProgressBar = dynamic(() => {return import("@/components/TopProgressBar")},{ ssr: false });
const AppToaster = dynamic(() => {return import("@/components/AppToaster")},{ ssr: false });


import '../styles/index.scss'
import '../styles/toolStyles.css'
// import PageViewTracker from "@/components/PageViewTracker";
// import MakerPopover from "@/components/maker/maker";


import { Inter } from "next/font/google";
const font = Inter({
  // weight: '400',
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

function App({ Component, pageProps: { session, ...pageProps } }) {

  // addLocaleData([...en, ...de])
  // const {locale} = useContext(LocaleContext)
  const { locale } = useRouter();
  // const [shortLocale, setShortLocale] = useState(()=>{
  //   locale ? locale.split("-") : ["en"]
  // });

  // useEffect(()=>{
  //   setShortLocale(locale ? locale.split("-") : ["en"])
  // },[locale])

  const [shortLocale] = locale ? locale.split("-") : ["en"];


  // const [localeAlert, setLocaleAlert] = useState(false)
  // const [localeOfNavigator, setLocaleOfNavigator] = useState("")

  // useEffect(()=> {
  //   // if (navigator.language && locale && navigator.language !== locale && !sessionStorage.getItem("SELECTED_LOCALE")) {
  //   //   if (locales.indexOf(navigator.language) > -1) {
  //   //     setLocaleAlert(true)
  //   //     setLocaleOfNavigator(navigator.language)
  //   //   }
  //   // }
    

  //   if(typeof window !='undefined' && !window.$crisp){
  //     window.$crisp = [];
  //     window.CRISP_WEBSITE_ID = "ac6ad370-9e66-4030-97de-dfaba3301952";
  
  //     (function() {
  //       var d = document;
  //       var s = d.createElement("script");
  
  //       s.src = "https://client.crisp.chat/l.js";
  //       s.async = 1;
  //       d.getElementsByTagName("head")[0].appendChild(s);
  //     })();
  //   }
  // },[])


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
    <PlausibleProvider customDomain="https://analytics.prototypr.io" selfHosted={true} domain="4.prototypr.io">
    <IntlProvider 
      key={locale || "en-US"}
      defaultLocale="en-US" locale={locale || "en-US"} messages={messages}>
    <>
    {/* <MakerPopover/> */}
    {/* <PageViewTracker/> */}
    <TopProgressBar/>
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err)
        },
      }}
    >
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <div className={font.className}>

        <Component {...pageProps} />
        </div>
      </SessionProvider>
      </SWRConfig>
      <AppToaster/>
    </>
    </IntlProvider>
    </PlausibleProvider>
  );
}

export default App;
