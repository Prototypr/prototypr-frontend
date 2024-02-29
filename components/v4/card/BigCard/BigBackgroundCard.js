import Image from "next/image";
import Link from "next/link";
import Avatar from "../../avatar/Avatar";
import MediumTag from "../../tag/MediumTag";
import gumletLoader from "@/components/new-index/gumletLoader";

// layouts: 1 is big image
// 2 is small image
const BigBackgroundCard = ({ link,title, excerpt, image, tags, date, avatar, author, layout }) => {
  return (
    // <div className="hover:bg-white transition transition-all duration-300 rounded-2xl p-1 flex flex-col sm:flex-row lg:flex-col font-inter w-full max-w-[985px]">
    <div className="bg-white p-3 shadow-xl transition transition-all duration-300 rounded-2xl flex flex-col sm:flex-row font-inter w-full ">
      <div className={`${layout==2?'md:w-[45%] md:h-[320px]':'md:w-3/5 md:h-[440px]'} w-full relative h-[180px] sm:h-[224px] rounded-2xl overflow-hidden border border-black/5 shadow-sm`}>
        <Link href={link??''}>
          <Image
            loader={gumletLoader}
            className="object-cover cursor-pointer"
            layout="fill"
            src={image}
            alt={title}
          />
        </Link>
      </div>
      <div className={`${layout==2?'md:w-[65%]':'md:w-2/5'}  w-full p-7 py-4 flex flex-col justify-between`}>
       <div className="flex flex-col">
       <div className="flex text-xs mb-3 mt-3">
          {tags?.length
            ? tags.slice(0, 2).map((tag, index) => {
                return (
                  <MediumTag
                    key={index}
                    index={index}
                    link={`/posts/${tag.attributes?.slug}/page/1/`}
                  >
                    {tag.attributes?.name}
                  </MediumTag>
                );
              })
            : ""}
        </div>
        <Link href={link??''}>
          <h2 className="text-xl sm:text-2xl mt-1 font-semibold line-clamp-4">
            {title}
          </h2>
        </Link>
        <Link href={link??''}>
          <div dangerouslySetInnerHTML={{__html:excerpt}} className="mt-3 text-gray-500 line-clamp-6"/>
        </Link>
        
       </div>
       <div className="mt-3">
          <Avatar src={avatar} author={author} date={date} size="lg" />
        </div>
       
      </div>
    </div>
  );
};
export default BigBackgroundCard;
