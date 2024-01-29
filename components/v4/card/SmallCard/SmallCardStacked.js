import Image from "next/image";
import Link from "next/link";
import Avatar from "../../avatar/AvatarLine";
import SmallTag from "../../tag/SmallTag";
import Moment from "react-moment";
import gumletLoader from "@/components/new-index/gumletLoader";

const SmallCardStacked = ({ title, image, tags, date, avatar, author, showAuthor, link }) => {
  return (
    <div className="flex md:flex-col md:justify-start hover:bg-white px-4 md:px-5 md:-mr-5 my-3.5 md:my-0 md:mb-6 md:mt-0 lg:mb-0 lg:my-0 transition transition-all duration-300 rounded-2xl font-inter w-full max-w-[490px]">
      {image ? (
        <div className=" hidden md:inline-block w-full my-auto md:my-0 shrink-0 h-[54px] w-[54px] md:w-full md:h-[164px] relative rounded-lg md:rounded-2xl overflow-hidden border border-gray-100">
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
      <div className="shrink md:mt-4 flex flex-col-reverse md:flex-col justify-center">
        {showAuthor!==false?<div className="mt-2 md:mb-1.5 ml-2 md:ml-0">
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
            <h2 className="ml-2 md:ml-0 text-sm md:text-lg font-semibold leading-snug line-clamp-3">
              {title}
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SmallCardStacked;
