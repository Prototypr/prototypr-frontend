import gumletLoader from "@/components/new-index/gumletLoader";
import SignupHomepage from "@/components/newsletter/SignupHomepage";
import Image from "next/image";
import Link from "next/link";
import Moment from "react-moment";
// import { useState } from "react";
// import {
//   LargeCardSnow,
//   SmallCardSnow,
//   SnowMiddle,
//   SnowWithLights,
// } from "@/components/xmas/snow";
// import { SponsorHomeCard } from "@/components/SponsorSidebarCard";
import TrendingSectionMiddle from "@/components/homepage/TrendingSectionMiddle";

const placeholderAuthorImg =
  "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png?w=3840&q=75&format=auto&compress=true&dpr=2";

const AuthorCard = ({ data }) => {
  const profileImg = data?.attributes?.avatar?.data?.attributes?.url;

  return (
    <>
      <div className="flex flex-row items-center  text-[#858585] font-normal border-black border-opacity-5">
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

        {data?.attributes?.firstName ? (
          <p className="text-sm font-inter text-gray-800 font-medium">
            {data?.attributes?.firstName} {data?.attributes?.lastName}
          </p>
        ) : (
          <p className="text-base font-inter">Unknown</p>
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
        <span className="text-xs capitalize bg-gray-100  font-inter px-2 py-0.5 border border-black border-opacity-5  text-gray-500 rounded-full">
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

const LargeCardWithImage = ({ data, type = "regular", colSpan }) => {
  let coverImage;

  // let postDate =  format(new Date(data?.attributes?.date), "LLLL d, yyyy")
  let postDate =  data?.attributes?.date

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
      className={`w-full border border-gray-200 relative h-auto flex flex-col sm:flex-row bg-white ${colSpan?colSpan:'col-span-2'} rounded-[20px] cursor-pointer`}
    >
      {/* <div className="z-40 hidden sm:block absolute -translate-x-6 -translate-y-2 pointer-events-none">
        <LargeCardSnow />
      </div> */}
      <div className="w-full col-span-2 flex flex-col overflow-hidden rounded-[20px]">
        <div className="w-full h-[264px] bg-gray-200 relative ">
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
        
        <div className="w-full p-6 flex flex-col justify-between">
        <div className="mb-2  ">
        {data && type === "regular" ? (
            <AuthorCard data={data?.attributes?.author?.data} />
          ) : (
            <AuthorCard data={data?.author?.data} />
          )}{" "}
        </div>
          <div className="flex flex-col grid gap-2">
            <h1 className="text-2xl leading-2 text-[#222] tracking-tight font-bold font-inter line-clamp-2">
              {type === "regular" ? data?.attributes?.title : data?.title}
            </h1>
            <p className="text-base leading-[24px] font-inter  overflow-clip text-[#626A6E] tracking-[-2%] line-clamp-3">
              {type === "regular" ? data?.attributes?.excerpt : data?.excerpt}
            </p>
            <div className="flex mt-2">
            <Moment className="text-xs text-gray-500 my-auto mr-2" date={postDate} format="MMM DD"/>
            {data?.attributes?.tags?<div className="mr-2 text-gray-400">·</div>:''}
            <MetaInfo
              tags={
                type === "regular" ? data?.attributes?.tags : data.tags || []
              }
              />
            </div>
          </div>
         
        </div>
      </div>
    </Link>
  );
};

const SmallCardWithImage = ({ src, data, type }) => {
  let postDate =  data?.attributes?.date

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
      // style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
      className="w-full border border-gray-200 mb-8 sm:mb-0 min-h-[350px] bg-white rounded-[22px] flex flex-col  overflow-hidden cursor-pointer"
    >
      <div className="w-full h-[208px] max-h-[208px] bg-gray-200 relative">
        <Image
          loader={gumletLoader}
          priority={`true`}
          data-priority={`true`}
          layout="fill"
          data-gmlazy={`false`}
          className="object-cover relative w-full h-full overflow-hidden"
          src={coverImage || "/static/images/placeholder/letter-ad.png"}
        />
      </div>
      <div className="w-full p-6 flex flex-col justify-between">
        <div className="mb-2  ">
        {data && type === "regular" ? (
            <AuthorCard data={data?.attributes?.author?.data} />
          ) : (
            <AuthorCard data={data?.author?.data} />
          )}{" "}
        </div>
          <div className="flex flex-col grid gap-2">
            <h1 className="text-base leading-[24px] text-[#222] font-semibold font-inter m-0 p-0 line-clamp-2">
              {type === "regular" ? data?.attributes?.title : data?.title}
            </h1>
            <p className="md:hidden text-base leading-[24px] font-inter  overflow-clip text-[#626A6E] tracking-[-2%] line-clamp-3">
              {type === "regular" ? data?.attributes?.excerpt : data?.excerpt}
            </p>
            <div className="flex mt-2">
            <Moment className="text-xs text-gray-500 my-auto mr-2" date={postDate} format="MMM DD"/>
            {data?.attributes?.tags?<div className="mr-2 text-gray-400">·</div>:''}
            <MetaInfo
              tags={
                type === "regular" ? data?.attributes?.tags : data.tags || []
              }
              />
            </div>
          </div>
         
        </div>
    </Link>
  );
};

const JobFeatureCard = ({ item }) => {
  const { title, companyName, salaryText, id, companyLogo, locations } = item;
  return (
    <Link href={`/jobs/${id}`}>
      <div
        key={id}
        className="w-full h-full max-h-[150px] bg-[#fff] rounded-[16px] p-6"
      >
        <div className="flex flex-row justify-between  rounded-lg">
          <div className="flex flex-co grid gap-2 justify-center">
            <div className="flex flex-col ">
              <p className="text-base line-clamp-2 font-medium  text-[#333] overflow-hidden line-clamp-3 font-inter">
                <span className="">{companyName}</span>, is looking for a{" "}
                {title} in {locations[0]?.name}.
              </p>
            </div>
            <div className="text-sm max-w-[100px] font-medium p-3 w-auto  text-center rounded-full bg-gray-200 hover:bg-gray-300">
              Apply
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const HeroGrid = ({
  postData,
  type = "regular",
  sponsor,
  jobFeature = null,
  showTrending=false
}) => {
  const { hero, posts } = postData;
  const secondRowPost = posts.filter((x, i) => i === 0)[0];
  // const thirdRowPost = posts.filter((x, i) => i === 1)[0];
  // const gridPosts = posts.filter((x, i) => (i !== 0 && i!==1));
  const gridPosts = posts.filter((x, i) => (i !== 0));

  return (
    <div className="flex flex-col flex-nowrap gap-2">
      <div className="flex flex-col">
        <div className="flex flex-col sm:flex-row lg:flex-col">
          <div className="sm:w-1/2 mb-8 px-4 lg:px-0 lg:w-full h-auto flex flex-row flex-wrap  sm:grid sm:grid-cols-2 gap-1  sm:gap-10">
            <LargeCardWithImage type={type} data={hero} />
            {/* <SmallCardWithImage type={type} data={hero} />
            <SmallCardWithImage type={type} data={secondRowPost} /> */}
          </div>
          <div className="sm:w-1/2 px-4 mb-8 lg:px-0 lg:w-full h-auto flex flex-row flex-wrap  sm:grid sm:grid-cols-2 gap-1  sm:gap-10">
            <LargeCardWithImage type={type} data={secondRowPost} />
            {/* <SmallCardWithImage type={type} data={hero} />
            <SmallCardWithImage type={type} data={secondRowPost} /> */}
          </div>
        </div>
        {/* <div className="w-full h-auto flex flex-row flex-wrap  sm:grid sm:grid-cols-2  max-w-4xl mx-auto gap-1  sm:gap-10">
          <LargeCardWithImage type={type} data={thirdRowPost} />
        </div> */}
        {/* <div className="w-full h-auto flex flex-row flex-wrap  sm:grid sm:grid-cols-2  max-w-4xl mx-auto gap-4 mb-8 sm:mb-0 sm:gap-8">
          <div
            style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
            className="w-full max-w-[420px] h-[150px] bg-white rounded-[16px] p-4"
          >
            <SponsorHomeCard />
          </div>
          
        </div> */}

        {showTrending?
        <>
        <TrendingSectionMiddle/>
        {/* <h1 className="font-semibold mb-3">From the archives</h1> */}
        </>
        :''}

        {/* {jobFeature && (
            <div
              style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
              className="w-full max-w-[420px] bg-white rounded-[16px]"
            >
              <JobFeatureCard item={jobFeature[0]} />
            </div>
          )} */}

        <div className="w-full h-auto flex flex-row flex-wrap px-4 lg:px-0 grid grid-cols-2 mx-auto gap-1  sm:gap-8">
          {gridPosts.map((post, index) => {
            return  <LargeCardWithImage colSpan='col-span-2 sm:col-span-1 lg:col-span-2 mb-8 sm:mb-0' type={type} data={post} />
            // return  <SmallCardWithImage type={type} data={post} />
          })}
        </div>
        <div className="px-4 sm:mt-8 lg:px-0 lg:mt-0">
          <div
          className="w-full h-full bg-pink-200 w-full lg:mt-8 rounded-[16px] p-6"
        >
          <h3 className="text-2xl mb-2 font-inter max-w-md text-black font-bold">The best design articles, every week</h3>
          <p className="font-inter mb-4 text-base leading-[24px] text-black text-opacity-70">Join 25,000+ creatives who enjoy a regular dose of inspiration and motivation, delivered to your inbox every Tuesday.</p>
          <SignupHomepage/>
        </div>
        </div>
      </div>
    </div>
  );
};

export default HeroGrid;
