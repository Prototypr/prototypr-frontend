import Image from "next/image";
import Link from "next/link";
import Avatar from "../../avatar/Avatar";
import SmallTag from "../../tag/SmallTag";
import Moment from "react-moment";
import gumletLoader from "@/components/new-index/gumletLoader";

const SmallCard = ({ title, image, tags, date, avatar, author }) => {
  return (
    <div className="flex hover:bg-white transition transition-all duration-300 p-1 rounded-2xl flex-row  w-full max-w-[470px]">
      {image ? (
        <div className="w-full shrink-0 h-[90px] max-w-[100px] xs:max-w-[195px] xs:h-[124px] relative rounded-xl overflow-hidden border border-gray-100">
           <div
          className={`absolute h-[28px] w-[28px] bg-white rounded-lg z-10 m-1.5 top-0 left-0 border border-[1px] border-white overflow-hidden`}
          >
            <Image
              loader={gumletLoader}
              className="object-cover"
              layout="fill"
              src={avatar ? avatar : `/static/images/storybook/avatar.png`}
            />
          </div>
          <Image
            className="object-cover cursor-pointer"
            layout="fill"
            src={image}
          />
        </div>
      ) : (
        ""
      )}
      <div className="shrink px-4 pr-5 flex flex-col">
        <div className="flex flex-col justify-center h-auto xs:h-[124px]">
          {/* top */}
          <div>
            <div className="flex flex mb-1.5">
                <h2 className={`line-clamp-1 text-xs font-regular text-gray-800`}>
                  {author?.firstName} {author?.lastName ? author?.lastName : ""}
                </h2>
                <div className="px-1 text-xs text-gray-500 font-bold">·</div>
                <Moment
                className="text-xs text-gray-500"
                date={date}
                format="MMM DD"
                />
            </div>
            <div>
              <Link href="/">
                <h2 className="text-base text-lg font-semibold leading-snug line-clamp-3">
                  {title}
                </h2>
              </Link>
            </div>
          </div>
          {/* bottom */}
          <div>
            <div className="flex text-xs mt-3">
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
      </div>
    </div>
  );
};
export default SmallCard;
