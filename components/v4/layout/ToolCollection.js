import ToolCardSimple from "../card/ToolCardSimple";

const ToolCollection = ({ tools, topic, tagline,slug }) => {
  return (
    <div className="border-t border-black border-opacity-5 md:border-t-0 sm:pt-8 mt-8 md:pt-0 lg:mt-0 w-full">
    
    {/* heading - removed for now */}
      {/* <div className="flex relative p-2 mb-1">
            <div className="text-lg overflow-hidden line-clamp-1 inline font-medium ">
            <Link href={`/toolbox/`}><span className="capitalize">{topic}</span> tools</Link>
            </div>
            <div className="my-auto">
              <Link href={`/toolbox/`}>
                <div className="bg-blue-200/90 ml-3 flex justify-center my-auto h-6 w-6 rounded-full">
                    <ArrowRight weight="bold" size={14} color="rgb(0,0,0)" className="my-auto"/>
                </div>
              </Link>
            </div>
          </div> */}

      {/* <div className="flex justify-between">
        
          <Link href='/toolbox'>
            <div className="flex">
              <div className="text-sm my-auto text-black opacity-60">See all</div>
              <CaretRight className="opacity-60 my-auto" size={16} />
            </div>
          </Link>

      </div> */}
      {tools?.length?
      <>
      <ToolCardSimple posts={tools} columns={'grid-cols-1'} type="toolbox" />
      {/* <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-6`}> 
      <div className="flex flex-col justify-center">
        <div className="text-gray-500 uppercase text-xs">
          {tagline}
        </div>
        <h3 className="font-medium text-base">
        {topic} <span className="">tools</span>
        </h3>
        <Link href='/toolbox'>
            <div className="flex mt-2">
              <div className="text-sm my-auto text-black opacity-50">See all</div>
              <CaretRight className="opacity-60 my-auto" size={16} />
            </div>
          </Link>
      </div>
        {tools?.slice(0,4).map((tool, index) => {
           return (
             <div key={index}>
               <ToolIconCard small={false} withBackground={false} tool={tool?.attributes} />
             </div>
           );
         })}
       </div> */}
      </>
      :''}
    </div>
  );
};

export default ToolCollection;
