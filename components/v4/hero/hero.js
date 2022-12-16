import gumletLoader from "@/components/new-index/gumletLoader";
import SignupHomepage from "@/components/newsletter/SignupHomepage";
import Image from "next/image";
import Link from "next/link";
// import { useState } from "react";

const placeholderAuthorImg =
  "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png?w=3840&q=75&format=auto&compress=true&dpr=2";

const AuthorCard = ({ data }) => {
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
      {tagContent[0]?.attributes?.name && (
        <span className="text-xs capitalize  font-inter px-4 py-2 border border-black border-opacity-5  bg-black bg-opacity-5 text-black rounded-full">
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

const LargeCardSnow = () => {
  return (
    <svg
      width="398"
      height="100"
      viewBox="0 0 398 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_610_1996)">
        <path
          d="M66.5834 79.426L49.9301 85.1324C30.1161 91.9217 9.83124 76.1934 11.4718 55.3128C12.6283 40.5941 24.62 29.0717 39.3732 28.5036L380.834 15.353C385.838 15.1603 390 19.1651 390 24.1732C390 29.0481 386.048 33 381.173 33H349.145C341.22 33 333.466 35.3051 326.827 39.6344L318.92 44.7913C315.652 46.9228 312.141 48.6563 308.461 49.9549L288.5 57L234.587 70.6681C223.542 73.4682 211.867 72.3316 201.569 67.4539L200.449 66.9231C187.187 60.6414 171.809 60.6336 158.541 66.9018L133.67 78.652C122.324 84.012 109.355 84.8154 97.435 80.8964L92.4709 79.2644C84.0544 76.4973 74.9646 76.5541 66.5834 79.426Z"
          fill="black"
          fill-opacity="0.02"
        />
      </g>
      <mask
        id="mask0_610_1996"
        maskUnits="userSpaceOnUse"
        x="4"
        y="0"
        width="378"
        height="80"
      >
        <path
          d="M4.85076 34.2631L5.5 26C7.54289 12.5753 18.6663 2.3895 32.2185 1.53357L56.5 0H243.5H329H367.25C375.396 0 382 6.6038 382 14.75C382 22.8962 375.396 29.5 367.25 29.5H341.145C333.22 29.5 325.466 31.8051 318.827 36.1344L310.92 41.2913C307.652 43.4228 304.141 45.1563 300.461 46.4549L280.5 53.5L226.587 67.1681C215.542 69.9682 203.867 68.8316 193.569 63.9539L192.449 63.4231C179.187 57.1414 163.809 57.1336 150.541 63.4018L125.67 75.152C114.324 80.512 101.355 81.3154 89.435 77.3964L84.4709 75.7644C76.0544 72.9973 66.9646 73.0541 58.5834 75.926C30.9 85.4119 2.55855 63.4367 4.85076 34.2631Z"
          fill="white"
        />
        <path
          d="M4.85076 34.2631L5.5 26C7.54289 12.5753 18.6663 2.3895 32.2185 1.53357L56.5 0H243.5H329H367.25C375.396 0 382 6.6038 382 14.75C382 22.8962 375.396 29.5 367.25 29.5H341.145C333.22 29.5 325.466 31.8051 318.827 36.1344L310.92 41.2913C307.652 43.4228 304.141 45.1563 300.461 46.4549L280.5 53.5L226.587 67.1681C215.542 69.9682 203.867 68.8316 193.569 63.9539L192.449 63.4231C179.187 57.1414 163.809 57.1336 150.541 63.4018L125.67 75.152C114.324 80.512 101.355 81.3154 89.435 77.3964L84.4709 75.7644C76.0544 72.9973 66.9646 73.0541 58.5834 75.926C30.9 85.4119 2.55855 63.4367 4.85076 34.2631Z"
          fill="url(#paint0_linear_610_1996)"
        />
      </mask>
      <g mask="url(#mask0_610_1996)">
        <path
          d="M4.85076 34.2631L5.5 26C7.54289 12.5753 18.6663 2.3895 32.2185 1.53357L56.5 0H243.5H329H367.25C375.396 0 382 6.6038 382 14.75C382 22.8962 375.396 29.5 367.25 29.5H341.145C333.22 29.5 325.466 31.8051 318.827 36.1344L310.92 41.2913C307.652 43.4228 304.141 45.1563 300.461 46.4549L280.5 53.5L226.587 67.1681C215.542 69.9682 203.867 68.8316 193.569 63.9539L192.449 63.4231C179.187 57.1414 163.809 57.1336 150.541 63.4018L125.67 75.152C114.324 80.512 101.355 81.3154 89.435 77.3964L84.4709 75.7644C76.0544 72.9973 66.9646 73.0541 58.5834 75.926C30.9 85.4119 2.55855 63.4367 4.85076 34.2631Z"
          fill="white"
        />
        <path
          d="M4.85076 34.2631L5.5 26C7.54289 12.5753 18.6663 2.3895 32.2185 1.53357L56.5 0H243.5H329H367.25C375.396 0 382 6.6038 382 14.75C382 22.8962 375.396 29.5 367.25 29.5H341.145C333.22 29.5 325.466 31.8051 318.827 36.1344L310.92 41.2913C307.652 43.4228 304.141 45.1563 300.461 46.4549L280.5 53.5L226.587 67.1681C215.542 69.9682 203.867 68.8316 193.569 63.9539L192.449 63.4231C179.187 57.1414 163.809 57.1336 150.541 63.4018L125.67 75.152C114.324 80.512 101.355 81.3154 89.435 77.3964L84.4709 75.7644C76.0544 72.9973 66.9646 73.0541 58.5834 75.926C30.9 85.4119 2.55855 63.4367 4.85076 34.2631Z"
          fill="url(#paint1_linear_610_1996)"
        />
        <path
          d="M5.26559 8.19319L5.97035 -0.77651C8.18795 -15.3493 20.2626 -26.4062 34.9738 -27.3353L61.3318 -29H264.324H357.136H456.533C466.034 -29 473.98 -21.7813 474.89 -12.3237C475.568 -5.26574 472.14 1.55629 466.072 5.22394L445.299 17.7788C433.324 25.0166 418.979 27.2441 405.373 23.9786L395.872 21.6984C389.286 20.1177 382.459 19.8095 375.757 20.7902L319.143 29.0753L257.584 44.6816C247.466 47.2468 236.817 46.7782 226.963 43.3342L206.736 36.2646C193.555 31.6575 179.09 32.4184 166.465 38.3831L136.417 52.5789C124.101 58.3973 110.023 59.2694 97.0833 55.0153L91.6947 53.2437C82.5585 50.24 72.6914 50.3016 63.5933 53.4191C33.5425 63.7162 2.77735 39.8617 5.26559 8.19319Z"
          fill="white"
          stroke="#E8F8FD"
          stroke-opacity="0.2"
        />
        <path
          d="M-16.9459 -20.4386L-17.4513 -23.8555C-17.8358 -26.455 -17.8303 -29.0972 -17.4349 -31.6951C-15.5654 -43.9806 -5.3859 -53.3021 7.01641 -54.0854L37.3302 -56H240.322H333.134H432.531C442.033 -56 449.979 -48.7813 450.888 -39.3237C451.567 -32.2657 448.139 -25.4437 442.07 -21.7761L421.298 -9.22118C409.322 -1.98338 394.978 0.244114 381.371 -3.02138L373.187 -4.98563C365.75 -6.77048 358.016 -6.93056 350.511 -5.45497L276.998 9L234.553 23.277C226.309 26.05 217.511 26.759 208.929 25.3418L175.55 19.8295C170.213 18.9483 164.774 18.8861 159.419 19.6451L103.998 27.5H57.4943C53.5097 27.5 49.5376 27.0523 45.653 26.1652L20.9541 20.5251C1.08487 15.988 -13.9638 -0.277252 -16.9459 -20.4386Z"
          fill="#FAFDFF"
        />
        <path
          d="M-16.9459 -20.4386L-17.4513 -23.8555C-17.8358 -26.455 -17.8303 -29.0972 -17.4349 -31.6951C-15.5654 -43.9806 -5.3859 -53.3021 7.01641 -54.0854L37.3302 -56H240.322H333.134H432.531C442.033 -56 449.979 -48.7813 450.888 -39.3237C451.567 -32.2657 448.139 -25.4437 442.07 -21.7761L421.298 -9.22118C409.322 -1.98338 394.978 0.244114 381.371 -3.02138L373.187 -4.98563C365.75 -6.77048 358.016 -6.93056 350.511 -5.45497L276.998 9L234.553 23.277C226.309 26.05 217.511 26.759 208.929 25.3418L175.55 19.8295C170.213 18.9483 164.774 18.8861 159.419 19.6451L103.998 27.5H57.4943C53.5097 27.5 49.5376 27.0523 45.653 26.1652L20.9541 20.5251C1.08487 15.988 -13.9638 -0.277252 -16.9459 -20.4386Z"
          fill="url(#paint2_linear_610_1996)"
          fill-opacity="0.2"
        />
        <path
          d="M-16.9459 -20.4386L-17.4513 -23.8555C-17.8358 -26.455 -17.8303 -29.0972 -17.4349 -31.6951C-15.5654 -43.9806 -5.3859 -53.3021 7.01641 -54.0854L37.3302 -56H240.322H333.134H432.531C442.033 -56 449.979 -48.7813 450.888 -39.3237C451.567 -32.2657 448.139 -25.4437 442.07 -21.7761L421.298 -9.22118C409.322 -1.98338 394.978 0.244114 381.371 -3.02138L373.187 -4.98563C365.75 -6.77048 358.016 -6.93056 350.511 -5.45497L276.998 9L234.553 23.277C226.309 26.05 217.511 26.759 208.929 25.3418L175.55 19.8295C170.213 18.9483 164.774 18.8861 159.419 19.6451L103.998 27.5H57.4943C53.5097 27.5 49.5376 27.0523 45.653 26.1652L20.9541 20.5251C1.08487 15.988 -13.9638 -0.277252 -16.9459 -20.4386Z"
          stroke="#E2F6FC"
          stroke-opacity="0.08"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_610_1996"
          x="3.37891"
          y="7.34668"
          width="394.621"
          height="87.3867"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="4"
            result="effect1_foregroundBlur_610_1996"
          />
        </filter>
        <linearGradient
          id="paint0_linear_610_1996"
          x1="215.5"
          y1="13"
          x2="219"
          y2="96"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0" />
          <stop offset="1" stop-color="#C5EDFA" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_610_1996"
          x1="215.5"
          y1="13"
          x2="219"
          y2="96"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0" />
          <stop offset="1" stop-color="#C5EDFA" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_610_1996"
          x1="107"
          y1="-25"
          x2="107.5"
          y2="21.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.316738" stop-color="#D3DAE4" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
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
      style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)" }}
      className="w-full relative h-auto sm:h-[330px] flex flex-col sm:flex-row bg-white border-opacity-[4%] col-span-2 rounded-[20px]  hover:shadow-none cursor-pointer"
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
      style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)" }}
      className="w-full mb-8 sm:mb-0 min-h-[330px] bg-white  border-opacity-[4%] border-black  rounded-[16px] flex flex-col overflow-hidden cursor-pointer"
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

const SmallSnow = () => {
  return (
    <svg
      width="205"
      height="60"
      viewBox="0 0 205 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_610_2001"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="203"
        height="52"
      >
        <path
          d="M190.09 43L197.369 34.7005C202.117 29.287 203.746 21.8115 201.681 14.9135C199.03 6.06278 190.886 0 181.648 0H170.435H43.6981H33.532H12.3161C6.70258 0 1.85025 3.9177 0.667221 9.40515L0.500427 10.1788C0.172501 11.6999 0.24736 13.2802 0.717621 14.7635C1.89493 18.4769 5.34175 21 9.2373 21H12.9166C14.0053 21 15.0903 21.1273 16.1495 21.3794L29.1948 24.484C33.4143 25.4881 37.4449 27.1642 41.1323 29.4479L48.7147 34.144C57.4396 39.5477 68.5032 39.4148 77.0958 33.8031C81.3952 30.9952 86.4192 29.5 91.5543 29.5H91.8131C97.334 29.5 102.725 31.1732 107.276 34.299L110.736 36.6754C116.645 40.734 123.893 42.3525 130.967 41.1928C137.623 40.1016 144.448 41.4679 150.171 45.0369L154.397 47.6726C165.884 54.8368 180.834 52.8797 190.09 43Z"
          fill="white"
        />
        <path
          d="M190.09 43L197.369 34.7005C202.117 29.287 203.746 21.8115 201.681 14.9135C199.03 6.06278 190.886 0 181.648 0H170.435H43.6981H33.532H12.3161C6.70258 0 1.85025 3.9177 0.667221 9.40515L0.500427 10.1788C0.172501 11.6999 0.24736 13.2802 0.717621 14.7635C1.89493 18.4769 5.34175 21 9.2373 21H12.9166C14.0053 21 15.0903 21.1273 16.1495 21.3794L29.1948 24.484C33.4143 25.4881 37.4449 27.1642 41.1323 29.4479L48.7147 34.144C57.4396 39.5477 68.5032 39.4148 77.0958 33.8031C81.3952 30.9952 86.4192 29.5 91.5543 29.5H91.8131C97.334 29.5 102.725 31.1732 107.276 34.299L110.736 36.6754C116.645 40.734 123.893 42.3525 130.967 41.1928C137.623 40.1016 144.448 41.4679 150.171 45.0369L154.397 47.6726C165.884 54.8368 180.834 52.8797 190.09 43Z"
          fill="url(#paint0_linear_610_2001)"
        />
      </mask>
      <g mask="url(#mask0_610_2001)">
        <path
          d="M190.09 43L197.369 34.7005C202.117 29.287 203.746 21.8115 201.681 14.9135C199.03 6.06278 190.886 0 181.648 0H170.435H43.6981H33.532H12.3161C6.70258 0 1.85025 3.91771 0.667206 9.40516L0.500427 10.1788C0.172501 11.6999 0.24736 13.2802 0.717621 14.7635C1.89491 18.4769 5.34175 21 9.2373 21H12.9166C14.0053 21 15.0903 21.1273 16.1495 21.3794L29.1948 24.484C33.4143 25.4881 37.4449 27.1642 41.1323 29.4479L48.7147 34.144C57.4396 39.5477 68.5032 39.4148 77.0958 33.8031C81.3952 30.9952 86.4192 29.5 91.5543 29.5H91.8131C97.334 29.5 102.725 31.1732 107.276 34.299L110.736 36.6754C116.645 40.734 123.893 42.3525 130.967 41.1928C137.623 40.1016 144.448 41.4679 150.171 45.0369L154.397 47.6726C165.884 54.8368 180.834 52.8797 190.09 43Z"
          fill="white"
        />
        <path
          d="M190.09 43L197.369 34.7005C202.117 29.287 203.746 21.8115 201.681 14.9135C199.03 6.06278 190.886 0 181.648 0H170.435H43.6981H33.532H12.3161C6.70258 0 1.85025 3.91771 0.667206 9.40516L0.500427 10.1788C0.172501 11.6999 0.24736 13.2802 0.717621 14.7635C1.89491 18.4769 5.34175 21 9.2373 21H12.9166C14.0053 21 15.0903 21.1273 16.1495 21.3794L29.1948 24.484C33.4143 25.4881 37.4449 27.1642 41.1323 29.4479L48.7147 34.144C57.4396 39.5477 68.5032 39.4148 77.0958 33.8031C81.3952 30.9952 86.4192 29.5 91.5543 29.5H91.8131C97.334 29.5 102.725 31.1732 107.276 34.299L110.736 36.6754C116.645 40.734 123.893 42.3525 130.967 41.1928C137.623 40.1016 144.448 41.4679 150.171 45.0369L154.397 47.6726C165.884 54.8368 180.834 52.8797 190.09 43Z"
          fill="url(#paint1_linear_610_2001)"
        />
        <path
          d="M207.803 0.581587L207.375 -4.86431C206.029 -13.7121 198.698 -20.4252 189.766 -20.9893L173.763 -22H50.5177H-5.8324H-66.1808C-71.9493 -22 -76.7738 -17.6172 -77.3259 -11.8751C-77.7379 -7.58991 -75.6566 -3.44796 -71.9723 -1.22118L-59.3604 6.40143C-52.0896 10.7958 -43.3802 12.1482 -35.1193 10.1656L-29.3508 8.78117C-25.3522 7.82149 -21.207 7.63434 -17.1381 8.22979L17.2349 13.26L54.6097 22.7353C60.7529 24.2927 67.2185 24.0082 73.2011 21.9172L85.4818 17.6249C93.4847 14.8278 102.267 15.2897 109.932 18.9112L128.175 27.5301C135.653 31.0627 144.2 31.5921 152.057 29.0093L155.328 27.9337C160.875 26.11 166.866 26.1474 172.39 28.0402C190.635 34.292 209.314 19.8089 207.803 0.581587Z"
          fill="white"
          stroke="#E8F8FD"
          stroke-opacity="0.2"
          stroke-width="0.607143"
        />
        <path
          d="M216.45 -11.7517L216.695 -13.409C216.882 -14.6698 216.879 -15.9514 216.687 -17.2114C215.781 -23.1703 210.843 -27.6915 204.828 -28.0714L190.125 -29H91.6674H46.6509H-1.55981C-6.16817 -29 -10.0223 -25.4987 -10.4633 -20.9115C-10.7925 -17.4882 -9.12979 -14.1793 -6.18649 -12.4004L3.88884 -6.31087C9.6972 -2.80032 16.6549 -1.71992 23.2544 -3.30378L27.224 -4.2565C30.8311 -5.12221 34.5825 -5.19986 38.2224 -4.48415L73.8784 2.52695L94.4655 9.45171C98.4641 10.7967 102.732 11.1406 106.894 10.4532L123.084 7.7796C125.672 7.35219 128.311 7.32202 130.908 7.69015L157.789 11.5H180.344C182.277 11.5 184.204 11.2828 186.088 10.8526L198.067 8.11699C207.705 5.91632 215.004 -1.9728 216.45 -11.7517Z"
          fill="#FAFDFF"
        />
        <path
          d="M216.45 -11.7517L216.695 -13.409C216.882 -14.6698 216.879 -15.9514 216.687 -17.2114C215.781 -23.1703 210.843 -27.6915 204.828 -28.0714L190.125 -29H91.6674H46.6509H-1.55981C-6.16817 -29 -10.0223 -25.4987 -10.4633 -20.9115C-10.7925 -17.4882 -9.12979 -14.1793 -6.18649 -12.4004L3.88884 -6.31087C9.6972 -2.80032 16.6549 -1.71992 23.2544 -3.30378L27.224 -4.2565C30.8311 -5.12221 34.5825 -5.19986 38.2224 -4.48415L73.8784 2.52695L94.4655 9.45171C98.4641 10.7967 102.732 11.1406 106.894 10.4532L123.084 7.7796C125.672 7.35219 128.311 7.32202 130.908 7.69015L157.789 11.5H180.344C182.277 11.5 184.204 11.2828 186.088 10.8526L198.067 8.11699C207.705 5.91632 215.004 -1.9728 216.45 -11.7517Z"
          fill="url(#paint2_linear_610_2001)"
          fill-opacity="0.2"
        />
        <path
          d="M216.45 -11.7517L216.695 -13.409C216.882 -14.6698 216.879 -15.9514 216.687 -17.2114C215.781 -23.1703 210.843 -27.6915 204.828 -28.0714L190.125 -29H91.6674H46.6509H-1.55981C-6.16817 -29 -10.0223 -25.4987 -10.4633 -20.9115C-10.7925 -17.4882 -9.12979 -14.1793 -6.18649 -12.4004L3.88884 -6.31087C9.6972 -2.80032 16.6549 -1.71992 23.2544 -3.30378L27.224 -4.2565C30.8311 -5.12221 34.5825 -5.19986 38.2224 -4.48415L73.8784 2.52695L94.4655 9.45171C98.4641 10.7967 102.732 11.1406 106.894 10.4532L123.084 7.7796C125.672 7.35219 128.311 7.32202 130.908 7.69015L157.789 11.5H180.344C182.277 11.5 184.204 11.2828 186.088 10.8526L198.067 8.11699C207.705 5.91632 215.004 -1.9728 216.45 -11.7517Z"
          stroke="#E2F6FC"
          stroke-opacity="0.08"
          stroke-width="0.48503"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_610_2001"
          x1="62.6749"
          y1="13"
          x2="57.5214"
          y2="95.827"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0" />
          <stop offset="1" stop-color="#C5EDFA" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_610_2001"
          x1="72.5"
          y1="-15.5"
          x2="62.2244"
          y2="67.1549"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.195217" stop-color="white" stop-opacity="0" />
          <stop offset="1" stop-color="#C5EDFA" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_610_2001"
          x1="164.5"
          y1="-59"
          x2="156.09"
          y2="8.58982"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.316738" stop-color="#D3DAE4" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const XmasLights = () => {
  return (
    <svg
      width="281"
      height="85"
      viewBox="0 0 281 85"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.72536 42.5261C3.93072 47.0116 1 51.7771 1 58.8938C1 60.5521 2.44991 61.4273 3.7266 61.7517C8.31036 62.9164 12.3359 59.9452 16.173 57.335C20.9546 54.0822 25.552 50.4004 30.3614 47.2315C34.8682 44.2618 39.7361 40.9228 45.0295 40.5054C53.9086 39.8052 61.8753 45.6517 65.277 55.1988C66.2913 58.0456 66.8443 60.6223 65.7314 63.5414C65.0522 65.3231 64.7001 67.4674 62.8281 67.4674C57.6496 67.4674 55.9864 60.4201 55.9864 55.4875C55.9864 49.1857 61.0758 43.9522 64.8478 40.0435C72.3868 32.2313 80.7434 25.0941 90.4475 21.2798C91.9776 20.6784 99.6635 17.1819 101.606 19.4035C102.014 19.8695 102.957 19.5821 103.727 19.6921C105.712 19.9758 107.289 21.6698 108.499 23.3294C113.759 30.5475 116.251 41.9722 113.927 51.1285C113.1 54.3829 111.618 55.1346 109.155 53.7266C106.426 52.1665 106.814 47.5467 107.918 44.5179C110.596 37.1697 118.533 31.769 124.479 28.5255C133.994 23.3356 144.085 19.7947 154.472 17.8735C157.77 17.2635 165.809 15.3812 168.862 18.3354C171.248 20.6435 173.23 25.1172 173.23 28.7853C173.23 32.5725 174.308 37.9475 170.503 39.6394C166.109 41.5934 161.075 35.2294 162.526 30.3441C163.745 26.2385 168.312 22.8854 171.16 20.4716C178.167 14.5322 186.027 10.51 194.033 6.67303C197.294 5.10998 201.308 2.65931 204.939 2.51615C205.767 2.48353 206.21 2.99221 206.858 3.03576C208.469 3.14411 210.573 4.28489 212.109 5.1142C216.291 7.37241 218.29 11.0767 219.936 16.026C222.619 24.0937 223.97 32.0714 230.287 37.6187C235.702 42.3746 243.559 44.8797 249.423 39.5816C252.848 36.4879 257.15 25.4139 250.686 23.416C246.106 22.0008 243.96 24.1166 242.304 28.9008C240.21 34.9492 239.911 42.6765 244.222 47.6067C247.897 51.8078 254.727 54.709 259.572 56.5556C261.982 57.4741 264.757 57.7457 266.742 59.7887C269.887 63.0248 271.241 69.5458 275.932 69.5458C286.108 71.5 273.864 47.6067 270.366 47.6067"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <mask
        id="mask0_610_2013"
        maskUnits="userSpaceOnUse"
        x="12"
        y="56"
        width="11"
        height="20"
      >
        <rect
          width="8.79892"
          height="18.911"
          rx="4.39946"
          transform="matrix(0.973992 0.226582 -0.175181 0.984536 14.625 56)"
          fill="#FF3C3C"
        />
      </mask>
      <g mask="url(#mask0_610_2013)">
        <rect
          width="8.79892"
          height="18.911"
          rx="4.39946"
          transform="matrix(0.973992 0.226582 -0.175181 0.984536 14.625 56)"
          fill="#FF3C3C"
        />
        <rect
          width="8.79892"
          height="18.911"
          rx="4.39946"
          transform="matrix(0.973992 0.226582 -0.175181 0.984536 10.2539 55)"
          fill="#181F46"
          fill-opacity="0.06"
        />
        <rect
          width="1.97737"
          height="9.78023"
          rx="0.988687"
          transform="matrix(0.973992 0.226582 -0.175181 0.984536 19.1484 61)"
          fill="white"
          fill-opacity="0.17"
        />
      </g>
      <mask
        id="mask1_610_2013"
        maskUnits="userSpaceOnUse"
        x="46"
        y="63"
        width="15"
        height="18"
      >
        <rect
          width="9.07464"
          height="18.4346"
          rx="4.53732"
          transform="matrix(0.738273 0.708334 -0.5794 0.789538 55.1836 61.8076)"
          fill="#FF3C3C"
        />
      </mask>
      <g mask="url(#mask1_610_2013)">
        <rect
          width="9.07464"
          height="18.4346"
          rx="4.53732"
          transform="matrix(0.738273 0.708334 -0.5794 0.789538 55.1836 61.8076)"
          fill="#4B3CFF"
        />
        <rect
          width="9.07464"
          height="18.4346"
          rx="4.53732"
          transform="matrix(0.738273 0.708334 -0.5794 0.789538 51.7578 58.543)"
          fill="#181F46"
          fill-opacity="0.06"
        />
        <rect
          width="2.03933"
          height="9.53387"
          rx="1.01967"
          transform="matrix(0.738273 0.708334 -0.5794 0.789538 57.0742 68.6689)"
          fill="white"
          fill-opacity="0.17"
        />
      </g>
      <mask
        id="mask2_610_2013"
        maskUnits="userSpaceOnUse"
        x="83"
        y="3"
        width="13"
        height="19"
      >
        <rect
          width="9.18504"
          height="18.2362"
          rx="4.59252"
          transform="matrix(0.876471 -0.4254 0.356033 0.959059 82.2578 5.55078)"
          fill="#FF3C3C"
        />
      </mask>
      <g mask="url(#mask2_610_2013)">
        <rect
          width="9.18504"
          height="18.2362"
          rx="4.59252"
          transform="matrix(0.876471 -0.4254 0.356033 0.959059 82.2578 5.55078)"
          fill="#FFD43C"
        />
        <rect
          width="9.18504"
          height="18.2362"
          rx="4.59252"
          transform="matrix(0.876471 -0.4254 0.356033 0.959059 78.1602 7.55859)"
          fill="#181F46"
          fill-opacity="0.06"
        />
        <rect
          width="2.06414"
          height="9.43124"
          rx="1.03207"
          transform="matrix(0.876471 -0.4254 0.356033 0.959059 88.4609 6.74219)"
          fill="white"
          fill-opacity="0.17"
        />
      </g>
      <mask
        id="mask3_610_2013"
        maskUnits="userSpaceOnUse"
        x="132"
        y="4"
        width="11"
        height="20"
      >
        <rect
          width="8.80826"
          height="18.8953"
          rx="4.40413"
          transform="matrix(0.98651 0.128519 -0.0995522 0.999077 134.426 3.85449)"
          fill="#FF3C3C"
        />
      </mask>
      <g mask="url(#mask3_610_2013)">
        <rect
          width="8.80826"
          height="18.8953"
          rx="4.40413"
          transform="matrix(0.98651 0.128519 -0.0995522 0.999077 134.426 3.85449)"
          fill="#FF3C3C"
        />
        <rect
          width="8.80826"
          height="18.8953"
          rx="4.40413"
          transform="matrix(0.98651 0.128519 -0.0995522 0.999077 129.992 3.29395)"
          fill="#181F46"
          fill-opacity="0.06"
        />
        <rect
          width="1.97947"
          height="9.77211"
          rx="0.989736"
          transform="matrix(0.98651 0.128519 -0.0995522 0.999077 139.312 8.38477)"
          fill="white"
          fill-opacity="0.17"
        />
      </g>
      <mask
        id="mask4_610_2013"
        maskUnits="userSpaceOnUse"
        x="160"
        y="38"
        width="12"
        height="20"
      >
        <rect
          width="8.79892"
          height="18.911"
          rx="4.39946"
          transform="matrix(0.973992 0.226582 -0.175181 0.984536 163.297 38)"
          fill="#FF3C3C"
        />
      </mask>
      <g mask="url(#mask4_610_2013)">
        <rect
          width="8.79892"
          height="18.911"
          rx="4.39946"
          transform="matrix(0.973992 0.226582 -0.175181 0.984536 163.297 38)"
          fill="#32CD95"
        />
        <rect
          width="8.79892"
          height="18.911"
          rx="4.39946"
          transform="matrix(0.973992 0.226582 -0.175181 0.984536 158.926 37)"
          fill="#181F46"
          fill-opacity="0.06"
        />
        <rect
          width="1.97737"
          height="9.78023"
          rx="0.988687"
          transform="matrix(0.973992 0.226582 -0.175181 0.984536 167.82 43)"
          fill="white"
          fill-opacity="0.17"
        />
      </g>
      <mask
        id="mask5_610_2013"
        maskUnits="userSpaceOnUse"
        x="187"
        y="7"
        width="10"
        height="20"
      >
        <rect
          x="187.793"
          y="7.80664"
          width="8.74565"
          height="19"
          rx="4.42384"
          fill="#FF3C3C"
        />
      </mask>
      <g mask="url(#mask5_610_2013)">
        <rect
          x="187.793"
          y="7.80664"
          width="8.74565"
          height="19"
          rx="4.42384"
          fill="#4B3BFF"
        />
        <rect
          x="183.332"
          y="7.82324"
          width="8.74565"
          height="19"
          rx="4.42384"
          fill="#181F46"
          fill-opacity="0.06"
        />
        <rect
          x="193.098"
          y="11.6748"
          width="1.9654"
          height="9.82626"
          rx="0.994165"
          fill="white"
          fill-opacity="0.17"
        />
      </g>
      <mask
        id="mask6_610_2013"
        maskUnits="userSpaceOnUse"
        x="220"
        y="9"
        width="14"
        height="18"
      >
        <rect
          width="8.9485"
          height="18.6559"
          rx="4.47425"
          transform="matrix(0.828824 0.592188 -0.471997 0.863689 227.996 7.32617)"
          fill="#FF3C3C"
        />
      </mask>
      <g mask="url(#mask6_610_2013)">
        <rect
          width="8.9485"
          height="18.6559"
          rx="4.47425"
          transform="matrix(0.828824 0.592188 -0.471997 0.863689 227.996 7.32617)"
          fill="#FF3C3C"
        />
        <rect
          width="8.9485"
          height="18.6559"
          rx="4.47425"
          transform="matrix(0.828824 0.592188 -0.471997 0.863689 224.207 4.63867)"
          fill="#181F46"
          fill-opacity="0.06"
        />
        <rect
          width="2.01099"
          height="9.64831"
          rx="1.00549"
          transform="matrix(0.828824 0.592188 -0.471997 0.863689 230.703 13.8213)"
          fill="white"
          fill-opacity="0.17"
        />
      </g>
      <mask
        id="mask7_610_2013"
        maskUnits="userSpaceOnUse"
        x="248"
        y="8"
        width="14"
        height="18"
      >
        <rect
          width="8.9485"
          height="18.6559"
          rx="4.47425"
          transform="matrix(0.828824 0.592188 -0.471997 0.863689 255.984 6.32617)"
          fill="#FF3C3C"
        />
      </mask>
      <g mask="url(#mask7_610_2013)">
        <rect
          width="8.9485"
          height="18.6559"
          rx="4.47425"
          transform="matrix(0.828824 0.592188 -0.471997 0.863689 255.984 6.32617)"
          fill="#32CD95"
        />
        <rect
          width="8.9485"
          height="18.6559"
          rx="4.47425"
          transform="matrix(0.828824 0.592188 -0.471997 0.863689 252.195 3.63867)"
          fill="#181F46"
          fill-opacity="0.06"
        />
        <rect
          width="2.01099"
          height="9.64831"
          rx="1.00549"
          transform="matrix(0.828824 0.592188 -0.471997 0.863689 258.691 12.8213)"
          fill="white"
          fill-opacity="0.17"
        />
      </g>
      <mask
        id="mask8_610_2013"
        maskUnits="userSpaceOnUse"
        x="258"
        y="59"
        width="12"
        height="20"
      >
        <rect
          width="8.80042"
          height="18.9085"
          rx="4.40021"
          transform="matrix(0.980148 0.187545 -0.145044 0.991059 261.098 58.8379)"
          fill="#FF3C3C"
        />
      </mask>
      <g mask="url(#mask8_610_2013)">
        <rect
          width="8.80042"
          height="18.9085"
          rx="4.40021"
          transform="matrix(0.980148 0.187545 -0.145044 0.991059 261.098 58.8379)"
          fill="#FFD43B"
        />
        <rect
          width="8.80042"
          height="18.9085"
          rx="4.40021"
          transform="matrix(0.980148 0.187545 -0.145044 0.991059 256.695 58.0127)"
          fill="#181F46"
          fill-opacity="0.06"
        />
        <rect
          width="1.97771"
          height="9.77893"
          rx="0.988855"
          transform="matrix(0.980148 0.187545 -0.145044 0.991059 265.77 63.6543)"
          fill="white"
          fill-opacity="0.17"
        />
      </g>
    </svg>
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
            <div className="absolute z-20 top-0 right-0 translate-x-2 -translate-y-2">
              <SmallSnow />
            </div>

            <div className="w-full  cursor-pointer overflow-hidden rounded-[10px] flex items-end">
              <a
                href={sponsor?.link ? sponsor.link : "https://letter.so"}
                target="_blank"
              >
                <Image
                  loader={gumletLoader}
                  priority={`true`}
                  data-priority={`true`}
                  objectFit="cover"
                  layout="fill"
                  data-gmlazy={`false`}
                  className="object-cover relative w-full h-full overflow-hidden rounded-[10px]"
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

        <div className="w-full h-auto flex flex-col flex-wrap md:grid md:grid-cols-3 grid-flow-row auto-rows-[minmax(0, 330px)] md:gap-8 ">
          <div className="w-full bg-blue-200 rounded-2xl overflow-hidden p-10 min-h-[300px] col-span-2 flex flex-col grid gap-3 ">
            <h3 className="text-3xl font-inter max-w-md text-black font-bold">
              The Prototypr Weekly
            </h3>
            <p className="font-inter text-base leading-[24px] text-black text-opacity-70">
              Join 25,000+ creatives to enjoy a regular dose of inspiration and
              motivation, delivered to your inbox every Tuesday.
            </p>
            <div className="flex flex-col md:grid grid gap-4 ">
              <SignupHomepage />
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
