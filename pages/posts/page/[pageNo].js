import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import Container from "@/components/container";
// const MoreStories = dynamic(() => import("@/components/more-stories"));
// const EditorPick2 = dynamic(() => import("@/components/new-index/EditorPick2"));
const NewPagination = dynamic(() => import("@/components/pagination"));
import Layout from "@/components/new-index/layoutForIndex";
import { useIntl } from "react-intl";
// import PostTitle from '@/components/post-title'
import TagsNavRow from "@/components/v4/section/TagsNavRow";
import PostsSectionHero from "@/components/v4/section/PostsSectionHero";
import useUser from "@/lib/iron-session/useUser";

import { getAllPostsForPostsPage, getPostsByPageForPostsPage } from "@/lib/api";
import PostTitle from "@/components/post-title";
import { createB64WithFallback } from "@/lib/utils/blurHashToDataURL";
// import Head from 'next/head'
const PAGE_SIZE = 9;
export default function PostsPage({ allPosts = [], preview, pagination = {} }) {
  let heroPost;
  let morePosts = [];
  let coverImage;
  // if (allPosts.length && pagination.page && pagination.page == 1) {
  heroPost = allPosts[0];
  morePosts = allPosts.slice(1);
  coverImage = heroPost?.attributes?.featuredImage?.data?.attributes?.url
    ? heroPost.attributes.featuredImage?.data?.attributes?.url
    : heroPost?.attributes?.legacyFeaturedImage
      ? heroPost?.attributes?.legacyFeaturedImage
      : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
  // }
  const router = useRouter();
  const intl = useIntl();
  const { user, isLoading } = useUser({
    redirectIfFound: false,
  });
  const onPageNumChange = pageNo => {
    router.push(`/posts/page/${pageNo}`);
  };

  return (
    <>
      <Layout
        navOffset={false}
        padding={false}
        preview={preview}
        background={"#fbfcff"}
        seo={{
          title: `Prototypr Design articles – free for everyone | Page ${pagination?.page}`,
          description:
            "Design content open and accessible to everyone, no paywall here.",
          //   image: "",
          canonical: `https://prototypr.io/posts/page/${pagination?.page}`,
          url: `https://prototypr.io/posts/page/${pagination?.page}`,
        }}
      >
        <div className="pt-[74px]">
          <TagsNavRow />
        </div>
        <Container
          padding={false}
          maxWidth="max-w-[1320px] mx-auto z-30 relative"
        >
          {router.isFallback ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              {
                <>
                  {pagination.page && pagination.page == 1
                    ? morePosts.length > 0 && (
                        <PostsSectionHero
                          user={user}
                          heroCardPost={heroPost}
                          viewablePosts={morePosts}
                          showRecent={true}
                        />
                      )
                    : allPosts.length > 0 && (
                        <div className="pt-4">
                          <PostsSectionHero
                            user={user}
                            // heroCardPost={heroPost}
                            viewablePosts={allPosts}
                            showRecent={false}
                          />
                        </div>
                      )}
                </>
              }
            </>
          )}

          <NewPagination
            total={pagination?.total}
            pageSize={PAGE_SIZE}
            currentPage={pagination?.page}
            onPageNumChange={pageNum => {
              onPageNumChange(pageNum);
            }}
          />
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = null, params }) {
  const pageSize = PAGE_SIZE;
  const page = params.pageNo;
  let allPosts =
    (await getPostsByPageForPostsPage(preview, pageSize, page)) || [];
  allPosts = allPosts[0];

  //add blurhash to allPosts images
  for (var x = 0; x < allPosts.data?.length; x++) {
    allPosts.data[x].attributes.base64 = createB64WithFallback(
      allPosts?.data[x]?.attributes?.featuredImage?.data?.attributes?.blurhash
    );
  }

  const pagination = allPosts.meta.pagination;
  return {
    props: { allPosts: allPosts.data, preview, pagination },
    revalidate: 20,
  };
}

export async function getStaticPaths() {
  const allPosts = (await getAllPostsForPostsPage(null, PAGE_SIZE, 0)) || [];
  const pagination = allPosts.meta.pagination;
  const pageCount = pagination.pageCount;
  const pageCountArr = new Array(pageCount).fill(" ");
  return {
    paths:
      (pageCountArr &&
        pageCountArr.map(pageNo => {
          return `/posts/page/${pageNo}`;
        })) ||
      [],
    fallback: true,
  };
}
