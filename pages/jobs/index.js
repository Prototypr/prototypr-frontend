import Container from "@/components/container";
import Layout from "@/components/layout-dashboard";
import Button from "@/components/Primitives/Button";

import { getAllJobs } from "@/lib/api";

import Link from "next/link";
import { useRouter } from "next/router";
// import { useEffect } from "react";
// import { useState } from "react";
// import useUser from "@/lib/iron-session/useUser";

const PAGE_SIZE = 12;


const JobPostCard = ({ job }) => {
  const router = useRouter()
  // const tags = job.tags.split(",");
  const company = job?.company?.data?.attributes;
  return (
    <div className="w-full h-auto p-10 bg-white rounded-[10px] flex flex-row gap-5 border border-black border-opacity-10">
      {job.companyLogo?
      <img className="w-[100px] h-[100px] bg-[#CEE2FF] rounded" src={job.companyLogo}/>
      :<div className="w-[100px] h-[100px] bg-[#CEE2FF] rounded"></div>}
      <div className="flex flex-col gap-3 ">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-0">
            <h1 className="text-lg m-0 inter-font font-medium">{job.title}</h1>
            <div className="flex flex-row gap-2 text-base inter-font font-regular text-[#A3ACC2]">
              <span>{job.companyName}</span>
              <span>•</span>
              <span>{job.location}</span>
            </div>
          </div>
          <div className="gap-2 flex flex-row">
            {job.skills?.map((x, i) => (
              <span
                className="py-1 px-5 text-[12px] rounded-full bg-[#F2BFFF] text-sm "
                key={i}
              >
                {x.name}
              </span>
            ))}
          </div>

          <div className="flex flex-row gap-2">
            <span className="text-gray-600 inter-font font-base text-sm">
              ${job.salarymin?.toLocaleString()} – ${job.salarymax?.toLocaleString()}
            </span>
          </div>
        </div>

        <div>
          <button
          onClick={()=>{
            router.push(`/jobs/${job.id}`)
          }}
          className="px-6 py-2 bg-[#3C4FFF] font-medium inter-font text-base text-white rounded-[6px]">
            {/* <Button variant={"confirm"}> */}
              Apply
            {/* </Button> */}
          </button>
        </div>
      </div>
    </div>
  );
};

const Index = ({jobs}) => {

  return (
    <Layout background="#EFF2F8">
      <Container>

      
      <div className=" w-full h-full">
        <div className="w-full max-w-7xl mx-auto  h-full grid grid-cols-4 gap-5">
          <div className="w-full h-full col-start-1 col-end-5 md:col-start-1 md:col-end-4 flex flex-col gap-5  pb-10">
            {/* {jobs.map((job, i) => {
              return <JobPostCard job={job.attributes} key={i} />;
            })} */}
            {jobs.map((job, i) => {
              return <JobPostCard job={job} key={i} />;
            })}
          </div>
          <div className="w-full h-full col-start-1 col-end-5 md:col-start-4 md:col-end-5 ">
            <div className="w-full bg-[#2C04CA] h-[150px] rounded-md p-5">
              <Link href="/jobs/post">
                <button className="px-5 text-sm py-2 bg-white text-black rounded">
                  Post a Job
                </button>
              </Link>
            </div>
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
