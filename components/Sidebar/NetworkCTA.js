import { SnowWithLights, SmallCardSnow } from "@/components/xmas/snow";
import Link from "next/link";

const PrototyprNetworkCTA = ({ data }) => {
  return (
    <div className="relative">
      {/* <div className="absolute top-0 right-0 -translate-y-2 translate-x-2">
        <SnowWithLights />
      </div> */}

      <div className="flex flex-col gap-1 justify-end items-end">
        <div className="w-full rounded-[12px] h-auto bg-white border border-black border-opacity-10 p-6 flex flex-col grid gap-3 ">
          <div className="flex flex-col grid gap-2">
            <p className="text-gray-800 font-medium max-w-[200px] text-[16px] mb-3 font-inter">
              Share and Grow together in the Design Community.
            </p>
            <div className="mb-2">
              <Link href="/write">
                <button className="px-4 py-2 text-white rounded-lg font-inter bg-blue-500 hover:bg-blue-400 text-sm font-semibold">
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
            className=" w-[190px]"
            src="/static/images/prototypr-ppl.png"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default PrototyprNetworkCTA;
