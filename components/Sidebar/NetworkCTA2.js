import Link from "next/link";
import Button from "@/components/Primitives/Button";

const PrototyprNetworkCTA = ({ data }) => {
  return (
    <div className="w-full p-5 mt-3 bg-[#EAE9F5] bg-opacity-50 rounded-2xl mb-1">
<Link href="/network">
      <div className="flex flex-col gap-1 justify-end items-end">
        <div className="w-full flex space-between rounded-[12px] h-auto p-5">
          <div className="w-2/3 flex flex-col">
            <div>
                <h2 className="text-gray-800 font-semibold text-lg font-inter">
                Build with us
                </h2>
                <p className='text-sm text-gray-500 max-w-[250px]'>
                We're an open-source platform, designed and built in public.
                </p>
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
      </Link>

    </div>
  );
};

export default PrototyprNetworkCTA;
