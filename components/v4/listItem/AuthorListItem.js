import gumletLoader from "@/components/new-index/gumletLoader";
import Image from "next/image";
import Link from "next/link";

const AuthorListItem = ({
  slug,
  index,
  author,
}) => {

    let authorData = author
    const dummyAvatar = 'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'
    let avatar = author?.avatar?.data?authorData?.avatar?.data?.attributes?.url:authorData?.legacyAvatar?authorData?.legacyAvatar:dummyAvatar

  return (
    <Link href={`/people/${slug}`}>
      <div key={index} className="w-full h-auto cursor-pointer flex flex-col">
        <div className="flex flex-row my-3 rounded-lg">
          {avatar ? (
            <div
            //   style={{ flex: "0 0 3em" }}
              className="w-8 h-8 mr-2 relative border border-opacity-10 border-black rounded-full overflow-hidden"
            >
              <Image
                tabIndex={0}
                loader={gumletLoader}
                layout="fill"
                objectFit="cover"
                src={avatar}
                className="object-cover"
                alt="Author profile picture"
              />
            </div>
          ) : (
            ""
          )}
            <div
              className={`overflow-hidden flex flex-col justify-center line-clamp-1 my-auto font-medium font-inter text-sm ml-0.5`}
            >
                {author?.firstName ? (
                <>
                {author?.firstName} {author?.lastName ? author?.lastName : ""}
                </>
            ) : author?.displayName ? (
                <>
                {author?.displayName}
                </>
            ) : (
                <>
                Unknown
                </>
            )}
            </div>
            {/* <div
              className={`${
                showLogo ? "-mt-2 bg-[#F7F7F8]" : ""
              } flex flex-row gap-1 text-xs z-10 text-gray-500"`}
            >
              <p className=" h-[18px] max-w-[100px] overflow-hidden line-clamp-1 inline font-inter">
                {name},
              </p>
              <p className=" h-[18px] max-w-[150px] overflow-hidden line-clamp-1 inline font-inter">
                {locations[0]?.name}
              </p>
            </div> */}
        </div>
      </div>
    </Link>
  );
};
export default AuthorListItem;
