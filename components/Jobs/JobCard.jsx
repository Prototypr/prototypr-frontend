import dynamic from "next/dynamic";
import { ClockIcon, LocationIcon, MoneyIcon } from "@/components/icons";
import Link from "next/link";
import Button from "@/components/Primitives/Button";
import gumletLoader from "../new-index/gumletLoader";
import Image from "next/image";
import { Briefcase, ClockAfternoon, MapPin } from "phosphor-react";

const TimeAgo = dynamic(() => import("react-timeago"), { ssr: false });

const JobPostCard = ({ job }) => {
    return (
      <Link href={`/jobs/${job.id}`}>
    <div className="flex-col p-4  md:p-6 shadow-sm group flex-grow h-full border-black/5 border-1 hover:shadow-lg transition-shadow duration-500 bg-white relative rounded-3xl">
  
        {/* <div className="hidden md:block opacity-0 group-hover:opacity-100 transition transition-opacity duration-200 absolute mt-5 mr-5 right-0 top-0">
            <Button>
              View
            </Button>
        </div> */}
       
        {/* image */}
        <div className="flex">
            {job.companyLogo?
            <div className="basis-[96px] my-auto pr-3.5 md:pr-6">
              <div className="relative my-auto w-[80px] h-[80px] md:w-[96px] md:h-[96px] md:w-[96px] md:h-[96px] bg-[#CEE2FF] rounded-full border border-gray-100">
              {job.companyLogo?
              <Image
              loader={gumletLoader}
              priority={`false`}
              data-priority={`false`}
              data-gmlazy={`true`}
              className="rounded-full object-cover"
              objectFit="cover"
              layout="fill"
              src={job.companyLogo}
            />:''}
            </div>
            </div>
              // <img className="w-[80px] h-[80px] md:w-[96px] md:h-[96px] md:w-[96px] md:h-[96px] bg-[#CEE2FF] rounded-full border border-gray-100" src={job.companyLogo}/>
              :<div className="w-[80px] h-[80px] md:w-[96px] md:h-[96px] bg-[#CEE2FF] rounded"></div>
            }
            {/* content */}
                <div className="flex flex-col">
                  <div className="flex mb-1">
                    <>
                    <h4 className="text-gray-800 mr-3 font-medium text-sm md:text-md">{job.companyName}</h4>
                    </>
                    <>
                   <TimeAgo
                      className="text-gray-500 my-auto text-left text-xs font-base"
                      date={job.date}
                    />
                </>
                  </div>
                  <h1 className="md:line-clamp-1 text-base md:text-xl m-0 mb-1 sm:mb-2 inter-font font-medium max-w-[400px]">{job.title}</h1>
                  <div className="hidden sm:flex">

                  {job.type?
                    <>
                    <div className="mr-2.5 flex flex-row gap-0.5">
                    <Briefcase size={16} />
                      <div className="ml-1 text-gray-500 my-auto text-xs inter-font font-base">
                        {job.type}
                      </div>
                    </div>
                    </>
                  :''}
                  {job.locations[0]?.name && 
                  <div className="flex rounded-lg mr-2.5">
                    <MapPin size={16} />
                    <p className="text-gray-500 ml-1 my-auto text-xs font-base">
                    {job.locations[0]?.name}
                    </p>
                  </div>
                  }
                  {/* <div className="flex rounded-lg">
                  <ClockAfternoon size={16} />
                  <TimeAgo
                      className="text-gray-500 ml-1 my-auto text-right text-xs font-base"
                      date={job.date}
                    />

                  </div> */}
                  
                </div>
                <div className="sm:mt-3 flex-row">
                  {job.skills?.slice(0,1).map((x, i) => (
                    <span
                      className="py-1 mr-2 px-3 text-[11px] rounded-full bg-purple-100 text-purple-600 text-md"
                      key={i}
                    >
                      {x.name}
                    </span>
                  ))}
                </div>
                </div>
        </div>
        {/* <div className="flex flex-row text-base inter-font font-regular text-[#A3ACC2]">
                  
                  {job.salaryText? 
                  <>
                  <div className="mr-3 flex flex-row gap-0.5">
                    <MoneyIcon/>
                    <div className="ml-1 text-gray-500 my-auto text-md font-base">
                      {job.salaryText?.indexOf('$0k – $0k')>-1?'Undisclosed':job.salaryText}
                    </div>
                  </div>
                  </>
                  :''}
                  </div> */}
      </div>
          </Link>
    );
  };

  export default JobPostCard