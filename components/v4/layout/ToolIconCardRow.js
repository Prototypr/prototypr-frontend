import ToolIconCard from "@/components/v4/card/ToolIconCard";
import Container from "@/components/container";
import Link from "next/link";
import {CaretRight} from 'phosphor-react'

const ToolIconCardRow = ({ tools }) => {
  return (
    <Container maxWidth="max-w-[1320px] w-full">
      <div className="flex justify-between">
        <h3 className="font-bold text-lg mb-6 px-1">
          Latest tools <span className="text-gray-400">for creators</span>
        </h3>
          <Link href='/toolbox'>
            <div className="flex">
              <div className="text-sm my-auto text-black opacity-60">See all</div>
              <CaretRight className="opacity-60 my-auto" size={16} />
            </div>
          </Link>

      </div>
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-6 px-1`}>
        {tools.map((tool, index) => {
          return (
            <div key={index}>
              <ToolIconCard tool={tool?.attributes} />
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default ToolIconCardRow;
