import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './EmblaCarouselThumbsButton'
// import imageByIndex from './imageByIndex'
import Image from "next/image";
import gumletLoader from "@/components/new-index/gumletLoader";

import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'

const EmblaCarousel = (props) => {
  const { slides, options } = props
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true
  })

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()
    emblaMainApi.on('select', onSelect)
    emblaMainApi.on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaMainApi)

  return (
    <div className="embla px-14 py-6 -ml-[1.6rem] -mt-[1.6rem] relative">
      <div className="embla__buttons absolute top-0 w-full flex justify-between -mt-[2rem]">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {slides.map((item,index) => (
            <div className="embla__slide pb-4" key={index}>
              <div className="embla__slide__number">
                <span>{index + 1}</span>
              </div>
              {/* <img
                className="embla__slide__img"
                src={item.original}
                alt="Your alt text"
              /> */}
               <div className="relative shadow-md w-full rounded-xl h-[200px] sm:h-[300px] w-full lg:max-h-full relative overflow-hidden flex justify-center">
                <Image
                  loader={gumletLoader}
                  layout="fill"
                  objectFit="cover"
                  priority={index == 0 ? true : false}
                  fetchpriority={index == 0 ? "true" : "false"}
                  data-priority={index == 0 ? `true` : `false`}
                  data-gmlazy={index == 0 ? `false` : `true`}
                  // className="rounded-lg  object-contain h-60 sm:h-96"
                  src={item.original}
                  // data-src={current.original}
                  alt={`Gallery Image ${index}`}
                  sizes={"(max-width: 300px) 100vw, 600px"}
                  className='embla__slide__img rounded-xl shadow-xl p-[4px] bg-white border border-gray-200'
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs w-fit max-w-full mx-auto">
        <div className="embla-thumbs__viewport p-1 -mt-2" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.map((item,index) => (
              <Thumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                imgSrc={item.thumbnail}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
