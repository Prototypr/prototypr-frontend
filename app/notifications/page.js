// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'

import { fetchUser } from "../actions";
import Layout from "@/components/new-index/layoutForApp";
// import Layout from "../../layout";
// import { redirect } from 'next/navigation'
// import AccountPageWrapper from './pageWrapper'
import { HOME_OG_IMAGE_URL } from "@/lib/constants";
import Dashboard from "@/components/Dashboard/Dashboard";
import Navigation from "@/components/Dashboard/navigation";
import NotificationsList from "@/components/Notifications/NotificationsList";
import { getCssText } from "stitches.config";

export const metadata = {
  title: "Notifications | Prototypr",
  description: "Your notifications on Prototypr",
  image: "",
  canonical: "https://prototypr.io/notifications",
  url: "https://prototypr.io/notifications",
  openGraph: {
    url: "https://prototypr.io/notifications",
    title: "Notifications | Prototypr",
    description:
      "Your notifications on Prototypr",
    images: [{ url: HOME_OG_IMAGE_URL }],
    site_name: "Prototypr",
  },
  twitter: {
    handle: "@prototypr",
    site: "@prototypr",
    cardType: "summary_large_image",
  },
  favicon:{
    appleTouchIcon: "favicon/apple-touch-icon.png",
    favicon32: "favicon/favicon-32x32.png",
    favicon16: "favicon/favicon-16x16.png",
    siteManifest: "favicon/site.webmanifest",
    msTileColor: "#da532c",
    themeColor: "#ffffff",
  
  }
};

export default async function NotificationsPage() {
  const userData = await fetchUser();
  
  return (
    <Layout sessionUser={userData?.user?.id} background={"#fbfcff"}>
      <div className="flex flex-col overflow-y-auto pt-[96px] mx-auto w-full">
        {/* {userData?.user?.id} */}
        <div
          className="pb-20 mx-auto px-2 sm:px-6 lg:px-8 w-full"
          style={{ maxWidth: 800 }}
        >
          <div className="flex flex-row justify-between items-baseline mt-3">
            <h1 className="my-3 text-3xl font-semibold">Notifications</h1>
          </div>
          <NotificationsList />
        </div>
        {/* <AccountPageWrapper userData={userData}/> */}
      </div>
    </Layout>
  );
}
