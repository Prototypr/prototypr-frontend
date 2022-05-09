import Image from "next/image";

export default function Avatar({ name, picture }) {
  const url = picture;

  return (
    <div className="flex items-center mt-8">
      <div className="w-12 h-12 relative mr-4">
        {url && (
          <Image
            src={`${
              url.startsWith("/") ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ""
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
  );
}
