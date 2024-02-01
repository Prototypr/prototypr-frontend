import ToolIconCard from "@/components/v4/card/ToolIconCard";
// import Container from "@/components/container";
import Link from "next/link";
// import {CaretRight} from 'phosphor-react'
import { ArrowRight } from "phosphor-react";

const ToolIconCardRow = ({ tools, title, textColor, withBackground, showHeader }) => {
  return (
    <div className="flex flex-col w-full">
    {/* <Container maxWidth="max-w-[1320px] w-full"> */}
      {showHeader!==false && <div className="flex justify-between mb-3">
        <h3 className="font-semibold text-lg px-1">
         {title?title:
         <>
         Latest tools
         {/* <span className="hidden sm:inline text-gray-400">hand picked</span> */}
         </>}
        </h3>
        <div className="flex relative">
            <div className="text-md inline my-auto text-gray-800 font-normal font-inter">
            <Link href={`/toolbox/`}>See all</Link>
            </div>
            <div className="my-auto">
              <Link href={`/toolbox/`}>
                <div className="bg-blue-100 outline outline-1 outline-blue-300/50 ml-2.5 flex justify-center my-auto h-6 w-6 rounded-full">
                    <ArrowRight weight="bold" size={14} className="text-blue-900 my-auto"/>
                </div>
              </Link>
            </div>
          </div>
          {/* <Link href='/toolbox'>
            <div className="flex">
              <div className={`text-sm my-auto text-black opacity-60`}>See all</div>
              <CaretRight className="opacity-60 my-auto" size={16} />
            </div>
          </Link> */}

      </div>}
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-8`}>
        {tools.map((tool, index) => {
          return (
            <div key={index}>
              <ToolIconCard withBackground={withBackground} tool={tool?.attributes} />
            </div>
          );
        })}
      </div>
    {/* </Container> */}
    </div>
  );
};

export default ToolIconCardRow;
