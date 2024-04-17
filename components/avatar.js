import Image from "next/image";
import Date from "@/components/date";
import gumletLoader from "./new-index/gumletLoader";

export default function Avatar({ name, picture, date }) {
  const url = picture;

  return (
    <div className="flex items-center mt-8 pb-4">
      <div className="w-12 h-12 relative mr-4 my-auto">
        {url && (
          <Image
            src={`${
              url.startsWith("/") ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ""
            }${url}`}
            objectFit="cover"
            layout="fill"
            className="rounded-full"
            alt={name}
            loader={gumletLoader}
          />
        )}
      </div>
      <div className="">
        <div className="text-lg hover:underline font-medium">{name}</div>
        {date && (
          <div className="text-base text-gray-700">
            <Date dateString={date} />
          </div>
        )}
      </div>
    </div>
  );
}
