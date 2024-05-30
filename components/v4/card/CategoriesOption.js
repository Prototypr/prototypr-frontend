// import Image from "next/image";
// import gumletLoader from "@/components/new-index/gumletLoader";

const CategoriesOption = ({ topic, withBackground, showCount }) => {

    
  return (
          <div className="flex cursor-pointer flex-row rounded-xl px-1 pr-3">
          <div
              // style={{ flex: "0 0 3em" }}
              className="w-[42px] h-[42px] onboard-option-icon flex-basis-12 bg-gray-100 p-1 my-auto mr-2 relative rounded-lg overflow-hidden"
            >
              {topic.icon?
              <img className="w-full h-full" src={topic.icon}/>:''}
            </div>
            <div className="flex flex-col pl-1 justify-center">
              <div className="capitalize overflow-hidden line-clamp-1 inline font-medium py-0  text-sm text-gray-800">
                {topic?.name}
                {/* <span className="text-xs ml-2 capitalize bg-gray-100  px-2 text-blue-800 py-0.5 border border-black border-opacity-5 text-black rounded-full">
                  Promoted
                </span> */}
              </div>
              {(topic?.name && showCount!==false) ? (
                // <Link href={`/toolbox/${tags?.data[0]?.attributes?.slug}`}>
                  <div className="flex flex-row text-sm text-gray-500">
                    {/* <span className="text-xs mt-1 capitalize bg-gray-100  px-2 py-0.5 border border-black border-opacity-5 text-black rounded-full"> */}
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
