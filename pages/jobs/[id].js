import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "@/components/container";
// import Layout from '@/components/layout'
import Layout from "@/components/layoutForBlogPost";
import { getAllJobsWithId, getJobPage } from "@/lib/api";
// import markdownToHtml from '@/lib/markdownToHtml'

import dynamic from "next/dynamic";
import { LocationIcon, MoneyIcon } from "@/components/icons";
import Button from "@/components/Primitives/Button";
import Link from "next/link";
import Image from "next/image";
import gumletLoader from "@/components/new-index/gumletLoader";
import { useState } from "react";
import { Waypoint } from "react-waypoint";
import PrototyprNetworkCTA from "@/components/Sidebar/NetworkCTA";
import SignupSidebar from "@/components/newsletter/SignupSidebar";
import SponsorSidebarCard from "@/components/SponsorSidebarCard";
import { SIDEBAR_STICKY_OFFSET } from "@/lib/constants";
const RelatedPosts = dynamic(() => import("@/components/related-posts"), {
  ssr: true,
});
const PostTitle = dynamic(() => import("@/components/post-title"), {
  ssr: true,
});
const SponsorCard = dynamic(() => import("@/components/toolbox/SponsorCard"), {
  ssr: true,
});
const AuthorNewsCredit = dynamic(
  () => import("@/components/AuthorNewsCredit"),
  { ssr: true }
);
const TimeAgo = dynamic(() => import("react-timeago"), { ssr: false });

export default function Post({
  post,
  morePosts,
  preview,
  domain,
  link,
  postDate,
}) {
  const router = useRouter();

  let seoDescription = "Job post on Prototypr";
  if (post?.attributes?.content) {
    seoDescription = truncate(post?.attributes?.description, 400);
  }

  if (!router.isFallback && !post?.id) {
    return <ErrorPage statusCode={404} />;
  }

  const title = post?.attributes?.title;
  const description = seoDescription;
  const canonical =
    post?.attributes?.id && `https://prototypr.io/jobs/${post?.attributes?.id}`;
  const url =
    post?.attributes?.id && `https://prototypr.io/jobs/${post?.attributes?.id}`;

  const locations = post?.attributes?.locations?.data;
  const skills = post?.attributes?.skills?.data;

  const companyName = post?.attributes?.company?.data?.attributes?.name;
  const companyLogo =
    post?.attributes?.company?.data?.attributes?.logo?.data?.attributes?.url;

  let salaryText = "";
  if (post?.attributes?.salarymin && post?.attributes?.salarymax) {
    salaryText = `$${post.attributes.salarymin / 1000}k – $${
      post.attributes.salarymax / 1000
    }k`;
  }

  const image = `${
    process.env.NEXT_PUBLIC_HOME_URL
  }/api/og?title=${encodeURIComponent(title)}&companyName=${encodeURIComponent(
    companyName
  )}&companyLogo=${companyLogo}&salary=${encodeURIComponent(salaryText)}`;
  return (
    <Layout
    maxWidth={'search-wide max-w-[1320px]'}
      seo={{
        title: `${title}`,
        description: `${description}`,
        image: `${image}`,
        canonical: `${canonical}`,
        url: `${url}`,
      }}
      activeNav={"posts"}
      preview={preview}
    >
      <Container>
        <div className="w-full h-full grid grid-cols-12 gap-1  ">
          <div className="max-w-[46rem] mx-auto pb-20 gap-2 col-span-12 px-3 md:px-8 xl:px-0 lg:col-span-8">
            <div className="pt-5 text-md text-gray-700 pb-8">
              <Link href={`/`}>
                <span className="hover:underline">Home</span>
              </Link>{" "}
              →{" "}
              <Link href={`/jobs`}>
                <span className="hover:underline">Jobs</span>
              </Link>{" "}
              →{" "}
              <Link href={`#`}>
                <span className="underline">{title}</span>
              </Link>
            </div>
            {router.isFallback ? (
              <PostTitle>Loading…</PostTitle>
            ) : (
              <>
                {/* center sidebar */}
                <div className="relative col-span-full lg:col-span-8">
                  {/**Description */}
                  <div className="mb-8">
                    <div className="mb-6 relative border border-gray-100 bg-white px-6 md:px-12 py-6 md:py-12 rounded-lg w-full">
                      {post?.attributes?.company?.data?.attributes?.logo?.data
                        ?.attributes?.url ? (
                        <div className="relative w-[95px] h-[95px] bg-[#CEE2FF] rounded-full border mb-6 border-gray-100">
                          <Image
                            loader={gumletLoader}
                            priority={`false`}
                            data-priority={`false`}
                            data-gmlazy={`true`}
                            className="rounded-full object-cover"
                            objectFit="cover"
                            layout="fill"
                            src={
                              post?.attributes?.company?.data?.attributes?.logo
                                ?.data?.attributes?.url
                            }
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      <h1 className="text-3xl mb-2 max-w-2xl font-medium">
                        {title}
                      </h1>
                      <div className="flex">
                        <h2 className="text-xl mb-6 font-medium">
                          {companyName}
                        </h2>
                      </div>
                      <div className="flex">
                        {locations?.length ? <LocationIcon /> : ""}
                        {locations[0]?.attributes?.name &&
                          locations.map((location, index) => (
                            <>
                              <div className="ml-1 flex my-auto rounded-lg">
                                <p className="mr-2 text-gray-600 my-auto text-md font-base">
                                  {location?.attributes?.name}
                                </p>
                                {/* {(index<location.length )? <span>•</span>:''} */}
                              </div>
                              <span className="mr-2 inline-block text-gray-600">
                                •
                              </span>
                            </>
                          ))}
                        <div className="flex flex-row gap-0.5">
                          <MoneyIcon />
                          <div className="text-gray-600 ml-1 my-auto text-md font-base">
                            {salaryText ? salaryText : "Undisclosed"}
                          </div>
                        </div>
                      </div>

                      <div className="gap-2 mt-3 flex flex-row">
                        {skills[0]?.attributes?.name &&
                          skills.map((skill, map) => (
                            <span
                              className="py-1 px-3 text-xs rounded-full bg-purple-100 text-purple-600 text-md"
                              key={skill?.attributes?.name}
                            >
                              {skill?.attributes?.name}
                            </span>
                          ))}
                      </div>
                      <div className="mt-8 pt-8 border-t border-gray-100">
                        <h3 className="text-2xl font-medium mb-2 text-gray-900">
                          Job description
                        </h3>
                        <span className="inline text-gray-500 text-md font-base">
                          Posted{" "}
                        </span>
                        {post?.attributes?.date ? (
                          <TimeAgo
                            className="text-gray-500 text-md font-base"
                            date={post?.attributes?.date}
                          />
                        ) : (
                          ""
                        )}
                      </div>

                      {post && post?.attributes && post?.attributes?.author && (
                        <div className="sm:hidden lg:block">
                          <AuthorNewsCredit
                            author={post.attributes.author}
                            postDate={postDate}
                            domain={domain}
                            link={link}
                          />
                        </div>
                      )}
                      <div
                        style={{ color: "#4a5568" }}
                        className="py-3 mt-4 max-w-3xl blog-content text-md mb-2"
                        dangerouslySetInnerHTML={{
                          __html: post?.attributes?.description,
                        }}
                      ></div>

                      {/* {post?.attributes?.url && <div className="py-6"><a className="underline text-gray-600 font-semibold" href={post?.attributes.url} target="_blank">Apply</a></div>} */}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* RIGHT SIDEBAR START */}
          {/* <div className="col-span-full mb-6 lg:mb-0 lg:col-span-4 order-last lg:order-last lg:block"> */}
          <Sidebar post={post} paddingTop="pt-6" />
          {/* <div className="w-full mb-6 pt-4 pb-6 px-6 rounded-lg bg-white col-start-5 col-end-7 md:col-start-5 md:col-end-7 ">
          <div className="w-full">
            <h3 className='text-xl font-medium mb-2 text-gray-900'>Apply Today</h3>
            <p className="text-base text-gray-600 mb-4">{post?.attributes?.company?.data?.attributes?.name} accepts applications on their company website.</p>
              <Link href={post?.attributes?.url}>
                <Button variant="fullWidthJob" className="px-0 py-1">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
              <div className="sm:hidden block lg:block">
              <SponsorCard position="left" />
            </div>
              {
                morePosts && 
                <RelatedPosts 
                  relatedPosts={morePosts}
                  type={'post'}
                  title={'Top Stories'}
                />
              } */}
        </div>
        {/* </div> */}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({
  params,
  preview = null,
  type = "protobite",
}) {
  const data = await getJobPage(params.id);

  //if no post found, 404
  if (!data?.jobs?.data[0]) {
    return {
      props: {
        post: null,
      },
      // revalidate:30
    };
  }

  let link = data?.jobs?.data[0]?.attributes?.link;
  if (!link) {
    link = data?.jobs?.data[0]?.attributes?.legacyAttributes?.link
      ? data?.jobs?.data[0]?.attributes?.legacyAttributes?.link
      : "#";
  }

  // const content = await markdownToHtml(data?.jobs[0]?.content || '')
  return {
    props: {
      preview,
      post: {
        ...data?.jobs?.data[0],
        id: params.id,
      },
      link,
      //   postDate:JSON.stringify(postDate),
      //   morePosts:relatedArticles,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllJobsWithId();

  return {
    paths:
      (allPosts &&
        allPosts.data?.map((post) => {
          return `/jobs/${post?.id}`;
        })) ||
      [],
    fallback: true,
  };
}

const Sidebar = ({ relatedPosts, paddingTop, post }) => {
  const [stickyPaddingTop, setStickyPaddingTop] = useState("pt-0");

  const _handleWaypointEnter = () => {
    setStickyPaddingTop("pt-0");
  };
  const _handleWaypointLeave = () => {
    setStickyPaddingTop(SIDEBAR_STICKY_OFFSET);
  };

  return (
    <div
      className={`${paddingTop} relative col-span-4 max-w-[410px] border-l border-opacity-20`}
    >
      <Waypoint onEnter={_handleWaypointEnter} onLeave={_handleWaypointLeave} />
      <div
        className={`${stickyPaddingTop} absolute transition transition-all duration-300 sticky top-0 min-h-screen hidden lg:block`}
      >
        <aside className="h-screen px-10 sticky top-0 py-0">
          {/* <div className="w-full mb-8">
                <Link href="/jobs/post">
                  <Button variant="fullWidthJob" className="px-0 py-1">
                    Post a Job for $200
                  </Button>
                </Link>
              </div> */}
          {post?.attributes?.url ? (
            <div className="w-full mb-6 pt-4 pb-6 px-6 rounded-lg bg-white col-start-5 col-end-7 md:col-start-5 md:col-end-7 ">
              <div className="w-full">
                <h3 className="text-xl font-medium mb-2 text-gray-900">
                  Apply Today
                </h3>
                <p className="text-base text-gray-600 mb-4">
                  {post?.attributes?.company?.data?.attributes?.name} accepts
                  applications on their company website.
                </p>
                <Link href={post?.attributes?.url}>
                  <Button variant="fullWidthJob" className="px-0 py-1">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="flex flex-col grid gap-6">
            {/* <PrototyprNetworkCTA/> */}
            <div>
              {/* EMAIL FORM */}
              <div className="w-full bg-blue-100 rounded-xl p-5 border border-gray-200">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  Get the roundup
                </h3>
                <p className="text-base text-gray-500 mb-6">
                  Get a curated selection of the best articles and topics from
                  Prototypr in your inbox.
                </p>
                <SignupSidebar post={post} />
              </div>

              <div className="mt-6">
                <SponsorSidebarCard sponsorLocation="jobs" page={"/jobs/*"} />
              </div>
            </div>

            {/* <div className="w-full flex flex-col grid gap-2">
  
              {relatedPosts?.data?.length > 0 &&
                relatedPosts.data.map((item, index) => {
                  return (
                    <ProductItem key={`product_item_${index}`} post={item} />
                    // <TopicTopItem key={index} topic={item}/>
                  );
                })}
              </div> */}
          </div>
        </aside>
      </div>
    </div>
  );
};
