// import Image from "next/image";
// import gumletLoader from "@/components/new-index/gumletLoader";

const CategoriesOption = ({ topic, withBackground, showCount }) => {

    
  return (
          <div className="flex flex-row rounded-xl">
          <div
              // style={{ flex: "0 0 3em" }}
              className="w-12 h-12 onboard-option-icon flex-basis-12 bg-gray-100 p-3 my-auto mr-2 relative rounded-xl overflow-hidden"
            >
              {topic.icon?
              <img className="w-full h-full" src={topic.icon}/>:''}
            </div>
            <div className="flex flex-col pl-1 justify-center">
              <div className="capitalize overflow-hidden line-clamp-1 inline font-medium py-0 mb-0.5 font-inter text-base">
                {topic?.name}
                {/* <span className="text-xs ml-2 capitalize bg-gray-100 font-inter px-2 text-blue-800 py-0.5 border border-black border-opacity-5 text-black rounded-full">
                  Promoted
                </span> */}
              </div>
              {(topic?.name && showCount!==false) ? (
                // <Link href={`/toolbox/${tags?.data[0]?.attributes?.slug}`}>
                  <div className="flex flex-row text-sm text-gray-500">
                    {/* <span className="text-xs mt-1 capitalize bg-gray-100 font-inter px-2 py-0.5 border border-black border-opacity-5 text-black rounded-full"> */}
                    <span className="text-xs text-gray-500">
                      {topic.count} articles
                    </span>
                    {/* </span> */}
                  </div>
                // </Link>
              ) : (
                ""
              )}
            </div>
          </div>
  );
};
export default CategoriesOption;
