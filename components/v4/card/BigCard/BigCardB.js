import Image from "next/image";
import Link from "next/link";
import Avatar from "../../avatar/AvatarLine";
import SmallTag from "../../tag/SmallTag";
import gumletLoader from "@/components/new-index/gumletLoader";

const BigCard = ({ link,title, excerpt, image, tags, date, avatar, author }) => {
  return (
    <div className="hover:bg-white transition transition-all duration-300 rounded-2xl p-1 flex flex-col sm:flex-row  w-full max-w-[985px]">
      <div className="w-full mb-4 sm:mb-0 sm:w-5/12 md:w-6/12 relative h-[224px] sm:h-[224px] md:h-[250px] rounded-xl overflow-hidden border border-gray-200">
        <Link href={link??''}>
          <Image
            className="object-cover cursor-pointer"
            layout="fill"
            src={image}
            loader={gumletLoader}
          />
        </Link>
      </div>
      <div className="w-full sm:w-7/12 md:w-6/12 px-0 sm:px-6 flex flex-col justify-center">
        <div className="flex text-xs mb-2">
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
        <Link href={link??''}>
          <h2 className="text-3xl sm:text-xl md:text-3xl lg:text-3xl lg:leading-tight font-semibold line-clamp-3">
            {title}
          </h2>
        </Link>
        <Link href={link??''}>
          <p className="mt-3 text-gray-500 line-clamp-2">{excerpt}</p>
        </Link>
        <div className="mt-3">
          <Avatar src={avatar} author={author} date={date} size="lg" />
        </div>
      </div>
    </div>
  );
};
export default BigCard;
