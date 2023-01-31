import Image from "next/image";
import Link from "next/link";
import gumletLoader from "../new-index/gumletLoader";

export default function ProfileCard({
  title,
  slug,
  legacyAvatar = "",
  skills = "",
  bio = "",
  location = "",
  avatar = "",
}) {
  let skillArr = [];
  if (skills && skills !== "") {
    skillArr = skills.split(",");
  }
  const img = avatar ? avatar : legacyAvatar;
  return (
<Link href={`/people/${slug}`}>
    <div className="flex shadow-sm group flex-col flex-grow h-full border-black/5 border-1 hover:shadow-lg transition-shadow duration-500 bg-white relative rounded-3xl">
      <div className="p-6 flex">
            {img && (
      <div className="basis-[96px] pr-6">
              <div
                className="rounded-full flex basis-[96px] my-auto transform group-hover:scale-110 transition duration-700 ease-out"
                style={{ height: "96px", width: "96px" }}
              >
                
                  <Image
                    loader={gumletLoader}
                    width="96"
                    height="96"
                    alt={`Avatar for ${title}`}
                    className="border-black border-opacity-[0.05] border border-1 h-[96px] w-[96px] object-cover cursor-pointer flex-shrink-0 shine rounded-full bg-white"
                    src={img}
                  />
              </div>
          </div>
            )}
        <div className="flex flex-col">
            <div className="relative flex justify-between">
            <div className="overflow-hidden">
                <div>
                <Link href={`/people/${slug}`}>
                    <h1 className="text-lg font-bold cursor-pointer overflow-hidden mt-0 h-6 mt-0 text-gray-900">
                    {title}
                    </h1>
                </Link>
                </div>
                {/* <div className="text-xs uppercase text-gray-700 mt-1">
                {location}
                </div> */}
                <div className="text-base text-gray-700 mt-2 clamp-2">
                <div dangerouslySetInnerHTML={{ __html: bio }} />
                </div>
            </div>
            </div>
            {/* {skillArr?.length?<div className="text-base text-gray-600 mt-3 h-7 overflow-hidden">
            {skillArr.length
                ? skillArr.map((skill) => {
                    return (
                    <div className="bg-gray-200 mr-2 text-gray-600 text-xs mb-1 px-2 py-1 rounded inline-block">
                        # {skill}
                    </div>
                    );
                })
                : null}
            </div>:''} */}
        
        </div>
      </div>
    </div>
    </Link>
  );
}
