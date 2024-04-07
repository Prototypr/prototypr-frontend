import Image from "next/image";
import Link from "next/link";
import Avatar from "../../avatar/Avatar";
import MediumTag from "../../tag/MediumTag";
import gumletLoader from "@/components/new-index/gumletLoader";

// layouts: 1 is big image
// 2 is small image
const BigBackgroundCard = ({ link,title, excerpt, image, tags, date, avatar, author, layout, showDescription, imageDimensions,textDimensions }) => {
  return (
    // <div className="hover:bg-white transition transition-all duration-300 rounded-2xl p-1 flex flex-col sm:flex-row lg:flex-col font-inter w-full max-w-[985px]">
    <div className={`bg-white h-full p-3 border border-gray-300/50 shadow-sm group hover:shadow-lg hover:scale-[1.005] transition transition-all duration-300 rounded-2xl flex flex-col ${layout==3?'':'sm:flex-row'} font-inter w-full `}>
      <div className={`${imageDimensions?imageDimensions:layout==2?'md:w-[45%] md:h-[320px]':layout==3?'w-full md:h-[364px]':'md:w-3/5 md:h-[440px]'} w-full relative ${!imageDimensions?'h-[240px] sm:h-[224px]':''} rounded-xl overflow-hidden border border-gray-300/60`}>
        <Link href={link??''}>
          <Image
            loader={gumletLoader}
            className="object-cover cursor-pointer group-hover:scale-[1.03] transition transition-all duration-700"
            layout="fill"
            src={image}
            alt={title}
          />
        </Link>
      </div>
      <div className={`${textDimensions?textDimensions:layout==2?'md:w-[65%]':layout==3?'w-full':'md:w-2/5'} ${layout==3?'p-3':'p-7 py-4'} w-full  flex flex-col justify-between`}>
       <div className="flex flex-col">
        {tags?.length?
       <div className={`flex text-xs mb-3 mt-3`}>
          {tags.slice(0, 2).map((tag, index) => {
                return (
                  <MediumTag
                    key={index}
                    index={index}
                    link={`/posts/${tag.attributes?.slug}/page/1/`}
                  >
                    {tag.attributes?.name}
                  </MediumTag>
                );
              })}
        </div>
      :null}
        <Link href={link??''}>
          <h2 className="text-xl tracking-tight sm:text-2xl mt-1 font-semibold line-clamp-4">
            {title}
          </h2>
        </Link>
       {showDescription!==false? <Link href={link??''}>
          <div dangerouslySetInnerHTML={{__html:excerpt}} className="mt-3 text-gray-500 line-clamp-6"/>
        </Link>
        :null}
       </div>
       <div className="mt-3">
          <Avatar src={avatar} author={author} date={date} size="lg" />
        </div>
       
      </div>
    </div>
  );
};
export default BigBackgroundCard;
