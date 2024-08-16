// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'

import { fetchUser } from "../../actions";
import Layout from "@/components/new-index/layoutForApp";
// import { redirect } from 'next/navigation'
// import AccountPageWrapper from './pageWrapper'
import { HOME_OG_IMAGE_URL } from "@/lib/constants";
import Dashboard from "@/components/Dashboard/Dashboard";
import Navigation from "@/components/Dashboard/navigation";

export const metadata = {
  title: "Dashboard | Prototypr",
  description: "Edit your posts, drafts, and tools on Prototypr",
  image: "",
  canonical: "https://prototypr.io",
  url: "https://prototypr.io",
  openGraph: {
    url: "https://prototypr.io",
    title: "Prototypr: Design, UX, Front-end development, and beyond.",
    description:
      "'Discover UX prototyping tools for designing mobile and desktop experiences. From UX design to front end development - find the right tool for the job.",
    images: [{ url: HOME_OG_IMAGE_URL }],
    site_name: "Prototypr",
  },
  twitter: {
    handle: "@prototypr",
    site: "@prototypr",
    cardType: "summary_large_image",
  },
};

export default async function AccountPage() {
  const userData = await fetchUser();
  

  return (
    <Layout sessionUser={userData?.user?.id} background={"#fbfcff"}>
      <div className="flex flex-col overflow-y-auto mx-auto w-full">
        {/* {userData?.user?.id} */}
        <div
          className="pb-20 mx-auto px-2 sm:px-6 lg:px-8 w-full"
          style={{ maxWidth: 840 }}
        >
          <div className="flex flex-row justify-between items-baseline mt-3">
            <h1 className="my-3 text-3xl font-semibold">Your posts</h1>
          </div>
          <Navigation activeTab={2} />
          {/* set post type to empty so it gets tools too */}
          <Dashboard
            currentTab="publish"
            postStatus={["publish"]}
            postType=""
          />
        </div>
        {/* <AccountPageWrapper userData={userData}/> */}
      </div>
    </Layout>
  );
}
