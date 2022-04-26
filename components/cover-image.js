import Image from "next/image";
import Link from "next/link";

const gumletLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}


export default function CoverImage({ title, url, slug, type, route, imageHeight }) {
  url = url?.mediaItemUrl;

  const imageUrl = url
    ? `${
        url.startsWith("/") ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ""
      }${url}`
    : null;

  const image = url ? (
    <figure className={`relative w-full ${(type!=='toolbox') && imageHeight?imageHeight:'h-60 md:h-40'} overflow-hidden rounded-lg transform group-hover:translate-x-0 group-hover:shadow group-hover:translate-y-0 transition duration-700 ease-out overflow-hidden`}>
      <div className="absolute  w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition duration-700 ease-out cursor-pointer">
        <Link href={`/${type ? type : route ? route : "posts"}/${slug}`}>
          <Image
            loader={gumletLoader}
            className="rounded-lg contrast-115"
            objectFit="cover"
            layout="fill"
            src={imageUrl}
          />
        </Link>
      </div>
    </figure>
  ) : null;
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/${type ? type : route ? route : "posts"}/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
