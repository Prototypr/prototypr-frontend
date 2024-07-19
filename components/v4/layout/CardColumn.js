import ToolIconCard from "@/components/v4/card/ToolIconCard";
// import Container from "@/components/container";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
// import ToolImageCardSingle from "../card/ToolImageCardSingle";
import ToolBackgroundCard from "../card/ToolBackgroundCard";

const CardColumn = ({
  tools,
  title,
  textColor,
  withBackground,
  showHeader,
  sponsor,
}) => {
  return (
    <div
      // className={`flex flex-col h-full w-full ${true ? "bg-white p-3 rounded-2xl border border-gray-300/50 shadow-sm" : ""}`}
      className={`flex flex-col h-full w-full md:p-3 md:pt-0 pt-0`}
    >
      {/* <Container maxWidth="max-w-[1320px] w-full"> */}
      {showHeader !== false && (
        <div className="flex justify-between mb-4">
          <div>
            <h3 className="font-bold drop-shadow-sm text-xl tracking-[-0.018em] text-gray-800">
              {title ? title : <>🧰 Toolbox</>}
            </h3>
            <div className="text-sm text-gray-800">New products, daily.</div>
          </div>
          <div className="flex relative">
            {/* <div className="text-sm my-auto inline text-black/80 font-normal ">
              <Link href={`/toolbox/`}>See all</Link>
            </div> */}
            <div className="my-auto">
              <Link href={`/toolbox/`}>
                <div className="bg-gray-200/60  ml-2.5 flex justify-center my-auto h-5 w-5 rounded-full">
                  <ArrowRight
                    weight="bold"
                    size={12}
                    className="text-gray-900 my-auto"
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
      <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4`}>
        {sponsor
          ? [sponsor, ...tools.slice(0, 1)].map((tool, index) => {
              return (
                <div className="cols-span-1 md:col-span-1" key={index}>
                  <ToolBackgroundCard
                    height={"h-[220px] md:h-[310px] xl:h-[190px]"}
                    withBackground={withBackground}
                    post={tool}
                  />
                </div>
              );
            })
          : [...tools.slice(0, 2)].map((tool, index) => {
              return (
                <div className="cols-span-1 md:col-span-1" key={index}>
                  <ToolBackgroundCard
                    height={"h-[220px] md:h-[310px] xl:h-[190px]"}
                    withBackground={withBackground}
                    post={tool}
                  />
                </div>
              );
            })}
      </div>
      <div className="flex flex-col pt-6 grid grid-cols-6 gap-5">
        {tools.slice(1, tools.length - 2).map((tool, index) => {
          return (
            <div key={index} className="flex col-span-6 sm:col-span-3 lg:col-span-3 xl:col-span-6 flex-col">
              {index !== 0 ? (
                <div
                  className={`flex flex-col first:border-t-none`}
                />
              ) : (
                ""
              )}
              <div className="">
                <ToolIconCard withBackground={false} tool={tool?.attributes} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardColumn;
