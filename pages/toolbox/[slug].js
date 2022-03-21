import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "@/components/container";
import PostBody from "@/components/post-body";
import MoreStories from "@/components/more-stories";
import Header from "@/components/tools/header";
import PostHeader from "@/components/post-header";
import SectionSeparator from "@/components/section-separator";
import Layout from "@/components/layout";
import PopupGallery from "@/components/gallery/PopupGallery";
import AuthorCard from "@/components/toolbox/AuthorCard";
import SponsorCard from "@/components/toolbox/SponsorCard";
import Contributors from "@/components/toolbox/Contributors";
import Comment from "@/components/toolbox/Comment/Comment";
import { getAllPostsWithSlug, getToolsAndMoreTools } from "@/lib/api";
import PostTitle from "@/components/post-title";
import Head from "next/head";
import { CMS_NAME } from "@/lib/constants";
// import MOCK_UP_ITEM from "@/components/gallery/ItemMockData";
// import markdownToHtml from '@/lib/markdownToHtml'

export default function Post({ post, morePosts, preview }) {
  // console.log("post*********" + JSON.stringify(post.attributes))
  // const postItem = MOCK_UP_ITEM;
  const router = useRouter();
  //TODO: what is withAuthUser
  const withAuthUser = {};

  if (!router.isFallback && !post?.attributes.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const setUserAuthenticated = () => {

  }

  return (
    <Layout activeNav={"toolbox"} preview={preview}>
      <Container>
        <div
          className="w-full bg-gray-200 mt-6 grid grid-rows-1 lg:grid-cols-5 grid-cols-1 gap-6"
        >
          {/* left sidebar */}
          <div
            className="grid-cols-1 hidden lg:block"
            // style={{ border: "1px solid blue" }}
          >
            {
              post && post.attributes &&  post.attributes.author && 
              <div className="sm:hidden lg:block">
                <AuthorCard author={post.attributes.author} />
              </div>
            }
            <div className="mt-6 sm:hidden block lg:block lg:mt-6">
                <SponsorCard position="left" />
            </div>
            {/**related posts(it may be empty sometimes) */}

            {/**Contributors */}
            <Contributors 
              withAuthUser={withAuthUser}
            />
          </div>
          {/* center sidebar */}
          <div
            className="col-span-3"
          >
             {(post && post.attributes) && <PopupGallery
                body={post.attributes.content}
                item={post.attributes}
                rounded={true}
                arrows={false}
              />}
            
            {/**Description */}
            <div className="">
                <h1 className="hidden sm:block mt-6 text-sm font-semibold mb-3">Description</h1>
                <div className="popup-modal mb-6 relative bg-white p-6 pt-3 rounded-lg shadow w-full">
                  <div 
                  style={{color: "#4a5568", marginBottom: "1rem"}}
                  className="py-3 popup-modal-content" 
                  dangerouslySetInnerHTML={{ __html: post?.attributes.content }}></div>
                </div>
            </div>

            {/**Comments */}
            <Comment 
              withAuthUser={withAuthUser}
              setUserAuthenticated={setUserAuthenticated}
              titleClass="text-sm font-semibold hidden text-gray-800"
              item={post?.attributes}
            />
          </div>
          {/* RIGHT SIDEBAR START */}
          <div
            className="grid-cols-1 hidden lg:block"
            // style={{ border: "1px solid green" }}
          ></div>
        </div>
        {/* <Header /> */}
        {/* {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
               <Head>
                <title>
                  {post.attributes.title} | Prototypr
                </title>
                <meta property="og:image" content={post.attributes.ogImage} />
              </Head>
              <PostHeader
                title={post.attributes.title}
                coverImage={post.attributes.legacyFeaturedImage ? post.attributes.legacyFeaturedImage:''}
                date={post.attributes.date}
                author={post.attributes.author?post.attributes.author.data.attributes:null}
                type="toolbox"
                />
              <PostBody content={post.attributes.content} />
            </article>
            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories type={'toolbox'} posts={morePosts} />}
          </>
        )} */}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = null }) {
  const data = await getToolsAndMoreTools(params.slug, preview);
  // const content = await markdownToHtml(data?.posts[0]?.content || '')
  return {
    props: {
      preview,
      post: {
        ...data?.posts.data[0],
        // content,
      },
      morePosts: data?.morePosts.data,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug("tool");
  return {
    paths:
      (allPosts &&
        allPosts.data?.map((post) => {
          return `/toolbox/${post.attributes.slug}`;
        })) ||
      [],
    fallback: true,
  };
}
