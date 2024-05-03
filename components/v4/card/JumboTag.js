import Link from "next/link";
import { usePlausible } from "next-plausible";
import { ArrowRight } from "@/components/icons";
// import Image from "next/image";
// import gumletLoader from "@/components/new-index/gumletLoader";

const JumboTag = ({ topic, withBackground, showCount }) => {

  const plausible = usePlausible();
    
  return (
    <div className={`mt-4 md:mt-0 col-span-12 xs:col-span-6 md:col-span-4 lg:col-span-3`}>
      
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
        <>
        <div className={`relative overflow-hidden ${withBackground?'bg-gradient-to-br from-blue-800/80 to-blue-800/90':''} w-full h-[180px] justify-center rounded-xl shadow-sm cursor-pointer flex flex-col`}>
          <img className="absolute opacity-20 w-full h-full top-0 left-0 object-cover" 
          src="/static/images/app-icon.svg"/>
          <div className="flex flex-row justify-center rounded-full">
              <div className="w-[64px] h-[64px] bg-white bg-opacity-5 backdrop-blur-sm p-3 my-auto relative rounded-full overflow-hidden">
                {topic.icon?
                <img className="w-full h-full opacity-90" 
                style={{filter:'invert(100%)'}} 
                src={topic.icon}/>:''}
            </div>
          </div>
        </div>
          <div className="flex relative justify-between p-2">
            <div className="capitalize text-lg overflow-hidden line-clamp-1 inline font-medium font-inter">
              {topic?.name}
            </div>
            <div className="bg-blue-500 flex justify-center my-auto h-6 w-6 rounded-full">
                <ArrowRight weight="bold" size={14} color="rgba(255,255,255,0.8)" className="my-auto"/>
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
        </>
      </Link>
      </div>
  );
};
export default JumboTag;
