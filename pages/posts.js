import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import Container from "@/components/container";
const MoreStories = dynamic(() => import("@/components/more-stories"));
const NewPagination = dynamic(() => import("@/components/pagination"));
import Layout from "@/components/layout";
const EditorPick2 = dynamic(() => import("@/components/new-index/EditorPick2"));
import { useIntl } from "react-intl";

import { getPostsByPageForPostsPage } from "@/lib/api";
// import Head from "next/head";
const PAGE_SIZE = 12;
export default function PostsPage({ allPosts = [], preview, pagination = {} }) {
  let heroPost;
  let morePosts = [];
  let coverImage;
  if (allPosts.length && pagination.page && pagination.page == 1) {
    heroPost = allPosts[0];
    morePosts = allPosts.slice(1);
    coverImage = heroPost.attributes.featuredImage?.data?.attributes?.url
      ? heroPost.attributes.featuredImage?.data?.attributes?.url
      : heroPost.attributes.legacyFeaturedImage
      ? heroPost.attributes.legacyFeaturedImage
      : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
  }
  const router = useRouter();
  const intl = useIntl();

  const onPageNumChange = (pageNo) => {
    router.push(`/posts/page/${pageNo}`);
  };

  return (
    <>
      <Layout
        seo={{
          title: "Prototypr Design articles – free for everyone.",
          description:
            "Design content open and accessible to everyone, no paywall here.",
          //   image: "",
          canonical: "https://prototypr.io/posts",
          url: "https://prototypr.io/posts",
        }}
        activeNav={"posts"}
        preview={preview}
      >
        <Container>
          {pagination.page && pagination.page == 1 && (
            <>
              {/* <Intro /> */}
              {heroPost && (
                <div className="pt-12">
                  <EditorPick2
                    header={intl.formatMessage({ id: "editpicker.title" })}
                    post={heroPost}
                  />
                </div>
                //    <HeroPost
                //    title={heroPost.attributes.title}
                //    coverImage={coverImage}
                //    date={heroPost.attributes.date}
                //    author={(heroPost.attributes.author &&heroPost.attributes.author.data) ?heroPost.attributes.author.data.attributes:'https://prototypr.gumlet.io/wp-content/uploads/2021/09/2021-09-17-10-09-02.2021-09-17-10_10_54-f3ijc-1.gif'}
                //    slug={heroPost.attributes.slug}
                //    excerpt={heroPost.attributes.excerpt}
                //  />
              )}
            </>
          )}
          {pagination.page && pagination.page == 1
            ? morePosts.length > 0 && <MoreStories posts={morePosts} />
            : allPosts.length > 0 && <MoreStories posts={allPosts} />}

          <NewPagination
            total={pagination?.total}
            pageSize={PAGE_SIZE}
            currentPage={pagination?.page}
            onPageNumChange={(pageNum) => {
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
  const page = 1;
  let allPosts =
    (await getPostsByPageForPostsPage(preview, pageSize, page)) || [];
  allPosts = allPosts[0];
  const pagination = allPosts.meta.pagination;
  return {
    props: { allPosts: allPosts.data, preview, pagination },
    revalidate:20
  };
}
