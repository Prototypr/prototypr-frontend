import Link from "next/link";
import JobListItem from "@/components/v4/listItem/JobListItem";
import {CaretRight} from '@/components/icons'

const SidePanelJobs = ({ list }) => {
  return (
    <div className="flex rounded-lg flex-col gap-0 px-2 mt-8">
      <div className="flex flex-row justify-between items-baseline">
        <h3 className="font-inter my-0.5 font-bold text-gray-800 text-sm">
          Opportunities
        </h3>
      </div>
      <div className="flex flex-col grid my-2">
        {list.map((item, i) => {
          const { title, companyName, salaryText, id, companyLogo, locations } =
            item;
          return (
            <JobListItem
              id={id}
              index={i}
              title={title}
              locations={locations}
              companyName={companyName}
              companyLogo={companyLogo}
              showLogo={i === 0 ? true : false}
            />
          );
        })}

        <Link href={"/jobs"}>
          <div className="font-inter mt-1 text-gray-600 cursor-pointer text-xs flex">
            <div className="my-auto">See All</div>
          <CaretRight className="my-auto" size={12} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SidePanelJobs;
