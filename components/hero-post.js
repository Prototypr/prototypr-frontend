import Image from "next/image";
import Date from "./date";
import CoverImage from "./cover-image";
import Link from "next/link";

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  type,
}) {
  const avatar = author.avatar?.data
    ? author.avatar.data.url
    : author.legacyAvatar
    ? author.legacyAvatar
    : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
  const name = author.displayName
    ? author.displayName
    : author.firstName
    ? author.firstName
    : "";
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} url={coverImage} slug={slug} type={type} />
      </div>
      <div className="md:grid md:grid-cols-2 gap-y-10 gap-x-4 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link href={`/${type ? type : "posts"}/${slug}`}>
              <span className="hover:underline">{title}</span>
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <div
            className="text-lg leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          ></div>

          {/* avatar */}
          <div className="flex items-center mt-8">
            <div className="w-12 h-12 relative mr-4">
              {url && (
                <Image
                  src={`${
                    avatar.startsWith("/")
                      ? process.env.NEXT_PUBLIC_STRAPI_API_URL
                      : ""
                  }${url}`}
                  objectFit="cover"
                  layout="fill"
                  className="rounded-full"
                  alt={name}
                />
              )}
            </div>
            <div className="text-lg font-semibold">{name}</div>
          </div>
          {/* avatar */}
        </div>
      </div>
    </section>
  );
}
