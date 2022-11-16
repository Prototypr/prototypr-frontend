import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Container from "@/components/container";
import Layout from "@/components/new-index/layoutForIndex";

import Head from "next/head";
const Footer = dynamic(() => import('@/components/footer')) 
// const TitleBlock = dynamic(() => import("@/components/newsletter/TitleBlock"));
import { useIntl } from "react-intl";
import PayoutTable from "@/components/WebMonetization/PayoutTable/PayoutTable";

export default function WebMonetizationPayouts({}) {
  const intl = useIntl();


  return (
    <>
      <Layout>
        <Head>
          <title>
            {intl.formatMessage({ id: "index.header.title" })}
            👾.
          </title>
        </Head>
        <Container>
            <h1 className="font-bold text-2xl">Web Monetization Payouts</h1>
            <PayoutTable/>
         
        </Container>
      </Layout>
      <Footer />
    </>
  );
}