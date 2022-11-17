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
        {/* <div className="absolute top-1/2 -mt-8 text-center w-full left-0">
      <h1 className="text-6xl font-noto-serif font-semibold tracking-tighter leading-tight md:leading-tighter mb-5 text-center ">
        {title}
      </h1>
    </div> */}
      </div>
    ):template == 3 && 
    <>
<div className="text-center pt-16 md:pt-16">
		<p className="text-sm mb-3 md:text-base text-green-500 font-bold">Web Monetization Guide <span className="text-gray-900">/</span> Uphold</p>
		<h1 className="font-noto-serif font-bold break-normal text-gray-900 text-3xl md:text-6xl">{title}</h1>
	</div>
  <div className="container rounded-xl w-full max-w-6xl mx-auto bg-white bg-cover mt-10 h-[180px] md:h-[400px]" style={{backgroundImage:`linear-gradient(to bottom, rgba(255,255,255,0.15),rgba(0,0,0,0.2), rgba(0,0,0,0.34)),url('${coverImage}')`}}></div>
  
    {/* <div className="w-full absolute mt-[65px] left-0 top-0 h-56 md:h-[600px] mb-4 md:mb-0" style={{borderBottomLeftRadius:'200px'}}>
        <Image
          loader={gumletLoader}
          objectFit="cover"
          className="rounded-lg"
          layout="fill"
          src={coverImage}
          style={{borderBottomLeftRadius:'400px', borderBottomRightRadius:0}}
        />
         <div className="absolute top-1/2 -mt-12 px-12 md:-mt-8 text-center w-full left-0">
          <h1 className="text-4xl md:text-6xl text-gray-100 font-noto-serif font-semibold tracking-tighter leading-tight md:leading-tighter mb-5 text-center ">
            {title}
          </h1>
        </div>
         <div style={{height:'400px', width:'650px'}} className="absolute mx-auto top-1/2 -mt-12 px-12 md:-mt-8 text-center w-full left-0">
         <Image
          loader={gumletLoader}
          objectFit="contain"
          className="rounded-lg z-50 mx-auto"
          layout="fill"
          src={'https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/db06d2c34609938b92c515cb8b349034.jpg'}
        />
        </div>
      </div> */}
    </>
    }
    <div className="max-w-2xl mx-auto pt-4 md:pt-12">
      {template!==3 && <PostTitle>{title}</PostTitle>}

      <div className="flex justify-between">
        <div className="max-w-2xl">
          {author && template !== 2 && (
            <Link href={`/people/${author.slug}`} legacyBehavior>
              <div className="cursor-pointer block mb-6">
                <Avatar
                  date={date}
                  name={
                    author?.name
                      ? author?.name
                      : author?.displayName
                      ? author?.displayName
                      : author?.firstName
                      ? author?.firstName
                      : ""
                  }
                  picture={avatar}
                />
              </div>
            </Link>
          )}
        </div>
        {template == 1 && (
          <SocialShare
            slug={slug}
            title={title}
            authorTwitter={author?.twitter}
          />
        )}
      </div>
    </div>
  </>;
}
