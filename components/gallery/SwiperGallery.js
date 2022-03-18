import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper";

export default function SwiperGallery({ data = [] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);


  return data && data.length ? (
    <>
      <Swiper
        style={{
          // "--swiper-navigation-color": "#fff",
        }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        navigation={true}
        loop={true}
        thumbs={{
          swiper: thumbsSwiper,
          slideThumbActiveClass: "border-blue-400 border-4 rounded-xl",
        }}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {data?.map((current, idx) => (
          <SwiperSlide
            className="bg-white pt-10 h-60 sm:h-96 overflow-hidden"
            key={idx + "_main"}
          >
            {current.type == "image" && current.original ? (
              <div className="relative h-60 sm:h-96 w-full lg:max-h-full rounded-lg flex justify-center">
                <img
                  className="rounded-lg  object-contain h-60 sm:h-96"
                  src={current.original}
                  // data-src={current.original}
                  alt={`Gallery Image ${idx}`}
                  width={'600px'}
                  sizes={"(max-width: 300px) 100vw, 600px"}
                />
              </div>
            ) : (
              <div
                className={"image-gallery-image rounded-lg "}
                style={{ textAlign: "center" }}
              >
                {/* VIDEO */}
                <div className="video-wrapper h-60 sm:h-96">
                  <iframe
                    width="550"
                    height="440"
                    src={current.embedUrl}
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="py-6 sm:pb-2 sm:px-2 bg-white overflow-hidden sm:overflow-auto relative">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10} 
            slidesPerView={6}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            {data.map((current, idx) => (
              <SwiperSlide className="h-20 w-20 relative flex justify-center" key={idx}>
                <div className="rounded h-20 w-20 bg-white">
                  <img
                    className="shadow-sm shine h-32 w-32 cursor-pointer bg-white object-cover rounded-lg"
                    style={{ maxHeight: "120px", display: "block" }}
                    src={current.thumbnail}
                    alt={`Gallery Image ${idx}`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
      </div>
    </>
  ) : null;
}
