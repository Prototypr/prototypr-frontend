import ToolLargeCard from "@/components/v4/card/ToolLargeCard";
// import Container from "@/components/container";
import Link from "next/link";
import {CaretRight} from 'phosphor-react'

const ToolLargeCardRow = ({ tools }) => {
  return (
    <>
    {/* <Container maxWidth="max-w-[1320px] w-full mb-8"> */}
      <div className="flex justify-between">
        <h3 className="text-[24px] mb-8 text-[#0F1F40] font-semibold font-inter max-w-md leading-[32px]">
          Featured <span className="hidden sm:inline text-gray-400">design tools</span>
        </h3>
          <Link href='/toolbox'>
            <div className="flex">
              <div className="text-sm my-auto text-black opacity-60">See all</div>
              <CaretRight className="opacity-60 my-auto" size={16} />
            </div>
          </Link>

      </div>
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-6`}>
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
