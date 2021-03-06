import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { FreeMode, Navigation, Thumbs, A11y } from "swiper";
import gumletLoader from "@/components/new-index/gumletLoader";

export default function SwiperGallery({ data = [] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return data && data.length && (
    <>
      <Swiper
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        navigation={true}
        loop={true}
        thumbs={{
          swiper: thumbsSwiper,
          slideThumbActiveClass: "border-blue-400 border-4 rounded-xl",
        }}
        modules={[FreeMode, Navigation, Thumbs, A11y]}
      >
        {data?.map((current, idx) => (
          <SwiperSlide
            className="bg-white pt-5 rounded-lg h-60 sm:h-96 overflow-hidden"
            key={`${idx}_main`}
          >
              <div className="relative border border-gray-200 border-1 rounded-lg h-60 sm:h-96 w-full lg:max-h-full relative overflow-hidden rounded-lg flex justify-center">
                <Image
                  loader={gumletLoader}
                  layout="fill"
                  objectFit="cover"
                  priority={idx == 0 ? true : false}
                  fetchpriority={idx == 0 ? "true" : "false"}
                  data-priority={idx == 0 ? `true` : `false`}
                  data-gmlazy={idx == 0 ? `false` : `true`}
                  // className="rounded-lg  object-contain h-60 sm:h-96"
                  src={current.original}
                  // data-src={current.original}
                  alt={`Gallery Image ${idx}`}
                  sizes={"(max-width: 300px) 100vw, 600px"}
                />
              </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="py-6 sm:pb-0 bg-white overflow-hidden sm:overflow-auto relative">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={6}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs, A11y]}
        >
          {data.map((current, idx) => (
            <SwiperSlide
              style={{ minWidth: "86px" }}
              className="h-20 w-20 overflow-scroll relative border border-1 border-gray-100 rounded-lg justify-center"
              key={idx}
            >
              <div className="rounded h-20 w-20 bg-white">
                <Image
                  priority={idx == 0 ? `true` : `false`}
                  fetchpriority={idx == 0 ? "true" : "false"}
                  data-priority={idx == 0 ? `true` : `false`}
                  data-gmlazy={idx == 0 ? `false` : `true`}
                  loader={gumletLoader}
                  layout="fill"
                  className="shine w-full h-full cursor-pointer bg-white object-cover rounded-lg"
                  src={current.thumbnail}
                  alt={`Gallery Image ${idx}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
