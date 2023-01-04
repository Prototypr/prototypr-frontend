import Link from "next/link";
import { usePlausible } from "next-plausible";
import Image from "next/image";
import gumletLoader from "@/components/new-index/gumletLoader";

const SponsorSidebarCard = ({
  sponsorLogo = "/static/images/placeholder/letter-logo.png",
  sponsorLink = "http://bit.ly/3WvKT1P", // letter conversion tracking
  title = "Build newsletters faster with Letter",
  sponsorName = "Letter",
  sponsorLocation = undefined,
  sponsorPage = undefined,
}) => {
  const plausible = usePlausible();

  return (
    <div>
      <>
        <a
          target={"_blank"}
          href={`${sponsorLink}`}
          onClick={() => {
            plausible("sponsorCard", {
              props: {
                location: sponsorLocation ? sponsorLocation : "none",
                page: sponsorPage ? sponsorPage : "none",
              },
            });
          }}
          className="flex px-1 flex-col grid gap-4"
        >
          <div className="w-full h-auto bg-opacity-70 rounded-xl cursor-pointer flex flex-col">
            <div className="flex flex-row rounded-xl">
              <div
                style={{ flex: "0 0 3em" }}
                className="w-12 h-12 mr-2 relative border border-opacity-10 border-black rounded-xl overflow-hidden"
              >
                {sponsorLogo ? (
                  <Image
                    tabIndex={0}
                    loader={gumletLoader}
                    layout="fill"
                    objectFit="cover"
                    src={sponsorLogo}
                    className="object-cover"
                    alt="Author profile picture"
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="flex flex-col grid gap-1 justify-center">
                <p className=" overflow-hidden line-clamp-2 inline my-auto font-inter text-sm">
                  {title}
                  <span className="text-xs ml-2 capitalize bg-gray-100 font-inter px-2 text-blue-800 py-0.5 border border-black border-opacity-5 text-black rounded-full">
                    Promoted
                  </span>
                </p>
                {/* <div className="flex flex-row gap-1 text-sm text-gray-500">
                  <span className="text-xs mt-1 capitalize bg-gray-100 font-inter px-3.5 py-0.5 border border-black border-opacity-5 text-black rounded-full">
                    Sponsored
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </a>
      </>
    </div>
  );
};

export const SponsorHomeCard = ({
  sponsorLogo = "/static/images/placeholder/letter-logo.png",
  sponsorLink = "https://letter.so",
  title = "Build Newsletters Faster with Letter",
  sponsorName = "Letter",
}) => {
  return (
    <div className="flex h-full flex-col grid items-center gap-4">
      <>
        <Link href={`${sponsorLink}`}>
          <div className="w-full h-auto rounded-xl cursor-pointer flex flex-col">
            <div className="flex flex-row p-4 rounded-xl">
              <div
                // style={{ flex: "0 0 3em" }}
                className="w-16 h-16 mr-2 relative border border-opacity-10 border-black rounded-xl overflow-hidden"
              >
                {sponsorLogo ? (
                  <Image
                    tabIndex={0}
                    loader={gumletLoader}
                    layout="fill"
                    objectFit="cover"
                    src={sponsorLogo}
                    className="object-cover"
                    alt="Author profile picture"
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="flex flex-col grid gap-1 justify-center">
                <p className=" h-[18px] overflow-hidden line-clamp-1 inline font-inter text-sm">
                  {title}
                </p>
                <div className="flex flex-row gap-1 text-sm text-gray-500">
                  <span className="text-xs capitalize flex flex-row justify-center items-center bg-gray-100 font-inter px-4 border border-black border-opacity-5 text-black rounded-full">
                    Sponsored
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </>
    </div>
  );
};

export default SponsorSidebarCard;
