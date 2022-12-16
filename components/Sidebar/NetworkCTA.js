import { SnowWithLights, SmallCardSnow } from "@/components/xmas/snow";
import Link from "next/link";

const PrototyprNetworkCTA = ({ data }) => {
    return (
      <div className="relative">
        <div className="absolute top-0 right-0 -translate-y-2 translate-x-2">
          <SnowWithLights />
        </div>
  
        <div className="flex flex-col gap-1 justify-end items-end">
          <div className="w-full rounded-[12px] h-auto bg-white border border-black border-opacity-10 p-6 flex flex-col grid gap-3 ">
            <div className="flex flex-col grid gap-2">
              <p className="text-black text-2xl mb-1 font-inter">
                Get noticed in the design community
              </p>
              <div>
                <Link href="/write">
                  <button className="px-4 py-2 text-white rounded-lg font-inter bg-blue-500 text-sm font-semibold">
                    Start Writing
                  </button>
                </Link>
                <Link href="/post/write-for-us">
                  <button className="px-4 ml-2 py-2 text-black rounded-lg font-inter font-semibold bg-gray-200 hover:bg-gray-100 text-sm">
                    Learn more
                  </button>
                </Link>
              </div>
            </div>
            <img
              className="w-full"
              src="/static/images/proto-little-peeps.svg"
            ></img>
          </div>
        </div>
      </div>
    );
  };

  export default PrototyprNetworkCTA