import ToolIconCard from "@/components/v4/card/ToolIconCard";
// import Container from "@/components/container";
import Link from "next/link";
// import {CaretRight} from 'phosphor-react'
import { ArrowRight } from "phosphor-react";
// import ToolImageCardSingle from "../card/ToolImageCardSingle";
import ToolBackgroundCard from "../card/ToolBackgroundCard";
import NewsColumnCard from "../card/NewsColumnCard";
import { Robot } from "phosphor-react";

const NewsColumn = ({
  posts,
  title,
  textColor,
  withBackground,
  showHeader,
  sponsor,
}) => {
  return (
    <div
      className={`flex flex-col h-full w-full ${true ? "bg-white rounded-2xl border border-gray-300/50 shadow-sm" : ""}`}
    >
      {/* <Container maxWidth="max-w-[1320px] w-full"> */}
      {showHeader !== false && (
        <div className="flex justify-between mb-4 p-2.5 bg-gray-50/50 border-b border-gray-100 rounded-t-2xl">
          <div>
            <div className="flex">
              {/* <div className="my-auto">
                <Robot size={'24'} />
              </div> */}
              <h3 className="font-bold drop-shadow-sm text-xl tracking-[-0.018em] text-gray-800">
                {title ? title : <>Daily News</>}
              </h3>
            </div>
            <div className="text-sm text-gray-800">Selected by humans.</div>
          </div>
          <div className="flex relative">
            {/* <div className="text-sm my-auto inline text-black/80 font-normal font-inter">
              <Link href={`/news/`}>See all</Link>
            </div> */}
            <div className="my-auto">
              <Link href={`/news/`}>
                <div className="bg-blue-100  ml-2.5 flex justify-center my-auto h-5 w-5 rounded-full">
                  <ArrowRight
                    weight="bold"
                    size={12}
                    className="text-blue-900 my-auto"
                  />
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
        </div>
      )}
      <div className="flex flex-col p-2.5">
        {posts.slice(0, 12).map((tool, index) => {
          return (
            <div key={index} className="flex flex-col">
              <div className={`${index==0?'-mt-6':'border-t border-gray-100'} my-3 flex flex-col`} />
              <div className="">
                <NewsColumnCard
                  withBackground={false}
                  tool={tool?.attributes}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewsColumn;
