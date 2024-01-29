import ToolLargeCard from "@/components/v4/card/ToolLargeCard";
// import Container from "@/components/container";
import Link from "next/link";
import {CaretRight} from 'phosphor-react'

const ToolLargeCardRow = ({ tools }) => {
  return (
    <>
    {/* <Container maxWidth="max-w-[1320px] w-full mb-8"> */}
      <div className="flex justify-between">
        <h3 className="text-3xl mb-10 text-gray-800 font-semibold font-inter max-w-md">
          Featured <span className="hidden sm:inline text-gray-400">tools</span>
        </h3>
          <Link href='/toolbox'>
            <div className="flex">
              <div className="text-sm my-auto text-black opacity-60">See all</div>
              <CaretRight className="opacity-60 my-auto" size={16} />
            </div>
          </Link>

      </div>
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-8`}>
        {tools.map((tool, index) => {
          return (
            <div key={index}>
              <ToolLargeCard tool={tool?.attributes} />
            </div>
          );
        })}
      </div>
    {/* </Container> */}
    </>
  );
};

export default ToolLargeCardRow;
