

export default function ProductItem({post}) {

  const { title = "", excerpt, slug, date, legacyFeaturedImage = null, author = null } = post
  return (
    <div
      className="grid-cols-1 flex items-center cursor-pointer"
    >
      <div className="w-36 h-36 rounded-lg bg-contain" style={{ backgroundImage: `url(${legacyFeaturedImage?.mediaItemUrl})` }}></div>
      <div className="flex-1 ml-4">
        <div className="flex">
          <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3 mr-1">
            # {slug}
          </div>
          {/* <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3 mr-1">
            # product design
          </div> */}
        </div>
        <h4 className="font-bold text-lg leading-7 text-gray-1">
          {title}
        </h4>
        <div className="mt-3 flex items-center">
          <div className="w-9 h-9 rounded-full bg-contain" style={{backgroundImage: `url(${author?.data?.attributes?.avatar})`}}></div>
          <div className="font-medium text-base ml-3">
          {author?.data?.attributes?.displayName}
          </div>
        </div>
      </div>
    </div>
  );
}
