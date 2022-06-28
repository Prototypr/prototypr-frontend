import Image from "next/image";
import gumletLoader from "@/components/new-index/gumletLoader";

export default function VisitCard({
  title = "",
  link = "",
  useNextImage = true,
  logoNew,
  tags = [],
}) {
  const tagz = tags?.data?.length ? tags?.data?.slice(0, 2) : null;
  return (
    <div className="flex bg-white rounded-lg mb-0 flex-col p-5 xl:p-6 ">
      <div className="flex flex-col lg:flex-row lg:justify-between mb-4 lg:mb-6">
        <div className="text-center lg:text-left lg:w-4/6 pr-3 order-last lg:order-first">
          <h1
            dangerouslySetInnerHTML={{ __html: title }}
            className="text-2xl lg:text-lg tracking-tight mb-2 lg:mb-3 lg:mb-1 lg:leading-snug font-bold text-gray-900 my-auto"
          ></h1>
          {tagz?.map((tag, index) => {
            return (
              <a
                key={index}
                rel="noreferrer"
                className="cursor-default inline-block mr-2 lg:mr-0 text-xs bg-gray-200 p-1 px-2 rounded-lg mt-1 uppercase"
                // href={`${tag.attributes.slug}`}
                // target="_blank"
              >
                # {tag.attributes.name}
              </a>
            );
          })}
        </div>

        <div className="lg:w-2.5/6 my-3 mb-5 lg:my-0 lg:mb-0 lg:mr-0">
          {useNextImage && logoNew && (
            <div className="mx-auto h-24 w-24 lg:h-16 lg:w-16 xl:h-20 xl:w-20 relative rounded-full border border-gray-200">
              <Image
                loader={gumletLoader}
                objectFit="cover"
                layout="fill"
                src={logoNew}
                alt="Product Logo"
                className="rounded-full"
              />
            </div>
          )}
        </div>
      </div>
      <a
        className="inline-block w-40 lg:w-full mx-auto"
        rel="noreferrer"
        href={link}
        target="_blank"
      >
        <button className="w-full lg:block bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 border-blue-default hover:border-blue-500 rounded-lg">
          Visit Site
        </button>
      </a>
    </div>
  );
}
