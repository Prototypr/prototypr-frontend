import dynamic from "next/dynamic";
import Image from "next/image";
const SwiperGallery = dynamic(() => import("./SwiperGallery"));

export default function PopupGallery({
  item,
  gallery,
  link,
  img,
  body,
  rounded,
  arrows,
}) {
  return (
    <div className="bg-white pb-4 mb-6 rounded-lg w-full">
      {gallery && gallery.length ? (
        <SwiperGallery data={gallery} />
      ) : (
        <div className="my-auto mx-auto flex justify-center p-6 rounded">
          <Image
            // layout="fill"
            objectFit="cover"
            width="600"
            height="400"
            alt="Product screenshot"
            className="rounded"
            src={
              item.attributes?.featuredImage?.data?.attributes?.url
                ? item.attributes.featuredImage.data.attributes.url
                : item.legacyFeaturedImage
                ? item.legacyFeaturedImage.mediaItemUrl
                : item.ogImage
                ? item.ogImage.opengraphImage
                : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png"
            }
          />
        </div>
      )}
    </div>
  );
}
