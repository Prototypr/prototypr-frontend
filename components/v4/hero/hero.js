import gumletLoader from "@/components/new-index/gumletLoader";
import SignupHomepage from "@/components/newsletter/SignupHomepage";
import Image from "next/image";
import Link from "next/link";
// import { useState } from "react";
import {
  LargeCardSnow,
  SmallCardSnow,
  SnowMiddle,
  SnowWithLights,
} from "@/components/xmas/snow";

const placeholderAuthorImg =
  "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png?w=3840&q=75&format=auto&compress=true&dpr=2";

const AuthorCard = ({ data }) => {
  const profileImg = data?.attributes?.avatar?.data?.attributes?.url;

  return (
    <>
      <div className="flex flex-row items-center border-t border-black pt-4 border-opacity-5">
        <div className="w-6 h-6 mr-3 rounded-full bg-gray-200 ">
          <Image
            loader={gumletLoader}
            priority={`true`}
            data-priority={`true`}
            // objectFit="cover"
            // layout="fill"
            data-gmlazy={`false`}
            width={20}
            height={20}
            className="w-6 h-6 mr-3 rounded-full bg-gray-200 object-cover relative overflow-hidden"
            src={`${
              profileImg
                ? profileImg
                : data?.attributes?.legacyAvatar
                ? data?.attributes?.legacyAvatar
                : placeholderAuthorImg
            }`}
          />
        </div>
        {/* <div
          style={{
            backgroundImage: `url(${
              profileImg
                ? profileImg
                : data?.attributes?.legacyAvatar
                ? data?.attributes?.legacyAvatar
                : placeholderAuthorImg
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
          className="w-6 h-6 mr-3 rounded-full bg-gray-200 relative"
        ></div> */}

        {data?.attributes?.firstName ? (
          <p className="text-sm font-inter">
            {data?.attributes?.firstName} {data?.attributes?.lastName}
          </p>
        ) : (
          <p className="text-sm font-inter">Unknown</p>
        )}
      </div>
    </>
  );
};

const MetaInfo = ({ tags = [] }) => {
  const tagContent = tags?.data || [];
  return (
    <div className="flex flex-row justify-between">
      {tagContent[0]?.attributes?.name && (
        <span className="text-xs capitalize bg-orange-100  font-inter px-4 py-1 border border-black border-opacity-5  text-black rounded-full">
          {tagContent[0]?.attributes?.name}
        </span>
      )}
    </div>
  );
};

const Credits = () => {
  return (
    <p className="px-4 py-1 bg-opacity-50 backdrop-blur-md bg-white absolute rounded-full bottom-5 right-5 text-[10px]">
      Artwork by @prototypr
    </p>
  );
};

const LargeCardWithImage = ({ data, type = "regular" }) => {
  let coverImage;

  if (type === "regular") {
    // hero section
    let url = data?.attributes?.featuredImage?.data?.attributes?.url;
    coverImage = url
      ? url
      : data?.attributes?.legacyFeaturedImage?.mediaItemUrl;
  } else {
    // works for random section on the home page
    coverImage = data?.featuredImage?.data?.attributes?.url
      ? data.featuredImage?.data?.attributes?.url
      : data?.legacyFeaturedImage?.mediaItemUrl;
  }

  return (
    <Link
      href={`/post/${type === "regular" ? data?.attributes?.slug : data?.slug}`}
      //   style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)" }}
      className="w-full relative h-auto sm:h-[330px] flex flex-col sm:flex-row bg-white border-opacity-[4%] col-span-2 rounded-[20px] hover:shadow-none cursor-pointer"
    >
      <div className="z-40 hidden sm:block absolute -translate-x-6 -translate-y-2 pointer-events-none">
        <LargeCardSnow />
      </div>
      <div className="w-full col-span-2 flex flex-col sm:flex-row overflow-hidden rounded-[20px]">
        <div className="w-full h-[250px] sm:h-full bg-gray-200 relative ">
          <Image
            loader={gumletLoader}
            priority={`true`}
            data-priority={`true`}
            objectFit="cover"
            layout="fill"
            data-gmlazy={`false`}
            className="object-cover relative w-full h-full overflow-hidden"
            src={coverImage || "/static/images/placeholder/letter-ad.png"}
          />
        </div>
        <div className="w-full h-full p-8 flex flex-col justify-between">
          <div className="flex flex-col grid gap-3">
            <MetaInfo
              tags={
                type === "regular" ? data?.attributes?.tags : data.tags || []
              }
            />
            <h1 className="text-lg leading-[27px] text-[#222] tracking-tight font-medium font-inter line-clamp-2">
              {type === "regular" ? data?.attributes?.title : data?.title}
            </h1>
            <p className="text-base leading-[24px] font-inter  overflow-clip text-[#626A6E] tracking-[-2%] line-clamp-3">
              {type === "regular" ? data?.attributes?.excerpt : data?.excerpt}
            </p>
          </div>
          {data && type === "regular" ? (
            <AuthorCard data={data?.attributes?.author?.data} />
          ) : (
            <AuthorCard data={data?.author?.data} />
          )}{" "}
        </div>
      </div>
    </Link>
  );
};

const SmallCardWithImage = ({ src, data, type }) => {
  let post = data?.attributes;
  let coverImage;
  if (type === "regular") {
    coverImage = post?.featuredImage?.data?.attributes?.url
      ? post.featuredImage?.data?.attributes?.url
      : post?.legacyFeaturedImage?.mediaItemUrl;
  } else {
    coverImage = data?.featuredImage?.data?.attributes?.url
      ? data.featuredImage?.data?.attributes?.url
      : data?.legacyFeaturedImage?.mediaItemUrl;
  }

  return (
    <Link
      href={`/post/${type === "regular" ? data?.attributes?.slug : data?.slug}`}
      //   style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)" }}
      className="w-full mb-8 sm:mb-0 min-h-[330px] bg-white  border-opacity-[4%] border-black  rounded-[16px] flex flex-col  hover:shadow-none overflow-hidden cursor-pointer"
    >
      <div className="w-full h-[135px] max-h-[135px] bg-gray-200 relative">
        <Image
          loader={gumletLoader}
          priority={`true`}
          data-priority={`true`}
          objectFit="cover"
          layout="fill"
          data-gmlazy={`false`}
          className="object-cover relative w-full h-full overflow-hidden"
          src={coverImage || "/static/images/placeholder/letter-ad.png"}
        />
      </div>

      <div className="w-full h-auto grid flex flex-col grid gap-4 p-5 ">
        <MetaInfo
          tags={type === "regular" ? data?.attributes?.tags : data.tags || []}
        />
        <div className="flex flex-col ">
          <h1 className="text-lg leading-[27px] text-[#222] font-medium font-inter m-0 p-0 tracking-tight line-clamp-2">
            {type === "regular" ? post?.title : data?.title}
          </h1>
        </div>

        {post && type === "regular" ? (
          <AuthorCard data={post?.author?.data} />
        ) : (
          <AuthorCard data={data?.author?.data} />
        )}
      </div>
    </Link>
  );
};

const HeroGrid = ({ postData, type = "regular", sponsor }) => {
  const { hero, posts } = postData;
  const secondRowPost = posts.filter((x, i) => i === 0)[0];
  const gridPosts = posts.filter((x, i) => i !== 0);

  return (
    <div className="flex flex-col flex-nowrap gap-2">
      <div className="flex flex-col grid md:gap-8 gap-8">
        <div className="w-full h-auto flex flex-col sm:grid sm:grid-cols-1 md:grid md:grid-cols-3 grid-flow-row auto-rows-[minmax(0, 330px)] md:gap-8">
          <LargeCardWithImage type={type} data={hero} />

          <div className="relative w-full flex items-end">
            <div className="absolute hidden md:block z-20 top-0 right-0 translate-x-2 -translate-y-2 pointer-events-none">
              <SmallCardSnow />
            </div>

            <div className="w-full h-full bg-white p-10  rounded-lg cursor-pointer overflow-hidden  flex items-end">
              <div className="rounded-md overflow-hidden">
                <a
                  href={sponsor?.link ? sponsor.link : "https://letter.so"}
                  target="_blank"
                  className="rounded-md"
                >
                  <Image
                    loader={gumletLoader}
                    priority={`true`}
                    data-priority={`true`}
                    layout="fill"
                    data-gmlazy={`false`}
                    className=" p-5 rounded-sm relative w-full h-full "
                    src={
                      sponsor?.featuredImage
                        ? sponsor.featuredImage
                        : "/static/images/placeholder/letter-ad.png"
                    }
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-auto flex flex-col flex-wrap md:grid md:grid-cols-3 grid-flow-row auto-rows-[minmax(0, 330px)] md:gap-8 ">
          <div className="w-full min-h-[300px] col-span-2 flex flex-col grid relative ">
            {/* <div className="absolute top-0  pointer-events-none">
              <SnowMiddle />
            </div> */}

            <div className="absolute hidden sm:block top-0 -right-3 -translate-y-2 pointer-events-none">
              <SnowWithLights />
            </div>
            <div className="w-full bg-blue-200 rounded-2xl overflow-hidden flex flex-col gap-3 p-10  ">
              <h3 className="text-3xl font-inter max-w-md text-black font-bold">
                The Prototypr Weekly
              </h3>
              <p className="font-inter text-base leading-[24px] text-black text-opacity-70">
                Join 25,000+ creatives to enjoy a regular dose of inspiration
                and motivation, delivered to your inbox every Tuesday.
              </p>
              <div className="flex flex-col md:grid grid gap-4 ">
                <SignupHomepage />
              </div>
            </div>
          </div>
          <div className="mt-8 md:mt-0">
            <SmallCardWithImage type={type} data={secondRowPost} />
          </div>
        </div>

        <div className="w-full -mt-8 sm:mt-0 h-auto flex flex-col md:grid flex-wrap sm:grid sm:grid-cols-2 md:grid-cols-3 grid-flow-row auto-rows-[minmax(0, 330px)] sm:gap-8 md:gap-8">
          {gridPosts.map((post, index) => {
            return index === 4 ? (
              <LargeCardWithImage type={type} data={post} />
            ) : (
              <SmallCardWithImage type={type} data={post} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroGrid;
