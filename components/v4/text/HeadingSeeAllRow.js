import Link from "next/link";
import { CaretRight } from "@/components/icons";

const HeadingSeeAllRow = ({
  link = "/",
  title = "Featured tools",
  extraTextHighlight = "",
  subheader = "",
}) => {
  return (
    <div className="flex justify-between">
      <div className="mt-6 mb-6 px-1">
        <h3 className="font-bold mb-1 text-[24px] md:text-[36px]">
          {title}{" "}
          {extraTextHighlight ? (
            <span className="hidden md:block text-gray-400">
              {extraTextHighlight}
            </span>
          ) : (
            ""
          )}
        </h3>
        {subheader ? (
          <p className="text-[#757575] text-[16px] md:text-[24px] max-w-[230px] sm:max-w-full">
            {subheader}
          </p>
        ) : (
          ""
        )}
      </div>
      <Link href={link}>
        <div className="flex mt-6">
          <div className="text-base my-auto  text-blue-600">See all</div>
          <CaretRight color="rgb(37,99,235)" className=" my-auto" size={16} />
        </div>
      </Link>
    </div>
  );
};
export default HeadingSeeAllRow;
