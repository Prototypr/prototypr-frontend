import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

export default function CoverImage({ title, url, slug, type, route }) {

  url = url?.mediaItemUrl

  const imageUrl = url?`${
    url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''
  }${url}`:null

  const image = (
    url?<Image
      width={2000}
      height={type=='toolbox'?1500:1200}
      // layout='fill'
      objectFit="cover"
      alt={`Cover Image for ${title}`}
      src={imageUrl}
      className="rounded-lg"
      // className={cn('shadow-small', {
      //   'hover:shadow-medium transition-shadow duration-200': slug,
      // })}
    />:null
  )
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/${type?type:route?route:'posts'}/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
