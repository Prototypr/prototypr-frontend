import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import gumletLoader from "@/components/new-index/gumletLoader";
import Image from "next/image";
import AutoHeight from 'embla-carousel-auto-height'

const Carousel = ({gallery})=> {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [AutoHeight()])

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()) // Access API
    }
  }, [emblaApi])

  return (
    <div className="embla -ml-[24px] overflow-hidden" ref={emblaRef}>
      <div className="embla__container ">
      {gallery?.map((current, index) => (
        <div className="embla__slide rounded-xl mb-4 ">
              <div className="relative w-full rounded-xl h-60 sm:h-full w-full lg:max-h-full relative overflow-hidden rounded-lg flex justify-center">
                <Image
                  loader={gumletLoader}
                  layout="fill"
                  objectFit="cover"
                  priority={index == 0 ? true : false}
                  fetchpriority={index == 0 ? "true" : "false"}
                  data-priority={index == 0 ? `true` : `false`}
                  data-gmlazy={index == 0 ? `false` : `true`}
                  // className="rounded-lg  object-contain h-60 sm:h-96"
                  src={current.original}
                  // data-src={current.original}
                  alt={`Gallery Image ${index}`}
                  sizes={"(max-width: 300px) 100vw, 600px"}
                  className='shadow-md rounded-xl'
                />
              </div>
              </div>
        ))}


        {/* <div className="embla__slide">Slide 1</div>
        <div className="embla__slide">Slide 2</div>
        <div className="embla__slide">Slide 3</div> */}
      </div>
    </div>
  )
}
  
  export default Carousel
