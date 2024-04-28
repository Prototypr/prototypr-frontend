import Image from "next/image";
import Link from "next/link";
import Avatar from "../../avatar/AvatarLine";
import SmallTag from "../../tag/SmallTag";
// import Moment from "react-moment";
import gumletLoader from "@/components/new-index/gumletLoader";

const SmallCardStacked = ({ title, image, tags, date, avatar, author, showAuthor, link }) => {
  return (
    <div className="flex shadow-sm hover:scale-[1.01] hover:shadow-lg group border border-gray-300/70 mx-auto md:flex-col md:justify-start bg-white p-0 md:my-0 md:mt-0 lg:mb-0 lg:my-0 overflow-hidden transition transition-all duration-300 rounded-2xl font-inter w-full max-w-[490px]">
      {image ? (
        <div className="group-hover:scale-[1.01] transition transition-all duration-700 hidden md:inline-block w-full my-auto md:my-0 shrink-0 h-[54px] w-[54px] md:w-full md:h-[164px] relative border-b border-gray-200 overflow-hidden">
         <Link href={link}>
            <Image
              loader={gumletLoader}
              className="object-cover cursor-pointer"
              layout="fill"
              src={image}
              alt={title}
            />
         </Link>
        </div>
      ) : (
        ""
      )}
      <div className="shrink md:mt-2 mb-1 p-2 md:px-3 flex flex-col-reverse md:flex-col justify-center">
        {showAuthor!==false?<div className="mt-0 md:mb-1.5 md:ml-0">
          <Avatar src={avatar} author={author} date={date} size="sm" />
        </div>:
        <div className="hidden md:flex text-xs mb-2">
         {tags?.length
          ? tags.slice(0, 1).map((tag, index) => {
              return (
                <SmallTag 
                  key={index}
                  index={index}
                  link={`/posts/${tag.attributes?.slug}/page/1/`}
                >
                  {tag.attributes?.name}
                </SmallTag>
              );
            })
          : ""
        }
        </div>}
        <div>
          <Link href={link}>
            <h2 className="md:ml-0 mb-3 md:mb-0 text-sm md:text-lg font-medium leading-snug line-clamp-3 tracking-tight">
              {title}
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SmallCardStacked;
