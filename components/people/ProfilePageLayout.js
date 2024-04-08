import dynamic from "next/dynamic";

import Container from "@/components/container";
import Image from "next/image";
import {
  DribbbleLogo,
  MapPin,
  TwitterLogo,
  Globe,
  LinkedinLogo,
  GithubLogo,
} from "phosphor-react";

// import SmallCard from "@/components/v4/card/SmallCard/SmallCardB";
// import ToolLargeCardProfile from "@/components/v4/card/ToolLargeCardProfile";
import { useRouter } from "next/router";
import Button from "../Primitives/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import gumletLoader from "@/components/new-index/gumletLoader";
import useUser from "@/lib/iron-session/useUser";

import { accountLocations } from "@/lib/constants";
import { CircleWavyCheck } from "phosphor-react";

import MediumPost from "../v4/card/SmallCard/MediumPost";
import ToolImageCardSingle from "../v4/card/ToolImageCardSingle";
import { ChevronRightIcon } from "@radix-ui/react-icons";

const KoFiButton = dynamic(() => import("@/components/people/KoFiButton"), {
  ssr: true,
});

const PAGE_SIZE = 12;
const NewPagination = dynamic(() => import("@/components/pagination"));
const ProfilePageLayout = ({
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
  previewOnly = false,
  fromAccountPage = false,
  unapproved = false,
}) => {
  const router = useRouter();
  const { user } = useUser();

  const [posts, setPosts] = useState();
  const [currentPage, setCurrentPage] = useState();

  const [location, setLocation] = useState();

  useEffect(() => {
    if (previewOnly) {
      let first4 = allPosts?.slice(0, 3);
      setPosts(first4);
    } else {
      setPosts(allPosts);
    }
  }, [allPosts]);

  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    setIsOwner(user?.profile?.slug == slug);
    if (author?.location) {
      for (var x = 0; x < accountLocations?.length; x++) {
        if (accountLocations[x]?.Code == author?.location) {
          setLocation(accountLocations[x]?.Name);
        }
      }
    }
  }, [user, slug, author]);

  const onPageNumChange = pageNum => {
    setCurrentPage(pageNum);
    router.push(`/people/${slug}/page/${pageNum}`);
  };

  return (
    <Container maxWidth="w-[1320px] mx-auto -mt-[96px]">
      <div className="grid grid-cols-8 pt-[110px] gap-6">
        <div className="w-full col-span-2 lg:block">
          <div className="relative bg-white p-3 shadow-sm rounded-2xl border border-gray-300/70">
            {/* <img src='/static/images/toolbox/squares.svg' className=" opacity absolute w-full h-full object-cover top-0 left-0"/> */}

            {/* <div className="magicpattern absolute top-0 left-0 w-full"/> */}
            <div className="relative max-w-[1320px] mx-auto flex flex-col justify-start">
              <div className="w-[132px] bg-white h-[132px] mx-auto mt-3 rounded-full border border-1 overflow- relative border-black/10 shadow-sm mb-3">
                {(kofi || (unapproved && user?.profile?.kofi)) && (
                  <div className="absolute z-10 bottom-0 mb-1 right-0">
                    {/* <h2 className="font-medium text-sm mb-2 text-gray-700">Support {author?.firstName?author?.firstName:''}</h2> */}
                    <KoFiButton
                      color="#53b1e6"
                      // label={"Buy me a coffee"}
                      kofiId={kofi || user?.profile?.kofi}
                    />
                  </div>
                )}
                {unapproved ? (
                  <img
                    className="bg-white h-full w-full rounded-full object-cover"
                    src={
                      author?.avatar?.url
                        ? author?.avatar?.url
                        : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png"
                    }
                  />
                ) : (
                  (author?.avatar || author?.legacyAvatar) && (
                    // <Link href={`/people/${slug}`}>
                    <Image
                      loader={gumletLoader}
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
                    // </Link>
                  )
                )}
              </div>
              <div className="flex flex-col z-20 relative justify-center max-w-lg gap-5">
                <h1 className="text-2xl text-center tracking-tight font-semibold leading-normal text-black/90">
                  {`${author?.firstName ? author?.firstName : "New"} ${author?.lastName ? author?.lastName : "User"}
                      ${!author?.firstName && !author?.lastName && author?.name ? author?.name : ""}`}
                </h1>

                <div
                  className={`${!(!fromAccountPage && author.role && author?.url) ? "hidden" : ""}`}
                >
                  {!fromAccountPage && author.role && (
                    <div className="text-sm text-center max-w-[500px] text-black/80 px-3">
                      <div dangerouslySetInnerHTML={{ __html: author.role }} />
                    </div>
                  )}

                  {/* LINK */}
                  {author && author.url && (
                    <div className="text-sm flex justify-center leading-normal mt-2 text-black/80 font-normal">
                      <a href={author.url} target="_blank" rel="nofollow">
                        <Globe
                          className="mr-1"
                          color="rgba(0,0,0,0.8)"
                          width={20}
                          height={20}
                        />
                      </a>
                      <span>
                        <a
                          className="underline"
                          target="_blank"
                          rel="nofollow"
                          href={author.url}
                        >
                          {authorUrl}
                        </a>
                      </span>
                    </div>
                  )}
                </div>

                {/* LOCATION */}
                {unapproved && author && location ? (
                  <div className="flex justify-center">
                    <div className="text-sm flex leading-normal text-black/80 font-normal capitalize">
                      <MapPin
                        className="mr-1"
                        color="rgba(0,0,0,0.8)"
                        width={20}
                        height={20}
                      />
                      <span>{location}</span>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {author.availability == "1" && (
                  <div className="flex w-full">
                    <a
                      className="cursor-pointer inline-block w-full"
                      rel="nofollow"
                      target="_blank"
                      href={`${author.url ? author.url : "#"}`}
                    >
                      <div className="border border-gray-400/30 bg-white group hover:bg-gray-100/50 transition transition-all duration-400 text-gray-100 text-xs p-2.5 rounded-md inline-block flex justify-between">
                        <div className="flex">
                          <Image
                            width={36}
                            height={36}
                            className="object-cover w-[36px] h-[36px] rounded-full my-auto mr-3"
                            src={
                              author.avatar?.data?.attributes
                                ? author.avatar.data.attributes.url
                                : author?.legacyAvatar
                                  ? author.legacyAvatar
                                  : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png"
                            }
                          />
                          <div className="flex flex-col justify-start">
                            <div className="my-auto text-black/80 font-semibold text-base">
                              Hire{" "}
                              {author?.firstName
                                ? author?.firstName
                                : author.name}
                            </div>
                            <p className="text-black/70 text-sm">
                              Available for projects
                            </p>
                          </div>
                        </div>
                        <div className="text-gray-800 flex flex-col justify-center">
                          <ChevronRightIcon />
                        </div>
                      </div>
                    </a>
                  </div>
                )}

                {author.bio && (
                  <div>
                    <h3 className="text-gray-500 uppercase font-semibold tracking-wide text-xs my-2">About</h3>
                    <p className="text-base font-normal leading-normal text-black/90">
                      {author.bio ? author.bio : "No description"}
                    </p>
                  </div>
                )}

                {/* TAGS (no point showing them) */}
                {/* <div className="flex flex-wrap mb-3">
                          {(unapproved==true && author?.tags?.length) ?
              author?.tags?.map((tag, index) => (
                  <Link href={`/posts/${tag?.slug}/page/1/`}>
                      <div className={`capitalize inline-block px-2 text-xs py-0.5 bg-[#d8e5f8]/70 rounded-full mr-1.5 mb-1`}>
                      {tag?.name}
                      </div>
                  </Link>
                ))
                :(author?.tags?.data?.length) ?
                author?.tags?.data?.map((tag, index) => (
                  <Link href={`/posts/${tag.attributes?.slug}/page/1/`}>
                      <div className={`capitalize inline-block px-2 text-xs py-0.5 bg-[#d8e5f8]/70 rounded-full mr-1.5 mb-1`}>
                      {tag.attributes?.name}
                      </div>
                  </Link>
                )):''}
                      </div> */}

                {/* social row */}

                {twitter || dribbble || github ? (
                  <div>
                     <h3 className="text-gray-500 uppercase font-semibold tracking-wide text-xs my-2">On Social</h3>
                  <div className="flex">
                    {(twitter || (unapproved && user?.profile?.twitter)) && (
                      <a
                        className="link block mr-2"
                        href={`https://twitter.com/${twitter || user?.profile?.twitter}`}
                        target="_blank"
                      >
                        <TwitterLogo
                          color="rgba(0,0,0,0.8)"
                          width={20}
                          height={20}
                        />
                        {/* <img
                          style={{ width: "28px" }}
                          className=" bg-white rounded-full shadow-sm hover:shadow-md"
                          src="/static/images/icons/twitter.svg"
                          data-gumlet="false"
                        /> */}
                      </a>
                    )}
                    {(dribbble || (unapproved && user?.profile?.dribbble)) && (
                      <a
                        className="link block mr-2"
                        href={`https://dribbble.com/${dribbble || user?.profile?.dribbble}`}
                        target="_blank"
                      >
                        <DribbbleLogo
                          color="rgba(0,0,0,0.8)"
                          width={20}
                          height={20}
                        />

                        {/* <img
                          style={{ width: "28px" }}
                          className=" bg-white rounded-full shadow-sm hover:shadow-md"
                          src="/static/images/icons/dribbble.svg"
                          data-gumlet="false"
                        /> */}
                      </a>
                    )}
                    {(github || (unapproved && user?.profile?.github)) && (
                      <a
                        className="link block mr-2"
                        href={`https://github.com/${github || user?.profile?.github}`}
                        target="_blank"
                      >
                        <GithubLogo
                          color="rgba(0,0,0,0.8)"
                          width={20}
                          height={20}
                        />
                      </a>
                    )}
                  </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="">
              {/* {author.role && (
                <h3 className="text-lg font-normal leading-normal mb-2 mt-4 text-gray-800">
                  {author.role}
                </h3>
              )} */}

              {/* {skills.length > 0 &&
                skills[0].length > 1 &&
                skills.map((skill, index) => (
                  <div
                    key={`author_tags_${skill}`}
                    className="bg-gray-200 capitalize mr-2 mb-2 text-gray-600 text-xs px-2 py-1 rounded inline-block"
                  >
                    {"# " + skill}
                  </div>
                ))} */}

              {isOwner ? (
                <Link href={`/account`}>
                  <div className="pt-4 cursor-pointer text-blue-600 hover:text-blue-500 text-base font-medium">
                    Edit profile
                  </div>
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* {author.availability == "1" && (
            <div className="fixed z-40 bottom-0 left-0 flex m-3">
              <a
                className="cursor-pointer inline-block"
                rel="nofollow"
                target="_blank"
                href={`${author.url ? author.url : "#"}`}
              >
                <div className="shadow-lg border border-gray-400/30 bg-white capitalize text-gray-100 text-xs px-3 py-2 rounded-full inline-block flex">
                  <Image
                    width={36}
                    height={36}
                    className="object-cover w-[36px] h-[36px] rounded-full"
                    src={
                      author.avatar?.data?.attributes
                        ? author.avatar.data.attributes.url
                        : author?.legacyAvatar
                          ? author.legacyAvatar
                          : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png"
                    }
                  />

                  <div className="my-auto text-indigo-900 text-sm ml-2 pr-2">
                    Available for projects
                  </div>
                </div>
              </a>
            </div>
          )} */}
        </div>

        <div className="col-span-6 flex-1 z-20">
          <div className="max-w-[1320px] mb-20 mt-6 lg:mt-0">
            {unapproved ? (
              <div className="mt-[60px]">
                <div className="mt-3 flex w-full bg-white shadow p-4 px-4 rounded-xl text-black/90 max-w-3xl mx-auto">
                  <div className="hidden md:block mr-4 my-auto">
                    <CircleWavyCheck size="44" />
                  </div>
                  <div className="flex flex-col max-w-4xl">
                    <h2 className="mb-1 text-lg font-semibold">
                      Profile pending approval
                    </h2>
                    <p className="mb-3">
                      For community safety and to reduce spam accounts, your
                      profile is not publicly viewable until manually approved
                      by us. You can still submit posts, but they will only
                      appear once your account is approved. Complete your
                      profile to get approved faster.
                    </p>
                    <p>
                      {" "}
                      <Link href="/account">
                        <span className="underline font-semibold">
                          Complete profile
                        </span>{" "}
                        →
                      </Link>{" "}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {allPosts?.length ? (
              <>
                {currentPage == 1 || !currentPage ? null : (
                  <h2 className="font-semibold text-base mb-3">
                    Page {currentPage}
                  </h2>
                )}
                <div className="grid grid-cols-12 gap-3">
                  {posts?.map((post, index) => {
                    let url =
                      post?.attributes?.featuredImage?.data?.attributes?.url;
                    const coverImage = url
                      ? url
                      : post?.attributes?.legacyFeaturedImage?.mediaItemUrl;

                    if (post?.attributes?.type == "article") {
                      return (
                        <div className="h-full col-span-12 sm:col-span-6 2md:col-span-4 lg:col-span-4 xl:col-span-4">
                          {/* <SmallCard
                                key={index}
                                showAuthor={false}
                                link={`/post/${post?.attributes?.slug}`}
                                avatar={avatar}
                                author={post?.attributes?.author?.data?.attributes}
                                image={coverImage}
                                date={post?.attributes?.date}
                                title={post?.attributes?.title}
                                tags={post?.attributes?.tags?.data}
                            /> */}
                          <MediumPost
                            imageHeight={"h-[240px] md:h-[195px]"}
                            showDescription={false}
                            imageSmall={false}
                            showAuthor={false}
                            link={`/post/${post?.attributes?.slug ? post?.attributes?.slug : ""}`}
                            // avatar={avatar}
                            author={
                              post?.attributes?.author?.data?.attributes
                                ? post?.attributes?.author?.data?.attributes
                                : null
                            }
                            image={coverImage}
                            date={
                              post?.attributes?.date
                                ? post?.attributes?.date
                                : null
                            }
                            title={
                              post?.attributes?.title
                                ? post?.attributes?.title
                                : null
                            }
                            excerpt={
                              post?.attributes?.excerpt
                                ? post?.attributes?.excerpt
                                : null
                            }
                            tags={
                              post?.attributes?.tags?.data
                                ? post?.attributes?.tags?.data
                                : null
                            }
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div className="h-full col-span-12 sm:col-span-6 2md:col-span-4 lg:col-span-4 xl:col-span-4">
                          {/* <ToolLargeCardProfile
                            tool={post?.attributes}
                            /> */}

                          <ToolImageCardSingle imageLarge={false} post={post} />
                        </div>
                      );
                    }
                  })}
                </div>
              </>
            ) : (
              ""
            )}
            {!previewOnly ? (
              <div className={`${allPosts?.length ? "pt-6" : ""}`}>
                <NewPagination
                  total={pagination?.total}
                  pageSize={PAGE_SIZE}
                  currentPage={pagination?.page}
                  onPageNumChange={(pageNum, slug) => {
                    onPageNumChange(pageNum, slug);
                  }}
                />
              </div>
            ) : pagination?.total > 4 ? (
              <div className="w-full flex justify-center mt-12">
                <Link href={`/people/${slug}/page/1`}>
                  <Button variant="ghostBlue" className="">
                    Show more
                  </Button>
                </Link>
              </div>
            ) : (
              ""
            )}
            {/* {previewOnly? 
         <div className={`${allPosts?.length?'pt-8':''}`}>
             <h2 className="font-semibold text-base mb-3">Recent activity</h2>
             <EmptyState/>
        </div>
        :''} */}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProfilePageLayout;

const EmptyState = () => (
  <div className="mt-3 mx-auto rounded-lg border border-gray-300">
    <div className="pt-8 pb-8 px-6">
      <img
        width="108"
        className=" mx-auto "
        src="https://letter-so.s3.amazonaws.com/prototypr/6dd2bd90-2c61-4163-bd5d-720567a692e6.png"
        style={{ opacity: "0.88" }}
      />
      <h1 className="text-lg text-gray-500 pt-0 mt-4 text-center">
        No activity yet...
      </h1>
      {/* {currentTab=='draft' && (
              <div class="flex justify-center w-full my-3">
                <NewPostDialog button={true}/>
              </div>
            )} */}
    </div>
  </div>
);
