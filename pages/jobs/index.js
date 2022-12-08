import Container from "@/components/container";
import Layout from "@/components/layout-dashboard";
import dynamic from "next/dynamic";
const TimeAgo = dynamic(() => import("react-timeago"), { ssr: false });

import { getAllJobs } from "@/lib/api";

import Link from "next/link";
import { ClockIcon, LocationIcon, MoneyIcon } from "@/components/icons";
import Button from "@/components/Primitives/Button";
import SignupSidebar from "@/components/newsletter/SignupSidebar";
import Contributors from "@/components/toolbox/Contributors";

const PAGE_SIZE = 12;


const JobPostCard = ({ job }) => {
  return (
    <Link href={`/jobs/${job.id}`}>
    <div className="w-full relative group cursor-pointer shadow-sm hover:shadow-lg transition transition-all duration-300 ease-in-out h-auto px-6 py-6 bg-white rounded-[10px] flex flex-col md:flex-row gap-5 border border-gray-300">

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
      <div className="flex flex-col gap-3 flex-grow">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
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

const seo = {
  title: "Designer Jobs Board",
  description:"A job board for designers, developers, and creative people. Find your next remote job, or one in your location.",
  url:"https://prototypr.io/jobs",
  image:"https://prototypr.io/static/images/jobs-seo.png"
}

const Index = ({jobs}) => {

  return (
    <Layout seo={seo} showWriteButton={false} background="#fafafa">
      <Container>
      <div className=" w-full h-full">
        <div className="pt-6 w-full max-w-7xl mx-auto  h-full grid grid-cols-6 gap-5">
          <div className="mb-2 col-start-1 col-end-4 md:col-start-1 md:col-end-5">
            <h1 className="text-lg md:text-xl font-medium">Now Hiring</h1>
          </div>
          <div className="w-full h-full col-start-5 col-end-7 md:col-start-5 md:col-end-7 ">
          <div className="w-full">
              <Link href="/jobs/post">
                <Button variant="fullWidthJob" className="px-0 py-1">
                  Post a Job for $200
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full h-full col-start-1 col-end-7 md:col-start-1 md:col-end-5 flex flex-col gap-5  pb-10">
            {jobs.map((job, i) => {
              return <JobPostCard job={job} key={i} />;
            })}
          </div>
          <div className="w-full h-full col-start-1 col-end-7 md:col-start-5 md:col-end-7 ">
            {/* <div className="w-full bg-[#2C04CA] h-[150px] <rounded-md p-5">
              <Link href="/jobs/post">
                <button className="px-5 text-sm py-2 bg-white text-black rounded">
                  Post a Job
                </button>
              </Link>
            </div> */}
            <div className="w-full bg-blue-50 rounded-md p-5 border border-gray-300">
              <h3 className="text-xl font-medium mb-2 text-gray-900">Get Prototypr Weekly</h3>
              <p className="text-base text-gray-600 mb-6">Stay up to date with design news, tools, and jobs.</p>
            <SignupSidebar/>

            </div>
            <Contributors className="border border-gray-300 rounded"/>
          </div>
        </div>
      </div>
      </Container>
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ preview = null, params }) {
  const pageSize = PAGE_SIZE;
  const page = 0;
  let allPosts =(await getAllJobs(preview, pageSize, page)) || [];
 
  const pagination = allPosts?.meta?.pagination;
  return {
    props: { 
      // jobs: allPosts?.data?allPosts.data:null, 
      jobs: allPosts, 
      preview, 
      pagination:pagination?pagination:null
    },
    revalidate:20
  };
}
