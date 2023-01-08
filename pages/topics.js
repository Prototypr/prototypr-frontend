import Container from "@/components/container";
// import Layout from "@/components/layout";
import Layout from "@/components/new-index/layoutForIndex";
import BreadCrumbs from "@/components/v4/layout/Breadcrumbs";

import { useIntl } from "react-intl";
import CategoriesIconCard from "@/components/v4/card/CategoriesIconCard";
import { getPopularTopics } from "@/lib/api";
import { Tag } from "phosphor-react";
import SectionDivider from "@/components/v4/section/SectionDivider";
import Footer from "@/components/footer";
import TopicSpotlightSection from "@/components/v4/section/TopicSpotlightSection";
// import CategoriesIconCardLarge from "@/components/v4/card/CategoriesIconCardLarge";


export default function Index({ popularTags,popularToolTags, morePopularTags }) {
  const intl = useIntl();

  return (
    <>
      <Layout
        maxWidth={"max-w-[1320px] search-wide"}
        seo={{
          title: "Prototypr Topics - Design, UX, UI, accessibility...",
          description:
            "Browse design topics on Prototoypr. Discover the category you want to learn about.",
          canonical: "https://prototypr.io/topics",
          url: "https://prototypr.io/topics",
        }}
        activeNav={"posts"}
      >
        <Container maxWidth="max-w-[1320px]" >
          <div className="bg-[#EAE9F5] relative bg-opacity-50 overflow-hidden p-6 border-gray-200 rounded-2xl">
            {/* <div className="z-20 relative"> */}
            <div className="w-full backdrop-blur-sm backdrop-opacity-20 w-full h-full">
            <BreadCrumbs tagName={false}/>
                <div className="inline-flex my-4">
                  {/* <div className="p w-8 h-8 my-auto mr-3 rounded-full border-gray-300 bg-white"> */}
                    <Tag className="my-auto mx-auto mr-2.5 my-auto" size={24}/>
                  {/* </div> */}
                  <h2 className="text-5xl my-auto font-bold text-gray-900 capitalize">{intl.formatMessage({ id: "topics.title" })}</h2>
                </div>
              </div>
          </div>
        </Container>
        {/* <SectionDivider/> */}
        {/* <Head>
        <title>{intl.formatMessage({ id: "topics.header" })}.</title>
      </Head> */}
       <Container maxWidth="max-w-[1320px]" >
       <h2 className="text-xl font-semibold mt-8">Most popular</h2>
        <div className="pt-6 rounded-xl grid grid-cols-1 gap-y-6 gap-x-6 md:gap-y-8 md:gap-x-8 sm:grid-cols-2 xl:grid-cols-4">
                {popularTags.map((topic, i) => (
                 <CategoriesIconCard withBackground={true} key={i} index={i} topic={topic}/>
                ))}
              </div>
        </Container>

        <SectionDivider/>
      <TopicSpotlightSection/>

        {/* <SectionDivider/>
       <Container maxWidth="max-w-[1320px] mt-4" >
       <h2 className="text-xl font-semibold mb-6">Top App Categories</h2>
        <div className="rounded-xl grid grid-cols-1 gap-y-6 gap-x-6 md:gap-y-8 md:gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
                {popularToolTags.map((topic, i) => (
                  <CategoriesIconCardLarge withBackground={true} key={i} index={i} topic={topic}/>
                  ))}
              </div>
        </Container> */}
        <SectionDivider/>
        <Container maxWidth="max-w-[1320px] pb-24 mt-1" >
       <h2 className="text-xl font-semibold">Discover more</h2>
        <div className="pt-6 rounded-xl grid grid-cols-1 gap-y-6 gap-x-6 md:gap-y-8 md:gap-x-8 sm:grid-cols-2 xl:grid-cols-4">
                {morePopularTags.map((topic, i) => (
                 <CategoriesIconCard showCount={false} withBackground={true} key={i} index={i} topic={topic}/>
                ))}
              </div>
        </Container>
      </Layout>
      <Footer/>
    </>
  );
}

export async function getStaticProps() {
  const popularTags = (await getPopularTopics({postType:'article', pageSize:8})) || [];
  // const popularToolTags = (await getPopularTopics({postType:'tool', pageSize:9})) || [];
  const morePopularTags = (await getPopularTopics({postType:'article', pageSize:16, offset:9})) || [];

  return {
    props: { popularTags, 
      // popularToolTags, 
      morePopularTags
     },
    revalidate:8640//24 hrs
  };
}
