import Image from "next/image";
import Link from "next/link";
import Avatar from "../../avatar/Avatar";
import SmallTag from "../../tag/SmallTag";

const BigCard = ({ title, excerpt, image, tags, date, avatar, author }) => {
  return (
    <div className="hover:bg-white transition transition-all duration-300 rounded-2xl p-1 flex flex-col sm:flex-row font-inter w-full max-w-[985px]">
      <div className="w-full mb-4 sm:mb-0 sm:w-5/12 md:w-6/12 relative h-[224px] sm:h-[224px] md:h-[250px] rounded-2xl overflow-hidden border border-gray-200">
        <Image
          className="object-cover cursor-pointer"
          layout="fill"
          src={image}
        />
      </div>
      <div className="w-full sm:w-7/12 md:w-6/12 px-0 sm:px-6 flex flex-col justify-center">
        <div className="mb-3">
          <Avatar src={avatar} author={author} date={date} size="lg" />
        </div>
        <Link href="/">
          <h2 className="text-3xl sm:text-xl md:text-3xl lg:text-3xl lg:leading-tight font-semibold line-clamp-2 ">
            {title}
          </h2>
        </Link>
        <Link href="/">
          <p className="mt-3 text-gray-500 line-clamp-2">{excerpt}</p>
        </Link>
        <div className="flex text-xs mt-4 sm:mt-3">
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
      </div>
    </div>
  );
};
export default BigCard;
