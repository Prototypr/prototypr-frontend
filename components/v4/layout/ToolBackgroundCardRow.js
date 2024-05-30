import ToolImageCardSingle from "../card/ToolImageCardSingle";



// new one
// import ToolBackgroundCard from "../card/ToolBackgroundCard";

const ToolBackgroundCardRow = ({ tools , showTitle}) => {
  return (
    <>
      {/* {showTitle!==false?<div className="flex justify-between mb-6">
        <h3 className="text-3xl text-black/90 font-semibold  max-w-md">
          Featured tools
        </h3>
        <div className="flex relative my-auto">
            <div className="text-md inline text-black/80 font-normal ">
            <Link href={`/toolbox/`}>See all</Link>
            </div>
            <div className="my-auto">
              <Link href={`/toolbox/`}>
                <div className="bg-gray-200/60  ml-2.5 flex justify-center my-auto h-6 w-6 rounded-full">
                    <ArrowRight weight="bold" size={14} className="text-gray-900 my-auto"/>
                </div>
              </Link>
            </div>
          </div>
      </div>:''} */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`}>
        {tools.map((tool, index) => {
          return (
            <div key={index}>
              <ToolImageCardSingle post={tool} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ToolBackgroundCardRow;
