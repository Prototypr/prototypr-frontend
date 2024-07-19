import Image from "next/image";
import Link from "next/link";
import Avatar from "../../avatar/AvatarLine";
import SmallTag from "../../tag/SmallTag";
import gumletLoader from "@/components/new-index/gumletLoader";

const MediumPost = ({
  post,
  showAuthor,
  showDescription,
  link,
  title,
  image,
  tags,
  date,
  avatar,
  author,
  excerpt,
  imageSmall,
  imageVSmall,
  imageHeight,
}) => {
  return (
    <div className="flex group hover:shadow-lg hover:scale-[1.005] h-full sm:mt-0 flex-col hover:bg-white transition transition-all duration-300 p-0 bg-white shadow-sm border border-gray-300/60 rounded-2xl overflow-hidden  w-full">
      {image && post?.attributes?.base64 ? (
        <div
          className={`w-full border-b border-gray-200 shrink-0 h-[240px] max-w-full ${imageHeight ? imageHeight : imageVSmall ? "md:h-[144px]" : imageSmall ? "md:h-[180px]" : "md:h-[240px]"} md:max-w-full relative overflow-hidden`}
        >
          <Link href={link ?? ""}>
            <Image
              className="object-cover group-hover:scale-[1.03] transition transition-all duration-700 cursor-pointer"
              layout="fill"
              placeholder="blur"
              blurDataURL={post?.attributes?.base64}
              src={image}
              loader={gumletLoader}
              alt={title}
            />
          </Link>
        </div>
      ) : (
        ""
      )}
      <div className="my-3 flex flex-col px-4 justify-between h-full">
        <div className="flex flex-col justify-between">
          <div className="flex mb-3 text-xs">
            {tags?.length
              ? tags.slice(0, 2).map((tag, index) => {
                  //2 long tags make break the layout, so remove word 'design'
                  let name = tag?.attributes?.name?.replace("-", " ");
                  return (
                    <>
                      {tag?.attributes?.slug ? (
                        <SmallTag
                          key={index}
                          index={index}
                          link={`/posts/${tag?.attributes?.slug}/page/1/`}
                        >
                          {name}
                        </SmallTag>
                      ) : null}
                    </>
                  );
                })
              : ""}
          </div>
          <Link href={link ?? ""}>
            <h2 className="text-lg tracking-tight mb-3 font-medium leading-snug line-clamp-2">
              {title}
            </h2>
          </Link>
          {showDescription !== false ? (
            <Link href={link ?? ""}>
              <div
                className="mb-6 text-gray-600 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: excerpt }}
              />
              {/* <p className="">{excerpt}</p> */}
            </Link>
          ) : null}

        </div>
        {showAuthor !== false ? (
            <div className="mb">
              <Avatar src={avatar} author={author} date={date} size="lg" />
            </div>
          ) : null}
      </div>
    </div>
  );
};
export default MediumPost;
