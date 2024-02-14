import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Layout from "@/components/new-index/layoutForIndex";
import Container from "@/components/container";
const NewPagination = dynamic(() => import("@/components/pagination"));
const PeopleFilters = dynamic(() => import("@/components/people/PeopleFilters"));
import PostTitle from '@/components/post-title'

import { getPeopleByPage } from "@/lib/api";
import ProfileCard from "@/components/people/ProfileCard";
import PeopleBreadcrumbs from "@/components/people/PeopleBreadcrumbs";

import ALL_PEOPLE_GROUPS from '@/lib/menus/allPeopleCat'

const PAGE_SIZE = 12;


const BREADCRUMBS = {
  pageTitle:'People',
  links:[
      {name:'Home', slug:'/', svg:<svg className="w-4 h-4 inline -mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19zm2-4h8v2H8v-2z" fill="currentColor"/></svg>},
  ]
}

export default function PeoplePage({
  allPosts = [],
  preview,
  pagination = {},
}) {
  //pagination is like {"total":1421,"pageSize":12,"page":2,"pageCount":119}
  const router = useRouter();

  const onPageNumChange = (pageNo) => {
    router.push(`/people/page/${pageNo}`);
  };

  return (
    <Layout activeNav={"people"}>
      <Container maxWidth="max-w-[1320px] mx-auto pb-16">
      {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) :
        <>        
        {allPosts.length > 0 && (
          <div className="mt-6 grid grid-rows-1 lg:grid-cols-3 grid-cols-1  gap-6">
            <div className="col-span-4">
            <div className={`grid md:grid-cols-3 grid-cols-1 gap-6 pb-16`}>
            {allPosts.map((post, i) =>
            <ProfileCard
                  key={`peoplecard_${
                    post.attributes.slug ? post.attributes.slug : i
                  }`}
                  location={post.attributes?.location}
                  bio={post.attributes?.bio}
                  title={post.attributes.username}
                  slug={post.attributes.slug}
                  legacyAvatar={post.attributes.legacyAvatar}
                  avatar={post.attributes.avatar?.data?.attributes?.url}
                  skills={post.attributes.skills}
                />)}
            </div>
              <NewPagination
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
  return {
    props: {
      allPosts: allPosts.data,
      preview,
      pagination,
    },
    revalidate:20
  };
}