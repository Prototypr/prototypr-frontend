import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SPONSOR_MOCK_DATA from "@/components/gallery/sponsorMockData";
export default function SponsorCard({ author = {}, position }) {
  const sponsor = SPONSOR_MOCK_DATA;

  const get_url_extension = (url) => {
    return url.split(/[#?]/)[0].split('.').pop().trim();
  }
  return (
    <>
      {sponsor ? (
        <div className="bg-white  border-gray-300 p-5 rounded-lg shadow flex flex-row sm:flex-col">
          <a
            href={sponsor.node.sponsorInfo.trackingLink}
            className=""
          >
            {get_url_extension(
              sponsor.node.sponsorInfo.sponsorImage
            ) == "mp4" ? (
              <video
                className="rounded-lg"
                autoplay="autoplay"
                muted
                loop="true"
              >
                <source
                  src={sponsor.node.sponsorInfo.sponsorImage}
                  type="video/mp4"
                />
                Your browser does not support this video.
              </video>
            ) : (
              // <div className="relative h-32">
              <div
                className="relative rounded mb-2 w-full"
                style={{ height: "148px" }}
              >
                <Image
                  // width="215px"
                  priority={false}
                  // height="135px"
                  data-gumlet={false}
                  layout="fill"
                  objectFit="cover"
                  src={
                    position == "right" &&
                    sponsor.node.sponsorInfo.rightBanner
                      ? sponsor.node.sponsorInfo.rightBanner
                      : position == "left" &&
                        sponsor.node.sponsorInfo.leftBanner
                      ? sponsor.node.sponsorInfo.leftBanner
                      : sponsor.node.sponsorInfo.sponsorImage
                      ? sponsor.node.sponsorInfo.sponsorImage
                      : ""
                  }
                  // dataGumlet="false"
                  className="md:w-auto flex-shrink-0 sm:w-full rounded-lg mr-4 object-contain"
                  alt={sponsor.node.sponsorInfo.sponsorImage}
                />
              </div>
            )}
          </a>
          <div className="flex-col sm:px-0 px-4">
            {/* <img alt={sponsor.sponsor_name} style={{ height: "134px" }} className=" w-full object-cover rounded-lg mr-4" src={sponsor.sponsor_image + '?' + Date.now()} /></a> */}
            <a
              href={sponsor.node.sponsorInfo.trackingLink}
              className="block sm:mt-1"
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: sponsor.node.excerpt,
                }}
                className="text-sm cursor-pointer leading-5 font-medium text-gray-800"
              />
            </a>
            <h1 className="text-xs text-gray-700 uppercase mt-4 ">
              Brought to you by:
            </h1>
            <h1 className="text-sm font-semibold">
              {sponsor.node.sponsorInfo.sponsorName}
            </h1>
          </div>
        </div>
      ) : (
        <div className="bg-white  border-gray-300 p-5 rounded-lg shadow">
          {/* 👑Become a Patron */}
          {/* <h1>💎 Free .Design Domain</h1> */}
          <a href="http://bit.ly/2SY1U5P" className="">
            <img
              alt={"Letter"}
              style={{ height: "134px" }}
              className=" w-full flex-shrink-0 shine object-cover rounded-lg mr-4"
              data-src="https://prototypr.io/wp-content/uploads/2020/04/04cd77f2-4875-419f-96b7-f9d7f33ddd02.jpeg"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />
          </a>
          <a href="http://bit.ly/2SY1U5P" className="block mt-3">
            <div className="text-sm cursor-pointer leading-5 font-medium text-gray-800">
              Make your prototypes more interactive and realistic with ProtoPie.
              🥧
            </div>
          </a>
          <h1 className="text-xs text-gray-700 uppercase mt-3 ">
            Brought to you by:
          </h1>
          <h1 className="text-sm font-semibold">ProtoPie</h1>
        </div>
      )}
    </>
  );
}
