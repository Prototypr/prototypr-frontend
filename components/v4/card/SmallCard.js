import Image from "next/image";
import Link from "next/link";
import Avatar from "../avatar/Avatar";
import SmallTag from "../tag/SmallTag";

const SmallCard = ({ title, image, tags, date, avatar, author }) => {
  return (
    <div className="flex flex-row font-inter w-full max-w-[470px]">
      {image ? (
        <div className="w-full shrink-0 h-[90px] max-w-[100px] xs:max-w-[195px] xs:h-[120px] mb-4 relative rounded-2xl overflow-hidden shadow-sm">
          <Image
            className="object-cover cursor-pointer"
            fill={true}
            src={image}
          />
        </div>
      ) : (
        ""
      )}
      <div className="shrink px-4 pr-5 flex flex-col">
        <div className="mb-2">
          <Avatar src={avatar} author={author} date={date} size="sm" />
        </div>
        <div>
          <Link href="/">
            <h2 className="text-base sm:text-lg font-semibold leading-snug line-clamp-2 leading-right">
              {title}
            </h2>
          </Link>
          <div className="flex text-xs mt-4 sm:mt-2.5">
            {tags?.length
              ? tags.slice(0, 2).map((tag, index) => {
                  return (
                    <SmallTag
                      key={index}
                      link={`/posts/${tag.attributes?.slug}/page/1/`}
                    >
                      {tag.attributes?.name}
                    </SmallTag>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SmallCard;
