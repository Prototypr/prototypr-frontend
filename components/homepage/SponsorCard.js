import Link from "next/link";

const SponsorCard = ({ data }) => {
    return (
      <div className="flex flex-col grid gap-1 justify-end items-end">
        <a href={data.url} target="_blank" className="w-full">
          <div className="w-full rounded-[12px] h-auto bg-white border border-opacity-10 p-3 grid grid-cols-3 gap-2">
            <div className="w-20 h-20 relative bg-gray-100 rounded-lg overflow-hidden col-span-1">
              <img src={data.src} />
            </div>
            <div className="w-full col-span-2 flex flex-col grid gap-1">
              <p className="w-auto max-w-[150px] text-[#6B6B6B] font-medium tracking-[-0.1px] text-[13px] font-inter ">
                {data.heading}
              </p>
              <div>
                <span className="text-[10px] px-3 py-1 bg-[#FFF7E1] border border-yellow-700 border-opacity-10 rounded-full">
                  Sponsored
                </span>
              </div>
            </div>
          </div>
        </a>
        <Link href={"/sponsor"}>
          <span className="text-[12px] text-gray-500">Want to sponsor?</span>
        </Link>
      </div>
    );
  };
export default SponsorCard