import Image from "next/image";
import Link from "next/link";
import Avatar from "../../avatar/AvatarLine";
// import SmallTag from "../../tag/SmallTag";
import gumletLoader from "@/components/new-index/gumletLoader";

const SmallCard = ({link, title, image, tags, date, avatar, author, excerpt }) => {
  return (
    <div className="flex mt-3 hover:bg-white transition transition-all duration-300 p-1 rounded-2xl flex-col sm:flex-row font-inter w-full pr-6">
      {image ? (
        <div className="w-full shrink-0 my-auto h-[160px] sm:h-[84px] sm:w-[100px] sm:basis-[100px] relative rounded-2xl overflow-hidden border border-gray-100">
          <Link href={link??''}>
            <Image
              loader={gumletLoader}
              className="object-cover my-auto cursor-pointer"
              layout="fill"
              src={image}
            />
          </Link>
        </div>
      ) : (
        ""
      )}
      <div className="shrink px-0 mt-2 sm:my-auto sm:px-4 pr-5 flex flex-col justify-center">
        <div>
          <Link href={link??''}>
            <h2 className="text-lg font-semibold leading-snug line-clamp-3">
              {title}
            </h2>
          </Link>
          <Link href={link??''}>
          <div className="mt-1 text-gray-500 text-sm line-clamp-1" dangerouslySetInnerHTML={{__html:excerpt}}></div>
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
