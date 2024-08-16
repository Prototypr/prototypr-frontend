"use client";
import { NAV_OFFSET } from "@/lib/constants";
// import Meta from "../meta";
import Navbar from "@/components/Navbar/NavbarApp";
// import { PlausibleProvider } from "next-plausible";
import { IntlProvider } from "react-intl";
// import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Inter } from "next/font/google";
import { getCssText } from "../../stitches.config";
import Head from "next/head";
import "../../styles/index.scss";

import EN from "locales/en-US";
import ES from "locales/es-ES";
const font = Inter({
  // weight: '400',
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

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

  // console.log(getCssText())
  return (
    <div className={`${font.className}`}>
      {/* <Head> */}

      <Head>
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html:getCssText() }}
        />
      </Head>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
    <link rel="manifest" href="/favicon/site.webmanifest"/>
    <meta name="msapplication-TileColor" content="#da532c"/>
    <meta name="theme-color" content="#ffffff"/>
      {/* </Head> */}

      {/* <PlausibleProvider customDomain="https://analytics.prototypr.io" selfHosted={true} domain="4.prototypr.io"> */}
      <IntlProvider
        key={"en-US"}
        defaultLocale="en-US"
        locale={"en-US"}
        messages={messages}
      >
        {/* <Navbar activeNav={activeNav} /> */}
        {/* <div className="fixed w-full z-50"> */}
        <Navbar
          sessionUser={sessionUser}
          background={navBackground}
          navType={'full'}
          sponsor={sponsor}
          maxWidth={"calc(100vw-24px)"}
        />
        {/* </div> */}

        <div
          className={`min-h-screen overflow-hidden`}
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
