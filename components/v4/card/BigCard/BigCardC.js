import Image from "next/image";
import Link from "next/link";
import Avatar from "../../avatar/Avatar";
import MediumTag from "../../tag/MediumTag";
import gumletLoader from "@/components/new-index/gumletLoader";

const BigCard = ({ link,title, excerpt, image, tags, date, avatar, author }) => {
  return (
    <div className="hover:bg-white transition transition-all duration-300 rounded-2xl p-1 flex flex-col sm:flex-row lg:flex-col font-inter w-full max-w-[985px]">
      <div className="w-full w-full relative h-[180px] sm:h-[224px] md:h-[270px] rounded-2xl overflow-hidden border border-gray-200">
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
      <div className="w-full px-0 sm:px-6 lg:px-0 flex flex-col justify-center">
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
          <h2 className="text-xl sm:text-xl font-semibold line-clamp-3">
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
