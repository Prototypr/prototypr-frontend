import React from 'react'
import Image from "next/image";
import gumletLoader from "@/components/new-index/gumletLoader";

export const Thumb = (props) => {
  const { selected, imgSrc, index, onClick } = props

  return (
    <div
      className={'embla-thumbs__slide'.concat(
        selected ? ' embla-thumbs__slide--selected' : ''
      )}
    >
      <button
        onClick={onClick}
        className="embla-thumbs__slide__button rounded-lg"
        type="button"
      >
        <div className="embla-thumbs__slide__number">
          <span>{index + 1}</span>
        </div>
        {/* <div className="rounded bg-white w-[64px] h-[48px] h-full mr-[15px]">
                <Image
                  priority={index == 0 ? `true` : `false`}
                  fetchpriority={index == 0 ? "true" : "false"}
                  data-priority={index == 0 ? `true` : `false`}
                  data-gmlazy={index == 0 ? `false` : `true`}
                  loader={gumletLoader}
                  layout="fill"
                  className={`rounded-xl outline ${selected?'outline-[3px] outline-blue-500 shadow-lg':'outline-[1px] outline-gray-200'}`}
                  src={imgSrc}
                  alt={`Gallery Image ${index+1}`}
                />
              </div> */}
              <div className={`embla-thumbs__slide__img overflow-hdden relative rounded-lg outline ${selected?'outline-[3px] outline-blue-500 shadow-lg':'outline-[1px] outline-gray-200'}`}>
        <Image
                  className="shine w-full h-full cursor-pointer bg-white object-cover rounded-lg"
                  src={imgSrc}
          alt={`Gallery Image ${index+1}`}
          loader={gumletLoader}
                  layout="fill"
                  priority={index == 0 ? `true` : `false`}
                  fetchpriority={index == 0 ? "true" : "false"}
                  data-priority={index == 0 ? `true` : `false`}
                  data-gmlazy={index == 0 ? `false` : `true`}
        />
                </div>

{/* <img
          className={`embla-thumbs__slide__img rounded-xl outline ${selected?'outline-[3px] outline-blue-500 shadow-lg':'outline-[1px] outline-gray-200'}`}
          src={imgSrc}
          alt="Your alt text"
        /> */}
      </button>
    </div>
  )
}
