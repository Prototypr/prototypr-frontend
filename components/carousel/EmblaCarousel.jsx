import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './EmblaCarouselThumbsButton'
// import imageByIndex from './imageByIndex'
import Image from "next/image";
import gumletLoader from "@/components/new-index/gumletLoader";
import dynamic from "next/dynamic";

import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'

const ImageDialog = dynamic(() => {return import("./ImageDialog/ImageDialog")},{ ssr: false });

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

  const [currentImage, setCurrentImage] = useState(slides[0]?.original)
  useEffect(()=>{
    setCurrentImage(slides[selectedIndex]?.original)
  },[selectedIndex])

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
    onNextButtonClick,
  } = usePrevNextButtons(emblaMainApi)



  const [dialogOpenImage, setDialogOpenImage] = useState(false)

  const toggleDialogOpen = () =>{
    if(dialogOpenImage){
      setDialogOpenImage(false)
    }else{
      setDialogOpenImage(true)
    }
  }

  const navigateDialog = (direction) =>{
    if(direction=='prev'){
      let prevSlide = slides[selectedIndex-1]
      if(prevSlide){
        setSelectedIndex(selectedIndex-1)
        setCurrentImage(prevSlide.original)
        // onPrevButtonClick()
      }else{
        //round to end like pacman
        let endSlide = slides[slides.length-1]
        setSelectedIndex(slides.length-1)
        setCurrentImage(endSlide.original)
      }
    }else{
      let nextSlide = slides[selectedIndex+1]
      console.log(nextSlide)
      if(nextSlide){
        setSelectedIndex(selectedIndex+1)
        setCurrentImage(nextSlide.original)
        // onNextButtonClick()
      }else{
        //back to start like pacman
        let nextSlide = slides[0]
        setSelectedIndex(0)
        setCurrentImage(nextSlide.original)
      }
    }
  }

  return (
    <div className="embla lg:px-14 py-6 -mt-[1.6rem] relative">
      <div className="embla__buttons absolute top-0 w-full flex justify-between -mt-[2.45rem]">
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
               <div className="relative shimmer shadow-md w-full rounded-xl h-[240px] sm:h-[264px] w-full lg:max-h-full relative overflow-hidden flex justify-center">
                {/* <img src={item.original} className='object-cover cursor-pointer pointer-events-auto' alt={`Gallery Image ${index}`}/> */}
                <Image
                  onClick={()=>{
                    setSelectedIndex(index)
                    // emblaMainApi.scrollTo(index)
                    setCurrentImage(item.original)
                    setDialogOpenImage(item.original)
                  }}
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
                  className='embla__slide__img  cursor-pointer rounded-xl shadow-xl p-[4px] bg-white border border-gray-200'
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
      <ImageDialog 
      navigateDialog={navigateDialog}
      prevBtnDisabled={false}
      nextBtnDisabled={false}
      image={currentImage} 
      open={dialogOpenImage?true:false} 
      toggleOpen={toggleDialogOpen}/>
    </div>
  )
}

export default EmblaCarousel
