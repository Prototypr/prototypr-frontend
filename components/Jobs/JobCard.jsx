import dynamic from "next/dynamic";
import { ClockIcon, LocationIcon, MoneyIcon } from "@/components/icons";
import Link from "next/link";
import Button from "@/components/Primitives/Button";

const TimeAgo = dynamic(() => import("react-timeago"), { ssr: false });

const JobPostCard = ({ job }) => {
    return (
      <Link href={`/jobs/${job.id}`}>
      <div className="w-full mb-5 relative group cursor-pointer shadow-sm hover:shadow-lg transition transition-all duration-300 ease-in-out h-auto px-6 py-6 bg-white rounded-[10px] flex flex-col md:flex-row gap-5 border border-gray-300">
  
        <div className="hidden md:block opacity-0 group-hover:opacity-100 transition transition-opacity duration-200 absolute mt-5 mr-5 right-0 top-0">
            <Button>
              View Job
            </Button>
        </div>
       
        {/* image */}
        {job.companyLogo?
          <img className="w-[56px] h-[56px] md:w-[66px] md:h-[66px] bg-[#CEE2FF] rounded-full border border-gray-100" src={job.companyLogo}/>
          :<div className="w-[66px] h-[66px] bg-[#CEE2FF] rounded"></div>
        }
        {/* content */}
        <div className="flex flex-col grid gap-3 grid flex-grow">
          <div className="flex flex-col grid gap-6">
            <div className="flex flex-col grid gap-2">
              <h1 className="text-xl m-0 inter-font font-medium">{job.title}</h1>
              <div className="flex flex-row gap-3 text-base inter-font font-regular text-[#A3ACC2]">
                <span className="text-gray-800 font-medium text-md">{job.companyName}</span>
                {job.type?
                 <>
                 <div className="flex flex-row gap-0.5 ml-1">
                  <ClockIcon/>
                  <div className="ml-1 text-gray-500 my-auto text-md inter-font font-base">
                    {job.type}
                  </div>
                </div>
                 </>
              :''}
               {job.salaryText? 
               <>
               <div className="flex flex-row gap-0.5">
                <MoneyIcon/>
                <div className="ml-1 text-gray-500 my-auto text-md font-base">
                  {job.salaryText}
                </div>
              </div>
               </>
              :''}
              </div>
            </div>
            <div className="gap-2 flex flex-row">
              {job.skills?.map((x, i) => (
                <span
                  className="py-1 px-3 text-xs rounded-full bg-purple-100 text-purple-600 text-md"
                  key={i}
                >
                  {x.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* side info */}
        <div className="hidden opacity-100 group-hover:opacity-0 transition transition-opacity duration-100 md:flex flex-col">
          {job.locations[0]?.name && 
          <div className="flex p-1 px-1.5 rounded-lg mb-2">
            <LocationIcon/>
            <p className="text-gray-500 ml-1 my-auto text-sm font-base">
            {job.locations[0]?.name}
            </p>
          </div>
          }
          <TimeAgo
            className="text-gray-500 ml-1 text-right text-sm font-base"
            date={job.date}
          />
        </div>
      </div>
          </Link>
    );
  };

  export default JobPostCard