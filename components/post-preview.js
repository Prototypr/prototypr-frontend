import Avatar from './avatar'
import Date from './date'
import CoverImage from './cover-image'
import Link from 'next/link'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  type
}) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} url={coverImage} type={type} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/${type?type:'posts'}/${slug}`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <Date dateString={date} />
      </div>
      <div className="text-lg leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: excerpt }}></div>
     {author && <Avatar name={author.displayName?author.displayName:author.firstName?author.firstName:author.displayName?author.displayName:''} picture={author.avatar} />}
    </div>
  )
}
