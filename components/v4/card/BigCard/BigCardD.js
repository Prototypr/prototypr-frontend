import Image from "next/image";
import Link from "next/link";
import Avatar from "../../avatar/AvatarLine";

const BigCard = ({ link,title, excerpt, image, tags, date, avatar, author }) => {
  return (
    <div className="hover:bg-white transition transition-all duration-300 rounded-2xl p-1 flex flex-col sm:flex-row font-inter w-full pr-6">
      <div  style={{ flex: `0 0 180px` }} className="w-full mb-4 sm:my-auto relative h-[128px] w-full md:w-[190px] rounded-2xl overflow-hidden border border-gray-200">
        <Link href={link??''}>
          <Image
            className="object-cover my-auto cursor-pointer"
            layout="fill"
            src={image}
          />
        </Link>
      </div>
      <div className="w-full px-0 sm:px-6 sm:my-auto flex flex-col justify-center">
        <Link href={link??''}>
          <h2 className="text-lg leading-snug font-semibold line-clamp-3">
            {title}
          </h2>
        </Link>
        <Link href={link??''}>
          <p className="mt-3 text-gray-500 text-sm line-clamp-2">{excerpt}</p>
        </Link>
        <div className="mt-3">
          <Avatar src={avatar} author={author} date={date} size="lg" />
        </div>
      </div>
    </div>
  );
};
export default BigCard;
