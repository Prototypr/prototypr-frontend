import gumletLoader from "@/components/new-index/gumletLoader";
import Image from "next/image";
import Link from "next/link";

const JobListItem = ({
  id,
  index,
  title,
  locations,
  companyName,
  companyLogo,
  showLogo,
}) => {
  return (
    <Link href={`/jobs/${id}`}>
      <div key={index} className="w-full h-auto cursor-pointer flex flex-col">
        <div className="flex flex-row my-3 rounded-lg">
          {companyLogo && showLogo ? (
            <div
              style={{ flex: "0 0 3em" }}
              className="w-12 h-12 mr-2 relative border border-opacity-10 border-black rounded-lg overflow-hidden"
            >
              <Image
                tabIndex={0}
                loader={gumletLoader}
                layout="fill"
                objectFit="cover"
                src={companyLogo}
                className="object-cover"
                alt="Author profile picture"
              />
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-col grid gap-1 justify-center">
            <p
              className={`overflow-hidden ${
                showLogo ? "line-clamp-1 mt-1" : "line-clamp-2"
              } inline font-medium font-inter text-sm`}
            >
              {title}
            </p>
            <div
              className={`${
                showLogo ? "-mt-2 bg-[#F7F7F8]" : ""
              } flex flex-row gap-1 text-xs z-10 text-gray-500"`}
            >
              <p className=" h-[18px] max-w-[100px] overflow-hidden line-clamp-1 inline font-inter">
                {companyName},
              </p>
              <p className=" h-[18px] max-w-[150px] overflow-hidden line-clamp-1 inline font-inter">
                {locations[0]?.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default JobListItem;
