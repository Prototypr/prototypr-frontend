import Image from "next/image";
import Link from "next/link";
import Avatar from "../../avatar/AvatarLine";
import SmallTag from "../../tag/SmallTag";
import gumletLoader from "@/components/new-index/gumletLoader";

const MediumPost = ({link, title, image, tags, date, avatar, author, excerpt, imageSmall }) => {
  return (
    <div className="flex h-full sm:mt-0 flex-col hover:bg-white transition transition-all duration-300 p-3 bg-white shadow-md rounded-2xl font-inter w-full">
      {image ? (
        <div className={`w-full shrink-0 h-[180px] shadow-sm max-w-full ${imageSmall?'md:h-[180px]':'md:h-[240px]'} md:max-w-full relative rounded-2xl overflow-hidden border border-gray-100`}>
          <Link href={link??''}>
            <Image
              className="object-cover cursor-pointer"
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
      <div className="mt-3 flex flex-col px-[10px] justify-between h-full">
         
        <div className="flex flex-col justify-start">
          <Link href={link??''}>
            <h2 className="text-lg font-medium leading-snug line-clamp-2">
              {title}
            </h2>
          </Link>
          <Link href={link??''}>
            <div className="my-3 text-gray-600 line-clamp-2" dangerouslySetInnerHTML={{__html:excerpt}}/>
            {/* <p className="">{excerpt}</p> */}
          </Link>
          
        <div className="mt-3 mb-0.5">
          <Avatar src={avatar} author={author} date={date} size="lg" />
        </div>
        </div>
        <div className="flex mt-3 text-xs">
            {tags?.length
              ? tags.slice(0, 2).map((tag, index) => {
                //2 long tags make break the layout, so remove word 'design'
                let name = tag?.attributes?.name?.replace('-', ' ')
                  return (
                    <>
                    {tag?.attributes?.slug?<SmallTag
                      key={index}
                      index={index}
                      link={`/posts/${tag?.attributes?.slug}/page/1/`}
                    >
                      {name}
                    </SmallTag>:null}
                    </>
                  );
                })
              : ""}
          </div>
      </div>
    </div>
  );
};
export default MediumPost;
