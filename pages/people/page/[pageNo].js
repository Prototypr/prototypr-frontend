import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Layout from "@/components/new-index/layoutForIndex";
import Container from "@/components/container";

import PostTitle from '@/components/post-title'
import { getPeopleByPage } from "@/lib/api";

// import ALL_PEOPLE_GROUPS from '@/lib/menus/allPeopleCat'
import ProfileCard from "@/components/people/ProfileCard";

const NewPagination = dynamic(() => import("@/components/pagination"));
// const PeopleFilters = dynamic(() => import("@/components/people/PeopleFilters"));
// const PeopleBreadcrumbs = dynamic(() => import("@/components/people/PeopleBreadcrumbs"));

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
      <Container padding={false} maxWidth="px-3 max-w-[1320px] mx-auto pb-16">
      {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) :
        <>        
                <h1 className="font-inter font-semibold text-xl">Page {pagination?.page}</h1>

        {allPosts.length > 0 && (
           <div className="mt-6 grid grid-rows-1 sm:grid-cols-2 lg:grid-cols-4 grid-cols-1  gap-6">
           <div className="col-span-4">
           <div className={`grid md:grid-cols-4 grid-cols-1 gap-6 pb-16`}>
            {allPosts.map((post, i) =>
            {
              return(<ProfileCard
                  key={`peoplecard_${
                    post.attributes.slug ? post.attributes.slug : i
                  }`}
                  twitter={post.attributes?.twitter}
                  github={post.attributes?.github}
                  dribbble={post.attributes?.dribbble}
                  kofi={post.attributes?.kofi}
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

export async function getStaticProps({ preview = null, params,locale }) {
  const pageSize = PAGE_SIZE;
  const page = params.pageNo;
  const allPosts =
    (await getPeopleByPage(preview, pageSize, page)) || [];

    //loop through all posts and if the post type is a tool, run the tool function
    let formattedPosts = allPosts?.data?.map((post) => {
      if (post.attributes.type == "tool") {
        // use the formatAllTools function to format the tool content
        post = formatToolContent({post, tagNumber:1});
      }
      return post;
    }
    );
    // console.log("allposts*******" + JSON.stringify(allPosts))
  const pagination = allPosts?.meta?.pagination;
  return {
    props: {
      allPosts: formattedPosts,
      preview,
      pagination,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const allPosts = (await getPeopleByPage(null, PAGE_SIZE, 0)) || [];
  const pagination = allPosts?.meta?.pagination;
  const pageCount = pagination?.pageCount;
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
