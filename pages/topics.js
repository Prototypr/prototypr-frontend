import Container from "@/components/container";
// import Layout from "@/components/layout";
import Layout from "@/components/new-index/layoutForIndex";
// import BreadCrumbs from "@/components/v4/layout/Breadcrumbs";

// import { useIntl } from "react-intl";
import CategoriesIconCard from "@/components/v4/card/CategoriesIconCard";
import { getPopularTopics } from "@/lib/api";
// import { Tag } from "phosphor-react";
import SectionDivider from "@/components/v4/section/SectionDivider";
import Footer from "@/components/footer";
// import TopicSpotlightSection from "@/components/v4/section/TopicSpotlightSection";
// import PopularTagsSection from "@/components/v4/section/PopularTagsSection";
// import JumboTagsSection from "@/components/v4/section/JumboTagsSection";
import JumboTagC from "@/components/v4/card/JumboTagC";
import Link from "next/link";
import DiscoverSection from "@/components/v4/section/DiscoverSectionB";
import TopicIndexSection from "@/components/v4/section/TopicIndexSection";
// import TwoColumnCards from "@/components/v4/layout/TwoColumnCardsB";
// import CategoriesIconCardLarge from "@/components/v4/card/CategoriesIconCardLarge";
import useUser from "@/lib/iron-session/useUser";
import { TOPICS_PAGE } from "@/lib/constants";
import { makeAuthorList, shuffleArray } from "@/lib/utils/postUtils";

import { getCommonQuery } from "@/lib/api";
import TagsNavRow from "@/components/v4/section/TagsNavRow";

const featuredSections = [
  {
    image: "/static/images/localization.webp",
    slug: "/posts/localization/page/1",
    class: "bg-[#017169]",
    title: "Localization",
    description:
      "Designing and building for different cultures and backgrounds.",
  },
  {
    image: "/static/images/wmpink.png",
    slug: "/posts/web-monetization/page/1",
    class: "bg-[#E281E4]",
    title: "Web Monetization",
    description: "A new way to send money on the web with micropayments.",
  },
  //   {
  //     tagline:'Inclusivity',
  //     title:'Localization',
  //     description:'Designing and building for different cultures.',
  //     image:'/static/images/localization.webp',
  //     slug:'localization'
  //   },
  // {
  //   tagline:'Funding an Open Web',
  //   title:'Web Monetization',
  //   description:'A new way to earn money on the web.',
  //   image:'/static/images/web-mon.webp',
  //   slug:'web-monetization'
  // },
  // {
  //   tagline:'Community',
  //   title:'Open Source',
  //   description:'Stories on building a better, more inclusive web.',
  //   image:'/static/images/proto_neurodiversity.webp',
  //   slug:'open-source'
  // },
];

export default function Index({
  popularTags,
  popularToolTags,
  morePopularTags,
  topicRes,
}) {
  // const intl = useIntl();
  const { user, isLoading } = useUser({
    redirectIfFound: false,
  });

  return (
    <>
      <Layout
        maxWidth={""}
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
        {/* <TopicSpotlightSection 
      tagline="Open Web"
      headingSize={'text-2xl mb-4'}/> */}
        <div className="-mt-4">
          <TagsNavRow currentPage={'topics'} />
        </div>

        <SectionDivider py="py-1" transparentLine={true} />
        {/* <Container maxWidth="max-w-[1320px]"> */}
          {TOPICS_PAGE?.map((topic, index) => {
            console.log(topic)
            console.log(topicRes[topic.slug])
            return (
              <div key={`section_${index}`}>
                <TopicIndexSection
                  title={topic.name}
                  user={user}
                  heroCardPost={topicRes[topic.slug]?.posts[0]}
                  viewablePosts={topicRes[topic.slug]?.posts?.slice(0, 3)}
                />
                <SectionDivider py="py-4" transparentLine={true} />
              </div>
            );
          })}

          {/* <div className="mt-2 rounded-xl bg-white shadow-sm p-6 md:p-10">
            <h2 className="text-lg mb-6 font-semibold">Popular topics</h2> */}
            {/* <PopularTagsSection popularTags={popularTags}/> */}
            {/* <JumboTagsSection popularTags={popularTags}/> */}
            {/* <div className="grid grid-cols-12 xs:gap-4 md:gap-6 lg:gap-6">
              {popularTags.slice(0, 12).map((topic, i) => (
                <JumboTagC
                  withBackground={true}
                  key={i}
                  index={i}
                  topic={topic}
                />
              ))}
            </div> */}
          {/* </div> */}
        {/* </Container> */}
        <SectionDivider py="py-1" transparentLine={true} />
        {/* <Container maxWidth="max-w-[1320px] pb-24 mt-1"> */}
        <Container maxWidth="max-w-[1320px] mb-8">
          <div className="rounded-xl p-3 md:p-10 shadow bg-white">
            <h2 className="text-2xl mb-3 font-semibold">All topics</h2>
            <div className="pt-4 rounded-xl grid grid-cols-1 gap-y-6 gap-x-6 md:gap-y-8 md:gap-x-8 sm:grid-cols-2 xl:grid-cols-4">
              {morePopularTags.map((topic, i) => (
                <CategoriesIconCard
                  showCount={true}
                  withBackground={true}
                  key={i}
                  index={i}
                  topic={topic}
                />
              ))}
            </div>
          </div>
        </Container>
        {/* </Container> */}

        <Container maxWidth="max-w-[1320px]">
          {/* <h2 className={`text-xl mb-6 font-medium`}>
        Featured Topics
      </h2> */}
          <div className="flex flex-col grid gap-4 md:gap-8 xl:gap-12 grid-cols-12">
            {featuredSections.map((post, i) => {
              return (
                <Link
                  className="col-span-12 lg:col-span-6"
                  href={`${post.slug}`}
                >
                  <div
                    className={`flex h-[220px] ${post.class} relative shadow-sm rounded-xl w-full flex-col justify-center overflow-hidden p-5 py-0 md:py-8 md:p-8 text-white`}
                  >
                    <img
                      src={post.image}
                      className="w-2/3 h-auto absolute right-0 -mr-20"
                    />
                    <div className="max-w-[200px] z-10 sm:max-w-[280px]">
                      <h3 className="text-2xl text-white font-medium">
                        {post.title}
                      </h3>
                      <p className="text-base text-gray-50 mt-1">
                        {post.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
        <SectionDivider transparentLine={true} />

        {/* <SectionDivider/>
       <Container maxWidth="max-w-[1320px] mt-4" >
       <h2 className="text-xl font-semibold mb-6">Top App Categories</h2>
        <div className="rounded-xl grid grid-cols-1 gap-y-6 gap-x-6 md:gap-y-8 md:gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
                {popularToolTags.map((topic, i) => (
                  <CategoriesIconCardLarge withBackground={true} key={i} index={i} topic={topic}/>
                  ))}
              </div>
        </Container> */}

        {/* <Container maxWidth="max-w-[1320px] pb-24 mt-1" >
          <div className="rounded-xl p-6 md:p-10 shadow bg-white">
          <h2 className="text-lg font-semibold">The A-Z</h2>
            <div className="pt-4 rounded-xl grid grid-cols-1 gap-y-6 gap-x-6 md:gap-y-8 md:gap-x-8 sm:grid-cols-2 xl:grid-cols-4">
                    {morePopularTags.map((topic, i) => (
                    <CategoriesIconCard showCount={false} withBackground={true} key={i} index={i} topic={topic}/>
                    ))}
                  </div>
          </div>
        </Container> */}
      </Layout>
      <Footer />
    </>
  );
}

export async function getStaticProps({ preview = null }) {
  let sort = ["featured:desc", "tier:asc", "date:desc"];
  const popularTags =
    (await getPopularTopics({ postType: "article", pageSize: 12 })) || [];
  // const popularToolTags = (await getPopularTopics({postType:'tool', pageSize:9})) || [];
  const morePopularTags =
    (await getPopularTopics({
      postType: "article",
      pageSize: 50,
      offset: 0,
    })) || [];

  // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  // let alphabetical = morePopularTags.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
  morePopularTags.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase()
      ? 1
      : b.name.toLowerCase() > a.name.toLowerCase()
      ? -1
      : 0
  );

  /**
   * get posts for each topic
   * (copied form index page)
   */
  // topic sections
  let topicRes = {};
  for (let index = 0; index < TOPICS_PAGE.length; index++) {
    const tag = TOPICS_PAGE[index].slug;
    const res =
      (await getCommonQuery(preview, [tag], "article", 12, 0, sort)) || [];

    // const topicToolsRes =
    //   (await getCommonQuery(preview, [TOPICS_PAGE[index].toolSlug], "tool", 12, 0, sort)) || [];

    //extract authors from the postss while we don't have an endpoint for it
    const authors = makeAuthorList(res);

    //shuffle so it's different each time
    shuffleArray(res.data);
    shuffleArray(authors);

    const topicData = { authors: authors, posts: res.data };
    topicRes[tag] = topicData;
  }
  /**
   * topic sections end
   */

  return {
    props: {
      popularTags,
      // popularToolTags,
      topicRes,
      morePopularTags: morePopularTags,
    },
    revalidate: 8640, //24 hrs
  };
}
