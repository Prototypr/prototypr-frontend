'use client'
import { NAV_OFFSET } from "@/lib/constants";
// import Meta from "../meta";
import Navbar, { HomePageNewNavBar } from "@/components/Navbar/NavbarApp";
import { PlausibleProvider } from 'next-plausible'
import { IntlProvider } from "react-intl";
import { useRouter } from 'next/navigation'
import { useMemo } from "react";
import { Inter} from 'next/font/google'
import { getCssText } from '../../stitches.config';

import '../../styles/index.scss'

import EN from "locales/en-US";
import ES from "locales/es-ES";
// import Head from "next/head";
// export default function Layout({
//   preview,
//   children,
//   activeNav,
//   seo,
//   CustomHeader = undefined,
// }) {
//   return (
//     <>
//       <Meta seo={seo} />
//       <Navbar activeNav={activeNav} />
//       <div className="bg-gray-4 overflow-hidden">
//         <main className="pt-32 md:pt-46 -mt-3 mx-auto">{children}</main>
//       </div>
//     </>
//   );
// }
const font = Inter({
  // weight: '400',
  weight: ['300','400','500','600','700','800','900'],
  subsets: ['latin'],
  display: 'swap',
})


export default function Layout({
  preview,
  children,
  sponsor,
  activeNav,
  background,
  padding,
  seo,
  navType,
  navOffset,
  navBackground,
  sessionUser
}) {
  // const { locale } = useRouter();
  const [shortLocale] = ["en"];



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
    <div className={`${font.className}`}>
       <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
    <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png"/>
    <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png"/>
    <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png"/>
    <link rel="manifest" href="favicon/site.webmanifest"/>
    <meta name="msapplication-TileColor" content="#da532c"/>
    <meta name="theme-color" content="#ffffff"/>
 
    {/* <PlausibleProvider customDomain="https://analytics.prototypr.io" selfHosted={true} domain="4.prototypr.io"> */}
    <IntlProvider 
      key={"en-US"}
      defaultLocale="en-US" locale={"en-US"} messages={messages}>
      {/* <Navbar activeNav={activeNav} /> */}
      {/* <div className="fixed w-full z-50"> */}
      <Navbar sessionUser={sessionUser} background={navBackground} navType={navType} sponsor={sponsor} maxWidth={"max-w-[1320px]"} />
      {/* </div> */}

      <div
        className={`min-h-screen overflow-hidden ${navOffset==false?'':NAV_OFFSET} ${
          padding == false ? "" : "px-3 md:px-8"
        }`}
        style={{ background: background ? background : "#fbfcff" }}
      >
        <main
          className={`mx-auto`}
          //   style={{ maxWidth: padding == false ? "" : "1200px" }}
        >
          {children}
        </main>
      </div>
      {/* <Footer /> */}
      </IntlProvider>
      {/* </PlausibleProvider> */}
    </div>
  );
}
