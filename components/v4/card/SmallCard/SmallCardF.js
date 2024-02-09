import Image from "next/image";
import Link from "next/link";
import Avatar from "../../avatar/AvatarLine";
import SmallTag from "../../tag/SmallTag";
import gumletLoader from "@/components/new-index/gumletLoader";

const SmallCard = ({link, title, image, tags, date, avatar, author }) => {
  return (
    <div className="bg-white shadow-md p-3 flex mt-3 sm:mt-0 flex-col sm:flex-row hover:bg-white transition transition-all duration-300 rounded-2xl font-inter w-full">
      {image ? (
        <div className="w-full shrink-0 h-[180px] max-w-full sm:max-w-[190px] md:h-[140px] relative rounded-2xl overflow-hidden border border-gray-100">
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
      <div className="shrink mt-3 sm:mt-0 sm:px-5 flex flex-col justify-between">
          <div>
            <div className="flex mt-2 text-xs mb-2">
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
            </div>
            <Link href={link??''}>
              <h2 className="text-lg font-medium leading-snug line-clamp-2">
                {title}
              </h2>
            </Link>
          </div>
        <div>
          
        <div className="mt-2 mb-1">
          <Avatar src={avatar} author={author} date={date} size="sm" />
        </div>
        </div>
      </div>
    </div>
  );
};
export default SmallCard;
