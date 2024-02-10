import React, { useCallback, useEffect, useState } from 'react'

export const usePrevNextButtons = (emblaApi) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}

export const PrevButton = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="embla__button pointer-events-auto w-8 h-8 embla__button--prev rounded-full bg-white shadow border border-1 border-gray-300"
      type="button"
      {...restProps}
    >
<svg
className="embla__button__svg"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 256 256"
    >
      <path d="M224 128a8 8 0 01-8 8H59.31l58.35 58.34a8 8 0 01-11.32 11.32l-72-72a8 8 0 010-11.32l72-72a8 8 0 0111.32 11.32L59.31 120H216a8 8 0 018 8z"></path>
    </svg>      {/* <svg className="embla__button__svg" viewBox="0 0 532 532">
        <path
          fill="currentColor"
          d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
        />
      </svg> */}
      {children}
    </button>
  )
}

export const NextButton = (props) => {
  const { children, ...restProps } = props

  return (
    <button
    className="embla__button pointer-events-auto w-8 h-8 embla__button--next rounded-full bg-white shadow border border-1 border-gray-300"
    type="button"
      {...restProps}
    >
      <svg
className="embla__button__svg"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 256 256"
    >
      <path d="M221.66 133.66l-72 72a8 8 0 01-11.32-11.32L196.69 136H40a8 8 0 010-16h156.69l-58.35-58.34a8 8 0 0111.32-11.32l72 72a8 8 0 010 11.32z"></path>
    </svg>
      {children}
    </button>
  )
}
