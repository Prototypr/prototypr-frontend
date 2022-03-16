import Avatar from './avatar'
import Date from './date'
import CoverImage from './cover-image'
// import Image from 'next/image'
import Link from 'next/link'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  type,
  tag = {}
}) {
  return (
    <div className="flex flex-col py-4 flex-grow h-full shadow-md hover:shadow-xl bg-white relative rounded-lg">
      <div className="relative rounded-lg px-4 pb-4 cursor-pointer">
        <>
          <CoverImage slug={slug} title={title} url={coverImage} type={type} />
          <div className="absolute rounded-full bg-white bottom-0 left-7">
            {
              coverImage && coverImage.logoNew && (
                <img 
                  alt="Brand logo for external website's link"
                  className="object-cover flex-shrink-0 shine rounded-full border-2 border-white  shadow h-10 -mt-4 w-10 hover:shadow-xl"
                  src={coverImage.logoNew}
                />
              )
            }
          </div>
        </>
      </div>

      {/* <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/${type?type:'posts'}/${slug}`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </h3> 

      <div className="text-lg mb-4">
        <Date dateString={date} />
      </div>
      <div className="text-lg leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: excerpt }}></div>
     {author && <Avatar name={author.displayName?author.displayName:author.firstName?author.firstName:author.displayName?author.displayName:''} picture={author.avatar} />}
      */}
      <div className="px-4 py-1 flex justify-between">
        <div className="pl-3 overflow-hidden mt-1 cursor-pointer">
          <div className="font-medium overflow-hidden heading mt-0 h-6">{title}</div>
          <div className="text-sm capitalize text-gray-500">
             {tag && `#${tag.attributes && tag.attributes.slug}`}
          </div>
        </div>
      </div>
    </div>
  )
}
