import Image from "next/image";
import SPONSOR_MOCK_DATA from "@/components/gallery/sponsorMockData";
export default function SponsorCard({ position }) {
  const sponsor = SPONSOR_MOCK_DATA;

  return (
    <>
        <div className="bg-white  border-gray-300 p-5 rounded-lg flex flex-row sm:flex-col">
          <a
            href={sponsor.node.sponsorInfo.trackingLink}
          >
              <div
                className="relative rounded mb-2 w-full"
                style={{ height: "148px" }}
              >
                <Image
                  priority={false}
                  data-gumlet={false}
                  layout="fill"
                  objectFit="cover"
                  src={ sponsor.node.sponsorInfo.sponsorImage }
                  className="md:w-auto flex-shrink-0 sm:w-full rounded-lg mr-4 object-contain"
                  alt={sponsor.node.sponsorInfo.sponsorImage}
                />
              </div>
          </a>
          <div className="flex-col sm:px-0 px-4">
            <a
              href={sponsor.node.sponsorInfo.trackingLink}
              className="block sm:mt-1"
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: sponsor.node.excerpt,
                }}
                className="text-sm cursor-pointer leading-5 font-medium text-gray-800"
              />
            </a>
            <h1 className="text-xs text-gray-700 uppercase mt-4 ">
              Brought to you by:
            </h1>
            <h1 className="text-sm font-semibold">
              {sponsor.node.sponsorInfo.sponsorName}
            </h1>
          </div>
        </div>
    </>
  );
}
