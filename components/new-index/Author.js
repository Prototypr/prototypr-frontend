import Image from "next/image";
import Link from "next/link";
export default function Author({ avatar = "", author = "", authorName = "" }) {
  return (
    <>
      <div className="flex items-center">
        <div className="w-9 h-9 cursor-pointer transform transition duration-500 hover:scale-125 hover:shadow-sm rounded-full relative">
          {avatar && (
            <Link href={`people/${author?.data?.attributes?.slug}/page/1`}>
              <Image
                src={avatar}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </Link>
          )}
        </div>
        <div className="font-normal text-base ml-3 text-gray-600">
          {authorName}
        </div>
      </div>
    </>
  );
}
