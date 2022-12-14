import gumletLoader from "@/components/new-index/gumletLoader";
import SignupHomepage from "@/components/newsletter/SignupHomepage";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const img1 =
  "https://i.pinimg.com/474x/0e/48/0e/0e480e53e54f4c08f2af5899051c653b.jpg";

const img2 =
  "https://prototyprio.gumlet.io/strapi/8792f817d423d392ab9139ba41b92d8a.webp?w=384&q=75&format=webp&compress=true&dpr=2";

const img3 =
  "https://i.pinimg.com/474x/1f/d3/60/1fd3601b9937f89e727aec5d04c1edd4.jpg";

const img4 =
  "https://i.pinimg.com/474x/a4/54/7f/a4547f64df62554f4735b53357240b35.jpg";

const img5 =
  "https://i.pinimg.com/474x/7e/3a/20/7e3a207f605da5b2dca934284407bf86.jpg";

const img6 =
  "https://i.pinimg.com/474x/65/bc/8d/65bc8dfdc0019d5670d167b1a5d86c34.jpg";

const img7 =
  "https://i.pinimg.com/474x/3b/e7/eb/3be7eb7937b70a55431daf30e60cb796.jpg";

const placeholderAuthorImg =
  "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png?w=3840&q=75&format=auto&compress=true&dpr=2";

const AuthorCard = ({ data }) => {
  //   console.log(
  //     data?.attributes.firstName,
  //     data?.attributes?.legacyAvatar,
  //     data?.attributes?.avatar
  //   );
  const profileImg = data?.attributes?.avatar?.data?.attributes?.url;

  return (
    <>
      <div className="flex flex-row items-center border-t border-black pt-4 border-opacity-5">
        <div
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
        ></div>
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
      {/* {tagContent?.map((tag) => {
        const n = tag?.attributes.name || "";
        return (
          <span className="text-xs  font-inter px-6 py-2  bg-orange-100 text-black rounded-full">
            {n}
          </span>
        );
      })} */}

      {tagContent[0]?.attributes?.name && (
        <span
          //   style={{
          //     boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.10)",
          //   }}
          className="text-xs capitalize  font-inter px-4 py-2 border border-black border-opacity-5  bg-black bg-opacity-5 text-black rounded-full"
        >
          {tagContent[0]?.attributes?.name}
        </span>
      )}
      {/* 
      <span
        style={{
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.10)",
        }}
        className="text-xs font-normal text-gray-600 font-inter px-3 py-2 rounded-full"
      >
        Aug 30,2022
      </span> */}
    </div>
  );
};

const Credits = () => {
  return (
    <p className="px-4 py-1 bg-opacity-50 backdrop-blur-md bg-white absolute rounded-full bottom-5 right-5 text-[10px]">
      Artwork by @Ziggy
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
    <a
      href={`/post/${type === "regular" ? data?.attributes?.slug : data?.slug}`}
      className="w-full h-[330px] flex flex-row bg-white border-opacity-[4%] border-black hover:border col-span-2 rounded-[14px] overflow-hidden border hover:shadow-none cursor-pointer"
    >
      <div
        style={{
          backgroundImage: `url(${coverImage || null})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
        className="w-full h-full bg-gray-200 relative"
      >
        {/* <Credits /> */}
      </div>
      <div className="w-full h-full p-8 flex flex-col justify-between">
        <div className="flex flex-col grid gap-3">
          <MetaInfo
            tags={type === "regular" ? data?.attributes?.tags : data.tags || []}
          />
          <h1 className="text-lg leading-[27px] font-medium font-inter">
            {type === "regular" ? data?.attributes?.title : data?.title}
          </h1>
          <p className="text-base leading-[24px] font-inter h-[70px] line-clamp-3 text-[#626A6E] tracking-[-2%]">
            {type === "regular" ? data?.attributes?.excerpt : data?.excerpt}
          </p>
        </div>
        {data && type === "regular" ? (
          <AuthorCard data={data?.attributes?.author?.data} />
        ) : (
          <AuthorCard data={data?.author?.data} />
        )}{" "}
      </div>
    </a>
  );
};

const SmallCardWithImage = ({ src = img2, data, type }) => {
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
      className="w-full min-h-[330px] bg-white  border-opacity-[4%] border-black hover:border  rounded-[14px] flex flex-col overflow-hidden border  hover:shadow-none cursor-pointer"
    >
      {/* <div
        style={{
          backgroundImage: `url(${coverImage || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
        className="w-full h-[50%] max-h-[135px] bg-gray-200 relative"
      > */}
        {/* <Credits /> */}
      {/* </div> */}
      <div
        className="w-full h-[135px] max-h-[135px] bg-gray-200 relative"
      > 
      <Image
        loader={gumletLoader}
        priority={`true`}
        data-priority={`true`}
        objectFit="cover"
        layout="fill"
        data-gmlazy={`false`}
        className="object-cover relative w-full h-full overflow-hidden"
        src={coverImage||'/static/images/placeholder/letter-ad.png'}
      />
      </div>

      <div className="w-full h-auto grid flex flex-col grid gap-4 p-5 ">
        <MetaInfo
          tags={type === "regular" ? data?.attributes?.tags : data.tags || []}
        />
        <div className="flex flex-col ">
          <h1 className="text-lg leading-[27px] font-medium font-inter h-[56px] overflow-clip m-0 p-0 tracking-tight">
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
      <div className="flex flex-col space-y-8">
        <div className="w-full h-auto flex flex-col sm:grid sm:grid-cols-1 md:grid md:grid-cols-3 grid-flow-row auto-rows-[minmax(0, 330px)] gap-8">
          <LargeCardWithImage type={type} data={hero} src={img1} />
          
          
          <div
            className="w-full relative cursor-pointer overflow-hidden rounded-[10px] flex items-end"
          >
          <a href={sponsor?.link?sponsor.link:'https://letter.so'} target="_blank">
          <Image
            loader={gumletLoader}
            priority={`true`}
            data-priority={`true`}
            objectFit="cover"
            layout="fill"
            data-gmlazy={`false`}
            className="object-cover relative w-full h-full overflow-hidden rounded-[10px]"
            src={sponsor?.featuredImage?sponsor.featuredImage:'/static/images/placeholder/letter-ad.png'}
          />
          </a>

          </div>
        </div>

        <div className="w-full h-auto flex flex-col flex-wrap md:grid md:grid-cols-3 grid-flow-row auto-rows-[minmax(0, 330px)] gap-8">
          <div className="w-full bg-blue-200 rounded-2xl overflow-hidden p-10 min-h-[300px] col-span-2 flex flex-col grid gap-3 ">
            <h3 className="text-3xl font-inter max-w-md text-black font-bold">
              The Prototypr Weekly
            </h3>
            <p className="font-inter text-base leading-[24px] text-black text-opacity-70">
              Join 25,000+ creatives to enjoy a regular dose of inspiration and
              motivation, delivered to your inbox every Tuesday.
            </p>
            <div className="flex flex-col grid gap-4 ">
              <SignupHomepage />
            </div>
          </div>
          <SmallCardWithImage type={type} data={secondRowPost} src={img7} />
        </div>

        <div className="w-full h-auto flex flex-col flex-wrap sm:grid sm:grid-cols-2 md:grid-cols-3 grid-flow-row auto-rows-[minmax(0, 330px)] gap-8">
          {gridPosts.map((post, index) => {
            return index === 4 ? (
              <LargeCardWithImage type={type} data={post} src={img6} />
            ) : (
              <SmallCardWithImage type={type} data={post} src={img2} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroGrid;
