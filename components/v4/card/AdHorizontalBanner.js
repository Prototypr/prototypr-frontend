// import dynamic from "next/dynamic";

import Image from "next/image";
import Link from "next/link";
import gumletLoader from "@/components/new-index/gumletLoader";

const AdHorizontalBanner = ({
  post,
  imageLarge,
  type,
  columns,
  tagNumber,
  height,
  showAdTag=false
}) => {
  let { title, slug, coverImage, tags, logo, sponsorLink } = post;

  return (
    <div className="h-full">
      <Link
        target={sponsorLink ? "_blank" : ""}
        href={slug ? `/toolbox/${slug}` : sponsorLink}
      >
        <div
          className={
            "flex pt-0 relative grid grid-col-1 gap-2 group flex-grow h-full rounded-t-2xl shadow hover:shadow-xl border border-gray-300/60 transition transition-all duration-400 hover:scale-[1.02] group bg-white relative rounded-2xl fade- overflow-hidden"
          }
        >
          <div className="rounded-xl px-0 block cursor-pointer">
            <Image
              loader={gumletLoader}
              priority={false < 2 ? `true` : `false`}
              data-priority={false < 2 ? `true` : `false`}
              fetchpriority={false < 2 ? "true" : "false"}
              data-gmlazy={false < 2 ? `false` : `true`}
              alt="Brand logo for external website's link"
              className="object-cover rounded-xl bg-white group-hover:shadow-sm transition-transform duration-300"
              src={
                post.postType == "ad" && post.cardImage
                  ? post.cardImage
                  : coverImage
              }
              fill
            />
            {(post.postType == "ad" && showAdTag) && (
              <div className="absolute top-0 left-0 m-2 ">
                <div className="px-3 h-[18px] rounded-full shadow-xs text-[11px] font-medium  border border-gray-200 bg-gray-100">
                Ad
                  </div>
                </div>
            )}

            <div
              className={`${height ? height : imageLarge ? "h-[240px]" : "h-[290px]"} rounded-xl transition transition-all duration-400  relative flex flex-col justify-end`}
            >
              <div className="flex absolute bottom-0 h-[66px] group-hover:h-[100px]  w-full justify-between bg-white transition transition-all duration-400 p-2 border border-gray-300/20">
                <div className="flex">
                  {/* <div className="absolute top-0 left-0 z-10 rounded-xl w-full h-full bg-gradient-to-b from-black/5 to-black/60 shadow"></div> */}
                  <div className={`rounded-xl z-20 flex`}>
                    <Image
                      loader={gumletLoader}
                      width={48}
                      height={48}
                      alt="Brand logo for external website's link"
                      className="object-cover flex-none h-[48px] flex-shrink-0 shine rounded-xl shadow border border-gray-300/30"
                      //   src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                      //   data-src={coverImage}
                      src={logo}
                    />
                    <div className="overflow-hidden my-auto group-hover:mt-0 ml-3 text-gray-800">
                      <div className={"line-clamp-1 font-medium"}> {title}</div>
                      {/* {this.props.prototool !== true && */}
                      {post.postType == "ad" ? (
                        <div className="text-xs mt-0.5 font-base capitalize line-clamp-1 h-[18px] group-hover:h-[60px] transition transition-all duration-400 group-hover:line-clamp-3">
                          {showAdTag?post.description:'Ad'}
                        </div>
                      ) : (
                        tags?.length && (
                          <div className="text-xs mt-0.5 capitalize">
                            {tags[0].attributes.name}
                          </div>
                        )
                      )}

                      {/* <div className='w-1/4 relative'> {this._getTag()}</div> */}
                    </div>
                  </div>
                </div>
                {/* <div className="flex flex-col z-20 justify-center">
                  <span className="text-xs font-semibold uppercase bg-gray-100 font-medium py-0.5 px-3 text-blue-600 border border-black border-opacity-5 rounded-full">
                    Get
                  </span>
                </div> */}
              </div>
            </div>
          </div>

          {/* {this._getFooter()} */}
        </div>
      </Link>
    </div>
  );
};

export default AdHorizontalBanner;
