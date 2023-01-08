import Link from "next/link";
import Button from "@/components/Primitives/Button";

const PrototyprNetworkCTA = ({ data }) => {
  return (
    <div className="relative">

      <div className="flex flex-col gap-1 justify-end items-end">
        <div className="w-full flex space-between rounded-[12px] h-auto bg-[#EAE9F5] bg-opacity-70 p-5">
          <div className="w-2/3 flex flex-col grid gap-2">
            <div>
                <h2 className="text-gray-800 font-semibold text-lg mb-1 font-inter">
                Join us on Discord
                </h2>
                <p className='text-sm text-gray-500 mb-3'>
                Become a contributor and get writing feedback.
                </p>
                <div className="">
                <Link href="/network">
                    <Button  variant="ghostBlue">
                        Get an invite
                    </Button>
                </Link>
                {/* <Link href="/post/write-for-us">
                    <button className="px-4 ml-2 py-2 text-black rounded-lg font-inter font-semibold bg-gray-200 hover:bg-gray-100 text-sm">
                    Learn more
                    </button>
                </Link> */}
                </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
          <img
            className="w-[200px]"
            src="/static/images/prototypr-ppl.png"
          ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrototyprNetworkCTA;
