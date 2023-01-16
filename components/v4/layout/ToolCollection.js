// import ToolIconCard from "@/components/v4/card/ToolIconCard";
// import Link from "next/link";
// import {CaretRight} from 'phosphor-react'
import ToolCardSimple from "../card/ToolCardSimple";

const ToolCollection = ({ tools, topic, tagline }) => {
  return (
    <div className="w-full pl-6 mb-12">
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
      <ToolCardSimple posts={tools} columns={'lg:grid-cols-2'} type="toolbox" />
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
