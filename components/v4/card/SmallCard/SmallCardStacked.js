import Image from "next/image";
import Link from "next/link";
import Avatar from "../../avatar/AvatarLine";
import SmallTag from "../../tag/SmallTag";
import Moment from "react-moment";
import gumletLoader from "@/components/new-index/gumletLoader";

const SmallCardB = ({ title, image, tags, date, avatar, author, showAuthor, link }) => {
  return (
    <div className="flex flex-col hover:bg-white transition transition-all duration-300 p-1 rounded-2xl font-inter w-full max-w-[490px]">
      {image ? (
        <div className="w-full shrink-0 h-[90px] max-w-[100px] xs:max-w-[195px] xs:h-[124px] relative rounded-2xl overflow-hidden border border-gray-100">
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
      <div className="shrink px-4 pr-5 flex flex-col justify-center">
        {showAuthor!==false?<div className="mb-1.5">
          <Avatar src={avatar} author={author} date={date} size="sm" />
        </div>:
        <div className="flex text-xs mb-2">
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
            <h2 className="text-base text-lg font-semibold leading-snug line-clamp-3">
              {title}
            </h2>
          </Link>
          
          <div className="mt-1">
            
          <p className={`line-clamp-1 text-gray-500 text-sm`}>
         <Moment
           className={`text-xs text-gray-500 my-auto`}
           date={date}
           format="MMM DD"
         />
       </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SmallCardB;
