import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Layout from "@/components/new-index/layoutForIndex";
import Container from "@/components/container";
import Image from "next/image";
import { transformPostList } from "@/lib/locale/transformLocale";
import ErrorPage from "next/error";

import { getPostsByPageAndAuthor } from "@/lib/api";
import {
  gradient,
  getTwitterHandle,
  getKofiName,
  getDribbbleHandle,
  getGithubHandle,
} from "@/lib/profile-page/profile-page.js";

const PostListItem = dynamic(() => import("@/components/people/PostListItem"), {
  ssr: true,
});
const KoFiButton = dynamic(() => import("@/components/people/KoFiButton"), {
  ssr: true,
});
const PostTitle = dynamic(() => import("@/components/post-title"), {
  ssr: true,
});

const NewPagination = dynamic(() => import("@/components/pagination"));
const PAGE_SIZE = 12;
const ALL_SLUGS = [
  "hoangnguyen",
  "clos",
  "ebruaksoy",
  "giovanitier",
  "atharvapatil",
  "alexanderigwe",
  "kelechiu",
  "tamarasredojevic",
  "leandrofernandez",
  "alexandragrochowski",
  "chamansharma",
];

export default function PeoplePage({
  allPosts = [],
  preview,
  pagination,
  slug = "",
  pageNo = 1,
  author = {},
  gradient = "",
  kofi = null,
  github = null,
  twitter = null,
  dribbble = null,
  authorUrl = "",
  skills = [],
}) {
  const router = useRouter();

  const onPageNumChange = (pageNum) => {
    router.push(`/people/${slug}/page/${pageNum}`);
  };

  if (router.isFallback || !author) {
    return <ErrorPage statusCode={404} />;
  }

  // avatar?.data?.attributes?.avatar?.data?.attributes
  return (
    <Layout
      seo={{
        title: `
        ${author?.firstName ? author?.firstName:''}
                    ${author?.lastName ? ' '+author?.lastName:''}
                    ${(!author?.firstName && !author?.lastName) ? author?.name:''}
        , member profile at Prototypr`,
        description: `Say hi to ${author?.name} on Prototypr - check out their profile!`,
        image: author.avatar?.data?.attributes?.url
          ? author.avatar?.data?.attributes?.url
          : author?.legacyAvatar
          ? author.legacyAvatar
          : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png",
        canonical: `https://prototypr.io/people/${slug}`,
        url: `https://prototypr.io/people/${slug}`,
      }}
      activeNav={"people"}
      preview={preview}
      padding={false}
    >
      {router.isFallback ? (
        <Container>
          <PostTitle>Loading…</PostTitle>
        </Container>
      ) : (
        <>
          <>
            <section
              className="relative -mt-24  block"
              style={{ height: "260px" }}
            >
              <div
                className="absolute top-0 w-full h-full bg-center bg-cover"
                style={{
                  background: gradient,
                }}
              ></div>
            </section>
          </>
          <Container maxWidth="max-w-[1320px]" >
            <div className="mt-0 flex flex-col md:flex-row px-4 md:px-6">
              <div className="w-full md:w-1/4 lg:block">
                <div className="relative">
                  <div
                    style={{ marginTop: "-86px" }}
                    className="w-44 h-44 mr-2 rounded-full border border-1 overflow-hidden relative border-gray-100 shadow-sm"
                  >
                    {/* <div className="bg-white shadow-sm rounded-full object-cover h-auto align-middle border-4 border-white absolute"
                style={{ width: "122px", height: "122px", marginTop: "-62px" }}> */}

                    {(author?.avatar || author?.legacyAvatar) && (
                      <Image
                        layout="fill"
                        objectFit="cover"
                        src={
                          author.avatar?.data?.attributes
                            ? author.avatar.data.attributes.url
                            : author?.legacyAvatar
                            ? author.legacyAvatar
                            : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png"
                        }
                        className="rounded-full "
                        alt="Author profile picture"
                      />
                    )}
                    {/* </div> */}
                  </div>
                </div>
                <div className="">
                  <div className="mb-3">
                    <h1 className="text-2xl pt-6 font-semibold leading-normal text-gray-800 mb-3">
                    {`${author?.firstName ? author?.firstName:''} ${author?.lastName ? author?.lastName:''}
                    ${(!author?.firstName && !author?.lastName) ? author?.name:''}`}
                    </h1>
                    {author && author.location && (
                      <div className="text-sm flex leading-normal mt-0 text-gray-600 font-normal uppercase">
                        <img
                          style={{ height: "0.94rem" }}
                          className="my-auto mr-1"
                          src="/static/images/icons/map-pin.svg"
                          data-gumlet="false"
                        />
                        <span>{author.location}</span>
                      </div>
                    )}
                    {author && author.url && (
                      <div className="text-sm flex leading-normal mt-1 text-gray-600 font-normal">
                        <img
                          style={{ height: "0.94rem" }}
                          className="h-4 my-auto mr-1"
                          src="/static/images/icons/link.svg"
                          data-gumlet="false"
                        />
                        <span>
                          <a
                            className="underline"
                            target="_blank"
                            rel="nofollow"
                            href={author.url}
                          >
                            {/* {authorUrl} */}
                          </a>
                        </span>
                      </div>
                    )}
                  </div>
                  {author.availability == "1" && (
                    <a
                      className="hidden md:block cursor-pointer mb-1 inline-block"
                      rel="nofollow"
                      target="_blank"
                      href={`${author.url ? author.url : "#"}`}
                    >
                      <div className=" bg-blue-900 mr-2 mb-2 uppercase text-gray-100 text-xs px-3 py-2 rounded inline-block">
                        <span className="hidden sm:block">
                          🔥 Available for hire
                        </span>
                        <span className="sm:hidden">🔥 Hire me</span>
                      </div>
                    </a>
                  )}

                  {kofi && (
                    <KoFiButton
                      color="#53b1e6"
                      label={"Buy me a coffee"}
                      kofiId={kofi}
                    />
                  )}

                  {author.role && (
                    <h3 className="text-lg font-normal leading-normal mb-2 mt-4 text-gray-800">
                      {author.role}
                    </h3>
                  )}

                  {skills.length > 0 &&
                    skills[0].length > 1 &&
                    skills.map((skill, index) => (
                      <div
                        key={`author_tags_${skill}`}
                        className="bg-gray-200 capitalize mr-2 mb-2 text-gray-600 text-xs px-2 py-1 rounded inline-block"
                      >
                        {"# " + skill}
                      </div>
                    ))}

                  <div className="w-full border-b border-gray-300 my-6" />

                  {author.bio && (
                    <div className="text-base text-gray-700 mt-2 pr-3">
                      <div dangerouslySetInnerHTML={{ __html: author.bio }} />
                    </div>
                  )}
                </div>

                <div className="mt-3 md:mt-6 top-0 right-0 md:relative">
                  <div className="flex justify-start mt-1 md:mt-3 z-20">
                    {twitter && (
                      <a
                        className="link block mr-2"
                        href={`https://twitter.com/${twitter}`}
                        target="_blank"
                      >
                        <img
                          style={{ width: "28px" }}
                          className=" bg-white rounded-full shadow-sm hover:shadow-md"
                          src="/static/images/icons/twitter.svg"
                          data-gumlet="false"
                        />
                      </a>
                    )}
                    {dribbble && (
                      <a
                        className="link block mr-2"
                        href={`https://dribbble.com/${dribbble}`}
                        target="_blank"
                      >
                        <img
                          style={{ width: "28px" }}
                          className=" bg-white rounded-full shadow-sm hover:shadow-md"
                          src="/static/images/icons/dribbble.svg"
                          data-gumlet="false"
                        />
                      </a>
                    )}
                    {github && (
                      <a
                        className="link block mr-2"
                        href={`https://github.com/${github}`}
                        target="_blank"
                      >
                        <img
                          style={{ width: "28px" }}
                          className=" bg-white rounded-full shadow-sm hover:shadow-md"
                          src="/static/images/icons/github.svg"
                          data-gumlet="false"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-10 flex-1 md:ml-20">
                <div className=" mx-auto bg-white rounded-lg border border-gray-200 mb-20 max-w-4xl">
                  {allPosts.length && (
                    <div className="md:py-2 pb-6">
                      {allPosts.length &&
                        allPosts.map((item, index) => (
                          <PostListItem
                            key={`author_post_${index}`}
                            postItem={item.attributes}
                            index={index}
                            totalCount={allPosts.length}
                          />
                        ))}
                      <NewPagination
                        total={pagination?.total}
                        pageSize={PAGE_SIZE}
                        currentPage={pagination?.page}
                        onPageNumChange={(pageNum, slug) => {
                          onPageNumChange(pageNum, slug);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

{/* todo: replace with new components - doesn't work when tools are mixed in author profile! */}
              {/* <div className="mt-10 flex-1 md:ml-20">
                <div className="py-6 px-2 mx-auto bg-white rounded-lg border border-gray-200 mb-20 max-w-4xl">
                  {allPosts.length ?<div className="">
            <TopicSection
                  showTitle={false}
                  showTopicCloud={true}
                  showSidebar={false}
                  icon={null}
                  title={false}
                  authorsList={false}
                  HeroPostRandomSection={allPosts[0]}
                  OtherPostsRandomSection={allPosts?.slice(1, 5)}
                  // show more posts underneath the tools section if there's enough to show
                  extendedPosts={allPosts?.length>5?allPosts.slice(5,allPosts.length):false}
                  paginationComponent={ <NewPagination
                    total={pagination?.total}
                    pageSize={PAGE_SIZE}
                    currentPage={pagination?.page}
                    onPageNumChange={(pageNum, tag) => {
                      onPageNumChange(pageNum, tag);
                    }}
                  />}
                  // heroJob={heroJob}
                  // sponsors={sponsors}
                  // toolsList={tools?.slice(0, 8)}
                  // authorsList={topicRes[topic.slug]?.authors}
                />
              </div>:''}
                </div>
              </div> */}

            </div>
          </Container>
        </>
      )}
    </Layout>
  );
}

export async function getStaticProps({ preview = null, params, locale }) {
  const pageSize = PAGE_SIZE;
  const { slug } = params;
  const pageNo = 1;

  let sort = ["featured:desc", "tier:asc", "date:desc"];
  if (locale == "es-ES") {
    sort = ["esES:desc", "featured:desc", "tier:asc", "date:desc"];
  }

  /**
   * if a user has not made a post, they will not get a page
   * this was by accident, but it works well against bots - they can't
   * create a profile for backlinks, as you need a published article to
   * have a profile page
   */
  let allPosts =
    (await getPostsByPageAndAuthor(preview, pageSize, pageNo, [slug], sort)) ||
    [];

  if (!allPosts.data[0]) {
    //if no post found, 404
    return {
      props: {
        author: null,
      },
      revalidate: 30,
    };
  }

  const pagination = allPosts.meta.pagination;
  let author =
    allPosts.data.length && allPosts.data[0]
      ? allPosts.data[0].attributes.author
      : {};
  author = author?.data?.attributes ? author?.data?.attributes : null;

  let grad,
    kofi,
    github,
    twitter,
    authorUrl,
    dribbble = "";
  let skills = [];

  if (author) {
    grad = gradient(
      author?.name
        ? author?.name
        : author?.displayName
        ? author?.displayName
        : "",
      "horizontal"
    );
    kofi = getKofiName(author.kofi);
    github = getGithubHandle(author.github);
    twitter = getTwitterHandle(author.twitter);
    dribbble = getDribbbleHandle(author.dribbble);

    if (author.url) {
      authorUrl = author.url.replace(/(^\w+:|^)\/\//, "").replace(/\/+$/, "");
    }
    if (author.skills && author.skills.indexOf(",") > -1) {
      skills = author.skills.split(",");
    } else if (author.skills) {
      //trin string
      var skill = author.skills.substring(0, 22);
      skills.push(skill);
    }
  }

  allPosts = transformPostList(allPosts.data, locale);

  return {
    props: {
      author: author,
      slug,
      kofi: kofi ? kofi : "",
      github: github ? github : "",
      twitter: twitter ? twitter : "",
      dribbble: dribbble ? dribbble : "",
      skills,
      authorUrl:authorUrl?authorUrl:'',
      pageNo,
      preview,
      pagination,
      allPosts: allPosts,
      gradient: grad ? grad : "",
    },
    revalidate: 20,
  };
}

export async function getStaticPaths({ locale }) {
  let pageCountArr = [];
  let sort = ["featured:desc", "tier:asc", "date:desc"];
  if (locale == "es-ES") {
    sort = ["esES:desc", "featured:desc", "tier:asc", "date:desc"];
  }

  for (let index = 0; index < ALL_SLUGS.length; index++) {
    const allPosts =
      (await getPostsByPageAndAuthor(
        null,
        PAGE_SIZE,
        0,
        [ALL_SLUGS[index]],
        sort
      )) || [];
    const pagination = allPosts.meta.pagination;
    const pageCount = pagination.pageCount;
    let arr = new Array(pageCount).fill("");
    let newArr = arr.map((i, index) => {
      return `/people/${ALL_SLUGS[index]}`;
    });
    pageCountArr = pageCountArr.concat(newArr);
  }
  return {
    paths: pageCountArr || [],
    fallback: "blocking",
  };
}
