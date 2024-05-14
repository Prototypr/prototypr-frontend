import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Layout from "@/components/new-index/layoutForIndex";
import Container from "@/components/container";
const NewPagination = dynamic(() => import("@/components/pagination"));
// const PeopleFilters = dynamic(() => import("@/components/people/PeopleFilters"));
import PostTitle from '@/components/post-title'

import { getPeopleByPage } from "@/lib/api";
import ProfileCard from "@/components/people/ProfileCard";
import {
  getTwitterHandle,
  getKofiName,
  getDribbbleHandle,
  getGithubHandle,
} from "@/lib/profile-page/profile-page.js";
import getSponsors from "@/lib/utils/getSponsors";
// import PeopleBreadcrumbs from "@/components/people/PeopleBreadcrumbs";

// import ALL_PEOPLE_GROUPS from '@/lib/menus/allPeopleCat'

const PAGE_SIZE = 12;


export default function PeoplePage({
  allPosts = [],
  preview,
  pagination = {},
  navSponsor,
  sponsors
}) {
  //pagination is like {"total":1421,"pageSize":12,"page":2,"pageCount":119}
  const router = useRouter();

  const onPageNumChange = (pageNo) => {
    router.push(`/people/page/${pageNo}`);
  };

  return (
    <Layout sponsor={navSponsor} activeNav={"people"}>
      <Container padding={false} maxWidth="max-w-[1320px] px-3 mx-auto pb-16">
      {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) :
        <>        
        <h1 className="font-inter font-semibold text-3xl tracking-tighter">Contributors</h1>
        {allPosts.length > 0 && (
          <div className="mt-6 grid grid-rows-1 sm:grid-cols-2 lg:grid-cols-4 grid-cols-1  gap-6">
            <div className="col-span-4">
            <div className={`grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-6 pb-16`}>
            {allPosts.map((post, i) =>
            {
              return(<ProfileCard
                  key={`peoplecard_${
                    post.attributes.slug ? post.attributes.slug : i
                  }`}
                  twitter={post.attributes?.twitter?getTwitterHandle(post.attributes.twitter):null}
                  github={post.attributes?.github?getGithubHandle(post.attributes.github):null}
                  dribbble={post.attributes?.dribbble?getDribbbleHandle(post.attributes.dribbble):null}
                  kofi={post.attributes?.kofi?getKofiName(post.attributes.kofi):null}
                  location={post.attributes?.location}
                  bio={post.attributes?.bio}
                  title={post.attributes.username}
                  slug={post.attributes.slug}
                  legacyAvatar={post.attributes.legacyAvatar}
                  avatar={post.attributes.avatar?.data?.attributes?.url}
                  skills={post.attributes.skills}
                />)})}
            </div>
              <NewPagination
                align="start"
                total={pagination?.total}
                pageSize={PAGE_SIZE}
                currentPage={pagination?.page}
                onPageNumChange={(pageNum) => {
                  onPageNumChange(pageNum);
                }}
              />
            </div>
            {/* <div className="grid-cols-1 hidden lg:block">
              <div className="w-full min-h-screen  flex flex-col">
              <PeopleFilters
               urlRoot={'/people'}
               items={ALL_PEOPLE_GROUPS} 
               key={'people_item_'} 
               slug={'/people'}/>

              </div>
            </div> */}
          </div>
        )}
        </>}

      </Container>
    </Layout>
  );
}

export async function getStaticProps({ preview = null}) {
  const pageSize = PAGE_SIZE;
  const page = 1;
  const allPosts =
    (await getPeopleByPage(preview, pageSize, page)) || [];
    // console.log("allposts*******" + JSON.stringify(allPosts))
  const pagination = allPosts.meta.pagination;

  const { navSponsor, sponsors } = await getSponsors();


  return {
    props: {
      allPosts: allPosts.data,
      preview,
      pagination,
      navSponsor,
      sponsors
    },
    revalidate:20
  };
}