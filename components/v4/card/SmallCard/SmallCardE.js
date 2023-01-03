import Image from "next/image";
import Link from "next/link";
import Avatar from "../../avatar/AvatarLine";
import SmallTag from "../../tag/SmallTag";

const SmallCard = ({ title, image, tags, date, avatar, author }) => {
  return (
    <div className="flex hover:bg-white transition transition-all duration-300 p-1 rounded-2xl flex-row font-inter w-full max-w-[470px]">
      {image ? (
        <div className="w-full shrink-0 h-[90px] max-w-[100px] xs:max-w-[195px] xs:h-[124px] relative rounded-2xl overflow-hidden border border-gray-100">
          <Image
            className="object-cover cursor-pointer"
            layout="fill"
            src={image}
          />
        </div>
      ) : (
        ""
      )}
      <div className="shrink px-4 pr-5 flex flex-col justify-center">
          <div className="flex text-xs mb-1.5">
            {tags?.length
              ? tags.slice(0, 2).map((tag, index) => {
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
              : ""}
          </div>
        <div>
          <Link href="/">
            <h2 className="text-base text-lg font-semibold leading-snug line-clamp-3">
              {title}
            </h2>
          </Link>
          
        <div className="mt-2">
          <Avatar src={avatar} author={author} date={date} size="sm" />
        </div>
        </div>
      </div>
    </div>
  );
};
export default SmallCard;
