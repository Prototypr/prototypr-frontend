const ImageLoadingSpinner= ({showPlaceholder, isLoading}) =><div
className={`${(isLoading)?'relative':'absolute hidden'} h-7 w-7 mx-auto bg-opacity-30 z-10 p-1 rounded-lg text-gray-700 flex flex-col justify-center top-0 left-0 bg-white transition-all duration-200`}
>
  <svg
    className={`opacity-70 z-10 animate-spin h-6 w-6  mx-auto max-w-full max-h-full`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364z"
      fill="currentColor"
    />
  </svg>
</div> 

export default ImageLoadingSpinner

export const ImageLoadingSpinnerGif= ({showPlaceholder, isLoading}) =><div
className={`${(isLoading )?'absolute z-50 top-0 opacity-80':'hidden'} bg-opacity-50 z-50 text-gray-700 flex flex-col justify-center top-0 left-0 w-6 h-6 bg-white transition-all duration-200`}
>
  <svg
    className={`opacity-60 z-10 animate-spin h-5  mx-auto w-5 max-w-full max-h-full`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364z"
      fill="currentColor"
    />
  </svg>
</div>