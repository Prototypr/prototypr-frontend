// import dynamic from "next/dynamic";

import Image from "next/image";
import Link from "next/link";
import gumletLoader from "@/components/new-index/gumletLoader";

const ToolBackgroundCard = ({
  post,
  imageLarge,
  type,
  columns,
  tagNumber,
  height,
}) => {
  let { title, slug, coverImage, tags, logo } = post;
  return (
    <div className="h-full">
      <Link href={`/toolbox/${slug}`}>
        <div
          className={
            "flex pt-0 grid grid-col-1 gap-2 flex-grow h-full rounded-t-2xl shadow hover:shadow-xl border border-gray-300/60 transition transition-all duration-400 hover:scale-[1.02] group bg-white relative rounded-2xl fade- overflow-hidden"
          }
        >
          <div className="rounded-xl px-0 block cursor-pointer">
          <Image
                    loader={gumletLoader}
                    priority={false < 2 ? `true` : `false`}
                    data-priority={false < 2 ? `true` : `false`}
                    fetchpriority={false < 2 ? "true" : "false"}
                    data-gmlazy={false < 2 ? `false` : `true`}
                    //   fill={true}
                    //   layout="fill"
                    //   style={{width:'100%'}}
                    //   width="100%"
                    //   height="100%"
                    alt="Brand logo for external website's link"
                    className="object-cover rounded-xl bg-white group-hover:shadow-sm transition-transform duration-300"
                    src={coverImage}
                    fill
                    // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
            <div
              className={`${height ? height : imageLarge ? "h-[240px]" : "h-[290px]"} rounded-xl m-2 relative flex flex-col justify-end`}
            >
              <div className="flex w-full justify-between p-2 bg-black/40 backdrop-blur-sm rounded-2xl border border-gray-300/20">
                <div className="flex">
                  <div className="absolute top-0 left-0 z-10 rounded-xl w-full h-full bg-gradient-to-b from-black/5 to-black/60 shadow"></div>
                  <div
                    className={`rounded-xl z-20 flex`}
                  >
                    <Image
                      loader={gumletLoader}
                      width={48}
                      height={48}
                      alt="Brand logo for external website's link"
                      className="object-cover flex-none flex-shrink-0 shine rounded-xl shadow border border-gray-300/30"
                      //   src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                      //   data-src={coverImage}
                      src={logo}
                    />
                    <div className="overflow-hidden my-auto ml-3 text-white">
                      <div className={"line-clamp-1 font-medium"}> {title}</div>
                      {/* {this.props.prototool !== true && */}
                      {tags?.length && (
                        <div className="text-xs mt-0.5 capitalize">
                          {tags[0].attributes.name}
                        </div>
                      )}

                      {/* <div className='w-1/4 relative'> {this._getTag()}</div> */}
                    </div>
              
                  </div>
                </div>
                <div className="flex flex-col z-20 justify-center">
                  <span className="text-xs font-semibold uppercase bg-gray-100 font-medium py-0.5 px-3 text-blue-600 border border-black border-opacity-5 rounded-full">
                    Get
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* {this._getFooter()} */}
        </div>
      </Link>
    </div>
  );
};

export default ToolBackgroundCard;
