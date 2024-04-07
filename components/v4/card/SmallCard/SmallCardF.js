import Image from "next/image";
import Link from "next/link";
import Avatar from "../../avatar/AvatarLine";
import SmallTag from "../../tag/SmallTag";
import gumletLoader from "@/components/new-index/gumletLoader";

const SmallCard = ({link, title, image, tags, date, avatar, author, content, excerpt }) => {
  return (
    <div className="group mb-3 lg:mb-0 hover:scale-[1.01] hover:shadow-lg transition transition-all duration-400 bg-white row-span-1 shadow-sm border border-gray-300/50 p-3 flex flex-col-reverse sm:flex-row hover:bg-white transition transition-all duration-300 rounded-2xl font-inter w-full justify-between">
      
      <div className="shrink mt-3 pl-1 pr-3.5 sm:mt-0 flex flex-col justify-between">
          <div>
            {/* <div className="flex mt-2 text-xs mb-2">
              {tags?.length
                ? tags.slice(0, 2).map((tag, index) => {
                  //2 long tags make break the layout, so remove word 'design'
                  let name = tag.attributes?.name.replace('-', ' ')
                    return (
                      <SmallTag
                        key={index}
                        index={index}
                        link={`/posts/${tag.attributes?.slug}/page/1/`}
                      >
                        {name}
                      </SmallTag>
                    );
                  })
                : ""}
            </div> */}
            <Link href={link??''}>
              <h2 className="text-lg tracking-tight font-medium leading-snug line-clamp-6">
                {title}
              </h2>
            </Link>
            <div className="hidden md:block lg:hidden line-clamp-2 text-gray-500 mt-3" dangerouslySetInnerHTML={{__html:excerpt?excerpt:content}}/>
          </div>
        <div>
          
        <div className="mt-2 mb-1">
          <Avatar src={avatar} author={author} date={date} size="sm" />
        </div>
        </div>
      </div>
      {image ? (
        <div className="w-full shrink-0 lg:h-full max-w-full h-[260px] sm:max-w-[280px] lg:max-w-[200px] relative rounded-xl overflow-hidden border border-gray-100">
          <Link href={link??''}>
            <Image
              className="object-cover cursor-pointer group-hover:scale-[1.03] transition transition-all duration-700 "
              layout="fill"
              src={image}
              loader={gumletLoader}
              alt={title}
            />
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default SmallCard;
