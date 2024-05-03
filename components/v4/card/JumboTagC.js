import Link from "next/link";
import { usePlausible } from "next-plausible";
import { ArrowRight } from "@/components/icons";
// import Image from "next/image";
// import gumletLoader from "@/components/new-index/gumletLoader";

const JumboTag = ({ topic, withBackground, showCount }) => {

  const plausible = usePlausible();
    
  return (
    <div className={`mt-4 md:mt-0 col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-2`}>
      
      <Link
        href={`/posts/${topic.slug}/page/1`}
        onClick={() => {
          plausible("toolIconCard", {
            props: {
              location: "discoverSection",
              page: "home",
            },
          });
        }}
        className="flex flex-col"
      >
        <div className={`relative overflow-hidden w-full h-[170px] justify-center rounded-xl border border-black/10 cursor-pointer flex flex-col`}>
          <div className="flex flex-row justify-center rounded-full">
              <div className="w-[76px] h-[76px] opacity-80 p-3 my-auto relative rounded-full overflow-hidden">
                {topic.icon?
                <img className="w-full h-full" src={topic.icon}/>:''}
            </div>
          </div>
        </div>
        <div className="flex w-full relative justify-between p-2">
            <div className="capitalize z-10 text-base text-gray-800 overflow-hidden line-clamp-1 inline font-medium font-inter">
              {topic?.name}
            </div>
            <div className="bg-gray-500/20 z-10 flex justify-center my-auto h-6 w-6 rounded-full">
                <ArrowRight weight="bold" size={14} color="rgba(0,0,0,0.7)" className="my-auto"/>
            </div>
          </div>
              {/* {(topic?.name && showCount!==false) ? (
                  <div className="flex flex-row text-sm text-gray-500">
                    <span className="text-xs text-gray-500">
                      {topic.count} articles
                    </span>
                  </div>
              ) : (
                ""
              )} */}
      </Link>
      </div>
  );
};
export default JumboTag;
