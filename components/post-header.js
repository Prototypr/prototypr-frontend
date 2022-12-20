import Avatar from "../components/avatar";
import Link from "next/link";
import PostTitle from "../components/post-title";
import Image from "next/image";
import gumletLoader from "@/components/new-index/gumletLoader";
import SocialShare from "@/components/SocialShare";
export default function PostHeader({
  title,
  coverImage,
  date,
  author,
  type,
  template,
  slug,
}) {
  const avatar = author?.avatar?.data?.attributes?.url
    ? author?.avatar?.data?.attributes?.url
    : author?.legacyAvatar
    ? author?.legacyAvatar
    : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";

  return <>
    {template == 2 ? (
      <div className="w-full relative h-56 md:h-80 rounded-xl mt-2 mb-4 md:mb-0 md:mt-6">
        <Image
          loader={gumletLoader}
          objectFit="cover"
          className="rounded-xl"
          layout="fill"
          src={coverImage}
        />
      </div>
    ):template == 3 && 
    <>
<div className="text-center pt-16 md:pt-16">
		<p className="text-sm mb-3 md:text-base text-green-500 font-bold">Web Monetization Guide <span className="text-gray-900">/</span> Uphold</p>
		<h1 className="font-bold break-normal text-gray-900 text-3xl md:text-6xl">{title}</h1>
	</div>
  <div className="container rounded-xl w-full max-w-6xl mx-auto bg-white bg-cover mt-10 h-[280px] md:h-[400px]" style={{backgroundImage:`linear-gradient(to bottom, rgba(255,255,255,0.15),rgba(0,0,0,0.2), rgba(0,0,0,0.34)),url('${coverImage}')`}}></div>
    </>
    }
    <div className="max-w-[45rem] mx-auto pt-4 md:pt-7">
      {template!==3 && <PostTitle>{title}</PostTitle>}

      <div className="flex justify-between">
        <div className="max-w-2xl">
          {author && template !== 2 && (
            <Link href={`/people/${author.slug}`}>
              <div className="cursor-pointer block mb-8">
                <Avatar
                  date={date}
                  name={
                   `${author?.firstName ? author?.firstName:''}
                    ${author?.lastName ? ' '+author?.lastName:''}
                    ${(!author?.firstName && !author?.lastName) ? author?.name:''}`
                  }
                  picture={avatar}
                />
              </div>
            </Link>
          )}
        </div>
        {/* {template == 1 && (
          <SocialShare
            slug={slug}
            title={title}
            authorTwitter={author?.twitter}
          />
        )} */}
      </div>
    </div>
  </>;
}
