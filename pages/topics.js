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
import PopularTagsSection from "@/components/v4/section/PopularTagsSection";
import JumboTagsSection from "@/components/v4/section/JumboTagsSection";
import JumboTagB from "@/components/v4/card/JumboTagB";
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
        {/* <Container maxWidth="max-w-[1320px]" >
          <div className="bg-[#EAE9F5] relative bg-opacity-50 overflow-hidden p-6 border-gray-200 rounded-2xl">
            <div className="w-full backdrop-blur-sm backdrop-opacity-20 w-full h-full">
            <BreadCrumbs tagName={false}/>
                <div className="inline-flex my-4">
                    <Tag className="my-auto mx-auto mr-2.5 my-auto" size={24}/>
                  <h2 className="text-5xl my-auto font-bold text-gray-900 capitalize">{intl.formatMessage({ id: "topics.title" })}</h2>
                </div>
              </div>
          </div>
        </Container> */}
        {/* <SectionDivider/> */}
        {/* <Head>
        <title>{intl.formatMessage({ id: "topics.header" })}.</title>
      </Head> */}
      <Container maxWidth="max-w-[1320px]">
        <div className="mt-2 rounded-xl">
          <h2 className="text-lg mb-3 font-semibold">Most popular</h2>
          {/* <PopularTagsSection popularTags={popularTags}/> */}
            {/* <JumboTagsSection popularTags={popularTags}/> */}
            <div className="grid grid-cols-10 xs:gap-4 md:gap-6 lg:gap-6">
            {popularTags.slice(0,5).map((topic, i) => (
                    <JumboTagB withBackground={true} key={i} index={i} topic={topic}/>
                    ))}
              </div>
        </div>
      </Container>

        <SectionDivider transparentLine={true}/>
      <TopicSpotlightSection 
      tagline="Open Web"
      headingSize={'text-lg mb-4'}/>

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
          <div className="rounded-xl p-6 md:p-10 shadow bg-white">
          <h2 className="text-lg font-semibold">The A-Z</h2>
            <div className="pt-4 rounded-xl grid grid-cols-1 gap-y-6 gap-x-6 md:gap-y-8 md:gap-x-8 sm:grid-cols-2 xl:grid-cols-4">
                    {morePopularTags.map((topic, i) => (
                    <CategoriesIconCard showCount={false} withBackground={true} key={i} index={i} topic={topic}/>
                    ))}
                  </div>
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
  const morePopularTags = (await getPopularTopics({postType:'article', pageSize:30, offset:0})) || [];

  // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  // let alphabetical = morePopularTags.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
  morePopularTags.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0))



  return {
    props: { popularTags, 
      // popularToolTags, 
      morePopularTags:morePopularTags
     },
    revalidate:8640//24 hrs
  };
}
