// import dynamic from "next/dynamic";

import Image from "next/image";
import Link from "next/link";
import gumletLoader from "@/components/new-index/gumletLoader";

const ToolImageCardSingle = ({
  post,
  imageLarge,
  type,
  columns,
  tagNumber,
  imageHeight,
  preload
}) => {


  const logo = post?.logo?post?.logo:post?.legacyMedia?.logoNew?post?.legacyMedia?.logoNew:''
  return (
    <div className="h-full">
      <Link
        target={post.postType == "ad" ? "_blank" : "_self"}
        href={
          post.postType == "ad"
            ? post.link + "?ref=prototypr"
            : `/toolbox/${post?.slug}`
        }
      >
        <div
          className={
            "flex flex-col- border border-1 border-gray-200/70 pt-3 pb-1 grid grid-col-1 gap-4 flex-grow h-full rounded-t-2xl shadow-sm hover:shadow-xl border border-gray-300/60 transition transition-all duration-400 hover:scale-[1.02] group bg-white relative rounded-2xl fade-"
          }
        >
          <div className="rounded-xl px-3 block cursor-pointer group-hover:scale-[1.01] transition transition-all duration-700">
            <div
              className={`rounded-xl relative flex ${imageHeight ? imageHeight : imageLarge ? "h-[240px]" : "h-[195px]"}`}
            >
              <div className="absolute top-0 left-0 z-10 rounded-xl w-full h-full bg-gradient-to-b from-black/5 via-black/10 to-black/40 group-hover:scale-[1.01] transition transition-all duration-700"></div>
              <Image
                loader={gumletLoader}
                priority={preload?preload:false}
                data-priority={preload?preload:false}
                fetchpriority={preload?preload:false}
                data-gmlazy={preload?!preload:true}
                //   fill={true}
                //   layout="fill"
                //   style={{width:'100%'}}
                //   width="100%"
                //   height="100%"
                alt="Brand logo for external website's link"
                className="object-cover rounded-xl bg-white group-hover:shadow-sm group-hover:scale-[1.01] transition transition-all duration-700 "
                src={post?.coverImage}
                fill
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="rounded-xl bg-white z-20 -mt-[6px] absolute ml-[12px]">
              <Image
                loader={gumletLoader}
                width={48}
                height={48}
                alt="Brand logo for external website's link"
                className="object-cover w-[48px] h-[48px] flex-shrink-0 shine rounded-xl border-2 border-white bg-white shadow -mt-[22px]"
                //   src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                //   data-src={coverImage}
                src={logo}
              />
            </div>
          </div>
          <div className="px-[18px] mb-3 mt-3 flex">
            {/* <Image
                loader={gumletLoader}
                width={48}
                height={48}
              alt="Brand logo for external website's link"
              className="object-cover flex-none shine rounded-xl border-2 border-white bg-white shadow"
            //   src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            //   data-src={coverImage}
              src={logo}
            /> */}
            {/* <div className="pl-3 overflow-hidden mt-1"> */}
            <div className="pl-2 overflow-hidden my-auto">
              <div className={"line-clamp-1 tracking-tight font-medium"}>
                {" "}
                {post?.title}
              </div>
              {/* {this.props.prototool !== true && */}
              {post?.tags?.length ? (
                <div className="text-xs text-gray-500 mt-0.5 capitalize">
                  {post?.tags[0].attributes.name}
                </div>
              ) : post?.postType == "ad" ? (
                <div className="text-xs text-gray-500 mt-0.5 capitalize bg-gray-100 text-gray-800/90 rounded-xl w-[fit-content] px-1.5 py-0.5">
                  Ad
                </div>
              ) : (
                ""
              )}

              {/* <div className='w-1/4 relative'> {this._getTag()}</div> */}
            </div>
            {/* {this.props.voteButton} */}
          </div>

          {/* {this._getFooter()} */}
        </div>
      </Link>
    </div>
  );
};

export default ToolImageCardSingle;
