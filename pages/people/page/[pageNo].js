import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import Container from "@/components/container";

import PostTitle from '@/components/post-title'
import { getPeopleByPage } from "@/lib/api";

import ALL_PEOPLE_GROUPS from '@/lib/menus/allPeopleCat'

const PeoplePostPreview = dynamic(() => import("@/components/people/people-post-preview"));
const NewPagination = dynamic(() => import("@/components/pagination"));
// const FilterCategory = dynamic(() => import("@/components/FilterCategory"));
const Breadcrumbs = dynamic(() => import("@/components/Breadcrumbs"));

const PAGE_SIZE = 12;


const BREADCRUMBS = {
  pageTitle:'People',
  links:[
      {name:'Home', slug:'/'},
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
    <Layout activeNav={"people"} preview={preview}>
      <Container>
      {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) :
        <>        
        {allPosts.length > 0 && (
          <div className="mt-6 grid grid-rows-1 lg:grid-cols-4 grid-cols-1  gap-10">
            <div className="grid-cols-1 hidden lg:block">
              <div className="w-full min-h-screen  flex flex-col">
              <Breadcrumbs 
                    urlRoot={'/people'}
                    title={BREADCRUMBS.pageTitle}
                    links={BREADCRUMBS.links}
                    />
              {/* <FilterCategory
               urlRoot={'/people'}
               items={ALL_PEOPLE_GROUPS} 
               key={'people_item_'} 
               slug={'/people'}/> */}

              </div>
            </div>
            <div className="col-span-3">
            <div className={`grid md:grid-cols-3 grid-cols-1 md:gap-y-10 gap-y-10 lg:gap-y-10 gap-x-10 md:gap-x-10 pb-16`}>

            {allPosts.map((post, i) =>
            <PeoplePostPreview
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
          </div>
        )}
        </>}

      </Container>
    </Layout>
  );
}

export async function getStaticProps({ preview = null, params,locale }) {
  const pageSize = PAGE_SIZE;
  const page = params.pageNo;
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
  };
}

export async function getStaticPaths() {
  const allPosts = (await getPeopleByPage(null, PAGE_SIZE, 0)) || [];
  const pagination = allPosts.meta.pagination;
  const pageCount = pagination.pageCount;
  const pageCountArr = new Array(pageCount).fill(" ");
  return {
    paths:
      (pageCountArr &&
        pageCountArr.map((pageNo, index) => {
          return `/people/page/${index}`;
        })) ||
      [],
    fallback: true,
  };
}
