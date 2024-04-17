const BigImageCardWithOverlay = ({ post, domain, content, ogImage }) => (
  <div className={`mt-6 relative overflow-hidden p-6 border-gray-200`}>
    <div className=" w-full h-full p-6 absolute top-0 left-0 z-0">
      <div className="relative w-full h-full  max-w-[1320px] mx-auto">
        <img
          src={ogImage}
          className="absolute bg-gray-900 w-full h-full object-cover rounded-3xl top-0 left-0"
        />
        {/* <img
  src="/static/images/toolbox/squares.svg"
  className="border-b opacity-40 border-gray-200/90 opacity absolute w-full h-full object-cover top-0 left-0"
/> */}
      </div>
    </div>
    <div className="relative  w-full max-w-[1320px] mx-auto flex flex-col justify-center">
      <div className="w-[25%] z-10 ">
        <div className="flex bg-gray-900/70 backdrop-blur-lg shadow-md text-white p-8 rounded-3xl rounded-r-none flex-col">
          <div className="flex h-[340px] flex-col  justify-between">
            <div className="flex flex-col h-full ">
              <div className="text-xs font-medium mb-3 mt-3 uppercase">
                {domain}
              </div>
              <div className="flex flex-col justify-between h-full">
                <h1 className="text-2xl font-medium drop-shadow-sm">
                  {post?.attributes?.title}
                </h1>
                <div
                  className="max-w-3xl text-base line-clamp-8"
                  dangerouslySetInnerHTML={{ __html: content }}
                ></div>
              </div>
            </div>

            {/* <div className="flex flex-none mt-6">
            <div className="flex justify-end">
              <a
                target={"_blank"}
                href={
                  post?.attributes?.legacyAttributes?.link
                    ? post?.attributes?.legacyAttributes?.link
                    : post?.attributes?.link + "?ref=prototypr.io"
                }
              >
                <Button
                  className="rounded-full bg-blue-600 font-semibold text-white px-6 py-4 leading-none"
                  variant={"confirmBig"}
                >
                  Read article
                </Button>
              </a>
            </div>
          </div> */}
          </div>

          {/* <div className="flex text-base top-0 right-0 mt-6 text-black/80">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1.5"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-11.55,39.29c-4.79,5-9.75,10.17-12.38,16.52-2.52,6.1-2.63,13.07-2.73,19.82-.1,7-.21,14.33-3.32,17.43s-10.39,3.22-17.43,3.32c-6.75.1-13.72.21-19.82,2.73-6.35,2.63-11.52,7.59-16.52,12.38S132,224,128,224s-9.15-4.92-14.11-9.69-10.17-9.75-16.52-12.38c-6.1-2.52-13.07-2.63-19.82-2.73-7-.1-14.33-.21-17.43-3.32s-3.22-10.39-3.32-17.43c-.1-6.75-.21-13.72-2.73-19.82-2.63-6.35-7.59-11.52-12.38-16.52S32,132,32,128s4.92-9.15,9.69-14.11,9.75-10.17,12.38-16.52c2.52-6.1,2.63-13.07,2.73-19.82.1-7,.21-14.33,3.32-17.43S70.51,56.9,77.55,56.8c6.75-.1,13.72-.21,19.82-2.73,6.35-2.63,11.52-7.59,16.52-12.38S124,32,128,32s9.15,4.92,14.11,9.69,10.17,9.75,16.52,12.38c6.1,2.52,13.07,2.63,19.82,2.73,7,.1,14.33.21,17.43,3.32s3.22,10.39,3.32,17.43c.1,6.75.21,13.72,2.73,19.82,2.63,6.35,7.59,11.52,12.38,16.52S224,124,224,128,219.08,137.15,214.31,142.11ZM140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180Zm28-72c0,17.38-13.76,31.93-32,35.28V144a8,8,0,0,1-16,0v-8a8,8,0,0,1,8-8c13.23,0,24-9,24-20s-10.77-20-24-20-24,9-24,20v4a8,8,0,0,1-16,0v-4c0-19.85,17.94-36,40-36S168,88.15,168,108Z"></path>
          </svg>
          <div className="my-auto">
            <div className="inline">
              Is this your tool?{" "}
              <Link
                className="underline"
                href={`/toolbox/post/${post.id}/claim`}
              >
                Claim this page
              </Link>
              .
            </div>
          </div>
        </div> */}
          {/* <div>
          <div className="mt-6 flex flex-wrap">
            {tags.map(tag => {
              return (
                <Link
                  href={`/toolbox/${tag.attributes.slug}/page/1`}
                  className="flex"
                >
                  <div className="inline-block capitalize text-base px-3 py-1 cursor-pointer bg-blue-100/60 rounded-full mr-3 mb-3 text-blue-900 text-[15px] font-base outline outline-1 outline-blue-200/80 flex flex-col justify-center">
                    {tag.attributes.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div> */}
        </div>
      </div>
    </div>
  </div>
);

export default BigImageCardWithOverlay;
